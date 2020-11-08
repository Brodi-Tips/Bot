module.exports = class Sanitize {
  constructor(games) {
    this.games = games;
  }

  isArray() {
    if (this.games) if (this.games.length) return this.games;

    return false;
  }

  includesWhiteList() {
    const whiteList = ['vs'];

    return this.games.filter((game) => whiteList.map((key) => game.includes(key)).includes(true));
  }

  removeBlackList() {
    const blackList = ['Apostas no Jogo', '3 Opções'];

    return this.games.filter((game) => !blackList.map((key) => game.includes(key)).includes(true));
  }

  sanitize() {
    this.games = this.includesWhiteList();
    this.games = this.removeBlackList();

    return this.games;
  }

  get() {
    if (this.isArray()) {
      return this.sanitize();
    }

    return [];
  }
};
