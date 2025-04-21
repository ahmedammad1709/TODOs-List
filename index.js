document.addEventListener("DOMContentLoaded", function () {

    const add = document.getElementById("add");
    add.addEventListener("click", update);

    function update() {
        console.log("Button pressed!");
        const tit = document.getElementById('title').value.trim();
        const desc = document.getElementById('description').value.trim();

        if (tit === "" || desc === "") {
            alert("Title and Description cannot be empty!");
            return;
        }

        let itemsJsonArray = [];

        if (localStorage.getItem('itemsJson') === null) {
            console.log("Creating new list...");
            itemsJsonArray.push([tit, desc]);
        } else {
            let itemsJsonArrayStr = localStorage.getItem('itemsJson');
            itemsJsonArray = JSON.parse(itemsJsonArrayStr);
            itemsJsonArray.push([tit, desc]);
        }

        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));

        // Clear input fields
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';

        populateTable();
    }

    function populateTable() {
        let itemsJsonArrayStr = localStorage.getItem('itemsJson');
        let itemsJsonArray = itemsJsonArrayStr ? JSON.parse(itemsJsonArrayStr) : [];

        let str = "";
        let tableBody = document.getElementById('tableBody');

        itemsJsonArray.forEach((element, index) => {
            str += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element[0]}</td>
                        <td class="text-wrap" style="max-width: 250px; word-break: break-word;">${element[1]}</td>
                        <td><button class="btn btn-primary" onclick="isDeleted(${index})">Delete</button></td>
                    </tr>`;
        });

        tableBody.innerHTML = str;
    }

    window.isDeleted = function (itemIndex) {
        console.log("Deleted", itemIndex);
        let itemsJsonArrayStr = localStorage.getItem('itemsJson');
        let itemsJsonArray = itemsJsonArrayStr ? JSON.parse(itemsJsonArrayStr) : [];

        // Delete item
        itemsJsonArray.splice(itemIndex, 1);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));

        populateTable();
    }

    // Initial table population
    populateTable();

    const clear = document.getElementById("clear");
    clear.addEventListener("click", ()=>{
        if(confirm("Are you sure to delete all the list ?")){
            localStorage.clear();
            populateTable();
        }
       
    });
   
    let row = document.createElement("tr");
    row.classList.add("fade-in");
    
      

});
