// Update the relevant fields with the new data.
const setInfo = info => {
  // Logic for displaying checks
  // Needs to be above the slider updating code
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
  // Wording
  if(info.paragraphs == 0) { // No text
    var adverbsHeader = document.getElementById("adverbsHeader").style.display = "none";
    var verbsHeader = document.getElementById("verbsHeader").style.display = "none";
    var verbExamples = document.getElementById('verbExamples').style.display = "none";
    var check4 = document.getElementById('check4').style.display = "none";
    var warning1 = document.getElementById('warning').style.display = "none";
  }
  else if (info.adverbs.length > 0 || info.verbs.length > 0) { // Text and there's at least one flagged word
    if (info.adverbs.length > 0){ // Flagged adverb
      var adverbsHeader = document.getElementById("adverbsHeader").style.display = "block";
      var check4 = document.getElementById('check4').style.display = "none";
      var warning1 = document.getElementById('warning').style.display = "block";
    }
    if (info.verbs.length > 0){
      var verbsHeader = document.getElementById("verbsHeader").style.display = "block";
      var verbExamples = document.getElementById('verbExamples').style.display = "block";
      var check4 = document.getElementById('check4').style.display = "none";
      var warning1 = document.getElementById('warning').style.display = "block";
    }
  }
  else { // Text & there's no flagged word
    var adverbsHeader = document.getElementById("adverbsHeader").style.display = "none";
    var verbsHeader = document.getElementById("verbsHeader").style.display = "none";
    var verbExamples = document.getElementById('verbExamples').style.display = "none";
    var check4 = document.getElementById('check4').style.display = "flex";
    var warning1 = document.getElementById('warning').style.display = "none";
  }
  
  // 1) Update the paragraphs text
  document.getElementById('paragraphs').textContent = info.paragraphs;
  // 2) Update the paragraphs slider.
  if (info.paragraphs > 5) {
    info.paragraphs = 5;
  }
  document.getElementById('paragraph__slider').style.left = (info.paragraphs)*20 + "%";

  // 1) Update the questions text
  document.getElementById('questions').textContent = info.questions;
  // 2) Update the questions slider.
  if (info.questions > 4) {
    info.questions = 4;
  }
  document.getElementById('question__slider').style.left = (info.questions)*25 + "%";

  // 1) Update the Grade Level text
  document.getElementById('grade').textContent = info.grade;
  // 2) Update the Grade Level Slider.
  if (info.grade < 2) {
    info.grade = 2;
  }
  document.getElementById('grade__slider').style.left = (info.grade)*10-20 + "%";

  // 1) Update the Wording text
  totalFlagged = info.adverbs.length + info.verbs.length
  if (totalFlagged > 4) {
    totalFlagged = 4;
  }
  document.getElementById('words').textContent = totalFlagged;
  // 2) Update the wording slider.
  document.getElementById('word__slider').style.left = (totalFlagged)*25 + "%";
  // 3) Update adverbs list
  document.getElementById('flaggedAdverbs').textContent = info.adverbs.join(', ');
  // 4) Update verbs list
  document.getElementById('flaggedVerbs').textContent = info.verbs.join(', ');
  for (i = 0; i < info.verbs.length; i++) { // Verbs
    if ("to be".includes(info.verbs[i].toLowerCase())) {
        document.getElementById('badExample').textContent = "\"I want to be a part of your team.\"";
        document.getElementById('goodExample').textContent = "\"I’d love to join your team.\""
    }
}
// TODO:
  // Based on the # of flagged verbs, create an array and populate the array in the html file.

};

// Listen for messages from the contentScript.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'contentScript') && (msg.subject === 'updateUI')) {
      var updatedInfo = {
        paragraphs: msg.paragraphs,
        questions: msg.questions,
        grade: msg.grade,
        adverbs: msg.adverbs,
        verbs: msg.verbs
      };
      setInfo(updatedInfo);
    }

    // Scale up and scale down is triggered by toggleWindow().
    // The two below cases respond by defaulting the animation on toggle on/off.
    else if ((msg.from === 'contentScript') && (msg.subject === "ScaleUp")) {

      document.getElementById("paragraph__container").classList.add("active__rs");
      document.getElementById("question__container").classList.remove("active__rs");
      document.getElementById("grade__container").classList.remove("active__rs");
      document.getElementById("wording__container").classList.remove("active__rs");

      var explanation1 = document.getElementById("paragraph__explanation").style.display = "block";
      var explanation2 = document.getElementById("question__explanation").style.display = "none";
      var explanation3 = document.getElementById("grade__explanation").style.display = "none";
      var explanation4 = document.getElementById("wording__explanation").style.display = "none";
    }

    else if ((msg.from === 'contentScript') && (msg.subject === "ScaleDown")) {
      document.getElementById("paragraph__container").classList.remove("active__rs");
      document.getElementById("question__container").classList.remove("active__rs");
      document.getElementById("grade__container").classList.remove("active__rs");
      document.getElementById("wording__container").classList.remove("active__rs");
    }
});

