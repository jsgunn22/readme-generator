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
    message:
      "Describe the guidelines for contributing.  If none press Enter/Return.",
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
  "A proprietary license model is based on the concept that the software company creates software and maintains control over its code, and therefore, its features and use.",
];

// TODO: Create a function to write README file
function writeToFile(data) {
  // fs to write file so file gets overridden
  fs.writeFile("README.md", `${data}\n`, (err) =>
    err ? console.log(err) : console.log()
  );
}

// TODO: Create a function to initialize app
function init() {
  let answers = () => inquirer.prompt(questions).then((response) => response);

  async function print() {
    const a = await answers();

    // license description logic
    let licChoice = questions[7].choices;
    let licDesc;
    switch (a.license) {
      case licChoice[1]:
        licDesc = `### ${a.license}\n${licenseDesciptions[0]}`;
        break;
      case licChoice[2]:
        licDesc = `### ${a.license}\n${licenseDesciptions[1]}`;
        break;
      case licChoice[3]:
        licDesc = `### ${a.license}\n${licenseDesciptions[2]}`;
        break;
      case licChoice[4]:
        licDesc = `### ${a.license}\n${licenseDesciptions[3]}`;
        break;
      case licChoice[5]:
        licDesc = `### ${a.license}\n${licenseDesciptions[4]}`;
        break;
      default:
        licDesc = `\nNo licence on this project`;
        break;
    }

    // Contributions logic
    let contBool;
    a.contGuide
      ? (contBool = `\n\n## Contribution Guidelines\n${a.contDescription}`)
      : (contBool = `\n\n## Contribution Guidelines\nThere no guidlines to contributing to this project.`);

    // prints readme
    writeToFile(
      `# ${a.projectName}` +
        `\n\n## License\n${licDesc}` +
        `\n\n## Description\n${a.description}` +
        `\n\n## Table of Contents\n- [Usage](#usage-information)\n- [Contribution](#contribution-guidelines)\n- [Testing](#test-instructions)\n- [Questions](#questions)` +
        `\n\n## Installation Instructions\n${a.installation}` +
        `\n\n## Usage Information\n${a.usage}` +
        `${contBool}` +
        `\n\n## Test Instructions\n${a.testInst}` +
        `\n\n## Questions?\n### You can contact me at\n- https://github.com/${a.github}\n- ${a.email}`
    );
  }

  print();
}

// Function call to initialize app
init();
