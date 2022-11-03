// Update the relevant fields with the new data.
const setInfo = info => {
    document.getElementById('paragraphs').textContent = info.paragraphs;
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

  // By default, hide all check values.
  var check1 = document.getElementById('check1').style.display = "none";
  var check2 = document.getElementById('check2').style.display = "none";