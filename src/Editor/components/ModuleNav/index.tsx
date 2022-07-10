import React from 'react';
import { Tabs } from 'antd';
import StyleModule from './../../style.module.less';
import { CategoryMap, defaultShowCategoryArr, MainCategoryName } from './config';
import { ModuleDataStore, ModuleType } from '@/Editor/modules/TypeConstraints';
import { ModuleTypeClassMap } from '@/Editor/modules/config';
import { StoreActionType, StoreDispatch } from '@/Editor/store/module';
import { uniqueId } from '@/Editor/utils/uniqueId';
import ModuleImageNav from '../ModuleImageNav';

interface ModuleNavProps {
  dispatch: StoreDispatch;
}

const { TabPane } = Tabs;
const ModuleNav: React.FC<ModuleNavProps> = ({ dispatch }) => {
  function addModule(type: ModuleType) {
    const moduleClass = ModuleTypeClassMap[type];
    dispatch({
      type: StoreActionType.AddModuleDatas,
      payload: {
        moduleDatas: [
          {
            id: uniqueId(),
            type: type,
            props: { ...moduleClass.initProps },
          },
        ] as ModuleDataStore[],
      },
    });
  }

  return (
    <div id={StyleModule['editor-module-nav']}>
      <Tabs tabPosition="left">
        {defaultShowCategoryArr.map((navKey) => {
          const navItem = CategoryMap[navKey];
          const IconComponent = navItem.icon;
          return (
            <TabPane
              tab={<IconComponent width={30} height={30} style={{ display: 'block' }} />}
              key={navItem.key}
            >
              <div className="nav-pane">
                <div className="nav-pane-title">{navItem.title}</div>
                {(() => {
                  switch (navKey) {
                    case MainCategoryName.Image: {
                      return <ModuleImageNav />;
                    }
                    default: {
                      return (
                        <div className="nav-item-container">
                          {navItem.children?.map((childrenNavItem) => {
                            const ChildIconComponent = childrenNavItem.icon;
                            return (
                              <div
                                key={childrenNavItem.key}
                                className="nav-item"
                                onClick={() => {
                                  addModule(childrenNavItem.key as ModuleType);
                                }}
                              >
                                <ChildIconComponent
                                  width={18}
                                  height={18}
                                  style={{ display: 'block' }}
                                />
                                <span className="nav-item-text">{childrenNavItem.title}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  }
                })()}
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

// 导航栏并不会随着数据变化而变化
export default React.memo(ModuleNav);
