import { EditorContext } from '@/Editor';
import { AlignLeftSvg } from '@/Editor/assets/icon';
import { TooltipConfig } from '@/Editor/config';
import { StoreActionType } from '@/Editor/store/module';
import { Tooltip } from 'antd';
import React, { useContext } from 'react';
import StyleModule from './../../style.module.less';
const AlignLeftSvgConfig = {
  width: 25,
  height: 25,
};

const ModuleHeader = () => {
  const {
    storeState: { selectModuleDataIds, moduleDataListMap },
    dispatch,
  } = useContext(EditorContext);

  // 多选module对齐
  function handleMultipleModuleAlgin(direction: 'left' | 'top' | 'right' | 'bottom') {
    const moduleDataList = selectModuleDataIds.map(
      (moduleDataId) => moduleDataListMap[moduleDataId],
    );
    switch (direction) {
      case 'left': {
        const minLeft = Math.min(
          ...moduleDataList.map((moduleData) => moduleData.props.left as number),
        );
        dispatch?.({
          type: StoreActionType.UpdateModuleDataList,
          payload: {
            moduleDataList: moduleDataList.map((moduleData) => ({
              id: moduleData.id,
              props: {
                ['left']: minLeft,
              },
            })),
            merge: true,
          },
        });
        break;
      }
      case 'top': {
        const minTop = Math.min(
          ...moduleDataList.map((moduleData) => moduleData.props.top as number),
        );
        dispatch?.({
          type: StoreActionType.UpdateModuleDataList,
          payload: {
            moduleDataList: moduleDataList.map((moduleData) => ({
              id: moduleData.id,
              props: {
                ['top']: minTop,
              },
            })),
            merge: true,
          },
        });
        break;
      }
      case 'right': {
        const rightArr = moduleDataList.map(
          (moduleData) => (moduleData.props.left + moduleData.props.width) as number,
        );
        const maxRight = Math.max(...rightArr);
        dispatch?.({
          type: StoreActionType.UpdateModuleDataList,
          payload: {
            moduleDataList: moduleDataList.map((moduleData) => ({
              id: moduleData.id,
              props: {
                ['left']: maxRight - moduleData.props.width,
              },
            })),
            merge: true,
          },
        });
        break;
      }
      case 'bottom': {
        const bottomArr = moduleDataList.map(
          (moduleData) => (moduleData.props.top + moduleData.props.height) as number,
        );
        const maxBottom = Math.max(...bottomArr);
        dispatch?.({
          type: StoreActionType.UpdateModuleDataList,
          payload: {
            moduleDataList: moduleDataList.map((moduleData) => ({
              id: moduleData.id,
              props: {
                ['top']: maxBottom - moduleData.props.height,
              },
            })),
            merge: true,
          },
        });
        break;
      }
    }
  }

  return (
    <div id={StyleModule['editor-header']}>
      <div className="left-option"></div>
      <div className="center-option">
        <Tooltip placement="bottom" title="左对齐" {...TooltipConfig}>
          <AlignLeftSvg
            className="align-svg"
            {...AlignLeftSvgConfig}
            style={{ transform: 'rotate(0deg)' }}
            onClick={() => handleMultipleModuleAlgin('left')}
          />
        </Tooltip>
        <Tooltip placement="bottom" title="上对齐" {...TooltipConfig}>
          <AlignLeftSvg
            className="align-svg"
            {...AlignLeftSvgConfig}
            style={{ transform: 'rotate(90deg)' }}
            onClick={() => handleMultipleModuleAlgin('top')}
          />
        </Tooltip>
        <Tooltip placement="bottom" title="右对齐" {...TooltipConfig}>
          <AlignLeftSvg
            className="align-svg"
            {...AlignLeftSvgConfig}
            style={{ transform: 'rotate(180deg)' }}
            onClick={() => handleMultipleModuleAlgin('right')}
          />
        </Tooltip>
        <Tooltip placement="bottom" title="下对齐" {...TooltipConfig}>
          <AlignLeftSvg
            className="align-svg"
            {...AlignLeftSvgConfig}
            style={{ transform: 'rotate(270deg)' }}
            onClick={() => handleMultipleModuleAlgin('bottom')}
          />
        </Tooltip>
      </div>
      <div className="right-option"></div>
    </div>
  );
};

export default ModuleHeader;
