let rulesButton = document.querySelector(".rulesButton");
let rulesModal = document.querySelector(".rulesModal");
let rulesModalClose = document.getElementById("closeRulesImage");
let gameStateDiv = document.getElementById("gameState");
let scoreVal = document.querySelector(".scoreValue");
let score = 0;
rulesButton.addEventListener("click", () => {
  rulesModal.classList.toggle("hidden");
});
rulesModalClose.addEventListener("click", () => {
  rulesModal.classList.toggle("hidden");
});

let paper = document.getElementById("paper");
rock.addEventListener("mouseenter", (e) => {
  document
    .querySelectorAll("#rock .hoverSelect")
    .forEach((a) => a.classList.toggle("hoverPulse1"));

  document
    .querySelectorAll("#rock .hoverSelect2")
    .forEach((a) => a.classList.toggle("hoverPulse2"));
  document
    .querySelectorAll("#rock .hoverSelect3")
    .forEach((a) => a.classList.toggle("hoverPulse3"));
});
rock.addEventListener("mouseleave", () => {
  document
    .querySelectorAll(".hoverSelect")
    .forEach((a) => a.classList.remove("hoverPulse1"));

  document
    .querySelectorAll(".hoverSelect2")
    .forEach((a) => a.classList.remove("hoverPulse2"));
  document
    .querySelectorAll(".hoverSelect3")
    .forEach((a) => a.classList.remove("hoverPulse3"));
});
scissors.addEventListener("mouseenter", (e) => {
  document
    .querySelectorAll("#scissors .hoverSelect")
    .forEach((a) => a.classList.toggle("hoverPulse1"));

  document
    .querySelectorAll("#scissors .hoverSelect2")
    .forEach((a) => a.classList.toggle("hoverPulse2"));
  document
    .querySelectorAll("#scissors .hoverSelect3")
    .forEach((a) => a.classList.toggle("hoverPulse3"));
});
scissors.addEventListener("mouseleave", () => {
  document
    .querySelectorAll(".hoverSelect")
    .forEach((a) => a.classList.remove("hoverPulse1"));

  document
    .querySelectorAll(".hoverSelect2")
    .forEach((a) => a.classList.remove("hoverPulse2"));
  document
    .querySelectorAll(".hoverSelect3")
    .forEach((a) => a.classList.remove("hoverPulse3"));
});
paper.addEventListener("mouseenter", (e) => {
  document
    .querySelectorAll("#paper .hoverSelect")
    .forEach((a) => a.classList.toggle("hoverPulse1"));

  document
    .querySelectorAll("#paper .hoverSelect2")
    .forEach((a) => a.classList.toggle("hoverPulse2"));
  document
    .querySelectorAll("#paper .hoverSelect3")
    .forEach((a) => a.classList.toggle("hoverPulse3"));
});
paper.addEventListener("mouseleave", () => {
  document
    .querySelectorAll(".hoverSelect")
    .forEach((a) => a.classList.remove("hoverPulse1"));

  document
    .querySelectorAll(".hoverSelect2")
    .forEach((a) => a.classList.remove("hoverPulse2"));
  document
    .querySelectorAll(".hoverSelect3")
    .forEach((a) => a.classList.remove("hoverPulse3"));
});
paper.addEventListener("click", () => {
  makeSelection("paper");
});
rock.addEventListener("click", () => {
  makeSelection("rock");
});
scissors.addEventListener("click", () => {
  makeSelection("scissors");
});

let winLose = {
  paper: "rock",
  rock: "scissors",
  scissors: "paper",
};
document.getElementById("playAgain").addEventListener("click", () => {
  gameStateDiv.style.transform = "translateX(-50%) translateY(-50%)";
  document.getElementById("housePickedIcon").classList.add("housePicked");
  let highlights = document.querySelectorAll("#youPicked .hs");
  let highlights2 = document.querySelectorAll("#housePicked .hs");

  for (let i of highlights) {
    i.style.width = 0 + "%";
    i.style.opacity = 0.3;
    i.style.height = 0 + "%";
    i.classList.remove("hs2");
  }
  for (let i of highlights2) {
    i.style.width = 0 + "%";
    i.style.opacity = 0.3;
    i.style.height = 0 + "%";
    i.classList.remove("hs2");
  }
  housePicked = document.getElementById("housePicked");
  youPicked = document.getElementById("youPicked");
  housePicked.style.transform = "translateX(0%)";
  youPicked.style.transform = "translateX(0%)";
  document.getElementById("winLoseButtonDiv").style.transform = "scale(0)";
});
function makeSelection(selected) {
  let shadows = document.querySelectorAll("#pickedIcon .sel");
  let image = document.querySelector("#pickedIcon img");
  image.src = "./images/icon-" + selected + ".svg";
  for (let i of shadows) {
    i.classList.remove("paper");

    i.classList.remove("rock");
    i.classList.remove("scissors");
    i.classList.add(selected);
  }
  let screen2 = document.getElementById("screen2");
  gameStateDiv.style.transform = "translateX(-80%) translateY(-50%)";
  setTimeout(() => {
    weSelected = selected;
    selected = cpuSelect();
    console.log(weSelected, selected, winLose[weSelected]);

    setTimeout(dividePicked, 450);
    if (weSelected == selected) {
      showTie();
      // showLose();
    } else if (winLose[weSelected] == selected) {
      //showWin();
      showWin();
    } else {
      showLose();
    }
    document.getElementById("housePickedIcon").classList.remove("housePicked");
    let shadows = document.querySelectorAll("#housePickedIcon .sel");
    let image = document.querySelector("#housePickedIcon img");
    image.src = "./images/icon-" + selected + ".svg";
    for (let i of shadows) {
      i.classList.remove("paper");

      i.classList.remove("rock");
      i.classList.remove("scissors");
      i.classList.add(selected);
    }
  }, 2000);
}
function showLose() {
  setTimeout(() => {
    let highlights = document.querySelectorAll("#housePicked .hs");
    let size = 130;
    for (let i of highlights) {
      i.style.width = size + "%";
      i.style.opacity = 0.3;
      i.style.height = size + "%";
      i.classList.add("hs2");
      size += 30;
    }
    score--;
    scoreVal.innerText = score;
    // document.getElementById("winLoseButtonDiv").style.backgroundColor = "red";
    document.getElementById("winLoseText").innerText = "YOU LOSE";
    document.getElementById("winLoseButtonDiv").style.transform = "scale(1)";
  }, 700);
}
function showTie() {
  setTimeout(() => {
    // document.getElementById("winLoseButtonDiv").style.backgroundColor = "red";
    document.getElementById("winLoseText").innerText = "YOU TIED";
    document.getElementById("winLoseButtonDiv").style.transform = "scale(1)";
  }, 700);
}
function showWin() {
  setTimeout(() => {
    let highlights = document.querySelectorAll("#youPicked .hs");
    let size = 130;
    for (let i of highlights) {
      i.style.width = size + "%";
      i.style.opacity = 0.3;
      i.style.height = size + "%";
      i.classList.add("hs2");
      size += 30;
    }
    score++;
    scoreVal.innerText = score;
    document.getElementById("winLoseText").innerText = "YOU WIN";
    document.getElementById("winLoseButtonDiv").style.transform = "scale(1)";
  }, 700);
}

function dividePicked() {
  housePicked = document.getElementById("housePicked");
  youPicked = document.getElementById("youPicked");
  housePicked.style.transform = "translateX(30%)";
  youPicked.style.transform = "translateX(-30%)";
}
function cpuSelect() {
  let answers = ["paper", "rock", "scissors"];
  return answers[Math.floor(Math.random() * 3)];
}
