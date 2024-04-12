function addButtonToElement(element) {
  setTimeout(() => {
    const elements = document.querySelectorAll('.css-18q0zs4');
    console.log(elements.length);

    elements.forEach((element) => {
      if (element.querySelector('button')) {
        return;
      }

      const button = document.createElement("button");
      button.innerText = "Search Untappd";
      
      button.onclick = (event) => {
        event.stopPropagation();
      };

      var element1 = element.querySelector('.css-1n0krvs');
      element1 = element1 ? element1.innerText : "";

      var element2 = element.querySelector('.css-123rcq0');
      element2 = element2 ? element2.innerText : "";
      
      const link = document.createElement("a");
      link.href = 'https://untappd.com/search?q='+element1 + " " + element2;
      link.target = "_blank"; 
      
      link.appendChild(button);
      element.appendChild(link);
    });
  }, 500);
}


function addApkToElement(element) {
  setTimeout(() => {
    const elements = document.querySelectorAll('.css-6df2t1');
    console.log(elements.length);

    elements.forEach((element) => {
      if (element.querySelector('.apkrate')) {
        return;
      }

      const p = document.createElement("p"); 
      p.classList.add('apkrate');
      
      p.innerText = "APK: ";

      
      var element1 = element.querySelectorAll('.css-bbhn7t');
      const innerHtmls = Array.from(element1).map(el => el.innerHTML);
      var price = element.querySelector('.css-17znts1')


      var element2 = innerHtmls[1] ? parseFloat(innerHtmls[1].replace(',', '.')) : 0;
      var element3 = innerHtmls[2] ? parseFloat(innerHtmls[2].replace(',', '.')) : 0;
      var element4 = price ? parseFloat(price.innerText.replace(':', '.').replace('*', '')) : 0;


      var apk = (element2*(element3/100))/element4;
      
      p.append(apk.toFixed(2));
      element.appendChild(p);
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



