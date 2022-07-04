import React, { useContext } from 'react';
import { EditorContext } from '../../index';
import RndModule from '../RndModule';
import StyleModule from './../../style.module.less';

const ModuleCanvas: React.FC = () => {
  const { storeState, dispatch, moduleDatas } = useContext(EditorContext);
  return (
    <div id={StyleModule['editor-module-canvas']}>
      {moduleDatas.map((moduleData) => {
        const isActive = storeState.selectModuleDataIds.includes(moduleData.id);
        return (
          <RndModule
            isActive={isActive}
            moduleData={moduleData}
            dispatch={dispatch}
            key={moduleData.id}
          />
        );
      })}
    </div>
  );
};

export default ModuleCanvas;
