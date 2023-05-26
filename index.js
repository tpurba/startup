function login() {
  const nameEl = document.querySelector('#userName');
  if (nameEl) {
    localStorage.setItem("userName", nameEl.value);
    console.log(localStorage.getItem("userName"));
    window.location.href = "game.html";
  } else {
    localStorage.setItem("userName", "MysteryPlayer");
    window.location.href = "game.html";
  }
}