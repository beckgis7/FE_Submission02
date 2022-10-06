async function getData(link, token_type) {
    const response = await fetch(`https://freddy.codesubmit.io/${link}`, {
        headers: { "Authorization": "Bearer " + sessionStorage.getItem(token_type) },
        method: 'GET'
    });
    return await response.json();
}

function logout() {
    sessionStorage.clear;
    window.location = "./signin.html";
    window.location.href(`${window.location}`);
}

window.onload = function () {
    if (sessionStorage.getItem("access_token")) {
        const data = getData("dashboard", "access_token");
        if (data.data) {
            console.log(data);
        } else if (data.msg) {
            alert(data.msg);
        } else {
            alert("Sorry Something went wrong");
        }
        setInterval(function () {
            newToken = getData("refresh", "refresh_token");
            if (newToken.access_token) {
                sessionStorage.setItem("access_token", data.access_token);
                console.log(newToken);
            } else if (newToken.msg) {
                alert(newToken.msg);
            } else {
                alert("Sorry Something went wrong");
            }
        }, 900000);
    } else {
        window.location = "./signin.html";
        window.location.href(`${window.location}`);
    }
}