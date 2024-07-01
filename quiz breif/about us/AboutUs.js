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
