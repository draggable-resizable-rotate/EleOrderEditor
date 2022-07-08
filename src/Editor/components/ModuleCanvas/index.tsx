import { SURE_DRAG_SELECT_AREA } from '@/Editor/config';
import { StoreActionType } from '@/Editor/store/module';
import React, { useContext, useRef } from 'react';
import { EditorContext } from '../../index';
import DragToSelectContainer from '../DragToSelect';
import { boxesIntersect, createBox } from '../DragToSelect/utils';
import RndModule, { RndRefMap } from '../RndModule';
import StyleModule from './../../style.module.less';

const ModuleCanvas: React.FC = () => {
  const { moduleDatas, dispatch } = useContext(EditorContext);
  // 防止调用findNode
  const editorModuleCanvasRef = React.createRef<HTMLDivElement>();

  const rndRefMap = useRef<RndRefMap>({});

  return (
    <DragToSelectContainer
      nodeRef={editorModuleCanvasRef}
      onMouseUp={(event, position, size) => {
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
            dispatch?.({
              type: StoreActionType.UpdateSelectModuleDataIds,
              payload: {
                selectModuleDataIds,
                reset: true,
              },
            });
          }
        }
      }}
    >
      <div id={StyleModule['editor-module-canvas']} ref={editorModuleCanvasRef}>
        {moduleDatas.map((moduleData) => {
          return <RndModule moduleData={moduleData} key={moduleData.id} rndRefMap={rndRefMap} />;
        })}
      </div>
    </DragToSelectContainer>
  );
};

export default ModuleCanvas;
