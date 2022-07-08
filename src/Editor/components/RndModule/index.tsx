import React, { useContext, useEffect, useMemo } from 'react';
import { HandleStyles, Rnd } from '../Rnd';
import { StoreActionType } from '../../store/module';
import { ModuleDataStore } from '../../modules/TypeConstraints';
import { ModuleTypeClassMap } from '../../modules/config';
import { TextModuleData } from '../../modules/Text/moduleClass';
import {
  ApexAngleHandleStyles,
  getEnableByResizeAxis,
  LineHandleStyles,
  ResizeHandleComponent,
} from './config';

import { MAIN_COLOR } from '@/Editor/config';
import { EditorContext } from '@/Editor';

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

  // 拖拽锚点的样式
  const resizeHandleStyles: HandleStyles = {
    ...ApexAngleHandleStyles,
    ...LineHandleStyles,
  };

  // 获取能够渲染的锚点
  const enableResizing = useMemo(() => getEnableByResizeAxis(resizeAxis), [resizeAxis]);

  // 选择元素
  function handleSelectModule(event: React.MouseEvent<Element, MouseEvent>) {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    // 非激活状态
    if (!isActive) {
      // 多选
      const isNotReset = event.shiftKey || event.ctrlKey || event.metaKey;
      dispatch?.({
        type: StoreActionType.UpdateSelectModuleDataIds,
        payload: {
          selectModuleDataIds: [moduleData.id],
          reset: !isNotReset,
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
      resizeHandleComponent={ResizeHandleComponent}
      // rnd 默认最小为 10
      minWidth={1}
      minHeight={1}
      bounds="parent"
      // 阻止时间冒泡、选中当前元素
      onResizeStart={(event) => {
        event.stopPropagation();
        event.nativeEvent.stopPropagation();
      }}
      // 更新module大小和位置信息
      onResizeStop={(e, direction, delta) => {
        const { size, position } = delta;
        dispatch?.({
          type: StoreActionType.UpdateModuleDatas,
          payload: {
            moduleDatas: [
              {
                id: moduleData.id,
                props: { ...position, ...size },
              },
            ],
            merge: true,
          },
        });
      }}
      // 变换时，实时更新组件 位置和大小
      onResize={() => undefined}
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
      onDrag={(event, delta) => {
        // x 上的变化量, y 上的变化量
        const { changeX, changeY } = delta;
        selectModuleDataIds.forEach((selectModuleDataId) => {
          moduleDatasMap[selectModuleDataId].props;
          rndRefMap.current?.[selectModuleDataId]?.groupMove({
            changeX,
            changeY,
          });
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
        // 批量更新组件信息
        dispatch?.({
          type: StoreActionType.UpdateModuleDatas,
          payload: {
            moduleDatas: newSelectModuleDataPositions,
            merge: true,
          },
        });
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
