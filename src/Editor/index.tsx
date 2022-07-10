import React, { useMemo, useReducer } from 'react';
import { ModuleDataStore } from './modules/TypeConstraints';
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

export type StoreContext = {
  storeState: StoreState;
  moduleDatas: ModuleDataStore[];
  dispatch: StoreDispatch;
  imageAction?: ImageAction;
};

export const EditorContext = (() => {
  const initStore = createInitialStore();
  return createContext<StoreContext>(
    {
      storeState: initStore,
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
  const moduleDatas = useMemo(() => Object.values(moduleDatasMap), [moduleDatasMap]);

  return (
    <Provider
      value={{
        storeState,
        dispatch,
        moduleDatas,
        imageAction,
      }}
    >
      <div id={StyleModule['editor']}>
        {/* Nav组件要支持缓存 => 传入dispatch而不用useContext获取 start */}
        <ModuleNav dispatch={dispatch} />
        {/* Nav组件要支持缓存 end */}
        <ModuleCanvas />
        <ModuleStyle />
      </div>
    </Provider>
  );
};

export default Editor;
