"use strict";

let startX;
let startY;
let initialX;

let isDragging = false;

const card = document.getElementById('card');
const bmi = document.getElementById('bmi');
const likeBox = document.getElementById('likeBox');
const uglyBox = document.getElementById('uglyBox');

card.addEventListener('touchstart', handleTouchStart);
card.addEventListener('touchmove', handleTouchMove);
card.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
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
        }else{
          uglyBox.style.display='none';
          likeBox.style.display='inline-block';
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
}

function left() {    
  isDragging = false;
    card.style.transition = 'left 0.5s, background-color 0.5s, transform 0.5s'; // Apply transitions
    card.style.left = 50 + '%';
    card.style.backgroundColor = 'pink';
    card.style.transform = `translate(-50%, -50%) rotate(0deg)`;

    setTimeout(() => {
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
    // setTimeout(() => {
    //     card.style.transform = `translate(-60%, -50%) rotate(-5deg)`;  
    // }, 400); // Duration of transition in milliseconds
    // setTimeout(() => {
    //     card.style.transform = `translate(-50%, -50%) rotate(0deg)`;  
    // }, 600); // Duration of transition in milliseconds



    // Reset transitions after transition ends
    setTimeout(() => {
        card.style.transition = 'none';
    }, 1300); // Duration of transition in milliseconds
}



function handleTouchEnd(event) {
    if (!isDragging) {
      return; // Exit the function if not dragging
    } 
    isDragging = false;
    card.style.transition = 'left 0.3s, background-color 0.3s, transform 0.3s'; // Apply transitions
    card.style.left = 50 + '%';
    card.style.backgroundColor = 'grey';
    card.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    likeBox.style.display='none';
    uglyBox.style.display='none';
    
    // Reset transitions after transition ends
    setTimeout(() => {
        card.style.transition = 'none';
    }, 300); // Duration of transition in milliseconds
}

