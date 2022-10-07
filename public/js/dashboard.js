let Days = true;

let dayOrder;
let dayTotal;
let weekOrder = 0;
let weekTotal = 0;
let yearOrder = 0;
let yearTotal = 0;
let weekorderArray = 0;
let weektotalArray = 0;
let yearorderArray = 0;
let yeartotalArray = 0;

let data, table, sortCol;
let sortAsc = false;
const pageSize = 3;
let curPage = 1;

let revtoggle = document.querySelector("#revtoggle").addEventListener("click", function () {
    document.querySelector(".myDays").classList.toggle("see");
    document.querySelector(".myMonths").classList.toggle("see");
});

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
        // data: [65, 59, 80, 81, 56, 55, 40],
        data: weektotalArray,
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
        // data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 90, 25],
        data: yeartotalArray,
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

async function getData(link, token_type, Method) {
    const response = await fetch(`https://freddy.codesubmit.io/${link}`, {
        headers: { "Authorization" : "Bearer " + sessionStorage.getItem(token_type) },
        method: Method
    });
    return await response.json();
}

// TABLE LOGIC 
function renderTable(block) {
    // create html
    let result = '';
    block.forEach(row => {
        result += `<tr>
     <td>${row.product["name"]}</td>
     <td>${row.created_at}</td>
     <td>${row.units}</td>
     <td>${row.revenue}</td>
     </tr>`;
    });

    document.querySelector('#catTable tbody').innerHTML = result;
}
window.onload = async function () {
    
    if (sessionStorage.getItem("access_token")) {
        const data = await getData("dashboard", "access_token","GET");
        // console.log(data.dashboard);

        const bestSeller = Object.keys(data.dashboard.bestsellers).map(key => {
            return data.dashboard.bestsellers[key];
        });
        const weekTime = Object.keys(data.dashboard.sales_over_time_week).map(key => {
            return data.dashboard.sales_over_time_week[key];
        })
        const yearTime = Object.keys(data.dashboard.sales_over_time_year).map(key => {
            return data.dashboard.sales_over_time_year[key];
        })

        console.log(bestSeller);
        console.log(weekTime);
        console.log(yearTime);
        if (data.msg) {
            alert(data.msg);
        } else {
            dayOrder = weekTime[0].orders;
            dayTotal = weekTime[0].total;

            
            
            weekorderArray = weekTime.map((value) => {
                return value.orders;
            });
            weektotalArray = weekTime.map((value) => {
                return value.total;
            });
            weekOrder = weekorderArray.reduce((a, b) => {
                return a + b;
            });
            weekTotal = weektotalArray.reduce((a, b) => {
                return a + b;
            });

            yearorderArray = yearTime.map((value) => {
                return value.orders;
            });
            yeartotalArray = yearTime.map((value) => {
                return value.total;
            });
            yearOrder = yearorderArray.reduce((a, b) => {
                return a + b;
            });
            yearTotal = yeartotalArray.reduce((a, b) => {
                return a + b;
            });

            console.log(weekOrder);
            console.log(weekTotal);
            console.log(yearOrder);
            console.log(yearTotal);

            console.log(weektotalArray);
            console.log(yeartotalArray);


            document.querySelector(".day").innerHTML = `${dayTotal}/ ${dayOrder} Orders`;
            document.querySelector(".week").innerHTML = `${weekTotal}/ ${weekOrder} Orders`;
            document.querySelector(".year").innerHTML = `${yearTotal}/ ${yearOrder} Orders`;
            renderTable(bestSeller); 

        }
        setInterval(async function () {
            newToken = await getData("refresh", "refresh_token", "POST");
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








function logout() {
    sessionStorage.clear;
    window.location = "./signin.html";
    window.location.href(`${window.location}`);
}
