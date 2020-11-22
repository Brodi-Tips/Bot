module.exports = class Games {
  constructor(href = []) {

    
    this.scripts = [
      {
        href:"https://www.bet365.com/#/AS/B83/",
        path:"../../../"
      }
    ];
  }

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

    return this;
  }

  get() {
    const 

      try {
        if (fsAsync.existsSync(this.path)) {
          const objJSON = await fs.readFile(this.path);
          const { games } = JSON.parse(objJSON);
          this.backup = games;
          return games;
        }
  
        return [];
      } catch (error) {
        console.error(error);
      }
    
  }
};