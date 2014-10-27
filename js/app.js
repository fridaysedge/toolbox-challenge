
$(document).ready(function(){
    var tiles = [];
    var idx;
    for(idx = 1; idx <= 32; ++idx){
        tiles.push({
            tileNum: idx,
            src: 'img/tile' + idx + '.jpg'
        });
    }
    console.log(tiles);

    var shuffledTiles = _.shuffle(tiles);
    console.log(shuffledTiles);

    var selectedTiles = shuffledTiles.slice(0, 8);
    console.log(selectedTiles);

    var tilePairs = [];
    _.forEach(selectedTiles, function(tile){
        tilePairs.push(_.clone(tile));
        tilePairs.push(_.clone(tile));
    });

});