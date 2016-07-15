document.addEventListener('DOMContentLoaded', start)

var selectedTile
var units = []

function start () {
  // var rows = document.getElementsByClassName('row')
  addGridListener(document.getElementsByClassName('grid')[0])
  var tiles = document.getElementsByClassName('tile')
  for (var i = 0; i < tiles.length; i++) {
    addTileListeners(tiles[i])
  } addUnit(tiles[0])
}

function addGridListener (grid) {
  grid.addEventListener('contextmenu', function (evt) {
    evt.preventDefault()
    if (tileIsSelected()) {
      deselect(selectedTile)
    }
  })
}

function addTileListeners (tile) {
  tile.addEventListener('click', function () {
    if (tileIsSelected() && selectedTile.childNodes[1]) {
      moveUnit(selectedTile, tile)
    }select(tile)
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
  selectedTile = ''
}

function colorSelected (tile) {
  tile.style.backgroundColor = 'red'
}

function tileIsSelected () {
  return !(selectedTile === undefined || selectedTile === '')
}

function addUnit (tile) {
  var newUnit = document.createElement('div')
  newUnit.className = 'unit'
  tile.appendChild(newUnit)
  units.push(newUnit)
}

function removeUnit (tile) {
  tile.removeChild(tile.childNodes[1])
}

function moveUnit (start, end) {
  removeUnit(selectedTile)
  addUnit(end)
}
