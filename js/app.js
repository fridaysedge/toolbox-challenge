
// Declare the game variables
var matches = 0;
var remaining = 8;
var missed = 0;
var turnOneTile;
var turnOneImage;

$(document).ready(function(){
    

    // The initial
    initializeGame();

    // Create the timer
    /*
    var startTime = _.now();
    var timer = window.setInterval(function(){
        var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#elapsed-seconds').text(elapsedSeconds);

        if (elapsedSeconds > 10) {
            window.clearInterval(timer);
        }

    }, 1000);

*/

    // Create a listener for the reset/new game button
    $('#reset-button').click(function(){
        initializeGame();
    });

    // Create a listener for the reset/new game button
    $('#start-button').click(function(){
        playGame();

        var startTime = _.now();
        var timer = window.setInterval(function(){
            var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
            $('#time').text(elapsedSeconds);
        }, 1000);
        });


    // At the end of the game, you should congratulate the winner with some kind of message, icon, or animation.

    // give the player instructions on how to play the game in some form. This can be a separate page,
    // linked to from the main game page, so that it remains unobtrusive. Or it can be more real-time
    // help using something like Bootstrap popovers.

    // Remember to give the player proper feedback that lets the player know what kind of actions are
    // allowed for a given screen element, as well as the result of the player's last action.

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
    $('#time').empty();
    $('#time').text('0');

    $('#matches').empty();
    $('#matches').text('0');

    $('#remaining').empty();
    $('#remaining').text('8');

    $('#missed').empty();
    $('#missed').text('0');
}

/*
 * modifyScoreBoard()
 */
function modifyScoreBoard() {
    $('#matches').text(matches);
    $('#remaining').text(remaining);
    $('#missed').text(missed);
}


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
    }

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
}

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

}

/*
 * playGame() allows the user to play the game
 */
function playGame() {

    $('#game-board img').on("click",function(){
        console.log('**** BEGIN CLICK EVENT ****');
        console.log('');
        // Collect the information about this tile
        var img = $(this);
        var tile = img.data('tile');

        console.log('tile at the beginging of the click event');
        console.log(tile);
        console.log('tile stored in: turnOneTile');
        console.log(turnOneTile);
        console.log('');

        // Is this the first turn (has turnOneTile been set)?
        if(!turnOneTile && tile.playable){
            // If true then flip the tile over
            img.attr('src', tile.src);
            
            // make the tile unplayable
            tile.playable = false;
            
            // store the tile
            turnOneImage = img;
            turnOneTile = tile;

            console.log('');
            console.log('tile inside: if(!turnOneTile && tile.playable)');
            console.log(tile);
            console.log('tile stored in: turnOneTile');
            console.log(turnOneTile);
            console.log('');

        }else if(tile.playable){
            // Otherwise, its the second turn, flip the second tile over
            img.attr('src', tile.src);
            
            // make the tile unplayable
            tile.playable = false;
            
            // Does this tile equal the first tile?
            if(tile.tileNum == turnOneTile.tileNum){
                // If true, modify the score board
                turnOneImage = null;
                turnOneTile = null;
                matches++;
                remaining--;
                modifyScoreBoard();

                console.log('tile inside: if(tile.tileNum == turnOneTile.tileNum))');
                console.log(tile);
                console.log('tile stored in: turnOneTile');
                console.log(turnOneTile);
                console.log('');

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

                    missed++;
                    modifyScoreBoard();

                }, 1000);

                console.log('tile inside: the else of if(tile.tileNum == turnOneTile.tileNum))');
                console.log(tile);
                console.log('tile stored in: turnOneTile');
                console.log(turnOneTile);
                console.log('');
            }
        }

        

        console.log('**** END CLICK EVENT ****');
    });


};

function makeMove(){



/*
    // Register the click event for the card images
    $('#game-board img').click(function(){
       var img = $(this);
       var tile = img.data('tile');

       img.fadeOut(100, function(){
            if(tile.flipped){
                img.attr('src', 'img/tile-back.png');
            }else{
                img.attr('src', tile.src);
            }
            tile.flipped = !tile.flipped;
            img.fadeIn(100);
        });
    });

*/


}


