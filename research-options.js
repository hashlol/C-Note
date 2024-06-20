console.log("External file is also loaded!")


chrome.contextMenus.create({
  title: 'Research Options',
  id: 'researchOptions',
  contexts: ['selection'],
})

chrome.contextMenus.create({
  title: 'FIU Library Search',
  parentId: 'researchOptions',
  id: 'librarySearch',
  contexts: ['selection']
})

chrome.contextMenus.create({
  title: 'Define Word',
  parentId: 'researchOptions',
  id: 'defineWord',
  contexts: ['selection']
})

chrome.contextMenus.create({
  title: 'ChatGPT Explanation',
  parentId: 'researchOptions',
  id: 'chatgptExplain',
  contexts: ['selection']
})

chrome.contextMenus.onClicked.addListener((info) => {


  switch (info.menuItemId) {
    case 'librarySearch':
      // librarySearch function
      console.log('Looking up ' + info.selectionText + ' in FIU library');
      const newValue = info.selectionText.replaceAll(" ", "%20");
      const librarySearchurl = "https://fiu-flvc.primo.exlibrisgroup.com/discovery/search?query=any,contains," + newValue + "&tab=All40&search_scope=MyInst_and_CI&vid=01FALSC_FIU:FIU&lang=en&offset=0";
      chrome.tabs.create({ url: librarySearchurl });
      break;
    case 'defineWord':
      // defineWord function
      console.log('Looking for definition of ' + info.selectionText + ' in Merriam-Webster dictionary:');
      const url = "https://www.merriam-webster.com/dictionary/" + info.selectionText;
      chrome.tabs.create({ url: url });
      break;
    case 'chatgptExplain':
      console.log('Looking up ' + info.selectionText + ' on chatGPT');
      break;
    default:
      // Standard context menu item function
      console.log('Standard context menu item clicked.');
  }

})


