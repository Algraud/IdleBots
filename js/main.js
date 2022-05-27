let autoSaveTimeout;


function autoSave(){
    save();
    autoSaveTimeout = setTimeout(autoSave, 60000);
}

const saveName = "idleBotsSave";

function load(){
    const unparsedSave = localStorage.getItem(saveName);
    let saveGame;
    try{
    } catch (e){
        message("Your browser is preventing IdleBots from accessing localStorage", "Notices");
    }
    if(unparsedSave !== null){
        saveGame = JSON.parse(unparsedSave);
        game = saveGame;
    }
    if(typeof saveGame === "undefined" || saveGame === null || typeof saveGame.global === "undefined"){
        //return false;
    }
    drawAllBots();
    drawAllGathers();
    autoSave();
}

let isSaving;

function save(){
    isSaving=true;
    let saveString = JSON.stringify(game);
    localStorage.setItem(saveName, saveString);
    if(localStorage.getItem(saveName) == saveString){
        message("Game Saved!", "Notices");
    } else {
        message("For some reason, game isn't saving...");
    }
}

function gameTimeout(){
    if(game.options.menu.pauseGame.enabled){
        setTimeout(gameTimeout, 100);
        return
    }
    const now = new Date().getTime();
    const tick = 1000 / game.settings.speed;
    game.global.time += tick;
    let dif = now - game.global.start - game.global.time;
    while (dif >= tick){
        runGameLoop(true);
        dif -= tick;
        game.global.time += tick;
    }
    runGameLoop(null);
    setTimeout(gameTimeout, tick - dif);
}

function runGameLoop(makeUp){
    try{
        gameLoop(makeUp)
    } catch (e){
        tooltip('Error', null, 'update',e.stack);
        throw(e);
    }
}

let loops = 0;

function gameLoop(makeUp){
    gather(makeUp);
    update();
    loops++;
    //every second
    if(loops % 10){

    }
}

function update(){
    updateCurrency();
}

function updateCurrency(){
    let elem = document.getElementById("currencyCounter");
    elem.innerHTML =  prettify(game.currency["credits"].owned) +
        ' <i class="bi-motherboard"></i>';
}

function updateResources(botIndex, amount){
    let resources = game.resources;
    let change;
    let bot = game.bots[botIndex];
    for (let item in bot.input){
        change = bot.input[item] * amount;
        resources[item].production -= change;
        resources[item].demand += change;
    }
    for (let item in bot.output){
        change = bot.output[item] * amount;
        resources[item].production += amount;
        resources[item].supply += amount;
    }
}

function gather(){
    let amount;
    for (let res in game.resources) {
        let perSec = 0;
        if(game.resources[res].production > 0) {
            perSec = game.resources[res].production;
            amount = perSec / game.settings.speed;
            sellResource(res, amount);
        }
    }
}

function sellResource(resource, amount){
    const resPrice = getResourcePrice(resource);
    game.currency["credits"].owned += amount * resPrice;
    game.currency["credits"].earned += amount * resPrice;
}

function getResourcePrice(resource){
    let modifier = game.resources[resource].demand / game.resources[resource].supply;
    let unitPrice = game.resources[resource].unitPrice;
    return unitPrice * modifier;
}

function message(messageString, type){

}

function canAffordBot(what, buying, returnString){
    let price = 0;
    let costString = "";
    let toBuy = game.bots[what];
    let purchaseAmt;
    if(game.global.buyAmt == "Max"){
        purchaseAmt = calculateMaxAfford(toBuy);
    } else {
        purchaseAmt = game.global.buyAmt;
    }
    if(typeof toBuy === 'undefined') return false;
    for(const costItem in toBuy.cost){
        let priceRes = 0;
        priceRes = parseFloat(getBotItemPrice(toBuy, costItem, purchaseAmt));
        priceResCurrency = priceRes * getResourcePrice(costItem)
        price += priceResCurrency;
        if(returnString){
            costString += '<span>' + costItem + ': ' + prettify(priceRes) + ' (' +
                priceResCurrency + '<i class="bi-motherboard"></i>)</span>, ';
        }
    }
    let money = game.currency['credits'].owned;
    if(buying && money >= price){
        game.currency['credits'].owned -= price;
        return true;
    }
    if(returnString){
        costString += '<span> Total: ' + price + '<i class="bi-motherboard"></i></span>';
        return costString.slice(0, -2);
    }
    return money >= price;
}

function getBotItemPrice(toBuy, costItem, amount){
    let price;
    const thisCost = toBuy.cost[costItem];
    if(typeof thisCost[1] !== 'undefined'){
        let start = thisCost[0] * Math.pow(thisCost[1], toBuy['owned']);
        let increase = (Math.pow(thisCost[1], amount) - 1) / (thisCost[1] - 1);
        price = Math.floor(start * increase);
    } else {
        price = thisCost * amount;
    }
    return price;
}

function calculateMaxAfford(itemObj){
    if(!itemObj.cost) return 1;
    let current = itemObj.owned;
    const money = game.currency['credits'].owned;
    let price = 0;
    let count = 0;
    while(money > price) {
        count++;
        current++;
        for (const item in itemObj.cost) {
            const priceRes = itemObj.cost[item];
            const resource = game.resources[item];
            if (typeof priceRes[1] !== 'undefined') {
                price += Math.floor((priceRes[0] * Math.pow(priceRes[1],current)) * getResourcePrice(resource));
            } else {
                price += priceRes * getResourcePrice(resource);
            }
        }
    }
    return count;
}

function buyBot(what){
    const toBuy = game.bots[what];
    if(typeof toBuy === 'undefined') return false;
    let amount = (game.global.buyAmt == "Max") ? calculateMaxAfford(toBuy) : game.global.buyAmt;
    if(!canAffordBot(what, true)) return false;
    toBuy.owned += amount;
    updateResources(what, amount);
    updateOwnedCount(what, toBuy.owned);
    updateGatherBoxes();
}

function costUpdatesTimeout(){
    checkButtons("bots");
    setTimeout(costUpdatesTimeout, 250)
}

function resetGame(){
    game = null;
    game = newGame();
    drawAllBots();
    drawAllGathers();
    autoSave();
}

load();

costUpdatesTimeout();
setTimeout(gameTimeout, (1000 / game.settings.speed));