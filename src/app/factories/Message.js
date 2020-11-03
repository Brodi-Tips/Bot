module.exports = class Message {
  constructor(keep, add) {
    this._keep = keep;
    this._add = add;
  }

  isValid(messages) {
    if (messages) if (messages.length) return true;

    return false;
  }

  factorie(messages) {
    return this.isValid(messages)
      ? '✅ ' + messages.toString().split(' vs ').join(' _vs_ ').split(',').join('\n✅ ')
      : '';
  }

  add() {
    return this.factorie(this._add);
  }

  keep() {
    return this.factorie(this._keep);
  }

  admin() {
    return (
      (this.isValid(this._add) ? ('*Add:*\n' + this.add()).concat('\n') : '') +
      (this.isValid(this._keep) ? ('*Keep:*\n' + this.keep()).concat('\n') : '')
    );
  }
};
