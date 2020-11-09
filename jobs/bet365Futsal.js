/* 
                TUTORIAL
 First:
  Open this URL "https://www.bet365.com/#/AS/B83/";
 Second: 
    Copy and Paste this code in CONSOLE of opened site.
*/

function getGames() {
  const element = document.querySelectorAll(
    '.gl-MarketGroupContainer div:last-child div.sm-SplashMarketContainer_Expanded',
  );
  const objects = [];
  const games = [];

  element.forEach((each) => objects.push(...each.childNodes));
  objects.forEach((each) => games.push(each.childNodes[0].innerText));

  return games;
}

function postArrow(games) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3333/refresh', true);
  //xhr.open("POST", "https://arrowtips.herokuapp.com/refresh", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(games);
}

function main() {
  const games = getGames();
  if (games) {
    if (games.length) {
      const objJSON = JSON.stringify({ games });
      console.log(objJSON);
      return postArrow(objJSON);
    }
  }

  return console.log("There isn't games.");
}

function loop() {
  main();
  setInterval(main, 15 * 1000);
}

loop();
