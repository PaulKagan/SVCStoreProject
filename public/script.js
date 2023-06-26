const signup = () => {
  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPass").value;

  //! add check email, password, etc..
  if (password == confirmPass) {
    fetch('/signup', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('location');
        location.href = data.url
      });
    return true;
  } else {
    alert('Passwords dont match!')
    return false;
  }
}


// showing password 
function showPass() {
  const x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showCPass() {
  const x = document.getElementById("confirmPass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
  
function showEPass() {
  const x = document.getElementById("enteredPass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

