export class Games {
  private games: { keep: string[]; add: string[] };

  set(newGames: string[], oldGames: string[]): void {
    if (newGames?.length && oldGames?.length) {
      // let remove = this.game.filter(each=>!newGames.includes(each))

      let add = newGames.filter((each) => !oldGames.includes(each));

      let union = [...new Set([...oldGames, ...newGames])];

      let keep = union.filter(
        (each) => newGames.includes(each) && oldGames.includes(each)
      );
      console.log(keep, add);
      this.games = { keep, add };
    }
    if (!oldGames?.length) {
      this.games = { keep: newGames, add: [] };
    }
  }

  get(): { keep: string[]; add: string[] } {
    console.log(this.games);
    return this.games;
  }
}
