var selectedRow = null;

// Show alert
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear input fields
function clearFields(){
    document.querySelector("#name").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#gender").value = "";
    document.querySelector("#url-link").value = "";
    document.querySelector("#url-image").value = "";
}

// Add event listener to the form submit
document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;
    const urllink = document.querySelector("#url-link").value;
    const urlimage = document.querySelector("#url-image").value;

    // Validation
    if(name === "" || age === "" || gender === "" || urllink === "" || urlimage === ""){
        showAlert("Please fill in all fields", "danger");
    } else {
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${name}</td>
                <td>${age}</td>
                <td>${gender}</td>
                <td><a href="${urllink}" target="_blank">${urllink}</a></td>
                <td><img src="${urlimage}" alt="Image" style="width: 100px;"></td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-warning btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Student Added", "success");
        } else {
            selectedRow.children[0].textContent = name;
            selectedRow.children[1].textContent = age;
            selectedRow.children[2].textContent = gender;
            selectedRow.children[3].innerHTML = `<a href="${urllink}" target="_blank">${urllink}</a>`;
            selectedRow.children[4].innerHTML = `<img src="${urlimage}" alt="Image" style="width: 100px;">`;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
        clearFields();
    }
});

// Edit student data
document.querySelector("#student-list").addEventListener("click", (e) =>{
    if(e.target.classList.contains("edit")){
        selectedRow = e.target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent;
        document.querySelector("#age").value = selectedRow.children[1].textContent;
        document.querySelector("#gender").value = selectedRow.children[2].textContent;
        document.querySelector("#url-link").value = selectedRow.children[3].textContent;
        document.querySelector("#url-image").value = selectedRow.children[4].querySelector("img").src;
    }
});

// Delete student data
document.querySelector("#student-list").addEventListener("click", (e) =>{
    if(e.target.classList.contains("delete")){
        e.target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});
