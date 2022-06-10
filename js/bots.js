//Bot Methods_____________________________________________________________
function getBotData(botName){
    return {
        dynamic: dynamicData.bots[botName],
        static: StaticData.bots[botName]
    }
}

function buyBot(botName){
    const toBuy = dynamicData.bots[botName];
    if(typeof toBuy === 'undefined') return false;
    let amount = (dynamicData.global.buyAmt == "Max") ? calculateMaxAfford(getBotData(botName)) : dynamicData.global.buyAmt;
    if(!canAffordBot(botName, true)) return false;
    toBuy.owned += amount;
    checkBotUpgrades(botName);
    updateOwnedCount(botName, toBuy.owned);
    updateGatherBoxes();
    fillStats();
}

function getBotItemPrice(botName, resource, amount){
    let price;
    const thisCost = StaticData.bots[botName].cost[resource];
    if(typeof thisCost[1] !== 'undefined'){
        let start = thisCost[0] * Math.pow(thisCost[1], dynamicData.bots[botName].owned);
        let increase = (Math.pow(thisCost[1], amount) - 1) / (thisCost[1] - 1);
        price = Math.floor(start * increase);
    } else {
        price = thisCost * amount;
    }
    return price;
}

function canAffordBot(botName, buying, returnString){
    let price = 0;
    let costString = "";
    let toBuy = getBotData(botName);
    let purchaseAmt;
    if(dynamicData.global.buyAmt == "Max"){
        purchaseAmt = calculateMaxAfford(toBuy);
    } else {
        purchaseAmt = dynamicData.global.buyAmt;
    }
    if(typeof toBuy.dynamic === 'undefined') return false;
    for(const costItem in toBuy.static.cost){
        let priceRes = 0;
        priceRes = parseFloat(getBotItemPrice(botName, costItem, purchaseAmt));
        let priceResCurrency = priceRes * getResourceBuySellPrice(costItem, true);
        price += priceResCurrency;
        if(returnString){
            costString += '<span><span class="' + costItem + 'Text"> ' + costItem + ': ' + prettify(priceRes) +
                '</span> (' + prettify(priceResCurrency) + '<i class="bi-motherboard"></i>)</span>, ';
        }
    }
    let money = dynamicData.currency.credits.owned;
    if(buying && money >= price){
        dynamicData.currency.credits.owned -= price;
        return true;
    }
    if(returnString){
        costString += '<span> Total: ' + prettify(price) + '<i class="bi-motherboard"></i></span>';
        return costString.slice(0, -2);
    }
    return money >= price;
}

//Upgrade Methods_____________________________________________________________
function getBotUpgradeData(botName, upgradeName){
    return {
        static: StaticData.bots[botName].upgrades[upgradeName],
        dynamic: dynamicData.bots[botName].upgrades[upgradeName]
    }
}


function getUpgradeMod(botObj, type){
    let mod = 1;
    for (let item in botObj.static.upgrades){
        let upgrade = botObj.static.upgrades[item];
        if(upgrade.modifierType == type && botObj.dynamic.upgrades[item].active){
            mod *= upgrade.modifier;
        }
    }
    return mod;
}

function buyBotUpgrade(upgradeName, botName){
    let upgrade = getBotUpgradeData(botName,upgradeName);
    if(typeof upgrade.dynamic === 'undefined') return;
    if(canAffordUpgrade(botName, upgradeName)) return;
    upgrade.dynamic.active = true;
    dynamicData.currency.credits.owned -= StaticData.bots[botName].upgrades[upgradeName].cost
    unlockBlueprint(upgrade.static.extraUnlocks);
    switch (upgrade.static.modifierType){
        case "production":
            //recalculateProduction();
            break;
    }
    tooltip('hide');
    drawAllUpgrades();
    drawAllGathers();
    fillStats();
}

function checkBotUpgrades(botName){
    let bot = dynamicData.bots[botName];
    let changed = false;
    if(typeof bot === 'undefined') return false;
    for (let item in bot.upgrades){
        let upgrade = getBotUpgradeData(botName, item);
        if(!upgrade.dynamic.unlocked && bot.owned >= upgrade.static.milestone){
            upgrade.dynamic.unlocked = true;
            changed = true;
            message("You have unlocked " + upgrade.static.name, "Upgrades")
        }
    }
    if(changed){
        drawAllUpgrades();
    }
}

function canAffordUpgrade(botName, upgradeName){
    return StaticData.bots[botName].upgrades[upgradeName].cost < dynamicData.currency.credits.owned;
}

//Blueprint Methods_____________________________________________________________

function unlockBlueprint(botName){
    if(typeof botName === "undefined") return;
    if(Array.isArray(botName)){
        for (let item in botName){
            let bot = dynamicData.bots[botName[item]];
            if(typeof bot === 'undefined') continue;
            bot.blueprint.locked = false;
        }
    } else {
        let bot = dynamicData.bots[botName];
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
    for (let item in dynamicData.bots){
        if(dynamicData.bots[item].blueprint.active) active++;
    }
    return active;
}

function selectBlueprint(botName){
    const toSelect = dynamicData.bots[botName];
    if(typeof toSelect === 'undefined') return false;
    if(getActiveBlueprintCount() >= StaticData.global.botLimit + getActiveNeedsCount()) return false;
    toSelect.blueprint.active = true;
    tooltip('hide');
    updateBlueprintsLimit();
    drawAllGathers();
    drawAllBots();
    drawAllBlueprints();
}