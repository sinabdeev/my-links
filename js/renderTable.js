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
            const a = document.createElement('a');
            a.href = cell.url || '#';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = cell.text;
            td.addEventListener('click', (e) => {
                // Не срабатывать, если кликнули непосредственно по ссылке (браузер сам обработает)
                if (e.target.tagName !== 'A') {
                    a.click();
                }
            });
            td.appendChild(a);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.innerHTML = '';
    container.appendChild(table);
}