

function growPopulation(){
    let growing = true;
    for(let item in dynamicData.market.needs){
        let needDynamic = dynamicData.market.needs[item];
        let needStatic = StaticData.market.needs[item];
        if(needStatic.requirement < dynamicData.market.people){
            if(!needDynamic.active){
                needDynamic.active = true;
                message("The population found the need for " + capitalize(item) +
                    ". You need to take care of it, if you wish for the population to grow." +
                    " You have found the blueprints for this need and might want to sell this business.",
                    "Market");
                unlockBlueprintByEvent("need", item);
            }
            if(needStatic.perPerson * dynamicData.market.people > getResourceSupply(item)){
                growing = false;
            }
        }
    }
    if(growing){
        dynamicData.market.people = Math.floor(getGrowthSpeed() * dynamicData.market.people);
        giveAward();
    }
    fillStats();
}

function getGrowthSpeed(){
    let familyPlannerMod = dynamicData.specialists.familyPlanner.level * StaticData.specialists.familyPlanner.effect;
    return StaticData.market.growthSpeed + familyPlannerMod;
}

function getNextRequirement(){
    let req = Infinity;
    for (let item in StaticData.market.needs){
        let need = StaticData.market.needs[item];
        if(dynamicData.market.needs[item].active || need.requirement >= req) continue;
        req = need.requirement;
    }
    return req;
}

function getProduction(resource){
    let prod = 0;
    for (let item in StaticData.bots){
        let bot = getBotData(item);
        if(bot.dynamic.owned <= 0) continue;
        let botProd = 0;
        if(typeof bot.static.output[resource] !== 'undefined') {
            let engineerMod = Math.pow(1+StaticData.specialists.engineer.effect,dynamicData.specialists.engineer.level);
            botProd += bot.static.output[resource] * getUpgradeMod(bot, UpgradeTypes.output) * engineerMod;
        }
        if(typeof  bot.static.input[resource] !== 'undefined') {
            botProd -= bot.static.input[resource] * getUpgradeMod(bot, UpgradeTypes.input);
        }
        prod += botProd * getUpgradeMod(bot, UpgradeTypes.production) * bot.dynamic.owned;
    }
    return prod;
}

function sellResource(resourceName, amount){
    const resPrice = getResourceBuySellPrice(resourceName, (amount < 0));
    dynamicData.currency.credits.owned += amount * resPrice;
    dynamicData.currency.credits.earned += amount * resPrice;
    if(dynamicData.currency.credits.owned < 0){
        sellingClicked(true);
        dynamicData.options.menu.pauseGame.enabled = true;
    }
}

function getResourceDemandSupplyMod(resourceName){
    let demand = getResourceDemand(resourceName);
    let supply = getResourceSupply(resourceName);
    return demand/supply;
}

function getResourceDemand(resourceName){
    let prod = getProduction(resourceName);
    prod = (prod < 0) ? prod : 0;
    let demand = dynamicData.resources[resourceName].demand + dynamicData.market.people * StaticData.market.usageMod -
        prod;
    return (demand <= 1) ? 1 : demand;
}

function getResourceSupply(resourceName){
    let prod = getProduction(resourceName);
    prod = (prod > 0) ? prod : 0;
    let supply = dynamicData.resources[resourceName].supply + prod;
    return (supply <= 1) ? 1 : supply;
}

function getResourcePrice(resourceName){
    if(typeof resourceName !== 'string') {
        return;
    }
    let modifier = getResourceDemandSupplyMod(resourceName);
    let unitPrice = StaticData.resources[resourceName].baseCost;
    return unitPrice * modifier;
}

function getResourceBuySellPrice(resourceName, buying){
    let supplierMod = StaticData.specialists.supplier.effect * dynamicData.specialists.supplier.level;
    let marketingMod = StaticData.specialists.marketing.effect * dynamicData.specialists.marketing.level;
    return (buying) ? getResourcePrice(resourceName) * (StaticData.global.buyingMod - supplierMod)
        : getResourcePrice(resourceName) * (StaticData.global.sellingMod + marketingMod);

}

function getActiveNeedsCount(){
    let count = 0;
    for (let item in StaticData.market.needs){
        if(dynamicData.market.needs[item].active) count++
    }
    return count;
}