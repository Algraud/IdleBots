/* IdleBots */

function filterMessage(what){
    let log = document.getElementById("log");
    let displayed = (!game.global.messages[what].enabled);
    game.global.messages[what].enabled = displayed;
    let toChange = document.getElementsByClassName(what + "Message");
    let btnText = (displayed) ? what : what + " off";
    let btnElem = document.getElementById(what + "Filter");
    if(btnElem === null) return;
    btnElem.innerHTML = btnText;
    btnElem.className = "";
    btnElem.className = getTabClass(displayed);
    let display = (displayed) ? "block" : "none";
    for (let x = 0; x < toChange.length; x++){
        toChange[x].style.display = display;
    }
    log.scrollTop = log.scrollHeight;
}

function  getTabClass(displayed){
    return (displayed) ? "btn btn-success logFilter" : "btn btn-danger logFilter";
}

function filterBuyTabs(what) {
    //var buyContainer = document.getElementById('buyContainer');
    toggleTab(game.global.buyTab, false);
    game.global.buyTab = what;
    toggleTab(what, true);
    let tabs = ["bots", "upgrades", "blueprints"];
    for (let tab in tabs){
        tab = tabs[tab];
        document.getElementById(tab + "Container").style.display =
            (what == "all" || tab == what) ? "block" : "none";
    }
}

function filterStatTabs(what){
    toggleTab(game.global.statsTab, false);
    document.getElementById(game.global.statsTab + "Container").style.display = "none";
    game.global.statsTab = what;
    toggleTab(what, true);
    document.getElementById(what + "Container").style.display = "block";
}

function toggleTab(what, enable){
    let elem = document.getElementById(what + "Tab");
    if(enable) {
        elem.className = elem.className.replace("tabNotSelected", "tabSelected");
    }else{
        elem.className = elem.className.replace("tabSelected", "tabNotSelected");
    }
}


function checkTabs(){
    deselectAllTabs();
    filterBuyTabs(game.global.buyTab);
    filterStatTabs(game.global.statsTab);
}

function  deselectAllTabs(){
    const tabs = document.getElementsByClassName('tabContainer');
    for (const tab of tabs){
        tab.style.display = 'none';
    }
}

function drawAllGathers(){
    const elem = document.getElementById("gathersHere");
    elem.innerHTML = "";
    for(const item in game.bots){
        const bot = game.bots[item];
        if(bot.blueprint.active){
            drawGather(item, elem);
        }
    }
    updateGatherBoxes();
}

function drawAllBots(){
    const elem = document.getElementById("botsHere");
    elem.innerHTML = "";
    for (const item in game.bots){
        const bot = game.bots[item];
        if(!bot.blueprint.active) continue;
        drawBot(item, elem);
    }
}

function drawAllUpgrades(){
    const elem = document.getElementById("upgradesHere");
    elem.innerHTML = "";
    for (const item in game.bots){
        const bot = game.bots[item];
        if(!bot.blueprint.active) continue;
        for (const itemU in bot.upgrades){
            const upgrade = bot.upgrades[itemU];
            if(!upgrade.unlocked || upgrade.active) continue;
            drawUpgrade(itemU, item, elem);
        }
    }
}

function drawAllBlueprints(){
    const elem = document.getElementById("blueprintsHere");
    elem.innerHTML = "";
    updateBlueprintsLimit();
    if(getActiveBlueprintCount() >= game.global.botLimit) return;
    for (const item in game.bots){
        const bot = game.bots[item];
        if(bot.blueprint.active || bot.blueprint.locked) continue;
        drawBlueprint(item, elem);
    }
}

function drawGather(what, where){
    let input = drawPuts(what, true);
    let output = drawPuts(what, false);
    where.innerHTML += '<div class="col-12 col-md-6 col-xl-4 jobBox"><div id="' + what +
        'Gather" class="jobContainer myBox"><span class="title">' + what + '</span>' +
        '<div class="row"><div class="col-6 resInput">' +
        input +'</div><div class="col-6 resOutput">'+ output +'</div></div>' +
        '<span class="' + what + 'Profit" class="resProfit"></span></div></div>';
}

function drawPuts(what, input,where){
    let suffix = (input) ? "Input" : "Output";
    let inputString = "";
    let bot = game.bots[what];
    if (bot === null) return;
    for(let res in bot[suffix.toLowerCase()]){
        inputString += "<div class='resPut' id='" + what + res + suffix + "'></div>";
    }
    if(typeof where === 'undefined') return inputString;
    where.innerHTML = inputString;
}

function  drawBot(what, where){
    where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'bots\',event)" ' +
        'onmouseout="tooltip(\'hide\')" ' +
        'class="thingColorCanNotAfford thing noSelect pointer botThing" ' +
        'id="' + what + '" onclick="buyBot(\'' + what + '\')">' +
        '<span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' +
        what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">' +
        game.bots[what].owned + '</span></div>';
}

function  drawUpgrade(what, bot, where){
    where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\', \'upgrades\',event, \'' + bot + '\')" ' +
        'onmouseout="tooltip(\'hide\')" ' +
        'class="thingColorCanAfford thing noSelect pointer upgradeThing" ' +
        ' id="' + what + bot +'" onclick="buyBotUpgrade(\'' + what + '\',\'' + bot + '\')">' +
        '<span class="thingName"><span id="' + what + bot +'Alert" class="alert badge"></span>' +
        game.bots[bot].upgrades[what].name + '</span></div>';
}

