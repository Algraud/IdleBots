function resetGame(continueWorld){
    if(continueWorld){
        moveProductionToDemandSupply();
        resetBots();
        applyDefaults();
    } else {
        dynamicData = newGame();
    }
    drawAndFill();
    autoSave();
    dynamicData.options.menu.pauseGame.enabled = false;
}

function moveProductionToDemandSupply(){
    for (let item in dynamicData.resources){
        let res = dynamicData.resources[item];
        let prod = getProduction(item);
        if(prod > 0){
            res.supply += prod;
        } else {
            res.demand -= prod;
        }
    }
}

function resetBots(){
    for (let item in dynamicData.bots){
        let bot = dynamicData.bots[item];
        bot.owned = 0;
        bot.blueprint.active = false;
        resetUpgrades(bot);
    }
}

function resetUpgrades(botObj){
    for (let item in botObj.upgrades){
        let upgrade = botObj.upgrades[item];
        upgrade.unlocked = false;
        upgrade.active = false;
    }
}

function applyDefaults(){
    dynamicData.currency.credits.owned = StartDefaults.credits * Math.pow(2,getActiveNeedsCount() - 1);
    dynamicData.global.start = new Date().getTime();
    dynamicData.global.time = 0;
}

function sellBusiness(){
    for (let item in StaticData.specialists){
        dynamicData.specialists[item].level = dynamicData.specialists[item].levelTemp;
    }
    dynamicData.currency.awards.spent = dynamicData.currency.awards.spentTemp;
    dynamicData.currency.awards.lastOwned = dynamicData.currency.awards.owned;
    dynamicData.global.totalSells++;
    resetGame(true);
    cancelSell();
}

function clearSpecialists(){
    for (let item in StaticData.specialists){
        dynamicData.specialists[item].levelTemp = 0;
    }
    dynamicData.currency.awards.spentTemp = 0;
    drawAllSpecialists();
    updateAllSpecialistColors();
    updateSellingTitle();
}

function getSpecialistPrice(specialistName){
    let staticSpecialist = StaticData.specialists[specialistName];
    let dynamicSpecialist = dynamicData.specialists[specialistName];
    return Math.ceil(staticSpecialist.cost[0] * Math.pow(staticSpecialist.cost[1], dynamicSpecialist.levelTemp));
}

function hireSpecialist(specialistName){
    let dynamicSpecialist = dynamicData.specialists[specialistName];
    if(typeof dynamicSpecialist === 'undefined') return;
    let price = getSpecialistPrice(specialistName);
    let canSpend = dynamicData.currency.awards.owned - dynamicData.currency.awards.spentTemp;
    if(price > canSpend || StaticData.specialists[specialistName].max <= dynamicSpecialist.levelTemp) return;
    dynamicSpecialist.levelTemp++;
    dynamicData.currency.awards.spentTemp += price;
    drawAllSpecialists();
    updateAllSpecialistColors();
    updateSellingTitle();
}

function sellingClicked(bankrupt){
    let awards = dynamicData.currency.awards;
    awards.spentTemp = awards.spent;
    for (let item in dynamicData.specialists){
        dynamicData.specialists[item].levelTemp = dynamicData.specialists[item].level;
    }
    document.getElementById("wrapper").style.display = "none";
    let titleText = "Selling Business";
    document.getElementById("cancelSellBtn").style.display = "inline-block";
    if(bankrupt){
        titleText = "Bankrupt!";
        document.getElementById("cancelSellBtn").style.display = "none";
    }
    updateSellingTitle(titleText);
    drawAllSpecialists()
    document.getElementById("sellingWrapper").style.display = "block";
}

function cancelSell(){
    document.getElementById("sellingWrapper").style.display = "none";
    document.getElementById("wrapper").style.display = "block";

}

function giveAward(){
    let total = Math.floor((dynamicData.market.people - StaticData.market.startingPeople) / 10);
    dynamicData.currency.awards.owned = total;
    showAwardChange();
}