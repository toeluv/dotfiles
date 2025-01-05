# **Шпаргалка по горячим клавишам**

Этот документ содержит шпаргалку по горячим клавишам для **i3wm**, **Kitty**, **VIM** и **IDEA**. Используйте его для быстрого доступа к командам и повышения продуктивности.

---

## **Содержание**
1. [i3wm](#i3wm)
2. [Kitty](#kitty)
3. [VIM](#vim)
   - [Навигация](#навигация-vim)
   - [Вставка](#вставка-vim)
   - [Удаление](#удаление-vim)
   - [Копирование](#копирование-vim)
   - [Регистры](#регистры-vim)
   - [Замена текста](#замена-текста-vim)
   - [Поиск](#поиск-vim)
   - [Visual Mode](#visual-mode-vim)
4. [IDEA](#idea)
   - [VIM](#vim-idea)
   - [NerdTree](#nerdtree-idea)
   - [Общие команды](#общие-команды-idea)

---

## **i3wm**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `Ctrl + 1, 2, 3, 4`       | Навигация между рабочими столами             |
| `Ctrl + Shift + 1, 2, 3, 4` | Переместить окно на другой рабочий стол      |
| `Ctrl + Z`                | Открыть меню                                 |
| `Cmd + Q`                 | Закрыть окно                                 |
| `Control + HJKL`          | Фокус на окне (влево, вниз, вверх, вправо)   |
| `Control + Shift + HJKL`  | Перемещение окна (влево, вниз, вверх, вправо)|

[⬆️ Наверх](#содержание)

---

## **Kitty**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `Cmd + Enter`             | Новое окно                                   |
| `Cmd + Shift + Enter`     | Закрыть окно                                 |
| `Cmd + Shift + [ ]`       | Навигация между вкладками                    |

[⬆️ Наверх](#содержание)

---

## **VIM**

### **Навигация VIM**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `Shift + 4 ($)`           | Конец строки                                 |
| `0`                       | Начало строки                                |
| `Shift -`                 | Первый элемент строки                        |
| `-`                       | Предыдущая строка                            |
| `Shift +`                 | Следующая строка                             |
| `f…, t (;-next)`          | Найти в строке первый символ / назад         |
| `Shift + (, [, ]`         | Навигация между блоками                      |
| `Shift + 5 (%)`           | Навигация по открытым/закрытым тегам         |
| `[ + {`                   | Перейти к ближайшей скобке                   |

### **Вставка VIM**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `i`                       | Вставить до курсора                          |
| `a`                       | Вставить после курсора                       |
| `I`                       | Вставить в начале строки                     |
| `A`                       | Вставить в конце строки                      |
| `o / O`                   | Вставить в новой строке после/перед текущей  |

### **Удаление VIM**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `d + count + (motion)`    | Удалить количество + операция                |
| `c + count + (motion)`    | Удалить + количество + операция + режим вставки |
| `d + a/i + motion/symbol` | Удалить внутри/снаружи символа, движения     |

### **Копирование VIM**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `p / P`                   | Вставить (выше текущей строки)               |
| `yy`                      | Копировать строку                            |
| `yw, yb, yi"`             | Копировать + действие (слово, блок, в кавычках) |

### **Регистры VIM**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `‘’1`                     | В первый регистр / из первого регистра       |

### **Замена текста VIM**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `r, Shift + R`            | Заменить символ / заменить режим             |

### **Поиск VIM**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `*`                       | Поиск слова под курсором (подсветка всех)    |
| `/`                       | Поиск по тексту                              |
| `n, N`                    | Следующий / предыдущий результат поиска      |

### **Visual Mode VIM**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `Shift + V`               | Выделить строку                              |
| `y`                       | Копировать выделенное                        |
| `Shift + U`               | Преобразовать в верхний регистр              |
| `:m +10`                  | Переместить на 10 строк вверх                |
| `qq`                      | Запись макроса в регистр `q`                 |
| `@q`                      | Применить макрос из регистра `q`             |

[⬆️ Наверх](#содержание)

---

## **IDEA**

### **VIM IDEA**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `Leader (Пробел)`         | Лидер-клавиша                                |
| `Alt (Option) + N, P`     | Следующее / предыдущее окно                  |
| `Leader + S`              | Вертикальное разделение                      |
| `Leader + U`              | Отменить разделение                          |
| `Alt + HJKL`              | Навигация между окнами                       |

### **NerdTree IDEA**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `Leader + X`              | Открыть NerdTree                             |
| `Q`                       | Закрыть NerdTree                             |
| `G_`                      | Оставить курсор в дереве                     |

### **Общие команды IDEA**
| Комбинация клавиш         | Описание                                      |
|---------------------------|-----------------------------------------------|
| `Ctrl + C`                | Создать класс                                |
| `Opt + Cmd + L`           | Сортировка                                   |
| `Shift + F6`              | Переименовать                                |
| `Opt + R`                 | Запуск                                       |
| `Opt + Q`                 | Отладка                                      |
| `iter`                    | Итерация по массиву                          |
| `Cmd + Shift + S`         | Обернуть в блок                              |
| `Cmd + Shift + T`         | Создать тест                                 |
| `Ctrl + O`                | Переопределить метод                         |
| `Ctrl + I`                | Реализовать метод                            |
| `Ctrl + T`                | Рефакторинг                                  |
| `Cmd -`                   | Скрыть                                       |
| `Cmd +`                   | Раскрыть                                     |
| `Cmd + B`                 | Посмотреть параметры метода                  |
| `fori`                    | Генерация цикла `for`                        |
| `Cmd + P`                 | Посмотреть параметры метода                  |
| `Cmd + Shift + P`         | Создать новый пакет                          |
| `Cmd + ⬆️, Cmd + ⬇️`      | Открыть дерево                               |
| `Cmd + /`                 | Сократить код                                |
| `Cmd + Opt + H`           | Присвоить переменной                         |
| `Cmd + F2`                | Закрыть все, кроме текущей вкладки           |
| `Cmd + F3`                | Закрыть все вкладки                          |
| `Ctrl + Shift + P`        | Посмотреть тип переменной                    |
| `Shift + Shift`           | Поиск по всем классам                        |
| `Cmd + E`                 | Недавние файлы                               |
| `Cmd + B`                 | Провалиться в декларацию                     |
| `Cmd + [`                 | Выйти обратно                                |
| `Ctrl + E / Opt + L`      | Рефакторинг / LAMP                           |
| `Opt + Cmd + '`           | Вставить комментарий                         |
| `Cmd + Shift + [ ]`       | Навигация между открытыми вкладками          |
| `Cmd + Arrow Up`          | Перейти в нижнее меню между папками          |
| `Cmd + Arrow Down`        | Перейти к исходному коду                     |

[⬆️ Наверх](#содержание)
