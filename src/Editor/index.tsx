import React, { useEffect, useReducer, useRef } from 'react';
import { StoreModuleData } from './modules/TypeConstraints';
import ModuleNav from './components/ModuleNav';
import ModuleCanvas from './components/ModuleCanvas';
import {
  createInitialStore,
  StoreDispatch,
  StoreState,
  createContext,
  reducer,
} from './store/module';
import StyleModule from './style.module.less';
import ModuleStyle from './components/ModuleStyle';
import { ImageAction } from './components/ModuleImageNav';
import { INIT_Z_INDEX } from './config';
import { sortModuleDataListByZIndex } from './utils/utils';
import useModuleDataList from './hooks/useModuleDataList';
import { useOrderZIndex } from './hooks/useOrderZIndex';
import ModuleHeader from './components/ModuleHeader';

export type StoreContext = {
  storeState: StoreState;
  moduleDataList: StoreModuleData[];
  moduleDataIdsOrderByZIndex: string[];
  // 当前允许的最大层级
  currentMaxZIndex: number;
  dispatch: StoreDispatch;
  imageAction?: ImageAction;
};

export const EditorContext = (() => {
  const initStore = createInitialStore();
  return createContext<StoreContext>(
    {
      storeState: initStore,
      currentMaxZIndex: INIT_Z_INDEX,
      moduleDataIdsOrderByZIndex: sortModuleDataListByZIndex(initStore.moduleDataListMap),
      moduleDataList: [],
      dispatch: () => undefined,
    },
    'editor',
  );
})();

interface EditorProps {
  imageAction?: ImageAction;
}

const Editor: React.FC<EditorProps> = ({ imageAction }) => {
  const { Provider } = EditorContext;
  const [storeState, dispatch] = useReducer(reducer, createInitialStore());
  const { moduleDataListMap } = storeState;
  // moduleData 数组
  const moduleDataList = useModuleDataList(moduleDataListMap);
  // 获取当前所有组件的zIndex排序，当前最大的zIndex
  const { currentMaxZIndex, moduleDataIdsOrderByZIndex } = useOrderZIndex(moduleDataListMap);

  const moduleNavCacheData = useRef({
    maxZindex: currentMaxZIndex,
  });

  // 更新缓存数据
  useEffect(() => {
    Object.assign(moduleNavCacheData.current, {
      maxZindex: currentMaxZIndex,
    });
  }, [currentMaxZIndex]);

  return (
    <Provider
      value={{
        storeState,
        dispatch,
        moduleDataList,
        imageAction,
        currentMaxZIndex,
        moduleDataIdsOrderByZIndex,
      }}
    >
      <div id={StyleModule['editor']}>
        <div id={StyleModule['editor-top']}>
          <ModuleHeader />
        </div>
        <div id={StyleModule['editor-main']}>
          {/* Nav组件要支持缓存 => 传入dispatch而不用useContext获取 start */}
          <ModuleNav dispatch={dispatch} cacheData={moduleNavCacheData} />
          {/* Nav组件要支持缓存 end */}
          <ModuleCanvas />
          <ModuleStyle />
        </div>
      </div>
    </Provider>
  );
};

export default Editor;
