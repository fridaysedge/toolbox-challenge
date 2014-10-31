
$(document).ready(function(){
    

    // The initial
    initializeGame();

    // Create the timer
    var startTime = _.now();
    var timer = window.setInterval(function(){
        var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
        $('#elapsed-seconds').text(elapsedSeconds);

        if (elapsedSeconds > 10) {
            window.clearInterval(timer);
        }

    }, 1000);

    // Create a listener for the reset/new game button
    $('#reset-button').click(function(){
        initializeGame();
    });

    // Create a listener for the reset/new game button
    $('#start-button').click(function(){
        playGame();
    });



    // Create a listener for the start game button



    // Button to start a new game

    // Button to start the current game

    // If the two images are the same, they are matched, and should remain revealed.

    // If they are not the same, both tiles should be flipped back over after 1 second.

    // The game is won when all tiles are matched (facing up).

    // Your code should also keep track of how long the user has been playing,

    // how many matches have been made so far

    // how many pairs remain to be matched

    // how many attempts resulted in failure (no match)

    // These four statistics should be displayed to the player throughout the game

    // with the timer refreshing every second

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
            src: 'img/tile' + idx + '.jpg'
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
    // Declare variables
    var matches = 0;
    var remaining = 8;
    var missed = 0;
    var firstTile;
    var secondTile;

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
    

    /*Start the game loop
    while(matches <= 8){

        // have turn
    }
    */
}




