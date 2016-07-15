document.addEventListener('DOMContentLoaded', start)

var selectedTile
var units = []

function start () {
  // var rows = document.getElementsByClassName('row')
  var tiles = document.getElementsByClassName('tile')
  for (var i = 0; i < tiles.length; i++) {
    addTileListener(tiles[i])
  } addUnit(tiles[0])
}

function addTileListener (tile) {
  tile.addEventListener('click', function () {
    select(tile)
  })
}

function select (tile) {
  if (tileIsSelected()) {
    deselect(selectedTile)
  } colorSelected(tile)
  selectedTile = tile
}

function deselect (tile) {
  tile.style.backgroundColor = ''
}

function colorSelected (tile) {
  tile.style.backgroundColor = 'red'
}

function tileIsSelected () {
  return !(selectedTile === undefined)
}

function addUnit (tile) {
  var newUnit = document.createElement('div')
  newUnit.className = 'unit'
  tile.appendChild(newUnit)
  units.push(newUnit)
}
