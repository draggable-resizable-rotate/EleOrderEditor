import { StoreModuleData } from '../modules/TypeConstraints';
import React from 'react';
import EditorHistory, { EditorHistoryState } from './EditorHistory';

type HistoryStorage = Pick<StoreState, 'selectModuleDataIds' | 'moduleDatasMap'>;

// 最大的历史记录
const MAX_HISTORY_COUNT = 100;

// 初始化历史记录对象
export const editorHistory = new EditorHistory<HistoryStorage>(MAX_HISTORY_COUNT);

export interface StoreState {
  moduleDatasMap: Record<StoreModuleData['id'], StoreModuleData>;
  selectModuleDataIds: Array<StoreModuleData['id']>;
  editorHistoryState: EditorHistoryState;
}

export enum StoreActionType {
  // 批量添加组件
  AddModuleDatas = 'addModuleDatas',
  // 批量删除组件
  DeleteModuleDatas = 'deleteModuleDatas',
  // 批量更新组件
  UpdateModuleDatas = 'updateModuleDatas',
  // 批量更新 select id
  UpdateSelectModuleDataIds = 'updateSelectModuleDataIds',
  // 更新历史
  UpdateHistory = 'updateHistory',
}

export interface StoreAction {
  type: StoreActionType;
  payload: any;
}

export type StoreDispatch = React.Dispatch<StoreAction>;

// 创建初始化的 store
export function createInitialStore(): StoreState {
  return {
    selectModuleDataIds: [],
    moduleDatasMap: {},
    editorHistoryState: {
      currentCount: 0,
      canSaveCount: MAX_HISTORY_COUNT,
      canUndo: false,
      canRedo: false,
    },
  };
}

// reducer
export const reducer = function (state: StoreState, action: StoreAction) {
  const { payload } = action;
  switch (action.type) {
    /* 批量添加组件 */
    case StoreActionType.AddModuleDatas: {
      const toAddModuleDatas = payload.moduleDatas as StoreModuleData[];
      // 添加到map
      const newModuleDatasMap = toAddModuleDatas.reduce((prev, ModuleData) => {
        // eslint-disable-next-line no-param-reassign
        prev[ModuleData.id] = ModuleData;
        return prev;
      }, { ...state.moduleDatasMap });
      // 是否重置选择元素
      const resetSelection = Boolean(payload.resetSelection);
      let newSelectModuleDataIds = [...state.selectModuleDataIds];
      if (resetSelection) {
        newSelectModuleDataIds = toAddModuleDatas.map(moduleData => moduleData.id);
      }
      return {
        ...state,
        moduleDatasMap: newModuleDatasMap,
        selectModuleDataIds: newSelectModuleDataIds,
      };
    }
    /* 批量删除组件 */
    case StoreActionType.DeleteModuleDatas: {
      const toDeleteModuleDataIds = payload.moduleDataIds as string[];
      const newModuleDatasMap: StoreState['moduleDatasMap'] = {};
      for (const [moduleDataId, moduleData] of Object.entries(state.moduleDatasMap)) {
        if (toDeleteModuleDataIds.includes(moduleDataId)) continue;
        // 仅仅保留有效的moduleData
        newModuleDatasMap[moduleDataId] = moduleData;
      }
      const newSelectModuleDataIds = state.selectModuleDataIds.filter(id => !toDeleteModuleDataIds.includes(id));
      return {
        ...state,
        moduleDatasMap: newModuleDatasMap,
        selectModuleDataIds: newSelectModuleDataIds,
      };
    }
    /* 批量更新组件 */
    case StoreActionType.UpdateModuleDatas: {
      // id 和 所有新属性 props
      const toUpdateModuleDatas = payload.moduleDatas as StoreModuleData[];
      // 替换还是合并
      const isMerge = Boolean(payload.merge);
      const newModuleDatasMap = { ...state.moduleDatasMap };
      if (isMerge) { // 合并
        for (const toUpdateModuleData of toUpdateModuleDatas) {
          const oldModuleData = newModuleDatasMap[toUpdateModuleData.id];
          // 保证不对原来的对象修改
          const oldModuleDataProps = Object.assign({}, oldModuleData.props);
          const newModuleData = {
            ...oldModuleData,
            ...toUpdateModuleData,
            props: Object.assign(oldModuleDataProps, toUpdateModuleData.props),
          } as unknown as StoreModuleData;
          newModuleDatasMap[toUpdateModuleData.id] = newModuleData;
        }
      } else { // 替换
        for (const moduleData of toUpdateModuleDatas) {
          newModuleDatasMap[moduleData.id] = moduleData;
        }
      }

      return {
        ...state,
        moduleDatasMap: newModuleDatasMap,
      };
    }
    /* 批量更新激活组件：比如多选 */
    case StoreActionType.UpdateSelectModuleDataIds: {
      const toUpdateSelectModuleDataIds = (payload.selectModuleDataIds || []) as Array<StoreModuleData['id']>;
      const isReset = Boolean(payload.reset);
      let newSelectModuleDataIds = [];
      if (isReset) {
        newSelectModuleDataIds = [...toUpdateSelectModuleDataIds];
      } else {
        newSelectModuleDataIds = [...state.selectModuleDataIds, ...toUpdateSelectModuleDataIds];
      }
      return {
        ...state,
        selectModuleDataIds: newSelectModuleDataIds,
      };
    }
    default:
      return createInitialStore();
  }
};

// 创建 context
export function createContext<T>(initialContext: T, displayName: string) {
  const context = React.createContext<T>(initialContext); //  这里可以省略
  context.displayName = displayName;
  return context;
}
