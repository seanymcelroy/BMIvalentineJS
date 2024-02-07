"use strict";

let startX;
let startY;
let initialX;

let isDragging = false;
let isAnimationInProgress = false;

const card = document.getElementById('card');
const bmi = document.getElementById('bmi');
const likeBox = document.getElementById('likeBox');
const uglyBox = document.getElementById('uglyBox');
const wrongAnswerBox = document.getElementById('wrongAnswer');

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
        // let offsetY = event.touches[0].clientY - startY;
        card.style.left = initialX + offsetX + 'px';
        
        if (offsetX<0){
          // card.style.backgroundColor='red';
          likeBox.style.display='none';
          uglyBox.style.display='inline-block';
          card.style.boxShadow='0 0 20px #F74A66';
        }else{
          uglyBox.style.display='none';
          likeBox.style.display='inline-block';
          card.style.boxShadow='0 0 20px #63DE9B';
          // card.style.backgroundColor='green';
        }
        let rotationAngle = offsetX / 10;
        // console.log('Rotation Angle : ' +rotationAngle);
        card.style.transform = ` translate(-50%, -50%) rotate(${rotationAngle}deg)`;

        if (offsetX>240){
          match();
        }
        else if(offsetX<-240){
          left();
        }
    }
}

function match() {
  isDragging = false; // Stop dragging
  bmi.style.display = 'none';
  card.style.height = '100%';
  card.style.width = '100%';
  card.style.backgroundColor = 'grey';
  card.style.left = `0%`;
  card.style.top = `0%`;
  card.style.transform = `rotate(0deg)`;

  // Set the animation flag to true to indicate animations are in progress
  isAnimationInProgress = true;

  // Create an image element for the match overlay
  const matchOverlay = document.createElement('img');
  matchOverlay.src = 'itsAMatch.png';
  matchOverlay.style.position = 'absolute';
  matchOverlay.style.top = '50%';
  matchOverlay.style.left = '50%';
  matchOverlay.style.transform = 'translate(-50%, -50%)';
  matchOverlay.style.zIndex = '999'; // Ensure it's on top of other elements
  matchOverlay.style.transition = 'opacity 0.5';

  // Append the match overlay to the card element
  card.appendChild(matchOverlay);
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
        card.style.boxShadow='0 0 20px #4ab2f7';
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

