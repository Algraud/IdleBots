function newGame(){
    return {
        global: {
            version: "0.0.2",
            buyTab: "all",
            statsTab: "market",
            numTab: 1,
            buyAmt: 1,
            botLimit: 2,
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
                unitPrice: ResourceCosts.wheat
            },
            flour: {
                demand: 0,
                supply: 100,
                unitPrice: ResourceCosts.flour
            },
            bread:{
                demand: 0,
                supply: 100,
                unitPrice: ResourceCosts.bread
            },
            metal: {
                demand: 0,
                supply: 100,
                unitPrice: ResourceCosts.metal
            },
            ore: {
                demand: 0,
                supply: 100,
                unitPrice: ResourceCosts.ore
            },
            tool: {
                demand: 0,
                supply: 400,
                unitPrice: ResourceCosts.tool
            },
            log: {
                demand: 0,
                supply: 100,
                unitPrice: ResourceCosts.log
            },
            wood: {
                demand: 0,
                supply: 100,
                unitPrice: ResourceCosts.wood
            },
            bed: {
                demand: 0,
                supply: 200,
                unitPrice: ResourceCosts.bed
            },
            cotton: {
                demand: 0,
                supply: 100,
                unitPrice: ResourceCosts.cotton
            },
            cloth: {
                demand: 0,
                supply: 100,
                unitPrice: ResourceCosts.cloth
            },
            clothing: {
                demand: 0,
                supply: 1000,
                unitPrice: ResourceCosts.clothing
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
                    metal: [3, 1.22],
                    wood: [3, 1.22]
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
                        name: "Fertilizers",
                        tooltip: "If you sprinkle some of this magic smelly dust, you will probably get 5 times more wheat!",
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
                        name: "Watering systems",
                        tooltip: "The inclusion of watering systems lets WheatBots cover 10 times more ground at the same time. ",
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
                    metal: [8, 1.22],
                    cloth: [6, 1.22]
                },
                upgrades: {
                    owned10: {
                        name: "Second Stone",
                        tooltip: "Using two stones two grind wheat makes this process two times faster.",
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
                        name: "Wind Power",
                        tooltip: "Who could have thought that letting wind spin the mill will let us work 5 times faster?",
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
                        name: "Full Process Line",
                        tooltip: "Connecting input, process and output into one system makes the whole process 10 times faster. Remove the middleman!",
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
                    cloth: [15, 1.22],
                    metal: [10, 1.22],
                    wood: [10, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "Stone Oven",
                        tooltip: "The old tradition lets you cook twice as many breads at once",
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
                        name: "Cooking Oil",
                        tooltip: "Putting on the cooking oil will make sure the bread doesn't burn so fast. Letting us be five times as efficient.",
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
                        name: "Temperature Control",
                        tooltip: "Knowing the exact temperature lets us calculate exact time of cooking, decreasing the workload 10 times.",
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
                    metal: [7, 1.22],
                    wood: [7, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "Torches",
                        tooltip: "Knowing where to dig is half the battle. That's why it doubles our speed (look out for creepers though).",
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
                        name: "Metal Drills",
                        tooltip: "Spin to win! 5 times the speed.",
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
                        name: "Diamond PickDrill",
                        tooltip: "I heard this increases mining speed by 1000%.",
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
                    ore: 3
                },
                output: {
                    metal: 3
                },
                cost: {
                    metal: [15, 1.22]
                },
                upgrades: {
                    owned10: {
                        name: "Steel Bar",
                        tooltip: "Based on this torn paper, you need one iron ore and one coal ore. That means it will be twice as fast?",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: ["SawBot"],
                        cost: 1000
                    },
                    owned25: {
                        name: "Ice and Fire books",
                        tooltip: "Since we need to heat up and then cool down, i bought these (5) books. Should make us faster.",
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
                        name: "Heat Resistant Belt",
                        tooltip: "This allows us to move the metal out of the furnace without supervision. That's like 90% of the work lost!",
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
                    tool: 4
                },
                cost: {
                    cloth: [10, 1.22],
                    metal: [15, 1.22],
                    wood: [20, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "Anvils",
                        tooltip: "Now we can drop some weight on the thieves who kept stealing half of our production.",
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
                        name: "Casting Molds",
                        tooltip: "The first step of mass production. Now we can make five times more than before.",
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
                        name: "Mountain Ice Water",
                        tooltip: "Cooling off our products in this water skips a lot of time. Ten times in fact.",
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
                    metal: [10, 1.22],
                    wood: [8, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "Birches",
                        tooltip: "These trees grow twice as fast as the [insert generic tree name here].",
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
                        name: "Chainsaws",
                        tooltip: "No more hacking, it will now slide as a chainsaw through butter. That is 5 times as fast.",
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
                        name: "Automatic Planting",
                        tooltip: "As soon as we uproot it, the system plants a new one in its stead. This will allow our ForesterBots to cut down trees 10 times faster.",
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
                    wood: 2
                },
                cost: {
                    metal: [20, 1.22],
                    wood: [8, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "Log Slide",
                        tooltip: "Simplifying the delivery twice as fast, this will also let the log have some fun before meeting its end..",
                        unlocked: false,
                        active: false,
                        milestoneType: "owned",
                        milestone: 10,
                        modifierType: UpgradeTypes.production,
                        modifier: 2,
                        extraUnlocks: ["ForesterBot"],
                        cost: 1000
                    },
                    owned25: {
                        name: "Diamond Blade",
                        tooltip: "No more wood will beat our blades. We will split all 5 of them at once!",
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
                        name: "Ten Blades",
                        tooltip: "Instead of cutting the same log ten times, we will now do it all at once.",
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
                    wood: 4,
                    cloth: 2
                },
                output: {
                    bed: 1
                },
                cost: {
                    cloth: [15, 1.22],
                    wood: [15, 1.22],
                    metal: [25, 1.22]
                },
                upgrades: {
                    owned10: {
                        name: "Queen Size",
                        tooltip: "If we start making smaller beds, we can make twice as many! Especially since the game doesn't differentiate...",
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
                        name: "2 by 4's",
                        tooltip: "Most people don't know whats the significant about these numbers, but most people know they increase the speed 5 times.",
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
                        name: "Ikea Supply",
                        tooltip: "While we won't fall as low as to resell the beds themselves, the bedding is fair game. 10 times as fast!",
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
                    cotton: 10
                },
                cost: {
                    cloth: [20, 1.22],
                    wood: [15, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "Two More Hands",
                        tooltip: "Attaching two more hands to the bot does a lot of things. But more importantly it gives us twice as much cotton.",
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
                        name: "Catching Nets",
                        tooltip: "Picking and putting them in a bag is fine and all, but have you tried throwing them as soon as you pick them? Try it its 5 times faster.",
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
                        name: "Plant Bazooka",
                        tooltip: "Why plant them the normal way, if you can just shoot them in the ground. It is 10 times faster.",
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
                    cloth: 6
                },
                cost: {
                    metal: [25, 1.22],
                    wood: [30, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "Ancient Metal Needle",
                        tooltip: "Why does it make you twice as fast? Beats me, ask your fortune teller.",
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
                        name: "Automatic Loom",
                        tooltip: "No more tapping your foot against the beat. Now you can use it to make 5 times more cloth.",
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
                        name: "All The Dyes",
                        tooltip: "One for each color, sooo.... like 10 times as fast?",
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
                    cloth: 9
                },
                output: {
                    clothing: 4
                },
                cost: {
                    cloth: [50, 1.22],
                    wood: [60, 1.22],
                },
                upgrades: {
                    owned10: {
                        name: "Fashion Magazine",
                        tooltip: "Knowing what to make is half the production. So double the speed by looking at what to make!",
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
                        name: "Art Printing",
                        tooltip: "Printing that cursed anime faces on your clothes lets you make them for single color materials. That is 5 times as fast.",
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
                        name: "Music in the Workplace",
                        tooltip: "Clothing making is a creative process. So why not ten(uple?) your process by listening to some OIÜ.",
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

const ResourceCosts = {
    wheat: 0.5,
    flour: 5,
    bread: 5,
    ore: 0.8,
    metal: 5,
    tool: 6,
    log: 3,
    wood: 4,
    bed: 50,
    cotton: 0.45,
    cloth: 3,
    clothing: 16
}

let game = newGame();