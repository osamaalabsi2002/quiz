let youtubeContainer = document.querySelector(".youtubeContainer");
let search = `html css js quiz`;
let paraWelcome = document.querySelector(".paraAboveImage")

console.log(youtubeContainer);
// fetchYoutubeVideo(search);
function fetchYoutubeVideo(search) {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${search}&key=AIzaSyBx66h7lf4-GtFHkQTFIUuKbiwF6ucbMnM`
  )
    .then((response) => {
      console.log("entered res"); // debug
      if (!response.ok) throw Error(` response error : ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log("entered data"); // debug
      console.log(data.items[0]); // debug
      // console.log(data.items[0].snippet.title)// debug
      // console.log(data.items[0].snippet.description)// debug
      createYoutubeVideo(data.items[0]);
    })
    .catch((err) => {
      console.log(`Error : ${err}`);
    });
}
function createYoutubeVideo(data) {
  console.log("entered create"); // debug
  // console.log(data.items.snippet.title)// debug
  // console.log(data.items.snippet.description)// debug
  let newVideo = document.createElement("div");
  newVideo.classList.add = `flexYoutubeContainer`;
  newVideo.innerHTML = `
    <div class="video">
    <iframe
    class="youtubeVideo"
    width="600" 
    height="350" 
    src="https://www.youtube.com/embed/${data.id.videoId}" 
    frameborder="0" 
    allowfullscreen>
    </iframe>
    <div class="textYoutube">
          <p class="videoTitle">${data.snippet.title}</p>
          <p class="videoDesc">${data.snippet.description}</p>
        </div>
        </div>
    `;
  youtubeContainer.appendChild(newVideo);
  console.log("entered created"); // debug
}
// ${data.items.snippet.thumbnails.default.url}

// htmlButton.addEventListener("click", () => {
//     localStorage.setItem("url", "htmlQus.json")
// })
// cssButton.addEventListener("click", () => {
//     localStorage.setItem("url", "cssQus.json")
// })
// jsButton.addEventListener("click", () => {
//     localStorage.setItem("url", "jsQus.json")
// })

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("id") && sessionStorage.getItem("name")) {
    document.querySelector("#signUpLogOut").textContent = "Log Out";
    document.querySelector("#signUpLogOut").addEventListener("click", () => {
      sessionStorage.clear();
      location.reload();
    });
  } else {
    document.querySelector("#signUpLogOut").textContent = "Sign Up";
    document.querySelector("#signUpLogOut").addEventListener("click", () => {
      window.location = "../register/register.html";
    });
  }
});

document.querySelector("#htmlButton").addEventListener("click", () => {
  if (sessionStorage.getItem("id") && sessionStorage.getItem("name")) {
    localStorage.setItem("url", "htmlQus.json");
    window.location = "../quiz/quiz.html";
  } else {
    window.location = "../register/register.html";
  }
});

document.querySelector("#cssButton").addEventListener("click", () => {
  if (sessionStorage.getItem("id") && sessionStorage.getItem("name")) {
    localStorage.setItem("url", "cssQus.json");
    window.location = "../quiz/quiz.html";
  } else {
    window.location = "../register/register.html";
  }
});

document.querySelector("#jsButton").addEventListener("click", () => {
  if (sessionStorage.getItem("id") && sessionStorage.getItem("name")) {
    localStorage.setItem("url", "jsQus.json");
    window.location = "../quiz/quiz.html";
  } else {
    window.location = "../register/register.html";
  }
});

document.querySelector("#frontButton").addEventListener("click", () => {
  if (sessionStorage.getItem("id") && sessionStorage.getItem("name")) {
    localStorage.setItem("url", "frontQus.json");
    window.location = "../quiz/quiz.html";
  } else {
    window.location = "../register/register.html";
  }
});
window.onload = () => {

  if (sessionStorage.getItem("name")) {
    let name = sessionStorage.getItem("name")
    let welcomeMsg = document.querySelector(".welcomeMsg")
    welcomeMsg.classList.add("upHome")
    welcomeMsg.innerHTML = ` Welcome , ${name}
  `
  }
} 