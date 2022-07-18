import { StoreModuleData } from '../modules/TypeConstraints';
import React from 'react';
import EditorHistory, { EditorHistoryState } from './EditorHistory';

type HistoryStorage = Pick<StoreState, 'selectModuleDataIds' | 'moduleDataListMap'>;

// 最大的历史记录
const MAX_HISTORY_COUNT = 100;

// 初始化历史记录对象
export const editorHistory = new EditorHistory<HistoryStorage>(MAX_HISTORY_COUNT);

export interface StoreState {
  moduleDataListMap: Record<StoreModuleData['id'], StoreModuleData>;
  selectModuleDataIds: Array<StoreModuleData['id']>;
  editorHistoryState: EditorHistoryState;
}

export enum StoreActionType {
  // 批量添加组件
  AddModuleDataList = 'addModuleDataList',
  // 批量删除组件
  DeleteModuleDataList = 'deleteModuleDataList',
  // 批量更新组件
  UpdateModuleDataList = 'updateModuleDataList',
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
    moduleDataListMap: {},
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
    case StoreActionType.AddModuleDataList: {
      const toAddModuleDataList = payload.moduleDataList as StoreModuleData[];
      // 添加到map
      const newModuleDataListMap = toAddModuleDataList.reduce((prev, ModuleData) => {
        // eslint-disable-next-line no-param-reassign
        prev[ModuleData.id] = ModuleData;
        return prev;
      }, { ...state.moduleDataListMap });
      // 是否重置选择元素
      const resetSelection = Boolean(payload.resetSelection);
      let newSelectModuleDataIds = [...state.selectModuleDataIds];
      if (resetSelection) {
        newSelectModuleDataIds = toAddModuleDataList.map(moduleData => moduleData.id);
      }
      return {
        ...state,
        moduleDataListMap: newModuleDataListMap,
        selectModuleDataIds: newSelectModuleDataIds,
      };
    }
    /* 批量删除组件 */
    case StoreActionType.DeleteModuleDataList: {
      const toDeleteModuleDataIds = payload.moduleDataIds as string[];
      const newModuleDataListMap: StoreState['moduleDataListMap'] = {};
      for (const [moduleDataId, moduleData] of Object.entries(state.moduleDataListMap)) {
        if (toDeleteModuleDataIds.includes(moduleDataId)) continue;
        // 仅仅保留有效的moduleData
        newModuleDataListMap[moduleDataId] = moduleData;
      }
      const newSelectModuleDataIds = state.selectModuleDataIds.filter(id => !toDeleteModuleDataIds.includes(id));
      return {
        ...state,
        moduleDataListMap: newModuleDataListMap,
        selectModuleDataIds: newSelectModuleDataIds,
      };
    }
    /* 批量更新组件 */
    case StoreActionType.UpdateModuleDataList: {
      // id 和 所有新属性 props
      const toUpdateModuleDataList = payload.moduleDataList as StoreModuleData[];
      // 替换还是合并
      const isMerge = Boolean(payload.merge);
      const newModuleDataListMap = { ...state.moduleDataListMap };
      if (isMerge) { // 合并
        for (const toUpdateModuleData of toUpdateModuleDataList) {
          const oldModuleData = newModuleDataListMap[toUpdateModuleData.id];
          // 保证不对原来的对象修改
          const oldModuleDataProps = Object.assign({}, oldModuleData.props);
          const newModuleData = {
            ...oldModuleData,
            ...toUpdateModuleData,
            props: Object.assign(oldModuleDataProps, toUpdateModuleData.props),
          } as unknown as StoreModuleData;
          newModuleDataListMap[toUpdateModuleData.id] = newModuleData;
        }
      } else { // 替换
        for (const moduleData of toUpdateModuleDataList) {
          newModuleDataListMap[moduleData.id] = moduleData;
        }
      }

      return {
        ...state,
        moduleDataListMap: newModuleDataListMap,
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
