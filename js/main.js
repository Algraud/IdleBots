let autoSaveTimeout;

function autosave(){
    save();
    autoSaveTimeout = setTimeout(autosave, 60000);
}

const saveName = "idleBotsSave";

function load(){
    let saveGame;
    try{
        var unparsedSave = localStorage.getItem(saveName);
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

    autosave();
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
    var now = new Date().getTime();
    var tick = 1000 / game.settings.speed;
    game.global.time += tick;
    var dif = now - game.global.start - game.global.time;
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

var loops = 0;
function gameLoop(makeUp){
    gather(makeUp);
    loops++;
    //every second
    if(loops % 10){

    }
}

function gather(){
    let amount;
    for (let job in game.jobs) {
        let perSec = 0;
        const increase = game.jobs[job].increase;
        if(game.jobs[job].owned > 0){
            perSec = game.jobs[job].owned * game.jobs[job].modifier;
        }
        amount = perSec / game.settings.speed;
        sellResource(increase, amount)
    }
}

function sellResource(resource, amount){
    const resPrice = getResourcePrice(resource);
    game.currency["credits"].owned += amount * resPrice;
}

function getResourcePrice(resource){
    let modifier = game.resources[resource].demand / game.resources[resource].supply;
    let unitPrice = game.resources[resource].unitPrice;
    return unitPrice * modifier;
}

function message(messageString, type){

}

function tooltip(what){}

load();

setTimeout(gameTimeout, (1000 / game.settings.speed));