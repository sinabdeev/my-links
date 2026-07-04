# План изменения цветовой схемы на Dracula

## Цель
Заменить текущую светлую цветовую схему на темную палитру Dracula в файле [`styles.css`](../styles.css).

## Новая палитра Dracula

```css
:dracula-root {
  /* Background & Foreground */
  --dracula-bg: #282a36;
  --dracula-fg: #f8f8f2;
  --dracula-comment: #6272a4;
  
  /* UI Colors */
  --dracula-selection: #44475a;
  --dracula-line-highlight: #44475a;
  
  /* Syntax / Accent Colors */
  --dracula-cyan: #8be9fd;
  --dracula-green: #50fa7b;
  --dracula-orange: #ffb86c;
  --dracula-pink: #ff79c6;
  --dracula-purple: #bd93f9;
  --dracula-red: #ff5555;
  --dracula-yellow: #f1fa8c;
}
```

## Маппинг цветов

| Элемент | Текущий цвет | Новый цвет (Dracula) |
|---------|--------------|---------------------|
| `body` background | `#f5f5f5` | `--dracula-bg` (#282a36) |
| `.tab` background | `#4F46E5` | `--dracula-selection` (#44475a) |
| `.tab` color | `#e0e0ff` | `--dracula-fg` (#f8f8f2) |
| `.tab:hover` background | `#6366F1` | `--dracula-purple` (#bd93f9) |
| `.tab:hover` color | `#fff` | `--dracula-fg` (#f8f8f2) |
| `.tab.active` background | `#C0392B` | `--dracula-pink` (#ff79c6) |
| `.tab.active` color | `#fff` | `--dracula-bg` (#282a36) |
| `.tab.active` border-bottom | `#C0392B` | `--dracula-pink` (#ff79c6) |
| `.data-table th, td` background | `#fff` | `--dracula-selection` (#44475a) |
| `.data-table th` background | `#f0f4ff` | `--dracula-bg` (#282a36) |
| `.data-table th` color | `#1a1a2e` | `--dracula-fg` (#f8f8f2) |
| `.data-table td:hover` background | `#f8faff` | `--dracula-line-highlight` (#44475a) |
| `.data-table td.cell-active` outline | `#4F46E5` | `--dracula-cyan` (#8be9fd) |
| `.data-table td.cell-active` background | `#e8eaff` | `--dracula-selection` (#44475a) |
| `.data-table td a` color | `#2563eb` | `--dracula-cyan` (#8be9fd) |
| `.data-table td a:hover` color | `#1d4ed8` | `--dracula-purple` (#bd93f9) |
| `.loading` color | `#999` | `--dracula-comment` (#6272a4) |
| tooltip background | `#1a1a2e` | `--dracula-bg` (#282a36) |
| tooltip color | `#fff` | `--dracula-fg` (#f8f8f2) |
| tooltip arrow border-top | `#1a1a2e` | `--dracula-bg` (#282a36) |
| `box-shadow` rgba | `rgba(0,0,0,0.08)` | `rgba(0,0,0,0.3)` (усиление тени для темной темы) |
| tooltip `box-shadow` | `rgba(0,0,0,0.15)` | `rgba(0,0,0,0.5)` |

## Порядок действий

1. **Добавить CSS-переменные** в начало файла [`styles.css`](../styles.css)
2. **Обновить `body`** - заменить background на `var(--dracula-bg)`
3. **Обновить `.tab`** - заменить background и color
4. **Обновить `.tab:hover`** - заменить background и color
5. **Обновить `.tab.active`** - заменить background, color и border-bottom-color
6. **Обновить `.data-table th, td`** - заменить background
7. **Обновить `.data-table th`** - заменить background и color
8. **Обновить `.data-table td:hover`** - заменить background
9. **Обновить `.data-table td.cell-active`** - заменить outline и background
10. **Обновить `.data-table td a`** - заменить color
11. **Обновить `.data-table td a:hover`** - заменить color
12. **Обновить `.loading`** - заменить color
13. **Обновить tooltip** - заменить background, color и border-top-color
14. **Обновить box-shadow** - усилить тени для темной темы

## Проверка

После внесения изменений:
1. Открыть [`index.html`](../index.html) в браузере
2. Проверить отображение табов (активный, неактивный, hover)
3. Проверить отображение таблицы (ячейки, ссылки, hover)
4. Проверить клавиатурную навигацию (активная ячейка)
5. Проверить тултипы при наведении на ячейки
