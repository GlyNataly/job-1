function Item(author, comment) {
  this.id = items.length + 1;
  this.author = author;
  this.comment = comment;
  this.date = new Date().toLocaleString("ru", dateFormat);
  this.toString = function() {
    return "id " + this.numberOfId + " автор " + this.creator + " сообщение " + this.creatorMessage + " дата " + this.date; 
  }
} 

function addItemToTable(item) {
  var line = document.createElement("tr");
  var rowId = document.createElement("td");
  var rowAuthor = document.createElement("td");
  var rowComment = document.createElement("td");
  var rowDate = document.createElement("td");
  
  rowId.innerText = item.id;
  rowAuthor.innerText = item.author;
  rowComment.innerText = item.comment;
  rowDate.innerText = item.date;
  line.appendChild(rowId);
  line.appendChild(rowAuthor);
  line.appendChild(rowComment);
  line.appendChild(rowDate);
  document.querySelector(".table tbody").appendChild(line);  
  document.getElementById("counter").innerText = "Количество: " + items.length ;
}

function validate(el) {
  if(!el.checkValidity()){
    el.reportValidity();
    return false;
  }
  return true;
}

var dateFormat = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric"  
}
var items  = localStorage["items"] ? JSON.parse(localStorage["items"]) : [];

window.addEventListener("load", function() {
  for (var i = 0; i < items.length; i++) {
    addItemToTable(items[i]);
  }
  document.getElementById("add").addEventListener("click", function(){
    $(document.getElementById("addDialog")).modal('show');
  });

  document.getElementById("send").addEventListener("click", function(){  
    var authorEl = document.getElementById("author");
    var commentEl = document.getElementById("comment");

    if(validate(authorEl) && validate(commentEl)) {
      var item = new Item(authorEl.value, commentEl.value);  

      authorEl.value = "";
      commentEl.value = ""
      items.push(item);
      localStorage["items"] = JSON.stringify(items);
      addItemToTable(item);
      $(document.getElementById("addDialog")).modal('hide');
    }
  });
});

