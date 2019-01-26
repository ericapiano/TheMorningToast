let xmlrequest = new XMLHttpRequest();
let blindDiv = document.getElementById("blinds");

xmlrequest.onreadystatechange = () => {
  let results = null;
  if (xmlrequest.readyState === 4 && xmlrequest.status === 200) {
    results = JSON.parse(xmlrequest.responseText);
    console.log(results);

    results.forEach(element => {
      var itemDiv = document.createElement("div");
      var itemTitle = document.createElement("h2");
      var itemBody = document.createElement("p");

      itemTitle.textContent = element.title;
      itemBody.textContent = element.body;

      itemDiv.appendChild(itemTitle).appendChild(itemBody);

      blindDiv.appendChild(itemDiv);
    });
  }
};
xmlrequest.open("GET", "/blinds", true);
xmlrequest.send();
