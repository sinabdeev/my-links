const loadedTables = {};

(function() {
    const tabsContainer = document.getElementById('tabs');
    const contentsContainer = document.getElementById('tab-contents');
    
    tabs.forEach((name, index) => {
        const tabId = `tab${index}`;
        
        const button = document.createElement('button');
        button.className = 'tab';
        button.dataset.tabId = tabId;
        button.textContent = name.trim();
        button.onclick = () => activateTab(tabId, true);
        tabsContainer.appendChild(button);
        
        const content = document.createElement('div');
        content.id = tabId;
        content.className = 'tab-content';
        contentsContainer.appendChild(content);
    });

    const savedTab = localStorage.getItem('activeTab');
    const hashTab = location.hash.replace('#', '');
    const initialTab = (hashTab && document.getElementById(hashTab)) 
        ? hashTab 
        : (savedTab && document.getElementById(savedTab)) 
            ? savedTab 
            : 'tab0';
    
    activateTab(initialTab, false);

    window.addEventListener('hashchange', () => {
        const id = location.hash.replace('#', '');
        if (document.getElementById(id)) {
            activateTab(id, true);
        }
    });
})();