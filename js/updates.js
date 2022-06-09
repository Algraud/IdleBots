/* IdleBots */

function filterMessage(messageTypeName){
    let log = document.getElementById("log");
    let displayed = (!dynamicData.global.messages[messageTypeName].enabled);
    dynamicData.global.messages[messageTypeName].enabled = displayed;
    let toChange = document.getElementsByClassName(messageTypeName + "Message");
    let btnText = (displayed) ? messageTypeName : messageTypeName + " off";
    let btnElem = document.getElementById(messageTypeName + "Filter");
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

function filterBuyTabs(tabName) {
    //var buyContainer = document.getElementById('buyContainer');
    toggleTab(dynamicData.global.buyTab, false);
    dynamicData.global.buyTab = tabName;
    toggleTab(tabName, true);
    let tabs = ["bots", "upgrades", "blueprints"];
    for (let tab in tabs){
        tab = tabs[tab];
        document.getElementById(tab + "Container").style.display =
            (tabName == "all" || tab == tabName) ? "block" : "none";
    }
}

function filterStatTabs(tabName){
    toggleTab(dynamicData.global.statsTab, false);
    document.getElementById(dynamicData.global.statsTab + "Container").style.display = "none";
    dynamicData.global.statsTab = tabName;
    toggleTab(tabName, true);
    document.getElementById(tabName + "Container").style.display = "block";
}

function toggleTab(tabName, enable){
    let elem = document.getElementById(tabName + "Tab");
    if(enable) {
        elem.className = elem.className.replace("tabNotSelected", "tabSelected");
    }else{
        elem.className = elem.className.replace("tabSelected", "tabNotSelected");
    }
}


function checkTabs(){
    deselectAllTabs();
    filterBuyTabs(dynamicData.global.buyTab);
    filterStatTabs(dynamicData.global.statsTab);
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
    for(const item in StaticData.bots){
        const bot = dynamicData.bots[item];
        if(bot.blueprint.active){
            drawGather(item, elem);
        }
    }
    updateGatherBoxes();
}

function drawAllBots(){
    const elem = document.getElementById("botsHere");
    elem.innerHTML = "";
    for (const item in StaticData.bots){
        const bot = dynamicData.bots[item];
        if(!bot.blueprint.active) continue;
        drawBot(item, elem);
    }
}

function drawAllUpgrades(){
    const elem = document.getElementById("upgradesHere");
    elem.innerHTML = "";
    for (const item in StaticData.bots){
        const bot = dynamicData.bots[item];
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
    if(getActiveBlueprintCount() >= StaticData.global.botLimit + getActiveNeedsCount()) return;
    for (const item in StaticData.bots){
        const bot = dynamicData.bots[item];
        if(bot.blueprint.active || bot.blueprint.locked) continue;
        drawBlueprint(item, elem);
    }
}

function drawAllSpecialists(){
    const elem = document.getElementById("specialistsHere");
    elem.innerHTML = "";
    for (let item in StaticData.specialists){
        if(dynamicData.specialists[item].locked) continue;
        drawSpecialist(item, elem);
    }
}

function drawGather(botName, elem){
    let input = drawPuts(botName, true);
    let output = drawPuts(botName, false);
    elem.innerHTML += '<div class="col-12 col-md-6 col-xl-4 jobBox"><div id="' + botName +
        'Gather" class="jobContainer myBox"><span class="title">' + botName + '</span>' +
        '<div class="row"><div class="col-6 resInput">' +
        input +'</div><div class="col-6 resOutput">'+ output +'</div></div>' +
        '<span class="' + botName + 'Profit" class="resProfit"></span></div></div>';
}

function drawPuts(botName, input, elem){
    let suffix = (input) ? "Input" : "Output";
    let inputString = "";
    let bot = StaticData.bots[botName];
    if (bot === null) return;
    for(let res in bot[suffix.toLowerCase()]){
        inputString += "<div class='resPut " + res + "Text' id='" + botName + res + suffix + "'></div>";
    }
    if(typeof elem === 'undefined') return inputString;
    elem.innerHTML = inputString;
}

function  drawBot(botName, elem){
    elem.innerHTML += '<div onmouseover="tooltip(\'' + botName + '\',\'bots\',event)" ' +
        'onmouseout="tooltip(\'hide\')" ' +
        'class="thingColorCanNotAfford thing noSelect pointer botThing" ' +
        'id="' + botName + '" onclick="buyBot(\'' + botName + '\')">' +
        '<span class="thingName"><span id="' + botName + 'Alert" class="alert badge"></span><b>' +
        botName + '</b></span><br/><span class="thingOwned" id="' + botName + 'Owned">' +
        dynamicData.bots[botName].owned + '</span></div>';
}

function  drawUpgrade(upgradeName, botName, elem){
    elem.innerHTML += '<div onmouseover="tooltip(\'' + upgradeName + '\', \'upgrades\',event, \'' + botName + '\')" ' +
        'onmouseout="tooltip(\'hide\')" ' +
        'class="thingColorCanAfford thing noSelect pointer upgradeThing" ' +
        ' id="' + upgradeName + botName +'" onclick="buyBotUpgrade(\'' + upgradeName + '\',\'' + botName + '\')">' +
        '<span class="thingName"><span id="' + upgradeName + botName +'Alert" class="alert badge"></span><b>' +
        StaticData.bots[botName].upgrades[upgradeName].name + '</b></span></div>';
}

function drawBlueprint(botName, elem){
    elem.innerHTML += '<div onmouseover="tooltip(\'' + botName + '\', \'blueprints\',event)" ' +
        'onmouseout="tooltip(\'hide\')" ' +
        'class="thingColorCanAfford thing noSelect pointer blueprintThing" ' +
        ' id="' + botName + '" onclick="selectBlueprint(\'' + botName + '\')">' +
        '<span class="thingName"><span id="' + botName + 'Alert" class="alert badge"></span><b>' +
        botName + '</b></span></div>';
}

function drawSpecialist(specialistName, elem){
    let html = "";
    let level = dynamicData.specialists[specialistName].levelTemp;
    html += "<div role='button' onmouseover='tooltip(\"" + specialistName + "\",\"specialists\",event)' " +
        "onmouseout='tooltip(\"hide\")' class='noSelect pointer sellingThing thing specialistColorOff'" +
        " id='" + specialistName + "' onclick='hireSpecialist(\"" + specialistName + "\")'>" +
        "<span class='thingName'>" + capitalize(specialistName) + "</span><br/>" +
        "<span class='thingOwned'>Lv:&nbsp;<span id='" + specialistName + "Owned'>" + level + "</span></span></div>"
    elem.innerHTML += html;
    updateSpecialistColor(specialistName);
}

function updateSpecialistColor(specialistName){
    let elem = document.getElementById(specialistName);
    if(!elem) return;
    let specialist = StaticData.specialists[specialistName];
    let specialistClass;
    let price = getSpecialistPrice(specialistName);
    let canSpend = dynamicData.currency.awards.owned - dynamicData.currency.awards.spentTemp;
    if(specialist.max && specialist.max <= specialist.levelTemp) specialistClass = "specialistColorMaxed";
    else specialistClass = (canSpend >= price) ? "specialistColorOn" : "specialistColorOff";
    swapClass("specialistColor", specialistClass, elem);
}

function updateAllSpecialistColors(){
    for (let item in dynamicData.specialists){
        if (dynamicData.specialists[item].locked) continue;
        updateSpecialistColor(item);
    }
}


function unlockBot(botName){
    const bot = dynamicData.bots[botName];
    bot.locked = false;
    drawAllBots();
}

function updateBlueprintsLimit(){
    const elem = document.getElementById("blueprintsTitleLimit");
    let limit = StaticData.global.botLimit + getActiveNeedsCount();
    let active = getActiveBlueprintCount();
    elem.innerHTML = active + "/" + limit;
}

function checkButtons(btnType){
    if(btnType == "bots"){
        for(let item in StaticData.bots){
            if(dynamicData.bots[item].locked == 1) continue;
            updateButtonColor(item,canAffordBot(item));
        }
    } else if(btnType == "upgrades"){
        for(let bot in StaticData.bots){
            if(dynamicData.bots[bot].owned < 1) continue;
            for (let upgrade in StaticData.bots[bot].upgrades){
                if(dynamicData.bots[bot].upgrades[upgrade].locked || dynamicData.bots[bot].upgrades[upgrade].active)
                    continue;
                updateButtonColor(upgrade+bot,canAffordUpgrade(bot,upgrade));
            }
        }
    }
}

function updateButtonColor(btnId, canAfford){
    const elem = document.getElementById(btnId);
    if(elem === null){
        return;
    }
    if(canAfford){
        swapClass("thingColor", "thingColorCanAfford", elem);
    } else {
        swapClass("thingColor", "thingColorCanNotAfford", elem);
    }
}

function updateOwnedCount(botName, amount){
    document.getElementById(botName + 'Owned').innerHTML = amount;
}

function updateGatherBoxes(){
    for(let item in StaticData.bots){
        let bot = getBotData(item);
        if(bot.dynamic.blueprint.active && bot.dynamic.owned > 0){
            let elem;
            let productionMod = getUpgradeMod(bot, UpgradeTypes.production)
            for(let res in bot.static.input){
                elem = document.getElementById(item + res + "Input");
                let number = bot.static.input[res] * bot.dynamic.owned * productionMod;
                elem.innerHTML = res + ": -" + prettify(number) + " /t";
            }
            for (let res in bot.static.output){
                elem = document.getElementById(item + res + "Output");
                let number = bot.static.output[res] * bot.dynamic.owned * productionMod;
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
    for(let item in StaticData.resources){
        let prod = getProduction(item);
        let filter = true;
        switch (dynamicData.settings.productionFilter){
            case "all":
                filter = true;
                break;
            case "own":
                filter = (prod !== 0);
        }
        if(filter){
            let buying = prod < 0;
            let profit = getResourceBuySellPrice(item, buying) * prod ;
            tbody += "<tr class='" + item + "Text'><td>" + item + "</td><td>" + prettify(prod) + "</td>" +
                "<td>" + prettify(getResourceBuySellPrice(item, true)) + "/" +
                prettify(getResourceBuySellPrice(item, false)) + "</td>" +
                "<td>" + prettify(getResourceSupply(item)) + "/" +
                prettify(getResourceDemand(item)) + "</td>" +
                "<td>" + prettify(profit) + "</td></tr>";
        }

    }
    elem.innerHTML = "<thead><tr><th scope='col'>Resource</th><th scope='col'>Net</th>" +
        "<th scope='col'>Buying/Selling</th><th scope='col'>Supply/Demand</th>" +
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
    elemPop.innerHTML += "<div class='marketItem'>Population: " + prettify(dynamicData.market.people) + "</div>";
    elemPop.innerHTML += "<div class='marketItem'>Growth Speed: " + prettify((getGrowthSpeed() - 1) * 100) + "%</div>";
    elemPop.innerHTML += "<div class='marketItem'>Next Population Need At: " + prettify(nextRequirement) + "</div>";
    for( let item in StaticData.market.needs){
        let need = dynamicData.market.needs[item];
        if(need.active){
            let needAmount = StaticData.market.needs[item].perPerson * dynamicData.market.people;
            let current = getResourceSupply(item);
            let textColor = "";
            if (needAmount > current) textColor = " redText";
            elemNeeds.innerHTML += "<div class='marketItem" + textColor + "'>" + item + ": " + prettify(current) +
                " (Need: " + prettify(needAmount) + ")</div>";
        }
    }
}

function numTab(tabName){
    let num = 0;
    if(typeof tabName === 'undefined') tabName = dynamicData.global.numTab;
    else  dynamicData.global.numTab = tabName;
    for (let x = 1; x <= 5; x++){
        let thisTab = document.getElementById("numTab" + x);
        if(tabName == x){
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
        if(x == tabName) dynamicData.global.buyAmt = num;
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
    showAwardChange();
}

function toggleSettingsMenu(){
    dynamicData.options.displayed = !dynamicData.options.displayed;
    let menuElem = document.getElementById("settingsHere");
    if(dynamicData.options.displayed){
        menuElem.style.display = "block";
        toggleSettingSection(true);
        settingTab("General");
        return;
    }
    menuElem.style.display = "none";
}

function toggleSettingSection(toSearch){
    document.getElementById("searchSettingsWindow").style.display = (toSearch) ? "block" : "none";
    document.getElementById("allSettings").style.display = (toSearch) ? "none" : "block";
    document.getElementById(((toSearch) ? 'allSettingsHere' : 'settingsSearchResults')).innerHTML = '';
    if(!toSearch) displayAllSettings();
    else searchSettings(document.getElementById('searchSettings'));
}

function displayAllSettings(){
    let settingsHere = document.getElementById('allSettingsHere');
    let html = "";
    for (let item in dynamicData.options.menu){
        let optionItem = dynamicData.options.menu[item];
        if(optionItem.locked) continue;
        html += getSettingHtml(item);
    }
    settingsHere.innerHTML = html;
}

function getSettingHtml(optionName){
    let staticObj = StaticData.options.menu[optionName];
    let dynamicObj = dynamicData.options.menu[optionName];
    let text = staticObj.titles[dynamicObj.enabled];
    return "<div class='optionContainer'><div id='toggle" + optionName + "' " +
        "class='noSelect settingsBtn settingBtn" + dynamicObj.enabled + "' " +
        "onclick='toggleSetting(\"" + optionName + "\", this)' " +
        "onmouseover='tooltip(\"" + text + "\", \"customText\", event, \"" +
            staticObj.description + "\")' " +
        "onmouseout='tooltip(\"hide\")'>" + text + "</div></div>";
}

function searchSettings(elem){
    let search = elem.value.toLowerCase();
    let resultsElem = document.getElementById('settingsSearchResults');
    if(search.length < 2){
        resultsElem.innerHTML = "";
        return;
    }
    let results = [];
    for (let optionName in StaticData.options.menu){
        let staticObj = StaticData.options.menu[optionName];
        let dynamicObj = dynamicData.options.menu[optionName];
        if(dynamicObj.locked) continue;
        if (staticObj.extraTags && staticObj.extraTags.search(search) != -1) results.push(optionName);
        else if(staticObj.description.toLowerCase().search(search) != -1) results.push(optionName);
        else {
            for (let x = 0; x < staticObj.titles.length; x++){
                if(staticObj.titles[x].toLowerCase().search(search) != -1){
                    results.push(optionName);
                    break;
                }
            }
        }
    }
    let text = "";
    clearSettingTabs();
    for (let x = 0; x < results.length; x++){
        text += getSettingHtml(results[x]);
    }
    resultsElem.innerHTML = text;
}

function settingTab(tabName){
    let elem = document.getElementById('searchSettings');
    elem.value = tabName;
    searchSettings(elem);
    clearSettingTabs();
    let tabElem = document.getElementById(tabName + "Tab");
    if(tabElem) swapClass('tab', 'tabSelected', tabElem);
}

function clearSettingTabs(){
    let elems = document.getElementsByClassName('settingTab');
    for (let x = 0; x < elems.length; x++){
        swapClass('tab', 'tabNotSelected', elems[x]);
    }
}

function toggleSetting(setting, elem){
    let dynamicOption = dynamicData.options.menu[setting];
    let staticOption = StaticData.options.menu[setting];
    let toggles = staticOption.titles.length;
    dynamicOption.enabled++;
    if(dynamicOption.enabled >= toggles) dynamicOption.enabled = 0;

    let menuElem = (elem) ? elem : document.getElementById("toggle" + setting);
    menuElem.innerHTML = staticOption.titles[dynamicOption.enabled];
    swapClass("settingBtn", "settingBtn" + dynamicOption.enabled, menuElem);
}

function confirmAbandonChallenge() {

}

function updateSellingTitle(titleText){
    let awards = dynamicData.currency.awards;
    if(titleText){
        document.getElementById("sellingTitle").innerHTML = titleText;
    }
    document.getElementById("sellingAwardsOwned").innerHTML = prettify(awards.owned - awards.spentTemp) + GameIcons.awards;
    document.getElementById("totalAwardsEarned").innerHTML = prettify(awards.owned) + GameIcons.awards;
    document.getElementById("totalAwardsSpent").innerHTML = prettify(awards.spentTemp) + GameIcons.awards;
    document.getElementById("totalSells").innerHTML = prettify(dynamicData.global.totalSells);
}

function showAwardChange(){
    let elem = document.getElementById("awardChange");
    let change = dynamicData.currency.awards.owned - dynamicData.currency.awards.lastOwned;
    if(change <=0) elem.innerHTML = "";
    else elem.innerHTML = "(" + prettify(change) + GameIcons.awards + ")";
}

