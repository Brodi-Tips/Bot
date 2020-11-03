const fs = require('fs').promises;
const fsAsync = require('fs');

module.exports = class Database {
  constructor() {
    this.path = './database.json';
    this.backup = {};
  }

  async get() {
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

  async set(games) {
    try {
      if (games) {
        if (games.length) {
          const context = JSON.stringify({ games });
          await fs.writeFile(this.path, context);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async rollback() {
    try {
      const context = JSON.stringify({ games: this.backup });
      await fs.writeFile(this.path, context);
    } catch (error) {
      console.error(error);
    }
  }
};
