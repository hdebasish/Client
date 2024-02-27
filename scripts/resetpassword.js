let submitBtn = document.getElementById("submit-btn-id");
let passwordInput = document.getElementById("password");
let passwordCnfInput = document.getElementById("passwordcnf");
passwordInput.value = "";
passwordCnfInput.value = "";

submitBtn.addEventListener("click", async () => {
  const password = passwordInput.value;
  const cnfPassword = passwordCnfInput.value;
  let errorMsg;

  if (password.length === 0) {
    errorMsg = "Password cannot be empty";
  } else if (password.length < 8) {
    errorMsg = "Password must contain at least 8 characters";
  } else if (password) {
    if (password !== cnfPassword) {
      errorMsg = "Passwords do not match";
    }
  }

  if (errorMsg) {
    Toastify({
      text: errorMsg,
      className: "info",
      gravity: "top",
      position: "center",
      newWindow: true,
      close: true,
      style: {
        background: "#ff3333",
      },
    }).showToast();

    passwordInput.value = "";
    return;
  }

  const queryString = window.location.search;
  
  const urlParams = new URLSearchParams(queryString);

  const token = urlParams.get("token");

  const data = JSON.stringify({ password: password, token: token });

  console.log(data);

  submitBtn.classList.add("hide");
  document.getElementById("submit-btn-sending").classList.remove("hide");

  axios({
    method: "post",
    url: "https://nodejs-auth-api-zihk.onrender.com/api/users/resetpassword",
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
      passwordInput.value = "";
      passwordCnfInput.value = "";
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
