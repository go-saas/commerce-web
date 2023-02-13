import { history as umiHistory } from '@umijs/max';

export const qiankunJump = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  umiHistory.push(url);
};
