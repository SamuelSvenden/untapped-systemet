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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab && tab.url && !tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addButtonToElement
    });
  }
});

