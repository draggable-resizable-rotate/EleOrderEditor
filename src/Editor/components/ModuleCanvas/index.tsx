import React, { useContext, useRef } from 'react';
import { EditorContext } from '../../index';
import RndModule, { RndRefMap } from '../RndModule';
import StyleModule from './../../style.module.less';

const ModuleCanvas: React.FC = () => {
  const { moduleDatas } = useContext(EditorContext);

  const rndRefMap = useRef<RndRefMap>({});

  return (
    <div id={StyleModule['editor-module-canvas']}>
      {moduleDatas.map((moduleData) => {
        return <RndModule moduleData={moduleData} key={moduleData.id} rndRefMap={rndRefMap} />;
      })}
    </div>
  );
};

export default ModuleCanvas;
