function login() {
  const nameEl = document.querySelector('#userName');
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "game.html";
}