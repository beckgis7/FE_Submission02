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
    // block.forEach(row => {
    //     result += `<tr>
    //  <td>${row.name}</td>
    //  <td>${row.date}</td>
    //  <td>${row.price}</td>
    //  <td>${row.status}</td>
    //  </tr>`;
    // });
    for (let i = 0; i = block.length; i++) {
        result += `<tr>
     <td>${row.name}</td>
     <td>${row.date}</td>
     <td>${row.price}</td>
     <td>${row.status}</td>
     </tr>`;
    }
    document.querySelector('#catTable tbody').innerHTML = result;
}

window.onload = function () {
    if (sessionStorage.getItem("access_token")) {
        const DATA = getData(`orders?page=${curPage}&q=${search}`, "access_token", "GET");
        console.log(DATA);
        if (DATA.msg) {
            alert(DATA.msg);
        } else {
            renderTable(DATA); 
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
function previousPage() {
    if (curPage > 1) curPage--;
    const prevData = getData(`orders?page=${curPage}`, "access_token", "GET");
    console.log(prevData);
    if (prevData.msg) {
        alert(prevData.msg);
    } else {
        renderTable(prevData);
    }
}

function nextPage() {
    if ((curPage * pageSize) < data.length) curPage++;
    const nextData = getData(`orders?page=${curPage}`, "access_token", "GET");
    console.log(nextData);
    if (nextData.msg) {
        alert(nextData.msg);
    } else {
        renderTable(nextData);
    }
}
function search(curP, srchParam) {
    const searchData = getData(`orders?page=${curP}&q=${srchParam}`, "access_token", "GET");
    console.log(searchData);
    if (searchData.msg) {
        alert(searchData.msg);
    } else {
        renderTable(searchData);
    }
}



document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);

function logout() {
    sessionStorage.clear;
    window.location = "./signin.html";
    window.location.href(`${window.location}`);
}
