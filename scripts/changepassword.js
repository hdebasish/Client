let submitBtn = document.getElementById("submit-btn-id");
let passwordCurrInput = document.getElementById("currpassword");
let passwordInput = document.getElementById("password");
let passwordCnfInput = document.getElementById("passwordcnf");
passwordInput.value = "";
passwordCnfInput.value = "";
passwordCurrInput.value = "";

submitBtn.addEventListener("click", async () => {
  const currpassword = passwordCurrInput.value;
  const password = passwordInput.value;
  const cnfPassword = passwordCnfInput.value;
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.replace("/login.html");
  }
  let errorMsg;

  if (password.length === 0 || currpassword.length === 0 || cnfPassword.length === 0) {
    errorMsg = "Password cannot be empty";
  } else if (password.length < 8 || currpassword.length < 8 || cnfPassword.length < 8) {
    errorMsg = "Password must contain at least 8 characters";
  } else if (password && currpassword && cnfPassword) {
    if(password === currpassword){
      errorMsg = "Old and new passwords are the same.";
    }
    else if (password !== cnfPassword) {
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
    passwordCurrInput.value = "";
    passwordCnfInput.value = "";
    return;
  }

  
  const data = JSON.stringify({ oldPassword: currpassword, newPassword: password, cnfPassword: cnfPassword });

  submitBtn.classList.add("hide");
  document.getElementById("submit-btn-sending").classList.remove("hide");

  axios({
    method: "post",
    url: "https://nodejs-auth-api-zihk.onrender.com/api/users/changepassword",
    headers: { "Content-Type": "application/json", Authorization: token },
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
      passwordCurrInput.value = "";
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
