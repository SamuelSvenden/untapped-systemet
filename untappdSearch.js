export function searchUntappd(beerName, beerName2) {
    const newUrl = 'https://untappd.com/search?q=' + beerName + " " + beerName2;
    chrome.tabs.create({url: newUrl});
}

