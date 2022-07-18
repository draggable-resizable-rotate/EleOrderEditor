import { EditorContext } from '@/Editor';
import { SettingSvg, StyleSvg } from '@/Editor/assets/icon';
import { ModuleTypeClassMap } from '@/Editor/modules/config';
import { LineModuleData } from '@/Editor/modules/LIne/moduleClass';
import { GroupModuleType, ModuleType, StoreModuleData } from '@/Editor/modules/TypeConstraints';
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
  const { selectModuleDataIds, moduleDataListMap } = storeState;

  // 当前被选中的module的数组
  const selectModuleData = selectModuleDataIds.map((id) => moduleDataListMap[id]);

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
        <ConfigComponent
          onChange={onConfigFormChange}
          key={moduleData.id}
          moduleData={moduleData as never}
        />,
      );
    }
    let groupTypeSelectModuleDataList = selectModuleDataGroupTypeMap[groupType];
    if (!groupTypeSelectModuleDataList) {
      selectModuleDataGroupTypeMap[groupType] = groupTypeSelectModuleDataList = [];
    }
    groupTypeSelectModuleDataList.push(moduleData);
  });

  const selectModuleDataListStyleComponentList = Object.keys(selectModuleDataGroupTypeMap).map(
    (groupType) => {
      const moduleDataListByGroupType = selectModuleDataGroupTypeMap[
        groupType as GroupModuleType
      ] as StoreModuleData[];
      const moduleType = moduleDataListByGroupType[0].type;
      const moduleClass = ModuleTypeClassMap[moduleType];
      const StyleFormComponent = moduleClass.styleFormComponent;
      const propsKeys = moduleClass.propsKeys;

      const commonProps = mergeModuleDataByGroupType(moduleDataListByGroupType, propsKeys);
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
    const toUpdateModuleDataList: StoreModuleData[] = [];
    for (const [groupType, groupTypeUpdateProps] of Object.entries(changeValues)) {
      const moduleDataListByGroupType = selectModuleDataGroupTypeMap[
        groupType as GroupModuleType
      ] as StoreModuleData[];

      // 如果当前的是Line，那么需要做一些特殊处理
      if (
        groupType === GroupModuleType.Line &&
        (groupTypeUpdateProps as Partial<LineModuleData['props']>).lineWidth
      ) {
        const newUpdateProps = { ...groupTypeUpdateProps } as Partial<LineModuleData['props']>;
        moduleDataListByGroupType.forEach((moduleData) => {
          if (moduleData.type === ModuleType.HLine) {
            newUpdateProps.height = newUpdateProps.lineWidth;
          }
          if (moduleData.type === ModuleType.VLine) {
            newUpdateProps.width = newUpdateProps.lineWidth;
          }
          toUpdateModuleDataList.push({
            ...moduleData,
            props: {
              ...newUpdateProps,
            },
          } as StoreModuleData);
        });
      } else {
        moduleDataListByGroupType.forEach((moduleData) => {
          toUpdateModuleDataList.push({
            ...moduleData,
            props: {
              ...groupTypeUpdateProps,
            },
          } as StoreModuleData);
        });
      }
    }
    dispatch({
      type: StoreActionType.UpdateModuleDataList,
      payload: {
        moduleDataList: toUpdateModuleDataList,
        merge: true,
      },
    });
  }

  // 配置表单更新
  function onConfigFormChange(changedValues: { [key: string]: StoreModuleData['props'] }) {
    dispatch({
      type: StoreActionType.UpdateModuleDataList,
      payload: {
        moduleDataList: Object.keys(changedValues).map((id) => {
          return {
            id,
            type: moduleDataListMap[id].type,
            props: {
              ...changedValues[id],
            },
          };
        }),
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
          {selectModuleDataListStyleComponentList}
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
