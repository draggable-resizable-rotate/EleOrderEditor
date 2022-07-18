import { useMemo } from 'react';
import { StoreState } from '../store/module';

export default function useModuleDataList(moduleDataListMap: StoreState['moduleDataListMap']) {
  const moduleDataList = useMemo(() => Object.values(moduleDataListMap), [moduleDataListMap]);
  return moduleDataList;
}
