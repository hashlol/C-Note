// console.log("This prints to the console of the page (injected only if the page url matched)");
class DOMElements {
  classList = new Set();

  createMenu() {
    // Get the li element to clone
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

    // This removes content from the page if the notes tab is clicked
    clone.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById("wrapper").classList.add("hidden"); // to remove this and next 3 lines once page is built properly
      document.getElementById("content").classList.add("hidden");
      document.getElementById("content").classList.add("hidden");
      document.getElementById("wrapper").classList.remove("active-tab");
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
      history.pushState(null, null, '/notes');
    };

    // Insert new Notes Icon
    ul.appendChild(clone);

    // This is gonna reset the other nodes and set their color back to normal if the li isnt the target
    ul.addEventListener("click", (event) => {
      const target = event.target;
      if (target && target !== clone) {
        ul.querySelectorAll("li").forEach((li) => {
          if (li !== target) {
            li.removeAttribute("aria-current");
            li.className = "menu-item ic-app-header__menu-list-item";
          }
        });
      }
      img.src = chrome.runtime.getURL("assets/notepadicon.blue.svg");
    });
  }
}

class ClassNameApiCall {
  constructor() {
    this.cookieNames = [
      "_hp2_props.3001039959",
      "_hp2_id.3001039959",
      "_ga",
      "_ga_00FKZHDS5F",
      "log_session_id",
      "_legacy_normandy_session",
      "canvas_session",
      "_csrf_token",
    ];
    this.concatenatedCookies = this.cookieNames
      .map((name) => `${name}=${this.getCookieByName(name)}`)
      .filter(Boolean)
      .join("; ");
  }

  // Function to fetch class data, will use to place class names within class's courseList set
  async fetchDataWithCookie(cookie) {
    const headers = {
      Accept: "application/json+canvas-string-ids, application/json",
      "Accept-Language": "en-US,en;q=0.9",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      Cookie: cookie,
    };

    try {
      const response = await fetch(
        "https://fiu.instructure.com/api/v1/dashboard/dashboard_cards",
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Network error" + response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  getCookieByName(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  cleanData(dirtyData) {
    let resultArray = [];
    for (let i = 0; i < dirtyData.length; i++) {
      let longNameParts = dirtyData[i].longName.split(" ");
      resultArray.push(longNameParts[0]);
    }
    return resultArray;
  }
}

class TextDocument {
  constructor(title, course) {
    this.title = title;
    this.course = course;
    this.lastEdited = this.formatDate(new Date());
    this.textData = " ";
  }

  formatDate(date) {
    const padZero = (num) => (num < 10 ? "0" + num : num);

    let month = padZero(date.getMonth() + 1);
    let day = padZero(date.getDate());
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = padZero(date.getMinutes());
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  }
}

class UserData {
  constructor() {
    this.textDocuments = [];
  }
}

class Main {
  constructor() {
    this.mainInstance = new DOMElements();
    this.classApiInstance = new ClassNameApiCall();
  }

  async classLoad() {
    let dirtyData = await this.classApiInstance.fetchDataWithCookie(
      this.classApiInstance.concatenatedCookies
    );
    this.mainInstance.classList = this.classApiInstance.cleanData(dirtyData);
  }

  mainEnsemble() {
    this.mainInstance.createMenu();
    this.classLoad();
  }
}

const runTime = new Main();
runTime.mainEnsemble();
