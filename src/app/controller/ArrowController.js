const Database = require('../services/Database');
const Games = require('../services/Games');
const Bot = require('../services/Bot');
const Message = require('../factories/Message');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = class Main {
  static async update(req, res) {
    const db = new Database();

    try {
      const token = process.env.TOKEN;
      const chatIdGroup = process.env.CHAT_ID_GROUP;
      const chatIdAdmin = process.env.CHAT_ID_ADMIN;

      const botGroup = new Bot(token, chatIdGroup);
      const botAdmin = new Bot(token, chatIdAdmin);

      const games = new Games();

      let result = {};

      const newGames = req.body.games;
      const oldGames = await db.get();

      games.set(newGames, oldGames);
      const { keep, add, remove } = games.get();

      await db.set([...keep, ...add]);

      const msg = new Message(add, keep, remove);

      const addMessage = msg.add();
      const adminMessage = msg.admin();

      console.log(adminMessage);

      if (addMessage) {
        if (addMessage.length) result.botGroup = await botGroup.sendMessage(addMessage);
      }

      if (adminMessage) {
        if (adminMessage.length) result.botAdmin = await botAdmin.sendMessage(adminMessage);
      }

      res.send({ result, adminMessage });
    } catch (e) {
      res.status(500).send({
        error: true,
        sucess: false,
        messagem: e.message,
        debug: e.stack,
      });

      await db.rollback();

      console.error(e);
    }
  }
};
