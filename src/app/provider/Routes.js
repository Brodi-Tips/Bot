const express = require('express');
const FutsalController = require('../controller/FutsalController');

module.exports = class Routes {
  constructor() {
    this.routes = express.Router();

    return this.init();
  }

  init() {
    this.map();
    return this.routes;
  }

  map() {
    this.routes.post('/refresh', FutsalController.update);
    this.routes.get('/status', FutsalController.status);
  }
};
