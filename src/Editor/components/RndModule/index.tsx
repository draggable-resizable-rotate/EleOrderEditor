import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { HandleComponent, HandleStyles, Position, ResizeEnable, Rnd } from '../Rnd';
import { StoreActionType, StoreDispatch, StoreState } from '../../store/module';
import { ModuleDataStore } from '../../modules/TypeConstraints';
import { ModuleTypeClassMap } from '../../modules/config';
import { TextModuleData } from '../../modules/Text/moduleClass';
import { ApexAngleHandleStyles, DefaultResizeStyle, LineHandleStyles } from './config';
import { Rect } from '@draggable-resizable-rotate/graphics';
import { MAIN_COLOR } from '@/Editor/config';
import { EditorContext } from '@/Editor';

const { RECT_DIRECT, RECT_LINE_DIRECTION } = Rect;

// 四边 中间变换 元素渲染
const ResizerComponent = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    <span
      style={{
        ...DefaultResizeStyle,
        background: '#ffffff',
      }}
    ></span>
  </div>
);

const resizeHandleComponent = RECT_LINE_DIRECTION.reduce((preResult, position) => {
  // eslint-disable-next-line no-param-reassign
  preResult[position] = <ResizerComponent />;
  return preResult;
}, {} as unknown as HandleComponent);

export interface RndRefMap {
  [key: string]: Rnd | null;
}
interface BaseModuleProps {
  // module 数据
  moduleData: ModuleDataStore;
  rndRefMap: React.MutableRefObject<RndRefMap>;
}

const RndModule: React.FC<BaseModuleProps> = ({ moduleData, rndRefMap }) => {
  const { storeState, dispatch } = useContext(EditorContext);
  const { selectModuleDataIds, moduleDatasMap } = storeState;
  const isActive = selectModuleDataIds.includes(moduleData.id);

  const { type: moduleType, props: propsData, id: moduleId } = moduleData;
  const { left, top, width, height } = propsData;
  const rotate = (propsData as unknown as TextModuleData['props']).rotate || 0;
  // module类型的"原型"
  const moduleClass = ModuleTypeClassMap[moduleType];
  const { viewComponent: ViewComponent, resizeAxis, lockAspectRatio } = moduleClass;
  const timerResizeRef = useRef<any>(null);

  // 拖拽锚点的样式
  const resizeHandleStyles: HandleStyles = {
    ...ApexAngleHandleStyles,
    ...LineHandleStyles,
  };

  // 获取能够渲染的锚点
  const enableResizing = useMemo(() => {
    const axis = resizeAxis;
    const defaultResizing = RECT_DIRECT.reduce((preResult, position) => {
      // eslint-disable-next-line no-param-reassign
      preResult[position] = false;
      return preResult;
    }, {} as any);

    if (!axis || axis === 'both') return true;
    switch (axis) {
      case 'none':
        return false;
      case 'x': {
        defaultResizing.right = true;
        defaultResizing.left = true;
        break;
      }
      case 'y': {
        defaultResizing.top = true;
        defaultResizing.bottom = true;
        break;
      }
    }
    return defaultResizing as ResizeEnable;
  }, [resizeAxis]);

  // 选择元素
  function handleSelectModule(event: React.MouseEvent<Element, MouseEvent>) {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    if ((event.shiftKey || event.ctrlKey || event.metaKey) && !isActive) {
      // 多选
      dispatch?.({
        type: StoreActionType.UpdateSelectModuleDataIds,
        payload: {
          selectModuleDataIds: [moduleData.id],
          reset: false,
        },
      });
    } else if (!isActive) {
      // 非激活状态
      dispatch?.({
        type: StoreActionType.UpdateSelectModuleDataIds,
        payload: {
          selectModuleDataIds: [moduleData.id],
          reset: true,
        },
      });
    }
  }

  useEffect(() => {
    return () => {
      if (rndRefMap?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        rndRefMap.current[moduleData.id] = null;
      }
    };
  }, [moduleData.id, rndRefMap]);

  return (
    <Rnd
      lockAspectRatio={lockAspectRatio}
      id={moduleId}
      position={{ left, top }}
      size={{ width, height }}
      rotate={rotate}
      // 激活的样式
      style={{
        zIndex: propsData.zIndex,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: isActive ? MAIN_COLOR : 'transparent',
      }}
      resizeHandleStyles={resizeHandleStyles}
      // 可操控的点位，只有在激活的时候才显示
      enableResizing={isActive && enableResizing}
      // 自定义 四边中间 变换 组件
      resizeHandleComponent={resizeHandleComponent}
      // rnd 默认最小为 10
      minWidth={1}
      minHeight={1}
      bounds="parent"
      // 阻止时间冒泡、选中当前元素
      onResizeStart={(event) => {}}
      onResizeStop={() => {
        if (timerResizeRef.current !== null) {
          // saveHistory?.();
          timerResizeRef.current = null;
        }
      }}
      // 变换时，实时更新组件 位置和大小
      onResize={(e, direction, delta) => {
        const { size, position } = delta;
      }}
      /* 处理移动 start */
      onDragStart={(event) => {
        // 判断是否聚焦元素
        handleSelectModule(event);
        // 当前所有被选中的元素都要开始 groupMove
        selectModuleDataIds.forEach((selectModuleDataId) => {
          rndRefMap.current?.[selectModuleDataId]?.groupMoveStart();
        });
      }}
      // 其它组件也需要更新
      onDrag={(event, delta, position) => {
        // x 上的变化量
        const changeX = position.left - left;
        // y 上的变化量
        const changY = position.top - top;
        selectModuleDataIds.forEach((selectModuleDataId) => {
          const selectModuleDataProps = moduleDatasMap[selectModuleDataId].props;
          const newPosition = {
            left: selectModuleDataProps.left + changeX,
            top: selectModuleDataProps.top + changY,
          };
          rndRefMap.current?.[selectModuleDataId]?.groupMove(newPosition);
        });
      }}
      // 更新所有的数据
      onDragStop={() => {
        const newSelectModuleDataPositions = selectModuleDataIds.map((selectModuleDataId) => {
          const newPosition = rndRefMap.current?.[selectModuleDataId]?.groupMoveEnd();
          return {
            id: selectModuleDataId,
            props: {
              ...newPosition,
            },
          };
        });
        // console.log(newSelectModuleDataPositions);
        // // 批量更新组件信息
        // dispatch?.({
        //   type: StoreActionType.UpdateModuleDatas,
        //   payload: {
        //     moduleDatas: newSelectModuleDataPositions,
        //     merge: true,
        //   },
        // });
      }}
      /* 处理移动 end */

      // 收集module的rnd实例
      ref={(rndInstance) => {
        if (rndRefMap?.current) {
          rndRefMap.current[moduleData.id] = rndInstance;
        }
      }}
    >
      <ViewComponent moduleData={moduleData} />
    </Rnd>
  );
};

export default RndModule;
