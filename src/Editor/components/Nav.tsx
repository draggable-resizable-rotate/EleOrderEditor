import React from 'react';
import { Tabs } from 'antd';

import StyleModule from './../style.less';

const { TabPane } = Tabs;
const ModuleNav: React.FC = () => {
  console.log('moduleNav');
  return (
    <div className={StyleModule['module-nav']} >
        <Tabs tabPosition="left">
        <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
};

// 导航栏并不会随着数据变化而变化
export default React.memo(ModuleNav);