function drawBlueprint(what, where){
    where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\', \'blueprints\',event)" ' +
        'onmouseout="tooltip(\'hide\')" ' +
        'class="thingColorCanAfford thing noSelect pointer blueprintThing" ' +
        ' id="' + what + '" onclick="selectBlueprint(\'' + what + '\')">' +
        '<span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' +
        what + '</span></div>';
}


function unlockBot(what){
    const bot = game.bots[what];
    bot.locked = false;
    drawAllBots();
}

function updateBlueprintsLimit(){
    const elem = document.getElementById("blueprintsTitleLimit");
    let limit = game.global.botLimit;
    let active = getActiveBlueprintCount();
    elem.innerHTML = active + "/" + limit;
}

function checkButtons(what){
    if(what == "bots"){
        for(let item in game.bots){
            if(game.bots[item].locked == 1) continue;
            updateButtonColor(item,canAffordBot(item));
        }
    }
}

function updateButtonColor(what, canAfford){
    const elem = document.getElementById(what);
    if(elem === null){
        return;
    }
    if(canAfford){
        swapClass("thingColor", "thingColorCanAfford", elem);
    } else {
        swapClass("thingColor", "thingColorCanNotAfford", elem);
    }
}

function updateOwnedCount(what, amount){
    document.getElementById(what + 'Owned').innerHTML = amount;
}

function updateGatherBoxes(){
    for(let item in game.bots){
        let bot = game.bots[item];
        if(bot.blueprint.active && bot.owned > 0){
            let elem;
            let productionMod = getUpgradeMod(bot, UpgradeTypes.production)
            for(let res in bot.input){
                elem = document.getElementById(item + res + "Input");
                let number = bot.input[res] * bot.owned * productionMod;
                elem.innerHTML = res + ": -" + prettify(number) + " /t";
            }
            for (let res in bot.output){
                elem = document.getElementById(item + res + "Output");
                let number = bot.output[res] * bot.owned * productionMod;
                elem.innerHTML = res + ": +" + prettify(number) + " /t";
            }
            /*
            elem = document.getElementById(item + "Profit");
            elem.innerHTML = */
        }
    }
}

function fillStats(){
    fillProductionStats();
    fillMarketStats();
}

function fillProductionStats(){
    let elem = document.getElementById("productionTable");
    let tbody = "";
    for(let item in game.resources){
        let prod = getProduction(item);
        let filter = true;
        switch (game.settings.productionFilter){
            case "all":
                filter = true;
                break;
            case "own":
                filter = (prod !== 0);
        }
        if(filter){
            let buying = prod < 0;
            let profit = getResourceBuySellPrice(item, buying) * prod ;
            tbody += "<tr><td>" + item + "</td><td>" + prod + "</td>" +
                "<td>" + prettify(getResourceBuySellPrice(item, true)) + "/" +
                prettify(getResourceBuySellPrice(item, false)) + "</td>" +
                "<td>" + prettify(getResourceSupply(item)) + "/" +
                prettify(getResourceDemand(item)) + "</td>" +
                "<td>" + prettify(profit) + "</td></tr>";
        }

    }
    elem.innerHTML = "<thead><tr><th scope='col'>Resource</th><th scope='col'>Net</th>" +
        "<th scope='col'>Buying/Sell</th><th scope='col'>Supply/Demand</th>" +
        "<th scope='col'>Profit per tick</th> </tr></thead><tbody>" + tbody + "</tbody>";
}

function fillMarketStats(nextRequirement){
    if(typeof nextRequirement === 'undefined'){
        nextRequirement = getNextRequirement();
    }
    let elemPop = document.getElementById("populationData");
    let elemNeeds = document.getElementById("needsData");
    elemPop.innerHTML = "";
    elemNeeds.innerHTML = "";
    elemPop.innerHTML += "<div class='marketItem'>Population: " + prettify(game.market.people) + "</div>";
    elemPop.innerHTML += "<div class='marketItem'>Growth Speed: " + prettify((game.market.growthSpeed - 1) * 100) + "%</div>";
    elemPop.innerHTML += "<div class='marketItem'>Next Population Need At: " + prettify(nextRequirement) + "</div>";
    for( let item in game.market.needs){
        let need = game.market.needs[item];
        if(need.active){
            let needAmount = need.perPerson * game.market.people;
            let current = getResourceSupply(item);
            let textColor = "";
            if (needAmount > current) textColor = " redText";
            elemNeeds.innerHTML += "<div class='marketItem" + textColor + "'>" + item + ": " + prettify(current) +
                " (Need: " + prettify(needAmount) + ")</div>";
        }
    }
}

function numTab(what){
    let num = 0;
    if(typeof what === 'undefined') what = game.global.numTab;
    else  game.global.numTab = what;
    for (let x = 1; x <= 5; x++){
        let thisTab = document.getElementById("numTab" + x);
        if(what == x){
            thisTab.className = thisTab.className.replace("tabNotSelected", "tabSelected");
        } else {
            thisTab.className = thisTab.className.replace("tabSelected", "tabNotSelected");
        }
        switch (x){
            case 1:
                num = 1;
                break;
            case 2:
                num = 10;
                break;
            case 3:
                num = 25;
                 break;
            case 4:
                num = 100;
                break;
            case 5:
                num = 'Max';
        }
        if(x == what) game.global.buyAmt = num;
    }

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

