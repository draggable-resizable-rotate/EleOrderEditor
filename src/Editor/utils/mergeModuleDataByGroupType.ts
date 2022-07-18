import { StoreModuleData } from '../modules/TypeConstraints';

export default function mergeModuleDataByGroupType(moduleDataList: StoreModuleData[], propsKeys: string[]) {
  const moduleDataListProps = moduleDataList.map(data => data.props) as any[];
  return propsKeys.reduce((prevResult, currentKey) => {
    const commonValue = moduleDataListProps[0][currentKey];
    const useFlag = moduleDataListProps.every((props) => {
      return props[currentKey] === commonValue;
    });

    (prevResult as any)[currentKey] = useFlag ? commonValue : undefined;
    return prevResult;
  }, {} as unknown as StoreModuleData['props']);
}
