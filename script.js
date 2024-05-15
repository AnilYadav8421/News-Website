const API = "b5da6c4372c243d78709ddb2eccb8029";
const url = "https://newsapi.org/v2/everything?q=";
// const url = "https://newsapi.org/v2/everything?q=apple&from=2024-05-13&to=2024-05-13&sortBy=popularity&apiKey=b5da6c4372c243d78709ddb2eccb8029";

window.addEventListener("load", ()=> fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API}`);
    // const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${key}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplet = document.getElementById('template-card');

    cardContainer.innerHTML = '';

    articles.forEach((Article) =>{
        if(!Article.urlToImage) return;
        const cardClone = newsCardTemplet.content.cloneNode(true);
        filldataInCard(cardClone, Article);
        cardContainer.appendChild(cardClone, Article);
    });
}

function filldataInCard(cardClone, Article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src =Article.urlToImage;
    newsTitle.innerHTML = Article.title;
    newsDesc.innerHTML = Article.description;

    const date = new Date(Article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});

    newsSource.innerHTML = `${Article.source.name} | ${date}`;

    cardClone.firstElementChild.addEventListener('click', () =>{
        window.open(Article.url, "_blank");
    });
}

let currentLink = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentLink?.classList.remove('active');
    currentLink = navItem;
    currentLink.classList.add('active');
}

const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchIpt");

searchButton.addEventListener("click", () =>{
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    currentLink?.classList.remove("active");
    currentLink = null;
});