// The following words should not be in the LinkedIn message:
adverbs = ["abnormally", "absentmindedly", "accidentally", "acidly", "actually", "adventurously", "afterwards", "almost", "always", "angrily", "annually", "anxiously", "arrogantly", "awkwardly", "badly", "bashfully", "beautifully", "bitterly", "bleakly", "blindly", "blissfully", "boastfully", "boldly", "bravely", "briefly", "brightly", "briskly", "broadly", "busily", "calmly", "carefully", "carelessly", "cautiously", "certainly", "cheerfully", "clearly", "cleverly", "closely", "coaxingly", "colorfully", "commonly", "continually", "coolly", "correctly", "courageously", "crossly", "cruelly", "curiously", "daily", "daintily", "dearly", "deceivingly", "delightfully", "deeply", "defiantly", "deliberately", "delightfully", "diligently", "dimly", "doubtfully", "dreamily", "easily", "elegantly", "energetically", "enormously", "enthusiastically", "equally", "especially", "even", "evenly", "eventually", "exactly", "excitedly", "extremely", "fairly", "faithfully", "famously", "far", "fast", "fatally", "ferociously", "fervently", "fiercely", "fondly", "foolishly", "fortunately", "frankly", "frantically", "freely", "frenetically", "frightfully", "fully", "furiously", "generally", "generously", "gently", "gladly", "gleefully", "gracefully", "gratefully", "greatly", "greedily", "happily", "hastily", "healthily", "heavily", "helpfully", "helplessly", "highly", "honestly", "hopelessly", "hourly", "hungrily", "immediately", "innocently", "inquisitively", "instantly", "intensely", "intently", "interestingly", "inwardly", "irritably", "jaggedly", "jealously", "joshingly", "joyfully", "joyously", "jovially", "jubilantly", "judgmentally", "justly", "keenly", "kiddingly", "kindheartedly", "kindly", "knavishly", "knottily", "knowingly", "knowledgeably", "kookily", "lazily", "less", "lightly", "likely", "limply", "lively", "loftily", "longingly", "loosely", "lovingly", "loudly", "loyally", "madly", "majestically", "meaningfully", "mechanically", "merrily", "miserably", "mockingly", "monthly", "mortally", "mostly", "mysteriously", "naturally", "nearly", "neatly", "needily", "nervously", "never", "nicely", "noisily", "not", "obediently", "obnoxiously", "oddly", "offensively", "officially", "often", "only", "openly", "optimistically", "overconfidently", "owlishly", "painfully", "partially", "patiently", "perfectly", "physically", "playfully", "politely", "poorly", "positively", "potentially", "powerfully", "promptly", "properly", "punctually", "quaintly", "quarrelsomely", "queasily", "queerly", "questionably", "questioningly", "quicker", "quickly", "quietly", "quirkily", "quizzically", "rapidly", "rarely", "readily", "really", "reassuringly", "recklessly", "regularly", "reluctantly", "repeatedly", "reproachfully", "restfully", "righteously", "rightfully", "rigidly", "roughly", "rudely", "sadly", "safely", "scarcely", "scarily", "searchingly", "sedately", "seemingly", "seldom", "selfishly", "separately", "seriously", "shakily", "sharply", "sheepishly", "shrilly", "shyly", "silently", "sleepily", "slowly", "smoothly", "softly", "solemnly", "solidly", "sometimes", "soon", "speedily", "stealthily", "sternly", "strictly", "successfully", "suddenly", "surprisingly", "suspiciously", "sweetly", "swiftly", "sympathetically", "tenderly", "tensely", "terribly", "thankfully", "thoroughly", "thoughtfully", "tightly", "tomorrow", "too", "tremendously", "triumphantly", "truly", "truthfully", "ultimately", "unabashedly", "unaccountably", "unbearably", "unethically", "unexpectedly", "unfortunately", "unimpressively", "unnaturally", "unnecessarily", "utterly", "upbeat", "upliftingly", "upright", "upside-down", "upward", "upwardly", "urgently", "usefully", "uselessly", "usually", "utterly", "vacantly", "vaguely", "vainly", "valiantly", "vastly", "verbally", "very", "viciously", "victoriously", "violently", "vivaciously", "voluntarily", "warmly", "weakly", "wearily", "wetly", "wholly", "wildly", "willfully", "wisely", "woefully", "wonderfully", "worriedly", "wrongly", "yawningly", "yearly", "yearningly", "yesterday", "yieldingly", "youthfully", "zealously", "zestfully", "zestily"];
verbs = ["to be", "to have", "there are", "there is", "was"]

