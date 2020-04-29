const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");

let gitHubUserData;
let gitHubRepos;
let selectedRepo;

// Verify that a given GitHub exists and has at least one repo
function verifyGitHubAccount(username) {

    return new Promise((resolve,reject) => {

        url = `https://api.github.com/users/${username}`;

        // User GitHubUser Data
        axios
        .get(url)
        .then(resp => {

            gitHubUserData = resp.data;

            return resp.data.repos_url;
        })
        .catch(err => {
            reject(new Error(`GitHub username ${username} does not exist`));
        })
        // Get user's repo data
        .then(reposUrl => {
        
            axios
            .get(reposUrl)
            .then(resp => {

                const reposData = resp.data;

                if(reposData.length === 0){
                    reject(new Error(`GitHub user ${username} has no repos`));
                }

                gitHubRepos = reposData;
                
                questions[1].choices = reposData.map(repo => repo.name);

                resolve(true);
            })
        })
    })
}

// Filter callback for repo selection question. Sets defaults for subsequent
// questions based on selected repo
function setRepoDefaults(repoName) {

    return new Promise((resolve,reject) => {

        selectedRepo = gitHubRepos.find(repo => repo.name == repoName);

        // Set repo name and description as defaults for Title and Description 
        // question
        questions[2].default = selectedRepo.name;
        questions[3].default = selectedRepo.description;

        // Get contributors and tags from repo
        axios
        .all([
            axios.get(selectedRepo.contributors_url),
            axios.get(selectedRepo.tags_url)
        ])
        .then(respArr => {
            // Set repo contributors as default for Contributors question
            questions[7].default = respArr[0].data.map(contributor => contributor.login).join(',');

            resolve(true);
        })
        .catch(err => {
            reject(new Error("Could not set defaults"));
        });
    })
}

const questions = [
    {
        name: "username",
        message: "What is your GitHub username?",
        default: "joel-clifford-bootcamp",
        validate: verifyGitHubAccount
    },
    {
        type: "list",
        name: "repoName",
        message: "Select the project repo:",
        filter:setRepoDefaults
    },
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
        choices: ["copyleft","lpgl","MIT","permissive","proprietary","public"]
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

    inquirer.prompt(questions).then(resp => {


    });
}

init();
