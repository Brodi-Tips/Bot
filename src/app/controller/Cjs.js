const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = class Main {
  static async update(req, res) {

    try {
      const { games: gamesDirty } = req.body;

      const token = process.env.TOKEN;
      const chatIdGroup = process.env.CHAT_ID_GROUP;
      const chatIdAdmin = process.env.CHAT_ID_ADMIN;

      const botGroup = new Bot(token, chatIdGroup);
      const botAdmin = new Bot(token, chatIdAdmin);

      const newGames = new Sanitize(gamesDirty).get();
      const oldGames = await db.get();

      const { keep, add, remove } = new Games(oldGames).set(newGames, oldGames).get();

      await db.set([...keep, ...add]);

      const msg = new Message(add, keep, remove);

      const addMessage = msg.add();
      const adminMessage = msg.admin();

      let result = {};

      if (addMessage) {
        //if (addMessage.length) result.botGroup = await botGroup.sendMessage(addMessage);
      }

      if (adminMessage) {
        if (adminMessage.length) result.botAdmin = await botAdmin.sendMessage(adminMessage);
      }

      console.log(adminMessage);

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
