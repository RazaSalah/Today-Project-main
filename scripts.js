let weather = {
  apiKey: "fa29929dddde0989e77c61dd28408d54",
  fetchWeather: function (city) {
    fetch( "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    this.apiKey)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerHTML = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
      

    document.querySelector(".weather").classList.remove("loading");
    // document.body.style.backgroundImage =
    //   "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function(){
     this.fetchWeather( document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search-button").addEventListener("click" , function(){
    weather.search();

})

document.querySelector(".search-bar").addEventListener("keyup" , function(event){
    
    if(event.key =="Enter"){
         weather.search();
        }

});

weather.fetchWeather("Dammam")

const quotes = document.querySelector(".quotes");
const auther = document.querySelector(".auther");
var quotesUrl="https://api.quotable.io/random";

let getQuote= () =>{
  fetch(quotesUrl).then((data)=>data.json())
  .then((item) =>{
    quotes.innerHTML =`<i class="fas fa-quote-left text-black"></i>` + ` `+  item.content +` ` +` <i class="fas fa-quote-right text-black"></i>`;
    auther.innerHTML = item.author;
  });
};
window.addEventListener("load" , getQuote);


let category =["General", "Business" , "Technology" , "Entertainment", "Health" , "Science","Sports"];
const newsCategory = document.querySelector(".categorise");
const APINews ="d1c7a9fd79da40bba56612495a19186f";
const next =document.querySelector("#next");

let page = 1;


for( let i =0 ; i < category.length ; i++){
  let div = document.createElement("div");
  div.innerText = category[i];
  div.addEventListener("click" , function(){
    // newsCategory.classList.remove("active");
    // div.classList.add("active");
     fetchCategoryNews(category[i]);
  });
  if(i == 0 ){
    // div.classList.add("active");
   fetchCategoryNews(category[i])
  }
  newsCategory.appendChild(div);

}

function fetchNews(category){
  
    fetch( `https://newsapi.org/v2/everything?q=${category}&from=2021-12&language=en&
    sortBy=popularity&page=${page}&apiKey=${APINews}`)

      .then((response) => response.json())
      .then((data) => this.displayNews(data.articles));
}

  
  function displayNews(data) {
    data.map((NewsValue , i) =>{
    const productBox = document.querySelector("#productCard")
    const card = document.createElement("div"); 
  
    const productCard = `
    <div class="d-flex justify-content-center row mb-5">
    <div class="col-md-10 ">
        <div class="row p-2 bg-white border rounded"> 
            <div class="col-md-3 mt-1">
               <img id="news-img"class="img-fluid img-responsive rounded product-image" src="${data[i].urlToImage}"> 
            </div>
            <div class="col-md-7 mt-1">
                 <h5 id="news-title">${data[i].title}</h5>
                <p class="text-justify para mb-0" id="news-desc">${data[i].description}<br><br></p>
                <a class="text-justify "href="${data[i].url}">More Details</a>
            </div>
                  
            </div>
        </div>
        </div>
        </div>`;
         card.innerHTML+= productCard;
         productBox.appendChild(card)
  })
}

async function fetchCategoryNews(category){

  
  productCard.innerHTML = ``  
  fetchNews(category)
  // let url = `https://newsapi.org/v2/everything?q=${category}&from=2021-12-20&language=en&
  // sortBy=popularity&page=${page}
  // &pageSize=${pageSize}&apiKey=${APINews}`
  
  //   fetch(url).then((response) => response.json())
  //   .then((data) => fetchNews(data.articles));
}

  
function retrieve(){
  const searchForm = document.querySelector("#news-search-bar").value;
  
  productCard.innerHTML = ``  
 let url = `https://newsapi.org/v2/everything?q=${searchForm}&from=2021-12-20&sortBy=popularity&apiKey=${APINews}`
   fetch(url).then((response) => response.json())
   .then((data) => displayNews(data.articles));
}
    

document.querySelector("#news-submit").addEventListener("click" , function(){
  retrieve();

})

document.querySelector("#news-search-bar").addEventListener("keyup" , function(event){
    
    if(event.key =="Enter"){
        retrieve();
        }

});


next.addEventListener("click", function(){
 page++;
 productCard.innerHTML = ``  
 fetchNews();

})


// prev.addEventListener("click", function(){
//   if(page!=1){
//     page--;

//    fetchNews();
//   }
  
//  })
