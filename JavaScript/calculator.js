//import for the parser libery
//global Variable
let equation = "0";
let ans;
let standart = true;
//main to set all event listener
function main(){
    document.addEventListener("keydown", (event) => {keyboardInput(event)}, false);
    document.getElementById("equation").textContent = equation;
    const numbers = document.getElementsByClassName("number");
    Array.from(numbers).forEach((i)=> {i.addEventListener("click", () => addToEquation(i))});
    const operators = document.getElementsByClassName("mathOperator");
    Array.from(operators).forEach((i) => {i.addEventListener("click", () => addToEquation(i))});
    const solve = document.getElementsByClassName("solve");
    Array.from(solve).forEach((i) => {i.addEventListener("click", () => solveEquation())});

    document.getElementById("extended").addEventListener("click",openEx);
}
//to add Characters to the global:equation
function addToEquation(element){
    if (element.className === "mathOperator") {
        if (!checkLastChar()){
            if (ans !== undefined) {
                equation += "Ans" + element.textContent;
            } else {
                equation += element.textContent;
            }
        }
        document.getElementById("equation").textContent = equation;
    } else {
        removeStartingZero();
        equation += element.textContent;
        document.getElementById("equation").textContent = equation;
    }
}
//to set the events on the keys on the keybord for the calculator
function keyboardInput(event){
    const keyInput = event.key;
    console.log(keyInput);
    if((Number(keyInput) >= 0 && Number(keyInput) <= 9) && keyInput !== 'Backspace') {
        removeStartingZero();
        equation += Number(keyInput);
        if (!equation.includes("Ans")){
            ans = undefined;
        }
        document.getElementById("equation").textContent = equation;
    }
    if (keyInput === 'Backspace') {
        equation = equation.slice(0,-1);
        if (equation.toString().length === 0){
            equation = "0";
        }
        document.getElementById("equation").textContent = equation;
    }
    if (keyInput === "+" || keyInput === "-" || keyInput === "*" || keyInput === "/") {
        if (!checkLastChar()){
            if (ans !== undefined) {
                equation += "Ans" + (keyInput === "-" ? "−" : keyInput === "*" ? "×" : keyInput === "/" ? "÷" : "+");
            } else {
                equation += keyInput === "-" ? "−" : keyInput === "*" ? "×" : keyInput === "/" ? "÷" : "+";
            }
        }
        document.getElementById("equation").textContent = equation;
    }
    if (keyInput === "Enter") {
        solveEquation();
    }
}
//execute the equation
function solveEquation(){
    equation = equation.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("−", "-").replaceAll("Ans", ans);
    if (!equation.includes("*") && !equation.includes("/") && !equation.includes("+") && !equation.includes("-")) {
        document.getElementById("equation").textContent = equation === "" ? ans : equation !== "" ? equation : "0";
    } else {
        document.getElementById("equation").textContent =eval(equation);
        ans = eval(equation);
        equation = "";
    }
}
function removeStartingZero(){
    equation = (equation === "0") ? "" : equation;
}
function checkLastChar() {
    return equation.slice(-2) === '+−' || equation.slice(-2) === '−' || equation.slice(-2) === "×−" || equation.slice(-2) === "÷−";
}
function openEx(){
    let extendedContainer = document.getElementById("extendedKeypadContainer");
    let standertContainer = document.getElementById("numericKeypadContainer");
    let equation = document.getElementById("equation");
    if (standart == true){
        let calculator = document.getElementById("calculator-standart");
        calculator.id = "calculator-extended";
        extendedContainer.setAttribute("style","display:grid;")
        standertContainer.setAttribute("style","padding:0 10px 10px 0;");
        equation.setAttribute("style","with:265;")
    }else{
        let calculator = document.getElementById("calculator-extended");
        calculator.id = "calculator-standart";
        extendedContainer.setAttribute("style","display:none;");
        standertContainer.setAttribute("style","padding:0 10px 10px 10px;");
        equation.setAttribute("style","with:166;")
    }
    standart = !standart;
}

main();