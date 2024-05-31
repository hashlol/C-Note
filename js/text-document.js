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
  