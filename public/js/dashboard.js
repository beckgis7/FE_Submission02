async function getData(token_type) {
    const response = await fetch('https://freddy.codesubmit.io/dashboard', {
        headers: { "Authorization": "Bearer " + sessionStorage.getItem(token_type) },
        method: 'GET'
    });
    const data = await response.json();
    if (data.data) {
        console.log(data);
    } else if (data.msg) {
        alert(data.msg);
    }
}

function logout() {
    sessionStorage.clear;
    window.location = "./signin.html";
    window.location.href(`${window.location}`);
}

window.onload = function () {
    if (sessionStorage.getItem("access_token")) {
        getData("access_token");
        setInterval(function () { getData("refresh_token") }, 900000);
    } else {
        window.location = "./signin.html";
        window.location.href(`${window.location}`);
    }
}