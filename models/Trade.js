
class Trade {
  constructor(id, type, user, symbol, shares, price, timestamp) {
      this.id = id;
      this.type = type;
      this.user = user;
      this.symbol = symbol;
      this.shares = shares;
      this.price = price;
      this.timestamp = timestamp;
  }
}

module.exports = Trade;