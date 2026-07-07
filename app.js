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

    // Клавиатурная навигация: Shift + ArrowRight/ArrowLeft
    document.addEventListener('keydown', (e) => {
        if (!e.shiftKey) return;
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        
        e.preventDefault();
        
        const activeTab = document.querySelector('.tab.active');
        if (!activeTab) return;
        
        const currentId = activeTab.dataset.tabId;
        const currentIndex = parseInt(currentId.replace('tab', ''));
        const maxIndex = tabs.length - 1;
        
        let newIndex;
        if (e.key === 'ArrowRight') {
            newIndex = Math.min(currentIndex + 1, maxIndex);
        } else {
            newIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (newIndex !== currentIndex) {
            activateTab(`tab${newIndex}`, true);
        }
    });

    // Инициализация тултипа с задержкой
    initTooltip();

    // Кнопка сброса всех счетчиков
    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-counters-btn';
    resetBtn.title = 'Сбросить все счетчики';
    resetBtn.textContent = '🔄';
    resetBtn.addEventListener('click', () => {
        if (confirm('Сбросить все счетчики переходов?')) {
            resetAllClickCounters();
            updateAllCounterDisplays();
        }
    });
    document.body.appendChild(resetBtn);
})();