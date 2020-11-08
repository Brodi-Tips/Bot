const Database = require('../services/Database');
const Games = require('../services/Games');
const Bot = require('../services/Bot');
const Message = require('../factories/Message');
const path = require('path');
const Sanitize = require('../services/Sanitize');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = class Main {
  static async update(req, res) {
    const db = new Database();

    try {
      const { games: gamesDirty } = req.body;

      const token = process.env.TOKEN;
      const chatIdGroup = process.env.CHAT_ID_GROUP;
      const chatIdAdmin = process.env.CHAT_ID_ADMIN;

      console.log(token, chatIdAdmin, chatIdGroup);

      const botGroup = new Bot(token, chatIdGroup);
      const botAdmin = new Bot(token, chatIdAdmin);

      const newGames = new Sanitize(gamesDirty).get();
      const oldGames = await db.get();

      const games = new Games(oldGames);

      games.set(newGames, oldGames);
      const { keep, add, remove } = games.get();

      await db.set([...keep, ...add]);

      const msg = new Message(add, keep, remove);

      const addMessage = msg.add();
      const adminMessage = msg.admin();

      let result = {};

      if (addMessage) {
        // if (addMessage.length) result.botGroup = await botGroup.sendMessage(addMessage);
      }

      if (adminMessage) {
        console.log(adminMessage);
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
