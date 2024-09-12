// static data in a for testing
const donations = [
    { userId: 1, name: 'Kavindi Viranga', location: 'Nugegoda - School Play Ground', date: '2023-09-01' },
    { userId: 1, name: 'Kavindi Viranga', location: 'Kottawa - Near Bus Stand', date: '2023-08-15' },
    { userId: 2, name: 'Moksha Dilshan', location: 'Galle - Samanala Ground', date: '2023-07-10' }
];

// Show the section based on sectionId
 function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Register a new user
document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // Generate a new user ID (unique)
    // const userId = Date.now(); // Unique ID using current timestamp
    const user = {  name, email, phone, address };


    // Add the new user to the users array


        fetch('http://localhost:8080/api/users/register', {
            method: 'POST', // or 'PUT' if updating an existing user
            headers: {
                'Content-Type': 'application/json', // Sending JSON data
            },
            body: JSON.stringify(user), // Convert user object to JSON string
        })
            .then(response=>{
                if (response.ok) {
                    const responseData = response.json(); // Parse response JSON data
                    alert('User registered successfully');
                } else {
                    alert('Failed to register user');
                }
            })
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        

    fetchAllUsers(); // Automatically update user list after registration
});

// Fetch all users and display them in a table
function fetchAllUsers() {
    // Fetch users from the API
    fetch('http://localhost:8080/api/users/all')
    .then(response => {
        if (!response.ok) { // Check if the response is OK (status code 200-299)
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
    })
    .then(users => {
        console.log(users); // Log the fetched users to the console for debugging
        const userTable = document.getElementById('userTable');
        const noUsersMessage = document.getElementById('noUsersMessage');
        const tbody = userTable.querySelector('tbody');

        // Check if there are users returned
        if (users.length === 0) {
            userTable.classList.add('hidden');
            noUsersMessage.classList.remove('hidden');
            return;
        }

        // If users exist, hide the 'no users' message and display the table
        noUsersMessage.classList.add('hidden');
        userTable.classList.remove('hidden');
        tbody.innerHTML = ''; // Clear the table body before adding new rows

        // Loop through each user and create table rows dynamically
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.address}</td>
                <td>
                    <button onclick="editUser(${user.id})"><i class="fas fa-edit"></i> Edit</button>
                    <button onclick="deleteUser(${user.id})"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            `;
            tbody.appendChild(row); // Add the row to the table body
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch users. Please check the console for more details.');
    });
}


// Search user by ID with error handling for invalid ID
// Search user by ID
function searchUserById() {
    const searchUserId = parseInt(document.getElementById('searchUserId').value);
    const userTable = document.getElementById('userTable');
    const noUsersMessage = document.getElementById('noUsersMessage');
    const tbody = userTable.querySelector('tbody');
    
    // Validate user ID
    if (!searchUserId || isNaN(searchUserId)) {
        alert('Error: Please enter a valid user ID.');
        return;
    }

    fetch(`http://localhost:8080/api/users/${searchUserId}`)
    .then(response => {
        if (!response.ok) throw new Error('User not found');
        return response.json();
    })
    .then(user => {
        tbody.innerHTML = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.address}</td>
                <td>
                    <button onclick="editUser(${user.id})"><i class="fas fa-edit"></i> Edit</button>
                    <button onclick="deleteUser(${user.id})"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            </tr>
        `;
    })
    .catch(error => {
        alert('User ID not found');
        console.error('Error:', error);
    });
}

// Edit user information
function editUser(userId) {
    fetch(`http://localhost:8080/api/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editName').value = user.name;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editPhone').value = user.phone;
        document.getElementById('editAddress').value = user.address;

        showSection('editSection');
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
        alert('Failed to fetch user details');
    });
}

// Update user information
document.getElementById('editForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = parseInt(document.getElementById('editUserId').value);

    const updatedUser = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        address: document.getElementById('editAddress').value
    };

    fetch(`http://localhost:8080/api/users/update/${id}`, { // Using 'id' correctly here
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    })
    .then(response => response.json())
    .then(() => {
        alert('User updated successfully');
        fetchAllUsers(); // Refresh the user list
        showSection('viewUserSection');
    })
    .catch(error => {
        console.error('Error updating user:', error);
        alert('Failed to update user');
    });
});

// Delete a user
function deleteUser(userId) {
    fetch(`http://localhost:8080/api/users/delete/${userId}`, {
        method: 'DELETE',
    })
    .then(() => {
        alert('User deleted successfully');
        fetchAllUsers(); // Refresh the user list after deletion
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
    });
}

// Fetch donation history by user ID with error handling
function fetchDonationHistory() {
    const userId = parseInt(document.getElementById('donationUserId').value);
    const donationTable = document.getElementById('donationTable');
    const noDonationsMessage = document.getElementById('noDonationsMessage');
    const tbody = donationTable.querySelector('tbody');
    
    // Validate user ID
    if (!userId || isNaN(userId)) {
        alert('Error: Please enter a valid user ID.');
        return;
    }

    // Filter donations by user ID
    const userDonations = donations.filter(donation => donation.userId === userId);

    if (userDonations.length === 0) {
        alert('Error: No donation history found for this user!');
        donationTable.classList.add('hidden');
        noDonationsMessage.classList.remove('hidden');
        return;
    }

    // Display donation details
    noDonationsMessage.classList.add('hidden');
    donationTable.classList.remove('hidden');
    tbody.innerHTML = '';

    userDonations.forEach(donation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donation.name}</td>
            <td>${donation.date}</td>
            <td>${donation.location}</td>
        `;
        tbody.appendChild(row);
    });
}
