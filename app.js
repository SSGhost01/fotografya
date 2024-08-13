const form = document.querySelector("#form");
const formWrapper = document.querySelector(".form-wrapper");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector("imagelist-wrapper");
const buttonWrapper = document.querySelector("buttonWrpapper");

form.addEventListener("submit", search);
//ekran temizleme
clearButton.addEventListener("click", clear);

function clear() {
  searchInput.value="";
  imageListWrapper.innerHTML=""
}

function search(e) {
  //burada inputa girilen değeri alıyoruz
  const value = searchInput.value.trim();
  //burada siteden gelen apiyi çekiyoruz
  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID t6zuB6djZXxIumXWnqmh_Q4akXDFxlh0JGgNnWtJpM8 ",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        addImageToUI(image.urls.small);
      });
    })
    .catch((error) => console.log(error));

  e.preventDefault();
}

//ekrana apiden gelen resimleri basma
function addImageToUI(url) {
  const div = document.createElement("div");
  div.className = "card";
  //burada img elementini oluşturduk
  const img = document.createElement("img");
  img.setAttribute("src", url);
  //div içine imgyi yerleştirdik
  div.appendChild(img);
  imageListWrapper.appendChild(div);
}
