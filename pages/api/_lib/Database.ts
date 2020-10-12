const fs = require("fs").promises;
const fsAsync = require("fs");

export class Database {
  path: string;
  constructor() {
    this.path = "./database.json";
  }

  public async get(): Promise<string[]> {
    try {
      if (fsAsync.existsSync(this.path)) {
        const objJSON = await fs.readFile(this.path);
        const { games } = JSON.parse(objJSON);

        return games;
      }

      return [];
    } catch (error) {
      console.error(error);
    }
  }

  public async set(games: string[]): Promise<void> {
    try {
      if (games?.length) {
        const context = JSON.stringify({ games });
        await fs.writeFile(this.path, context);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
