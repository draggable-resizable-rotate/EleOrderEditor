import { StoreModuleData } from '../modules/TypeConstraints';

export default function mergeModuleDataByGroupType(moduleDatas: StoreModuleData[], propsKeys: string[]) {
  const moduleDatasProps = moduleDatas.map(data => data.props) as any[];
  return propsKeys.reduce((prevResult, currentKey) => {
    const commonValue = moduleDatasProps[0][currentKey];
    const useFlag = moduleDatasProps.every((props) => {
      return props[currentKey] === commonValue;
    });

    (prevResult as any)[currentKey] = useFlag ? commonValue : undefined;
    return prevResult;
  }, {} as unknown as StoreModuleData['props']);
}
