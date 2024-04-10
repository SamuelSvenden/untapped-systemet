document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: {tabId: tabs[0].id},
          function: () => {
            const element1 = document.querySelector('.css-u753bx');
            const element2 = document.querySelector('.css-oyb92o');
            const element3 = document.querySelectorAll('#productInformation p.css-17671ko')[1];
            return {
                element1: element1 ? element1.innerHTML : '',
                element2: element2 ? element2.innerHTML : '',
                element3: element3 ? element3.innerHTML : ''
            };
          }
        },
        function(result) {
          document.getElementById('beerName').innerText = result[0].result.element1 + " " + result[0].result.element2;
          document.getElementById('brewery').innerText = result[0].result.element3;
          
          const newUrl = 'https://untappd.com/search?q=' + result[0].result.element1 + " " + result[0].result.element2;
          chrome.tabs.create({url: newUrl});
          
        }
      );
    });
});


/*
function searchUntappd() {
  document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: {tabId: tabs[0].id},
          function: () => {
            const element1 = document.querySelector('.css-u753bx');
            const element2 = document.querySelector('.css-oyb92o');
            const element3 = document.querySelectorAll('#productInformation p.css-17671ko')[1];
            return {
                element1: element1 ? element1.innerHTML : '',
                element2: element2 ? element2.innerHTML : '',
                element3: element3 ? element3.innerHTML : ''
            };
          }
        },
        function(result) {
          document.getElementById('beerName').innerText = result[0].result.element1 + " " + result[0].result.element2;
          document.getElementById('brewery').innerText = result[0].result.element3;
          const newUrl = 'https://untappd.com/search?q=' + result[0].result.element1 + " " + result[0].result.element2;
          chrome.tabs.create({url: newUrl});
        }
      );
    });
});
}


chrome.action.onClicked.addListener((tab) => {
  if (changeInfo.status === 'complete' && tab.active && tab.url.includes('https://www.systembolaget.se/produkt/ol/')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: searchUntappd
    });
  }
});

*/