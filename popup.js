// Update the relevant fields with the new data.
const setInfo = info => {
  
  // 1) Update the paragraphs text
  document.getElementById('paragraphs').textContent = info.paragraphs;
  // 2) Update the paragraphs slider.
  animateSlider(1,info.paragraphs*100);

  // 1) Update the questions text
  document.getElementById('questions').textContent = info.questions;
  // 2) Update the questions slider.
  animateSlider2(2,info.questions*100);

  // 1) Update the Grade Level text
  document.getElementById('grade').textContent = info.grade;
  // 2) Update the Grade Level Slider.
  animateSlider3(3,info.grade*100);

  // Logic for displaying checks
  if(info.paragraphs !== 3) {
    var check1 = document.getElementById('check1').style.display = "none";
  }
  else {
    var check1 = document.getElementById('check1').style.display = "flex";
  }
  if(info.questions !== 1 && info.questions !== 2) {
    var check2 = document.getElementById('check2').style.display = "none";
  }
  else {
    var check2 = document.getElementById('check2').style.display = "flex";
  }
  if(info.grade > 0 && info.grade <= 7) {
    var check3 = document.getElementById('check3').style.display = "flex";
  }
  else {
    var check3 = document.getElementById('check3').style.display = "none";
  }
};

// Listen for messages from the contentScript.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'contentScript') && (msg.subject === 'updateUI')) {
      var updatedInfo = {
        paragraphs: msg.paragraphs,
        questions: msg.questions,
        grade: msg.grade
      };
  
      setInfo(updatedInfo);
    }
});

// The timer function a Promise that resolves after "ms" Milliseconds
// Used in async functions to animate the slider activity
const timer = ms => new Promise(res => setTimeout(res, ms))

// Adding discrete asynchronous functions for every insight
async function animateSlider(insight, target) {

  // The value is the target
  insightId = "range" + insight; // Ex: "range1" as a string
  var rangeValue = document.getElementById(insightId).value; // Old value

  if(rangeValue<target) { // If the old value is less than the target, it needs to increase
    while (rangeValue !== target) {
      rangeValue++;
      document.getElementById(insightId).value = rangeValue;
      await timer(5);
    }
  }
  else if(rangeValue>target) { // If the old value is more than the target, it needs to decrease
    while (rangeValue !== target) {
      rangeValue--;
      document.getElementById(insightId).value = rangeValue;
      await timer(5);
    }
  }
};

async function animateSlider2(insight, target) {

  // The value is the target
  insightId2 = "range" + insight; // Ex: "range1" as a string
  var rangeValue2 = document.getElementById(insightId2).value; // Old value

  if(rangeValue2<target) { // If the old value is less than the target, it needs to increase
    while (rangeValue2 !== target) {
      rangeValue2++;
      document.getElementById(insightId2).value = rangeValue2;
      await timer(5);
    }
  }
  else if(rangeValue2>target) { // If the old value is more than the target, it needs to decrease
    while (rangeValue2 !== target) {
      rangeValue2--;
      document.getElementById(insightId2).value = rangeValue2;
      await timer(5);
    }
  }
};

async function animateSlider3(insight, target) {

  // The value is the target
  insightId3 = "range" + insight; // Ex: "range1" as a string
  var rangeValue3 = document.getElementById(insightId3).value; // Old value

  if(rangeValue3<target) { // If the old value is less than the target, it needs to increase
    while (rangeValue3 !== target) {
      rangeValue3++;
      document.getElementById(insightId3).value = rangeValue3;
      await timer(5);
    }
  }
  else if(rangeValue3>target) { // If the old value is more than the target, it needs to decrease
    while (rangeValue3 !== target) {
      rangeValue3--;
      document.getElementById(insightId3).value = rangeValue3;
      await timer(5);
    }
  }
};

// Listen for messages to close the iframe from popup.js
document.getElementById('exit').addEventListener('click',function(){
  chrome.tabs.getCurrent(tab => {
    chrome.tabs.sendMessage(tab.id, {
      from: 'popup',
      subject: 'closeFrame',
    }, {frameId: 0});
  });
});

// By default, hide all check values.
var check1 = document.getElementById('check1').style.display = "none";
var check2 = document.getElementById('check2').style.display = "none";
var check3 = document.getElementById('check3').style.display = "none";
var check4 = document.getElementById('check4').style.display = "none";
// By default, hide all explanations.
var explanation1 = document.getElementById("paragraph__explanation").style.display = "none";
var explanation2 = document.getElementById("question__explanation").style.display = "none";
var explanation3 = document.getElementById("grade__explanation").style.display = "none";
var explanation4 = document.getElementById("wording__explanation").style.display = "none";

// Listen for messages to change the explanation section
// Paragraph explanation
document.getElementById("paragraph__container").addEventListener('click', function(){
  document.getElementById("question__explanation").style.display = "none";
  document.getElementById("grade__explanation").style.display = "none";
  document.getElementById("wording__explanation").style.display = "none";
  document.getElementById("paragraph__explanation").style.display = "block";
});
// Question explanation
document.getElementById("question__container").addEventListener('click', function(){
  document.getElementById("grade__explanation").style.display = "none";
  document.getElementById("wording__explanation").style.display = "none";
  document.getElementById("paragraph__explanation").style.display = "none";
  document.getElementById("question__explanation").style.display = "block";
});
// Grade explanation
document.getElementById("grade__container").addEventListener('click', function(){
  document.getElementById("paragraph__explanation").style.display = "none";
  document.getElementById("question__explanation").style.display = "none";
  document.getElementById("wording__explanation").style.display = "none";
  document.getElementById("grade__explanation").style.display = "block";
});
// Wording explanation
document.getElementById("wording__container").addEventListener('click', function(){
  document.getElementById("grade__explanation").style.display = "none";
  document.getElementById("paragraph__explanation").style.display = "none";
  document.getElementById("question__explanation").style.display = "none";
  document.getElementById("wording__explanation").style.display = "block";
});