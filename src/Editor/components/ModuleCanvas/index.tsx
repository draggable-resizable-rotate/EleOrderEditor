import { MAIN_COLOR, SURE_DRAG_SELECT_AREA } from '@/Editor/config';
import { StoreActionType } from '@/Editor/store/module';
import { findGuideLines, GuideLineMap, H_POSITION_KEYS } from '@/Editor/utils/findGuideLines';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { EditorContext } from '../../index';
import AxisRuler, { AxisRulerRect } from '../AxisRuler';
import DragToSelectContainer, { DragToSelectContainerProps } from '../DragToSelect';
import { boxesIntersect, createBox } from '../DragToSelect/utils';
import ModuleOption from '../ModuleOption';
import { Position, Size } from '../Rnd';
import RndModule, { BaseModuleProps, RndRefMap } from '../RndModule';
import StyleModule from './../../style.module.less';
import { DefaultInnerRect, DefaultOuterRect } from './config';

const ModuleCanvas: React.FC = () => {
  const {
    moduleDataList,
    dispatch,
    storeState: { selectModuleDataIds },
  } = useContext(EditorContext);
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
    const relativePosition = {
      left: position.left + (outerRect.left - innerRect.left),
      top: position.top + (outerRect.top - innerRect.top),
    };
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
      const selectModuleDataIds = moduleDataList
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
          return boxesIntersect(createBox(relativePosition, size), moduleBox);
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

  const [guideLineMap, setGuideLineMap] = useState<GuideLineMap>();

  const onDrag: BaseModuleProps['onDrag'] = (onDragModuleDataList, dragModuleDataId) => {
    if (!innerRectRef.current) return;
    const domRect = innerRectRef.current?.getBoundingClientRect();
    let currentData: Position & Size = { left: 0, top: 0, width: 0, height: 0 };
    const contrastDataList: Array<Position & Size> = [
      {
        width: domRect.width,
        height: domRect.height,
        left: 0,
        top: 0,
      },
    ];
    onDragModuleDataList.forEach((moduleData) => {
      if (moduleData.id === dragModuleDataId) {
        currentData = moduleData.props;
      } else {
        contrastDataList.push(moduleData.props);
      }
    });

    const guideLineMap = findGuideLines(currentData, contrastDataList);
    setGuideLineMap(guideLineMap);
  };

  function onDragEnd() {
    setGuideLineMap(undefined);
  }

  return (
    <DragToSelectContainer nodeRef={editorModuleCanvasRef} onMouseUp={handleSelectModule}>
      <div id={StyleModule['editor-module-canvas']} ref={editorModuleCanvasRef}>
        {/* 绘制标尺 start */}
        <div className="axis-ruler-container">
          <AxisRuler outerRect={outerRect} innerRect={innerRect} />
        </div>
        {/* 绘制标尺 end */}
        <div className="editor-module-canvas-inner" ref={outerRectRef}>
          <div
            className="module-canvas"
            ref={innerRectRef}
            tabIndex={0}
            style={{ outline: 'none' }}
            onKeyDown={(event) => {
              const { key } = event;
              // 删除 所有选中元素
              if (key === 'Backspace' || key === 'Delete') {
                dispatch?.({
                  type: StoreActionType.DeleteModuleDataList,
                  payload: {
                    moduleDataIds: selectModuleDataIds,
                  },
                });
              }
            }}
          >
            {/* 绘制所有的组件 start */}
            {moduleDataList.map((moduleData) => {
              return (
                <RndModule
                  onDragStart={onDrag}
                  onDrag={onDrag}
                  onDragEnd={onDragEnd}
                  moduleData={moduleData}
                  key={moduleData.id}
                  rndRefMap={rndRefMap}
                />
              );
            })}
            {/* 绘制所有的组件 end */}

            {/* 绘制操作选项 start */}
            <ModuleOption />
            {/* 绘制操作选项 end */}

            {/* 绘制辅助线 start */}
            {guideLineMap &&
              Object.entries(guideLineMap)
                .filter(([, guideLine]) => guideLine)
                .map(([guideLineDirection, guideLine]) => {
                  if (!guideLine) return null;
                  const isH = H_POSITION_KEYS.includes(guideLineDirection as any);
                  if (isH) {
                    return (
                      <div
                        key={guideLineDirection}
                        className="guide-line h"
                        style={{
                          position: 'absolute',
                          width: guideLine.end - guideLine.start,
                          borderTop: `1px dashed ${MAIN_COLOR}`,
                          left: guideLine.start,
                          top: guideLine.distance,
                          zIndex: 99999,
                        }}
                      ></div>
                    );
                  }

                  return (
                    <div
                      key={guideLineDirection}
                      className="guide-line v"
                      style={{
                        position: 'absolute',
                        height: guideLine.end - guideLine.start,
                        borderLeft: `1px dashed ${MAIN_COLOR}`,
                        top: guideLine.start,
                        left: guideLine.distance,
                        zIndex: 99999,
                      }}
                    ></div>
                  );
                })}
            {/* 绘制辅助线 end */}
          </div>
        </div>
      </div>
    </DragToSelectContainer>
  );
};

export default ModuleCanvas;
