// Creates a new element and returns it for every new connection in the DOM.
usageDivId = 0
function addUsageDiv() {
    var useRocketstart = document.createElement('div');
    useRocketstart.id = 'usage' + (usageDivId++);

    // Font styling
    // const titleParagraph = document.getElementsByClassName("invitation-card__subtitle");
    // const paragraphObj = window.getComputedStyle(titleParagraph[0]);
    // var fontSize = paragraphObj.getPropertyValue("font-size");
    // var fontWeight = paragraphObj.getPropertyValue("font-weight");
    // var fontColor = paragraphObj.getPropertyValue("color");
    // useRocketstart.style.fontSize = fontSize;
    // useRocketstart.style.fontWeight = fontWeight;
    // useRocketstart.style.fontWeight = fontColor;

    useRocketstart.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                p {
                    font-size: 14px;
                    color: rgba(0,0,0,.6);
                }
            </style>
        </head>
        <body>
            <div style="position: relative; display: flex; justify-content: center; align-items: center; column-gap: 1rem; padding: 1rem">
                <p>Did you make this connection with Rocketstart?</p>
                <button class="rocketstart__network-button" style="border: 1px solid black; border-radius: 5px; height: min-content; min-width: 50px; min-height:30px;"> <p style="font-weight: bold;">Yes</p> </button>
                <button class="rocketstart__network-button" style="border: 1px solid black; border-radius: 5px; height: min-content; min-width: 50px; min-height:30px;"> <p style="font-weight: bold;">No</p> </button>
            </div>
        </body>
    </html>
    `;

    return useRocketstart;
}

// Finds every element with the specifiec class. Handles page being navigated to with URL change.
if(document.getElementsByClassName('invitation-card__container')) {
    for (i = 0; i < document.getElementsByClassName('invitation-card__container').length; i++) {
        var useDiv = addUsageDiv();
        document.getElementsByClassName('invitation-card__container')[i].parentElement.insertBefore(useDiv, document.getElementsByClassName('invitation-card__container')[i].nextSibling);
        document.getElementsByClassName('invitation-card__container')[i].setAttribute('id','newConnection');
    }
}

buttonCount = 1 // At the start, there's no buttons. Start with button #1
// Mutation observer checks for if the element is the target. Handles the page being opened on tab open.
const mutationObserverNetwork = new MutationObserver(mutations => {
    mutations.forEach(function(mutation) {
        if(mutation.addedNodes.length) {
            if (mutation.target.classList.contains('invitation-card__container') && mutation.target.id != "newConnection") {
                mutation.target.setAttribute('id','newConnection');
                var useDiv = addUsageDiv();
                mutation.target.parentElement.insertBefore(useDiv, mutation.target.nextSibling);

                // Handle button IDs
                buttonCount = buttonCount + 2; // Add another set of button
                buttons = document.getElementsByClassName("rocketstart__network-button"); // Get the list of buttons
                for (counter = 0; counter < document.getElementsByClassName("rocketstart__network-button").length; counter++)
                {
                    if(buttons[counter].getAttribute('clickListener') !== 'true') { // If the element doesn't have a listener
                        if (Math.abs(counter % 2) == 0) { // Yes buttons
                            buttons[counter].addEventListener('click', function() {
                                console.log("Yes");
                            });
                            buttons[counter].setAttribute('clickListener', 'true');
                        }
                        else { // No buttons
                            buttons[counter].addEventListener('click', function() {
                                console.log("No");
                            });
                            buttons[counter].setAttribute('clickListener', 'true');
                        }
                        
                    }
                }
            }
        }
    });
});
// TODO button:
    // Both Y & N:
        // call a function that animates the div out of the page. Pass one var:
            // 1. A true or false based on if the button was yes or no.
        // The correct div will be identified by finding the parent element of the button.
    
    // Only Y:
        // +1 to DB

// Listen for every element being added in the document
mutationObserverNetwork.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

// TODO:
    // Add CSS animation after Yes/No click on the Rocketstart usage poll
    // Make the element responsive