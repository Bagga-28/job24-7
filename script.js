const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupbtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");

loginBtn.onclick = () => loginModal.style.display = "block";
signupBtn.onclick = () => registerModal.style.display = "block";

closeLogin.onclick = () => loginModal.style.display = "none";
closeRegister.onclick = () => registerModal.style.display = "none";

window.onclick = (e) => {
  if (e.target == loginModal) loginModal.style.display = "none";
  if (e.target == registerModal) registerModal.style.display = "none";
};
