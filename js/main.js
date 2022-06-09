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
        if(saveGame.global.version != dynamicData.global.version){
            updateSave(saveGame);
        }
        dynamicData = saveGame;

    }
    if(typeof saveGame === "undefined" || saveGame === null || typeof saveGame.global === "undefined"){
        //return false;
    }
    drawAndFill();
    autoSave();

    //when you make a infinite loop you dum dum
    //applyDefaults()
}

let isSaving;

function save(){
    isSaving=true;
    let saveString = JSON.stringify(dynamicData);
    localStorage.setItem(saveName, saveString);
    if(localStorage.getItem(saveName) == saveString){
        message("Game Saved!", "Notice");
    } else {
        message("For some reason, game isn't saving...", "Notice");
    }
}

function gameTimeout(){
    if(dynamicData.options.menu.pauseGame.enabled){
        setTimeout(gameTimeout, 100);
        return;
    }
    const now = new Date().getTime();
    const tick = 1000 / dynamicData.settings.speed;
    dynamicData.global.time += tick;
    let dif = now - dynamicData.global.start - dynamicData.global.time;
    while (dif >= tick){
        runGameLoop(true);
        dif -= tick;
        dynamicData.global.time += tick;
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

    if(loops % 20 === 0){
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
    elem.innerHTML =  prettify(dynamicData.currency.credits.owned) +
        ' <i class="bi-motherboard"></i>';
}

function gather(){
    let amount;
    for (let res in StaticData.resources) {
        let perSec = 0;
        perSec = getProduction(res);
        if(perSec !== 0) {
            amount = perSec / dynamicData.settings.speed;
            sellResource(res, amount);
        }
    }
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
    if(typeof dynamicData.global.messages[type] === 'undefined') console.log(messageString, type);
    let displayType = (dynamicData.global.messages[type].enabled) ? "block" : "none";
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
       else if(dynamicData.options.menu.timestamps.enabled == 1){
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
        let needsScroll = ((log.scrollTop + 10) > (log.scrollHeight - log.clientHeight));
        let pendingMessages = pendingLogs.all.join('');
        log.innerHTML += pendingMessages;
        pendingLogs.all = [];
        for (let item in pendingLogs){
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

function calculateMaxAfford(itemObj){
    if(!itemObj.static.cost) return 1;
    let current = itemObj.dynamic.owned;
    const money = dynamicData.currency.credits.owned;
    let price = 0;
    let count = 0;
    while(money > price) {
        count++;
        current++;
        for (const item in itemObj.static.cost) {
            const priceRes = itemObj.static.cost[item];
            if (typeof priceRes[1] !== 'undefined') {
                let start = priceRes[0] * Math.pow(priceRes[1],current)
                price += Math.floor(start * getResourceBuySellPrice(item, true));
            } else {
                price += priceRes * getResourceBuySellPrice(item, true);
            }
        }
    }
    return (count <= 1) ? 1 : count - 1;
}

function costUpdatesTimeout(){
    checkButtons("bots");
    setTimeout(costUpdatesTimeout, 250)
}

function updateSave(save){
    const version = save.global.version.split('.');
    restructureDynamicObj(save,newGame());
    if(compareVersions([0,0,2], version)){

    }

    save.global.version = dynamicData.global.version;
}

function compareVersions(left, right){
    for (let x = 0; x < left.length && x < right.length; x++){
        if(left[x] == right[x]) continue;
        return left[x] > right[x];
    }
    return null;
}

function restructureDynamicObj(destination, source){
    for (let item in source){
        let dest = destination[item];
        let sour = source[item];
        if(typeof dest === 'undefined' || dest === null){
            destination[item] = sour;
            continue;
        }
        if(typeof dest === 'object' && !Array.isArray(dest)){
            restructureDynamicObj(dest, sour);
        }
    }
}

load();

costUpdatesTimeout();
setTimeout(gameTimeout, (1000 / dynamicData.settings.speed));

