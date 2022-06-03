function newGame(){
    return {
        global: {
            version: "0.0.1",
            buyTab: "all",
            statsTab: "market",
            numTab: 1,
            buyAmt: 1,
            botLimit: 3,
            start: new Date().getTime(),
            time: 0,
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
            speed: 10,
            productionFilter: ProductionFilters.own
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
                demand: 0,
                supply: 100,
                unitPrice: 0.3
            },
            flour: {
                demand: 0,
                supply: 100,
                unitPrice: 1
            },
            bread:{
                demand: 0,
                supply: 100,
                unitPrice: 0.5
            },
            metal: {
                demand: 0,
                supply: 100,
                unitPrice: 2
            },
            ore: {
                demand: 0,
                supply: 100,
                unitPrice: 0.5
            },
            tool: {
                demand: 0,
                supply: 400,
                unitPrice: 3
            },
            log: {
                demand: 0,
                supply: 100,
                unitPrice: 2
            },
            wood: {
                demand: 0,
                supply: 100,
                unitPrice: 1
            },
            bed: {
                demand: 0,
                supply: 200,
                unitPrice: 10
            },
            cotton: {
                demand: 0,
                supply: 100,
                unitPrice: 0.3
            },
            cloth: {
                demand: 0,
                supply: 100,
                unitPrice: 1
            },
            clothing: {
                demand: 0,
                supply: 1000,
                unitPrice: 5
            }
        },
        bots: {
            WheatBot:{
                blueprint: {
                    active: false,
                    locked: false
                },
                owned: 0,
                tooltip: "This bot can grow one type of produce - wheat",
                input: {},
                output: {
                    wheat: 2
                },
                cost: {
                    metal: [5, 1.22],
                    wood: [5, 1.22]
                },
                upgrades: {
                    owned10: {
                        name: "Scythes",
                        tooltip: "You would wonder how they worked before getting scythes. Well at least they will work twice as fast now.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: ["MillBot"],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            MillBot: {
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "This bot can magically change wheat into flour, no questions asked.",
                input: {
                    wheat: 3
                },
                output: {
                    flour: 1
                },
                cost: {
                    metal: [15, 1.22],
                    cloth: [10, 1.22]
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: ["BreadBot"],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            BreadBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "This bot is able to make bread from only flour! and other things you don't need to worry about",
                input: {
                    flour: 1
                },
                output: {
                    bread: 3
                },
                cost: {
                    cloth: [30, 1.22],
                    metal: [40, 1.22],
                    wood: [20, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            MinerBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "This bot works in the mines for ores so your kids dont have to.",
                input: {},
                output: {
                    ore: 3
                },
                cost: {
                    metal: [5, 1.22],
                    wood: [5, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            SmelterBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "Using some wood and ores, this bot can make the most important resource, hard cold metal!",
                input: {
                    wood: 1,
                    ore: 5
                },
                output: {
                    metal: 2
                },
                cost: {
                    metal: [90, 1.22]
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            ToolSmithBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "If you are only now making tools from metal and wood, how were you able to work before? ahh, don't worry about that.",
                input: {
                    metal: 1,
                    wood: 1
                },
                output: {
                    tool: 2
                },
                cost: {
                    cloth: [30, 1.22],
                    metal: [50, 1.22],
                    wood: [50, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            ForesterBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "Makes sure the forest has trees, but also makes sure you have your logs",
                input: {},
                output: {
                    log: 1
                },
                cost: {
                    metal: [6, 1.22],
                    wood: [4, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            SawBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "Cuts up logs to make wood. I know logs are also wood, but this is a game. Deal with it",
                input: {
                    log: 0.1
                },
                output: {
                    wood: 1
                },
                cost: {
                    metal: [150, 1.22],
                    wood: [30, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            WoodWorkerBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "Could make anything, but decides to make beds from wood and cloth",
                input: {
                    wood: 10,
                    cloth: 4
                },
                output: {
                    bed: 1
                },
                cost: {
                    cloth: [100, 1.22],
                    wood: [30, 1.22],
                    metal: [60, 1.22]
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            CottonBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "Grows and picks cotton from the land. Doesn't like WheatBot, but won't do anything about it",
                input: {},
                output: {
                    cotton: 5
                },
                cost: {
                    cloth: [5, 1.22],
                    wood: [5, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            WeaverBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "Using the magic of fine touch, transforms cotton into cloth",
                input: {
                    cotton: 10
                },
                output: {
                    cloth: 1
                },
                cost: {
                    metal: [20, 1.22],
                    wood: [100, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            },
            TailorBot:{
                blueprint: {
                    active: false,
                    locked: true
                },
                owned: 0,
                tooltip: "Adds the ending 'ing' to the word cloth to make it clothing.",
                input: {
                    cloth: 10
                },
                output: {
                    clothing: 1
                },
                cost: {
                    cloth: [10, 1.22],
                    wood: [50, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned25: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 25,
                        modifierType: UpgradeTypes.production,
                        modifier: 5,
                        extraUnlocks: [],
                        cost: 1000
                    },
                    owned100: {
                        name: "WIP",
                        tooltip: "work in progress.",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 100,
                        modifierType: UpgradeTypes.production,
                        modifier: 10,
                        extraUnlocks: [],
                        cost: 1000
                    }
                }
            }
        },
        currency:{
            credits: {
                owned: 50,
                earned: 0
            }
        },
        market:{
            people: 100,
            usageMod: 1,
            startingPeople: 100,
            growthSpeed: 1.01,
            needs:{
                bread: {
                    active: true,
                    requirement: 0,
                    perPerson: 1
                },
                tool: {
                    active: false,
                    requirement: 100,
                    perPerson: 2
                },
                bed:{
                    active: false,
                    requirement: 300,
                    perPerson: 0.5
                },
                clothing:{
                    active : false,
                    requirement: 900,
                    perPerson: 1
                }
            }
        }
    };
}

const UpgradeTypes = {
    production: 'production',
    input: 'input',
    output: 'output'
}

const StartDefaults = {
    credits: 50
}

const ProductionFilters = {
    own: "own",
    all: "all"
}

let game = newGame();