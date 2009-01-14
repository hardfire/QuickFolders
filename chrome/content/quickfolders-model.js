QuickFolders.Model = {
    selectedFolders: [],

    addFolder: function(uri, categoryName) {
        if(!this.getFolderEntry(uri)) {
            this.selectedFolders.push({
                uri: uri,
                name: '',
                category: categoryName
            });

            this.update();
        }
        else {
            alert("Folder is already bookmarked");
        }
    } ,

    getFolderEntry: function(uri) {
        for(var i = 0; i < this.selectedFolders.length; i++) {
            if(this.selectedFolders[i].uri == uri) {
                return this.selectedFolders[i];
            }
        }

        return false;
    } ,

    removeFolder: function(uri) {
        for(var i = 0; i < this.selectedFolders.length; i++) {
            if(this.selectedFolders[i].uri == uri) {
                this.selectedFolders.splice(i,1);
            }
        }

        this.update();
    } ,

    renameFolder: function(uri, name) {
        var entry;

        if((entry = this.getFolderEntry(uri))) {
            entry.name = name;
            this.update();
        }
    } ,

    update: function() {
        QuickFolders.Interface.updateFolders();
        QuickFolders.Preferences.setFolderEntries(this.selectedFolders);
    } ,

    setFolderCategory: function(uri, name) {
        var entry;

        if((entry = this.getFolderEntry(uri))) {
            entry.category = name;
            this.update();
        }
    } ,

    getCategories: function() {
        var categories = []

        for(var i = 0; i < this.selectedFolders.length; i++) {
            var category = this.selectedFolders[i].category;

            if(category && category != "") {
                if(categories.indexOf(category) == -1) {
                    categories.push(category);
                }
            }
        }

        return categories;
    } ,

    isValidCategory: function(category) {
        return category == "__ALL" ||category == "__UNCATEGORIZED" || this.getCategories().indexOf(category) != -1;
    }
}