// Counts the number of syllables per word
function syllable(word) {
    word = word.toLowerCase();
    // Removes anything that's not an english character (dashes, line breaks)
    word = word.replace(/[^a-z]/, '')
    // Special cases
        // TODO: Print 1000 of the top most used common words and check against a known program
            // Known words that are broken: something, somewhere, sometime, somehow
    word = word.replace(/(?:[^laeiouy]es|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    if (word && word.match(/[aeiouy]{1,2}/g)) {
        return word.match(/[aeiouy]{1,2}/g).length;
    }
  }

function messageAnalysis(text) {
    // Paragraphs, where a double line break (or more) separated by nothing is one paragraph
    paragraphs = text.split(/\n\s*\n/).length;

    // If there's a double return and no start to the second paragraph:
        // The text should be counted as 1 paragraph
    var re = new RegExp("\n\n$");
    if (re.test(text)) {
        paragraphs--;
    }
    else if(text === ""){
        paragraphs = 0;
    }
    
    // Questions, where one or more question marks in a row means one question
    questions = text.split(/\?{1,}/).length - 1

    // Grade Level, characterized by Flesch-Kincaid
    // # of words
    // numWords = text.split(" ").length + 1
    numWords = text.split(/\S*[a-z]\S*/).length - 1

    // # of sentences, includes periods, exclamation, questions
    numSentences = text.split('.').length + text.split(/\!{1,}/).length + questions - 2
    // Edge case "Hi {name} - " returns grade level 12 because there are technically no sentences
    if ( text.split(/-\n/).length - 1 || text.split(/ - \n/).length - 1) {
        numSentences = numSentences + text.split(/-\n/).length - 1 + text.split(/ - \n/).length - 1;
    }
    // The readingLevel function will break if numSentences = 0.
    if(numSentences == 0) {
        numSentences = 1;
    }
    // console.log(numSentences);

    // # of syllables
    numSyllables = 0;
    text = text.replace('\'',''); // Removing apostrophes '
    var wordList = text.split(/[^A-Za-z]/);
    var wordCount = wordList.length;

    // Working on verbs for wording:
    flaggedAdverbs = [];
    flaggedVerbs = [];
    for (i = 0; i < verbs.length; i++) { // Verbs
        if (text.toLowerCase().includes(verbs[i])) {
            flaggedVerbs.push(verbs[i]);
        }
    }
    // Working on syllable count for grade level & adverbs for wording:
    for (i = 0; i < wordCount; i++) {
        if (wordList[i] != '') { // If the word is not empty (some words like '-' have already been made '')
            numSyllables = numSyllables + syllable(wordList[i])
            if (adverbs.includes(wordList[i].toLowerCase())) { // Adverbs
                flaggedAdverbs.push(wordList[i]);
            }
        }
    }

    // console.clear()
    // console.log("Words:", numWords)
    // console.log("Sentences:", numSentences)
    // console.log("Syllables:", numSyllables)

    // Flesch-Kincaid
    // Grade level
    // gradeLevel = .39 * (numWords/numSentences) + 11.8 * (numSyllables / numWords) - 15.59
    grade = 0
    if (text != '') {
        readingLevel = 206.835 - 1.015*(numWords/numSentences) - 84.6*(numSyllables / numWords)
        // console.log(readingLevel)
        switch(true) {
            case (readingLevel <= 50):
                grade = 12
                break;
            case (readingLevel > 50 && readingLevel <= 55):
                grade = 11
                break;
            case (readingLevel > 55 && readingLevel <= 60):
                grade = 10
                break;
            case (readingLevel > 60 && readingLevel <= 65):
                grade = 9
                break;
            case (readingLevel > 65 && readingLevel <= 70):
                grade = 8
                break;
            case (readingLevel > 70 && readingLevel <= 80):
                grade = 7;
                break;
            case (readingLevel > 80 && readingLevel <= 90):
                grade = 6;
                break;
            case (readingLevel > 90 && readingLevel <= 100):
                grade = 5;
                break;
            case (readingLevel > 100 && readingLevel <= 110):
                grade = 4;
                break;
            case (readingLevel > 110 && readingLevel <= 120):
                grade = 3;
                break;
            case (readingLevel > 120):
                grade = 2;
                break;
            default:
                grade = 2
        }
    }

    var pack = {
        paragraphs: paragraphs,
        questions: questions,
        grade: grade,
        adverbs: flaggedAdverbs,
        verbs: flaggedVerbs
      };
    return pack;
}

// This function checks if the active element is the targeted input
const isTextAreaOrInput = (element) => {
    if (element.id == "custom-message") {
        return true
    }
    return false;
}

/*
The function checks for if the active element is an input
The window's event listener catches changes to the active element
The purpose of this function is to keep the lastActiveElement fresh for listenToTyping
*/
const listenActiveElement = function (callback) {
    let lastActiveElement = document.activeElement;

    // If the focus changes
    const detectFocus = () => {
        if(lastActiveElement !== document.activeElement) {
            lastActiveElement = document.activeElement

            // If the iframe is open, automatically change the position of the invitation window.
                // This can't be completed in appendButton because there's an option to send a request w/o a note.
            if(toggle && document.getElementsByClassName("artdeco-modal--layer-default")[0]) {
                document.getElementsByClassName("artdeco-modal--layer-default")[0].style.position = "absolute";
                newLeft = (window.innerWidth - iframeWidth - document.getElementsByClassName("artdeco-modal--layer-default")[0].offsetWidth) / 2;
                document.getElementsByClassName("artdeco-modal--layer-default")[0].style.left = newLeft + "px";
            }

            if(isTextAreaOrInput(lastActiveElement)) {
                callback(lastActiveElement);
                appendButton(lastActiveElement);
            }
            else {
                chrome.runtime.sendMessage({
                    from: 'contentScript',
                    subject: 'updateUI',
                    paragraphs: 0,
                    questions: 0,
                    grade: 0,
                    adverbs: [],
                    verbs: []
                });
            }
        }
    };
    window.addEventListener("focus", detectFocus, true)
};

/* Step 4
If the focused element is editable: listen for a "keydown" event.
When a key is pressed down, the user is "actively typing".

Listen for a "keyup" event.
When a key is released, the text is saved and the timer is cleared.
So the timer for inactivity can begin again

If typing inactivity persists, the last input is collected.
The last input is sent to messageAnalysis.
*/
const listenToTyping = (element) => {
    var timer; // Timer identifier
    var activeTypingTimer; // Timer identifier
    var waitTime = 1500; // Wait time in milliseconds
    var lastInput = element.value
    var activelyTyping = false
    var lastTypeTime = new Date().getTime();

    dataPack = messageAnalysis(lastInput);
    chrome.runtime.sendMessage({
        from: 'contentScript',
        subject: 'updateUI',
        paragraphs: dataPack.paragraphs,
        questions: dataPack.questions,
        grade: dataPack.grade,
        adverbs: dataPack.adverbs,
        verbs: dataPack.verbs
    });

    // Event listener for the keydown event
    element.addEventListener("keydown", function (e) {
        activelyTyping = true;
        lastTypeTime = new Date().getTime();
    });

    // Event listener for the keyup event
    element.addEventListener("keyup", (e) => {
        var target = e.target;

        var text = target.value;
        // If the text is undefined, the element is editable
        if (text === undefined) {
            text = target.innerText;
        }
        if (timer) {
            // Clear timer
            clearTimeout(timer);
        }
        if(activeTypingTimer) {
            clearTimeout(activeTypingTimer)
        }
        var activeTypingCheckTime = waitTime - 1000;
        activeTypingTimer = setTimeout(function () {
            if(activelyTyping){
                var now = new Date().getTime();
                if (now > lastTypeTime + activeTypingCheckTime) {
                    activelyTyping = false;
                }
            }
        }, activeTypingCheckTime);
        // Wait for X ms and process the request
        timer = setTimeout( function () {
            if (text !== lastInput) {
                if(!activelyTyping) {
                    lastInput = text;
                    dataPack = messageAnalysis(lastInput);
                    chrome.runtime.sendMessage({
                        from: 'contentScript',
                        subject: 'updateUI',
                        paragraphs: dataPack.paragraphs,
                        questions: dataPack.questions,
                        grade: dataPack.grade,
                        adverbs: dataPack.adverbs,
                        verbs: dataPack.verbs
                    });
                }
            }
        }, waitTime);
    });
};

// Create the three components needed for the extension

/*
Button added to the custom message text box.
The button is created, and clicking it toggles the window.
An event listener is created in listenActiveElement.
When the custom message box is focused in, the button is appended.
*/
function createButton() {
    btn.textContent = 'Rocketstart';
    btn.style.textAlign = "center"
    btn.style.padding = ".75rem"
    
    btn.style.display = "flex"
    btn.style.flexDirection = "column"
    btn.onclick = function(event) {
        toggleWindow();
    };
    return btn;
}
function createFrame() {
    toggle = false;
    iframe.style.background = "white";
    iframe.style.height = "100%";
    iframe.style.width = "0px";
    iframe.style.position = "fixed";
    iframe.style.bottom = "0px";
    iframe.style.right = "0px";
    iframe.style.zIndex = "10001";
    iframe.src = chrome.runtime.getURL("popup.html");
    iframe.id = "iframe-rs"
    document.body.appendChild(iframe);
}
function createDiv() {
    drag.style.position = "fixed";
    drag.style.visibility = "hidden";
    drag.style.height = "18px";
    drag.style.width = "32px";
    drag.style.background = "white";
    drag.style.zIndex = "1000000000000";
    // drag.style.top = "343px";
    drag.style.top = window.innerHeight / 2 + "px";
    drag.style.marginRight = "-16.5px";
    drag.style.border = "1px solid grey"
    drag.style.borderRadius = "10px"
    drag.style.transform = 'translateY(50%)';
    drag.id = "drag";
    drag.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <div style="cursor: move; position: relative; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
                <i id="left-arrow" style="border: solid black; border-width: 0px 2px 2px 0px; display: inline-block; padding: 3px; margin-right: 1px; transform: rotate(135deg);"></i>
                <i id="right-arrow" style="border: solid black; border-width: 0px 2px 2px 0px; display: inline-block; padding: 3px; margin-left: 1px; transform: rotate(-45deg);"></i>
            </div>
        </body>
    </html>
    `;
    document.body.appendChild(drag);
}
var btn = document.createElement('button');
var drag = document.createElement('div');
var iframe = document.createElement('iframe');
createButton();
createDiv();
createFrame();

/*
The button should contains the same styles as the LinkedIn UI.
These styles aren't available when the button is created,
So they're being implemented onto the button when the button is appended.
*/
function appendButton(textElement) {
    // Font styling
    const linkedinParagraph = document.getElementsByClassName("t-14 pb2");
    const paragraphObj = window.getComputedStyle(linkedinParagraph[0]);
    var fontSize = paragraphObj.getPropertyValue("font-size");
    // var fontWeight = paragraphObj.getPropertyValue("font-weight");
    btn.style.fontSize = fontSize
    btn.style.fontWeight = "bold" // Replaced LinkedIn text fontWeight with bold for button pop

    // Box styling
    const linkedinBox = document.getElementById("custom-message");
    const boxObj = window.getComputedStyle(linkedinBox);
    var borderRadius = boxObj.getPropertyValue("border-radius");
    var borderColor = boxObj.getPropertyValue("border-color");
    var boxShadow = boxObj.getPropertyValue("box-shadow");
    btn.style.borderRadius = borderRadius
    btn.style.borderColor = borderColor
    // The Linkedin custom message box border changes on focus
    // But the Rocketstart button should be static
    // The button is appended every focus-in
    // Therefore, the boxShadow should only be changed if it has the default value
    if (boxShadow == "rgba(0, 0, 0, 0.6) 0px 0px 0px 1px inset") {
        btn.style.boxShadow = boxShadow
    }

    // Appending button
    textElement.parentElement.insertBefore(btn, textElement.nextElementSibling);
}

function toggleWindow(){
    if(iframe.style.width == "0px"){
        toggle = true;
        iframe.style.borderLeft = "1px solid rgba(0,0,0,.15)";
        iframeWidth = window.innerWidth * .208333;
        iframe.style.width = iframeWidth + "px";
        // Main content:
        document.getElementsByClassName("scaffold-layout__inner")[0].style.margin = "0";
        document.getElementsByClassName("scaffold-layout__content")[0].style.width = window.innerWidth - iframeWidth + "px";
        document.getElementsByClassName("scaffold-layout__content")[0].style.paddingLeft = "2.4rem";
        document.getElementsByClassName("scaffold-layout__content")[0].style.paddingRight = "2.4rem";
        // Message box:
        document.getElementById("msg-overlay").style.right = iframeWidth + 24 + "px";
        // Navbar:
        document.getElementsByClassName("global-nav__content")[0].style.width = "inherit";
        document.getElementById("global-nav").style.display = "flex";
        document.getElementById("global-nav").style.paddingLeft = "2.4rem";
        document.getElementById("global-nav").style.paddingRight = "2.4rem";
        document.getElementById("global-nav").style.width = window.innerWidth - iframeWidth + "px";
        // Sticky header:
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.margin = "0";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.width = window.innerWidth - iframeWidth + "px";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.paddingLeft = "20px";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.paddingRight = "2.4rem";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.maxWidth = "none";
        document.getElementsByClassName("pvs-profile-actions--rtl")[0].classList.remove("mr2");
        document.getElementsByClassName("pv-profile-sticky-header-v2__mini-profile-container")[0].style.minWidth = "unset";

        // Window toggle
        document.getElementsByClassName("artdeco-modal--layer-default")[0].style.position = "absolute";
        newLeft = (window.innerWidth - iframeWidth - document.getElementsByClassName("artdeco-modal--layer-default")[0].offsetWidth) / 2;
        document.getElementsByClassName("artdeco-modal--layer-default")[0].style.left = newLeft + "px";

        // Paragraph scale, reset other insights
        chrome.runtime.sendMessage({
            from: 'contentScript',
            subject: 'ScaleUp'
        });

        // Resize the iframe; listen for the drag component's mouse up/down
        var drag = document.getElementById("drag");
        drag.style.right = iframeWidth + "px";
        drag.style.visibility = "visible";
        function onMouseMove(e){
            // Prevent the mouse from highlighting elements
            e.preventDefault();
            // Remove pointer events to speed up the iframe width resize
            iframe.style.pointerEvents = "none";
            // If the 
            // Set maximum and minimum extension widths
            if ( window.innerWidth - e.clientX <= window.innerWidth * .291666 && window.innerWidth - e.clientX >= window.innerWidth * .173611 && window.innerWidth - e.clientX >= 200 ) {
                iframe.style.width = window.innerWidth - e.clientX + "px";
                iframeWidth = parseInt(iframe.style.width);
                drag.style.right = window.innerWidth - e.clientX + "px";
            }

            // Changing icon based on user ability to drag extension left or right
            if (parseInt(iframe.style.width) + 5 >= window.innerWidth * .291666) {
                document.getElementById("left-arrow").style.borderColor = "lightgray";
            }
            else { // If the bound hasn't been reached, the arrow should perist
                document.getElementById("left-arrow").style.display = "inline-block";
                document.getElementById("left-arrow").style.borderColor = "black";
            } // Repeat for right bound
            if (parseInt(iframe.style.width) - 5 <= window.innerWidth * .173611 || parseInt(iframe.style.width) - 5 <= 200) {
                document.getElementById("right-arrow").style.borderColor = "lightgray";
            }
            else {
                document.getElementById("right-arrow").style.display = "inline-block";
                document.getElementById("right-arrow").style.borderColor = "black";
            }
            // If both arrows are hidden, there's a 200px edge case.
            // Instead of leaving the draggable element blank, make them grey
            if (document.getElementById("right-arrow").style.display == "none" && document.getElementById("left-arrow").style.display == "none") {
                document.getElementById("left-arrow").style.display = "inline-block";
                document.getElementById("left-arrow").style.borderColor = "lightgray";
                document.getElementById("right-arrow").style.display = "inline-block";
                document.getElementById("right-arrow").style.borderColor = "lightgray";
            }

            // Main content:
            document.getElementsByClassName("scaffold-layout__content")[0].style.width = window.innerWidth - iframeWidth + "px";
            // Message box:
            document.getElementById("msg-overlay").style.right = iframeWidth + 24 + "px";
            // Navbar:
            document.getElementById("global-nav").style.width = window.innerWidth - iframeWidth + "px";
            // Sticky header:
            document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.width = window.innerWidth - iframeWidth + "px";

            // Moving the invitation window, if it exists.
            if(document.getElementsByClassName("artdeco-modal--layer-default")[0]) {
                document.getElementsByClassName("artdeco-modal--layer-default")[0].style.position = "absolute";
                newLeft = (window.innerWidth - iframeWidth - document.getElementsByClassName("artdeco-modal--layer-default")[0].offsetWidth) / 2;
                // if left edge reaches window limit, stop the window from moving
                if (newLeft < 23.4) {
                    newLeft = 23.4;
                }
                document.getElementsByClassName("artdeco-modal--layer-default")[0].style.left = newLeft + "px";

                // If right edge reaches iframe limit, decrease size
                if (document.getElementsByClassName("artdeco-modal--layer-default")[0].offsetWidth + 46.8 >= window.innerWidth - iframeWidth - 46.4 ) {
                    document.getElementsByClassName("artdeco-modal--layer-default")[0].style.width = window.innerWidth - iframeWidth - 46.4 + "px";
                }
                else {
                    document.getElementsByClassName("artdeco-modal--layer-default")[0].style.width = "";
                }
            }
        }

        function onMouseDown(e){
            document.addEventListener('mousemove',onMouseMove);
        }

        function onMouseUp(e){
            iframe.style.pointerEvents = "";
            document.removeEventListener('mousemove',onMouseMove);
        }

        drag.addEventListener('mousedown', onMouseDown);
        drag.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseup', onMouseUp);
    }
    else{
        toggle = false;
        iframe.style.borderLeft = "";
        iframe.style.width = "0px";
        var drag = document.getElementById("drag");
        drag.style.visibility = "hidden";
        // Main content:
        document.getElementsByClassName("scaffold-layout__inner")[0].style.margin = "";
        document.getElementsByClassName("scaffold-layout__content")[0].style.width = "";
        document.getElementsByClassName("scaffold-layout__content")[0].style.paddingLeft = "";
        document.getElementsByClassName("scaffold-layout__content")[0].style.paddingRight = "";
        // Message box:
        document.getElementById("msg-overlay").style.right = 0 + "px";
        // Navbar:
        document.getElementsByClassName("global-nav__content")[0].style.width = "";
        document.getElementById("global-nav").style.display = "";
        document.getElementById("global-nav").style.paddingLeft = "";
        document.getElementById("global-nav").style.paddingRight = "";
        document.getElementById("global-nav").style.width = "";
        // Sticky header:
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.margin = "";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.width = "";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.paddingLeft = "";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.paddingRight = "";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.maxWidth = "";
        document.getElementsByClassName("pvs-profile-actions--rtl")[0].classList.add("mr2");
        document.getElementsByClassName("pv-profile-sticky-header-v2__mini-profile-container")[0].style.minWidth = "";

        // TODO - add an if statement for if the invitation window exists
        // Reset position of invitation window
        document.getElementsByClassName("artdeco-modal--layer-default")[0].style.position = "";
        document.getElementsByClassName("artdeco-modal--layer-default")[0].style.left = "";

        // Paragraph scale, reset other insights
        chrome.runtime.sendMessage({
            from: 'contentScript',
            subject: 'ScaleDown'
        });
    }
}

/*
Upon a match occuring ("https://www.linkedin.com./in/*"),
This script detects the focus of the cursor and if any typing is occuring.
*/
listenActiveElement(function (element) {
    listenToTyping(element);
});

// Listen for the popup to request the frame to be closed
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'closeFrame')) {
        toggleWindow();
    }
});

// Listen for changes in the window width
window.addEventListener("resize", function(event) {
    if(toggle) {
        // Automatically set the maximum and minimum extension widths
        if ( parseInt(iframe.style.width) > window.innerWidth * .291666) {
            if(window.innerWidth * .291666 >= 200) { // Minimum width
                iframe.style.width = window.innerWidth * .291666 + "px";
                iframeWidth = parseInt(iframe.style.width);
                drag.style.right = window.innerWidth * .291666 + "px";
            }
        }
        else if (parseInt(iframe.style.width) < window.innerWidth * .173611) {
            if(window.innerWidth * .291666 >= 200) { // Minimum width
                iframe.style.width = window.innerWidth * .173611 + "px";
                iframeWidth = parseInt(iframe.style.width);
                drag.style.right = window.innerWidth * .173611 + "px";
            }
        }
        // Main content:
        document.getElementsByClassName("scaffold-layout__content")[0].style.width = window.innerWidth - iframeWidth + "px";
        // Message box:
        document.getElementById("msg-overlay").style.right = iframeWidth + 24 + "px";
        // Navbar:
        document.getElementById("global-nav").style.width = window.innerWidth - iframeWidth + "px";
        // Sticky header:
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.width = window.innerWidth - iframeWidth + "px";

        // Move position of draggable slider on height change
        drag.style.top = window.innerHeight / 2 + "px";

        // Changing icon based on user ability to drag extension left or right
        if (parseInt(iframe.style.width) + 5 >= window.innerWidth * .291666) {
            document.getElementById("left-arrow").style.borderColor = "lightgray";
        }
        else { // If the bound hasn't been reached, the arrow should perist
            document.getElementById("left-arrow").style.display = "inline-block";
            document.getElementById("left-arrow").style.borderColor = "black";
        } // Repeat for right bound
        if (parseInt(iframe.style.width) - 5 <= window.innerWidth * .173611 || parseInt(iframe.style.width) - 5 <= 200) {
            document.getElementById("right-arrow").style.borderColor = "lightgray";
        }
        else {
            document.getElementById("right-arrow").style.display = "inline-block";
            document.getElementById("right-arrow").style.borderColor = "black";
        }
        // If both arrows are hidden, there's a 200px edge case.
        // Instead of leaving the draggable element blank, make them grey
        if (document.getElementById("right-arrow").style.display == "none" && document.getElementById("left-arrow").style.display == "none") {
            document.getElementById("left-arrow").style.display = "inline-block";
            document.getElementById("left-arrow").style.borderColor = "lightgray";
            document.getElementById("right-arrow").style.display = "inline-block";
            document.getElementById("right-arrow").style.borderColor = "lightgray";
        }

        // Moving the invitation window, if it exists.
        if(document.getElementsByClassName("artdeco-modal--layer-default")[0]) {
            document.getElementsByClassName("artdeco-modal--layer-default")[0].style.position = "absolute";
            newLeft = (window.innerWidth - iframeWidth - document.getElementsByClassName("artdeco-modal--layer-default")[0].offsetWidth) / 2;
            // if left edge reaches window limit, stop the window from moving
            if (newLeft < 23.4) {
                newLeft = 23.4;
            }
            document.getElementsByClassName("artdeco-modal--layer-default")[0].style.left = newLeft + "px";

            // If right edge reaches iframe limit, decrease size
            if (document.getElementsByClassName("artdeco-modal--layer-default")[0].offsetWidth + 46.8 >= window.innerWidth - iframeWidth - 46.4 ) {
                document.getElementsByClassName("artdeco-modal--layer-default")[0].style.width = window.innerWidth - iframeWidth - 46.4 + "px";
            }
            else {
                document.getElementsByClassName("artdeco-modal--layer-default")[0].style.width = "";
            }
        }
    }
});

function createUseDiv() {
    useRocketstart.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <div style="position: relative; display: flex; justify-content: center; align-items: center; column-gap: 1rem;">
                <p>Did you make this connection with Rocketstart?</p>
                <button style="border: 1px solid black; border-radius: 5px; height: min-content; background-color: lightgreen; min-width: 40px;">Yes</button>
                <button style="border: 1px solid black; border-radius: 5px; height: min-content; background-color: lightcoral; min-width: 40px;">No</button>
            </div>
        </body>
    </html>
    `;
}

var useRocketstart = document.createElement('div');
createUseDiv();

// Checking if the user is on the "mynetwork" tab.
    // If so, checking if the target div exists.
    // If so, appending Rocketstart UI.
// if(window.location.href === 'https://www.linkedin.com/mynetwork/' && document.getElementsByClassName('mn-summary-card-notification')) {  // If at least 1 LinkedIn invite was accepted
//     var acceptedInvites = document.getElementsByClassName('mn-summary-card-notification');
//     for (var i = 0; i < acceptedInvites.length; i++) {
//         acceptedInvites[i].firstChild.insertBefore(useRocketstart, acceptedInvites[i].nextElementSibling);
//     }
// }

function rocketstartUseAppend() {
    if(window.location.href === 'https://www.linkedin.com/mynetwork/' && document.getElementsByClassName('invitation-card__container') != []) {  // If at least 1 LinkedIn invite was accepted
        console.log('New div loaded');
        invites = document.getElementsByClassName('invitation-card__container')
        console.log(invites);
        console.log(invites[0]);
        // acceptedInvites.firstChild.insertBefore(useRocketstart, acceptedInvites.nextElementSibling);
    }
}

// Mutation observer checks for if the element is the target
const mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(function(mutation) {
        if(mutation.addedNodes.length) {
            if (mutation.target.classList.contains('artdeco-list__item') && mutation.target.classList != "newConnection") {
                console.log(mutation);
                mutation.target.setAttribute('class','newConnection');
            }
        }
    });
})

// Listen for every element being added in the document
mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

// TODO: at this point...
    // We tagged every item that needs to have a button appended.
    // When the mutations are over,
    // Loop through a for loop and add the necessary div to every element with the given class
    
    // This function currently works when the user navigates to the network tab,
    // Because the mutation observer is never disconnected.

    // The mutation observer should be disconnected when not on network tab.
    // Therefore, a solution is needed to run this portion of the script only on mynetwork.
    // And the rest of the content script only on a profile?

    // On page refresh, the mutation observer should be reconnected.