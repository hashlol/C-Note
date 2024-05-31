class DOMElements {
    classList = new Set();
    constructor() {
      this.replacementDiv = document.createElement("div"); // Main div which will house all of our information
      this.parent = document.getElementById("application"); // parent div of application which is used to find children
      this.wrapper = document.getElementById("wrapper"); // wrapper div which is replaced by replacementDiv in most cases
      this.elements = [
        // Map which will contain all of our elements so they're accesible and so that we can update them
        { id: "replacementDiv", element: this.replacementDiv },
        { id: "parent", element: this.parent },
        { id: "wrapper", element: this.wrapper },
      ];
    }
  
    // Adds element based off of ID to map
    addElement(id, element) {
      this.elements.push({ id, element });
    }
  
    // Gets element from map given its id, id is a string
    getElement(id) {
      return this.elements.find((el) => el.id === id)?.element;
    }
  
    // Function that will modify an item given its ID
    modifyElement(id, modifications) {
      const element = this.getElement(id);
      if (element && modifications) {
        Object.assign(element.style, modifications);
      }
    }
  
    // Placeholder for now sort of but will contain all of our components and styling being built
    elementPreparation() {
        const notesContainer = $('<div></div>').load(chrome.runtime.getURL("index.html"));
        $('#main').html(notesContainer);
        $("#nav-home").ready(function() {
            $("#nav-home").notesEditor();
        })
        //$("#nav-home").notesEditor();
//       this.modifyElement("replacementDiv", {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         height: "100vh",
//   //      backgroundColor: "#ffffff",
//         padding: "20px",
//       });
  
//       // Create Notepad header
//       const notepadContainer = document.createElement("div");
//       notepadContainer.classList.add("notepad-container");
  
//       const header = document.createElement("div");
//       header.classList.add("header");
//       const h1 = document.createElement("h1");
//       h1.textContent = "Notepad";
//       const lastEdited = document.createElement("div");
//       lastEdited.classList.add("last-edited");
//       lastEdited.textContent = "Last Edited: XXXXXX";
//       header.appendChild(h1);
//       header.appendChild(lastEdited);
  
//       // Create note container
//       const noteContainer = document.createElement("div");
//       noteContainer.classList.add("note-container");
  
//       // Create note header
//       const noteHeader = document.createElement("div");
//       noteHeader.classList.add("note-header");
//       const noteTitle = document.createElement("div");
//       noteTitle.classList.add("note-title");
//       noteTitle.innerHTML = "Untitled File <span>&#9998;</span>";
//       const noteActions = document.createElement("div");
//       noteActions.classList.add("note-actions");
//       const shareButton = document.createElement("button");
//       shareButton.classList.add("ui-button");
//       shareButton.textContent = "Share";
//       const moreButton = document.createElement("button");
//       moreButton.innerHTML = "&#8942;";
//       noteActions.appendChild(shareButton);
//       noteActions.appendChild(moreButton);
//       noteHeader.appendChild(noteTitle);
//       noteHeader.appendChild(noteActions);
  
//       const noteContent = document.createElement("div");
//       noteContent.classList.add("note-content");
//       noteContent.innerHTML = "xxxxx<br>xxxxxx<br>xxxxxxxx<br>xxxxxxxxxxxxxx";
  
//       noteContainer.appendChild(noteHeader);
//       noteContainer.appendChild(noteContent);
//       notepadContainer.appendChild(header);
//       notepadContainer.appendChild(noteContainer);
//       this.replacementDiv.appendChild(notepadContainer);

//       //$(".note-content").load(chrome.runtime.getURL("index.html"));
  
//       const testElement = document.createElement("p");
//       const testInput = document.createElement("input");
//       testInput.placeholder = "Test input";
//       testElement.textContent = "TEST";
  
//       this.addElement("testElement", testElement);
//       this.addElement("testInput", testInput);
  
//       this.replacementDiv.appendChild(testElement);
//       this.replacementDiv.appendChild(testInput);
  
//       // Add items from classList to replacementDiv
//       for (const element of this.classList) {
//         let li = document.createElement("li");
//         li.textContent = element;
//         this.addElement(element, li);
//         this.replacementDiv.appendChild(li);
//       }
  
//       testInput.addEventListener("input", (event) => {
//         const inputValue = event.target.value;
//         console.log("Input value:", inputValue);
//       });
      console.log("replacementDivRan");
    }
  
    onClickEvent() {
      if (this.parent.contains(this.wrapper)) {
        //this.parent.replaceChild(this.replacementDiv, this.wrapper);
        this.elementPreparation(); // Call elementPreparation after replacement
      }
    }
  
    // Function which will be ran in createAndReadyMenuIcon to ensure that everything is being called properly
    onMenuClickEvent() {
      if (this.parent.contains(wrapper)) {
        //this.parent.replaceChild(this.replacementDiv, this.wrapper);
        this.elementPreparation();
      }
    }
  
    // Main function sort of -- it will create the menu icon which will then propagate all of the other items, also contains the logic for the icons styling
    createAndReadyMenuIcon() {
      const ul = document.getElementById("menu");
      const secondMenuItem = ul.children[1];
      // Clone the li element
      var clone = secondMenuItem.cloneNode(true);
      clone.id = "li-menu-notes";
      // Create Notes Icon
      const img = document.createElement("img");
      var imgURL = chrome.runtime.getURL("assets/notepadicon.blue.svg");
      img.src = imgURL;
      const div = clone.getElementsByClassName("menu-item-icon-container");
      div[0].innerHTML = "";
      div[0].appendChild(img);
  
      // Update tooltip text
      const tooltip = clone.getElementsByClassName("menu-item__text");
      tooltip[0].innerHTML = " Notes ";
  
      // This removes content from the page if the note icon is clicked and propagates with replacement info
      clone.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.onMenuClickEvent(); // function call which will actually replace HTML
        img.src = chrome.runtime.getURL("assets/notepadicon.white.svg");
        clone.setAttribute("aria-current", "page");
        clone.className =
          "menu-item ic-app-header__menu-list-item ic-app-header__menu-list-item--active";
        console.log("clicked clone");
  
        ul.querySelectorAll("li").forEach((li) => {
          if (li !== clone) {
            li.removeAttribute("aria-current");
            li.className = "menu-item ic-app-header__menu-list-item";
            console.log("reset non clone");
          }
        });
        history.pushState(null, null, "/notes");
      };
  
      // Insert new Notes Icon
      ul.appendChild(clone);
  
      // This is gonna reset the other nodes and set their color back to normal if the li isn't the target
      ul.addEventListener("click", (event) => {
        const target = event.target.closest("li");
        if (target && target !== clone) {
          ul.querySelectorAll("li").forEach((li) => {
            if (li !== target) {
              li.removeAttribute("aria-current");
              li.className = "menu-item ic-app-header__menu-list-item";
            }
          });
          img.src = chrome.runtime.getURL("assets/notepadicon.blue.svg");
        }
      });
    }
  
    // Placeholder for now but will ready textDocument and create it when needed
    createTextDocument() {
      console.log("placeholder");
    }
  
    // Main function which is gonna run createAndReadyMenuIcon
    createAndPropagateDomElements() {
      this.createAndReadyMenuIcon();
    }
  }