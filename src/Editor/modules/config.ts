import { HLineModuleClass, VLineModuleClass } from './LIne/moduleClass';
import RectModuleClass from './Rect/moduleClass';
import { HTextModuleClass, VTextModuleClass } from './Text/moduleClass';
import { ModuleType } from './TypeConstraints';

export const ModuleTypeClassMap = {
  [ModuleType.HLine]: HLineModuleClass,
  [ModuleType.VLine]: VLineModuleClass,
  [ModuleType.HText]: HTextModuleClass,
  [ModuleType.VText]: VTextModuleClass,
  [ModuleType.Rect]: RectModuleClass,
};
