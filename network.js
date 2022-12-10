// Creates a new element and returns it for every new connection in the DOM.
usageDivId = 0
function addUsageDiv() {
    var useRocketstart = document.createElement('div');
    useRocketstart.id = 'usage' + (usageDivId++);
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

// Mutation observer checks for if the element is the target. Handles the page being opened on tab open.
const mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(function(mutation) {
        if(mutation.addedNodes.length) {
            if (mutation.target.classList.contains('invitation-card__container') && mutation.target.id != "newConnection") {
                mutation.target.setAttribute('id','newConnection');
                var useDiv = addUsageDiv();
                mutation.target.parentElement.insertBefore(useDiv, mutation.target.nextSibling);
            }
        }
    });
});

// Listen for every element being added in the document
mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

// TODO:
    // Add CSS animation after Yes/No click on the Rocketstart usage poll