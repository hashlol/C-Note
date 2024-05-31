(function($) {
    $.fn.generateTabs = function(titles) {
        if (!Array.isArray(titles) || titles.length === 0) {
            console.error('Please provide an array of tab titles.');
            return this;
        }
        // Create the tabs container
        let $tabsContainer = $('<div class="tabs-container"></div>');
        // Create the nav tabs
        let $navTag = $('<nav></nav>');
        let $navTabs = $('<div class="nav nav-tabs" id="nav-tab" role="tablist"></div>');
        let $tabContent = $('<div class="tab-content"></div>');
        titles.forEach((title, index) => {
            // Create the nav item
            let isActive = index === 0 ? 'active' : '';
            let isSelected = index === 0 ? 'true' : 'false';
            let $navItem = $(`<button class="nav-link ${isActive}" id="tab-${index}-tab" data-bs-toggle="tab" data-bs-target="#tab-${index}" type="button" role="tab" aria-controls="tab-${index}" aria-selected="${isSelected}">${title}</button>`);
            // Create the tab pane
            let $tabPane = $(`
 <div class="tab-pane fade ${isActive === 'active' ? 'show active' : ''}" id="tab-${index}" role="tabpanel" aria-labelledby="tab-${index}-tab">
 <p>Content for ${title}</p>
 </div>
            `);
            //add notes content
            $tabPane.notesEditor(title);
            // Append the nav item and tab pane to their respective containers
            $navTabs.append($navItem);
            $tabContent.append($tabPane);
        });
        // Append the nav tabs and tab content to the tabs container
        $navTag.append($navTabs);
        $tabsContainer.append($navTag);
        $tabsContainer.append($tabContent);
        // Append the tabs container to the element the plugin was called on
        this.append($tabsContainer);
        return this;
    };
 }(jQuery));