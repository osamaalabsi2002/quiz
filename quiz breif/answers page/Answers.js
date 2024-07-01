let container = document.getElementById("container");
let image = document.getElementById("image");
let parent = document.getElementById("parent");
let comment = document.getElementById("comment");
let Container2 = document.getElementById("Container2");
let tableBody = document.getElementById("tableBody");
let resultNumberElement = document.getElementById("resultNumber");
let resultNumber2 = document.getElementById("resultNumber2");

let resultNumber = 0;

function handleLogoutClick() {
  sessionStorage.clear();
  window.location.href = "../register/register.html";
}

function backToHome() {
  window.location.href = "../newHome/homepage.html";
}

function showAnswers() {
  parent.style.display = "none";
  container.style.filter = "none";
}

function changeResult() {
  Container2.style.background = "#7AFF7A";
  image.src = "2.png";
  comment.innerHTML = "Congratulations";
}

function test() {
  if (resultNumber > 2) {
    changeResult();
  }
}

function table() {
  let questions = sessionStorage.getItem("questionsText");
  let correctAnswers = sessionStorage.getItem("correctAnswers");
  let answers = sessionStorage.getItem("userAnswers");
  questions = JSON.parse(questions);
  correctAnswers = JSON.parse(correctAnswers);
  answers = JSON.parse(answers);
  let v = 0;

  for (let i = 0; i < 5; i++) {
    let row = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.textContent = `${i + 1}`;
    row.appendChild(cell1);

    let cell2 = document.createElement("td");
    cell2.textContent = questions[i];
    row.appendChild(cell2);

    let cell3 = document.createElement("td");
    cell3.textContent = correctAnswers[i].answerText;
    row.appendChild(cell3);

    let cell4 = document.createElement("td");
    cell4.textContent = answers[i].answerText || "No Answer";
    if (correctAnswers[i].choice === answers[i].choice) {
      cell4.style.color = "green";
      v += 1;
    } else {
      cell4.style.color = "red";
    }
    row.appendChild(cell4);

    tableBody.appendChild(row);
  }
  resultNumber = v;
}

window.onload = function () {
  table();
  test();
  resultNumberElement.innerText = resultNumber;
  resultNumber2.innerText = resultNumber;
console.log(resultNumber);
};
