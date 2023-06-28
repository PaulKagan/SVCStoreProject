const signup = () => {
  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPass").value;
  const agree = document.getElementById("b").checked;

  if (!agree) {
    alert('Please agree to TOS & PP.')
    return false;
  }
  if (userName.length < 3) {
    alert('Name must be 3 or more charecters.');
    return false;
  } 
  //! disabled for easier testing.
  // else if (password.length < 8 || password == password.toLowerCase() || password == password.toUpperCase()) {
  //   alert('The password must be at least 8 characters, and contain lower & upper case letters.');
  //   return false;
  // } 
  else if (password == confirmPass) {
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
        if (!data.isCorrect) {
          alert(data.message);
          return false;
        } else if (data.isExists) {
          alert(data.message);
          return false;
        } else{
          location.href = data.url
        }
      });
    return true;
  } else {
    alert('Passwords dont match!')
    return false;
  }
};


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

