/**
 * Модуль для работы со счетчиками переходов по ссылкам
 * Данные хранятся в localStorage и сохраняются между перезапусками браузера
 */

const STORAGE_KEY = 'linkClickCounters';

/**
 * Получить все счетчики из localStorage
 * @returns {Object} - объект с ключами-URL и значениями-счетчиками
 */
function getAllCounters() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

/**
 * Сохранить все счетчики в localStorage
 * @param {Object} counters - объект с ключами-URL и значениями-счетчиками
 */
function saveAllCounters(counters) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
}

/**
 * Получить значение счетчика для URL
 * @param {string} url - URL ячейки
 * @returns {number} - количество переходов
 */
function getClickCount(url) {
    if (!url) return 0;
    const counters = getAllCounters();
    return counters[url] || 0;
}

/**
 * Увеличить счетчик для URL
 * @param {string} url - URL ячейки
 */
function incrementClickCount(url) {
    if (!url) return;
    const counters = getAllCounters();
    counters[url] = (counters[url] || 0) + 1;
    saveAllCounters(counters);
}

/**
 * Сбросить все счетчики
 */
function resetAllClickCounters() {
    localStorage.removeItem(STORAGE_KEY);
}

/**
 * Обновить отображение счетчика для ячейки
 * @param {HTMLElement} td - элемент ячейки
 * @param {string} url - URL ячейки
 */
function updateCounterDisplay(td, url) {
    if (!td || !url) return;
    
    const count = getClickCount(url);
    
    // Найти существующий счетчик или создать новый
    let counterEl = td.querySelector('.click-counter');
    
    if (count > 0) {
        if (!counterEl) {
            counterEl = document.createElement('span');
            counterEl.className = 'click-counter';
            td.appendChild(counterEl);
        }
        counterEl.textContent = count;
    } else {
        // Если счетчик 0, удалить элемент если он есть
        if (counterEl) {
            counterEl.remove();
        }
    }
}

/**
 * Обновить отображение всех счетчиков на странице
 */
function updateAllCounterDisplays() {
    const cells = document.querySelectorAll('.data-table td[data-url]');
    cells.forEach(td => {
        const url = td.dataset.url;
        updateCounterDisplay(td, url);
    });
}
