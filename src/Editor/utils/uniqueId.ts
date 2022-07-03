const idMap = {} as any;

export function uniqueId(prefix = ''): string {
  const str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const n = 8;
  for (let i = 0; i < n; i++) {
    result += str[parseInt(`${Math.random() * str.length}`, 10)];
  }
  if (!idMap[result]) {
    idMap[result] = 1;
    return `${prefix}${result}`;
  }

  return uniqueId();
}
