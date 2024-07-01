let atQuestion = 1;
document.querySelector("#questionButton1").style.color = "#355199";
document.querySelector("#questionButton1").style.backgroundColor = "#ffffff";
document.querySelector("#nextArrow").style.backgroundColor = "#777777";
function removeQuestionButtonHighlight() {
  document.querySelector("#questionButton1").style.color = "#ffffff";
  document.querySelector("#questionButton1").style.backgroundColor =
    "#ffffff44";
  document.querySelector("#questionButton2").style.color = "#ffffff";
  document.querySelector("#questionButton2").style.backgroundColor =
    "#ffffff44";
  document.querySelector("#questionButton3").style.color = "#ffffff";
  document.querySelector("#questionButton3").style.backgroundColor =
    "#ffffff44";
  document.querySelector("#questionButton4").style.color = "#ffffff";
  document.querySelector("#questionButton4").style.backgroundColor =
    "#ffffff44";
  document.querySelector("#questionButton5").style.color = "#ffffff";
  document.querySelector("#questionButton5").style.backgroundColor =
    "#ffffff44";
}

const questionNumberToChange = document.querySelector("#questionNumberDynamic");

const quizAttempt = {
  firstQuestionAnswered: false,
  secondQuestionAnswered: false,
  thirdQuestionAnswered: false,
  fourthQuestionAnswered: false,
  fifthQuestionAnswered: false,
};

const userAnswersArray = [0, 0, 0, 0, 0];
const correctAnswersArray = [];
const questionsArray = [];

async function loadQuiz() {
  const response = await fetch(`${localStorage.getItem("url")}`);
  const data = await response.json();
  console.log(data);
  document.querySelector("#topLeft").textContent = `${data.name} Quiz`;
  for (let i = 1; i < 6; i += 1) {
    document.querySelector(`#q${i}`).textContent =
      data.questions[i - 1].question;
    questionsArray.push(data.questions[i - 1].question);
    correctAnswersArray[i - 1] = { choice: data.questions[i - 1].correct };
    for (let j = 1; j < 5; j += 1) {
      document.querySelector(`#q${i}a${j}Text`).textContent =
        data.questions[i - 1].answers[j - 1];
      if (j === data.questions[i - 1].correct) {
        correctAnswersArray[i - 1] = {
          ...correctAnswersArray[i - 1],
          answerText: data.questions[i - 1].answers[j - 1],
        };
      }
    }
  }
}

window.addEventListener("load", function () {
  if (!(sessionStorage.getItem("id") && sessionStorage.getItem("name"))) {
    window.location = "../register/register.html";
  }
  this.scrollTo(0, 0);
  loadQuiz();
  let timer = 300; // 5 minutes in seconds
  const timerElement = document.getElementById("time");
  const countdown = setInterval(() => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    // Add leading zero if needed
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    timerElement.textContent = `${minutes}:${seconds}`;

    // Stop the timer when it reaches zero
    if (timer <= 0) {
      clearInterval(countdown);
      timerElement.textContent = "00:00"; //end quiz here
      sessionStorage.setItem("userAnswers", JSON.stringify(userAnswersArray));
      sessionStorage.setItem(
        "correctAnswers",
        JSON.stringify(correctAnswersArray)
      );
      sessionStorage.setItem("questionsText", JSON.stringify(questionsArray));
      window.location = "/answers%20page/Answers.html";
    }

    timer--;
  }, 1000);
});

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

document.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

function checkAnswer(choice) {
  document.querySelector(`#${choice}`).checked = true;
}

