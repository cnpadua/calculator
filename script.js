// GLOBAL
let op1, op2, operator = undefined;
let input_second = false;

// DEBUGGING
function logOps(){
    console.log(op1, op2, operator, `inputSecond:${input_second}`);
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
    if (!getDisplayText().includes(".")){
        addToDisplay(".");
    }
}

// EXECUTING OPERATION
function isValidOps(){
    let result = op1 != undefined && op2 != undefined && operator != undefined;
    console.log("= isValidOps =");
    logOps();
    return result;
}

function NO(){
    clearDisplay();
    addToDisplay("NO");
}

function operate(a,b,operation){
    /*
        Execute operation, update operands, and operator vars
        Display result
    */
    console.log("= Before operation =");
    logOps();
    if (op2 == 0 && operation == divide){
        NO();
    } else {
        let result = operation(a,b);
        clearDisplay();
        addToDisplay(result);
        op1 = result;
        op2 = undefined;
        // operator = undefined;
        input_second = true;
    }

    console.log("= After operation =");
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
    input_second = false;
    clearDisplay();
    addToDisplay(0);

    console.log("= All Clear =");
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

    console.log("= Assign Operand =");
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

    console.log("= assignOperator =");
    logOps();
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

            // If length of display text == 16 don't display
            if (getDisplayText().length != 16){
                // If inputting second operand, clear display first
                if (input_second){
                    clearDisplay();
                    input_second = false;
                    // logOps();
                }

                if (getDisplayText() == "0"){
                    clearDisplay();
                }

                addToDisplay(event.target.innerText);
                // logOps();
            }

        });
    });

    // Operator event listeners
    let operator_buttons = document.querySelectorAll(".operator");
    [...operator_buttons].map((btn_element) => {
        btn_element.addEventListener("click", (event) => {
            
            if (op1 == undefined){
                assignOperand(Number(getDisplayText()));   
                // logOps(); 
            } else if (op1 != undefined && operator != undefined){
                assignOperand(Number(getDisplayText()));
                // logOps();
            }

            // Check for valid ops before assigning new operator
            if (isValidOps()){
                operate(op1, op2, operator);
                // logOps();
            }

            assignOperator(event.target.innerText);

            // logOps();
        })
    });

    // Equals event listeners
    let equals_button = document.querySelector(".equals")
    equals_button.addEventListener("click", () => {
        if (op1 == undefined && operator == undefined){
            //
        } else {
            assignOperand(Number(getDisplayText()));
            if (isValidOps()){    
                operate(op1, op2, operator);
            }
        }
        
    });
}

main();
