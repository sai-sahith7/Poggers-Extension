function getapidata() {
    if (window.location.href.match(/^https:\/\/www\.google\.com\/search/)) {
        // let product = document.evaluate('//*[@id="productTitle"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
        let search_query = new URL(window.location.href).searchParams.get('q');
        let product = search_query.split(' ').join('+');

        // create a div element below google results statistics
        // let newElement = document.createElement("div");
        // newElement.id = "details-container";
        // assign popup.html to the div element
        // fetch data from an API
        fetch(`https://poggers-extension-api.vercel.app/search?q=${product}`).then(response => response.json()).then(data => {
            data.data.forEach(element => {
                var newElement = document.createElement("div");
                newElement.id = "details-container";
                newElement.innerHTML = `
        <div style="margin-bottom:2rem;" id="loader" class="loader">
            <link rel="stylesheet" href="popup.css">
            <div style="display:flex;border-colour: pink !important;border-style: solid;border-radius: 2rem;">
                <img class="productImage" style="border-radius:2rem;margin:1rem;" width="200px" src="${element.image}">
                <div style="margin-left:4rem;display:block;">
                    <h1 style = "margin-top:2rem;"><span id="extensionTitle">${element.name}</span></h1>
                    <h1 style = "margin-top:2rem;"><span id="extensionTitle">Rs.400</span></h1>
                    <h1 style = "margin-top:0.5rem;"><span id="extensionTitle">Visit Website</span></h1>
                </div>
            </div>
            <div id="details-container">
            </div>
        </div>
        <script src="popup.js"></script>`;
                document.getElementById("rso").insertBefore(newElement, document.getElementById("rso").childNodes[0]);
            });
        });
    }
}

getapidata();
