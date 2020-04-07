const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

let gitHubUserData;
let gitHubRepos;
let selectedRepo;

const questions = [
    {
        name: "title",
        message: "Enter a project title:",
    },
    {
        name: "description",
        message: "Enter a project description:",
    },
    {
        name: "installation",
        message: "Enter installation instructions:"
    },
    {
        name: "usage",
        message: "Enter usage directions:"
    },
    {
        type: "list",
        name: "lisence",
        message: "Select license type:",
        choices: ["public","permissive","lpgl","copyleft","proprietary"]
    },
    {
        name: "contributing",
        message: "Enter contibutors:"
    },
    {
        name: "tests",
        message: "Enter tests:"
    }
];

function writeToFile(fileName, data) {
}

function init() {

    inquirer.prompt({
            name: "username",
            message: "What is your GitHub username?",
            default: "joel-clifford-bootcamp"
        })
        // Retrieve repo corresponding to username
        .then(resp => {

            const username = resp.username;

            url = `https://api.github.com/users/${username}`;

            axios.get(url).then(resp => {
            
            gitHubUserData = resp.data;

            return resp.data;

        })
        .then(resp => {

            reposUrl = resp.repos_url;

            // Get list of user's repos
            axios.get(reposUrl).then(resp => {

            gitHubRepos = resp.data;

            const repoPrompt = [{type: "list",
                name: "repoName",
                message: "Select the project repo:",
                choices: resp.data.map(repo => repo.name)}];

            // Prompt user to select which repo the README is for
            inquirer.prompt(repoPrompt).then(resp => {

                selectedRepo = gitHubRepos.find(repo => repo.name == resp.repoName);

                // Set repo name and description as defaults for Title and Description 
                // question
                questions[0].default = selectedRepo.name;
                questions[1].default = selectedRepo.description;

                // Get contributors and tags from repo
                axios.all([
                    axios.get(selectedRepo.contributors_url),
                    axios.get(selectedRepo.tags_url)

                ]).then(respArr => {

                    // Set repo contributors as default for Contributors question
                    questions[5].default = respArr[0].data.map(contributor => contributor.login).join(',');

                    inquirer.prompt(questions).then(resp => {
                    
                        
                })
            })
        })
    })
})
        .catch(error => {

            console.log(`Username '${answer.username}' not found!`);

        });
    });

}

init();


