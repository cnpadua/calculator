/*
    TODO
    - [x] Reformat laylout
    - [x] +/- button
    - [x] % button
    - [x] CSS Button press effect
*/

// GLOBAL
let op1, op2, operator = undefined;
let input_second = false;

// DEBUGGING
function logOps(){
    console.log(op1, op2, operator, `inputSecond:${input_second}`);
}

// CALCUALTOR OPERATORS
function add(a,b) {
    return Number(a)+Number(b);
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

// FORMAT BUTTONS

function plusMinus(number){
    /*
        Change current number in display to positive or negative number 
    */
    if (number > 0){
        number = Number("-" + String(number));
    } else {
        number = number * -1;
    }

    clearDisplay();
    addToDisplay(number);

    // Update ops
    if (op1 != undefined){
        op1 = getDisplayText();
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

function simplifyAnswer(answer){
    /*
        Simplifies floating point numbers to be max length 16
    */
    if (!Number.isInteger(answer)){
        return Number(answer).toPrecision(15);
    } else {
        return answer;
    }
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
        let result = simplifyAnswer(operation(a,b));
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
    console.log(`Number: ${number}`);
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

    // Format Event Listeners
    let plus_minus = document.querySelector(".plusMinus");
    plus_minus.addEventListener("click", () => {
        let displayText = getDisplayText();

        if (displayText == "0"){
            clearDisplay();    
            addToDisplay("-");
        } else if (displayText == "-"){
            clearDisplay();
            addToDisplay("0");
        } else {
            plusMinus(Number(getDisplayText()));
        }

    });
    
    let percent = document.querySelector(".percent");
    percent.addEventListener("click", () => {
        let number = Number(getDisplayText());
        number = number * .01;
        clearDisplay();
        addToDisplay(number);
    });
    
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
            let number = event.target.innerText;

            // If inputting second operand, clear display first
            if (input_second){
                clearDisplay();
                input_second = false;
            }

            // If length of display text == 16 don't display
            if (getDisplayText().length != 16){
                
                if (getDisplayText() == "0"){
                    clearDisplay();
                }

                addToDisplay(number);
            }

        });
    });

    // Operator event listeners
    let operator_buttons = document.querySelectorAll(".operator");
    [...operator_buttons].map((btn_element) => {
        btn_element.addEventListener("click", (event) => {
            
            if (op1 == undefined){
                assignOperand(Number(getDisplayText()));   
            } else if (input_second){
                //
                console.log("=============");
            } else if (op1 != undefined && operator != undefined){
                assignOperand(Number(getDisplayText()));
            }

            // Check for valid ops before assigning new operator
            if (isValidOps()){
                operate(op1, op2, operator);
            }

            assignOperator(event.target.innerText);
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

    // Button press CSS

        // operators/orange
    [...operator_buttons].map((btn_element) => {
        btn_element.addEventListener("mousedown", () => {
            btn_element.style["background-color"] = "rgb(204, 138, 16)";
        });    

        btn_element.addEventListener("mouseup", () => {
            btn_element.style["background-color"] = "rgb(248, 168, 20)"
        });
    });

        // number,point/dark grey
    [...number_buttons].concat(point_button).map((btn_element) => {
        btn_element.addEventListener("mousedown", () => {
            console.log("CRYING SCREAMING VOMITTING");
            btn_element.style["background-color"] = "rgb(109, 109, 109)";
        });

        btn_element.addEventListener("mouseup", () => {
            console.log("CRYING SCREAMING VOMITTING");
            btn_element.style["background-color"] = "rgb(141, 141, 141)";
        });
    })

    

        // AC,format/lightgrey
    let format_buttons = document.querySelectorAll(".format");
    [...format_buttons].map((btn_element) => {
        btn_element.addEventListener("mousedown", () => {
            console.log("CRYING SCREAMING VOMITTING");
            btn_element.style["background-color"] = "rgb(136, 136, 136)";
        });    
    
        btn_element.addEventListener("mouseup", () => {
            console.log("CRYING SCREAMING VOMITTING");
            btn_element.style["background-color"] = "rgb(192, 192, 192)";
        });
    });



}

main();
