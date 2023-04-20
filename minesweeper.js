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
            // mines = this.generateMines();

            //let us generate 16 tiles, a.k.a. a 4x4 grid, if the tilenumber corresponds with our "mines"-array, we insert a mine
            minefield = this.generateMineField();

            //let us add eventlisteners to the tiles
            this.registerListeners();

            //we got everything, let us return it all the way to our html-page
            return minefield;

            //Creates an array of 5 random numbers between 0 and 15
    }, 
        generateMines(){
        let uniqueNumbers = [];

        while (uniqueNumbers.length < 5) {
        let randomNumber = Math.floor(Math.random() * 16); // generate a random number between 0 and 15
        if (!uniqueNumbers.includes(randomNumber)) { // check if the number already exists in the array
            uniqueNumbers.push(randomNumber); // add the number to the array if it's unique
        }
        }
            return uniqueNumbers;
    }   ,
        generateMineField(){
            let output = "";
            // mines = this.generateMines;
            mines = [0,5,7,8,9]; // testing purposes
            for (let i = 0; i< GRID_WIDTH; i++) {
                for (let j = 0; j < GRID_HEIGHT; j++) {
                    output += `
                    <div class="tile" id="tile${(i*4)+j}">
                        ${(mines.includes((i*4)+j))?"Death":""}
                    </div>
                    `
                    //whenever the *tile-number* (formula = 4 times the outerloop + the innerloop) corresponds with a value in the array, we add a way of telling it is a mine
                    
                        console.log((i*4)+j)
                }
                
            }
            return output;
    },        
        registerListeners() {
        
    }
    };
        app.initialize();
})();