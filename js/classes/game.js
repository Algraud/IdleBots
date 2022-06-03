class Game{
    constructor(save) {
        if(typeof save ==="undefined"){
            save = newGame();
        }
        this.global = save.global;
        this.settings = save.settings;

    }
}