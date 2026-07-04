/**
 * Модуль тултипа с задержкой показа.
 * Показывает URL ячейки при наведении курсора с задержкой 1 секунда.
 */
function initTooltip() {
    let tooltipElement = null;
    let showTimeout = null;
    const DELAY_MS = 1000;

    /**
     * Создаёт DOM-элемент тултипа и добавляет его в body.
     */
    function createTooltip() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        document.body.appendChild(tooltipElement);
    }

    /**
     * Показывает тултип с текстом в указанной позиции.
     * @param {string} text - текст для отображения
     * @param {number} x - координата X (центр тултипа)
     * @param {number} y - координата Y (низ тултипа)
     */
    function show(text, x, y) {
        if (!tooltipElement) createTooltip();
        tooltipElement.textContent = text;
        tooltipElement.style.left = x + 'px';
        tooltipElement.style.top = y + 'px';
        tooltipElement.classList.add('visible');
    }

    /**
     * Скрывает тултип.
     */
    function hide() {
        if (tooltipElement) {
            tooltipElement.classList.remove('visible');
        }
    }

    // Обработчик наведения на ячейку с URL
    document.addEventListener('mouseenter', (e) => {
        const td = e.target.closest('td[data-url]');
        if (!td || !td.dataset.url) return;

        // Отменить предыдущий таймер
        if (showTimeout) {
            clearTimeout(showTimeout);
            showTimeout = null;
        }

        // Получить координаты ячейки
        const rect = td.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top - 8;

        // Установить таймер показа с задержкой
        showTimeout = setTimeout(() => {
            show(td.dataset.url, x, y);
            showTimeout = null;
        }, DELAY_MS);
    }, true);

    // Обработчик ухода курсора с ячейки
    document.addEventListener('mouseleave', (e) => {
        const td = e.target.closest('td[data-url]');
        if (!td) return;

        // Отменить таймер, если курсор убран до истечения задержки
        if (showTimeout) {
            clearTimeout(showTimeout);
            showTimeout = null;
        }
        hide();
    }, true);
}
