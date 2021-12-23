let weather = {
  apiKey: "fa29929dddde0989e77c61dd28408d54",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
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
  search: function () {
    this.fetchWeather(document.querySelector("#weather-search-bar").value);
  },
};

document
  .querySelector("#weather-submit")
  .addEventListener("click", function () {
    weather.search();
  });

document
  .querySelector("#weather-search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Dammam");

const quotes = document.querySelector(".quotes");
const auther = document.querySelector(".auther");
var quotesUrl = "https://api.quotable.io/random";
let categoryArray = [
  "General",
  "Business",
  "Technology",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
];
let category;
let page = 1;
const newsCategory = document.querySelector(".categorise");
const APINews = "5a81862cb1fd44e9abafb1890b7e2ce9";
const url = `https://newsapi.org/v2/everything?q=all&from=2021-12&language=en&page=${page}&apiKey=${APINews}`
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");


let getQuote = () => {
  fetch(quotesUrl)
    .then((data) => data.json())
    .then((item) => {
      quotes.innerHTML =
        `<i class="fas fa-quote-left text-black"></i>` +
        ` ` +
        item.content +
        ` ` +
        ` <i class="fas fa-quote-right text-black"></i>`;
      auther.innerHTML = item.author;
    });
};
window.addEventListener("load", getQuote);

for (let i = 0; i < categoryArray.length; i++) {
  let div = document.createElement("div");
  div.innerText = categoryArray[i];
  div.addEventListener("click", function () {
    
    fetchCategoryNews(categoryArray[i]);
    category = categoryArray[i];
  });
  if (i == 0) {
   
    fetchCategoryNews(categoryArray[i]);
  }
  newsCategory.appendChild(div);
}

function fetchNews(url) {
    fetch(url)
    .then((response) => response.json())
    .then((data) => this.displayNews(data.articles));
}

function displayNews(data) {
  data.map((NewsValue, i) => {
    const productBox = document.querySelector("#productCard");
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
    card.innerHTML += productCard;
    productBox.appendChild(card);
  });
}

async function fetchCategoryNews(category) {
  productCard.innerHTML = ``;

  if (category == "Business") {
    fetchNews(`https://newsapi.org/v2/everything?q=Business&from=2021-12&language=en&page=${page}&apiKey=${APINews}`);
  } else if (category == "Technology") {
    fetchNews(`https://newsapi.org/v2/everything?q=Technology&from=2021-12&language=en&page=${page}&apiKey=${APINews}`);
  } else if (category == "Entertainment") {
    fetchNews(`https://newsapi.org/v2/everything?q=Entertainment&from=2021-12&language=en&page=${page}&apiKey=${APINews}`);
  } else if (category == "Health") {
    fetchNews(`https://newsapi.org/v2/everything?q=Health&from=2021-12&language=en&page=${page}&apiKey=${APINews}`);
  } else if (category == "Science") {
    fetchNews(`https://newsapi.org/v2/everything?q=Science&from=2021-12&language=en&page=${page}&apiKey=${APINews}`);
  } else if (category == "Sports") {
    fetchNews(`https://newsapi.org/v2/everything?q=Sports&from=2021-12&language=en&page=${page}&apiKey=${APINews}`);
  } else {
    fetchNews(`https://newsapi.org/v2/everything?q=all&from=2021-12&language=en&page=${page}&apiKey=${APINews}`);
  }
 
}

function retrieve() {
  const searchForm = document.querySelector("#news-search-bar").value;

  productCard.innerHTML = ``;
  let url = `https://newsapi.org/v2/everything?q=${searchForm}&from=2021-12-20&sortBy=popularity&apiKey=${APINews}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayNews(data.articles));
}

document.querySelector("#news-submit").addEventListener("click", function () {
  retrieve();
});

document
  .querySelector("#news-search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      retrieve();
    }
  });

next.addEventListener("click", function () {
  if (page < 5) {
    if (category == "Business") {
      productCard.innerHTML = ``;
      page++;
      fetchCategoryNews(category);
      
    } else if (category == "Technology") {
      productCard.innerHTML = ``;
      page++;
      fetchCategoryNews(category);
      
    } else if (category == "Entertainment") {
      productCard.innerHTML = ``;
      page++;
      fetchCategoryNews(category);
     
    } else if (category == "Health") {
      productCard.innerHTML = ``;
      page++;
      fetchCategoryNews(category);
      
    } else if (category == "Science") {
      productCard.innerHTML = ``;
      page++;
      fetchCategoryNews(category);
      
    } else if (category == "Sports") {
      productCard.innerHTML = ``;
      page++;
      fetchCategoryNews(category);
      
    }else {
      productCard.innerHTML = ``;
      page++;
      fetchCategoryNews(category);
     
    }
  } else if(page >= 5) {
    page=5;
  }
});

prev.addEventListener("click", function(){
  if (page > 1) {
   if (category == "Business") {
      productCard.innerHTML = ``;
      page--;
      fetchCategoryNews(category);
      
    } else if (category == "Technology") {
      productCard.innerHTML = ``;
      page--;
      fetchCategoryNews(category);
      
    } else if (category == "Entertainment") {
      productCard.innerHTML = ``;
      page--;
      fetchCategoryNews(category);
     
    } else if (category == "Health") {
      productCard.innerHTML = ``;
      page--;
      fetchCategoryNews(category);
      
    } else if (category == "Science") {
      productCard.innerHTML = ``;
      page--;
      fetchCategoryNews(category);
      
    } else if (category == "Sports") {
      productCard.innerHTML = ``;
      page--;
      fetchCategoryNews(category);
      
    }  else {
      productCard.innerHTML = ``;
      page--;
      fetchCategoryNews(category);
     
    } 
  }
});