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
      const { keep, add } = games.get();

      const database = [...keep, ...add];
      await db.set([...keep, ...add]);

      const msg = new Message(keep, add);

      const addMessage = msg.add();
      const keepMessage = msg.keep();
      const adminMessage = msg.admin();

      console.log('add>>\n', addMessage);
      console.log('keep>>\n', keepMessage);
      console.log('admin>>\n', adminMessage);

      if (add) if (add.length) result.botGroup = await botGroup.sendMessage(addMessage);

      if (oldGames) if (!oldGames.length) result.botGroup = await botGroup.sendMessage(keepMessage);

      if (adminMessage) if (adminMessage) result.botAdmin = await botAdmin.sendMessage(adminMessage);

      res.send({ result, database });
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
