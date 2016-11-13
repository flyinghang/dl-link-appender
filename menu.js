var menuTitle = "Append Link to Buffer";

var links = "";
var itemCount = 0 ;


function updateClipboard(data){
  var t = document.createTextNode(data);

  document.body.append(t);

  var range = document.createRange();
  range.selectNode(t);
  window.getSelection().addRange(range);

  try {
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy command was ' + msg);  
  }catch (err){
    console.log("copy failed.");
  }


  window.getSelection().removeAllRanges();

  document.body.removeChild(t);

}

// A generic onclick callback function.
function genericOnClick(info, tab) {
  //console.log("the links: " + links);
  //console.log("get url: " + info.linkUrl);
  updateBuffer(info.linkUrl);

  updateClipboard(links);
}


function updateBuffer(copied){
  links = links + "\r\n\r\n"+ copied;
  itemCount++;
  updateMenuTitle(menuTitle + " ("+ itemCount+ ")");
}

function resetBuffer(){
  links = "";
  itemCount = 0 ;
  updateMenuTitle(menuTitle);
}

function updateMenuTitle(newTitle){
  chrome.contextMenus.update(menuId, {"title": newTitle});
}

// Create a parent item and two children.
//var parent = chrome.contextMenus.create({"title": "Link To DL List"});


// Create one test item for each context type.
var menuId = chrome.contextMenus.create({"title": menuTitle, "contexts":["link"],
                                      "onclick": genericOnClick});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.pasted == links)

      console.log(pasted);
      console.log(links);
      console.log('links are pasted, now clear it all');

      resetBuffer();

      sendResponse({dl: "clear buffer OK"});
  });