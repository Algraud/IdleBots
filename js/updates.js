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

function filterTabs(what) {
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

function toggleTab(what, enable){
    let elem = document.getElementById(what + "Tab");
    if(enable) {
        elem.className = elem.className.replace("tabNotSelected", "tabSelected");
    }else{
        elem.className = elem.className.replace("tabSelected", "tabNotSelected");
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
}

function drawAllBots(){
    const elem = document.getElementById("botsHere");
    elem.innerHTML = "";
    for (const item in game.bots){
        const bot = game.bots[item];
        if(bot.locked) continue;
        drawBot(item, elem);
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
function unlockBot(what){
    const bot = game.bots[what];
    bot.locked = false;
    drawAllBots();
}

function checkButtons(what){
    const where = game[what];
    if(what == "bots"){
        for(let item in game.bots){
            if(game.bots[item].locked == 1) continue;
            updateButtonColor(item,canAffordBot(item));
        }
        return;
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
            for(let res in bot.input){
                elem = document.getElementById(item + res + "Input");
                let number = bot.input[res] * bot.owned;
                elem.innerHTML = res + ": " + prettify(number) + " /s";
            }
            for (let res in bot.output){
                elem = document.getElementById(item + res + "Output");
                let number = bot.output[res] * bot.owned;
                elem.innerHTML = res + ": " + prettify(number) + " /s";
            }
            /*
            elem = document.getElementById(item + "Profit");
            elem.innerHTML = */
        }
    }
}
