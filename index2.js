// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of this project?",
  },
  {
    type: "input",
    name: "description",
    message: "Provide a short description of the project.",
  },
  {
    type: "input",
    name: "installation",
    message: "What steps are necessary to install this project?",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide instructions for use.",
  },
  {
    type: "confirm",
    name: "contGuide",
    message: "Are there guidelines for contributing?",
  },
  {
    type: "input",
    name: "contDescription",
    message: "Describe the guidelines for contributing",
  },
  {
    type: "input",
    name: "testInst",
    message: "What are the instructions for testing this project?",
  },
  {
    type: "list",
    name: "license",
    message: "What license does your project have?",
    choices: [
      "No License",
      "Public Domain",
      "GNU Lesser General",
      "Permissive",
      "Copyleft",
      "Proprietary",
    ],
  },
  {
    type: "input",
    name: "github",
    message: "What is your Github user handle?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
];

const licenseDesciptions = [
  "Software with a public domain license often is open source, allowing users to adjust or build on top of the software's code to customize its use or create a new software package.",
  "The LPGL is an offshoot of the GNU General Public License (GPL) that allows developers to use open-source libraries within the code of their software without releasing the source code they used to create their components.",
  "This type of license is similar to public domain licenses but is more restrictive because it may have certain conditions for intellectual property protection.",
  "Copyleft licenses are reciprocal or restrictive licenses, and although they're similar to an LGPL, a copyleft license has more stipulations to follow.",
];

// TODO: Create a function to write README file
function writeToFile(data) {
  fs.appendFile("README.md", `${data}\n`, (err) =>
    err ? console.log(err) : console.log()
  );
}

// TODO: Create a function to initialize app
function init() {
  let answers = () => inquirer.prompt(questions).then((response) => response);

  async function print() {
    const a = await answers();

    writeToFile(`# ${a.projectName}\n`);

    // license description logic
    let licChoice = questions[7].choices;
    let licDesc;
    switch (a.license) {
      case licChoice[1]:
        licDesc = licenseDesciptions[1];
        break;
      case licChoice[2]:
        licDesc = licenseDesciptions[2];
        break;
      case licChoice[3]:
        licDesc = licenseDesciptions[3];
        break;
      case licChoice[4]:
        licDesc = licenseDesciptions[4];
        break;
      default:
        break;
    }
    a.license == licChoice[0]
      ? writeToFile(`## License\nNo licence on this project`)
      : writeToFile(`## License\n### ${a.license}\n${licDesc}`);
  }

  print();
}

// Function call to initialize app
init();
