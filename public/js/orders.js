let data, table, sortCol;
let sortAsc = false;
const pageSize = 3;
let curPage = 1;


async function getData(link, token_type, Method) {
    const response = await fetch(`https://freddy.codesubmit.io/${link}`, {
        headers: { "Authorization": "Bearer " + sessionStorage.getItem(token_type) },
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
     <td>${row.total}</td>
     <td>${row.status}</td>
     </tr>`;
    });
    
    document.querySelector('#catTable tbody').innerHTML = result;
}   

window.onload = async function () {
    if (sessionStorage.getItem("access_token")) {
        const DATA = await getData(`orders?page=${curPage}&q=${search}`, "access_token", "GET");
        console.log(DATA.orders);
        if (DATA.msg) {
            alert(DATA.msg);
        } else {
            renderTable(DATA.orders); 
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
async function previousPage() {
    if (curPage > 1) curPage--;
    const prevData = await getData(`orders?page=${curPage}`, "access_token", "GET");
    console.log(prevData);
    if (prevData.msg) {
        alert(prevData.msg);
    } else {
        renderTable(prevData.orders);
    }
}

async function nextPage() {
    if ((curPage * pageSize) < data.length) curPage++;
    const nextData = await getData(`orders?page=${curPage}`, "access_token", "GET");
    console.log(nextData);
    if (nextData.msg) {
        alert(nextData.msg);
    } else {
        renderTable(nextData.orders);
    }
}
async function search(srchParam) {
    const searchData = await getData(`orders?page=${curPage}&q=${srchParam.value}`, "access_token", "GET");
    console.log(searchData);
    if (searchData.msg) {
        alert(searchData.msg);
    } else {
        renderTable(searchData.orders);
    }
}



document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);

function logout() {
    sessionStorage.clear;
    window.location = "./signin.html";
    window.location.href(`${window.location}`);
}
