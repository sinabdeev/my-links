/**
 * Активирует вкладку по её ID
 * @param {string} tabId - ID вкладки (например, 'tab0')
 * @param {boolean} updateHash - обновлять ли хеш в URL
 */
function activateTab(tabId, updateHash) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));

    const content = document.getElementById(tabId);
    const button = document.querySelector(`.tab[data-tab-id="${tabId}"]`);

    if (content) content.classList.add('active');
    if (button) button.classList.add('active');

    localStorage.setItem('activeTab', tabId);
    if (updateHash) {
        history.replaceState(null, '', '#' + tabId);
    }

    // Загружаем таблицу для активной вкладки
    const tabIndex = parseInt(tabId.replace('tab', '')) + 1;
    loadTableData(tabIndex, content);
}