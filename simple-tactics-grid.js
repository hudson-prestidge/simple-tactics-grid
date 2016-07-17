document.addEventListener('DOMContentLoaded', start)

var selectedTile = ''

function start () {
  addGridListener(document.getElementsByClassName('grid')[0])
  var tiles = document.getElementsByClassName('tile')
  document.getElementsByClassName('add-circle-unit-btn')[0].addEventListener('click', function () {
    if (tileIsSelected()) {
      addCircleUnit(selectedTile)
    } deselect()
  })
  document.getElementsByClassName('add-square-unit-btn')[0].addEventListener('click', function () {
    if (tileIsSelected()) {
      addSquareUnit(selectedTile)
    } deselect()
  })
  document.getElementsByClassName('remove-unit-btn')[0].addEventListener('click', function () {
    if (tileIsSelected()) {
      removeUnit(selectedTile)
    }
  })
  document.getElementsByClassName('reset-board-btn')[0].addEventListener('click', function () {
    for (var i = 0; i < tiles.length; i++) {
      removeUnit(tiles[i])
    }
  })
  for (var i = 0; i < tiles.length; i++) {
    addTileListeners(tiles[i])
  }
}

function addGridListener (grid) {
  grid.addEventListener('contextmenu', function (evt) {
    evt.preventDefault()
    if (tileIsSelected()) {
      deselect()
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
  } selectedTile = tile
  colorSelected(tile)
  if (tile.childNodes[1]) {
    displayMoveRange(tile.childNodes[1])
  }
}

function deselect () {
  var tiles = document.getElementsByClassName('tile')
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].style.backgroundColor = ''
  }
  selectedTile = ''
}

function colorSelected (tile) {
  tile.style.backgroundColor = 'red'
}

function tileIsSelected () {
  return !(selectedTile === undefined || selectedTile === '')
}

function addCircleUnit (tile) {
  if (!(tile.childNodes[1])) {
    var newUnit = document.createElement('div')
    newUnit.style.backgroundColor = getRandomColor()
    newUnit.className = 'circle-unit'
    tile.appendChild(newUnit)
  }
}

function addSquareUnit (tile) {
  if (!(tile.childNodes[1])) {
    var newUnit = document.createElement('div')
    newUnit.style.backgroundColor = getRandomColor()
    newUnit.className = 'square-unit'
    tile.appendChild(newUnit)
  }
}

function removeUnit (tile) {
  if (tile.childNodes[1]) {
    tile.removeChild(tile.childNodes[1])
    deselect()
  }
}

function moveUnit (start, end) {
  if (end.style.backgroundColor === 'blue' && !(end.childNodes[1])) {
    end.appendChild(selectedTile.childNodes[1])
  }
}

function displayMoveRange (unit) {
  var currentTile = unit.parentElement
  var currentPos = currentTile.id.split('-')
  var tiles = document.getElementsByClassName('tile')
  for (var i = 0; i < tiles.length; i++) {
    var destinationPos = tiles[i].id.split('-')
    // work out if the tile can be moved to. we need to work out if the distance is < the moverange. distance = number of
    // squares to move on x axis + number of squares to move on y axis
    if ((Math.abs(currentPos[1] - destinationPos[1]) + Math.abs(currentPos[2] - destinationPos[2]) < 3)) {
      tiles[i].style.backgroundColor = 'blue'
    }
  } selectedTile.style.backgroundColor = 'red'
}

function getRandomColor () {
  var letters = '0123456789ABCDEF'.split('')
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  } return color
}