function goToQuestion(questionNumber) {
  switch (true) {
    case questionNumber === 1:
      scrollTo(window.innerWidth * 0.98 * (questionNumber - 1), 0);
      atQuestion = questionNumber;
      if (quizAttempt.firstQuestionAnswered) {
        enableNext();
      } else {
        disableNext();
      }
      questionNumberToChange.textContent = `${atQuestion}`;
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton1").style.color = "#355199";
      document.querySelector("#questionButton1").style.backgroundColor =
        "#ffffff";
      break;
    case questionNumber === 2 && quizAttempt.firstQuestionAnswered:
      scrollTo(window.innerWidth * 0.98 * (questionNumber - 1), 0);
      atQuestion = questionNumber;
      if (quizAttempt.secondQuestionAnswered) {
        enableNext();
      } else {
        disableNext();
      }
      questionNumberToChange.textContent = `${atQuestion}`;
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton2").style.color = "#355199";
      document.querySelector("#questionButton2").style.backgroundColor =
        "#ffffff";
      break;
    case questionNumber === 3 && quizAttempt.secondQuestionAnswered:
      scrollTo(window.innerWidth * 0.98 * (questionNumber - 1), 0);
      atQuestion = questionNumber;
      if (quizAttempt.thirdQuestionAnswered) {
        enableNext();
      } else {
        disableNext();
      }
      questionNumberToChange.textContent = `${atQuestion}`;
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton3").style.color = "#355199";
      document.querySelector("#questionButton3").style.backgroundColor =
        "#ffffff";
      break;
    case questionNumber === 4 && quizAttempt.thirdQuestionAnswered:
      scrollTo(window.innerWidth * 0.98 * (questionNumber - 1), 0);
      atQuestion = questionNumber;
      if (quizAttempt.fourthQuestionAnswered) {
        enableNext();
      } else {
        disableNext();
      }
      questionNumberToChange.textContent = `${atQuestion}`;
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton4").style.color = "#355199";
      document.querySelector("#questionButton4").style.backgroundColor =
        "#ffffff";
      break;
    case questionNumber === 5 && quizAttempt.fourthQuestionAnswered:
      scrollTo(window.innerWidth * 0.98 * (questionNumber - 1), 0);
      atQuestion = questionNumber;
      questionNumberToChange.textContent = `${atQuestion}`;
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton5").style.color = "#355199";
      document.querySelector("#questionButton5").style.backgroundColor =
        "#ffffff";
      break;
  }
}

function goNext() {
  switch (true) {
    case atQuestion === 1 && quizAttempt.firstQuestionAnswered:
      scrollTo(window.innerWidth * 0.98 * 1, 0);
      atQuestion = 2;
      if (quizAttempt.thirdQuestionAnswered) {
        enableNext();
      } else {
        disableNext();
      }
      questionNumberToChange.textContent = "2";
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton2").style.color = "#355199";
      document.querySelector("#questionButton2").style.backgroundColor =
        "#ffffff";
      break;
    case atQuestion === 2 && quizAttempt.secondQuestionAnswered:
      scrollTo(window.innerWidth * 0.98 * 2, 0);
      atQuestion = 3;
      if (quizAttempt.fourthQuestionAnswered) {
        enableNext();
      } else {
        disableNext();
      }
      questionNumberToChange.textContent = "3";
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton3").style.color = "#355199";
      document.querySelector("#questionButton3").style.backgroundColor =
        "#ffffff";
      break;
    case atQuestion === 3 && quizAttempt.thirdQuestionAnswered:
      scrollTo(window.innerWidth * 0.98 * 3, 0);
      atQuestion = 4;
      if (quizAttempt.fifthQuestionAnswered) {
        enableNext();
      } else {
        disableNext();
      }
      questionNumberToChange.textContent = "4";
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton4").style.color = "#355199";
      document.querySelector("#questionButton4").style.backgroundColor =
        "#ffffff";
      break;
    case atQuestion === 4 && quizAttempt.fourthQuestionAnswered:
      scrollTo(window.innerWidth * 0.98 * 4, 0);
      atQuestion = 5;
      questionNumberToChange.textContent = "5";
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton5").style.color = "#355199";
      document.querySelector("#questionButton5").style.backgroundColor =
        "#ffffff";
      break;
  }
}

