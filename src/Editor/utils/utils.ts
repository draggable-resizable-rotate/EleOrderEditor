import { StoreState } from '../store/module';

// 根据zIndex 对所有的components排序
export function sortModuleDataListByZIndex(moduleDataListMap: StoreState['moduleDataListMap']) {
  const moduleDataIds = Object.keys(moduleDataListMap);
  // 从小到大排序
  moduleDataIds.sort((firstId, secondId) => moduleDataListMap[firstId].props.zIndex - moduleDataListMap[secondId].props.zIndex);
  return moduleDataIds;
}
