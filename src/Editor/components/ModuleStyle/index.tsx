import { EditorContext } from '@/Editor';
import { SettingSvg, StyleSvg } from '@/Editor/assets/icon';
import { ModuleTypeClassMap } from '@/Editor/modules/config';
import { StoreActionType } from '@/Editor/store/module';
import { Button, Tabs } from 'antd';
import React, { useContext } from 'react';
import StyleModule from './../../style.module.less';

//
export enum TabType {
  STYLE = 'style',
  CONFIG = 'config',
}

export const TabTypeMap = {
  [TabType.STYLE]: {
    text: '样式',
  },
  [TabType.CONFIG]: {
    text: '配置',
  },
};

const ModuleStyle: React.FC = () => {
  const { storeState, dispatch } = useContext(EditorContext);
  const { selectModuleDataIds, moduleDatasMap } = storeState;
  // 当前被选中的module的数组
  const selectModuleData = selectModuleDataIds.map((id) => moduleDatasMap[id]);

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
      <Tabs className="editor-module-style-nav" centered defaultActiveKey={TabType.STYLE}>
        <Tabs.TabPane
          tab={
            <>
              <SettingSvg width={16} height={16} />
              {TabTypeMap[TabType.STYLE].text}
            </>
          }
          key={TabType.STYLE}
        >
          <p>Content of Tab Pane 1</p>
          <p>Content of Tab Pane 1</p>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <>
              <StyleSvg width={16} height={16} />
              {TabTypeMap[TabType.CONFIG].text}
            </>
          }
          key={TabType.CONFIG}
        >
          {selectModuleData.map((moduleData) => {
            const moduleClass = ModuleTypeClassMap[moduleData.type];
            const ConfigComponent = moduleClass.configComponent;
            if (!ConfigComponent) return null;
            return <ConfigComponent key={moduleData.id} moduleData={moduleData} />;
          })}
        </Tabs.TabPane>
      </Tabs>
      <Button onClick={deleteSelectModule}>删除选中的组件</Button>
    </div>
  );
};

export default ModuleStyle;
