// Get modal elements
const modal = document.getElementById("modal");
const addContributorBtn = document.getElementById("addContributorBtn");
const closeModal = document.getElementsByClassName("close")[0];
const contributorForm = document.getElementById("contributorForm");
const contributorsTable = document.getElementById("contributorsTable");

// Fetch and display existing contributors when the page loads
window.onload = function() {
    fetchAndDisplayContributors();
};

// When the user clicks the "Add New Contributor" button, open the modal
addContributorBtn.onclick = function() {
    modal.style.display = "flex";
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

// Function to fetch and display contributors
function fetchAndDisplayContributors() {
    fetch('http://localhost:8085/contributor/contributors')
        .then(response => response.json())
        .then(data => {
            // Clear the table first
            contributorsTable.innerHTML = '';

            // Add each contributor to the table
            data.forEach(contributor => {
                addContributorToTable(contributor.id, contributor.name, contributor.email, contributor.nic, contributor.address, contributor.city, contributor.phoneNumber);
            });
        })
        .catch(error => {
            console.error('Error fetching contributors:', error);
            alert('Failed to load contributors');
        });
}

// Function to add a new row to the contributors table
function addContributorToTable(contributorId, name, email, nic, address, city, phoneNumber) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${nic}</td>
        <td>${address}</td>
        <td>${city}</td>
        <td>${phoneNumber}</td>
        <td>********</td>
        <td>
            <button class="edit-btn" data-id="${contributorId}">Edit</button>
            <button class="delete-btn" data-id="${contributorId}">Delete</button>
        </td>
    `;
    contributorsTable.appendChild(newRow);

    // Attach event listeners to the buttons
    newRow.querySelector(".edit-btn").addEventListener("click", function() {
        const id = this.getAttribute("data-id");
        editContributor(id);
    });

    newRow.querySelector(".delete-btn").addEventListener("click", function() {
        const id = this.getAttribute("data-id");
        deleteContributor(id);
    });
}

// Handle form submission for adding a new contributor
contributorForm.onsubmit = function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const nic = document.getElementById("nic").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (name && email && nic && address && city && phone && password) {
        // Send POST request to the backend
        fetch('http://localhost:8085/contributor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                nic: nic,
                address: address,
                city: city,
                phoneNumber: phone,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Add contributor to the table
                addContributorToTable(data.id, name, email, nic, address, city, phone);
                
                // Clear the form
                contributorForm.reset();
                modal.style.display = "none";
            } else {
                alert("Failed to add contributor.");
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

// Function to handle editing a contributor
function editContributor(contributorId) {
    // Fetch contributor details for editing
    fetch(`http://localhost:8085/contributor/${contributorId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(contributor => {
        // Populate the form with the current contributor details
        document.getElementById("name").value = contributor.name;
        document.getElementById("email").value = contributor.email;
        document.getElementById("nic").value = contributor.nic;
        document.getElementById("address").value = contributor.address;
        document.getElementById("city").value = contributor.city;
        document.getElementById("phone").value = contributor.phoneNumber;
        document.getElementById("password").value = '';  // Password field should be left empty

        // Open the modal
        modal.style.display = "flex";

        // Override the form submission to update the contributor instead
        contributorForm.onsubmit = function(event) {
            event.preventDefault();

            // Get updated form data
            const updatedName = document.getElementById("name").value;
            const updatedEmail = document.getElementById("email").value;
            const updatedNic = document.getElementById("nic").value;
            const updatedAddress = document.getElementById("address").value;
            const updatedCity = document.getElementById("city").value;
            const updatedPhone = document.getElementById("phone").value;

            // Send PUT request to update the contributor
            fetch(`http://localhost:8085/contributor/${contributorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: updatedName,
                    email: updatedEmail,
                    nic: updatedNic,
                    address: updatedAddress,
                    city: updatedCity,
                    phoneNumber: updatedPhone
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Update the table
                    const row = document.querySelector(`.edit-btn[data-id="${contributorId}"]`).closest("tr");
                    row.innerHTML = `
                        <td>${data.name}</td>
                        <td>${data.email}</td>
                        <td>${data.nic}</td>
                        <td>${data.address}</td>
                        <td>${data.city}</td>
                        <td>${data.phoneNumber}</td>
                        <td>********</td>
                        <td>
                            <button class="edit-btn" data-id="${contributorId}">Edit</button>
                            <button class="delete-btn" data-id="${contributorId}">Delete</button>
                        </td>
                    `;

                    // Reattach event listeners
                    row.querySelector(".edit-btn").addEventListener("click", function() {
                        const id = this.getAttribute("data-id");
                        editContributor(id);
                    });
                    row.querySelector(".delete-btn").addEventListener("click", function() {
                        const id = this.getAttribute("data-id");
                        deleteContributor(id);
                    });

                    // Clear the form and close the modal
                    contributorForm.reset();
                    modal.style.display = "none";
                } else {
                    alert("Failed to update contributor.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred. Please try again.");
            });
        };
    })
    .catch(error => {
        console.error('Error fetching contributor details:', error);
        alert("No contributor found with this ID.");
    });
}

// Function to handle deleting a contributor
function deleteContributor(contributorId) {
    if (confirm("Are you sure you want to delete this contributor?")) {
        fetch(`http://localhost:8085/contributor/${contributorId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Remove the row from the table
                const row = document.querySelector(`.delete-btn[data-id="${contributorId}"]`).closest("tr");
                row.remove();
            } else {
                alert("Failed to delete contributor.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
    }
}

// Function to open the login form
// function openForm() {
//     document.getElementById("loginForm").style.display = "block";
// }

// // Function to close the login form
// function closeForm() {
//     document.getElementById("loginForm").style.display = "none";
// }

// Example of login form functionality
// function loginUser(event) {
//     event.preventDefault(); // Prevent form submission
//     // Implement your login logic here
// }

