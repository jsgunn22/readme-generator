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
      "Apache 2.0 License",
      "Boost Software License 1.0",
      "BSD 3-Clause License",
      "BSD 3-Clause License",
      "Eclipse Public License 1.0",
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
const licenseBadges = [
  `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
  `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`,
  `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`,
  `[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`,
  `[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`,
];
const licenseDesciptions = [
  "The Apache License is a permissive free software license written by the Apache Software Foundation (ASF). It allows users to use the software for any purpose, to distribute it, to modify it, and to distribute modified versions of the software under the terms of the license, without concern for royalties.",
  'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
  "THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.",
  "THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.",
  "THE ACCOMPANYING PROGRAM IS PROVIDED UNDER THE TERMS OF THIS ECLIPSE PUBLIC LICENSE (“AGREEMENT”). ANY USE, REPRODUCTION OR DISTRIBUTION OF THE PROGRAM CONSTITUTES RECIPIENT’S ACCEPTANCE OF THIS AGREEMENT.",
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
        licDesc = `### ${licenseBadges[0]}\n${licenseDesciptions[0]}`;
        break;
      case licChoice[2]:
        licDesc = `### ${licenseBadges[1]}\n${licenseDesciptions[1]}`;
        break;
      case licChoice[3]:
        licDesc = `### ${licenseBadges[2]}\n${licenseDesciptions[2]}`;
        break;
      case licChoice[4]:
        licDesc = `### ${licenseBadges[3]}\n${licenseDesciptions[3]}`;
        break;
      case licChoice[5]:
        licDesc = `### ${licenseBadges[4]}\n${licenseDesciptions[4]}`;
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
