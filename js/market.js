function growPopulation(){
    let growing = true;
    for(let item in game.market.needs){
        let need = game.market.needs[item];
        if(need.requirement < (game.market.people - game.market.startingPeople)){
            if(!need.active){
                need.active = true;
                message("The population found the need for " + capitalize(item) +
                    ". You need to take care of it, if you wish for the population to grow." +
                    " You have found the blueprints for this need and might want to sell this business.",
                    "Market");
                unlockBlueprintByEvent("need", item);
            }
            if(need.perPerson * game.market.people > getResourceSupply(item)){
                growing = false;
            }
        }
    }
    if(growing){
        game.market.people = Math.floor(game.market.growthSpeed * game.market.people);
    }
    fillStats();
}

function getNextRequirement(){
    let req = Infinity;
    for (let item in game.market.needs){
        let need = game.market.needs[item];
        if(need.active || need.requirement >= req) continue;
        req = need.requirement;
    }
    return req + game.market.startingPeople;
}

function getProduction(resource){
    let prod = 0;
    for (let item in game.bots){
        let bot = game.bots[item];
        if(bot.owned <= 0) continue;
        let botProd = 0;
        if(typeof bot.output[resource] !== 'undefined') {
            botProd += bot.output[resource] * getUpgradeMod(bot, UpgradeTypes.output);
        }
        if(typeof  bot.input[resource] !== 'undefined') {
            botProd -= bot.input[resource] * getUpgradeMod(bot, UpgradeTypes.input);
        }
        prod += botProd * getUpgradeMod(bot, UpgradeTypes.production) * bot.owned;
    }
    return prod;
}

function sellResource(resource, amount){
    const resPrice = getResourceBuySellPrice(resource, (amount < 0));
    game.currency["credits"].owned += amount * resPrice;
    game.currency["credits"].earned += amount * resPrice;
}

function getResourceDemandSupplyMod(resource){
    let demand = getResourceDemand(resource);
    let supply = getResourceSupply(resource);
    return demand/supply;
}

function getResourceDemand(resource){
    let prod = getProduction(resource);
    prod = (prod < 0) ? prod : 0;
    let demand = game.resources[resource].demand + game.market.people * game.market.usageMod -
        prod;
    return (demand <= 1) ? 1 : demand;
}

function getResourceSupply(resource){
    let prod = getProduction(resource);
    prod = (prod > 0) ? prod : 0;
    let supply = game.resources[resource].supply+ prod;
    return (supply <= 1) ? 1 : supply;
}

function getResourcePrice(resource){
    if(typeof resource !== 'string') {
        return;
    }
    let modifier = getResourceDemandSupplyMod(resource);
    let unitPrice = game.resources[resource].unitPrice;
    return unitPrice * modifier;
}

function getResourceBuySellPrice(resource, buying){
    return (buying) ? getResourcePrice(resource) * game.global.buyingMod
        : getResourcePrice(resource) * game.global.sellingMod;

}

function getActiveNeedsCount(){
    let count = 0;
    for (let item in game.market.needs){
        if(game.market.needs[item].active) count++
    }
    return count;
}