import { SURE_DRAG_SELECT_AREA } from '@/Editor/config';
import { StoreActionType } from '@/Editor/store/module';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { EditorContext } from '../../index';
import AxisRuler, { AxisRulerRect } from '../AxisRuler';
import DragToSelectContainer, { DragToSelectContainerProps } from '../DragToSelect';
import { boxesIntersect, createBox } from '../DragToSelect/utils';
import RndModule, { RndRefMap } from '../RndModule';
import StyleModule from './../../style.module.less';
import { DefaultInnerRect, DefaultOuterRect } from './config';

const ModuleCanvas: React.FC = () => {
  const { moduleDatas, dispatch } = useContext(EditorContext);
  // 防止调用findNode
  const editorModuleCanvasRef = React.createRef<HTMLDivElement>();
  const outerRectRef = useRef<HTMLDivElement>(null);
  const innerRectRef = useRef<HTMLDivElement>(null);
  const [outerRect, setOuterRect] = useState<AxisRulerRect>({ ...DefaultOuterRect });
  const [innerRect, setInnerRect] = useState<AxisRulerRect>({ ...DefaultInnerRect });

  // 用于groupMove
  const rndRefMap = useRef<RndRefMap>({});
  // 拖拽选择module
  const handleSelectModule: DragToSelectContainerProps['onMouseUp'] = (event, position, size) => {
    // 绘制面积未达阈值，清除选择
    if (size.height * size.width <= SURE_DRAG_SELECT_AREA) {
      dispatch?.({
        type: StoreActionType.UpdateSelectModuleDataIds,
        payload: {
          selectModuleDataIds: [],
          reset: true,
        },
      });
    } else {
      // 计算和多少个矩形交叉
      const selectModuleDataIds = moduleDatas
        .filter((moduleData) => {
          const moduleBox = createBox(
            {
              left: moduleData.props.left,
              top: moduleData.props.top,
            },
            {
              width: moduleData.props.width,
              height: moduleData.props.height,
            },
          );
          return boxesIntersect(createBox(position, size), moduleBox);
        })
        .map((data) => data.id);
      // 如果选中了，那么更新
      if (selectModuleDataIds.length) {
        // 多选
        const isNotReset = event.shiftKey || event.ctrlKey || event.metaKey;
        dispatch?.({
          type: StoreActionType.UpdateSelectModuleDataIds,
          payload: {
            selectModuleDataIds,
            reset: !isNotReset,
          },
        });
      }
    }
  };

  useEffect(() => {
    const outerRectElement = outerRectRef.current;
    const innerRectElement = innerRectRef.current;
    if (outerRectElement && innerRectElement) {
      setOuterRect(outerRectElement.getBoundingClientRect());
      setInnerRect(innerRectElement.getBoundingClientRect());
    }
  }, []);

  return (
    <DragToSelectContainer nodeRef={editorModuleCanvasRef} onMouseUp={handleSelectModule}>
      <div id={StyleModule['editor-module-canvas']} ref={editorModuleCanvasRef}>
        {/* 绘制标尺 start */}
        <div className="axis-ruler-conatiner">
          <AxisRuler outerRect={outerRect} innerRect={innerRect} />
        </div>
        {/* 绘制标尺 end */}
        <div className="editor-module-canvas-inner" ref={outerRectRef}>
          <div className="module-canvas" ref={innerRectRef}>
            {moduleDatas.map((moduleData) => {
              return (
                <RndModule moduleData={moduleData} key={moduleData.id} rndRefMap={rndRefMap} />
              );
            })}
          </div>
        </div>
      </div>
    </DragToSelectContainer>
  );
};

export default ModuleCanvas;
