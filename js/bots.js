//Bot Methods_____________________________________________________________

function buyBot(what){
    const toBuy = game.bots[what];
    if(typeof toBuy === 'undefined') return false;
    let amount = (game.global.buyAmt == "Max") ? calculateMaxAfford(toBuy) : game.global.buyAmt;
    if(!canAffordBot(what, true)) return false;
    toBuy.owned += amount;
    checkBotUpgrades(what, toBuy.owned);
    updateOwnedCount(what, toBuy.owned);
    updateGatherBoxes();
    fillStats();
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
                prettify(priceResCurrency) + '<i class="bi-motherboard"></i>)</span>, ';
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

//Upgrade Methods_____________________________________________________________

function getUpgradeMod(botObj, type){
    let mod = 1;
    for (let item in botObj.upgrades){
        let upgrade = botObj.upgrades[item];
        if(upgrade.modifierType == type && upgrade.active){
            mod *= upgrade.modifier;
        }
    }
    return mod;
}

function buyBotUpgrade(what, bot){
    let upgrade = game.bots[bot].upgrades[what];
    if(typeof upgrade === 'undefined') return;
    upgrade.active = true;
    unlockBlueprint(upgrade.extraUnlocks);
    switch (upgrade.modifierType){
        case "production":
            //recalculateProduction();
            break;
    }
    tooltip('hide');
    drawAllUpgrades();
    drawAllGathers();
    fillStats();
}

function checkBotUpgrades(what, owned){
    let bot = game.bots[what];
    let changed = false;
    if(typeof bot === 'undefined') return false;
    for (let item in bot.upgrades){
        let upgrade = bot.upgrades[item];
        if(!upgrade.unlocked && owned >= upgrade.milestone){
            upgrade.unlocked = true;
            changed = true;
            message("You have unlocked " + upgrade.name, "Upgrades")
        }
    }
    if(changed){
        drawAllUpgrades();
    }
}

//Blueprint Methods_____________________________________________________________

function unlockBlueprint(what){
    if(typeof what === "undefined") return;
    if(Array.isArray(what)){
        for (let item in what){
            let bot = game.bots[what[item]];
            if(typeof bot === 'undefined') continue;
            bot.blueprint.locked = false;
        }
    } else {
        let bot = game.bots[what];
        if(typeof bot === 'undefined') return;
        bot.blueprint.locked = false;
    }
    drawAllBlueprints();
}

function unlockBlueprintByEvent(type, event){
    switch (type){
        case "need":
            switch (event){
                case "tool":
                    unlockBlueprint(["MinerBot", "SmelterBot", "ToolSmithBot"]);
                    break;
                case "bed":
                    unlockBlueprint(["ForesterBot", "SawBot", "WoodWorkerBot"]);
                    break;
                case "clothing":
                    unlockBlueprint(["CottonBot", "WeaverBot", "TailorBot"]);
                    break;
            }
            break;
    }
}

function getActiveBlueprintCount(){
    let active = 0;
    for (let item in game.bots){
        if(game.bots[item].blueprint.active) active++;
    }
    return active;
}

function selectBlueprint(what){
    const toSelect = game.bots[what];
    if(typeof toSelect === 'undefined') return false;
    if(getActiveBlueprintCount() >= game.global.botLimit) return false;
    toSelect.blueprint.active = true;
    tooltip('hide');
    updateBlueprintsLimit();
    drawAllGathers();
    drawAllBots();
    drawAllBlueprints();
}