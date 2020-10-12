import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "./_lib/Database";
import { Games } from "./_lib/Games";
import { Bot } from "./_lib/Bot";

class Main {
  async index(req: NextApiRequest, res: NextApiResponse): Promise<any> {
    try {
      const games = new Games();
      const db = new Database();
      const bot = new Bot();

      const newGames = req.body.games;
      const oldGames = await db.get();

      games.set(newGames, oldGames);
      const { keep, add } = games.get();

      const database = [...keep, ...add];
      await db.set([...keep, ...add]);

      if (add?.length) {
        const stringGames = add.toString().split(",").join("\n");
        await bot.sendMessage(stringGames);
      } else if (!oldGames?.length) {
        const stringGames = keep.toString().split(",").join("\n");
        await bot.sendMessage(stringGames);
      }

      res.send(database);
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Internal Error</h1><p>Sorry,,, there was a problem</p>");
      console.error(e);
    }
  }
}

export default new Main().index;
