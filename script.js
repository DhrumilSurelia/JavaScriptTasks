// Creating a class Calculator with a constructor
class Calculator {
    constructor(previousTextElement, currentTextElement){
        this.previousTextElement = previousTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // Select an Operation to Perform
    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //Computing the Inputs
    compute() {
        let computation 
        // Converting input Text to float 
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // Check if both the inputs are emmpty or not
        if (isNaN(previous) || isNaN(current)) return
        // Operations done using Switch Case
        switch (this.operation) {
            case '+': 
                computation = previous + current
                break
            case '-': 
                computation = previous - current
                break
            case '*': 
                computation = previous * current
                break
            case '/': 
                computation = previous / current
                break
            case '%':
                computation = previous % current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    // Displaying the current number with integer and/or decimal format
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1] 
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }

    // Updating all the Display with current operations
    updateDisplay() {
        this.currentTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousTextElement.innerText = ''
        }
    }
}

// Declaring constant variables for all the Calculator buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousTextElement = document.querySelector('[data-previous]')
const currentTextElement = document.querySelector('[data-current]')

// Declaring constant variable for Calculator class
const calculator = new Calculator(previousTextElement, currentTextElement)

// Display numbers on the screen when clicked on them
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// Selecting the Operation
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Computation
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// Clearing all the inputs
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
