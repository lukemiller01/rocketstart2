adverbs = ["abnormally", "absentmindedly", "accidentally", "acidly", "actually", "adventurously", "afterwards", "almost", "always", "angrily", "annually", "anxiously", "arrogantly", "awkwardly", "badly", "bashfully", "beautifully", "bitterly", "bleakly", "blindly", "blissfully", "boastfully", "boldly", "bravely", "briefly", "brightly", "briskly", "broadly", "busily", "calmly", "carefully", "carelessly", "cautiously", "certainly", "cheerfully", "clearly", "cleverly", "closely", "coaxingly", "colorfully", "commonly", "continually", "coolly", "correctly", "courageously", "crossly", "cruelly", "curiously", "daily", "daintily", "dearly", "deceivingly", "delightfully", "deeply", "defiantly", "deliberately", "delightfully", "diligently", "dimly", "doubtfully", "dreamily", "easily", "elegantly", "energetically", "enormously", "enthusiastically", "equally", "especially", "even", "evenly", "eventually", "exactly", "excitedly", "extremely", "fairly", "faithfully", "famously", "far", "fast", "fatally", "ferociously", "fervently", "fiercely", "fondly", "foolishly", "fortunately", "frankly", "frantically", "freely", "frenetically", "frightfully", "fully", "furiously", "generally", "generously", "gently", "gladly", "gleefully", "gracefully", "gratefully", "greatly", "greedily", "happily", "hastily", "healthily", "heavily", "helpfully", "helplessly", "highly", "honestly", "hopelessly", "hourly", "hungrily", "immediately", "innocently", "inquisitively", "instantly", "intensely", "intently", "interestingly", "inwardly", "irritably", "jaggedly", "jealously", "joshingly", "joyfully", "joyously", "jovially", "jubilantly", "judgmentally", "justly", "keenly", "kiddingly", "kindheartedly", "kindly", "knavishly", "knottily", "knowingly", "knowledgeably", "kookily", "lazily", "less", "lightly", "likely", "limply", "lively", "loftily", "longingly", "loosely", "lovingly", "loudly", "loyally", "madly", "majestically", "meaningfully", "mechanically", "merrily", "miserably", "mockingly", "monthly", "mortally", "mostly", "mysteriously", "naturally", "nearly", "neatly", "needily", "nervously", "never", "nicely", "noisily", "not", "obediently", "obnoxiously", "oddly", "offensively", "officially", "often", "only", "openly", "optimistically", "overconfidently", "owlishly", "painfully", "partially", "patiently", "perfectly", "physically", "playfully", "politely", "poorly", "positively", "potentially", "powerfully", "promptly", "properly", "punctually", "quaintly", "quarrelsomely", "queasily", "queerly", "questionably", "questioningly", "quicker", "quickly", "quietly", "quirkily", "quizzically", "rapidly", "rarely", "readily", "really", "reassuringly", "recklessly", "regularly", "reluctantly", "repeatedly", "reproachfully", "restfully", "righteously", "rightfully", "rigidly", "roughly", "rudely", "sadly", "safely", "scarcely", "scarily", "searchingly", "sedately", "seemingly", "seldom", "selfishly", "separately", "seriously", "shakily", "sharply", "sheepishly", "shrilly", "shyly", "silently", "sleepily", "slowly", "smoothly", "softly", "solemnly", "solidly", "sometimes", "soon", "speedily", "stealthily", "sternly", "strictly", "successfully", "suddenly", "surprisingly", "suspiciously", "sweetly", "swiftly", "sympathetically", "tenderly", "tensely", "terribly", "thankfully", "thoroughly", "thoughtfully", "tightly", "tomorrow", "too", "tremendously", "triumphantly", "truly", "truthfully", "ultimately", "unabashedly", "unaccountably", "unbearably", "unethically", "unexpectedly", "unfortunately", "unimpressively", "unnaturally", "unnecessarily", "utterly", "upbeat", "upliftingly", "upright", "upside-down", "upward", "upwardly", "urgently", "usefully", "uselessly", "usually", "utterly", "vacantly", "vaguely", "vainly", "valiantly", "vastly", "verbally", "very", "viciously", "victoriously", "violently", "vivaciously", "voluntarily", "warmly", "weakly", "wearily", "well", "wetly", "wholly", "wildly", "willfully", "wisely", "woefully", "wonderfully", "worriedly", "wrongly", "yawningly", "yearly", "yearningly", "yesterday", "yieldingly", "youthfully", "zealously", "zestfully", "zestily"];
/* Need to capture the element the user is currently focused on (a text box) */

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
    
    // Questions, where one question mark means one question
    questions = text.split(/\?{1,}/).length - 1

    // Grade Level, characterized by Flesch-Kincaid
    // # of words
    // numWords = text.split(" ").length + 1
    numWords = text.split(/\S*[a-z]\S*/).length - 1

    // # of sentences, includes periods, exclamation, questions
    numSentences = text.split('.').length + text.split(/\!{1,}/).length + questions - 2

    // # of syllables
    numSyllables = 0
    text = text.replace('\'','') // Removing apostrophes '
    var wordList = text.split(/[^A-Za-z]/);
    var wordCount = wordList.length

    // Simultaneously, working on Wording:
    flaggedWords = []
    for (i = 0; i < wordCount; i++) {
        if (wordList[i] != '') { // If the word is not empty (some words like '-' have already been made '')
            numSyllables = numSyllables + syllable(wordList[i])
            if (adverbs.includes(wordList[i].toLowerCase())) {
                flaggedWords.push(wordList[i]);
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
            default:
                grade = 5
        }
    }

    // Wording, alerting users of poor word choice


    var pack = {
        paragraphs: paragraphs,
        questions: questions,
        grade: grade,
        words: flaggedWords
      };
    return pack;
}

