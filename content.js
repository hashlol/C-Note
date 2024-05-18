// console.log("This prints to the console of the page (injected only if the page url matched)");

function createMenu() {
    // Get the li element to clone
    const ul = document.getElementById("menu");
    const secondMenuItem = ul.children[1];

    // Clone the li element
    var clone = secondMenuItem.cloneNode(true);
    clone.id = "li-menu-notes";
    
    //create Notes Icon
    const img = document.createElement('img');
    var imgURL = chrome.runtime.getURL("assets/notepadicon.blue.svg");
    img.src = imgURL;
    const div = clone.getElementsByClassName("menu-item-icon-container");
    div[0].innerHTML = '';
    div[0].appendChild(img);

    //Update tooltip text
    const tooltip = clone.getElementsByClassName("menu-item__text");
    tooltip[0].innerHTML = " Notes "; 

    //Insert new Notes Icon
    ul.appendChild(clone);
}

createMenu();    
