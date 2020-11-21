const fs = require('fs').promises;
const fsAsync = require('fs');
const path = require('path');

module.exports = class Database {
  constructor() {
    this.path = './archive/database.json';
    this.pathLogs = `./archive/logs.json`;
    this.backup = {};
  }

  async get() {
    try {
      if (fsAsync.existsSync(this.path)) {
        const objJSON = await fs.readFile(this.path);
        const { games } = JSON.parse(objJSON);
        this.backup = games;
        return games;
      }

      return [];
    } catch (error) {
      console.error(error);
    }
  }

  async set(games) {
    try {
      if (games) {
        if (games.length) {
          const context = JSON.stringify({ games });
          await fs.writeFile(this.path, context);
          return this.logs(games);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getLogs() {
    try {
      if (fsAsync.existsSync(this.pathLogs)) {
        const objJSON = await fs.readFile(this.pathLogs);
        const logs = JSON.parse(objJSON);
        return logs;
      }

      return [];
    } catch (error) {
      console.error(error);
    }
  }

  async setLogs(logs) {
    try {
      if (logs) {
        if (logs.length) {
          const context = JSON.stringify(logs);
          return fs.writeFile(this.pathLogs, context);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async logs(games) {
    try {
      const previousLogs = await this.getLogs();
      const logs = previousLogs ? (previousLogs.length ? previousLogs : []) : [];

      const reversedLogs = logs.reverse();
      reversedLogs.push({ games, timestamp: new Date().getTime(), date: new Date() });
      reversedLogs.sort((a, b) => -a.timestamp + b.timestamp);
      return this.setLogs(logs);
    } catch (error) {
      console.error(error);
    }
  }

  async rollback() {
    try {
      const context = JSON.stringify({ games: this.backup });
      await fs.writeFile(this.path, context);
    } catch (error) {
      console.error(error);
    }
  }
};
