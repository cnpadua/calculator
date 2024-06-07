// GLOBAL
let op1, op2, operator = null;

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

function clear(){
    /* 
        Clears text content in display
    */
   console.log("clear");
   let display = document.querySelector(".display");
   display.textContent = "";
}

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
    console.log("addToDisplay()");
    let display = document.querySelector(".display");
    display.textContent = getDisplayText() + text;
    
}

function assignOperand(){
    /* 

    */
}



function main(){
    
    // Clear button event listener
    let clear_button = document.querySelector(".clear");
    clear_button.addEventListener("click", clear);

    // Number input event listeners (updates display)
    let number_buttons = document.querySelectorAll(".number");
    [...number_buttons].map((btn_element) => 
        btn_element.addEventListener("click", (event)=>{
            addToDisplay(event.target.innerText);
    }));

    // Operator event listeners
    let opearator_buttons = document.querySelectorAll(".operator");
    [...opearator_buttons].map((btn_element) => {
        btn_element.addEventListener("click", (event) => {
            clear();
            assignOperand(getDisplayText());
            logOps();
        })
    });
    
    /*
        Rubber Ducking
        --------------

        - AC resets
        - When OPERATOR is FIRST pressed, save number in display
        - Input second number
        - Assigning operands
            if op1 null
                assign op1
            else 
                assign op2
                calculate result
                display result
        
        
    
    */
}

main();
