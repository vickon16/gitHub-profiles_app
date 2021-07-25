
const APIUrl = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(user) {
  const resp = await (await fetch(APIUrl + user)).json();
  
  createUserCard(resp);
}

async function getRepos(user) {
  const resp = await (await fetch(APIUrl + user + "/repos")).json();

  addReposToCard(resp)
}

function createUserCard(user) {
  const cardInnerHTML = `
    <div class="card">
      <div class="image-div">
        <img src="${user.avatar_url}" class="avatar" alt="" />
      </div>
      <div class="user-content">
        <h2>${user.name}</h2>
        <p class="id">${user.id}</p>
        <p class= "bio">${user.bio}</p>
        <ul class="info">
          <li>${user.followers} <strong> Followers</strong></li>
          <li>${user.following} <strong> Following</strong></li>
          <li>${user.public_repos} <strong> Repos</strong></li>
        </ul>
      </div>

      <h3 class="repos-header">Repos</h3>
      <div class="repos"></div>
    </div>
  `

  main.innerHTML = cardInnerHTML;
}

function addReposToCard(repos) {
  const reposEl = document.querySelector(".repos");
  repos
  .sort((a, b) => b.stargazers_count - a.stargazers_count)
  .slice(0, 10)
  .forEach(repo => {
    const aTag = document.createElement("a");
    aTag.classList.add("repo");
    aTag.href = repo.html_url;
    aTag.target = "_blank";
    aTag.innerText = repo.name;

    reposEl.appendChild(aTag);
  })
  console.log(repos)
  // reposEl.innerHTML = repos;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);

    getRepos(user);

    search.value = "";
  }
})
