//import for the parser libery
//global Variable
let equation = "0";
let ans;
let standard = true;
let startPosition = [];
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
    const mathFunction = document.getElementsByClassName("mathFunction");
    Array.from(mathFunction).forEach((i)=> {i.addEventListener("click", () => addToEquation(i))});
    document.getElementById("extended").addEventListener("click",openEx);
    document.getElementById("controlLine").addEventListener("mousedown",startDrag);
}
//to add Characters to the global:equation
function addToEquation(element){
    if ((equation.length <= 19 && standard) || (equation.length <= 53 && !standard)) {
        if (element.className === "mathOperator") {
            if (!checkLastChar(element.textContent)){
                if (ans !== undefined) {
                    equation += "Ans" + element.textContent;
                } else {
                    equation += element.textContent;
                }
            }
            document.getElementById("equation").textContent = equation;
        } else if (element.id === "comma"){
            if (!checkLastChar(element.textContent) && !checkForDuplicateCommas() && equation !== "0"){
                equation += ",";
                document.getElementById("equation").textContent = equation;
            }
        } else if (element.id === "c") {
            equation = "0";
            document.getElementById("equation").textContent = equation;
        } else {
            removeStartingZero();
            equation += element.textContent;
            if (!equation.includes("Ans")) {
                ans = undefined;
            }
            document.getElementById("equation").textContent = equation;
        }
    }
}
//to set the events on the keys on the keyboard for the calculator
function keyboardInput(event){
    const keyInput = event.key;
    if ((equation.length <= 19 && standard) || (equation.length <= 53 && !standard)) {
        console.log(keyInput);
        if ((Number(keyInput) >= 0 && Number(keyInput) <= 9) && keyInput !== 'Backspace') {
            removeStartingZero();
            equation += Number(keyInput);
            if (!equation.includes("Ans")) {
                ans = undefined;
            }
            document.getElementById("equation").textContent = equation;
        }
        if (keyInput === "+" || keyInput === "-" || keyInput === "*" || keyInput === "/") {
            if (!checkLastChar(keyInput === "-" ? "−" : keyInput === "*" ? "×" : keyInput === "/" ? "÷" : "+")) {
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
        if (keyInput === "Control") {
            openEx();
        }
        if (keyInput === ","){
            if (!checkLastChar(keyInput) && !checkForDuplicateCommas() && equation !== "0"){
                equation += ",";
                document.getElementById("equation").textContent = equation;
            }
        }
        if (keyInput === "c") {
            equation = "0";
            document.getElementById("equation").textContent = equation;
        }
    }
    if (keyInput === 'Backspace') {
        equation = equation.slice(0, -1);
        if (equation.toString().length === 0) {
            equation = "0";
        }
        document.getElementById("equation").textContent = equation;
    }
}
//execute the equation
function solveEquation(){
    equation = equation.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("−", "-").replaceAll("Ans", ans);
    if (!equation.includes("*") && !equation.includes("/") && !equation.includes("+") && !equation.includes("-") && equation.includes(",")) {
        document.getElementById("equation").textContent = equation === "" ? ans : equation !== "" ? equation : "0";
    } else {
        equation = equation.replaceAll(",", ".");
        equation = eval(equation).toString();
        document.getElementById("equation").textContent = equation.replace(".",",");
        ans = equation
        equation = "";
    }
}
function removeStartingZero(){
    equation = (equation === "0") ? "" : equation;
}
function checkLastChar(lastChar) {
    let valid = (equation.slice(-1) === "+" || equation.slice(-1) === '−' || equation.slice(-1) === "×" || equation.slice(-1) === "÷" || equation.slice(-1) === ",");
    if (valid && (equation+lastChar).slice(-2) === '+−' || (equation+lastChar).slice(-2) === '−−' || (equation+lastChar).slice(-2) === "×−" || (equation+lastChar).slice(-2) === "÷−") {
        valid = false;
        valid = !valid && (equation.charAt(equation.length - 1) === "−");
    }
    return valid;
}
//check for duplicates Commas for valid equation string
function checkForDuplicateCommas(){
    let temp = 0;
    for (let i = 0; i < equation.length; i++) {
        if (equation.charAt(i) === '+' || equation.charAt(i) === '−' || equation.charAt(i) === "×" || equation.charAt(i) === "÷" ) {
            temp = 0;
        }
        if (equation.charAt(i) === ",") {
            temp++;
        }
    }
    return (temp >= 1);
}
function openEx(){
    let extendedContainer = document.getElementById("extendedKeypadContainer");
    let standardContainer = document.getElementById("numericKeypadContainer");
    let equation = document.getElementById("equation");
    if (
        standard === true){
        let calculator = document.getElementById("calculator-standart");
        calculator.id = "calculator-extended";
        extendedContainer.setAttribute("style","display:grid;")
        standardContainer.setAttribute("style","padding:0 10px 10px 0;width:186px;");
    }else{
        let calculator = document.getElementById("calculator-extended");
        calculator.id = "calculator-standart";
        extendedContainer.setAttribute("style","display:none;");
        standardContainer.setAttribute("style","padding:0 10px 10px 10px;width:196px;");
    }
    standard = !standard;
}
//functions to move the calculator
function startDrag(e){
    startPosition["x"] = e.clientX;
    startPosition["y"] = e.clientY;
    document.addEventListener("mousemove",drag);
    document.addEventListener("mouseup",stopDrag);
}
function drag(e) {
    let newX = e.clientX - startPosition["x"];
    let newY = e.clientY - startPosition["y"];
    let calculator = document.querySelector(".calculator");
    calculator.setAttribute("style","left:"+(calculator.offsetLeft + newX)+"px;top:"+(calculator.offsetTop+newY)+"px;");
    startPosition["x"] = e.clientX;
    startPosition["y"] = e.clientY;
}
function stopDrag() {
    document.removeEventListener("mousemove",drag);
    document.removeEventListener("mouseup",stopDrag);
}

main();
