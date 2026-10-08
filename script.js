// Explorer 
const profileScreen = document.querySelector(".profile-info");
const repoScreen = document.querySelector(".repos");

const username = document.getElementById("username")
const Get = document.getElementById("get-details");

Get.addEventListener("click", async event => {

    event.preventDefault();

    try{
        if(username.value){
            //  this method below is to get one then the other

            // const userData = await getData()
            // renderProfile(userData);

            // const userRepo = await getRepo()
            // renderRepo(userRepo);

            // but this get them at once

            const [userData, userRepo] = Promise.all([
                getData(),
                getRepo()
            ])

            renderProfile(userData)
            renderRepo(userRepo)
        }
    }catch(error){
        throw new Error("couldn't get data")
    }
})

async function getData(){
    const API = `https://api.github.com/users/${username.value}`;

    const response = await fetch(API)
    // console.log(response)
    const data = response.json();
    console.log(data);
    return data;
}

async function getRepo() {
    const repoUrl = `https://api.github.com/users/${username.value}/repos`;

    const reponse = await fetch(repoUrl)
    const data = reponse.json()
    console.log(data)
    return data;
}

function renderProfile(data){
    profileScreen.innerHTML = "";

    const {avatar_url, bio, name, email, login, blog, url} = data;

    const displayProfile = document.createElement("div");
    displayProfile.classList.add("profile")
    displayProfile.innerHTML = `
        <img src="${avatar_url}">
        <h1> ${name} </h1>
        <h3> <strong> username: </strong> ${login}</h3>
        <p> <strong> Email: </strong> ${email}</p>
        <p> <strong> Blog: </strong> ${blog}</p>
        <p> <strong> Bio: </strong> ${bio}</p>
        <p> ${url}</p>
    `;
    profileScreen.appendChild(displayProfile);

}

function renderRepo(info){
    repoScreen.innerHTML = "";

    info.forEach(i => {
        
        const displayRepo = document.createElement("div");
        displayRepo.classList.add("repo-display")
        displayRepo.innerHTML = `
        <h2> ${i.name}</h2>
        <h3> ${i.full_name} </h3>
        <a href="${i.html_url}" target="_blank" rel="noopener noreferrer">
            🔗 Open on GitHub
        </a>
        `;
        repoScreen.appendChild(displayRepo)
    });
}
