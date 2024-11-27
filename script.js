let resultText = document.querySelector(".totalText");
let accumulatorText = document.querySelector(".accumulatorText");

let accumulator = [];
let currentNumber = '';

const numRegex = /^\d/;

formatter = new Intl.NumberFormat('en-us', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
});

Refresh();

function AddNumber(number) {
    if (currentNumber.length >= 12)
        return;

    if (number == 0 && currentNumber == '')
        return;
    else if (number === ".") {
        if (currentNumber.includes('.') || currentNumber == '')
            return;

    }

    currentNumber += number;
    Refresh();
}

function CalculateAction(action) {
    switch (action) {
        case 'C':
            accumulator = [];
            currentNumber = '';
            break;

        case 'CE':
            currentNumber = '';
            break;

        case '=':
            if (currentNumber && !numRegex.test(accumulator[accumulator.length - 1]))
                accumulator.push(currentNumber);
            currentNumber = '';

            tempText = '';

            accumulator.forEach(element => {
                if (numRegex.test(element))
                    tempText += formatter.format(element);
                else {
                    tempText += " " + element + " ";
                }
            });
            
            currentNumber = evaluateExpression(tempText.replace(/,/g, ''));
            currentNumber = currentNumber.toString();
            break;

        case '+':
            if (!currentNumber)
                return;

            accumulator.push(currentNumber);
            accumulator.push('+');
            currentNumber = '';
            break;

        case '-':
            if (!currentNumber)
                return;

            accumulator.push(currentNumber);
            accumulator.push('-');
            currentNumber = '';
            break;

        case 'x':
            if (!currentNumber)
                return;

            accumulator.push(currentNumber);
            accumulator.push('x');
            currentNumber = '';
            break;

        case '/':
            if (!currentNumber)
                return;

            accumulator.push(currentNumber);
            accumulator.push('/');
            currentNumber = '';
            break;

        case '%':
            let percentage = 1;
            if (accumulator[accumulator.length - 2])
                percentage = accumulator[accumulator.length - 2];

            currentNumber = (currentNumber * percentage) / 100;
            console.log(currentNumber);
            currentNumber = currentNumber.toString();
            break;
        default:
            console.error(`Action (${action}) not recognized!`);
            break;
    }
    Refresh();
}

function Refresh() {
    if (currentNumber.endsWith('.')) {
        resultText.textContent = formatter.format(currentNumber) + '.';
    }
    else
        resultText.textContent = formatter.format(currentNumber);


    tempText = '';
    accumulator.forEach(element => {
        if (numRegex.test(element))
            tempText += formatter.format(element);
        else {
            tempText += " " + element + " ";
        }
    });

    accumulatorText.textContent = tempText;
}

function evaluateExpression(expression) {
    // Replace 'x' with '*' for multiplication
    expression = expression.replace(/x/g, '*');
    return eval(expression);
}