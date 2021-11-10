const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];


function getUserInput () {
    return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription);
}

function writeToLog(operationIdentifier, prevResult, operationNumber, newResult){
    const logEntry = {
        operation: operationIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

function calculateResult(calculationType) {
    if(
        calculationType !== 'Add'
         && calculationType !== 'Subtract'
         && calculationType !== 'Multiply'
         && calculationType !== 'Divide'
    ) {
        return;
      }

    
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    let mathOperator;
    if (calculationType === 'Add') {
        currentResult += enteredNumber;
        mathOperator = '+';
    } else if (calculationType === 'Subtract') {
        currentResult -= enteredNumber;
        mathOperator='-';
    } else if (calculationType === 'Multiply') {
        currentResult -= enteredNumber;
        mathOperator='*';
    } else {
        currentResult -= enteredNumber;
        mathOperator='/';
    }
    
    createAndWriteOutput(mathOperator, initialResult, enteredNumber);
    writeToLog('Add', initialResult, enteredNumber, currentResult);
}


addBtn.addEventListener('click', calculateResult.bind(this, 'Add'));
subtractBtn.addEventListener('click', calculateResult.bind(this, 'Subtract'));
multiplyBtn.addEventListener('click', calculateResult.bind(this, 'Multiply'));
divideBtn.addEventListener('click', calculateResult.bind(this, 'Divide'));

