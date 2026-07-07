/**
 * Рендерит таблицу с данными в указанный контейнер
 * @param {HTMLElement} container - контейнер для таблицы
 * @param {Array} data - массив строк с данными (каждая строка — массив объектов {text, url})
 */
function renderTable(container, data) {
    const table = document.createElement('table');
    table.className = 'data-table';

    // Тело таблицы (10 строк)
    const tbody = document.createElement('tbody');
    data.slice(0, 10).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.style.cursor = 'pointer';
            td.dataset.url = cell.url;
            td.dataset.hasUrl = cell.url ? 'true' : 'false';
            const a = document.createElement('a');
            a.href = cell.url || '#';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = cell.text;
            
            // Единый обработчик клика на ячейке — инкремент счетчика и открытие ссылки
            td.addEventListener('click', (e) => {
                if (cell.url) {
                    incrementClickCount(cell.url);
                    updateCounterDisplay(td, cell.url);
                }
                // Если клик не по ссылке, открываем URL программно
                if (e.target.tagName !== 'A' && cell.url) {
                    window.open(cell.url, '_blank', 'noopener,noreferrer');
                }
            });
            
            td.appendChild(a);
            
            // Отобразить счетчик переходов
            if (cell.url) {
                updateCounterDisplay(td, cell.url);
            }
            
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.innerHTML = '';
    container.appendChild(table);
}