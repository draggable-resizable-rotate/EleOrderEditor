import { useMemo } from 'react';
import { StoreState } from '../store/module';

export default function useModuleDatas(moduleDatasMap: StoreState['moduleDatasMap']) {
  const moduleDatas = useMemo(() => Object.values(moduleDatasMap), [moduleDatasMap]);
  return moduleDatas;
}
