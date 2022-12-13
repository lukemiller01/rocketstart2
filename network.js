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
        </head>
        <body>
            <div style="position: relative; display: flex; justify-content: center; align-items: center; column-gap: 1rem; padding: 1rem">
                <p style="font-size: 14px; color: rgba(0,0,0,.6);">Did you make this connection with Rocketstart?</p>
                <button class="rocketstart__network-button" style="border: 1px solid black; border-radius: 5px; height: min-content; min-width: 50px; min-height:30px; font-weight: bold; font-size: 14px; color: rgba(0,0,0,.6);">Yes</button>
                <button class="rocketstart__network-button" style="border: 1px solid black; border-radius: 5px; height: min-content; min-width: 50px; min-height:30px; font-weight: bold; font-size: 14px; color: rgba(0,0,0,.6);">No</button>
            </div>
        </body>
    </html>
    `;

    return useRocketstart;
}

// TODO
function addConnectionToDB() {
    console.log("Add connection to DB")
}

buttonCount = 1 // At the start, there's no buttons. Start with button #1

// Finds every element with the specific class. Handles page being navigated to with URL change.
if(document.getElementsByClassName('invitation-card__container')) {
    for (i = 0; i < document.getElementsByClassName('invitation-card__container').length; i++) {
        var useDiv = addUsageDiv();
        document.getElementsByClassName('invitation-card__container')[i].parentElement.insertBefore(useDiv, document.getElementsByClassName('invitation-card__container')[i].nextSibling);
        document.getElementsByClassName('invitation-card__container')[i].setAttribute('id','newConnection');

        // Handle button IDs
        buttonCount = buttonCount + 2; // Add another set of button
        buttons = document.getElementsByClassName("rocketstart__network-button"); // Get the list of buttons
        for (counter = 0; counter < document.getElementsByClassName("rocketstart__network-button").length; counter++)
        {
            if(buttons[counter].getAttribute('clickListener') !== 'true') { // If the element doesn't have a listener
                if (Math.abs(counter % 2) == 0) { // Yes buttons
                    // Add hover
                    buttons[counter].onmouseover = function(event){
                        var target = event.target;
                        target.style.backgroundColor = "lightgreen";
                    };
                    buttons[counter].onmouseleave = function(event){
                        var target = event.target;
                        target.style.backgroundColor = "";
                    };
                    // Add click
                    buttons[counter].addEventListener('click', function(event) {
                        addConnectionToDB();
                        var target = event.target;
                        target.parentElement.addEventListener('transitionend', function() {
                            target.parentElement.remove();
                        });
                        // target.parentElement.style.height = "0px";
                        target.parentElement.style.transition = "transform .25s 0s, opacity .1s 0s";
                        target.parentElement.style.transform = "translateY(-5vw)";
                        target.parentElement.style.opacity = "0";
                    });
                    buttons[counter].setAttribute('clickListener', 'true');
                }
                else { // No buttons
                    // Add hover
                    buttons[counter].onmouseover = function(event){
                        var target = event.target;
                        target.style.backgroundColor = "lightcoral";
                    };
                    buttons[counter].onmouseleave = function(event){
                        var target = event.target;
                        target.style.backgroundColor = "";
                    };
                    // Add click
                    buttons[counter].addEventListener('click', function() {
                        var target = event.target;
                        target.parentElement.addEventListener('transitionend', function() {
                            target.parentElement.remove();
                        });
                        // target.parentElement.style.height = "0px";
                        target.parentElement.style.transition = "transform .25s 0s, opacity .1s 0s";
                        target.parentElement.style.transform = "translateY(-5vw)";
                        target.parentElement.style.opacity = "0";
                    });
                    buttons[counter].setAttribute('clickListener', 'true');
                }
            }
        }
    }
}

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
                            // Add hover
                            buttons[counter].onmouseover = function(event){
                                var target = event.target;
                                target.style.backgroundColor = "lightgreen";
                            };
                            buttons[counter].onmouseleave = function(event){
                                var target = event.target;
                                target.style.backgroundColor = "";
                            };
                            // Add click
                            buttons[counter].addEventListener('click', function(event) {
                                addConnectionToDB();
                                var target = event.target;
                                target.parentElement.addEventListener('transitionend', function() {
                                    target.parentElement.remove();
                                });
                                // target.parentElement.style.height = "0px";
                                target.parentElement.style.transition = "transform .25s 0s, opacity .1s 0s";
                                target.parentElement.style.transform = "translateY(-5vw)";
                                target.parentElement.style.opacity = "0";
                            });
                            buttons[counter].setAttribute('clickListener', 'true');
                        }
                        else { // No buttons
                            // Add hover
                            buttons[counter].onmouseover = function(event){
                                var target = event.target;
                                target.style.backgroundColor = "lightcoral";
                            };
                            buttons[counter].onmouseleave = function(event){
                                var target = event.target;
                                target.style.backgroundColor = "";
                            };
                            // Add click
                            buttons[counter].addEventListener('click', function() {
                                var target = event.target;
                                target.parentElement.addEventListener('transitionend', function() {
                                    target.parentElement.remove();
                                });
                                // target.parentElement.style.height = "0px";
                                target.parentElement.style.transition = "transform .25s 0s, opacity .1s 0s";
                                target.parentElement.style.transform = "translateY(-5vw)";
                                target.parentElement.style.opacity = "0";
                            });
                            buttons[counter].setAttribute('clickListener', 'true');
                        }
                    }
                }
            }
        }
    });
});

// Listen for every element being added in the document
mutationObserverNetwork.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

// TODO:
    // On refresh, the buttons pop back up.
        // The buttons must be persistent until they're clicked on a specific profile.
            // In plain words:
                // Luke accepted your invite to connect has a Y/N button.
                // If clicked, the buttons are gone on that div forever.
                // If not clicked and refreshed, the buttons should stay.
        // Check below condition (does LinkedIn popup disappear on page navigation or refresh?)
        // Use logic to ensure that once a unique Yes/No was clicked, it never re-appears.
            // Maybe use ember{id} of the images?
        // Check if LinkedIn "{name} accepted your invite to connect" disappears after page refresh.
            // If Yes - 
        // If the data needs to be stored as someone's name,
            // The data should only be persistent until the instance of the browser window closes.