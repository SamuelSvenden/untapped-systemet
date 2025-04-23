function addButtonToElement(element) {
  setTimeout(() => {
    const elements = document.querySelectorAll('.css-2114pf');
    console.log(elements.length);

    elements.forEach((element) => {
      // Check if this element already has an Untappd search button
      const existingButton = element.querySelector('.untappd-search-button');
      if (existingButton) {
        // Remove the existing button and its container
        const existingContainer = element.querySelector('.untappd-container');
        if (existingContainer) {
          existingContainer.remove();
        }
      }

      // Create a container for both button and APK
      const container = document.createElement("div");
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.gap = '10px';
      container.classList.add('untappd-container');

      const button = document.createElement("button");
      button.innerText = "Search Untappd";
      button.classList.add('css-1traj2v');
      button.classList.add('untappd-search-button');
      button.style.marginBottom = '10px'; // Remove bottom margin since we're using gap
      
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
      container.appendChild(link);
      element.appendChild(container);
    });
  }, 500);
}

function addApkToElement(element) {
  setTimeout(() => {
    const elements = document.querySelectorAll('.css-2114pf');
    console.log(elements.length);

    elements.forEach((element) => {
      // Check if this element already has an APK rate
      const existingApk = element.querySelector('.apkrate');
      if (existingApk) {
        // Remove the existing APK rate
        existingApk.remove();
      }

      const p = document.createElement("p"); 
      p.classList.add('apkrate');
      
      p.innerText = "APK: ";

      // Find the volume and percentage elements
      const volumeElement = element.querySelector('#stock_scrollcontainer > p:nth-child(2)');
      const percentageElement = element.querySelector('#stock_scrollcontainer > p:nth-child(3)');
      const priceElement = element.querySelector('.css-a2frwy');

      // Extract and parse values
      const volumeText = volumeElement ? volumeElement.innerText : '';
      const percentageText = percentageElement ? percentageElement.innerText : '';
      const priceText = priceElement ? priceElement.innerText : '';

      // Parse values
      const milliliters = volumeText ? parseFloat(volumeText.replace(' ml', '')) : 0;
      const percentage = percentageText ? parseFloat(percentageText.replace(',', '.').replace(' % vol.', '')) : 0;
      const price = priceText ? parseFloat(priceText.replace('*', '').replace(':', '.')) : 0;

      console.log('Volume:', milliliters);
      console.log('Percentage:', percentage);
      console.log('Price:', price);

      // Calculate APK
      const apk = price > 0 ? (milliliters * (percentage / 100)) / price : 0;
      
      p.append(apk.toFixed(2));
      
      // Find the existing container or create a new one
      let container = element.querySelector('.untappd-container');
      if (!container) {
        container = document.createElement("div");
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.gap = '10px';
        container.classList.add('untappd-container');
        element.appendChild(container);
      }
      
      container.appendChild(p);
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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab && tab.url && !tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addApkToElement
    });
  }
});


