// Get modal elements
const modal = document.getElementById("modal");
const addCampBtn = document.getElementById("addCampBtn");
const closeModal = document.getElementsByClassName("close")[0];
const campForm = document.getElementById("campForm");
const campsTable = document.getElementById("campsTable");
const campLocationInput = document.getElementById('campLocationInput'); // Input field for typing location

// When the user clicks the "Add New Camp" button, open the modal
addCampBtn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    modal.style.display = "none";
};

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Function to add a new row to the camps table
function addCampToTable(campName, campDate, campTime, campLocation) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${campName}</td>
        <td>${campDate}</td>
        <td>${campTime}</td>
        <td>${campLocation}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    campsTable.appendChild(newRow);
}

// Handle form submission
campForm.onsubmit = function(event) {
    event.preventDefault();

    // Get form data
    const campName = document.getElementById("campName").value;
    const campDate = document.getElementById("campDate").value;
    const campTime = document.getElementById("campTime").value;
    const campLocation = campLocationInput.value; // Use the manually entered location

    if (campName && campDate && campTime && campLocation) {
        // Add camp to the table
        addCampToTable(campName, campDate, campTime, campLocation);

        // Clear the form
        campForm.reset();
        modal.style.display = "none";
    } else {
        alert("Please fill in all fields.");
    }
};
