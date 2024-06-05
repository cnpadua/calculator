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

function addToDisplay(text){
    /* 
        Adds text of button to display
    */
    console.log("addToDisplay()");
    let display = document.querySelector(".display");
    let display_text = display.textContent;
    display.textContent = display_text + text;
    
}


function main(){
    
    let op1, op2, operator;

    // Clear button event listener
    let clear_button = document.querySelector(".clear");
    clear_button.addEventListener("click", clear);

    // Number input event listener (updates display)
    let number_buttons = document.querySelectorAll(".number");
    [...number_buttons].map((btn_element) => 
        btn_element.addEventListener("click", (event)=>{
            addToDisplay(event.target.innerText);
    }));
    
}

main();
