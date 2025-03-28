    let expression = ''; 
    let currentInput = '';
    let operator = '';
    let isNewInput = false;

    function dataValue(value) {
      if (isNewInput) {
        currentInput = '';
        isNewInput = false;
      }
      currentInput += value;
      document.getElementById('display').value = currentInput;
    }
    function deleteLastValue() {
        const displayInput = document.getElementById('display');
        const expressionField = document.getElementById('expression');
        
        if (expressionField.value !== '') {
            expression = '';
            expressionField.value = '';
        } else {
            currentInput = currentInput.slice(0, -1);
            displayInput.value = currentInput;
        }
    }
    function handleOperator(op) {
      if (currentInput === '') return;

      if (expression !== '') {
        calculate();
      }

      operator = op;
      expression = currentInput + ' ' + operator + ' ';
      document.getElementById('expression').value = expression;
      isNewInput = true;
    }

    function calculate() {
      if (currentInput === '' || expression === '') return;

      expression += currentInput;

      const result = parseAndEvaluate(expression);

      if (result !== null) {
        document.getElementById('expression').value = expression + ' =';
        document.getElementById('display').value = result;
      } else {
        document.getElementById('display').value = 'Error';
      }

      expression = '';
      currentInput = '';
      operator = '';
      isNewInput = false;
    }

      function parseAndEvaluate(expr) {
      const parts = expr.split(' ');
      const firstOperand = parseFloat(parts[0]);
      const op = parts[1]; 
      const secondOperand = parseFloat(parts[2]);

      if (isNaN(firstOperand) || isNaN(secondOperand)) return null;
      if (!['+', '-', 'x', '/'].includes(op)) return null;
      
      if (op === '+') {
        return firstOperand + secondOperand;
      } else if (op === '-') {
        return firstOperand - secondOperand;
      } else if (op === 'x') {
        return firstOperand * secondOperand;
      } else if (op === '/') {
        if (secondOperand === 0) return null;
        return firstOperand / secondOperand;
      }

      return null;
    }
    function changeOp() {
        if (currentInput !== '') {
            if (currentInput.startsWith('-')) {
                currentInput = currentInput.slice(1);
            } else {
                currentInput = '-' + currentInput;
            }
            document.getElementById('display').value = currentInput;
        }
    }

    function clearDisplay() {
      expression = '';
      currentInput = '';
      operator = '';
      isNewInput = false;
      document.getElementById('expression').value = '';
      document.getElementById('display').value = '';
    }