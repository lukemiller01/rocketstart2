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
};

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'contentScript') && (msg.subject === 'updateUI')) {
      var updatedInfo = {
        paragraphs: msg.paragraphs,
        questions: msg.questions
      };
  
      setInfo(updatedInfo);
    }
});

// The timer function a Promise that resolves after "ms" Milliseconds
// Used in async functions to animate the slider activity
const timer = ms => new Promise(res => setTimeout(res, ms))

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

// By default, hide all check values.
var check1 = document.getElementById('check1').style.display = "none";
var check2 = document.getElementById('check2').style.display = "none";