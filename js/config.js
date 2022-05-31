function newGame(){
    return {
        global: {
            version: "0.0.1",
            buyTab: "all",
            statsTab: "market",
            buyAmt: 1,
            botLimit: 6,
            messages: {
                Market: {
                    enabled: true
                },
                Upgrades: {
                    enabled: true
                },
                Notice:{
                    enabled: true
                }
            },
            buyingMod: 1.25,
            sellingMod: 0.75
        },
        settings: {
            speed: 10
        },
        options:{
            menu:{
                pauseGame:{
                    enabled: 0
                },
                tooltipPosition:{
                    enabled: 0
                },
                timestamps: {
                    enabled: true
                }
            }
        },
        resources: {
            wheat: {
                production: 0,
                demand: 0,
                supply: 1000,
                unitPrice: 0.2
            },
            flour: {
                production: 0,
                demand: 0,
                supply: 2000,
                unitPrice: 0.2
            },
            bread:{
                production: 0,
                demand: 0,
                supply: 1000,
                unitPrice: 1
            },
            metal: {
                production: 0,
                demand: 0,
                supply: 1000,
                unitPrice: 2
            },
            ore: {
                production: 0,
                demand: 0,
                supply: 1000,
                unitPrice: 0.5
            },
            tool: {
                production: 0,
                demand: 0,
                supply: 4000,
                unitPrice: 3
            },
            log: {
                production: 0,
                demand: 0,
                supply: 1000,
                unitPrice: 2
            },
            wood: {
                production: 0,
                demand: 0,
                supply: 1000,
                unitPrice: 1
            },
            bed: {
                production: 0,
                demand: 0,
                supply: 2000,
                unitPrice: 10
            },
            cotton: {
                production: 0,
                demand: 0,
                supply: 1000,
                unitPrice: 0.3
            },
            cloth: {
                production: 0,
                demand: 0,
                supply: 1000,
                unitPrice: 1
            }
        },
        bots: {
            WheatBot:{
                blueprint: {
                    active: false
                },
                owned: 0,
                tooltip: "This bot can grow one type of produce - wheat",
                input: {},
                output: {
                    wheat: 2
                },
                modifier: 0.5,
                cost: {
                    metal: [100, 1.22],
                    wood: [100, 1.22]
                }
            }
        },
        currency:{
            credits: {
                owned: 1000,
                earned: 0
            }
        },
        market:{
            people: 1000,
            usageMod: 1,
            startingPeople: 1000,
            growthSpeed: 1.01,
            needs:{
                bread: {
                    active: true,
                    requirement: 0,
                    perPerson: 1
                },
                tool: {
                    active: false,
                    requirement: 1000,
                    perPerson: 2
                },
                bed:{
                    active: false,
                    requirement: 3000,
                    perPerson: 0.5
                }
            }
        }
    };
}

let game = newGame();