// GLOBAL
let op1, op2, operator = undefined;
let input_second = false;


// DEBUGGING
function logOps(){
    console.log(op1, op2, operator);
}

// CALCUALTOR OPERATORS
function add(a,b) {
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(a,b,operation){

}

function allClear(){
    /*
        Resets operands and operator values to undefined
        AND clears display
    */
    op1 = undefined;
    op2 = undefined;
    operator = undefined;
    clearDisplay();
    logOps();
}

// DISPLAY
function getDisplayText(){
    /*
        Returns text in calculator display
    */
    let display = document.querySelector(".display");
    return display.textContent;
}

function addToDisplay(text){
    /* 
        Adds text of button to display
    */
    let display = document.querySelector(".display");
    display.textContent = getDisplayText() + text;
    
}

function clearDisplay   (){
    /* 
        Clears text content in display
    */
   console.log("clearDisplay");
   let display = document.querySelector(".display");
   display.textContent = "";
}

// OPERANDS
function assignOperand(number){
    /* 
        Assigns number to op1, op2, or neither
    */

    // Assigning operands
    if (op1 == undefined){
        // assign number to op1
        op1 = number;
        input_second = true;
    } else if (op2 == undefined) {
        // assign number to op2
        op2 = number;
        input_second = false;
    } else { // op1 and op2 defined 
        // operate
        // do opearation, get result, clear op2, assign op1
    }
    logOps();
}


// OPERATOR

function assignOperator(oper){
    /*
        Assign operator function to variable depending on oper str
    */

    if (oper == "+"){
        operator = add;
    } else if (oper == "-") {
        operator = subtract;
    } else if (oper == "*") {
        operator = multiply;
    } else if (oper == "/") {
        operator = divide;
    }
}



function main(){
    
    // Clear button event listener
    let clear_button = document.querySelector(".clear");
    clear_button.addEventListener("click", allClear);

    // Number input event listeners (updates display)
    let number_buttons = document.querySelectorAll(".number");
    [...number_buttons].map((btn_element) => {
        btn_element.addEventListener("click", (event)=>{

            // If inputting second operand, clear display first
            if (input_second){
                clearDisplay();
            }

            addToDisplay(event.target.innerText);
        });
    });

    // Operator event listeners
    let operator_buttons = document.querySelectorAll(".operator");
    [...operator_buttons].map((btn_element) => {
        btn_element.addEventListener("click", (event) => {
            assignOperand(Number(getDisplayText()));
            assignOperator(event.target.innerText);
            logOps();
        })
    });
}

main();
