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
    drawAndFill();
    autoSave();
}

let isSaving;

function save(){
    isSaving=true;
    let saveString = JSON.stringify(game);
    localStorage.setItem(saveName, saveString);
    if(localStorage.getItem(saveName) == saveString){
        message("Game Saved!", "Notice");
    } else {
        message("For some reason, game isn't saving...", "Notice");
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

    if(loops % 500 === 0){
        growPopulation();
    }
    if(!makeUp){
        postMessages();
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
        resources[item].production += change;
        resources[item].supply += change;
    }
}

function gather(){
    let amount;
    for (let res in game.resources) {
        let perSec = 0;
        if(game.resources[res].production !== 0) {
            perSec = game.resources[res].production;
            amount = perSec / game.settings.speed;
            sellResource(res, amount);
        }
    }
}

function sellResource(resource, amount){
    const resPrice = getResourceBuySellPrice(resource, false);
    game.currency["credits"].owned += amount * resPrice;
    game.currency["credits"].earned += amount * resPrice;
}

function getResourceDemandSupplyMod(resource){
    let demand = game.resources[resource].demand + game.market.people * game.market.usageMod;
    let supply = game.resources[resource].supply;
    return demand/supply;
}

function getResourcePrice(resource){
    let modifier = getResourceDemandSupplyMod(resource);
    let unitPrice = game.resources[resource].unitPrice;
    return unitPrice * modifier;
}

function getResourceBuySellPrice(resource, buying){
    return (buying) ? getResourcePrice(resource) * game.global.buyingMod
        : getResourcePrice(resource) * game.global.sellingMod;

}

let pendingLogs = {
    Market: [],
    Upgrades: [],
    Notice: [],
    all: [],
    RAF: null
}

function message(messageString, type){
    let log = document.getElementById("log");
    if(typeof game.global.messages[type] === 'undefined') console.log(messageString, type);
    let displayType = (game.global.messages[type].enabled) ? "block" : "none";
    let id = "";
    if(messageString == "Game Saved!") {
        id = " id='saveGame'";
        if (document.getElementById('saveGame') !== null) {
            let needsScroll = ((log.scrollTop + 10) > (log.scrollHeight - log.clientHeight));
            let oldElem = document.getElementById("saveGame");
            log.removeChild(oldElem);
            log.appendChild(oldElem);
            oldElem.innerHTML = messageString;
            if (needsScroll) log.scrollTop = log.scrollHeight;
            return;
        }
    }
       else if(game.options.menu.timestamps.enabled){
            messageString = getCurrentTime() + " " + messageString;
        }
        if(type == "Market"){
            messageString = "<i title='Market' class='bi-bag-fill'></i>" + messageString;
        } else if (type == "Upgrades"){
            messageString = "<i title='Upgrades' class='bi-arrow-up-circle-fill'></i>" + messageString;
        }
        let messageHTML = "<p" + id + " class='" + type + "Message message' " +
            "style ='display: " + displayType + "'>" + messageString + "</p>";
        pendingLogs.all.push(messageHTML);
        let pendingArray = pendingLogs[type];
        pendingArray.push(pendingLogs.all.length -1);
        if(pendingArray.length > 10) {
            let index = pendingArray[0];
            pendingLogs.all.splice(index, 1);
            pendingArray.splice(0,1);
            adjustMessageIndexes(index);
        }

}

function adjustMessageIndexes(index){
    for (let item in pendingLogs){
        if(item == "all" || item == "RAF") continue;
        for (let x = 0; x < pendingLogs[item].length; x++){
            if(pendingLogs[item][x] > index){
                pendingLogs[item][x]--;
            }
        }
    }

}

function postMessages(){
    if(pendingLogs.RAF !== null) cancelAnimationFrame(pendingLogs.RAF);
    if(pendingLogs.all.length < 1) return;

    pendingLogs.RAF = requestAnimationFrame(function () {
        let log = document.getElementById("log");
        var needsScroll = ((log.scrollTop + 10) > (log.scrollHeight - log.clientHeight));
        var pendingMessages = pendingLogs.all.join('');
        log.innerHTML += pendingMessages;
        pendingLogs.all = [];
        for (var item in pendingLogs){
            if (item == "all" || item == "RAF") continue;
            if (pendingLogs[item].length)
                trimMessages(item);
            pendingLogs[item] = [];
        }
        if (needsScroll) log.scrollTop = log.scrollHeight;
    })
}

function getCurrentTime(){
    let date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    if (seconds <= 9) seconds = "0" + seconds;
    if (minutes <= 9) minutes = "0" + minutes;
    if (hours <= 9) hours = "0" + hours;
    return hours + ":" + minutes + ":" + seconds;
}

function trimMessages(what){
    let log = document.getElementById("log");
    let toChange = document.getElementsByClassName(what + "Message");
    toChange = nodeToArray(toChange);
    let messageCount = toChange.length;
    if(messageCount > 20){
        for (let count = 0; count < (messageCount - 20); count++){
            log.removeChild(toChange[count]);
        }
    }
}

function nodeToArray(nodeList){
    let a=[];
    for (let l = nodeList.length ; l >= 0; l--){
        a[l]=nodeList[l];
    }
    return a;
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
        let priceResCurrency = priceRes * getResourceBuySellPrice(costItem, true);
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
        costString += '<span> Total: ' + prettify(price) + '<i class="bi-motherboard"></i></span>';
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
                price += Math.floor((priceRes[0] * Math.pow(priceRes[1],current))
                    * getResourceBuySellPrice(resource, true));
            } else {
                price += priceRes * getResourceBuySellPrice(resource, true);
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
    fillStats();
}

function selectBlueprint(what){
    const toSelect = game.bots[what];
    if(typeof toSelect === 'undefined') return false;
    if(getActiveBlueprintCount() >= game.global.botLimit) return false;
    toSelect.blueprint.active = true;
    updateBlueprintsLimit();
    drawAllGathers();
    drawAllBots();
    drawAllBlueprints();
}

function getActiveBlueprintCount(){
    let active = 0;
    for (let item in game.bots){
        if(game.bots[item].blueprint.active) active++;
    }
    return active;
}

function costUpdatesTimeout(){
    checkButtons("bots");
    setTimeout(costUpdatesTimeout, 250)
}

function growPopulation(){
    let req = 0;
    let growing = true;
    for(let item in game.market.needs){
        let need = game.market.needs[item];
        if(need.requirement < (game.market.people - game.market.startingPeople)){
            if(!need.active){
                need.active = true;
                message("The population found the need for " + capitalize(item) +
                    ". You need to take care of it, if you wish for the population to grow.",
                    "Market");
            }
            if(need.perPerson * game.market.people > game.resources[item].supply){
                growing = false;
            }
        } else {
            if(need.requirement > req || req < (game.market.people - game.market.startingPeople)){
                req = need.requirement;
            }
        }
    }
    if(growing){
        game.market.people = Math.floor(game.market.growthSpeed * game.market.people);
    }
    fillMarketStats(req);
}

function resetGame(){
    game = null;
    game = newGame();
    drawAndFill();
    autoSave();
}
function drawAndFill(){
    drawAllBots();
    drawAllUpgrades();
    drawAllBlueprints()
    drawAllGathers();
    updateGatherBoxes();
    checkTabs();
    fillStats();
}

load();

costUpdatesTimeout();
setTimeout(gameTimeout, (1000 / game.settings.speed));