// Get modal elements
const modal = document.getElementById("modal");
const addCampBtn = document.getElementById("addCampBtn");
const closeModal = document.getElementsByClassName("close")[0];
const campForm = document.getElementById("campForm");
const campsTable = document.getElementById("campsTable");
const campLocationInput = document.getElementById('campLocationInput'); // Input field for typing location

// Fetch and display existing camps when the page loads
window.onload = function() {
    const contributorId = Number(localStorage.getItem("contributorId"));

    if (contributorId) {
        fetch(`http://localhost:8084/camp/contributor/${contributorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Clear the table first
            campsTable.innerHTML = '';
            
            // Loop through the data and add each camp to the table
            data.forEach(camp => {
                addCampToTable(camp.id, camp.name, camp.date, camp.time, camp.location);
            });
        })
        .catch(error => {
            console.error('Error fetching camps:', error);
            alert("An error occurred while fetching the camps.");
        });
    } else {
        alert("Contributor ID is missing.");
    }
};

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
function addCampToTable(campId, campName, campDate, campTime, campLocation) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${campName}</td>
        <td>${campDate}</td>
        <td>${campTime}</td>
        <td>${campLocation}</td>
        <td>
            <button class="edit-btn" data-id="${campId}">Edit</button>
            <button class="delete-btn" data-id="${campId}">Delete</button>
        </td>
    `;
    campsTable.appendChild(newRow);

    // Attach event listeners to the buttons
    newRow.querySelector(".edit-btn").addEventListener("click", function() {
        const id = this.getAttribute("data-id");
        editCamp(id);
    });

    newRow.querySelector(".delete-btn").addEventListener("click", function() {
        const id = this.getAttribute("data-id");
        deleteCamp(id);
    });
}

// Handle form submission for adding a new camp
campForm.onsubmit = function(event) {
    event.preventDefault();

    // Get form data
    const campName = document.getElementById("campName").value;
    const campDate = document.getElementById("campDate").value;
    const campTime = document.getElementById("campTime").value;
    const campLocation = campLocationInput.value;

    // Get contributorId from local storage
    const contributorId = Number(localStorage.getItem("contributorId"));

    if (campName && campDate && campTime && campLocation && contributorId) {
        // Send POST request to the backend
        fetch('http://localhost:8084/camp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: campName,
                location: campLocation,
                date: campDate,
                time: campTime,
                approved: false,
                contributorId: contributorId // Pass the contributorId
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Add camp to the table
                addCampToTable(data.id, campName, campDate, campTime, campLocation);
                
                // Clear the form
                campForm.reset();
                modal.style.display = "none";
            } else {
                alert("Failed to add camp.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
    } else {
        alert("Please fill in all fields.");
    }
};

// Function to handle editing a camp
function editCamp(campId) {
    // Fetch camp details for editing
    fetch(`http://localhost:8084/camp/${campId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(camp => {
        // Populate the form with the current camp details
        document.getElementById("campName").value = camp.name;
        document.getElementById("campDate").value = camp.date;
        document.getElementById("campTime").value = camp.time;
        document.getElementById("campLocationInput").value = camp.location;
        document.getElementById("campLocation").value = camp.location;

        // Open the modal
        modal.style.display = "block";

        // Override the form submission to update the camp instead
        campForm.onsubmit = function(event) {
            event.preventDefault();

            // Get updated form data
            const updatedCampName = document.getElementById("campName").value;
            const updatedCampDate = document.getElementById("campDate").value;
            const updatedCampTime = document.getElementById("campTime").value;
            const updatedCampLocation = campLocationInput.value;

            // Send PUT request to update the camp
            fetch(`http://localhost:8084/camp/${campId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: updatedCampName,
                    location: updatedCampLocation,
                    date: updatedCampDate,
                    time: updatedCampTime,
                    approved: camp.approved,
                    contributorId: camp.contributorId
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Update the table
                    const row = document.querySelector(`.edit-btn[data-id="${campId}"]`).closest("tr");
                    row.innerHTML = `
                        <td>${updatedCampName}</td>
                        <td>${updatedCampDate}</td>
                        <td>${updatedCampTime}</td>
                        <td>${updatedCampLocation}</td>
                        <td>
                            <button class="edit-btn" data-id="${campId}">Edit</button>
                            <button class="delete-btn" data-id="${campId}">Delete</button>
                        </td>
                    `;

                    // Reattach event listeners
                    row.querySelector(".edit-btn").addEventListener("click", function() {
                        const id = this.getAttribute("data-id");
                        editCamp(id);
                    });
                    row.querySelector(".delete-btn").addEventListener("click", function() {
                        const id = this.getAttribute("data-id");
                        deleteCamp(id);
                    });

                    // Clear the form and close the modal
                    campForm.reset();
                    modal.style.display = "none";
                } else {
                    alert("Failed to update camp.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred. Please try again.");
            });
        };
    })
    .catch(error => {
        console.error('Error fetching camp details:', error);
        alert("No camp from this ID. Please create Camp.");
    });
}

// Function to handle deleting a camp
function deleteCamp(campId) {
    if (confirm("Are you sure you want to delete this camp?")) {
        fetch(`http://localhost:8084/camp/${campId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Remove the row from the table
                const row = document.querySelector(`.delete-btn[data-id="${campId}"]`).closest("tr");
                row.remove();
            } else {
                alert("Failed to delete camp.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
    }
}
