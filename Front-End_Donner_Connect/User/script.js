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
    const phoneNumber = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const user = { name, email, phoneNumber, address };

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
                document.getElementById('registerForm').reset();
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
    fetch('http://localhost:8080/api/users/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(users => {
        const userTable = document.getElementById('userTable');
        const noUsersMessage = document.getElementById('noUsersMessage');
        const tbody = userTable.querySelector('tbody');

        if (users.length === 0) {
            userTable.classList.add('hidden');
            noUsersMessage.classList.remove('hidden');
            return;
        }

        noUsersMessage.classList.add('hidden');
        userTable.classList.remove('hidden');
        tbody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td>${user.address}</td>
                <td>
                    <button onclick="editUser(${user.id})"><i class="fas fa-edit"></i> Edit</button>
                    <button onclick="deleteUser(${user.id})"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch users. Please check the console for more details.');
    });
}

// Search user by ID
function searchUserById() {
    const searchUserId = parseInt(document.getElementById('searchUserId').value);
    const userTable = document.getElementById('userTable');
    const noUsersMessage = document.getElementById('noUsersMessage');
    const tbody = userTable.querySelector('tbody');
    
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
                <td>${user.phoneNumber}</td>
                <td>${user.address}</td>
                <td>
                    <button onclick="editUser(${user.id})"><i class="fas fa-edit"></i> Edit</button>
                    <button onclick="deleteUser(${user.id})"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            </tr>
        `;
        noUsersMessage.classList.add('hidden');
        userTable.classList.remove('hidden');
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
        document.getElementById('editPhone').value = user.phoneNumber;
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
        phoneNumber: document.getElementById('editPhone').value,
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
    // Confirm before proceeding with deletion
    const confirmation = window.confirm('Are you sure you want to delete this user?');

    if (confirmation) {
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
    } else {
        alert('User deletion cancelled');
    }

}

// Fetch donation history by user ID
function fetchDonationHistory() {
    const userId = parseInt(document.getElementById('donationUserId').value);
    const donationTable = document.getElementById('donationTable');
    const noDonationsMessage = document.getElementById('noDonationsMessage');
    const tbody = donationTable.querySelector('tbody');

    if (!userId || isNaN(userId)) {
        alert('Error: Please enter a valid user ID.');
        return;
    }

    fetch(`http://localhost:8080/donation/${userId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(userDonations => {
        if (userDonations.length === 0) {
            alert('Error: No donation history found for this user!');
            donationTable.classList.add('hidden');
            noDonationsMessage.classList.remove('hidden');
            return;
        }

        noDonationsMessage.classList.add('hidden');
        donationTable.classList.remove('hidden');
        tbody.innerHTML = '';

        userDonations.forEach(donation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${donation.id}</td>
                <td>${donation.name}</td>
                <td>${donation.email}</td>
                <td>${donation.phoneNumber}</td>
                <td>${donation.address}</td>
                <td>${donation.donate_date}</td>
                <td>${donation.camp_location}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        alert(error.message);
    });
}

