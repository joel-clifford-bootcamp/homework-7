module.exports.getReadMe = (userData,repoData,responses) => {

return `#${responses.title}

${responses.description}

##Contents




##Installation Instructions
${responses.installation}

##Usage
${responses.usage}

License: ${responses.license}

##Contributors
${responses.contributors}

##Tests
${responses.tests}

##Questions
Contatct: ${userData.login};
![profile image]
(${userData.avatar_url})

Email: ${userData.email}
`
}