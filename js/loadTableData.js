/**
 * Загружает данные таблицы по индексу вкладки
 * @param {number} tabIndex - номер таблицы (1-5)
 * @param {HTMLElement} container - контейнер для рендера таблицы
 */
function loadTableData(tabIndex, container) {
    if (loadedTables[tabIndex]) {
        renderTable(container, loadedTables[tabIndex]);
        return;
    }

    container.innerHTML = '<div class="loading">Загрузка...</div>';

    const script = document.createElement('script');
    script.src = `data/table-${tabIndex}.js`;
    script.onload = () => {
        const data = window['table' + tabIndex];
        if (data) {
            loadedTables[tabIndex] = data;
            renderTable(container, data);
        }
    };
    script.onerror = () => {
        container.innerHTML = '<div class="loading">Ошибка загрузки данных</div>';
    };
    document.body.appendChild(script);
}