document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');

    // Event listeners for sidebar links
    document.getElementById('dashboard-link').addEventListener('click', () => loadContent('dashboard'));
    document.getElementById('camps-link').addEventListener('click', () => loadContent('camps'));
    document.getElementById('create-admin-link').addEventListener('click', () => loadContent('create-admin'));
    document.getElementById('user-crud-link').addEventListener('click', () => loadContent('user-crud'));
    document.getElementById('send-notification-link').addEventListener('click', () => loadContent('send-notification'));
    document.getElementById('logout-link').addEventListener('click', () => alert('Logout functionality not implemented.'));

    function showError(message) {
        mainContent.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    }

    function loadContent(page) {
        mainContent.innerHTML = '<p>Loading...</p>';
        switch (page) {
            case 'dashboard':
                mainContent.innerHTML = '<h2>Dashboard</h2><p>Loading dashboard data...</p>';
                // Implement AJAX request for dashboard data
                break;
            case 'create-admin':
                loadCreateAdminPage();
                break;
            case 'camps':
                loadCampsPage();
                break;
            case 'user-crud':
                loadUsersPage();
                break;
            case 'send-notification':
                loadSendNotificationPage();
                break;
            default:
                mainContent.innerHTML = '<p>Page not found.</p>';
        }
    }

    function loadCreateAdminPage() {
        mainContent.innerHTML = `
            <h2>Admin Configurations</h2>
            <form id="create-admin-form" class="row g-3">
                <div class="col-md-3">
                    <label for="admin-id" class="form-label">Admin ID</label>
                    <input type="text" id="admin-id" class="form-control" required>
                </div>
                <div class="col-md-3">
                    <label for="admin-email" class="form-label">Email</label>
                    <input type="email" id="admin-email" class="form-control" required>
                </div>
                <div class="col-md-3">
                    <label for="admin-name" class="form-label">Name</label>
                    <input type="text" id="admin-name" class="form-control" required>
                </div>
                <div class="col-md-3">
                    <label for="admin-password" class="form-label">Password</label>
                    <input type="password" id="admin-password" class="form-control" required>
                </div>
                <div class="col-md-3">
                    <label for="admin-phone" class="form-label">Phone</label>
                    <input type="text" id="admin-phone" class="form-control" required>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Create Admin</button>
                </div>
            </form>
            <hr>
            <h3>Existing Admins</h3>
            <div id="admin-data"></div>
        `;
        loadAdmins();
        document.getElementById('create-admin-form').addEventListener('submit', handleCreateAdmin);
    }

    function loadCampsPage() {
        fetch('http://localhost:8081/donationcamp/all')
            .then(response => response.json())
            .then(data => {
                const rows = data.map(camp => `
                    <tr>
                        <td>${camp.id}</td>
                        <td>${camp.name}</td>
                        <td>${camp.description}</td>
                        <td><button class="btn btn-primary btn-sm" data-id="${camp.id}" data-bs-toggle="modal" data-bs-target="#editCampModal">Edit</button></td>
                        <td><button class="btn btn-danger btn-sm" data-id="${camp.id}" data-bs-toggle="modal" data-bs-target="#deleteCampModal">Delete</button></td>
                    </tr>
                `).join('');
                mainContent.innerHTML = `
                    <h2>Camps</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                    <form id="camp-crud-form" class="mt-4">
                        <div class="mb-3">
                            <label for="camp-id" class="form-label">Camp ID</label>
                            <input type="text" id="camp-id" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="camp-name" class="form-label">Name</label>
                            <input type="text" id="camp-name" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="camp-description" class="form-label">Description</label>
                            <textarea id="camp-description" class="form-control" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Create Camp</button>
                    </form>
                `;
                document.getElementById('camp-crud-form').addEventListener('submit', handleCreateCamp);

                document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
                    button.addEventListener('click', function() {
                        const campId = this.getAttribute('data-id');
                        if (this.classList.contains('btn-danger')) {
                            document.getElementById('confirm-delete-camp').setAttribute('data-id', campId);
                        } else {
                            fetch(`http://localhost:8081/donationcamp/${campId}`)
                                .then(response => response.json())
                                .then(camp => {
                                    document.getElementById('camp-id').value = camp.id;
                                    document.getElementById('camp-name').value = camp.name;
                                    document.getElementById('camp-description').value = camp.description;
                                    document.querySelector('#camp-crud-form button[type="submit"]').textContent = 'Update Camp';
                                    document.getElementById('camp-crud-form').onsubmit = function(e) {
                                        e.preventDefault();
                                        const updatedCamp = {
                                            id: document.getElementById('camp-id').value,
                                            name: document.getElementById('camp-name').value,
                                            description: document.getElementById('camp-description').value
                                        };
                                        fetch(`http://localhost:8081/donationcamp/update/${campId}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(updatedCamp)
                                        })
                                        .then(response => response.json())
                                        .then(result => {
                                            alert('Camp updated successfully');
                                            loadContent('camps');
                                        })
                                        .catch(error => showError('Failed to update camp.'));
                                    };
                                })
                                .catch(error => showError('Failed to load camp details.'));
                        }
                    });
                });
            })
            .catch(error => showError('Failed to load camps.'));
    }

    function loadUsersPage() {
        fetch('http://localhost:8081/user/all')
            .then(response => response.json())
            .then(data => {
                const rows = data.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td><button class="btn btn-primary btn-sm" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#editUserModal">Edit</button></td>
                        <td><button class="btn btn-danger btn-sm" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#deleteUserModal">Delete</button></td>
                    </tr>
                `).join('');
                mainContent.innerHTML = `
                    <h2>Users</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                `;
                document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
                    button.addEventListener('click', function() {
                        const userId = this.getAttribute('data-id');
                        if (this.classList.contains('btn-danger')) {
                            document.getElementById('confirm-delete-user').setAttribute('data-id', userId);
                        } else {
                            fetch(`http://localhost:8081/user/${userId}`)
                                .then(response => response.json())
                                .then(user => {
                                    document.getElementById('edit-user-id').value = user.id;
                                    document.getElementById('edit-user-email').value = user.email;
                                    document.getElementById('edit-user-name').value = user.name;
                                    document.getElementById('edit-user-phone').value = user.phone;
                                    document.getElementById('update-user-form').onsubmit = function(e) {
                                        e.preventDefault();
                                        const updatedUser = {
                                            id: document.getElementById('edit-user-id').value,
                                            email: document.getElementById('edit-user-email').value,
                                            name: document.getElementById('edit-user-name').value,
                                            phone: document.getElementById('edit-user-phone').value
                                        };
                                        fetch(`http://localhost:8081/user/update/${userId}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(updatedUser)
                                        })
                                        .then(response => response.json())
                                        .then(result => {
                                            alert('User updated successfully');
                                            loadContent('user-crud');
                                        })
                                        .catch(error => showError('Failed to update user.'));
                                    };
                                })
                                .catch(error => showError('Failed to load user details.'));
                        }
                    });
                });
            })
            .catch(error => showError('Failed to load users.'));
    }

    function loadSendNotificationPage() {
        mainContent.innerHTML = `
            <h2>Send Notification</h2>
            <form id="send-notification-form">
                <div class="mb-3">
                    <label for="notification-message" class="form-label">Message</label>
                    <textarea id="notification-message" class="form-control" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Notification</button>
            </form>
        `;
        document.getElementById('send-notification-form').addEventListener('submit', handleSendNotification);
    }

    function handleCreateAdmin(event) {
        event.preventDefault();
        const admin = {
            id: document.getElementById('admin-id').value,
            email: document.getElementById('admin-email').value,
            name: document.getElementById('admin-name').value,
            password: document.getElementById('admin-password').value,
            phone: document.getElementById('admin-phone').value
        };
        fetch('http://localhost:8081/admin/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        })
        .then(response => response.json())
        .then(result => {
            alert('Admin created successfully');
            loadCreateAdminPage();
        })
        .catch(error => showError('Failed to create admin.'));
    }

    function handleCreateCamp(event) {
        event.preventDefault();
        const camp = {
            id: document.getElementById('camp-id').value,
            name: document.getElementById('camp-name').value,
            description: document.getElementById('camp-description').value
        };
        fetch('http://localhost:8081/donationcamp/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(camp)
        })
        .then(response => response.json())
        .then(result => {
            alert('Camp created successfully');
            loadContent('camps');
        })
        .catch(error => showError('Failed to create camp.'));
    }

    function handleSendNotification(event) {
        event.preventDefault();
        const message = document.getElementById('notification-message').value;
        fetch('http://localhost:8081/notification/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(result => {
            alert('Notification sent successfully');
        })
        .catch(error => showError('Failed to send notification.'));
    }

    function loadAdmins() {
        fetch('http://localhost:8081/admin/all')
            .then(response => response.json())
            .then(data => {
                const rows = data.map(admin => `
                    <tr>
                        <td>${admin.id}</td>
                        <td>${admin.email}</td>
                        <td>${admin.name}</td>
                        <td>${admin.phone}</td>
                        <td><button class="btn btn-primary btn-sm" data-id="${admin.id}" data-bs-toggle="modal" data-bs-target="#editAdminModal">Edit</button></td>
                        <td><button class="btn btn-danger btn-sm" data-id="${admin.id}" data-bs-toggle="modal" data-bs-target="#deleteAdminModal">Delete</button></td>
                    </tr>
                `).join('');
                document.getElementById('admin-data').innerHTML = `
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                `;
                document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
                    button.addEventListener('click', function() {
                        const adminId = this.getAttribute('data-id');
                        if (this.classList.contains('btn-danger')) {
                            document.getElementById('confirm-delete-admin').setAttribute('data-id', adminId);
                        } else {
                            fetch(`http://localhost:8081/admin/${adminId}`)
                                .then(response => response.json())
                                .then(admin => {
                                    document.getElementById('edit-admin-id').value = admin.id;
                                    document.getElementById('edit-admin-email').value = admin.email;
                                    document.getElementById('edit-admin-name').value = admin.name;
                                    document.getElementById('edit-admin-phone').value = admin.phone;
                                    document.getElementById('update-admin-form').onsubmit = function(e) {
                                        e.preventDefault();
                                        const updatedAdmin = {
                                            id: document.getElementById('edit-admin-id').value,
                                            email: document.getElementById('edit-admin-email').value,
                                            name: document.getElementById('edit-admin-name').value,
                                            phone: document.getElementById('edit-admin-phone').value
                                        };
                                        fetch(`http://localhost:8081/admin/update/${adminId}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(updatedAdmin)
                                        })
                                        .then(response => response.json())
                                        .then(result => {
                                            alert('Admin updated successfully');
                                            loadCreateAdminPage();
                                        })
                                        .catch(error => showError('Failed to update admin.'));
                                    };
                                })
                                .catch(error => showError('Failed to load admin details.'));
                        }
                    });
                });
            })
            .catch(error => showError('Failed to load admins.'));
    }

    document.getElementById('confirm-delete-camp').addEventListener('click', function() {
        const campId = this.getAttribute('data-id');
        fetch(`http://localhost:8081/donationcamp/delete/${campId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                alert('Camp deleted successfully');
                loadContent('camps');
            })
            .catch(error => showError('Failed to delete camp.'));
    });

    document.getElementById('confirm-delete-user').addEventListener('click', function() {
        const userId = this.getAttribute('data-id');
        fetch(`http://localhost:8081/user/delete/${userId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                alert('User deleted successfully');
                loadContent('user-crud');
            })
            .catch(error => showError('Failed to delete user.'));
    });

    document.getElementById('confirm-delete-admin').addEventListener('click', function() {
        const adminId = this.getAttribute('data-id');
        fetch(`http://localhost:8081/admin/delete/${adminId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                alert('Admin deleted successfully');
                loadCreateAdminPage();
            })
            .catch(error => showError('Failed to delete admin.'));
    });
});
