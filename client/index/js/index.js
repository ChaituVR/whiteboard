"use strict";

document.addEventListener("DOMContentLoaded", function(event) { 
const joinButtons = document.querySelector("#join-room-buttons");
const createJoinButtons = document.querySelector("#create-join-buttons"); 
const createButton = document.querySelector('#createButton');
const joinButton = document.querySelector('#joinButton');
const joinRoombtn = document.querySelector('#join-room');
const roomIdfield = document.querySelector('#roomidField');

createJoinButtons.classList.add("buttons-active");

createButton.addEventListener('click',function(){
  document.location.href='/draw';
});

joinButton.addEventListener('click',function(){
  createJoinButtons.classList.remove("buttons-active");
  joinButtons.classList.add("buttons-active");
});

joinRoombtn.addEventListener('click',() => redirectToRoom(document.querySelector("#roomidField").value));
roomIdfield.addEventListener('keydown',e => e.keyCode ==13 ? redirectToRoom(document.querySelector("#roomidField").value) : false);

var redirectToRoom = (roomID) => {
  if(roomID.replace(/ /g,'') != ""){
      document.location.href='/draw/'+roomID;
  }
};

});