const TG = require("telegram-bot-api");

export class Bot {
  private token: string;
  private chatId: string;
  private api: any;
  private mp: any;

  constructor() {
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

  async sendMessage(message: string): Promise<any> {
    return this.api.sendMessage({
      chat_id: this.chatId,
      text: message,
      parse_mode: "Markdown",
    });
  }

  async sendPhoto(message, pathBuffer): Promise<any> {
    return this.api.sendPhoto({
      chat_id: this.chatId,
      caption: message,
      path: pathBuffer,
    });
  }
}
