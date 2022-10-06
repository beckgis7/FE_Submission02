let Days = true;

let dayOrder;
let dayTotal;
let weekOrder = 0;
let weekTotal = 0;
let yearOrder = 0;
let yearTotal = 0;
let weekArray = new Array();
let yearArray = new Array();

let data, table, sortCol;
let sortAsc = false;
const pageSize = 3;
let curPage = 1;

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
        console.log(data.dashboard);
        const bestSeller = data.dashboard.bestsellers;
        const weekTime = data.dashboard.sales_over_time_week;
        const yearTime = data.dashboard.sales_over_time_year;
        console.log(bestSeller);
        console.log(weekTime);
        console.log(yearTime);
        if (data.msg) {
            alert(data.msg);
        } else {
            dayOrder = weekTime[1].orders;
            dayTotal = yearTime[1].total;

            // for (var i in weekTime) {
            //     weekOrder.push([i, weekTime[i].orders]);
            //     weekTotal.push([i, weekTime[i].total]);
            // }

            // for (var i in yearTime) {
            //     yearOrder.push([i, yearTime[i].orders]);
            //     yearTotal.push([i, yearTime[i].total]);
            // }

            for (let i = 0; i < weekTime.length; i++) {
                weekOrder += weekTime[i].orders;
                weekTotal += weekTime[i].total;
                weekArray.push(weekTime[i].total);
            };
            for (let i = 0; i < yearTime.length; i++) {
                yearOrder += yearTime[i].orders;
                yearTotal += yearTime[i].total;
                yearArray.push(yearTime[i].total);
            }

            console.log(weekArray);
            console.log(yearArray);

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
        // data: weekArray,
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
        data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 90, 25],
        // data: yearArray,
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



function logout() {
    sessionStorage.clear;
    window.location = "./signin.html";
    window.location.href(`${window.location}`);
}
