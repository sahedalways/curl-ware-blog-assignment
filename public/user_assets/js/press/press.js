let currentURL = "";

function triggerModal() {
    // Find the button element by its ID
    var modalButton = document.getElementById("sharePressModalButton");

    modalButton.click();
}

// Define the function to share to social media
function shareToSocialMedia(url) {
    currentURL = url;
    // Trigger the modal
    triggerModal();
}

// Find the button elements by their IDs
var facebookButton = document.getElementById("facebook-btn");
var linkedinButton = document.getElementById("linkedin-btn");
var twitterButton = document.getElementById("twitter-btn");

// Add event listeners to each button
facebookButton.addEventListener("click", function () {
    window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" + currentURL,
        "_blank"
    );
});

linkedinButton.addEventListener("click", function () {
    window.open(
        "https://www.linkedin.com/shareArticle?url=" + currentURL,
        "_blank"
    );
});

twitterButton.addEventListener("click", function () {
    window.open("https://twitter.com/share?url=" + currentURL, "_blank");
});

function copyLink() {
    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.value = currentURL;

    // Append the input element to the body
    document.body.appendChild(tempInput);

    // Select the input element
    tempInput.select();

    // Copy the URL to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);
    alert("Link copied to clipboard.");
}
