document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: {tabId: tabs[0].id},
          function: () => {
            // Create a new h1 element
           const h1 = document.createElement('h1');
           h1.textContent = 'Hello, world!';
           document.body.appendChild(h1);
           
           
            const element1 = document.querySelector('.css-u753bx');
            const element2 = document.querySelector('.css-oyb92o');
            //const element3 = document.querySelectorAll('#productInformation p.css-17671ko')[1];
            return {
                element1: element1 ? element1.innerHTML : '',
                element2: element2 ? element2.innerHTML : '',
                //element3: element3 ? element3.innerHTML : ''
            };
          }
        },
        function(result) {
          document.getElementById('beerName').innerText = result[0].result.element1 + " " + result[0].result.element2;
          //document.getElementById('brewery').innerText = result[0].result.element3;
          const newUrl = 'https://untappd.com/search?q=' + result[0].result.element1 + " " + result[0].result.element2;
          chrome.tabs.create({url: newUrl});
        }
      );
    });
});