function goPrev() {
  switch (true) {
    case atQuestion === 5:
      scrollTo(window.innerWidth * 0.98 * 3, 0);
      atQuestion = 4;
      enableNext();
      questionNumberToChange.textContent = "4";
      document.querySelector("#questionButton4").style.color = "#355199";
      document.querySelector("#questionButton4").style.backgroundColor =
        "#ffffff";
      break;
    case atQuestion === 4:
      scrollTo(window.innerWidth * 0.98 * 2, 0);
      atQuestion = 3;
      enableNext();
      questionNumberToChange.textContent = "3";
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton3").style.color = "#355199";
      document.querySelector("#questionButton3").style.backgroundColor =
        "#ffffff";
      break;
    case atQuestion === 3:
      scrollTo(window.innerWidth * 0.98 * 1, 0);
      atQuestion = 2;
      enableNext();
      questionNumberToChange.textContent = "2";
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton2").style.color = "#355199";
      document.querySelector("#questionButton2").style.backgroundColor =
        "#ffffff";
      break;
    case atQuestion === 2:
      scrollTo(window.innerWidth * 0.98 * 0, 0);
      atQuestion = 1;
      enableNext();
      questionNumberToChange.textContent = "1";
      removeQuestionButtonHighlight();
      document.querySelector("#questionButton1").style.color = "#355199";
      document.querySelector("#questionButton1").style.backgroundColor =
        "#ffffff";
      break;
  }
}

function storeAnswer(questionNumber) {
  switch (true) {
    case document.querySelector(`#q${questionNumber}a${1}`).checked:
      userAnswersArray[questionNumber - 1] = {
        choice: 1,
        answerText: `${
          document.querySelector(`#q${questionNumber}a${1}Text`).textContent
        }`,
      };
      break;
    case document.querySelector(`#q${questionNumber}a${2}`).checked:
      userAnswersArray[questionNumber - 1] = {
        choice: 2,
        answerText: `${
          document.querySelector(`#q${questionNumber}a${2}Text`).textContent
        }`,
      };
      break;
    case document.querySelector(`#q${questionNumber}a${3}`).checked:
      userAnswersArray[questionNumber - 1] = {
        choice: 3,
        answerText: `${
          document.querySelector(`#q${questionNumber}a${3}Text`).textContent
        }`,
      };
      break;
    case document.querySelector(`#q${questionNumber}a${4}`).checked:
      userAnswersArray[questionNumber - 1] = {
        choice: 4,
        answerText: `${
          document.querySelector(`#q${questionNumber}a${4}Text`).textContent
        }`,
      };
      break;
  }
}

function enable(questionNumber) {
  switch (true) {
    case questionNumber === 1:
      quizAttempt.firstQuestionAnswered = true;
      storeAnswer(1);
      enableNext();
      break;
    case questionNumber === 2:
      quizAttempt.secondQuestionAnswered = true;
      storeAnswer(2);
      enableNext();
      break;
    case questionNumber === 3:
      quizAttempt.thirdQuestionAnswered = true;
      storeAnswer(3);
      enableNext();
      break;
    case questionNumber === 4:
      quizAttempt.fourthQuestionAnswered = true;
      storeAnswer(4);
      enableNext();
      break;
    case questionNumber === 5:
      quizAttempt.fifthQuestionAnswered = true;
      document
        .querySelector("#submitButton")
        .addEventListener("click", finishedQuiz);
      storeAnswer(5);
      document.querySelector("#submitButton").style.display = "flex";
      break;
  }
}

function enableNext() {
  document.querySelector("#nextArrow").style.backgroundColor = "#355199";
  // document.querySelector("#nextArrow").style.display = "flex";
  console.log("enabled");
}

function disableNext() {
  document.querySelector("#nextArrow").style.backgroundColor = "#777777";
  // document.querySelector("#nextArrow").style.display = "none";
  console.log("disabled");
}

function finishedQuiz() {
  console.log("submitted");
  sessionStorage.setItem("userAnswers", JSON.stringify(userAnswersArray));
  sessionStorage.setItem("correctAnswers", JSON.stringify(correctAnswersArray));
  sessionStorage.setItem("questionsText", JSON.stringify(questionsArray));
  window.location = "/answers%20page/Answers.html";
}
