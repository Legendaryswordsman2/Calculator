let resultText = document.querySelector(".totalText");
let accumulatorText = document.querySelector(".accumulatorText");

let accumulator = [];
let currentNumber = '';
let result = 0;


function AddNumber(number) {
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
            result = 0;
            break;
        case '+':
            if(!currentNumber)
                return;

            accumulator.push(currentNumber);
            accumulator.push('+');
            currentNumber = '';
            break;

        case '-':
            if(!currentNumber)
                return;

            accumulator.push(currentNumber);
            accumulator.push('-');
            currentNumber = '';
            break;

        case 'x':
            if(!currentNumber)
                return;

            accumulator.push(currentNumber);
            accumulator.push('x');
            currentNumber = '';
            break;

        case '/':
            if(!currentNumber)
                return;
            
            accumulator.push(currentNumber);
            accumulator.push('/');
            currentNumber = '';
            break;
        default:
            console.error(`Action (${action}) not recognized!`);
            break;
    }
    Refresh();
}

function Refresh() {
    resultText.textContent = currentNumber;
    accumulatorText.textContent = accumulator.join(' ');
}