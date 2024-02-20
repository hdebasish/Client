let signInSection = document.getElementById("signin-id");
let signUpSection = document.getElementById("signup-id");
let signInToggle = document.getElementById("signin-toggle");
let signUpToggle = document.getElementById("signup-toggle");
let signInEmail = document.getElementById("signin-email");
let signInPassword = document.getElementById("signin-password");
let loginForm = document.getElementById("login-form-id");
let signupForm = document.getElementById("signup-form-id");

function renderDashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.replace("/login.html");
  } else {
    window.location.replace("/index.html");
  }
}

function renderSignUp() {
  signInSection.classList.add("hide");
  signUpSection.classList.remove("hide");
  signUpToggle.classList.add("hide");
  signInToggle.classList.remove("hide");
}

function renderSignIn() {
  signUpSection.classList.add("hide");
  signInSection.classList.remove("hide");
  signInToggle.classList.add("hide");
  signUpToggle.classList.remove("hide");
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm).entries();
  const data = JSON.stringify(Object.fromEntries(formData));
  axios({
    method: "post",
    url: "https://nodejs-auth-api-zihk.onrender.com/api/users/signin",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then((result) => {
      signInEmail.value = "";
      signInPassword.value = "";
      localStorage.setItem("token", result.data);
      window.location.replace("/index.html");
    })
    .catch((err) => {
      Toastify({
        text: err.response.data,
        className: "info",
        gravity: "top",
        position: "center",
        newWindow: true,
        close: true,
        style: {
          background: "#ff3333",
        },
      }).showToast();
    });
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm).entries();
  const data = JSON.stringify(Object.fromEntries(formData));
  console.log(data);
  axios({
    method: "post",
    url: "https://nodejs-auth-api-zihk.onrender.com/api/users/signup",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then((result) => {
      signInEmail.value = "";
      signInPassword.value = "";
      renderSignIn();
    })
    .catch((err) => {
      Toastify({
        text: err.response.data,
        className: "info",
        gravity: "top",
        position: "center",
        style: {
          background: "#ff3333",
        },
      }).showToast();
    });
});

function continueWithGoogle(response) {
  const res = {
    token: response.credential,
  };
  const token = JSON.stringify(res);
  axios({
    method: "post",
    url: "https://nodejs-auth-api-zihk.onrender.com/api/users/continuewithgoogle",
    headers: { "Content-Type": "application/json" },
    data: token,
  })
    .then((result) => {
      localStorage.setItem("token", result.data);
      console.log(result.data);
      window.location.replace("/index.html");
    })
    .catch((err) => {
      Toastify({
        text: err.response.data,
        className: "info",
        gravity: "top",
        position: "center",
        style: {
          background: "#ff3333",
        },
      }).showToast();
    });
}
