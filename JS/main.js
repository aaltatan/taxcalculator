function layersTax(salary = 0) {
  let tax = 0;
  if (salary > 260000) {
    tax = (salary - 260000) * 0.18 + 21000;
  } else if (salary > 230000) {
    tax = (salary - 230000) * 0.16 + 16200;
  } else if (salary > 200000) {
    tax = (salary - 200000) * 0.14 + 12000;
  } else if (salary > 170000) {
    tax = (salary - 170000) * 0.12 + 8400;
  } else if (salary > 140000) {
    tax = (salary - 140000) * 0.1 + 5400;
  } else if (salary > 110000) {
    tax = (salary - 110000) * 0.08 + 3000;
  } else if (salary > 80000) {
    tax = (salary - 80000) * 0.06 + 1200;
  } else if (salary > 50000) {
    tax = (salary - 50000) * 0.04;
  } else {
    tax = 0;
  }
  return tax;
}
// ---------------------------
function netSalary(salary = 0) {
  let netTarget = salary - layersTax(salary);
  let newSalary = salary + layersTax(salary);
  for (let helpSalary = salary; ; ) {
    if (helpSalary <= netTarget) break;
    netTarget = newSalary - layersTax(newSalary);
    newSalary++;
  }
  return newSalary;
}
// ---------------------------
let salaryInput = document.getElementById("salary");
let calculator = document.getElementById("clc");
let toolTip = document.getElementById("tooltip");
let clcBtn = document.getElementById("calc");
let outPut = document.getElementById("output");
// ---------------------------
salaryInput.onfocus = function () {
  calculator.style.maxHeight = "8rem";
  salaryInput.select();
};
// ---------------------------
salaryInput.oninput = () => {
  toolTip.style.display = "none";
  toolTip.classList.remove("shake");
  let sourceSalary = salaryInput.value.toLocaleString();
  if (sourceSalary > 1000000000) {
    toolTip.style.display = "block";
    toolTip.classList.add("shake");
    salaryInput.value = +sourceSalary.slice(0, sourceSalary.length - 1);
    return;
  }
  calculator.style.maxHeight = "8rem";
  sourceSalary = salaryInput.value.toLocaleString();
  document.getElementById("if").innerHTML = `${parseInt(sourceSalary).toLocaleString()} s.p.
  <div class="pipe" id="pipe"></div>`;
  document.getElementById("pipe").style.transitionDuration = "0.5s";
  if (sourceSalary === "") {
    document.getElementById("if").innerHTML = "";
  }
};
// ---------------------------
salaryInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    clcBtn.click();
  }
});
// ---------------------------
clcBtn.onclick = function () {
  toolTip.style.display = "none";
  let sourceSalary = salaryInput.value;
  if (sourceSalary > 1000000000) {
    toolTip.style.opacity = 1;
    return;
  }
  calculator.style.maxHeight = "20rem";
  outPut.innerHTML = `
  Salary = ${(+sourceSalary).toLocaleString()} <br>
  Tax = ${layersTax(sourceSalary).toLocaleString()} <br>
  Net = ${(sourceSalary - layersTax(sourceSalary)).toLocaleString()} <br>
  Gross = ${netSalary(+sourceSalary).toLocaleString()}
  <button id="copyTax" onclick="taxCopy()"><i class="fa fa-copy"></i> Tax</button>
  <button id="copyFull" onclick="fullCopy()"><i class="fa fa-copy"></i> Gross</button>
  `;
};
// ---------------------------
function taxCopy() {
  let textCopy = layersTax(+salaryInput.value);
  navigator.clipboard.writeText(textCopy);
}
function fullCopy() {
  let sourceSalary = salaryInput.value;
  let textCopy = Math.floor(netSalary(+sourceSalary));
  navigator.clipboard.writeText(textCopy);
}
