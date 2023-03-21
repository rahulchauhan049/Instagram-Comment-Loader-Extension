document.getElementById("connectionButton").addEventListener("click", () => {
    document.getElementById("commentLoading").innerHTML = "Loading...";
    document.getElementById("connectionButton").classList.add("hidden");
    // document.getElementById("stopButton").classList.remove("hidden");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id, allFrames: false },
            files: ["content-script.js"],
        });
    });

    chrome.runtime.onMessage.addListener((message) => {
      console.log(message)
        if (message === "done") {
          document.getElementById("commentLoading").innerHTML = "Done";
            document
                .getElementById("connectionButton")
                .classList.remove("hidden");
            // document.getElementById("stopButton").classList.add("hidden");
        }
    });
});
