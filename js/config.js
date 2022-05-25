function newGame(){
    return {
        global: {
            version: "0.0.1"
        },
        settings: {
            speed: 10
        },
        options:{
            menu:{
                pauseGame:{
                    enabled: 0
                }
            }
        },
        resources: {
            wheat: {
                demand: 1000,
                supply: 1000,
                unitPrice: 0.2
            }
        },
        jobs: {
            GrowBot:{
                owned: 0,
                tooltip: "This bot can grow one type of produce - wheat",
                increase: "wheat",
                modifier: 0.5
            }
        },
        currency:{
            credits: {
                owned: 1000
            }
        }
    };
}

let game = newGame();