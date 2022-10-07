let current_page = 1;
const records_per_page = 10;
let totalPages = 0;
let intDATA = null;

let Days;
let Months;

let listing_table = document.querySelector('#catTable tbody');
const btn_next = document.getElementById("btn_next");
const btn_prev = document.getElementById("btn_prev");
let page_at = document.getElementById("page_at");
let page_total = document.getElementById("page_total");

let dayOrder;
let dayTotal;
let bestSeller;
let weekTime;
let yearTime;
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

window.onload = async function () {

    if (sessionStorage.getItem("access_token")) {
        intDATA = await getData("dashboard", "access_token", "GET");
      // console.log(intDATA.dashboard);

        bestSeller = Object.keys(intDATA.dashboard.bestsellers).map(key => {
            return intDATA.dashboard.bestsellers[key];
        });
        weekTime = Object.keys(intDATA.dashboard.sales_over_time_week).map(key => {
            return intDATA.dashboard.sales_over_time_week[key];
        })
        yearTime = Object.keys(intDATA.dashboard.sales_over_time_year).map(key => {
            return intDATA.dashboard.sales_over_time_year[key];
        })

      // console.log(bestSeller);
      // console.log(weekTime);
      // console.log(yearTime);
        if (intDATA.msg) {
            alert(intDATA.msg);
        } else {
            dayOrder = weekTime[0].orders;
            dayTotal = weekTime[0].total;

            weekorderArray = weekTime.map((value) => {
                return value.orders;
            });
            weektotalArray = weekTime.map((value) => {
                return value.total;
            });
            Days = weektotalArray;
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
            Months = yeartotalArray;
            yearOrder = yearorderArray.reduce((a, b) => {
                return a + b;
            });
            yearTotal = yeartotalArray.reduce((a, b) => {
                return a + b;
            });

            // console.log(weekOrder);
            // console.log(weekTotal);
            // console.log(yearOrder);
            // console.log(yearTotal);

            // console.log(weektotalArray);
            // console.log(yeartotalArray);

            document.querySelector(".day").innerHTML = `${dayTotal}/ ${dayOrder} Orders`;
            document.querySelector(".week").innerHTML = `${weekTotal}/ ${weekOrder} Orders`;
            document.querySelector(".year").innerHTML = `${yearTotal}/ ${yearOrder} Orders`;
            totalPages = numPages(bestSeller);;
          // console.log(totalPages);
            renderTable(bestSeller, current_page);
        }
        setInterval(async function () {
            newToken = await getData("refresh", "refresh_token", "POST");
          // console.log(newToken);
            if (newToken.msg) {
                alert(newToken.msg);
            } else {
                sessionStorage.setItem("access_token", newToken.access_token);
            }
        }, 900000);
    } else {
        window.location = "./signin.html";
        window.location.href(`${window.location}`);
    }
}

async function getData(link, token_type, Method) {
    const response = await fetch(`https://freddy.codesubmit.io/${link}`, {
        headers: { "Authorization" : "Bearer " + sessionStorage.getItem(token_type) },
        method: Method
    });
    return await response.json();
}

// TABLE LOGIC 
function renderTable(block, page) {
    // create html
    let result = '';
    if (block != null) {
        block.slice(-10).forEach(row => {
            result += `<tr>
            <td>${row.product["name"]}</td>
            <td>${row.units}</td>
            <td>${row.revenue}</td>
            </tr>`;
        });
    } else {
        for (let i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
            result += `<tr>
                    <td>${intDATA[i].product["name"]}</td>
                    <td>${intDATA[i].created_at}</td>
                    <td>${intDATA[i].total}</td>
                    <td>${intDATA[i].status}</td>
                    </tr>`;
        }
    }

    listing_table.innerHTML = result;

    page_at.innerHTML = current_page;
    page_total.innerHTML = totalPages;

    if (current_page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (current_page == totalPages) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}


function previousPage() {
    if (current_page > 1) {
        current_page--;
        renderTable(null, current_page);
    }
}

function nextPage() {
    if ((current_page * records_per_page) < intDATA.length) {
        current_page++;
        renderTable(null, current_page);
    }
}


function numPages(DATA) {
    return Math.ceil(DATA.length / records_per_page);
}


function Charts() {
    
}



function logout() {
    sessionStorage.clear;
    window.location = "./signin.html";
    window.location.href(`${window.location}`);
}
