const inquirer = require('inquirer');
const axios = require('axios');
const fs = require("fs");

inquirer.prompt([
    {
        type: "input",
        name: "userName",
        message: "What is your GitHub username?"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "favColor",
        choices: [
            "vermillion",
            "tangerine",
            "blonde",
            "emerald",
            "azure",
            "cobalt",
            "violaceous"
        ]
    }
]).then(function (userInput) {
    console.log(`username: ${userInput.userName}`);
    console.log(`favorite color: ${userInput.favColor}`);
    const githubProfileUrl = `https://api.github.com/users/${userInput.username}`;
    console.log(githubProfileUrl);
    axios.get(githubProfileUrl)
    .then(function (response) {
        console.log(response.data);
    })
})
