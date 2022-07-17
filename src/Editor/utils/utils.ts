import { StoreState } from '../store/module';

// 根据zIndex 对所有的components排序
export function sortModuleDatasByZIndex(moduleDatasMap: StoreState['moduleDatasMap']) {
  const moduleDataIds = Object.keys(moduleDatasMap);
  // 从小到大排序
  moduleDataIds.sort((firstId, secondId) => moduleDatasMap[firstId].props.zIndex - moduleDatasMap[secondId].props.zIndex);
  return moduleDataIds;
}
