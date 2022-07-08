import { EditorContext } from '@/Editor';
import { StoreActionType } from '@/Editor/store/module';
import { Button } from 'antd';
import React, { useContext } from 'react';
import StyleModule from './../../style.module.less';

const ModuleStyle: React.FC = () => {
  const { storeState, dispatch, moduleDatas } = useContext(EditorContext);

  function deleteSelectModule() {
    dispatch?.({
      type: StoreActionType.DeleteModuleDatas,
      payload: {
        moduleDataIds: [...storeState.selectModuleDataIds],
      },
    });
  }

  return (
    <div id={StyleModule['editor-module-style']}>
      <Button onClick={deleteSelectModule}>删除选中的组件</Button>
    </div>
  );
};

export default ModuleStyle;
