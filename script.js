// GLOBAL
let op1, op2, operator = undefined;
let input_second = false;
let has_decimal = false;

// DEBUGGING
function logOps(){
    console.log(op1, op2, operator,input_second);
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

function point() {
    if (!has_decimal) {
        addToDisplay(".");
    }
}

// EXECUTING OPERATION
function isValidOps(){
    let result = op1 != undefined && op2 != undefined && operator != undefined;
    console.log("isValidOPs", result);
    return result;
}

function operate(a,b,operation){
    /*
        Execute operation, update operands, and operator vars
        Display result
    */

    let result = operation(a,b);
    clearDisplay();
    addToDisplay(result);
    op1 = result;
    op2 = undefined;
    operator = undefined;
    input_second = true;

    logOps();
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
    addToDisplay(0);
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
    display.textContent = getDisplayText() + String(text);
    
}

function clearDisplay   (){
    /* 
        Clears text content in display
    */
//    console.log("clearDisplay");  
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

    // Point button event listener
    let point_button = document.querySelector(".point");
    point_button.addEventListener("click", point);

    // Number input event listeners (updates display)
    let number_buttons = document.querySelectorAll(".number");
    [...number_buttons].map((btn_element) => {
        btn_element.addEventListener("click", (event)=>{

            // If inputting second operand, clear display first
            if (input_second){
                clearDisplay();
                input_second = false;
            }

            if (getDisplayText() == "0"){
                clearDisplay();
            }

            addToDisplay(event.target.innerText);
        });
    });

    // Operator event listeners
    let operator_buttons = document.querySelectorAll(".operator");
    [...operator_buttons].map((btn_element) => {
        btn_element.addEventListener("click", (event) => {

            /* 
                PROBLEM HERE - FOR SECOND OPERATION
                Second operand assigned when we don't want to yet
            */
            
            assignOperand(Number(getDisplayText()));    
            assignOperator(event.target.innerText);
            logOps();
        })
    });

    // Equals event listeners

    let equals_button = document.querySelector(".equals")
    equals_button.addEventListener("click", () => {
        assignOperand(Number(getDisplayText()));
        if (isValidOps()){
            operate(op1, op2, operator);
        }
    });
}

main();
