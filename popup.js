var data = [];
let tabid, taburl;
const getTabId = new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        tabid = tabs[0].id;
        taburl = tabs[0].url;
        resolve(tabid);
    });
});

getTabId.then(() => {
    chrome.scripting.executeScript({
        target: {
            tabId: tabid,
            allFrames: true
        },
        files: ['main.js'],
    });
    if (taburl.match(/google\.com\/search/)) {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.type === 'data') {
                document.getElementById("loader").style.display = "none";
                data = request.data;
                if (data.length == 0) {
                    var newElement = document.createElement("div");
                    newElement.innerHTML = `<div class="product-card" ><h1 class="productTitle">No results found :(</h1><img width="200" class="productImage" src="images/sorry.gif"><p class="productPrice">No results from the alternate website.</p></div>`;
                    document.getElementById("details-container").innerHTML = newElement.innerHTML;
                }
            }
        });
    }
    else {
        document.getElementById("loader").style.display = "none";
        var newElement = document.createElement("div");
        newElement.innerHTML = `<div class="product-card" ><h1 class="productTitle">I think you are on a wrong page.</h1><img width="200" class="productImage" src="images/404.gif"><p class="productPrice">Visit Amazon/Flipkart Search or Product Page to check me out.</p></div>`;
        document.getElementById("details-container").innerHTML = newElement.innerHTML;
    }
});


