const inquirer = require('inquirer');
const axios = require('axios');
const fs = require("fs");

const inqQuestions = [
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
];

function createMarkdown({data:githubProfileData}=response
    ){
    console.log(githubProfileData);
    function returnMD(err){
        if (err){
            return console.log (err);
        }
        console.log("success!");
    }
    function formatMD(){
        
    }
    fs.writeFile("profile.md", githubProfileData, returnMD)
}

function handleInput(userInput){

    const githubProfileUrl = `https://api.github.com/users/${userInput.userName}`;
    
    console.log(githubProfileUrl);

    axios.get(githubProfileUrl)
    .then(createMarkdown)
}

inquirer.prompt(inqQuestions).then(handleInput)
