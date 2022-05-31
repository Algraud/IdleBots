
let tooltipUpdateFunction = "";
let onShift;

function tooltip(what, isItIn, event){
    checkAlert(what, isItIn);
    let elem = document.getElementById("tooltipDiv");
    swapClass("tooltipExtra", "tooltipExtraNone", elem);
    document.getElementById('tipText').className = "";
    if(what == "hide"){
        elem.style.display = "none";
        tooltipUpdateFunction = "";
        onShift = null;
        return;
    }

    let tooltipText = "";
    let costText = "";
    let toTip;
    let titleText = "";
    let tip2 = false;
    if(isItIn !== null){
        toTip = game[isItIn][what];
        if(typeof toTip === 'undefined') console.log(what);
        else {
            tooltipText = toTip.tooltip;
           /* if(typeof toTip.cost !== 'undefined'){
                costText = addTooltipPricing(toTip, what, isItIn);
            }*/
        }
    }
    switch(isItIn){
        case "bots":
            costText = canAffordBot(what, false, true);
            what += " X " + prettify((game.global.buyAmt == "Max") ? calculateMaxAfford(game.bots[what], true)
                : game.global.buyAmt)
    }
    titleText = (titleText) ? titleText : what;
    let tipNum = (tip2) ? "2" : "";
    document.getElementById("tipTitle" + tipNum).innerHTML = titleText;
    document.getElementById("tipText" + tipNum).innerHTML = tooltipText;
    document.getElementById("tipCost" + tipNum).innerHTML = costText;
    elem.style.display = "block";
    if(event != "update"){
        positionToolTip(elem, event);
    }
}
let lastMousePos;

function positionToolTip(elem, event){
    let cordx = 0;
    let cordy = 0;
    let e = event || window.event;
    if (!e) return;
    if(e.pageX || e.pageY){
        cordy = e.pageY;
        cordx = e.pageX;
    } else if (e.clientX || e.clientY){
        cordy = e.clientY;
        cordx = e.clientX;
    }
    lastMousePos = [cordx, cordy];
    let bodw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        bodh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        tipw = bodw * .325,
        tiph = Math.max(elem.clientHeight, elem.scrollHeight, elem.offsetHeight),
        center = cordx - (tipw /2),
        spacing = bodh * 0.04,
        setLeft,
        setTop,
        setting;
    setting = game.options.menu.tooltipPosition.enabled;
    if(setting == 0){
        setLeft = cordx + spacing;
        if((setLeft + tipw) > bodw) setLeft = bodw - tipw;
        setTop = cordy - tiph - spacing;
    }
    if(setting >= 1 || setTop < 0){
        setLeft = center;
        if(setLeft < 0) setLeft = 0;
        else if (setLeft > (bodw - tipw)) setLeft = bodw - tipw;
        const maxAbove = cordy - tiph - spacing;
        if(setting == 1 || maxAbove < 0){
            setTop = cordy + spacing;
            if((setTop + tiph) > bodh) setTop = maxAbove;
        } else {
            setTop = maxAbove;
        }
    }
    elem.style.left = Math.floor(setLeft) + "px";
    elem.style.top = Math. floor(setTop) + "px";
}

function prettify(number){
    if (!isFinite(number)) return "<i class='bi-infinity'></i>";
    if(number >= 1000 && number < 10000) return Math.floor(number);
    if(number === 0) return prettifySub(0);
    if(number < 0) return "-" + prettify(-number);
    if(number < 0.005) return (+number).toExponential(2);

    let base = Math.floor(Math.log(number) / Math.log(1000));
    if(base <= 0) return prettifySub(number);

    number/= Math.pow(1000, base);
    if(number >= 999.5){
        number /= 1000;
        base++;
    }
    const suffices = [
        'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud',
        'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'V', 'Uv', 'Dv',
        'Tv', 'Qav', 'Qiv', 'Sxv', 'Spv', 'Ov', 'Nv', 'Tg', 'Utg', 'Dtg', 'Ttg',
        'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Otg', 'Ntg', 'Qaa', 'Uqa', 'Dqa', 'Tqa',
        'Qaqa', 'Qiqa', 'Sxqa', 'Spqa', 'Oqa', 'Nqa', 'Qia', 'Uqi', 'Dqi',
        'Tqi', 'Qaqi', 'Qiqi', 'Sxqi', 'Spqi', 'Oqi', 'Nqi', 'Sxa', 'Usx',
        'Dsx', 'Tsx', 'Qasx', 'Qisx', 'Sxsx', 'Spsx', 'Osx', 'Nsx', 'Spa',
        'Usp', 'Dsp', 'Tsp', 'Qasp', 'Qisp', 'Sxsp', 'Spsp', 'Osp', 'Nsp',
        'Og', 'Uog', 'Dog', 'Tog', 'Qaog', 'Qiog', 'Sxog', 'Spog', 'Oog',
        'Nog', 'Na', 'Un', 'Dn', 'Tn', 'Qan', 'Qin', 'Sxn', 'Spn', 'On',
        'Nn', 'Ct', 'Uc'
    ];
    let suffix;
    if(base > suffices.length){
        suffix = "e" + ((base) * 3);
    } else {
        suffix = suffices[base - 1];
    }
    return prettifySub(number) + suffix;

}

function prettifySub(number){
    number = parseFloat(number);
    const floor = Math.floor(number);
    if(number === floor) return number;

    return number.toFixed(3 - floor.toString().length);
}

function checkAlert(what, isItIn){
    const alert = document.getElementById(what + "Alert");
    if(alert === null) return;
    if(typeof game[isItIn] === 'undefined') return;
    game[isItIn][what].alert = false;
    alert.innerHTML = "";
    const groupAlert = document.getElementById(isItIn + "Alert");
    if(groupAlert !== null) groupAlert.innerHTML = "";
}

function swapClass(prefix, newClass, elem){
    if(elem === null){
        console.log("swapClass, no element found. Prefix: " + prefix + ", newClass: " + newClass);
        return;
    }
    let className = elem.className;
    if(typeof className.split('newClass')[1] !== 'undefined') return;
    className = className.split(prefix);
    if(typeof className[1] === 'undefined') {
        console.log("swapClass function error: Tried to replace a class that doesn't exist at [" + elem.className + "] using " + prefix + " as prefix and " + newClass + " as target class.");
        elem.className += " " + newClass;
        return;
    }
    const classEnd = className[1].indexOf(' ');
    if(classEnd >= 0){
        className = className[0] + newClass + className[1].slice(classEnd, className[1].length);
    } else {
        className = className[0] + newClass;
    }
    elem.className = className;
}

function capitalize(string){
    return string[0].toUpperCase() + string.slice(1);
}


