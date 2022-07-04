import React from 'react';
import { Tabs, Typography } from 'antd';
import StyleModule from './../../style.module.less';
import { CategoryMap, defaultShowCategoryArr } from './config';

const { TabPane } = Tabs;
const ModuleNav: React.FC = () => {
  console.log('moduleNav');
  return (
    <div className={StyleModule['module-nav']}>
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
                <Typography.Title level={4}>{navItem.title}</Typography.Title>
                <div className="nav-item-container">
                  {navItem.children?.map((childrenNavItem) => {
                    const ChildIconComponent = childrenNavItem.icon;
                    return (
                      <div key={childrenNavItem.key} className="nav-item">
                        <ChildIconComponent width={18} height={18} style={{ display: 'block' }} />
                        {childrenNavItem.title}
                      </div>
                    );
                  })}
                </div>
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
