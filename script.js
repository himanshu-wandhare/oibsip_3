const inputBox = document.querySelector('input');
const addBtn = document.querySelector('.inputField button');
const list = document.querySelector('.list');
const clearBtn = document.querySelector('.footer button');

inputBox.onkeyup = () => {
    let data = inputBox.value;
    if ( data.trim() != "") {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
}

showTasks();

addBtn.onclick = () => {
    let getLS = localStorage.getItem('New Todo');
    let data =  inputBox.value;
    if (getLS == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLS);
    }
    listArr.push(data);
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove('active');
}

clearBtn.onclick = () => {
    listArr = [];
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    showTasks();
}

function showTasks () {
    let getLS = localStorage.getItem('New Todo');
    if (getLS == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLS);
    }
    const counter = document.querySelector('.pendingNum');
    counter.textContent = listArr.length;
    if (listArr.length >0) {
        clearBtn.classList.add('active');
    } else {
        clearBtn.classList.remove('active');
    }
    let newList = "";
    listArr.forEach((value,index) => {
        newList += `<li>${value}<span onclick = "deleteTask(${index})"><i class="fa-sharp fa-solid fa-trash"></i></span></li>`;
    });
    list.innerHTML = newList;
    inputBox.value = "";
}

function deleteTask (index) {
    let getLS = localStorage.getItem('New Todo');
    listArr = JSON.parse(getLS);
    listArr.splice(index,1);
    localStorage.setItem('New Todo',JSON.stringify(listArr));
    showTasks();
}