/* Step 3
This function checks if the active element is the right input
*/
const isTextAreaOrInput = (element) => {
    if (element.id == "custom-message") {
        return true
    }
    return false;
}

/* Step 2
The function checks for if the active element is an input
The window's event listener catches changes to the active element
The purpose of this function is to keep the lastActiveElement fresh
For Step 4
*/
const listenActiveElement = function (callback) {
    let lastActiveElement = document.activeElement;

    // If the focus changes
    const detectFocus = () => {
        if(lastActiveElement !== document.activeElement) {
            lastActiveElement = document.activeElement
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
                    words: []
                });
            }
        }
    };

    window.addEventListener("focus", detectFocus, true)
};

/* Step 4
If the focus is editable,
Listen for a "keydown" event
When a key is pressed down, the user is "actively typing"

Listen for a "keyup" event
When a key is released, the text is saved and the timer is cleared
So the timer for inactivity can begin again

If the text isn't changed after a certain amount of time,
The last input is collected
And the user is treated as "Not typing"
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
        words: dataPack.words
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
                        words: dataPack.words,
                    });
                }
            }
        }, waitTime);
    });
};

/*
Button added to the text box being focused in on
The button is created, and an onclick made
An event listener "focusin" is created
When a text box is focused in,
The button is appended to the text box
*/
var btn = createButton();

function createButton() {
    var btn = document.createElement('button');
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

/*
Update to appendButton:

The button should contain the same styles as the LinkedIn UI
    W.R.T both the text style and box style

These styles aren't available when the button is created,
So they're being implemented onto the button when the button is appended, or
On the popup for the connection message draft.
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

function createFrame() {
    toggle = false;
    iframe.style.background = "white";
    iframe.style.height = "100%";
    iframe.style.width = "0px";
    iframe.style.position = "fixed";
    iframe.style.bottom = "0px";
    iframe.style.right = "0px";
    iframe.style.borderLeft = "1px solid rgba(0,0,0,.15)";
    iframe.style.zIndex = "9000000000000000000";
    iframe.src = chrome.runtime.getURL("popup.html")
    document.body.appendChild(iframe);
}

/*
iFrame added as a right side panel
*/
var iframe = document.createElement('iframe');
createFrame();

function toggleWindow(){
    if(iframe.style.width == "0px"){
        toggle = true;
        iframe.style.width="300px";
        // Main content:
        document.getElementsByClassName("scaffold-layout__inner")[0].style.margin = "0";
        document.getElementsByClassName("scaffold-layout__content")[0].style.width = window.innerWidth - 300 + "px";
        document.getElementsByClassName("scaffold-layout__content")[0].style.paddingLeft = "1rem";
        document.getElementsByClassName("scaffold-layout__content")[0].style.paddingRight = "1rem";
        // Message box:
        document.getElementById("msg-overlay").style.right = 310 + "px";
        // Navbar:
        document.getElementsByClassName("global-nav__content")[0].style.width = "inherit";
        document.getElementById("global-nav").style.display = "flex";
        document.getElementById("global-nav").style.paddingLeft = "1rem";
        document.getElementById("global-nav").style.paddingRight = "1rem";
        document.getElementById("global-nav").style.width = window.innerWidth - 300 + "px";
        // Sticky header:
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.margin = "0";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.width = window.innerWidth - 300 + "px";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.paddingLeft = "7px";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.paddingRight = "1rem";
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.maxWidth = "none";
        document.getElementsByClassName("pvs-profile-actions--rtl")[0].classList.remove("mr2");
        document.getElementsByClassName("pv-profile-sticky-header-v2__mini-profile-container")[0].style.minWidth = "unset";
        // Paragraph scale, reset other insights
        chrome.runtime.sendMessage({
            from: 'contentScript',
            subject: 'Scale'
        });
    }
    else{
        toggle = false;
        iframe.style.width = "0px";
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
    }
}

/* Step 1
Upon a match occuring ("https://www.linkedin.com./in/*"),
This script detects the focus of the cursor,
And if any typing is occuring
*/
listenActiveElement(function (element) {
    listenToTyping(element);
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'closeFrame')) {
        toggleWindow();
    }
});

// Listen for changes in the window width
window.addEventListener("resize", function(event) {
    if(toggle) {
        // Main content:
        document.getElementsByClassName("scaffold-layout__content")[0].style.width = window.innerWidth - 300 + "px";
        // Message box:
        document.getElementById("msg-overlay").style.right = 310 + "px";
        // Navbar:
        document.getElementById("global-nav").style.width = window.innerWidth - 300 + "px";
        // Sticky header:
        document.getElementsByClassName("scaffold-layout-toolbar__content")[0].style.width = window.innerWidth - 300 + "px";
    }
});