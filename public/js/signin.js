
// Login user check
async function signIn(event) {
    sessionStorage.clear;
    let uname = document.querySelector("#username").value;
    let pwd = document.querySelector("#password").value;
    if (uname == '') {
        alert("Please enter username.");
    }
    else if (pwd == '') {
        alert("Please enter the password.");
    }
    else if (pwd.length < 5) {
        alert("Password min length is 5.");
    }
    else {
        const payload = {
            "username": uname,
            "password": pwd
        }
        const response = await fetch('https://freddy.codesubmit.io/login', {
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("refresh_token", data.refresh_token);
        console.log(data);
        if (sessionStorage.getItem("access_token")) {
            alert('Login Successful Redirecting...');
            //Redirecting to dashboard.
            window.setTimeout(
                function () {
                    window.location = "./dashboard.html";
                    window.location.href(`${window.location}`);
                }, 2000);
            
            return false;
        } else if (data.msg) {
            alert(data.msg);
        } else {
            alert("Wrong Username or Password");
        }

    }
}
const login = document.querySelector("#login");
login.addEventListener('click', signIn);