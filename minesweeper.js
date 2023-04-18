(() => {
    const app = {
        //1. Application started!
        initialize() {
        
        this.cacheElements();
        this.buildUI();
        
    },
        //2. Cache all existing DOM elements!);
        cacheElements() {
            GRID_HEIGHT = 4;
            GRID_WIDTH = 4;
            MINES_COUNT = 5;

            this.$minesweepergrid = document.getElementById("minesweeper-grid");
            
        
    },
        //3. Build the user interface!
        buildUI() {
            this.$minesweepergrid.innerHTML = this.generateHTMLForMinesweeperGrid();
    },
        generateHTMLForMinesweeperGrid() {
            //let us generate 5 random numbers and save em to an array (different numbers between 0 and 15)
            mines = this.generateMines();

            //let us generate 16 tiles, a.k.a. a 4x4 grid, if the tilenumber corresponds with our "mines"-array, we insert a mine
            minefield = this.generateMineField();

            //let us add eventlisteners to the tiles
            this.registerListeners();

            //we got everything, let us return it all the way to our html-page
            return minefield;

    }, generateMines(){

    }   ,
        generateMineField(){
            for (let i = 0; i< GRID_WIDTH; i++) {
                for (let j = 0; j < GRID_HEIGHT; j++) {
                    output += `
                    <div class="tile" id="tile${(i*4)+j}">
                        
                    </div>
                    `
                    //whenever the *tile-number* (formula = 4 times the outerloop + the innerloop) corresponds with a value in the array, we add a way of telling it is a mine
                    if(mines.includes((i*4)+j))

                }
                
            }
    },        
    registerListeners() {
        
    }
    };
        app.initialize();
})();