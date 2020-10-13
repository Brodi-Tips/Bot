const App =require( './app/provider/App');
const Routes =require( './app/provider/Routes');

const routes = new Routes();
const app = new App(routes).server;

module.exports = app;
