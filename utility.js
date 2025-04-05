// calculator basic functions

const calculator = {
    operations: {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b === 0) {
                throw new Error("Cannot divide by zero");
            }
            return a / b;
        }
    },
    calculate(a, b, operator) {
        // Check if the inputs are numbers
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error("Both inputs must be numbers");
        }
        // Check if the operator is a string
        if (typeof operator !== 'string') {
            throw new Error("Operator must be a string");
        }
        // Check if the operator is valid
        if (!this.operations[operator]) {
            throw new Error(`Operator ${operator} is not supported`);
        }
        return this.operations[operator](a, b);
    }
}

const calculate = (a, b, operator) => {
    try {
        return { result: calculator.calculate(a, b, operator), error: null };
    } catch (e) {
        return { result: null, error: e.message };
    }
};


// get number from btn press
// check if document is ready
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelectorAll('.btn');
    console.log(btn);
    btn.forEach((button) => {
        button.addEventListener('click', () => {
            const value = button.innerText;
            if (!isNaN(value)) {
                // If the value is a number, add it to the input
                if (document.querySelector('#result').value === '0') {
                    document.querySelector('#result').value = value;
                }
                else {
                    document.querySelector('#result').value += value;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                // get the current value
                const currentValue = document.querySelector('#result').value.trim();
                // If the value is an operator, check if the current value is empty
                if (currentValue === '0') {
                    return;
                }
                // If the value is an operator, check if the last character is an operator
                const lastChar = currentValue.trim().split(' ').pop();
                if (['+', '-', '*', '/'].includes(lastChar)) {
                    console.log('lastChar', lastChar);
                    // If the last character is an operator, replace it with the new operator
                    document.querySelector('#result').value = currentValue.trim().slice(0, -lastChar.length -1) + ` ${value} `;
                    return;
                }
                // If the value is an operator, add it to the input
                document.querySelector('#result').value += ` ${value} `;
            } else if (value === '.') {
                // if the current value has a decimal point, return
                const currentValue = document.querySelector('#result').value.split(' ').pop();
                console.log(currentValue);
                if (currentValue.includes('.')) {
                    return;
                }
                document.querySelector('#result').value += value;
            } else if (value === 'C') {
                // If the value is 'C', clear the input
                document.querySelector('#result').value = 0;
            } else if (value === '=') {
                // If the value is '=', calculate the result
                const input = document.querySelector('#result').value;
                const [a, operator, b] = input.split(' ');
                // Check if the input is valid
                if (!a || !b || !operator) {
                    alert('Invalid operation');
                    return;
                }
                const { result, error } = calculate(parseFloat(a), parseFloat(b), operator);
                if (error) {
                    document.querySelector('#result').value = error;
                } else {
                    document.querySelector('#result').value = result;
                    console.log(result);
                }
            }
        });
    });
});