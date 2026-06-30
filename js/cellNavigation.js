/**
 * Модуль навигации по ячейкам таблицы стрелками
 * Навигация: ←→↑↓, пропуск пустых ячеек (с пустым url), Enter — открыть ссылку
 */
(function() {
    // Состояние: текущая активная ячейка
    let currentRow = -1;
    let currentCol = -1;
    let activeCell = null;
    let lastActiveTabId = null;

    /**
     * Проверить, изменилась ли активная вкладка, и сбросить состояние если да
     */
    function checkTabChange() {
        const activeTab = document.querySelector('.tab.active');
        const currentTabId = activeTab ? activeTab.dataset.tabId : null;
        
        if (currentTabId !== lastActiveTabId) {
            // Вкладка изменилась — сбрасываем состояние навигации
            currentRow = -1;
            currentCol = -1;
            clearActive();
            activeCell = null;
            lastActiveTabId = currentTabId;
        }
    }

    /**
     * Получить таблицу из активной вкладки
     */
    function getActiveTable() {
        const activeContent = document.querySelector('.tab-content.active');
        if (!activeContent) return null;
        return activeContent.querySelector('.data-table');
    }

    /**
     * Проверить, имеет ли ячейка ссылку (не пустая)
     */
    function hasUrl(td) {
        return td && td.dataset.hasUrl === 'true';
    }

    /**
     * Снять выделение с текущей ячейки
     */
    function clearActive() {
        if (activeCell) {
            activeCell.classList.remove('cell-active');
        }
    }

    /**
     * Установить выделение на ячейку
     */
    function setActive(td, row, col) {
        clearActive();
        td.classList.add('cell-active');
        activeCell = td;
        currentRow = row;
        currentCol = col;
    }

    /**
     * Найти первую непустую ячейку в таблице
     */
    function findFirstCell(table) {
        const rows = table.querySelectorAll('tr');
        for (let r = 0; r < rows.length; r++) {
            const cells = rows[r].querySelectorAll('td');
            for (let c = 0; c < cells.length; c++) {
                if (hasUrl(cells[c])) {
                    return { td: cells[c], row: r, col: c };
                }
            }
        }
        return null;
    }

    /**
     * Найти следующую непустую ячейку в направлении
     * @param {HTMLTableElement} table
     * @param {string} direction - 'left' | 'right' | 'up' | 'down'
     * @returns {Object|null} - { td, row, col } или null если достигнут край
     */
    function findNextCell(table, direction) {
        const rows = table.querySelectorAll('tr');
        const rowCount = rows.length;
        if (rowCount === 0) return null;

        const colCount = rows[0].querySelectorAll('td').length;
        let r = currentRow;
        let c = currentCol;

        if (direction === 'right') {
            // Двигаемся вправо по текущей строке
            for (let nc = c + 1; nc < colCount; nc++) {
                const td = rows[r].querySelectorAll('td')[nc];
                if (hasUrl(td)) return { td, row: r, col: nc };
            }
            return null; // Достигнут правый край
        }

        if (direction === 'left') {
            // Двигаемся влево по текущей строке
            for (let nc = c - 1; nc >= 0; nc--) {
                const td = rows[r].querySelectorAll('td')[nc];
                if (hasUrl(td)) return { td, row: r, col: nc };
            }
            return null; // Достигнут левый край
        }

        if (direction === 'down') {
            // Двигаемся вниз по текущей колонке
            for (let nr = r + 1; nr < rowCount; nr++) {
                const td = rows[nr].querySelectorAll('td')[c];
                if (hasUrl(td)) return { td, row: nr, col: c };
            }
            return null; // Достигнут нижний край
        }

        if (direction === 'up') {
            // Двигаемся вверх по текущей колонке
            for (let nr = r - 1; nr >= 0; nr--) {
                const td = rows[nr].querySelectorAll('td')[c];
                if (hasUrl(td)) return { td, row: nr, col: c };
            }
            return null; // Достигнут верхний край
        }

        return null;
    }

    /**
     * Инициализировать навигацию — выделить первую ячейку
     */
    function initNavigation() {
        const table = getActiveTable();
        if (!table) return;

        const first = findFirstCell(table);
        if (first) {
            setActive(first.td, first.row, first.col);
        }
    }

    /**
     * Обработчик клавиш для навигации
     */
    document.addEventListener('keydown', (e) => {
        // Shift + Arrow — навигация по вкладкам (обрабатывается в app.js)
        if (e.shiftKey) return;

        const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const isArrow = arrows.includes(e.key);
        const isEnter = e.key === 'Enter';

        if (!isArrow && !isEnter) return;

        // Проверяем, не изменилась ли вкладка
        checkTabChange();

        const table = getActiveTable();
        if (!table) return;

        // Если ещё не было навигации — инициализировать
        if (currentRow === -1 || currentCol === -1 || !activeCell) {
            initNavigation();
        }

        if (isArrow) {
            e.preventDefault();
            const directionMap = {
                'ArrowRight': 'right',
                'ArrowLeft': 'left',
                'ArrowDown': 'down',
                'ArrowUp': 'up'
            };
            const direction = directionMap[e.key];
            const next = findNextCell(table, direction);
            if (next) {
                setActive(next.td, next.row, next.col);
            }
            // Если next === null, остаёмся на месте (достигнут край)
        }

        if (isEnter && activeCell) {
            e.preventDefault();
            const link = activeCell.querySelector('a');
            if (link) {
                link.click();
            }
        }
    });
})();
