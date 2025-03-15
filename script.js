const container = document.getElementById('container');

container.style.width = '500px';
container.style.margin = 'auto';
    
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const powerOnButton = document.getElementById('turnOn');
const powerOffButton = document.getElementById('turnOff');

let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let isCalculatorOn = true;

function updateDisplay(value) {
    if (isCalculatorOn) {
        display.value = value;
    } else {
        display.value = '';
    }
}
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isCalculatorOn) return;
        
        const value = button.getAttribute('data-value'); 
        
        event.preventDefault();
        if (value === 'AC') {
            currentInput = '';
            operator = '';
            firstOperand = '';
            secondOperand = '';
            updateDisplay('0');
        } else if (value === 'Del') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
        } else if (value === '=') {
            if (firstOperand && operator && currentInput) {
                secondOperand = currentInput;
                const result = calculate(firstOperand, secondOperand, operator);
                updateDisplay(result);
                currentInput = result.toString();
                operator = '';
                firstOperand = '';
                secondOperand = '';
            }
        } else if (['+', '-', 'x', '/', '%', '^'].includes(value)) {
            if (currentInput) {
                firstOperand = currentInput;
                operator = value;
                currentInput = '';
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});
powerOnButton.addEventListener('click', () => {
    isCalculatorOn = true;
    currentInput = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    updateDisplay('0');
});
powerOffButton.addEventListener('click', () => {
    isCalculatorOn = false;
    updateDisplay('');
});
function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '÷':
            return a / b;
        case '%':
            return a % b;
        case '^':
        return Math.pow(a, b);
        default:
            return 0;
    };
};
