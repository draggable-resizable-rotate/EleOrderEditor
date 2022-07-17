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
import { sortModuleDatasByZIndex } from './utils/utils';
import useModuleDatas from './hooks/useModuleDatas';
import { useOrderZIndex } from './hooks/useOrderZIndex';

export type StoreContext = {
  storeState: StoreState;
  moduleDatas: StoreModuleData[];
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
      moduleDataIdsOrderByZIndex: sortModuleDatasByZIndex(initStore.moduleDatasMap),
      moduleDatas: [],
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
  const { moduleDatasMap } = storeState;
  // moduleData 数组
  const moduleDatas = useModuleDatas(moduleDatasMap);
  // 获取当前所有组件的zIndex排序，当前最大的zIndex
  const { currentMaxZIndex, moduleDataIdsOrderByZIndex } = useOrderZIndex(moduleDatasMap);

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
        moduleDatas,
        imageAction,
        currentMaxZIndex,
        moduleDataIdsOrderByZIndex,
      }}
    >
      <div id={StyleModule['editor']}>
        {/* Nav组件要支持缓存 => 传入dispatch而不用useContext获取 start */}
        <ModuleNav dispatch={dispatch} cacheData={moduleNavCacheData} />
        {/* Nav组件要支持缓存 end */}
        <ModuleCanvas />
        <ModuleStyle />
      </div>
    </Provider>
  );
};

export default Editor;
