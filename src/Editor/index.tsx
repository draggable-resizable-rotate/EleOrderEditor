import React, { useMemo, useReducer } from 'react';
import RectModuleClass from './modules/Rect/moduleClass';
import { ModuleDataStore, ModuleType } from './modules/TypeConstraints';
import ModuleNav from './components/ModuleNav';
import ModuleCanvas from './components/ModuleCanvas';
import {
  createInitialStore,
  StoreDispatch,
  StoreState,
  createContext,
  reducer,
  StoreActionType,
} from './store/module';
import { uniqueId } from './utils/uniqueId';
import StyleModule from './style.module.less';

export type StoreContext = {
  storeState: StoreState;
  moduleDatas: ModuleDataStore[];
  dispatch?: StoreDispatch;
};

export const EditorContext = (() => {
  const initStore = createInitialStore();
  return createContext<StoreContext>(
    {
      storeState: initStore,
      moduleDatas: [],
    },
    'editor',
  );
})();

const Editor: React.FC = () => {
  const { Provider } = EditorContext;
  const [storeState, dispatch] = useReducer(reducer, createInitialStore());
  const { moduleDatasMap } = storeState;
  // moduleData 数组
  const moduleDatas = useMemo(() => Object.values(moduleDatasMap), [moduleDatasMap]);

  return (
    <Provider
      value={{
        storeState,
        dispatch,
        moduleDatas,
      }}
    >
      <div id={StyleModule['editor']}>
        {/* Nav组件要支持缓存 => 传入dispatch而不用useContext获取 start */}
        <ModuleNav dispatch={dispatch} />
        {/* Nav组件要支持缓存 end */}
        <ModuleCanvas />
      </div>
    </Provider>
  );
};

export default Editor;
