import { compareVersion } from './compareVersion';

describe('compareVersion', () => {
  it('Parse version string to number then compare', () => {
    expect(compareVersion('1.0.0', '1.0.1')).toEqual(true);

    expect(compareVersion('1.0.0', '1.1.0')).toEqual(true);

    expect(compareVersion('1.0.0', '0.0.1')).toEqual(false);
  });
});
