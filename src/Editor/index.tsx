import React, { useMemo, useReducer } from 'react';
import ModuleCanvas from './components/Canvas';
import RectModuleClass from './modules/Rect/moduleClass';
import { ModuleDataStore, ModuleType } from './modules/TypeConstraints';
import ModuleNav from './components/Nav';
import {
  createInitialStore,
  StoreDispatch,
  StoreState,
  createContext,
  reducer,
  StoreActionType,
} from './store/module';
import { uniqueId } from './utils/uniqueId';

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

  function addModule() {
    dispatch({
      type: StoreActionType.AddModuleDatas,
      payload: {
        moduleDatas: [{
          id: uniqueId(),
          type: ModuleType.Rect,
          props: { ...RectModuleClass.initProps },
        }],
      },
    });
  }

  return (
    <Provider
      value={{
        storeState,
        dispatch,
        moduleDatas,
      }}
    >
      <button onClick={addModule}>添加组件</button>
      <ModuleNav />
      <ModuleCanvas />
    </Provider>
  );
};

export default Editor;
