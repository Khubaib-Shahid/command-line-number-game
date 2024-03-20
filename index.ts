#! /usr/bin/env node

import inquirer from "inquirer";

let difficulty = await inquirer.prompt([
  {
    message: "Choose difficulty",
    type: "list",
    name: "dif",
    choices: [
      "Easy (0 to 10)",
      "Medium (0 to 20)",
      "Hard (0 to 30)",
      "Extreme (0 to 40)",
    ],
  },
]);

let cNum: number;

let mess: string;

let lives: number = 3;

let bonus: number = 0;

let score: number = 0;

if (difficulty.dif === "Easy (0 to 10)") {
  mess = "Guess a number between 0 to 10";
  cNum = 10;
} else if (difficulty.dif === "Medium (0 to 20)") {
  mess = "Gues a number between 0 to 20";
  cNum = 20;
} else if (difficulty.dif === "Hard (0 to 30)") {
  mess = "Guess a number between 0 to 30";
  cNum = 30;
} else if (difficulty.dif === "Extreme (0 to 40)") {
  mess = "Guess a number between 0 to 40";
  cNum = 40;
} else {
  mess = "Choose right difficulty";
}

async function startGame() {
  cNum = Math.round(Math.random() * cNum);

  let user = await inquirer.prompt([
    { message: mess, type: "number", name: "num" },
  ]);

  if (user.num === cNum) {
    if (bonus === 3) {
      lives += 1;
      bonus = 0;
    }
    score += 5;
    bonus++;
    console.log(`You won`, `\nLives : ${lives}`, `\nScore : ${score}`);
    playAgain();
  } else {
    lives -= 1;
    console.log(
      `You lost number is ${cNum}`,
      `\nlives : ${lives}`,
      `\nScore : ${score}`
    );
    playAgain();
  }
}

startGame();

async function playAgain() {
  if (lives !== 0) {
    let play = await inquirer.prompt([
      {
        message: "Do you want to play again?",
        type: "list",
        name: "play",
        choices: ["Yes", "No"],
      },
    ]);

    if (play.play === "Yes") {
      startGame();
    } else {
      console.log("Game Over");
      console.log("Your score is " + score);
    }
  } else {
    console.log("Game Over");
    console.log("Your score is " + score);
  }
}
