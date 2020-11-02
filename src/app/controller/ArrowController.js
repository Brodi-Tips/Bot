const  Database = require( "../services/Database");
const  Games = require( "../services/Games");
const  Bot  =require( "../services/Bot");
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

module.exports= class Main {
  static async update(req, res){
    try {
      const token = process.env.TOKEN;
      const chatIdGroup = process.env.CHAT_ID_GROUP;
      const chatIdAdmin = process.env.CHAT_ID_ADMIN; 

      const botGroup = new Bot(token,chatIdGroup);
      const botAdmin = new Bot(token,chatIdAdmin);

      const games = new Games();
      const db = new Database();
      
      let result ={};

      const newGames = req.body.games;
      const oldGames = await db.get();

      games.set(newGames, oldGames);
      const { keep, add } = games.get();

      const database = [...keep, ...add];
      await db.set([...keep, ...add]);
      
      const stringAdmin = {keep,add};
      result.botAdmin = await botAdmin.sendMessage(stringAdmin.toString());

      if (add) {
        if(add.length){
          const stringGames = '✅ ' + add.toString().split(",").join("\n✅ ")
          .split(" vs ").join(" _vs_ ");
          result.botGroup = await botGroup.sendMessage(stringGames);
        }
      }

      if (oldGames) {
        if(!oldGames.length){
          const stringGames = '✅ ' + keep.toString().split(",").join("\n✅ ");
          result.botGroup = await botGroup.sendMessage(stringGames);
        }
      }

      res.send({result, database});
    } catch (e) {
      res.status(500).send({
        error:true,
        sucess:false,
        messagem:e.message,
        debug:e.stack,
      })
      
      console.error(e);
    }
  }
}