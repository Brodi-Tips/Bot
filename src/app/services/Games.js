module.exports = class Games {
  set(newGames = [], oldGames = []) {
    if (newGames.length && oldGames.length) {
      const add = newGames.filter((each) => !oldGames.includes(each));

      const union = [...new Set([...oldGames, ...newGames])];

      const keep = union.filter((each) => newGames.includes(each) && oldGames.includes(each));

      const remove = this.games.filter((each) => !newGames.includes(each));

      this.games = { keep, add, remove };
    }
    if (!oldGames.length && newGames.length) this.games = { add: newGames, keep: [], remove: [] };
    if (!oldGames.length && !newGames.length) this.games = { add: [], keep: [], remove: [] };
  }

  get() {
    return this.games;
  }
};
