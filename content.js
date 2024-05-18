// console.log("This prints to the console of the page (injected only if the page url matched)");
class Main {
  classList = new Set();

  createMenu() {
    // Get the li element to clone
    const ul = document.getElementById("menu");
    const secondMenuItem = ul.children[1];

    // Clone the li element
    var clone = secondMenuItem.cloneNode(true);
    clone.id = "li-menu-notes";

    //create Notes Icon
    const img = document.createElement("img");
    var imgURL = chrome.runtime.getURL("assets/notepadicon.blue.svg");
    img.src = imgURL;
    const div = clone.getElementsByClassName("menu-item-icon-container");
    div[0].innerHTML = "";
    div[0].appendChild(img);

    //Update tooltip text
    const tooltip = clone.getElementsByClassName("menu-item__text");
    tooltip[0].innerHTML = " Notes ";

    //Insert new Notes Icon
    ul.appendChild(clone);
  }
}

class ApiCall {

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
    this.concatenatedCookies = this.cookieNames.map((name) => `${name}=${this.getCookieByName(name)}`).filter(Boolean).join("; ");
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

const mainInstance = new Main();
const apiInstance = new ApiCall();

async function main() {
  let dirtyData = await apiInstance.fetchDataWithCookie(apiInstance.concatenatedCookies);
  mainInstance.classList = apiInstance.cleanData(dirtyData);
  mainInstance.createMenu();
}

main();
