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
  if (tile.childNodes[1]) {
    displayMoveRange(tile.childNodes[1])
  } selectedTile = tile
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

// function removeUnit (tile) {
// }

function moveUnit (start, end) {
  end.appendChild(selectedTile.childNodes[1])
}

function displayMoveRange (unit) {

}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 5; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  } return color
}
