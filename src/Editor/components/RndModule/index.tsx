import React, { useMemo, useRef } from 'react';
import { HandleComponent, HandleStyles, ResizeEnable, Rnd } from '../Rnd';
import { StoreActionType, StoreDispatch } from '../../store/module';
import { ModuleDataStore } from '../../modules/TypeConstraints';
import { ModuleTypeClassMap } from '../../modules/config';
import { TextModuleData } from '../../modules/Text/moduleClass';
import { ApexAngleHandleStyles, DefaultResizeStyle, LineHandleStyles } from './config';
import { Rect } from '@draggable-resizable-rotate/graphics';
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

interface BaseModuleProps {
  // module 数据
  moduleData: ModuleDataStore;
  // 是否被选中
  isActive: boolean;
  // 触发store更新的patch
  dispatch?: StoreDispatch;
}

const RndModule: React.FC<BaseModuleProps> = ({ moduleData, isActive, dispatch }) => {
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
    if ((event.shiftKey || event.ctrlKey || event.metaKey) && !isActive) { // 多选
      // 添加
      dispatch?.({
        type: StoreActionType.UpdateSelectModuleDataIds,
        payload: {
          selectComponentIds: [moduleData.id],
          isReset: false
        },
      });
    } else if(!isActive) {
      // 非激活状态
      dispatch?.({
        type: StoreActionType.UpdateSelectModuleDataIds,
        payload: {
          selectModuleDataIds: [moduleData.id],
          isReset: true,
        },
      });
    }
  }

  return (
    <Rnd
      lockAspectRatio={lockAspectRatio}
      id={moduleId}
      position={{ left, top }}
      size={{ width, height }}
      rotate={rotate}
      // 激活的样式
      style={{ zIndex: propsData.zIndex }}
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
      // 其它组件也需要更新
      onDrag={(event, delta, position) => {
        return true
      }}
      onDragStart={handleSelectModule}
      onDragStop={() => {}}
    >
      <ViewComponent moduleData={moduleData} />
    </Rnd>
  );
};

export default RndModule;
