module.exports = class Sanitize {
  constructor(games) {
    this.games = games;
    this.blackList = ['Apostas no Jogo', '3 Opções'];
    this.whiteList = ['vs'];
  }

  isArray() {
    if (this.games) if (this.games.length) return this.games;

    return false;
  }

  includesWhiteList() {
    return this.games.filter((game) =>
      this.whiteList.map((key) => game.includes(key)).includes(true),
    );
  }

  removeBlackList() {
    return this.games.filter(
      (game) => !this.blackList.map((key) => game.includes(key)).includes(true),
    );
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
