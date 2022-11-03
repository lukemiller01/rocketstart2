/* Need to capture the element the user is currently focused on (a text box) */

/* Step 3
This function checks if the active element is an input
Or if the active element is editable
*/
const isTextAreaOrInput = (element) => {
    if(!element) {
        return false
    }

    // Change the tag name to uppercase before comparing:
    const tagName = element.tagName.toUpperCase();
    if (tagName === "TEXTAREA" || tagName === "INPUT")
    {
        return true;
    }

    // Check if content is editable:

    var isContentEditable = element.getAttribute('contenteditable');
    if (isContentEditable) {
        return true;
    }

    // If none of the above conditions are met:
    return false
}

/* Step 2
The function checks for if the active element is an input
The window's event listener catches changes to the active element
The purpose of this function is to keep the lastActiveElement fresh
For Step 4
*/
const listenActiveElement = function (callback) {
    let lastActiveElement = document.activeElement;
    // Is the element an input?
    if(isTextAreaOrInput(lastActiveElement)) {
        callback(lastActiveElement);
    }

    // If the focus changes
    const detectFocus = () => {
        if(lastActiveElement !== document.activeElement) {
            lastActiveElement = document.activeElement
            if(isTextAreaOrInput(lastActiveElement)) {
                callback(lastActiveElement)
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

After a certain amount of time has passed,
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
                    words = lastInput.split(" ").length - 1; // Count the words in the input
                    chrome.runtime.sendMessage({
                        from: 'contentScript',
                        subject: 'updateUI',
                        words: words});
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
document.addEventListener('focusin', onFocusIn);

function onFocusIn(event) {
    var target = event.target;
    if (isTextAreaOrInput(target))
    {
        appendButton(target);
    }
}

function createButton() {
    var btn = document.createElement('button');
    btn.textContent = 'Rocketstart Insights';
    btn.onclick = function(event) {
        toggleWindow();
    };
    return btn;
}

function appendButton(textElement) {
    textElement.parentElement.insertBefore(btn, textElement.nextElementSibling);
}

function createFrame() {
    iframe.style.background = "white";
    iframe.style.height = "100%";
    iframe.style.width = "0px";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.right = "0px";
    iframe.style.zIndex = "9000000000000000000";
    iframe.style.border = "0px"; 
    iframe.src = chrome.runtime.getURL("popup.html")
    document.body.appendChild(iframe);

    // var exit = iframe.contentDocument.getElementById("exit");
    // exit.onclick = function() {
    //     toggleWindow();
    // };
}

/*
iFrame added as a right side panel
*/
var iframe = document.createElement('iframe');
createFrame();

function toggleWindow(){
    if(iframe.style.width == "0px"){
        iframe.style.width="300px";
    }
    else{
        iframe.style.width = "0px";
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