// Update the relevant fields with the new data.
const setInfo = info => {
  
  // Update the paragraphs UI
  // 1) Update the paragraphs text
  document.getElementById('paragraphs').textContent = info.paragraphs;
  // 2) Update the paragraphs slider. Requires params:
    // The intager of the insight
    // The value of the insight
  animateSlider(1,info.paragraphs);


  document.getElementById('questions').textContent = info.questions;

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

function animateSlider(insight, target) {

  // The value is the target
  insightId = "range" + insight; // Ex: "range1" as a string
  var rangeValue = document.getElementById(insightId).value;

  if(rangeValue<target) {
    while (rangeValue !== target) {
      rangeValue++;
      document.getElementById(insightId).value = rangeValue;
    }
  }
  else if(rangeValue>target) {
    while (rangeValue !== target) {
      rangeValue--;
      document.getElementById(insightId).value = rangeValue;
    }
  }
};

// By default, hide all check values.
var check1 = document.getElementById('check1').style.display = "none";
var check2 = document.getElementById('check2').style.display = "none";