function renderDashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.replace("/login.html");
  } else {
    axios({
      method: "get",
      url: "https://nodejs-auth-api-zihk.onrender.com/api/dashboard",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((result) => {
        document.getElementById("container").classList.remove("hide");
        document.getElementById("wlcm-msg").innerText = result.data;
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
        window.location.replace("/login.html");
      });
  }
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("/login.html");
});
