module.exports = class Message {
  constructor(addData, keepData, removeData) {
    this.addData = addData;
    this.keepData = keepData;
    this.removeData = removeData;
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
    return this.factorie(this.addData);
  }

  keep() {
    return this.factorie(this.keepData);
  }

  remove() {
    return this.factorie(this.removeData);
  }

  admin() {
    return (
      (this.isValid(this.addData) ? ('*Add:*\n' + this.add()).concat('\n') : '') +
      (this.isValid(this.keepData) ? ('*Keep:*\n' + this.keep()).concat('\n') : '') +
      (this.isValid(this.removeData) ? ('*Remove:*\n' + this.remove()).concat('\n') : '')
    );
  }
};
