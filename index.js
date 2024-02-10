"use strict";

let startX;
let startY;
let initialX;

let isDragging = false;
let isAnimationInProgress = false;

let isNerdMode = false;



const card = document.getElementById('card');
const bmi = document.getElementById('bmi');
const likeBox = document.getElementById('likeBox');
const uglyBox = document.getElementById('uglyBox');
const wrongAnswerBox = document.getElementById('wrongAnswer');
const mainText = document.getElementById('mainText');
const nerdmodeText = document.getElementById('nerdmode');
const badboyText = document.getElementById('badboymode');



// BUTTONS
const heartBtn = document.getElementById('heartBtn');
heartBtn.addEventListener('click', swipeRightBtn);
const xBtn = document.getElementById('xBtn');
xBtn.addEventListener('click', swipeLeftBtn);
const nerdBtn = document.getElementById('nerdBtn');
nerdBtn.addEventListener('click', nerdMode);
const badBoyBtn = document.getElementById('badboyBtn');
badBoyBtn.addEventListener('click', badBoyMode);




// 
card.addEventListener('touchstart', handleTouchStart);
card.addEventListener('touchmove', handleTouchMove);
card.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
  // Check if animations are in progress; if so, exit the function
    if (isAnimationInProgress) {
        return;
    }
    startX = event.touches[0].clientX;
    initialX = card.offsetLeft;
    isDragging = true;
}


function handleTouchMove(event) {
  if (isDragging) {
      let offsetX = event.touches[0].clientX - startX;
      // Calculate the halfway point of the card's width
      let halfwayPoint = card.offsetWidth / 2;

      // Apply the same animation logic as in swipeRightBtn
      if (Math.abs(offsetX) > halfwayPoint) {
          // Trigger match or left action based on the direction of the swipe
          let rotationAngle = (Math.abs(offsetX) / halfwayPoint) * 20; // Adjust 20 as needed
          rotationAngle *= offsetX < 0 ? -1 : 1;
          console.log(rotationAngle);
          if (offsetX > 0) {
              match();
          } else {
              left();
          }
          return; // Exit the function after triggering the action
      }

      // Apply styling based on the direction of the swipe
      if (offsetX < 0) {
          // card.style.backgroundColor='red';
          likeBox.style.display = 'none';
          uglyBox.style.display = 'inline-block';
          card.style.boxShadow = '0 0 20px #F74A66';
      } else {
          uglyBox.style.display = 'none';
          likeBox.style.display = 'inline-block';
          card.style.boxShadow = '0 0 20px #63DE9B';
          // card.style.backgroundColor='green';
      }

      // Calculate the rotation angle based on the percentage of the distance swiped
      let rotationAngle = (Math.abs(offsetX) / halfwayPoint) * 20; // Adjust 20 as needed
      rotationAngle *= offsetX < 0 ? -1 : 1; // Adjust direction of rotation based on swipe direction

      card.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;

      // Apply left movement based on offsetX
      card.style.left = initialX + offsetX + 'px';
  }
}



function match() {
  isDragging = false; // Stop dragging
  mainText.innerText='CONGRATULATIONS LAUREN';
  // bmi.style.display = 'none';
  // card.style.height = '100%';
  // card.style.width = '100%';
  // card.style.backgroundColor = 'grey';
  // card.style.left = `0%`;
  // card.style.top = `0%`;
  // card.style.transform = `rotate(0deg)`;

  // // Set the animation flag to true to indicate animations are in progress
  // isAnimationInProgress = true;

  // // Create an image element for the match overlay
  // const matchOverlay = document.createElement('img');
  // matchOverlay.src = 'itsAMatch.png';
  // matchOverlay.style.position = 'absolute';
  // matchOverlay.style.top = '50%';
  // matchOverlay.style.left = '50%';
  // matchOverlay.style.transform = 'translate(-50%, -50%)';
  // matchOverlay.style.zIndex = '999'; // Ensure it's on top of other elements
  // matchOverlay.style.transition = 'opacity 0.5';

  // // Append the match overlay to the card element
  // card.appendChild(matchOverlay);
}

