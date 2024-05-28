const localTotalVictoryField = document.getElementById(
  "local-total-victory-field"
);
const localMaximumAttemptField = document.getElementById(
  "local-maximum-attempt-field"
);
const destroyDataButton = document.getElementById("destroy-data-button");
const playButton = document.getElementById("play-button");
const beforeGameDisplay = document.getElementById("before-game-display");
const duringGameDisplay = document.getElementById("during-game-display");
const afterGameDisplay = document.getElementById("after-game-display");
const answerButton1 = document.getElementById("answer-1-button");
const answerButton2 = document.getElementById("answer-2-button");
const answerButton3 = document.getElementById("answer-3-button");
const sessionUserAnswerField = document.getElementById(
  "session-user-answer-field"
);
const sessionUserWrongAnswerField = document.getElementById(
  "session-user-wrong-answer-field"
);
const sessionTrueAnswerField = document.getElementById(
  "session-true-answer-field"
);
const sessionUserAttemptsField = document.getElementById(
  "session-user-attempts-amount-field"
);

function getAnswer() {
  let answer = "123".split("");
  for (let i = 0; i < answer.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = answer[i];
    answer[i] = answer[j];
    answer[j] = tmp;
  }

  return answer.join("");
}

// session storage
const sessionAnswerKey = "SESSION_ANSWER";
const sessionUserAttempsKey = "SESSION_USER_ATTEMPTS";
const sessionUserIsPlayingGame = "SESSION_USER_IS_PLAYING";

// local storage
const localTotalVictoryKey = "LOCAL_TOTAL_VICTORY";
const localMaxAttemptsKey = "LOCAL_MAX_ATTEMPTS";

window.addEventListener("load", () => {
  if (typeof Storage !== "undefined") {
    if (sessionStorage.getItem(sessionAnswerKey) === null) {
      sessionStorage.setItem(sessionAnswerKey, "");
    } else if (sessionStorage.getItem(sessionUserAttempsKey) === null) {
      sessionStorage.setItem(sessionUserAttempsKey, 0);
    } else if (sessionStorage.getItem(sessionUserIsPlayingGame === null)) {
      sessionStorage.setItem(sessionUserIsPlayingGame, false);
    } else if (localStorage.getItem(localTotalVictoryKey) === null) {
      localStorage.setItem(localTotalVictoryKey, 0);
    } else if (localStorage.getItem(localMaxAttemptsKey) === null) {
      localStorage.setItem(localMaxAttemptsKey, 0);
    }
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
  }

  sessionUserAttemptsField.innerText = sessionStorage.getItem(
    sessionUserAttempsKey
  );
  localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
  localMaximumAttemptField.innerText =
    localStorage.getItem(localMaxAttemptsKey);
});

window.addEventListener("beforeunload", () => {
  sessionUserAnswerField.innerText = "";
  sessionUserWrongAnswerField.innerText = "";
  sessionStorage.setItem(sessionUserAttempsKey, 0);
  sessionUserAttemptsField.innerText = sessionStorage.getItem(
    sessionUserAttempsKey
  );
});

playButton.addEventListener("click", () => {
  sessionStorage.setItem(sessionAnswerKey, getAnswer());
  sessionStorage.setItem(sessionUserIsPlayingGame, true);
  beforeGameDisplay.setAttribute("hidden", true);
  duringGameDisplay.removeAttribute("hidden");
});

answerButton1.addEventListener("click", () => {
  sessionUserAnswerField.innerText += "1";
  if (sessionUserAnswerField.innerText.length == 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});

answerButton2.addEventListener("click", () => {
  sessionUserAnswerField.innerText += "2";
  if (sessionUserAnswerField.innerText.length == 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});

answerButton3.addEventListener("click", () => {
  sessionUserAnswerField.innerText += "3";
  if (sessionUserAnswerField.innerText.length == 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});

function checkAnswer(userGuess) {
  const answer = sessionStorage.getItem(sessionAnswerKey);

  if (userGuess == answer) {
    duringGameDisplay.setAttribute("hidden", true);
    afterGameDisplay.removeAttribute("hidden");
    sessionTrueAnswerField.innerText = answer;
    updateScore();
  } else {
    const previousAttemptAmount = parseInt(
      sessionStorage.getItem(sessionUserAttempsKey)
    );
    sessionStorage.setItem(sessionUserAttempsKey, previousAttemptAmount + 1);
    sessionUserAttemptsField.innerText = sessionStorage.getItem(
      sessionUserAttempsKey
    );
    sessionUserAnswerField.innerText = "";
    sessionUserWrongAnswerField.innerText = userGuess;
  }
}

function updateScore() {
  const sessionAttemptsValue = parseInt(
    sessionStorage.getItem(sessionUserAttempsKey)
  );
  const localAttemptsValue = parseInt(
    localStorage.getItem(localMaxAttemptsKey)
  );

  if (sessionAttemptsValue > localAttemptsValue) {
    localStorage.setItem(localMaxAttemptsKey, sessionAttemptsValue);
    localMaximumAttemptField.innerText = sessionAttemptsValue;
  }

  const previousTotalVictoryAmount = parseInt(
    localStorage.getItem(localTotalVictoryKey)
  );
  localStorage.setItem(localTotalVictoryKey, previousTotalVictoryAmount + 1);
  localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
}

destroyDataButton.addEventListener("click", () => {
  sessionStorage.removeItem(sessionAnswerKey);
  sessionStorage.removeItem(sessionUserAttempsKey);
  sessionStorage.removeItem(sessionUserIsPlayingGame);
  localStorage.removeItem(localTotalVictoryKey);
  localStorage.removeItem(localMaxAttemptsKey);

  location.reload();

  localTotalVictoryField.innerText = localStorage.setItem(
    localTotalVictoryKey,
    0
  );
  localMaximumAttemptField.innerText = localStorage.setItem(
    localMaxAttemptsKey,
    0
  );

  if (localTotalVictoryField.innerText === "undefined") {
    localTotalVictoryField.setAttribute("hidden", true);
  }

  if (localMaximumAttemptField.innerText === "undefined") {
    localMaximumAttemptField.setAttribute("hidden", true);
  }
});
