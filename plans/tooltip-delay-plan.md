# План: Тултип с задержкой 1 секунда

## Текущая реализация

Сейчас тултип реализован через CSS-псевдоэлементы [`::after`](styles.css:138) и [`::before`](styles.css:158) в [`styles.css`](styles.css:137):
- Содержимое берётся из атрибута `data-url` ячейки
- Появляется мгновенно при наведении (`transition: opacity 0.15s`)
- Исчезает сразу при уходе курсора

## Проблема

Мгновенный показ тултипа может быть навязчивым при быстром перемещении курсора по ячейкам.

## Решение

Добавить задержку в 1 секунду перед показом тултипа с возможностью отмены, если курсор убран до истечения задержки.

## Шаги реализации

### 1. Удалить CSS-реализацию тултипа

Убрать из [`styles.css`](styles.css):
- Псевдоэлемент `::after` (строки 138-155) — содержимое тултипа
- Псевдоэлемент `::before` (строки 158-170) — стрелочка тултипа
- Правило `:hover::after, :hover::before` (строки 173-176) — показ при наведении

### 2. Создать JavaScript модуль для тултипа

Создать файл [`js/tooltip.js`](js/tooltip.js) с функцией `initTooltip()`:

```javascript
function initTooltip() {
    let tooltipElement = null;
    let showTimeout = null;
    const DELAY_MS = 1000;

    // Создать DOM-элемент тултипа
    function createTooltip() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        document.body.appendChild(tooltipElement);
    }

    // Показать тултип
    function show(text, x, y) {
        if (!tooltipElement) createTooltip();
        tooltipElement.textContent = text;
        tooltipElement.style.left = x + 'px';
        tooltipElement.style.top = y + 'px';
        tooltipElement.classList.add('visible');
    }

    // Скрыть тултип
    function hide() {
        if (tooltipElement) {
            tooltipElement.classList.remove('visible');
        }
    }

    // Обработчик наведения на ячейку
    document.addEventListener('mouseenter', (e) => {
        const td = e.target.closest('td[data-url]');
        if (!td || !td.dataset.url) return;

        // Отменить предыдущий таймер
        if (showTimeout) clearTimeout(showTimeout);

        // Получить координаты ячейки
        const rect = td.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top - 8;

        // Установить таймер показа
        showTimeout = setTimeout(() => {
            show(td.dataset.url, x, y);
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
```

### 3. Добавить стили для тултипа

Добавить в [`styles.css`](styles.css):

```css
/* Тултип с URL (JavaScript-реализация с задержкой) */
.tooltip {
    position: fixed;
    transform: translateX(-50%) translateY(-100%);
    background: var(--dracula-bg);
    color: var(--dracula-fg);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.tooltip.visible {
    opacity: 1;
}

/* Стрелочка тултипа */
.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--dracula-bg);
}
```

### 4. Подключить модуль в index.html

Добавить в [`index.html`](index.html) перед закрывающим `</body>`:

```html
<script src="js/tooltip.js"></script>
<script>
    initTooltip();
</script>
```

## Итоговая структура

```
my-links/
├── js/
│   ├── tooltip.js          ← новый файл
│   ├── renderTable.js
│   └── ...
├── styles.css              ← обновлённые стили
└── index.html              ← подключение tooltip.js
```

## Поведение

1. Пользователь наводит курсор на ячейку с URL
2. Запускается таймер на 1000мс
3. Если курсор остаётся на ячейке — показывается тултип с URL
4. Если курсор убран до истечения 1000мс — таймер отменяется, тултип не показывается
5. При уходе курсора с ячейки — тултип скрывается
