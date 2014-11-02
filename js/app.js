"use strict";

// Declare the game variables
var matches = 0;
var remaining = 8;
var missed = 0;
var timer;
var turnOneTile;
var turnOneImage;


$(document).ready(function(){
    // Initialize the game for the first time
    initializeGame();

    // Create a listener for the reset/new game button
    $('#new-game').click(function(){
        // is the game running?
        if(timer){
            // If true, then ask the player is they are sure that they want to re-start
            $('#restart-modal').modal("show");
            $('.modal-backdrop').removeClass('modal-backdrop');
        }else{
            // Re-initialize the game and play
            initializeGame();
            playGame();
        }
    });

    // Create a listener for the directions button
    $('#directions').click(function(){
        $('#directions-modal').modal("show");
        $('.modal-backdrop').removeClass('modal-backdrop');
    });

    // Create a listener for the modal restart button
    $('#restart-yes-button').click(function(){
        // Re-initialize the game and play
        initializeGame();
        playGame();
        // hide the restart modal
        $('#restart-modal').modal("hide");
    });
});

/*
 * initializeGame() processes all the steps you need to start a game
 */
function initializeGame() {
    // Clear the game baord
    $('#game-board').empty();

    // Reset the values in the score board
    initializeScoreBoard();

    // Create the playing deck
    var playingDeck = createDeck();

    // Create the playing board
    createBoard(playingDeck);
};

/*
 * initializeScoreBoard()
 */
function initializeScoreBoard() {
    // Erase any previous values and display initial values
    matches = 0;
    remaining = 8;
    missed = 0;

    $('#matches').text(matches);
    $('#remaining').text(remaining);
    $('#missed').text(missed);

    if(timer){
        window.clearInterval(timer);
        $('#time').text('0');
    };
};

/*
 * reateDeck() creates and shuffles a new playing deck
 */
function createDeck() {
    // select a random set of 8 tiles from the full set of 32 tiles.
    var tiles = [];
    var idx;

    // Create all of the potential playing cards
    for(idx = 1; idx <= 32; ++idx){
        tiles.push({
            tileNum: idx,
            src: 'img/tile' + idx + '.jpg',
            playable: true
        });
    };

    // Create a new "shuffled" set of those cards
    var shuffledTiles = _.shuffle(tiles);

    // Select the first eight cards in that set
    var selectedTiles = shuffledTiles.slice(0, 8);

    // Create the set of "paired" cards that will be used for playing
    var tilePairs = [];
    _.forEach(selectedTiles, function(tile){
        tilePairs.push(_.clone(tile));
        tilePairs.push(_.clone(tile));
    });

    // Shuffle the playing set
    return _.shuffle(tilePairs);
};

/*
 * createBoard() creates the playing board
 */
function createBoard(tiles) {
    // Dynamically create the game board
    var board = $('#game-board');
    var row = $(document.createElement('div'));
    var img;
    _.forEach(tiles, function(tile, elemIndex){

        if(elemIndex > 0 && 0 == elemIndex %4){
            board.append(row);
            row = $(document.createElement('div'));
        };
       img = $(document.createElement('img'));
        img.attr({
            src: 'img/tile-back.png',
            alt: 'image of tile ' + tile.tileNum
        });
        img.data('tile', tile);
        row.append(img);
    });
    board.append(row);

};

/*
 * playGame() allows the user to play the game
 */
function playGame() {

    $('#game-board img').on("click",function(){
        // Collect the information about this tile
        var img = $(this);
        var tile = img.data('tile');

        // Is this the first turn (has turnOneTile been set)?
        if(!turnOneTile && tile.playable){
            // If true then flip the tile over
            img.attr('src', tile.src);
            
            // make the tile unplayable
            tile.playable = false;
            
            // store the tile
            turnOneImage = img;
            turnOneTile = tile;

        }else if(tile.playable){
            // Otherwise, its the second turn, flip the second tile over
            img.attr('src', tile.src);
            
            // make the tile unplayable
            tile.playable = false;
            
            // Does this tile equal the first tile?
            if(tile.tileNum == turnOneTile.tileNum){
                // If true reset the turnOne info
                turnOneImage = null;
                turnOneTile = null;
                // Update the scoreboard
                matches++;
                remaining--;
                updateScoreBoard();

            }else{
                // Otherwise, turn the tiles back over and reset them after 1 second
                setTimeout(function(){
                    // flip both the tiles back over
                    img.attr('src', 'img/tile-back.png');
                    turnOneImage.attr('src', 'img/tile-back.png');
                    turnOneTile.flipped = !turnOneTile.flipped;

                    // Make the both tiles playable
                    tile.playable = true;
                    turnOneTile.playable = true;

                    // clear the stored tile variables
                    turnOneImage = null;
                    turnOneTile = null;

                    // Update the scoreboard
                    missed++;
                    updateScoreBoard();

                }, 1000);

            }
        }

        // Has the game been won?
        if(matches == 8){
            $('#win-modal').modal("show");
            $('.modal-backdrop').removeClass('modal-backdrop');
            $('#win-matches').text(matches);
            $('#win-seconds').text($('#time').text());
            $('#win-missed').text(missed);
            
            // Wait for 5 seconds before you initalize the game
            window.setTimeout(function(){
                initializeGame();
            }, 5000);
            
        };

    });
    
    // Start the game clock
    startClock();
};

/*
 * updateScoreBoard() updates the scoreboard
 */
function updateScoreBoard() {
    $('#matches').text(matches);
    $('#remaining').text(remaining);
    $('#missed').text(missed);
};

/*
 * startClock() starts the game clock
 */
function startClock(){
    var startTime = _.now();
    timer = window.setInterval(function(){
        var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#time').text(elapsedSeconds);
        
        if (matches == 8) {
            window.clearInterval(timer);
        };
    }, 1000);
};