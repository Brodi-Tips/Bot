module.exports= class Games {
  set(newGames, oldGames){
    if (newGames && oldGames) {
      if(newGames.length && oldGames.length){

      // let remove = this.game.filter(each=>!newGames.includes(each))

      const add = newGames.filter((each) => !oldGames.includes(each));

      const union = [...new Set([...oldGames, ...newGames])];

      const keep = union.filter(
        (each) => newGames.includes(each) && oldGames.includes(each)
      );
      this.games = { keep, add };
      }
    }
    if (oldGames) {
      if(!oldGames.length) this.games = { keep: newGames, add: [] };
    }
  }

  get(){
    return this.games;
  }
}
