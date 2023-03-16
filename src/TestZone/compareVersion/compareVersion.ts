// 1.0.1 => 101
export function transformVersionStringToNumber(stringVersion: string): number {
  return parseInt(stringVersion.split('.').join(''));
}

export function compareVersion(oldVersion: string, newVersion: string): boolean {
  const _old = transformVersionStringToNumber(oldVersion);
  const _new = transformVersionStringToNumber(newVersion);

  return _new > _old;
}
