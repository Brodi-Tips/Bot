const TG = require( "telegram-bot-api");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })


module.exports= class Bot {

  constructor() {
  console.log(process.env.TOKEN)
    this.token = process.env.TOKEN;
    // Define your API object
    this.api = new TG({
      token: this.token,
    });
    // Define your message provider
    this.mp = new TG.GetUpdateMessageProvider();
    this.api.setMessageProvider(this.mp);
    this.api.start().then(() => {
      console.log("API is started");
    });

    this.chatId = process.env.CHAT_ID;
  }

  async sendMessage(message){
    return this.api.sendMessage({
      chat_id: this.chatId,
      text: message,
      parse_mode: "Markdown",
    });
  }

  async sendPhoto(message, pathBuffer) {
    return this.api.sendPhoto({
      chat_id: this.chatId,
      caption: message,
      path: pathBuffer,
    });
  }
}
