let Days = true;
let revtoggle = document.querySelector("#revtoggle").addEventListener("click", function () {
    document.querySelector(".myDays").classList.toggle("see");
    document.querySelector(".myMonths").classList.toggle("see");
});

async function getData(link, token_type, Method) {
    const response = await fetch(`https://freddy.codesubmit.io/${link}`, {
        headers: { "Authorization" : "Bearer " + sessionStorage.getItem(token_type) },
        method: Method
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
        const data = getData("dashboard", "access_token","GET");
        console.log(data);
        if (data.msg) {
            alert(data.msg);
        } else {

        }
        setInterval(function () {
            newToken = getData("refresh", "refresh_token", "POST");
            console.log(newToken);
            if (newToken.msg) {
                alert(newToken.msg);
            } else {
                sessionStorage.setItem("access_token", data.access_token);
            }
        }, 900000);
    } else {
        window.location = "./signin.html";
        window.location.href(`${window.location}`);
    }
}




const day_labels = [
    'today',
    'yesterday',
    'day3',
    'day4',
    'day5',
    'day6',
    'day7',
];
const month_labels = [
    'this month',
    'last month',
    'month 3',
    'month 4',
    'month 5',
    'month 6',
    'month 7',
    'month 8',
    'month 9',
    'month 10',
    'month 11',
    'month 12'
];

const day_data = {
    labels: day_labels,
    datasets: [{
        label: "Revenue (last 7 days)",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
        barThickness: 30
    }]
};

const month_data = {
    labels: month_labels,
    datasets: [{
        label: "Revenue (12 Months)",
        data: [10, 20, 30, 40, 50, 60, 70, 40, 50, 60, 70, 85],
        backgroundColor: [
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
        barThickness: 30
    }]
};



