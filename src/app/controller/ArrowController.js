const  Database = require( "../services/Database");
const  Games = require( "../services/Games");
const  Bot  =require( "../services/Bot");

module.exports= class Main {
  static async update(req, res){
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

      let result;
      if (add) {
        if(add.length){
          const stringGames = '✅ ' + add.toString().split(",").join("\n✅ ");
          result = await bot.sendMessage(stringGames);
        }
      }

      if (oldGames) {
        if(!oldGames.length){
          const stringGames = '✅ ' + keep.toString().split(",").join("\n✅ ");
          result = await bot.sendMessage(stringGames);
        }
      }

      console.log(result);

      res.send({result,database});
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
      
      console.error(e);
    }
  }
}