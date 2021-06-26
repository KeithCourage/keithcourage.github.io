var yOffset = 500;
var doorOffset = 180;
var doorHeight = 54;
var lastYPosition = 0;
var scrollingDown = true;
var bubbles = document.getElementsByClassName('bubble');
var heroes = document.getElementsByClassName('hero');
var doors = document.getElementsByClassName('transition-door');
var closedDoors = document.getElementsByClassName('transition-door-closed');
var ticking = false;

/* Initialization */

function init() {
  document.body.addEventListener('scroll', onScroll);
  Array.from(bubbles).forEach(hide);
}

/* Bubble animations */

function hide(item) {
  setOpactiy(item, 0);
}

function show(item, fadeIn) {
  if(fadeIn) {
    item.style.transition = "opacity 1s";
  }
  setOpactiy(item, 1);
}

function setOpactiy(item, opacity) {
  item.style.opacity = opacity.toString();
}

function verifyScrollPosition(item, y, offset) {
  return y > item.offsetTop - offset;
}

/* Hero animations */

function swapHeroes() {
  for (var i = 0; i < heroes.length; i++) {
    let currentSrc = heroes[i].src;
    //cut '.gif' ending
    currentSrc = currentSrc.slice(0, currentSrc.length - 4);
    if(scrollingDown) {
      //cut -flip ending
      currentSrc = currentSrc.slice(0, currentSrc.length - 5);
      //add .gif ending
      heroes[i].src = currentSrc + ".gif";
    }
    else {
      //add -flip.gif ending
      heroes[i].src = currentSrc + "-flip.gif";
    }
  }
}

/* Scroll-triggered changes */

function onScroll() {
  /* Throttle animations via timeout */
  if (!ticking) {
    setTimeout(checkScrollTriggers, 100);
    ticking = true;
  }
}

function checkScrollTriggers() {
  let y = document.body.scrollTop;
  //Show NPC bubbles
  for (var i = 0; i < bubbles.length; i++) {
    if(verifyScrollPosition(bubbles[i], y, yOffset)) {
      show(bubbles[i], true);
    }
  }
  //Change door when hero walks through
  for(var i = 0; i < closedDoors.length; i++) {
    let doorTop = doors[i].offsetTop;
    if(y > doorTop - doorOffset &&
      y < doorTop - doorOffset + doorHeight) {
      closedDoors[i].classList.add("hidden");
    }
    else {
      closedDoors[i].classList.remove("hidden");
    }
  }
  //check for change in scroll direction
  if(scrollingDown && lastYPosition > y) {
    //show upward-facing hero
    scrollingDown = false;
    swapHeroes();
  }
  else if(!scrollingDown && lastYPosition < y) {
    //show downward-facing hero
    scrollingDown = true;
    swapHeroes();
  }
  lastYPosition = y;
  //allow scroll event call again
  ticking = false;
}

window.onload = init;
