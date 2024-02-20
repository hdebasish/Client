let submitBtn = document.getElementById("submit-btn-id");
let emailInput = document.getElementById("email");
emailInput.value = "";
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

submitBtn.addEventListener("click", async () => {
  const email = emailInput.value;

  if (email.length === 0) {
    Toastify({
      text: "Please Enter your email",
      className: "info",
      gravity: "top",
      position: "center",
      newWindow: true,
      close: true,
      style: {
        background: "#ff3333",
      },
    }).showToast();
    return;
  }

  if (!validateEmail(email)) {
    Toastify({
      text: "Invalid Email Format! Please check and try again.",
      className: "info",
      gravity: "top",
      position: "center",
      newWindow: true,
      close: true,
      style: {
        background: "#ff3333",
      },
    }).showToast();

    emailInput.value = "";
    return;
  }

  const data = JSON.stringify({ email: email });

  submitBtn.classList.add("hide");
  document.getElementById("submit-btn-sending").classList.remove("hide");

  axios({
    method: "post",
    url: "https://nodejs-auth-api-zihk.onrender.com/api/users/sendverificationemail",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then((result) => {
      document.getElementById("status").innerText = result.data;
      document.getElementById("status-wrapper-id").classList.remove("hide");
      document.getElementById("change-password-form").classList.add("hide");
    })
    .catch((err) => {
      document.getElementById("submit-btn-sending").classList.add("hide");
      submitBtn.classList.remove("hide");
      emailInput.value = "";
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
