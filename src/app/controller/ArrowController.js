const Database = require('../services/Database');
const Games = require('../services/Games');
const Bot = require('../services/Bot');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = class Main {
  static async update(req, res) {
    try {
      const token = process.env.TOKEN;
      const chatIdGroup = process.env.CHAT_ID_GROUP;
      const chatIdAdmin = process.env.CHAT_ID_ADMIN;

      const botGroup = new Bot(token, chatIdGroup);
      const botAdmin = new Bot(token, chatIdAdmin);

      const games = new Games();
      const db = new Database();

      let result = {};

      const newGames = req.body.games;
      const oldGames = await db.get();

      games.set(newGames, oldGames);
      const { keep, add } = games.get();

      const database = [...keep, ...add];
      await db.set([...keep, ...add]);

      const addMessage =
        '✅ ' + add.toString().split(' vs ').join(' _vs_ ').split(',').join('\n✅ ');
      const keepMessage =
        '✅ ' + keep.toString().split(' vs ').join(' _vs_ ').split(',').join('\n✅ ');

      const adminMessage =
        (add ? (add.length ? '*Add:*'.concat('\n') + addMessage : '') : '').concat('\n') +
        (keep ? (keep.length ? '*Keep:*'.concat('\n') + keepMessage : '') : '').concat('\n');

      result.botAdmin = await botAdmin.sendMessage(adminMessage);

      if (add) if (add.length) result.botGroup = await botGroup.sendMessage(addMessage);

      if (oldGames) if (!oldGames.length) result.botGroup = await botGroup.sendMessage(keepMessage);

      res.send({ result, database });
    } catch (e) {
      res.status(500).send({
        error: true,
        sucess: false,
        messagem: e.message,
        debug: e.stack,
      });

      console.error(e);
    }
  }
};
