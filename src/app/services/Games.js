module.exports = class Games {
  constructor(games = []) {
    this.games = games;
  }

  set(newGames = [], oldGames = []) {
    const add = newGames.filter((each) => !oldGames.includes(each));

    const union = [...new Set([...oldGames, ...newGames])];

    const keep = union.filter((each) => newGames.includes(each) && oldGames.includes(each));

    const remove = this.games.filter((each) => !newGames.includes(each));

    this.games = { keep, add, remove };

    return this;
  }

  get() {
    return this.games;
  }
};
