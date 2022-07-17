import { useMemo } from 'react';
import { INIT_Z_INDEX } from '../config';
import { StoreState } from '../store/module';
import { sortModuleDatasByZIndex } from '../utils/utils';

export function useOrderZIndex(moduleDatasMap: StoreState['moduleDatasMap']) {
  return useMemo(() => {
    const moduleDataIdsOrderByZIndex = sortModuleDatasByZIndex(moduleDatasMap);
    const componentsLength = moduleDataIdsOrderByZIndex.length;
    const currentMaxZIndexComponentId = moduleDataIdsOrderByZIndex[componentsLength - 1];
    return {
      moduleDataIdsOrderByZIndex,
      currentMaxZIndex: currentMaxZIndexComponentId
        ? moduleDatasMap[currentMaxZIndexComponentId].props.zIndex
        : INIT_Z_INDEX,
    };
  }, [moduleDatasMap]);
}
