module.exports = class Cjs {
  static async update(req, res) {
    try {
      const { games: gamesDirty } = req.body;

      res.send({ result, adminMessage });
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
