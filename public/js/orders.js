
let current_page = 1;
const records_per_page = 10;
let totalPages = 0;
let intDATA = null;

let listing_table = document.querySelector('#catTable tbody');
const btn_next = document.getElementById("btn_next");
const btn_prev = document.getElementById("btn_prev");
let page_at = document.getElementById("page_at");
let page_total = document.getElementById("page_total");

async function getData(link, token_type, Method) {
    const response = await fetch(`https://freddy.codesubmit.io/${link}`, {
        headers: { "Authorization": "Bearer " + sessionStorage.getItem(token_type) },
        method: Method
    });
    return await response.json();
}
// TABLE LOGIC 
function renderTable(blockDATA, pageNow) {
    // create html
    let result = '';
    blockDATA.forEach(row => {
        result += `<tr>
        <td>${row.product["name"]}</td>
        <td>${row.created_at}</td>
        <td>${row.total}</td>
        <td style="color:${row.status == "delivered" ? "green" : (row.status == "processing" ? "red":"black")}">${row.status}</td>
        </tr>`;
    });
    
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

async function prevPage() {
    if (current_page > 1) { 
        current_page--;
        intDATA = await getData(`orders?page=${current_page}`, "access_token", "GET");
        console.log(intDATA.orders);
        renderTable(intDATA.orders, current_page);
    }
}

async function nextPage() {
    current_page++;
    intDATA = await getData(`orders?page=${current_page}`, "access_token", "GET");
    console.log(intDATA.orders);
    renderTable(intDATA.orders, current_page);
}
async function search(srchParam) {
    const searchData = await getData(`orders?page=${current_page}&q=${srchParam.value}`, "access_token", "GET");
    console.log(searchData);
    if (searchData.msg) {
        alert(searchData.msg);
    } else {
        current_page = searchData.page;
        totalPages = searchData.total;
        renderTable(searchData.orders, current_page);
    }
}


function numPages(DATA) {
    return Math.ceil(DATA.length / records_per_page);
}

window.onload = async function () {
    if (sessionStorage.getItem("access_token")) {
        intDATA = await getData(`orders?page=${current_page}`, "access_token", "GET");
        console.log(intDATA.orders);
        if (intDATA.msg) {
            alert(intDATA.msg);
        } else {
            // records_per_page = intDATA.orders.length;
            current_page = intDATA.page;
            totalPages = intDATA.total;
            renderTable(intDATA.orders, current_page);
        }
        setInterval(async function () {
            newToken = await getData("refresh", "refresh_token", "POST");
            console.log(newToken);
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

function logout() {
    sessionStorage.clear;
    window.location = "./signin.html";
    window.location.href(`${window.location}`);
}
