"use strict";

let startX;
let isDragging = false;
let swipeThreshold = 50; 

let swipeArea = document.getElementById('swipeArea');

swipeArea.addEventListener('touchstart', handleTouchStart);
swipeArea.addEventListener('touchmove', handleTouchMove);
swipeArea.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    isDragging = true;
    console.log("TOUCH START");
}

function handleTouchMove(event) {
    if (isDragging) {
        let currentX = event.touches[0].clientX;
        let deltaX = currentX - startX;

        console.log("TOUCH MOVE - " + deltaX);
        if (deltaX > swipeThreshold) {
            // Swipe right detected, trigger your event here
            console.log("Swipe right detected!");
            // You can replace console.log with your desired event handling code
            isDragging = false; // Reset the dragging flag
        }
    }
}

function handleTouchEnd(event) {
    isDragging = false;
    console.log("TOUCH END");
}
