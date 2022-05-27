function newGame(){
    return {
        global: {
            version: "0.0.1",
            buyTab: "all",
            buyAmt: 1,
            messages: {
                Market: {
                    enabled: true
                },
                Upgrades: {
                    enabled: true
                }
            }
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
                }
            }
        },
        resources: {
            wheat: {
                production: 0,
                demand: 1000,
                supply: 1000,
                unitPrice: 0.2
            },
            metal: {
                production: 0,
                demand: 1000,
                supply: 1000,
                unitPrice: 2
            },
            wood: {
                production: 0,
                demand: 1000,
                supply: 1000,
                unitPrice: 1
            }

        },
        bots: {
            WheatBot:{
                blueprint: {
                    active: true
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
                },
                locked: false
            }
        },
        currency:{
            credits: {
                owned: 1000,
                earned: 0
            }
        }
    };
}

let game = newGame();