function left() {    
    isDragging = false;
    isAnimationInProgress=true;
    card.style.transition = 'left 0.5s, background-color 0.5s, transform 0.5s'; // Apply transitions
    card.style.left = 50 + '%';
    card.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    
    setTimeout(() => {
        uglyBox.style.display='none';
        wrongAnswerBox.style.display='inline-block';
        card.style.boxShadow='0 0 20px #c056e0';
        card.style.transition = 'left 0.5s, background-color 0.5s, transform 0.1s';
        card.style.transform = `translate(-50%, -50%) rotate(2deg)`;  
    }, 500); // Duration of transition in milliseconds
    setTimeout(() => {
        card.style.transform = `translate(-50%, -50%) rotate(-2deg)`;  
    }, 600); // Duration of transition in milliseconds
    setTimeout(() => {
        card.style.transform = `translate(-50%, -50%) rotate(2deg)`;  
    }, 700); // Duration of transition in milliseconds
    setTimeout(() => {
        card.style.transform = `translate(-50%, -50%) rotate(-2deg)`;  
    }, 800); // Duration of transition in milliseconds
    setTimeout(() => {
      card.style.transform = `translate(-50%, -50%) rotate(0deg)`;  
      card.style.backgroundColor = 'grey';
    }, 900); // Duration of transition in milliseconds

    // Reset transitions after transition ends
    setTimeout(() => {
        card.style.transition = 'none';
        card.style.boxShadow = 'none';
        isAnimationInProgress=false;
        wrongAnswerBox.style.display = 'none';
        initialX = card.offsetLeft;
    }, 1300); // Duration of transition in milliseconds
}



function handleTouchEnd(event) {
  // Check if animations are in progress; if so, exit the function
    if (isAnimationInProgress) {
      return;
    }
    if (!isDragging) {
      return; // Exit the function if not dragging
    } 
    isDragging = false;
    card.style.transition = 'left 0.3s, background-color 0.3s, transform 0.3s'; // Apply transitions
    card.style.left = 50 + '%';
    card.style.backgroundColor = 'grey';
    card.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    card.style.boxShadow = 'none';
    likeBox.style.display='none';
    uglyBox.style.display='none';
    
    // Reset transitions after transition ends
    setTimeout(() => {
        card.style.transition = 'none';
    }, 300); // Duration of transition in milliseconds
}



function swipeRightBtn() {
  // Calculate the halfway point of the card's width
  let halfwayPoint = card.offsetWidth / 2;

  // Set the desired percentage of rotation
  let rotationPercentage = 10; // Adjust as needed

  // Calculate the rotation angle based on the percentage of the card's width
  let rotationAngle = (rotationPercentage / 100) * halfwayPoint;

  // Apply styling
  uglyBox.style.display = 'none';
  likeBox.style.display = 'inline-block';
  card.style.boxShadow = '0 0 20px #63DE9B';
  card.style.transition = 'transform 0.2s ease';

  // Translate the card's width to the right by half its width
  let translateXValue = halfwayPoint;

  // Apply rotation and translation
  card.style.transform = `translate(-50%, -50%) translateX(${translateXValue}px) rotate(${rotationAngle}deg)`;

  match();
}
function swipeLeftBtn() {

  // xBtn.style.backgroundColor = '#F74A66';
  // Calculate the halfway point of the card's width
  let halfwayPoint = card.offsetWidth / 2;

  // Set the desired percentage of rotation
  let rotationPercentage = 10; // Adjust as needed

  // Calculate the rotation angle based on the percentage of the card's width
  let rotationAngle = (rotationPercentage / 100) * halfwayPoint;

  // Apply styling
  likeBox.style.display = 'none';
  uglyBox.style.display = 'inline-block';
  card.style.boxShadow = '0 0 20px #F74A66';
  card.style.transition = 'transform 0.2s ease';

  // Translate the card's width to the left by half its width
  let translateXValue = halfwayPoint;

  // Apply rotation and translation
  card.style.transform = `translate(-50%, -50%) translateX(-${translateXValue}px) rotate(-${rotationAngle}deg)`;

  // left();
  setTimeout(() => {
    left();
  }, 300);
}


function nerdMode() {
  if (isAnimationInProgress || isNerdMode) {
    return;
  }
  nerdBtn.style.backgroundColor='#ffc83d';
  badBoyBtn.style.background='none';
  isNerdMode=true
  isAnimationInProgress=true;
  document.getElementById('coolpic').style.display = 'none';
  document.getElementById('nerdpic').style.display = 'block';
  setTimeout(() => {
    nerdmodeText.style.opacity = 1;
    card.style.boxShadow='0 0 20px #ffc83d';
    setTimeout(() => {
      nerdmodeText.style.opacity = 0;
      card.style.boxShadow = 'none';
      isAnimationInProgress=false;
    }, 1000);
  }, 200);
  // card.style.backgroundImage = 'url("assets/nerd.jpg")';
}

function badBoyMode() {
  if (isAnimationInProgress || !isNerdMode) {
    return;
  }
  badBoyBtn.style.backgroundColor='#4ab2f7';
  nerdBtn.style.background='none';
  isNerdMode=false;
  isAnimationInProgress=true;
  document.getElementById('nerdpic').style.display = 'none';
  document.getElementById('coolpic').style.display = 'block';
  setTimeout(() => {
    badboyText.style.opacity = 1;
    card.style.boxShadow='0 0 20px #4ab2f7';
    setTimeout(() => {
      badboyText.style.opacity = 0;
      card.style.boxShadow = 'none';
      isAnimationInProgress=false;
    }, 1000);
  }, 200);
}





