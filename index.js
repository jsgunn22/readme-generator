// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");

let prompt = inquirer.createPromptModule();

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Provide a short description of the project.",
  },
  {
    type: "input",
    name: "motivation",
    message: "What was your motivation for this project?",
  },
  {
    type: "input",
    name: "why",
    message: "Why did you build the project?",
  },
  {
    type: "input",
    name: "whatProblem",
    message: "What problem did it solve?",
  },
  {
    type: "input",
    name: "learned",
    message: "What did you learn?",
  },
  {
    type: "input",
    name: "installation",
    message: "What are the steps required to install this project?",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide instructions for use.",
  },
  {
    type: "input",
    name: "credits",
    message: "List all collaborators and their contributions to this project.",
  },
  {
    type: "input",
    name: "license",
    message: "What is this projects license status?",
  },
];

// TODO: Create a function to write README file
function writeToFile(data) {
  fs.appendFile("README.md", `${data}\n`, (err) =>
    err ? console.log(err) : console.log()
  );
}

// TODO: Create a function to initialize app
function init() {
  let answers = () => prompt(questions).then((answers) => answers);

  async function printData() {
    const dataObject = await answers();
    let a = dataObject;
    let printOrder = [
      `# ${a.projectName}\n`,
      `## Descrition\n${a.description}\n\n- ${a.motivation}\n- ${a.why}\n- ${a.whatProblem}\n- ${a.learned}`,
      `\n## Table of Contents\n- [Installation](#installation)\n- [Usage](#usage)\n- [Credits](#credits)\n- [License]('#license)\n`,
      `## Installation\n${a.installation}`,
      `## Usage\n${a.usage}`,
      `## Credits\n${a.credits}`,
      `## License\n${a.license}`,
    ];

    printOrder.forEach((p) => writeToFile(p));
  }

  printData();
}

// Function call to initialize app
init();
