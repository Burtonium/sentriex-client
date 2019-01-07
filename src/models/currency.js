import { BigNumber } from 'bignumber.js'; /* eslint-disable-line */

class Currency {
  constructor(params) {
    Object.assign(this, params);
  }

  format(amount) {
    const symbol = this.unicodeSymbol;
    return `${symbol || ''}${this.toFixed(amount)} ${this.code || ''}`;
  }

  toFixed(amount) {
    const bg = new BigNumber(amount);
    return parseFloat(bg.toFixed(Math.min(bg.dp(), this.precision)));
  }
}

export default Currency;
