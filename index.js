"use strict";

let startX;
let startY;
let initialX;

let isDragging = false;
let isAnimationInProgress = false;

let isNerdMode = false;



const card = document.getElementById('card');
const matchCard = document.getElementById('matchCard');
const bmi = document.getElementById('bmi');
const likeBox = document.getElementById('likeBox');
const uglyBox = document.getElementById('uglyBox');
const wrongAnswerBox = document.getElementById('wrongAnswer');
const mainText = document.getElementById('mainText');
const nerdmodeText = document.getElementById('nerdmode');

const kiss = document.getElementById('kiss');

const badboyText = document.getElementById('badboymode');

let valentinesNameWrong = 'Laura'

const magicBtns = document.getElementById('magicButtons');


// BUTTONS
const heartBtn = document.getElementById('heartBtn');
heartBtn.addEventListener('click', swipeRightBtn);
const xBtn = document.getElementById('xBtn');
xBtn.addEventListener('click', swipeLeftBtn);
const nerdBtn = document.getElementById('nerdBtn');
nerdBtn.addEventListener('click', nerdMode);
const badBoyBtn = document.getElementById('badboyBtn');
badBoyBtn.addEventListener('click', badBoyMode);
const playAgainBtn = document.getElementById('playAgain');
playAgainBtn.addEventListener('click', replay);




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
            match(offsetX, rotationAngle);
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




function match(transX, rotationAngle) {

  isDragging = false; // Stop dragging

  card.style.transition = 'transform 0.4s ease-in';
  // setTimeout(() => {
    card.style.transform = `translate(-50%, -50%) translateX(${4*transX}px) rotate(${rotationAngle}deg)`;
  // }, 50);
  setTimeout(() => {
    // card.style.transform = `translate(-50%, -50%) translateX(${4*transX}px) rotate(${rotationAngle}deg)`;
    magicBtns.style.display='none';
    card.style.display='none';
    playAgainBtn.style.display='block';
    
    matchCard.style.display='block';
    matchCard.style.transform=`translate(-50%, -50%) rotate(${rotationAngle}deg)`;
    function animateToCenter() {
      matchCard.style.left = '50%'
      matchCard.style.transform=`translate(-50%, -50%) rotate(${0}deg)`;
      // card.style.transform = `translate(-50%, -50%)`;
      // matchCard.style.transform = `rotate(${rotationAngle}deg)`; // Apply rotation angle
    }
    // animateToCenter();
    // Set a timeout to execute the animation after 200 milliseconds
    setTimeout(animateToCenter, 50);


  }, 300);
  

  function type(letter){
      mainText.innerHTML +=letter; 
  }

  mainText.innerHTML=''
  bmi.style.opacity=0

  setTimeout(()=>{
    mainText.innerHTML = `Happy Valentines <br> `;
    bmi.style.opacity=1;
    setTimeout(typeMessage, 1000);
  },1000)

  
  function typeMessage(){
    const message=`${valentinesNameWrong}!`
    let index=0;
    const len = message.length;
  
    const interval = setInterval(() => {
      console.log(message[index]);
      type(message[index] );
      index++;
      if (index >= len) { // Change 10 to the desired count
        clearInterval(interval); // Clear the interval
        setTimeout(()=>{
          getNameRight();
        }, 3000)
      }
    }, 300);
  
  
    function getNameRight(){
      index=0
      let interval = setInterval(() => {
  
        mainText.innerHTML  = mainText.innerHTML.slice(0, -1); 
        index++;
        if (index >= 2) { // Change 10 to the desired count
          clearInterval(interval); // Clear the interval
  
          const fixedEnding='en!!!'
          index=0;
          const nuinterval = setInterval(() => {
            console.log(fixedEnding[index]);
            type(fixedEnding[index]);
            index++;
            if (index >= fixedEnding.length) { // Change 10 to the desired count
              clearInterval(nuinterval); // Clear the interval
              setTimeout(()=>{
                // kiss.style.display='inline';
                mainText.innerHTML+=`<span id="kiss" style="font-style: normal; position:absolute;">😘</span>`
                confettiTime();
              }, 1000)
            }
          }, 300);
        }
      }, 300);
  
    }
  }



  
  function confettiTime(){
    confetti({
      // Options here
      particleCount: 150,
      spread: 70,
      ticks: 800,
      origin: {
        y:0
      }
    });
    setInterval(() => {
      confetti({
        // Options here
        particleCount: 60,
        spread: 70,
        ticks: 800,
        origin: {
          y:0
        }
      });
      setTimeout(() => {
        playAgainBtn.style.opacity=1;
        
      }, 1000);
    }, 500);
  }

  // const container = document.querySelector('#firework-container')
  // const fireworks = new Fireworks.Fireworks(container, {
  //   traceLength: 1,
  //   explosion:1,
  //   traceSpeed: 2
  // })
  // fireworks.start()
  
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

  card.style.transition = 'transform 0.4s ease-in';

  // Translate the card's width to the right by half its width
  let translateXValue = halfwayPoint;

  // Apply rotation and translation
  card.style.transform = `translate(-50%, -50%) translateX(${translateXValue}px) rotate(${rotationAngle}deg)`;
  setTimeout(() => {
    match(translateXValue, rotationAngle);
  }, 400);

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



function replay(){
  playAgainBtn.style.color='white'
  playAgainBtn.style.backgroundColor='#F74A66'
  location.reload();
}

