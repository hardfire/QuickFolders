const QF_CC = Components.classes;
const QF_CI = Components.interfaces;

function QF_getAddon(aId) {
	var em = QF_CC["@mozilla.org/extensions/manager;1"]
       .getService(QF_CI.nsIExtensionManager);
  return em.getItemForID(aId);
}

function QF_getMyVersion() {
  return QF_getAddon("quickfolders@curious.be").version; 
}

var QuickFoldersOptions = {
    accept: function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
        observerService.notifyObservers(null, "quickfolders-options-saved", null);
    } ,
    load : function() {
	    var version=QF_getMyVersion();
		if (version=="") version='version?';
	    document.getElementById("qf-options-header-description").setAttribute("value", version);
	    // initialize colorpickers
	    try {
		    document.getElementById("activetab-colorpicker").color=this.getElementStyle('.toolbar-flat toolbarbutton.selected-folder', 'background-color');
		    document.getElementById("hover-colorpicker").color=this.getElementStyle('.toolbar-flat toolbarbutton:hover', 'background-color');
		    document.getElementById("toolbar-colorpicker").color=this.getElementStyle('.toolbar', 'background-color');
	    }
	    catch(e) { Quickfolders.Util.logToConsole("Quickfolders:" + e); };
	    
    }
}


