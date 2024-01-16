const fs = require('node:fs');
const inquirer = require('inquirer');

const genPrompt = (pName, pMessage) => {
    return {
        name: pName,
        type: 'input',
        message: pMessage
    };
};

const licenses = {
    'Apache 2.0 License': '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    'BSD 3-Clause License': '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    'GNU GPL v3': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    'ISC License': '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)',
};

const questions = [
    genPrompt('title', 'Enter title: '),
    genPrompt('desc', 'Enter description: '),
    genPrompt('install', 'Enter installation instructions: '),
    genPrompt('usage', 'Enter usage instructions: '),
    genPrompt('cont', 'Enter contribution instructions: '),
    genPrompt('tests', 'Enter tests: '),
    {
        name: 'license',
        type: 'list',
        choices: Object.keys(licenses)
    },
    genPrompt('email', 'Enter your email: ')
];

const main = async () => {
    const {
        title,
        desc,
        install,
        usage,
        cont,
        tests,
        license,
        email
    } = await inquirer.prompt(questions);

    const mdData = `# ${title}
${licenses[license]}

${desc}

**Table of Contents**:
- [Installation](#install)
- [Usage](#usage)
- [Contributing](#cont)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

<a id="install"></a>
## Installation
${install}

<a id="usage"></a>
## Usage
${usage}

<a id="cont"></a>
## Contributing
${cont}

<a id="tests"></a>
## Tests
${tests}

<a id="license"></a>
## License
This project is licensed under the ${license}.

<a id="questions"></a>
## Questions
You can contact me via my email ${email}.
`

    await fs.writeFile('./out.md', mdData, (err) => err ? console.error(err) : console.log("Success!"));
}

main();