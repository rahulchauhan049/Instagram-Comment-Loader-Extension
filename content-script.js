async function sendConnectionRequest() {
    let count = 0;
    

    let allButtons = document.querySelectorAll('*[class^="_abl-"');
    let actionButtons = document.querySelectorAll('*[class^="_acan"]');
    let viewRepliesButtons = [];
    let loadMoreButton;

    allButtons.forEach((btn) => {
        if (
            btn.innerHTML ===
            '<div class="_abm0"><svg aria-label="Load more comments" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Load more comments</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.001" x2="17.001" y1="12.005" y2="12.005"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.001" x2="12.001" y1="7.005" y2="17.005"></line></svg></div>'
        ) {
            loadMoreButton = btn;
        }
        if (btn.innerText.startsWith("View replies")) {
            viewRepliesButtons = btn;
        }
    });

    let time = 0;
    while (loadMoreButton) {
      
        loadMoreButton.click();
        await new Promise(resolve => setTimeout(resolve, 1500));
        loadMoreButton = undefined;

        actionButtons.forEach((btn) => {
            if (btn.innerText.startsWith("View replies")) {
                viewRepliesButtons.push(btn);
            }
        });
        while (viewRepliesButtons.length>0) {
  
          for await (button of viewRepliesButtons) {
              button.click();
              await new Promise(resolve => setTimeout(resolve, 1500));
            };
            viewRepliesButtons = [];
            actionButtons = document.querySelectorAll('*[class^="_acan"]');
            for await (btn of actionButtons){
                if (btn.innerText.startsWith("View replies")) {
                    viewRepliesButtons.push(btn);
                }
            };
    
        }


        allButtons = document.querySelectorAll('*[class^="_abl-"');
        allButtons.forEach((btn) => {
            if (
                btn.innerHTML ===
                '<div class="_abm0"><svg aria-label="Load more comments" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Load more comments</title><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.001" x2="17.001" y1="12.005" y2="12.005"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.001" x2="12.001" y1="7.005" y2="17.005"></line></svg></div>'
            ) {
                loadMoreButton = btn;
            }
        });
        actionButtons = document.querySelectorAll('*[class^="_acan"]');
            actionButtons.forEach((btn) => {
                if (btn.innerText.startsWith("View replies")) {
                    viewRepliesButtons.push(btn);
                }
            });




    }
    chrome.runtime.sendMessage("done")
}

 sendConnectionRequest();
