const btn = document.querySelector("#btn");
const lists = document.querySelector("#lists");
let allData = [];

function addTodo() { // Todo Yaratmaq
    return new Promise(function (resolve, reject) {
        const myInput = document.querySelector("#myInput");
        const inputValue = myInput.value.trim();
        if (inputValue && inputValue.length < 8) {
            const myObj = { //Object yaratmaq
                id: new Date().getTime(),
                inputValue
            };
            allData.push(myObj);
            myInput.value = ""; // inputun value-sunu temizlemek
            resolve(allData);
        } else {
            reject("Lütfen doğru değer yazınız");
        }
    });
}

btn.addEventListener("click", function () {
    addTodo()
        .then((response) => {
            lists.innerHTML = response.map((item) => {
                return `
                <li class="list-group-item d-flex justify-content-between p-3">${item.inputValue}<i
                class="fa fa-solid fa-trash text-danger fs-5" onclick ="deleteTodo(${item.id})"></i></li>
                `;
            }).join("");
        })
        .catch((error) => {
            alert(error)
        });
});
function updateList() { // Listi yenilemek
    lists.innerHTML = allData.map(item => {
        return `
            <li class="list-group-item d-flex justify-content-between p-3">
                ${item.inputValue}
                <i class="fa fa-solid fa-trash text-danger fs-5" onclick="deleteTodo(${item.id})"></i>
            </li>
        `;
    }).join("");
}

function deleteTodo(id) { // Listi silmek
    Swal.fire({ // Plugin 
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            allData = allData.filter(item => item.id !== id);
            updateList();
            Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
            );
        }
    });
}
