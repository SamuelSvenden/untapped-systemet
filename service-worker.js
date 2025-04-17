function addButtonToElement(element) {
  setTimeout(() => {
    const elements = document.querySelectorAll('.css-2114pf');
    console.log(elements.length);

    elements.forEach((element) => {
      // Check if this element already has an Untappd search button
      const existingButton = element.querySelector('.untappd-search-button');
      if (existingButton) {
        return;
      }

      const button = document.createElement("button");
      button.innerText = "Search Untappd";
      button.classList.add('css-zisg71');
      button.classList.add('untappd-search-button');
      button.style.marginBottom = '10px';
      
      button.onclick = (event) => {
        event.stopPropagation();
      };

      var element1 = element.querySelector('.css-1njx6qf');
      beerName = element1 ? element1.innerText : "";

      var element2 = element.querySelector('.css-1hdv0wt');
      brewery = element2 ? element2.innerText : "";
      
      const link = document.createElement("a");
      link.href = 'https://untappd.com/search?q='+ beerName + " " + brewery;
      link.target = "_blank"; 
      
      link.appendChild(button);
      element.appendChild(link);
    });
  }, 500);
}


function addApkToElement(element) {
  setTimeout(() => {
    const elements = document.querySelectorAll('.css-gg4vpm');
    console.log(elements.length);

    elements.forEach((element) => {
      if (element.querySelector('.apkrate')) {
        return;
      }

      // Create a container for button and APK text
      const container = document.createElement("div");
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.gap = '10px';

      const p = document.createElement("p"); 
      p.classList.add('apkrate');
      p.style.margin = '0'; // Remove default margin
      
      p.innerText = "APK: ";

      var element1 = element.querySelectorAll('.css-bbhn7t');
      const innerHtmls = Array.from(element1).map(el => el.innerHTML);
      var price = element.querySelector('.css-a2frwy')

      var element2 = innerHtmls[1] ? parseFloat(innerHtmls[1].replace(',', '.')) : 0;
      var element3 = innerHtmls[2] ? parseFloat(innerHtmls[2].replace(',', '.')) : 0;
      var element4 = price ? parseFloat(price.innerText.replace(':', '.').replace('*', '')) : 0;

      var apk = (element2*(element3/100))/element4;
      
      p.append(apk.toFixed(2));
      
      // Add both elements to the container
      container.appendChild(p);
      element.appendChild(container);
    });
  }, 500);
}




chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab && tab.url && !tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addButtonToElement
    });
  }
});

/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab && tab.url && !tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addApkToElement
    });
  }
});
*/


