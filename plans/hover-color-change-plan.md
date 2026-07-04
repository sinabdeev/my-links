# План изменения hover-эффектов для ячеек таблицы

## Статус: ✅ Выполнено

## Исходное состояние

В [`styles.css`](styles.css) при наведении на ячейку таблицы (`.data-table td:hover`) менялся только фон на `var(--dracula-line-highlight)`, который визуально не отличался от обычного фона `var(--dracula-selection)`.

## Цель

Изменить стили hover-эффекта для ячеек таблицы, чтобы при наведении курсора:
1. Менялся цвет фона ячейки
2. Менялся цвет текста внутри ячейки (включая ссылки)

## Выполненные изменения в styles.css

### 1. Изменено правило `.data-table td:hover`

**Было:**
```css
.data-table td:hover {
    background: var(--dracula-line-highlight);
}
```

**Стало:**
```css
.data-table td:hover {
    background: var(--dracula-purple);
    color: var(--dracula-bg);
}
```

### 2. Добавлено правило `.data-table td:hover a`

**Новое правило:**
```css
.data-table td:hover a {
    color: var(--dracula-bg);
}
```

Это правило обеспечивает изменение цвета ссылок при наведении на ячейку (даже если курсор не непосредственно над ссылкой).

### 3. Изменено правило `.data-table td a:hover`

**Было:**
```css
.data-table td a:hover {
    color: var(--dracula-purple);
    text-decoration: none;
}
```

**Стало:**
```css
.data-table td a:hover {
    color: var(--dracula-bg);
    text-decoration: none;
}
```

## Результат

При наведении курсора на ячейку таблицы:
- Фон ячейки становится фиолетовым (`#bd93f9`)
- Текст становится темным (`#282a36`)
- Ссылки внутри ячейки также становятся темными (независимо от позиции курсора над ячейкой)
