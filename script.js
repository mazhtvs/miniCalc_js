// Получаем элементы
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = ''; // Текущий ввод пользователя
let operator = null;   // Оператор (+, -, *, /)
let previousInput = ''; // Предыдущее значение

// Функция для обновления экрана
function updateDisplay(value) {
    display.value = value;
}

// Обрабатываем нажатие кнопки
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            // Очистка
            currentInput = '';
            previousInput = '';
            operator = null;
            updateDisplay('');
        } else if (value === '=') {
            // Вычисление результата
            if (operator && currentInput) {
                previousInput = calculate(previousInput, currentInput, operator);
                updateDisplay(previousInput);
                currentInput = '';
                operator = null;
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Оператор
            if (currentInput) {
                if (previousInput) {
                    previousInput = calculate(previousInput, currentInput, operator);
                } else {
                    previousInput = currentInput;
                }
                currentInput = '';
            }
            operator = value;
            updateDisplay(previousInput);
        } else {
            // Числа и десятичная точка
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Функция для выполнения вычислений
function calculate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+': return (num1 + num2).toString();
        case '-': return (num1 - num2).toString();
        case '*': return (num1 * num2).toString();
        case '/': return num2 !== 0 ? (num1 / num2).toString() : 'Ошибка';
        default: return '';
    }
}