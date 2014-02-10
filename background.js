var toggles = [];

chrome.tabs.onUpdated.addListener(function(id, info){
    if(info.status != undefined) toggles[id]=false
    
    chrome.tabs.get(id, function(tab){
        if(tab.pinned) chrome.pageAction.show(id);
        else           chrome.pageAction.hide(id);
        chrome.tabs.sendMessage(id, {pinned: tab.pinned});
    });
});

chrome.pageAction.onClicked.addListener(function(tab){
    if(toggles[tab.id] == undefined) toggles[tab.id] = true;
    else toggles[tab.id] = !toggles[tab.id];
    
    var p;
    if(toggles[tab.id]) p = "action-locked.png";
    else                p = "action-unlock.png";
    
    chrome.pageAction.setIcon({tabId: tab.id, path: p});
    
    chrome.tabs.sendMessage(tab.id, {on: toggles[tab.id]});
});
