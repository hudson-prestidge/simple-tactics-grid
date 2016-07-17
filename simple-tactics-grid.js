document.addEventListener('DOMContentLoaded', start)

var selectedTile = ''
var unitDefeated = false
var circleDeaths = 0
var squareDeaths = 0

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
    } if (!unitDefeated) {
      select(tile)
    } else {
      unitDefeated = false
      updateDeaths()
    }
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
  if (end.style.backgroundColor === 'blue') {
    if (!(end.childNodes[1])) {
      end.appendChild(selectedTile.childNodes[1])
    } else if (start.childNodes[1].className !== end.childNodes[1].className) {
      end.appendChild(selectedTile.childNodes[1])
      if (end.childNodes[1].className.split('-')[0] === 'square') {
        squareDeaths++
      } else {
        circleDeaths++
      }
      removeUnit(end)
      unitDefeated = true
    }
  }
}

function displayMoveRange (unit) {
  var currentTile = unit.parentElement
  var currentPos = currentTile.id.split('-')
  var tiles = document.getElementsByClassName('tile')
  for (var i = 0; i < tiles.length; i++) {
    var destinationPos = tiles[i].id.split('-')
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

function updateDeaths () {
  document.getElementById('circle-deaths').innerHTML = 'Circle Deaths: ' + circleDeaths
  document.getElementById('square-deaths').innerHTML = 'Square Deaths: ' + squareDeaths
}
