(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    document.querySelector('.playerName').textContent = userName;
    console.log("setting display1");
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'flex');
  } else {
    console.log("setting display2");
    setDisplay('loginControls', 'flex');
    setDisplay('playControls', 'none');
  }
})();

async function loginUser() {
  console.log("Login button pressed");
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  console.log("createUser button pressed");
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#userPassword')?.value;
  console.log(userName);
  console.log(password);
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    console.log("response was ok");
    localStorage.setItem('userName', userName);
    window.location.href = 'play.html';
  } else {
    const body = await response.json();
    alert(`⚠ Error: ${body.msg}`);
  }
}

function play() {
  window.location.href = 'game.html';
}

function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
  let scores = [];
  // See if we have a user with the given email.
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  console.log("in setDisplay");
  console.log(`.${controlId}`);
  const playControlEl = document.querySelector(`.${controlId}`);
  if (playControlEl) {
    console.log("setting display")
    playControlEl.style.display = display;
  }
}
