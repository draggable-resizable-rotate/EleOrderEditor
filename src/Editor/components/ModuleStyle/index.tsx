import { EditorContext } from '@/Editor';
import { SettingSvg, StyleSvg } from '@/Editor/assets/icon';
import { ModuleTypeClassMap } from '@/Editor/modules/config';
import { GroupModuleType, StoreModuleData } from '@/Editor/modules/TypeConstraints';
import { StoreActionType } from '@/Editor/store/module';
import mergeModuleDataByGroupType from '@/Editor/utils/mergeModuleDataByGroupType';
import { Tabs } from 'antd';
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

  // 要渲染的所有的module的配置组件
  const selectModuleDataConfigComponentList: JSX.Element[] = [];

  const selectModuleDataGroupTypeMap: {
    [key in GroupModuleType]?: StoreModuleData[];
  } = {};

  selectModuleData.forEach((moduleData) => {
    const moduleClass = ModuleTypeClassMap[moduleData.type];
    const ConfigComponent = moduleClass.configFormComponent;
    const groupType = moduleClass.info.groupType;
    if (ConfigComponent) {
      selectModuleDataConfigComponentList.push(
        <ConfigComponent key={moduleData.id} moduleData={moduleData as never} />,
      );
    }
    let groupTypeSelectModuleDatas = selectModuleDataGroupTypeMap[groupType];
    if (!groupTypeSelectModuleDatas) {
      selectModuleDataGroupTypeMap[groupType] = groupTypeSelectModuleDatas = [];
    }
    groupTypeSelectModuleDatas.push(moduleData);
  });

  const selectModuleDataStyleComponentList = Object.keys(selectModuleDataGroupTypeMap).map(
    (groupType) => {
      const moduleDatasByGroupType = selectModuleDataGroupTypeMap[
        groupType as GroupModuleType
      ] as StoreModuleData[];
      const moduleType = moduleDatasByGroupType[0].type;
      const moduleClass = ModuleTypeClassMap[moduleType];
      const StyleFormComponent = moduleClass.styleFormComponent;
      const propsKeys = moduleClass.propsKeys;

      const commonProps = mergeModuleDataByGroupType(moduleDatasByGroupType, propsKeys);
      return (
        <StyleFormComponent
          key={groupType}
          mergeModuleDataProps={commonProps as any}
          onChange={onStyleFormChange}
        />
      );
    },
  );

  // 表单onChange
  function onStyleFormChange(changeValues: { [key in GroupModuleType]: StoreModuleData['props'] }) {
    const toUpdateModuleDatas: StoreModuleData[] = [];
    for (const [groupType, groupTypeUpdateProps] of Object.entries(changeValues)) {
      const moduleDatasByGroupType = selectModuleDataGroupTypeMap[
        groupType as GroupModuleType
      ] as StoreModuleData[];
      moduleDatasByGroupType.forEach((moduleData) => {
        toUpdateModuleDatas.push({
          ...moduleData,
          props: {
            ...groupTypeUpdateProps,
          },
        } as StoreModuleData);
      });
    }
    dispatch({
      type: StoreActionType.UpdateModuleDatas,
      payload: {
        moduleDatas: toUpdateModuleDatas,
        merge: true,
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
          {selectModuleDataStyleComponentList}
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
          {selectModuleDataConfigComponentList}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ModuleStyle;
