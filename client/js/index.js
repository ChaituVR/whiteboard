"use strict"
const createButton = document.querySelector('#createButton');
const joinButton = document.querySelector('#joinButton');
createButton.addEventListener('click',function(){
  document.location.href='/draw';
});

joinButton.addEventListener('click',function(){
  console.log("ENTER KEY TO JOIN");
});
