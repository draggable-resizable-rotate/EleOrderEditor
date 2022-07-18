import { useMemo } from 'react';
import { INIT_Z_INDEX } from '../config';
import { StoreState } from '../store/module';
import { sortModuleDataListByZIndex } from '../utils/utils';

export function useOrderZIndex(moduleDataListMap: StoreState['moduleDataListMap']) {
  return useMemo(() => {
    const moduleDataIdsOrderByZIndex = sortModuleDataListByZIndex(moduleDataListMap);
    const componentsLength = moduleDataIdsOrderByZIndex.length;
    const currentMaxZIndexComponentId = moduleDataIdsOrderByZIndex[componentsLength - 1];
    return {
      moduleDataIdsOrderByZIndex,
      currentMaxZIndex: currentMaxZIndexComponentId
        ? moduleDataListMap[currentMaxZIndexComponentId].props.zIndex
        : INIT_Z_INDEX,
    };
  }, [moduleDataListMap]);
}
