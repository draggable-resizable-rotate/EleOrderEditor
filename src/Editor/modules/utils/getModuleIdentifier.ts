import { ModuleData } from '../TypeConstraints';

export enum Identifier {
  View = 'view'
}

// 获取module的标识：className、id
export function getModuleIdentifier(data: Pick<ModuleData<string>, 'id' | 'type'>, identifierType: Identifier) {
  const className = `${data.type}-${identifierType}`;
  const id = `${className}-${data.id}`;
  return {
    id,
    className,
  };
}
