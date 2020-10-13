const express  =require( 'express');
const ArrowController = require( '../controller/ArrowController');

module.exports= class Routes {
  constructor() {
    this.routes = express.Router();

    return this.init();
  }

  init() {
    this.map()
    return this.routes
  }

  map() {
    this.routes.post('/refresh', ArrowController.update);
  }
};
