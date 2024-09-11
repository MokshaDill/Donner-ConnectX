document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');


    // Function to update time
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const date = now.toLocaleDateString(); // Current date
        document.getElementById('current-time').textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
        document.getElementById('current-date').textContent = `Date: ${date}`;
    }

    setInterval(updateTime, 1000);

    // Event listeners for sidebar links
    document.getElementById('dashboard-link').addEventListener('click', function(event) {
        event.preventDefault();
        dashboard('dashboard');
    });

    document.getElementById('camps-link').addEventListener('click', function(event) {
        event.preventDefault();
        loadContent('camps');
    });

    document.getElementById('create-admin-link').addEventListener('click', function(event) {
        event.preventDefault();
        loadAdmins('admins');
    });

    document.getElementById('user-crud-link').addEventListener('click', function(event) {
        event.preventDefault();
        userpage('user-crud');
    });

    document.getElementById('send-notification-link').addEventListener('click', function(event) {
        event.preventDefault();
        loadContent('send-notification');
    });

    document.getElementById('logout-link').addEventListener('click', function(event) {
        event.preventDefault();
        // Implement logout logic
        alert('Logout functionality not implemented.');
    });

    function showError(message) {
        mainContent.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    }

    function loadContent(page) {
        mainContent.innerHTML = '<p>Loading..ccc.</p>';
        switch (page) {
            case 'dashboard':
                mainContent.innerHTML = '<h2>Dashboard</h2><p>Loading dashboard data...</p>';
                // Implement AJAX request for dashboard data
                break;

            case 'admins':
                loadAdmins();
                break;

            case 'camps':
                loadCamps();
                break;

            case 'user-crud':
                userpage();
                break;

            case 'send-notification':
                mainContent.innerHTML = '<h2>Send Notification</h2><p>Send notification functionality not implemented.</p>';
                break;

            default:
                showError('Page not found.');
        }
    }

    


    function loadAdmins(page) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<p>Loading...</p>';
    
        if (page === 'admins') {
            fetch('http://localhost:8081/admin/all')
                .then(response => response.json())
                .then(data => {
                    mainContent.innerHTML = `
                        <!-- Admin Management Section -->
                        <h2>Manage Admins</h2>
                        <form id="admin-crud-form" class="mb-4">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="admin-id" class="form-label">Admin ID (for editing)</label>
                                    <input type="text" id="admin-id" class="form-control" placeholder="Leave blank to create new">
                                </div>
                                <div class="col-md-6">
                                    <label for="admin-email" class="form-label">Email</label>
                                    <input type="email" id="admin-email" class="form-control" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="admin-name" class="form-label">Name</label>
                                    <input type="text" id="admin-name" class="form-control" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="admin-phone" class="form-label">Phone</label>
                                    <input type="text" id="admin-phone" class="form-control" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="admin-password" class="form-label">Password</label>
                                    <div class="input-group">
                                        <input type="password" id="admin-password" class="form-control" placeholder="Password">
                                        <button type="button" class="btn btn-outline-secondary" id="toggle-password">
                                            <i class="fa fa-eye" id="eye-icon"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-6 d-flex align-items-end">
                                    <button type="submit" class="btn btn-primary w-100">Save</button>
                                </div>
                            </div>
                        </form>
    
                        <h3>Admin List</h3>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th colspan="3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Table rows will be populated here -->
                            </tbody>
                        </table>
                    `;
    
                    // Populate the admin table
                    const tableBody = mainContent.querySelector('tbody');
                    const rows = data.map(admin => `
                        <tr>
                            <td>${admin.id}</td>
                            <td>${admin.email}</td>
                            <td>${admin.name}</td>
                            <td>${admin.phone}</td>
                            <td><button class="btn btn-primary btn-sm" onclick="editAdmin(${admin.id}, '${admin.email}', '${admin.name}', '${admin.phone}')">Edit</button></td>
                            <td><button class="btn btn-danger btn-sm" onclick="confirmDeleteAdmin(${admin.id})">Delete</button></td>
                        </tr>
                    `).join('');
                    tableBody.innerHTML = rows;
    
                    // Handle form submission for create/edit
                    document.getElementById('admin-crud-form').addEventListener('submit', function (e) {
                        e.preventDefault();
    
                        const id = document.getElementById('admin-id').value;
                        const email = document.getElementById('admin-email').value;
                        const name = document.getElementById('admin-name').value;
                        const phone = document.getElementById('admin-phone').value;
                        const password = document.getElementById('admin-password').value;
    
                        const method = id ? 'PUT' : 'POST';
                        const endpoint = id ? `http://localhost:8081/admin/update/${id}` : 'http://localhost:8081/admin/create';
    
                        fetch(endpoint, {
                            method: method,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, name, phone, password })
                        })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                return response.text().then(text => {
                                    throw new Error(text || 'Failed to submit admin data.');
                                });
                            }
                        })
                        .then(result => {
                            alert(id ? 'Admin updated successfully' : 'Admin created successfully');
                            loadAdmins('admins'); // Reload the admin list
                        })
                        .catch(error => {
                            showError(error.message);
                        });
                    });
    
                    // Toggle password visibility
                    document.getElementById('toggle-password').addEventListener('click', function () {
                        const passwordField = document.getElementById('admin-password');
                        const eyeIcon = document.getElementById('eye-icon');
                        if (passwordField.type === 'password') {
                            passwordField.type = 'text';
                            eyeIcon.classList.remove('fa-eye');
                            eyeIcon.classList.add('fa-eye-slash');
                        } else {
                            passwordField.type = 'password';
                            eyeIcon.classList.remove('fa-eye-slash');
                            eyeIcon.classList.add('fa-eye');
                        }
                    });
    
                    // Edit admin function
                    window.editAdmin = function (id, email, name, phone) {
                        document.getElementById('admin-id').value = id;
                        document.getElementById('admin-email').value = email;
                        document.getElementById('admin-name').value = name;
                        document.getElementById('admin-phone').value = phone;
                    };
    
                    // Confirm delete admin function
                    window.confirmDeleteAdmin = function (id) {
                        if (confirm('Are you sure you want to delete this admin?')) {
                            deleteAdmin(id);
                        }
                    };
    
                    // Delete admin function
                    function deleteAdmin(id) {
                        fetch(`http://localhost:8081/admin/delete/${id}`, { method: 'DELETE' })
                            .then(response => {
                                if (response.ok) {
                                    return response.json().catch(() => null);
                                } else {
                                    return response.text().then(text => {
                                        throw new Error(text || 'Failed to delete admin.');
                                    });
                                }
                            })
                            .then(data => {
                                if (data) {
                                    console.log(data.message);
                                }
                                alert('Admin deleted successfully');
                                loadAdmins('admins'); // Reload the admin list
                            })
                            .catch(error => {
                                showError(error.message);
                            });
                    }
                    
                })
                .catch(error => {
                    showError('Failed to load admins.');
                });
        }
    }
    
    
    // Helper function to show errors
    function showError(message) {
        alert(message);
    }
    
   

    // Load content function that handles camp CRUD
    function loadContent(page) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<p>Loading.rrrr..</p>';

        if (page === 'camps') {
            fetch('http://localhost:8081/donationcamp/all')
                .then(response => response.json())
                .then(data => {
                    // Add form and table
                    mainContent.innerHTML = `
                        <!-- Form Section -->
                            <h2>Manage Camps</h2>
                            <form id="camp-crud-form" class="mb-4">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="camp-id" class="form-label">Camp ID (for editing)</label>
                                        <input type="text" id="camp-id" class="form-control" placeholder="Leave blank to create new">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="camp-name" class="form-label">Name</label>
                                        <input type="text" id="camp-name" class="form-control" required>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="camp-description" class="form-label">Description</label>
                                        <textarea id="camp-description" class="form-control" rows="3" required></textarea>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="camp-location" class="form-label">Location</label>
                                        <input type="text" id="camp-location" class="form-control" required>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="camp-organizer" class="form-label">Organizer</label>
                                        <input type="text" id="camp-organizer" class="form-control" required>
                                    </div>
                                    <div class="col-md-6 d-flex align-items-end">
                                        <button type="submit" class="btn btn-primary w-100">Update</button>
                                    </div>
                                </div>
                            </form>

                            <h3>Camp List</h3>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Location</th>
                                        <th>Organizer</th>
                                        <th>Status</th>
                                        <th colspan="3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Table rows will be populated here -->
                                </tbody>
                            </table>

                    `;

                    // Display camp data in the table
                    const tableBody = mainContent.querySelector('tbody');
                    const rows = data.map(camp => `
                        <tr>
                            <td>${camp.id}</td>
                            <td>${camp.name}</td>
                            <td>${camp.description}</td>
                            <td>${camp.location}</td>
                            <td>${camp.organizer}</td>
                            <td>${camp.approved ? 'Approved' : 'Pending'}</td>
                            <td><button class="btn btn-primary btn-sm" onclick="editCamp(${camp.id})">Edit</button></td>
                            <td><button class="btn btn-${camp.approved ? 'warning' : 'success'} btn-sm" onclick="toggleCampStatus(${camp.id}, ${camp.approved})">
                                ${camp.approved ? 'Revert to Pending' : 'Approve'}</button></td>
                            <td><button class="btn btn-danger btn-sm" onclick="deleteCamp(${camp.id})">Delete</button></td>
                        </tr>
                    `).join('');
                    tableBody.innerHTML = rows;

                   // Form submission for creating/editing
                    document.getElementById('camp-crud-form').addEventListener('submit', function (e) {
                        e.preventDefault();

                        const id = document.getElementById('camp-id').value;
                        const name = document.getElementById('camp-name').value;
                        const description = document.getElementById('camp-description').value;
                        const location = document.getElementById('camp-location').value;
                        const organizer = document.getElementById('camp-organizer').value;

                        const method = id ? 'PUT' : 'POST';
                        const endpoint = id ? `http://localhost:8081/donationcamp/${id}` : 'http://localhost:8081/donationcamp/create';

                        fetch(endpoint, {
                            method: method,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id, name, description, location, organizer })
                        })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                return response.text().then(text => {
                                    throw new Error(text || 'Failed to submit camp data.');
                                });
                            }
                        })
                        .then(result => {
                            alert(id ? 'Camp updated successfully' : 'Camp created successfully');
                            loadContent('camps'); // Ensure loadContent is defined to refresh the camps list or page
                        })
                        .catch(error => {
                            showError(error.message); // Ensure showError is defined to display error messages
                        });
                    });


                    // Edit camp logic
                    window.editCamp = function (id) {
                        const camp = data.find(c => c.id === id);
                        document.getElementById('camp-id').value = camp.id;
                        document.getElementById('camp-name').value = camp.name;
                        document.getElementById('camp-description').value = camp.description;
                        document.getElementById('camp-location').value = camp.location;
                        document.getElementById('camp-organizer').value = camp.organizer;
                    };

                    // Toggle camp status logic
                    window.toggleCampStatus = function (id, approved) {
                        fetch(`http://localhost:8081/donationcamp/approve/${id}?approved=${!approved}`, { method: 'PUT' })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to change camp status.');
                            }
                            return response.json();
                        })
                        .then(result => {
                            alert('Camp status updated');
                            loadContent('camps');
                        })
                        .catch(error => {
                            showError(error.message);
                        });
                    };

                    // Delete camp logic
                    window.deleteCamp = function (id) {
                        fetch(`http://localhost:8081/donationcamp/${id}`, { method: 'DELETE' })
                            .then(response => {
                                if (response.ok) {
                                    // Successful response
                                    return response.json();  // Parse JSON response if it's available
                                } else {
                                    // If response is not OK, parse the error JSON
                                    return response.json().then(error => {
                                        throw new Error(error.message || 'Failed to delete camp.');
                                    });
                                }
                                
                            })
                            .then(data => {
                                console.log(data.message); // Data.message should be the success message
                                alert(data.message || 'Camp deleted successfully.'); // Notify user of success
                                loadCamps(); // Reload the list of camps or update UI
                            })
                            .catch(error => {
                                console.error('Failed to delete camp:', error.message);
                                alert('Failed to delete camp.'); // Notify user of failure
                                loadCamps();
                            });
                    };
                    
                })
                .catch(error => {
                    showError('Failed to load camps.');
                });
        }
    }

    function showError(message) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    }



    function userpage(page) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<p>Loading...</p>';
    
        if (page === 'user-crud') {
            fetch('http://localhost:8081/user/all')
                .then(response => response.json())
                .then(data => {
                    // Add form, search, and table
                    mainContent.innerHTML = `
                        <!-- Search Section -->
                        <div class="mb-4">
                            <input type="text" id="search-input" class="form-control" placeholder="Search by name or email">
                            <button id="search-button" class="btn btn-secondary mt-2">Search</button>
                        </div>
    
                        <!-- Form Section -->
                        <h2>Manage Users</h2>
                        <form id="user-crud-form" class="mb-4">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="user-id" class="form-label">User ID (for editing)</label>
                                    <input type="text" id="user-id" class="form-control" placeholder="Leave blank to create new">
                                </div>
                                <div class="col-md-6">
                                    <label for="user-email" class="form-label">Email</label>
                                    <input type="email" id="user-email" class="form-control" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="user-name" class="form-label">Name</label>
                                    <input type="text" id="user-name" class="form-control" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="user-phone" class="form-label">Phone</label>
                                    <input type="text" id="user-phone" class="form-control" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="user-password" class="form-label">Password</label>
                                    <input type="password" id="user-password" class="form-control" required>
                                    <button type="button" id="toggle-password" class="btn btn-secondary btn-sm">Show</button>
                                </div>
                                <div class="col-md-6 d-flex align-items-end">
                                    <button type="submit" class="btn btn-primary w-100">Update</button>
                                </div>
                            </div>
                        </form>
    
                        <!-- Table Section -->
                        <h3>User List</h3>
                        <div class="mb-3">
                            <button id="delete-selected" class="btn btn-danger">Delete Selected</button>
                        </div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" id="select-all"></th>
                                    <th><a href="#" id="sort-id">ID</a></th>
                                    <th><a href="#" id="sort-email">Email</a></th>
                                    <th><a href="#" id="sort-name">Name</a></th>
                                    <th><a href="#" id="sort-phone">Phone</a></th>
                                    <th>Password</th>
                                    <th colspan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Table rows will be populated here -->
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#" id="prev-page">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#" id="next-page">Next</a></li>
                            </ul>
                        </nav>
                    `;
    
                    const tableBody = mainContent.querySelector('tbody');
    
                    function displayUsers(users) {
                        const rows = users.map(user => `
                            <tr>
                                <td><input type="checkbox" class="select-user" value="${user.id}"></td>
                                <td>${user.id}</td>
                                <td>${user.email}</td>
                                <td>${user.name}</td>
                                <td>${user.phone}</td>
                                <td>****</td> <!-- Placeholder for password -->
                                <td><button class="btn btn-primary btn-sm" onclick="editUser(${user.id})">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" onclick="confirmDeleteUser(${user.id})">Delete</button></td>
                            </tr>
                        `).join('');
                        tableBody.innerHTML = rows;
                    }
    
                    displayUsers(data);
    
                    document.getElementById('user-crud-form').addEventListener('submit', function (e) {
                        e.preventDefault();
    
                        const id = document.getElementById('user-id').value;
                        const email = document.getElementById('user-email').value;
                        const name = document.getElementById('user-name').value;
                        const phone = document.getElementById('user-phone').value;
                        const password = document.getElementById('user-password').value;
    
                        const method = id ? 'PUT' : 'POST';
                        const endpoint = id ? `http://localhost:8081/user/update/${id}` : 'http://localhost:8081/user/create';
    
                        fetch(endpoint, {
                            method: method,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, name, phone, password })
                        })
                        .then(response => response.json())
                        .then(result => {
                            alert(id ? 'User updated successfully' : 'User created successfully');
                            userpage('user-crud'); // Refresh the user list
                        })
                        .catch(error => {
                            showError(error.message); // Show error if any
                        });
                    });
    
                    document.getElementById('toggle-password').addEventListener('click', function () {
                        const passwordField = document.getElementById('user-password');
                        if (passwordField.type === 'password') {
                            passwordField.type = 'text';
                            this.textContent = 'Hide';
                        } else {
                            passwordField.type = 'password';
                            this.textContent = 'Show';
                        }
                    });
    
                    document.getElementById('search-button').addEventListener('click', function () {
                        const query = document.getElementById('search-input').value.toLowerCase();
                        const filteredUsers = data.filter(user =>
                            user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
                        );
                        displayUsers(filteredUsers);
                    });
    
                    function sortUsers(key, ascending = true) {
                        const sortedUsers = [...data].sort((a, b) => {
                            if (a[key] < b[key]) return ascending ? -1 : 1;
                            if (a[key] > b[key]) return ascending ? 1 : -1;
                            return 0;
                        });
                        displayUsers(sortedUsers);
                    }
    
                    document.getElementById('sort-id').addEventListener('click', () => sortUsers('id'));
                    document.getElementById('sort-email').addEventListener('click', () => sortUsers('email'));
                    document.getElementById('sort-name').addEventListener('click', () => sortUsers('name'));
                    document.getElementById('sort-phone').addEventListener('click', () => sortUsers('phone'));
    
                    let currentPage = 1;
                    const itemsPerPage = 10;
    
                    function paginate(users, page) {
                        const start = (page - 1) * itemsPerPage;
                        const end = start + itemsPerPage;
                        const paginatedUsers = users.slice(start, end);
                        displayUsers(paginatedUsers);
                    }
    
                    function updatePaginationControls() {
                        document.getElementById('prev-page').style.visibility = currentPage > 1 ? 'visible' : 'hidden';
                        document.getElementById('next-page').style.visibility = (currentPage * itemsPerPage) < data.length ? 'visible' : 'hidden';
                    }
    
                    document.getElementById('prev-page').addEventListener('click', () => {
                        if (currentPage > 1) {
                            currentPage--;
                            paginate(data, currentPage);
                            updatePaginationControls();
                        }
                    });
    
                    document.getElementById('next-page').addEventListener('click', () => {
                        if ((currentPage * itemsPerPage) < data.length) {
                            currentPage++;
                            paginate(data, currentPage);
                            updatePaginationControls();
                        }
                    });
    
                    paginate(data, currentPage);
                    updatePaginationControls();
    
                    document.getElementById('select-all').addEventListener('change', function () {
                        const checkboxes = document.querySelectorAll('.select-user');
                        checkboxes.forEach(checkbox => checkbox.checked = this.checked);
                    });
    
                    document.getElementById('delete-selected').addEventListener('click', function () {
                        const selectedIds = Array.from(document.querySelectorAll('.select-user:checked'))
                            .map(checkbox => checkbox.value);
    
                        if (selectedIds.length > 0 && confirm('Are you sure you want to delete selected users?')) {
                            selectedIds.forEach(id => {
                                fetch(`http://localhost:8081/user/delete/${id}`, { method: 'DELETE' })
                                    .then(response => {
                                        if (response.ok) {
                                            return response.json().catch(() => null); // Catch empty responses
                                        } else {
                                            return response.text().then(text => {
                                                throw new Error(text || 'Failed to delete user.');
                                            });
                                        }
                                    })
                                    .then(() => {
                                        alert('Selected users deleted successfully');
                                        userpage('user-crud'); // Refresh the user list
                                    })
                                    .catch(error => {
                                        showError(error.message);
                                    });
                            });
                        }
                    });
    
                    window.editUser = function (id) {
                        const user = data.find(u => u.id === id);
                        document.getElementById('user-id').value = user.id;
                        document.getElementById('user-email').value = user.email;
                        document.getElementById('user-name').value = user.name;
                        document.getElementById('user-phone').value = user.phone;
                        document.getElementById('user-password').value = ''; // Reset password field
                        document.getElementById('user-crud-form').querySelector('button[type="submit"]').textContent = 'Update';
                    };
    
                    window.confirmDeleteUser = function (id) {
                        if (confirm('Are you sure you want to delete this user?')) {
                            deleteUser(id);
                        }
                    };
    
                    function deleteUser(id) {
                        fetch(`http://localhost:8081/user/delete/${id}`, { method: 'DELETE' })
                            .then(response => {
                                if (response.ok) {
                                    return response.json().catch(() => null); // Catch empty responses
                                } else {
                                    return response.text().then(text => {
                                        throw new Error(text || 'Failed to delete user.');
                                    });
                                }
                            })
                            .then(() => {
                                alert('User deleted successfully');
                                userpage('user-crud'); // Refresh the user list
                            })
                            .catch(error => {
                                showError(error.message);
                            });
                    }
                })
                .catch(error => {
                    showError('Failed to load users.');
                });
        }
    }
    


    function dashboard(page) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<p>Loading...</p>';
    
        if (page === 'dashboard') {
            Promise.all([
                fetch('http://localhost:8081/admin/all').then(response => response.json()),
                fetch('http://localhost:8081/user/all').then(response => response.json()),
                fetch('http://localhost:8081/donationcamp/all').then(response => response.json())
            ])
            .then(([admins, users, camps]) => {
                // Calculate counts
                const adminCount = admins.length;
                const userCount = users.length;
                const campCount = camps.length;
                const approvedCampCount = camps.filter(camp => camp.approved).length;
                const pendingCampCount = campCount - approvedCampCount;
    
                // Example data for charts (replace with real data as needed)
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const newAdminsPerMonth = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10) + 1);
    
                mainContent.innerHTML = `
                    <div class="container mt-4">
                        <h2 class="mb-4">Dashboard</h2>
                        
                        <div class="row mb-4">
                            <!-- Total Admins -->
                            <div class="col-md-4 mb-3">
                                <div class="card bg-primary text-white shadow-sm">
                                    <div class="card-body">
                                        <h5 class="card-title">Total Admins</h5>
                                        <p class="card-text display-4">${adminCount}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Total Users -->
                            <div class="col-md-4 mb-3">
                                <div class="card bg-success text-white shadow-sm">
                                    <div class="card-body">
                                        <h5 class="card-title">Total Users</h5>
                                        <p class="card-text display-4">${userCount}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Total Camps -->
                            <div class="col-md-4 mb-3">
                                <div class="card bg-info text-white shadow-sm">
                                    <div class="card-body">
                                        <h5 class="card-title">Total Camps</h5>
                                        <p class="card-text display-4">${campCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row mb-4">
                            <!-- Camps Status Section -->
                            <div class="col-md-6">
                                <div class="card bg-light shadow-sm">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">Approved Camps</h5>
                                        <p class="card-text display-4 text-success">${approvedCampCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card bg-light shadow-sm">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">Pending Camps</h5>
                                        <p class="card-text display-4 text-warning">${pendingCampCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div class="row">
                            <!-- Pie Chart for Camps Status -->
                            <div class="col-md-6 mb-4">
                                <div class="card">
                                    <div class="card-header">
                                        Camps Status Distribution
                                    </div>
                                    <div class="card-body">
                                        <canvas id="campsPieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <!-- Bar Chart for Admins, Users, and Camps -->
                            <div class="col-md-6 mb-4">
                                <div class="card">
                                    <div class="card-header">
                                        Admins, Users, and Camps Count
                                    </div>
                                    <div class="card-body">
                                        <canvas id="countsBarChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <!-- Line Chart for New Admins per Month -->
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        New Admins Per Month
                                    </div>
                                    <div class="card-body">
                                        <canvas id="newAdminsLineChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    
                // Initialize Charts
                const ctxPie = document.getElementById('campsPieChart').getContext('2d');
                new Chart(ctxPie, {
                    type: 'pie',
                    data: {
                        labels: ['Approved', 'Pending'],
                        datasets: [{
                            data: [approvedCampCount, pendingCampCount],
                            backgroundColor: ['#28a745', '#ffc107'],
                            borderColor: '#fff',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                    }
                                }
                            }
                        }
                    }
                });
    
                const ctxBar = document.getElementById('countsBarChart').getContext('2d');
                new Chart(ctxBar, {
                    type: 'bar',
                    data: {
                        labels: ['Admins', 'Users', 'Camps'],
                        datasets: [{
                            label: 'Count',
                            data: [adminCount, userCount, campCount],
                            backgroundColor: ['#007bff', '#28a745', '#17a2b8'],
                            borderColor: '#fff',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                    }
                                }
                            }
                        }
                    }
                });
    
                const ctxLine = document.getElementById('newAdminsLineChart').getContext('2d');
                new Chart(ctxLine, {
                    type: 'line',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'New Admins',
                            data: newAdminsPerMonth,
                            backgroundColor: 'rgba(0, 123, 255, 0.2)',
                            borderColor: '#007bff',
                            borderWidth: 2,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                beginAtZero: true
                            },
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error loading dashboard data:', error);
                mainContent.innerHTML = `
                    <div class="container mt-4">
                        <h2 class="mb-4">Dashboard</h2>
                        <div class="alert alert-danger" role="alert">
                            Error loading dashboard data. Please try again later.
                        </div>
                    </div>
                `;
            });
        }
    }
    
    
    
    
    
    

    
    function showError(message) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    }
    

    function loadUsers() {
        fetch('http://localhost:8081/user/all')
            .then(response => response.json())
            .then(data => {
                const rows = data.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.bloodType}</td>
                        <td><button class="btn btn-primary btn-sm" onclick="editUser(${user.id}, '${user.name}', '${user.email}', '${user.phone}', '${user.bloodType}')">Edit</button></td>
                        <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button></td>
                    </tr>
                `).join('');
                mainContent.innerHTML = `
                    <h2>Users</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Blood Type</th>
                                <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                    <form id="user-crud-form" class="mt-4">
                        <input type="hidden" id="edit-user-id">
                        <div class="mb-3">
                            <label for="user-id" class="form-label">User ID</label>
                            <input type="text" id="user-id" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="user-name" class="form-label">Name</label>
                            <input type="text" id="user-name" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="user-email" class="form-label">Email</label>
                            <input type="email" id="user-email" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="user-phone" class="form-label">Phone</label>
                            <input type="text" id="user-phone" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="user-blood-type" class="form-label">Blood Type</label>
                            <input type="text" id="user-blood-type" class="form-control" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Create User</button>
                    </form>
                `;

                document.getElementById('user-crud-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const id = document.getElementById('user-id').value;
                    const name = document.getElementById('user-name').value;
                    const email = document.getElementById('user-email').value;
                    const phone = document.getElementById('user-phone').value;
                    const bloodType = document.getElementById('user-blood-type').value;
                    const editUserId = document.getElementById('edit-user-id').value;

                    const requestMethod = editUserId ? 'PUT' : 'POST';
                    const url = editUserId
                        ? `http://localhost:8081/user/update/${editUserId}`
                        : 'http://localhost:8081/user/create';

                    fetch(url, {
                        method: requestMethod,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id, name, email, phone, bloodType })
                    })
                    .then(response => response.json())
                    .then(result => {
                        alert(editUserId ? 'User updated successfully' : 'User created successfully');
                        loadUsers();
                    })
                    .catch(error => showError('Failed to process user.'));
                });

                window.editUser = function(id, name, email, phone, bloodType) {
                    document.getElementById('user-id').value = id;
                    document.getElementById('user-name').value = name;
                    document.getElementById('user-email').value = email;
                    document.getElementById('user-phone').value = phone;
                    document.getElementById('user-blood-type').value = bloodType;
                    document.getElementById('edit-user-id').value = id;
                };

                window.deleteUser = function(id) {
                    fetch(`http://localhost:8081/user/delete/${id}`, { method: 'DELETE' })
                        .then(response => {
                            if (response.ok) alert('User deleted successfully');
                            else throw new Error('Failed to delete user');
                        })
                        .catch(error => showError('Failed to delete user.'));
                };
            })
            .catch(error => showError('Failed to load users.'));
    }
});
