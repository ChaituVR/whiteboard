"use strict"
const createButton = document.querySelector('#createButton');
const joinButton = document.querySelector('#joinButton');
const joinRoombtn = document.querySelector('#join-room');
// createButton.addEventListener('click',function(){
//   document.location.href='/draw';
// });

// joinButton.addEventListener('click',function(){
//   console.log("ENTER KEY TO JOIN");
  
// });

joinRoombtn.addEventListener('click',function(){
    document.location.href='/draw/'+document.querySelector("#roomidField").value;
})
console.log(joinRoombtn);

