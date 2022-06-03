function resetGame(continueWorld){
    if(continueWorld){
        moveProductionToDemandSupply();
        resetBots();
        applyDefaults();
    } else {
        game = null;
        game = newGame();
    }
    drawAndFill();
    autoSave();
}

function moveProductionToDemandSupply(){
    for (let item in game.resources){
        let res = game.resources[item];
        let prod = getProduction(item);
        if(prod > 0){
            res.supply += prod;
        } else {
            res.demand -= prod;
        }
    }
}

function resetBots(){
    for (let item in game.bots){
        let bot = game.bots[item];
        bot.owned = 0;
        bot.blueprint.active = false;
        resetUpgrades(bot);
    }
}

function resetUpgrades(bot){
    for (let item in bot.upgrades){
        let upgrade = bot.upgrades[item];
        upgrade.unlocked = false;
        upgrade.active = false;
    }
}

function applyDefaults(){
    game.currency.credits.owned = StartDefaults.credits * getActiveNeedsCount();
    game.global.start = new Date().getTime();
    game.global.time = 0;
}