// Send message to close the iframe to contentScript.js
document.getElementById('exit').addEventListener('click',function(){
  chrome.tabs.getCurrent(tab => {
    chrome.tabs.sendMessage(tab.id, {
      from: 'popup',
      subject: 'closeFrame',
    }, {frameId: 0});
  });
  // Reset scale
  document.getElementById("paragraph__container").classList.remove("active__rs");
  document.getElementById("question__container").classList.remove("active__rs");
  document.getElementById("grade__container").classList.remove("active__rs");
  document.getElementById("wording__container").classList.remove("active__rs");
});

// By default, hide all check values.
var check1 = document.getElementById('check1').style.display = "none";
var check2 = document.getElementById('check2').style.display = "none";
var check3 = document.getElementById('check3').style.display = "none";
var check4 = document.getElementById('check4').style.display = "none";
// By default, show the Paragraph explanation.
var explanation1 = document.getElementById("paragraph__explanation").style.display = "block";
var explanation2 = document.getElementById("question__explanation").style.display = "none";
var explanation3 = document.getElementById("grade__explanation").style.display = "none";
var explanation4 = document.getElementById("wording__explanation").style.display = "none";
// By default, add scale to the Paragraph Insight.
document.getElementById("paragraph__container").classList.add("active__rs");
document.getElementById("question__container").classList.remove("active__rs");
document.getElementById("grade__container").classList.remove("active__rs");
document.getElementById("wording__container").classList.remove("active__rs");
// By default, remove wording headers.
var adverbsHeader = document.getElementById("adverbsHeader").style.display = "none";
var verbsHeader = document.getElementById("verbsHeader").style.display = "none";

// Listen for messages to change the explanation section
// Paragraph explanation
document.getElementById("paragraph__container").addEventListener('click', function(){
  document.getElementById("question__explanation").style.display = "none";
  document.getElementById("grade__explanation").style.display = "none";
  document.getElementById("wording__explanation").style.display = "none";
  document.getElementById("paragraph__explanation").style.display = "block";
  // Scale
  document.getElementById("paragraph__container").classList.add("active__rs");
  document.getElementById("question__container").classList.remove("active__rs");
  document.getElementById("grade__container").classList.remove("active__rs");
  document.getElementById("wording__container").classList.remove("active__rs");
});
// Question explanation
document.getElementById("question__container").addEventListener('click', function(){
  document.getElementById("grade__explanation").style.display = "none";
  document.getElementById("wording__explanation").style.display = "none";
  document.getElementById("paragraph__explanation").style.display = "none";
  document.getElementById("question__explanation").style.display = "block";
  // Scale
  document.getElementById("paragraph__container").classList.remove("active__rs");
  document.getElementById("question__container").classList.add("active__rs");
  document.getElementById("grade__container").classList.remove("active__rs");
  document.getElementById("wording__container").classList.remove("active__rs");
});
// Grade explanation
document.getElementById("grade__container").addEventListener('click', function(){
  document.getElementById("paragraph__explanation").style.display = "none";
  document.getElementById("question__explanation").style.display = "none";
  document.getElementById("wording__explanation").style.display = "none";
  document.getElementById("grade__explanation").style.display = "block";
  // Scale
  document.getElementById("paragraph__container").classList.remove("active__rs");
  document.getElementById("question__container").classList.remove("active__rs");
  document.getElementById("grade__container").classList.add("active__rs");
  document.getElementById("wording__container").classList.remove("active__rs");
});
// Wording explanation
document.getElementById("wording__container").addEventListener('click', function(){
  document.getElementById("grade__explanation").style.display = "none";
  document.getElementById("paragraph__explanation").style.display = "none";
  document.getElementById("question__explanation").style.display = "none";
  document.getElementById("wording__explanation").style.display = "block";
  // Scale
  document.getElementById("paragraph__container").classList.remove("active__rs");
  document.getElementById("question__container").classList.remove("active__rs");
  document.getElementById("grade__container").classList.remove("active__rs");
  document.getElementById("wording__container").classList.add("active__rs");
});