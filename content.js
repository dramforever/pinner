var pinned = false, on = false;

window.onbeforeunload = function(event){
    if(pinned && on) return "此标签页被固定";
};

window.onunload = function(){
    console.log("unload");
}

chrome.runtime.onMessage.addListener(function(msg){
    if(msg.pinned != undefined) pinned = msg.pinned;
    
    if(msg.on     != undefined) on     = msg.on;
    console.log("pinned = %o", pinned);
});
