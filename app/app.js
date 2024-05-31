class App {
    constructor(container, courseService) {
        this.container = container;
        this.courseService = courseService;
        this.createAndReadyMenuIcon();
        const notesContainer = $('<div id="main-notes" class="ic-Layout-columns"></div>')
            .hide()
            .load(chrome.runtime.getURL("app/index.html"));
        this.container.after(notesContainer);
    }
  
    onMenuClickEvent() {
        $("#main").hide();
        $("#main-notes").show();
        if (!this.loaded) {
            this.loadCourseTabs();
            this.loaded = true;
        }
    }

    loadCourseTabs() {
        this.courseService.getCourses().then(courses => { 
            this.courses = courses; 
            console.log(this.courses);
            $("#notes-tabs").generateTabs(this.courses);
        });
    }
  
    createAndReadyMenuIcon() {
      const ul = document.getElementById("menu");
      const secondMenuItem = ul.children[2];
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
  
  }