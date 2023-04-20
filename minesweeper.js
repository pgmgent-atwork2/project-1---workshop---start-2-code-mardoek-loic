(() => {
    const app = {
        initialize() {
    },
        cacheElements() {     
        
    },

        buildUI() {
            this.$minesweepergrid.innerHTML = this.generateHTMLForMinesweeperGrid();
            this.registerListeners();
    },
        generateHTMLForMinesweeperGrid() {
            //let us generate 5 random numbers and save em to an array (different numbers between 0 and 15)
            mines = this.generateMines();

            //let us generate 16 tiles, a.k.a. a 4x4 grid, if the tilenumber corresponds with our "mines"-array, we insert a mine
            minefield = this.generateMineField();

            //let us add eventlisteners to the tiles
            //this.registerListeners();

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
                    <div class="tile" id="${(i*GRID_WIDTH)+j}">
                        ${(mines.includes((i*GRID_WIDTH)+j))?"Death":""}
                    </div>
                    `
                    //whenever the *tile-number* (formula = 4 times the outerloop + the innerloop) corresponds with a value in the array, we add a way of telling it is a mine
                    
                }
                
            }
            return output;
    },        
        registerListeners() {
            $tiles = document.querySelectorAll(".tile");
            
            isGameOver = false;
            for (const $tile of $tiles) {
                $tile.addEventListener('click', (e) => {
                    //check if mine or not
                        
                        if(mines.includes(parseInt(e.target.id)) && (isGameOver === false)){
                            //if true, end the game
                            $tile.style.backgroundColor = "red";
                            isGameOver = true;
                            setTimeout(()=>{
                                alert("You lost! Refresh your page to start again.");
                            }, 100)
                        }
                        else if((isGameOver === false)){
                            $tile.style.backgroundColor = "green";
                            $tile.innerHTML = this.countSurroundingMines(e.target.id);
                        }
                    
                        // $tile.style["background-color"] = "red";
                        
                    //if false, assign number
                })
            }
    }, countSurroundingMines(tileId){
        let amountOfMines = 0;
        switch(tileId){
            //TOPLEFT
                case 0:
                    if(this.isMine(0*GRID_WIDTH+1)){
                        amountOfMines++;
                    }
                    if(this.isMine(1*GRID_WIDTH+0)){
                        amountOfMines++;
                    }
                    if(this.isMine(1*GRID_WIDTH+1)){
                        amountOfMines++;
                    }
                    break;
            //TOPRIGHT
                    case (GRID_WIDTH-1):
                        if(this.isMine(0*GRID_WIDTH-1)){
                            amountOfMines++;
                        }
                        if(this.isMine(1*GRID_WIDTH-1)){
                            amountOfMines++;
                        }
                        if(this.isMine(1*GRID_WIDTH)){
                            amountOfMines++;
                            
                        }
                        break;
            //TOPMIDDLE
                        case tileId > 0 && tileId < (GRID_WIDTH - 1):
                            if(this.isMine(tileId + 1)){
                                amountOfMines++;
                            }
                            if(this.isMine(tileId - 1)){
                                amountOfMines++;
                            }
                            if(this.isMine(tileId + 1 + GRID_WIDTH)){
                                amountOfMines++;
                            }
                            if(this.isMine(tileId - 1 + GRID_WIDTH)){
                                amountOfMines++;
                            }
                            if(this.isMine(tileId + GRID_WIDTH)){
                                amountOfMines++;
                            }
                            break;
            //LEFTMIDDLE
            case tileId > 0 && tileId < (GRID_WIDTH - 1) && (tileId % GRID_WIDTH) === 0:
                if(this.isMine(tileId + 1)){
                    amountOfMines++;
                }
                if(this.isMine(tileId - GRID_WIDTH)){
                    amountOfMines++;
                }
                if(this.isMine(tileId + 1 - GRID_WIDTH)){
                    amountOfMines++;
                }
                if(this.isMine(tileId + 1 + GRID_WIDTH)){
                    amountOfMines++;
                }
                if(this.isMine(tileId + GRID_WIDTH)){
                    amountOfMines++;
                }
                break;
            //RIGHTMIDDLE
                case tileId > (GRID_WIDTH-1) && tileId < (GRID_WIDTH * GRID_HEIGHT - 1) && (tileId + 1 % GRID_WIDTH) === 0:
                    if(this.isMine(tileId + 1)){
                        amountOfMines++;
                    }
                    if(this.isMine(tileId - GRID_WIDTH)){
                        amountOfMines++;
                    }
                    if(this.isMine(tileId + 1 - GRID_WIDTH)){
                        amountOfMines++;
                    }
                    if(this.isMine(tileId + 1 + GRID_WIDTH)){
                        amountOfMines++;
                    }
                    if(this.isMine(tileId + GRID_WIDTH)){
                        amountOfMines++;
                    }
                    break;
            
            
            //BOTTOMLEFT
            case (GRID_WIDTH * (GRID_HEIGHT - 1)):
                if(this.isMine((GRID_WIDTH * (GRID_HEIGHT - 2)))){
                    amountOfMines++;
                }
                if(this.isMine(GRID_WIDTH * (GRID_HEIGHT - 2) + 1)){
                    amountOfMines++;
                }
                if(this.isMine((GRID_WIDTH * GRID_HEIGHT - 1) + 1)){
                    amountOfMines++;
                }
                break;
            //BOTTOMRIGHT
            case ((GRID_WIDTH * GRID_HEIGHT) - 1):
                if(this.isMine((GRID_WIDTH * (GRID_HEIGHT - 1) - 1 ))){
                    amountOfMines++;
                }
                if(this.isMine(GRID_WIDTH * (GRID_HEIGHT - 1) - 2)){
                    amountOfMines++;
                }
                if(this.isMine(((GRID_WIDTH * GRID_HEIGHT) - 1) - 1)){
                    amountOfMines++;
                }
                break;
            //BOTTOMMIDDLE
            case tileId > (GRID_WIDTH * (GRID_HEIGHT - 1)) && tileId < (GRID_WIDTH * GRID_HEIGHT - 1):
                if(this.isMine(tileId + 1)){
                    amountOfMines++;
                }
                if(this.isMine(tileId - 1)){
                    amountOfMines++;
                }
                if(this.isMine(tileId + 1 + GRID_WIDTH)){
                    amountOfMines++;
                }
                if(this.isMine(tileId - 1 + GRID_WIDTH)){
                    amountOfMines++;
                }
                if(this.isMine(tileId + GRID_WIDTH)){
                    amountOfMines++;
                }
                break;
                //MIDDLE
                default:
                    if(this.isMine(tileId + 1)){
                    amountOfMines++;
                    }
                    if(this.isMine(tileId - 1)){
                    amountOfMines++;
                }
                    if(this.isMine(tileId - GRID_WIDTH - 1)){
                    amountOfMines++;
                }
                    if(this.isMine(tileId - GRID_WIDTH)){
                    amountOfMines++;
                }
                    if(this.isMine(tileId - GRID_WIDTH + 1)){
                    amountOfMines++;
                }
                    if(this.isMine(tileId + GRID_WIDTH - 1)){
                    amountOfMines++;
                }
                    if(this.isMine(tileId + GRID_WIDTH)){
                    amountOfMines++;
                }
                    if(this.isMine(tileId + GRID_WIDTH + 1)){
                    amountOfMines++;
                }
                    break;
        }
        console.log(amountOfMines);
        return amountOfMines;
    },
    isMine(id){
        return mines.includes(id)?true:false;
    }
    };
        app.initialize();
})();
