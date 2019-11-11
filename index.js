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
            "sanguine",
            "tangerine",
            "blonde",
            "vert",
            "azure",
            "cobalt",
            "violaceous"
        ]
    }
];

function betterColors(colorName) {
    switch (colorName) {
        case "sanguine":
            return "#cc0000";
            break;
        case "tangerine":
            return "#ff471a";
            break;
        case "blonde":
            return "#ffb84d";
            break;
        case "vert":
            return "#166941";
            break;
        case "azure":
            return "#0086b3";
            break;
        case "cobalt":
            return "#003cb3";
            break;
        case "violaceous":
            return "#8000ff";
            break;
        default:
            return "black";
    }

}

function createMarkdown(githubProfileData) {
    function returnMD(err) {
        if (err) {
            return console.log(err);
        }
        console.log("success!");
    }
    function formatMD() {
        return `#<span style="color:${betterColors(githubProfileData.color)};">${githubProfileData.name}</span> 
---
>
>![picture](${githubProfileData.avatar_url})
>
>**Bio:** ${githubProfileData.bio}
>
>**Location:** ${githubProfileData.location}
>
>**Company:** ${githubProfileData.company}
>
>**Public Repositories:** ${githubProfileData.public_repos}
>
>**Followers:** ${githubProfileData.followers}
>
>**Following:** ${githubProfileData.following}
>
`;
    }
    fs.writeFile("profile.md", formatMD(), returnMD)
}

function handleInput(userInput) {

    const githubProfileUrl = `https://api.github.com/users/${userInput.userName}`;

    console.log(githubProfileUrl);

    axios.get(githubProfileUrl)
        .then(({ data }) => {
            createMarkdown({ color: userInput.favColor, ...data })
        })
}

inquirer.prompt(inqQuestions).then(handleInput)
