module.exports.getReadMe = (userData,repoData,responses) => {

return `# ${responses.title}

${responses.description}

### Contents
1. [Installation Instructions](#installation-instructions)
2. [Usage](#usage)
3. [Contributors](#contributors)
4. [Tests](#tests)
5. [Questions](#questions)

### Installation Instructions
${responses.installation}

### Usage
${responses.usage}

License: ${responses.license}

### Contributors
${responses.contributors}

### Tests
${responses.tests}

### Questions
Contatct: ${userData.login}
![profile image](${userData.avatar_url})

Email: [${userData.email}](mailto:${userData.email}?subject=[GitHub]${responses.title.replace(" ","%20")})
`
}