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


function main(){
    
    let op1, op2, operator;
    let clear_button = document.querySelector(".clear");
    clear_button.addEventListener("click", clear);

}

main();
