document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');

    // Event listeners for sidebar links
    document.getElementById('dashboard-link').addEventListener('click', function(event) {
        event.preventDefault();
        loadContent('dashboard');
    });

    document.getElementById('camps-link').addEventListener('click', function(event) {
        event.preventDefault();
        loadContent('camps');
    });

    document.getElementById('create-admin-link').addEventListener('click', function(event) {
        event.preventDefault();
        loadContent('create-admin');
    });

    document.getElementById('user-crud-link').addEventListener('click', function(event) {
        event.preventDefault();
        loadContent('user-crud');
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
        mainContent.innerHTML = '<p>Loading...</p>';
        switch (page) {
            case 'dashboard':
                mainContent.innerHTML = '<h2>Dashboard</h2><p>Loading dashboard data...</p>';
                // Implement AJAX request for dashboard data
                break;
            case 'create-admin':
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
                document.getElementById('create-admin-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const id = document.getElementById('admin-id').value;
                    const email = document.getElementById('admin-email').value;
                    const name = document.getElementById('admin-name').value;
                    const password = document.getElementById('admin-password').value;
                    const phone = document.getElementById('admin-phone').value;
                    fetch('http://localhost:8081/admin/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id, email, name, password, phone })
                    })
                    .then(response => response.json())
                    .then(result => {
                        alert('Admin created successfully');
                        loadAdmins();
                    })
                    .catch(error => showError('Failed to create admin.'));
                });
                break;
            case 'camps':
                fetch('http://localhost:8081/donationcamp/all')
                    .then(response => response.json())
                    .then(data => {
                        const rows = data.map(camp => `
                            <tr>
                                <td>${camp.id}</td>
                                <td>${camp.name}</td>
                                <td>${camp.description}</td>
                                <td><button class="btn btn-primary btn-sm" onclick="editCamp(${camp.id})">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" onclick="deleteCamp(${camp.id})">Delete</button></td>
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
                        document.getElementById('camp-crud-form').addEventListener('submit', function(e) {
                            e.preventDefault();
                            const id = document.getElementById('camp-id').value;
                            const name = document.getElementById('camp-name').value;
                            const description = document.getElementById('camp-description').value;
                            fetch('http://localhost:8081/donationcamp/approve/' + id, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id, name, description })
                            })
                            .then(response => response.json())
                            .then(result => {
                                alert('Camp created successfully');
                                loadCamps();
                            })
                            .catch(error => showError('Failed to create camp.'));
                        });
                        window.editCamp = function(id) {
                            fetch(`http://localhost:8081/donationcamp/${id}`)
                                .then(response => response.json())
                                .then(camp => {
                                    mainContent.innerHTML = `
                                        <h2>Edit Camp</h2>
                                        <form id="edit-camp-form" class="row g-3">
                                            <div class="col-md-3">
                                                <label for="edit-camp-id" class="form-label">Camp ID</label>
                                                <input type="text" id="edit-camp-id" class="form-control" value="${camp.id}" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="edit-camp-name" class="form-label">Name</label>
                                                <input type="text" id="edit-camp-name" class="form-control" value="${camp.name}" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="edit-camp-description" class="form-label">Description</label>
                                                <textarea id="edit-camp-description" class="form-control" rows="4" required>${camp.description}</textarea>
                                            </div>
                                            <div class="col-12">
                                                <button type="submit" class="btn btn-primary">Update Camp</button>
                                            </div>
                                        </form>
                                    `;
                                    document.getElementById('edit-camp-form').addEventListener('submit', function(e) {
                                        e.preventDefault();
                                        const id = document.getElementById('edit-camp-id').value;
                                        const name = document.getElementById('edit-camp-name').value;
                                        const description = document.getElementById('edit-camp-description').value;
                                        fetch(`http://localhost:8081/donationcamp/approve/${id}`, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ name, description })
                                        })
                                        .then(response => response.json())
                                        .then(result => {
                                            alert('Camp updated successfully');
                                            loadCamps();
                                        })
                                        .catch(error => showError('Failed to update camp.'));
                                    });
                                })
                                .catch(error => showError('Failed to load camp.'));
                        };
                        window.deleteCamp = function(id) {
                            fetch(`http://localhost:8081/donationcamp/approve/${id}?approved=false`, { method: 'DELETE' })
                                .then(response => {
                                    if (response.ok) alert('Camp deleted successfully');
                                    else throw new Error('Failed to delete camp');
                                })
                                .catch(error => showError('Failed to delete camp.'));
                        };
                    })
                    .catch(error => showError('Failed to load camps.'));
                break;
            case 'user-crud':
                fetch('http://localhost:8081/user/all')
                    .then(response => response.json())
                    .then(data => {
                        const rows = data.map(user => `
                            <tr>
                                <td>${user.id}</td>
                                <td>${user.email}</td>
                                <td>${user.name}</td>
                                <td>${user.phone}</td>
                                <td><button class="btn btn-primary btn-sm" onclick="editUser(${user.id})">Edit</button></td>
                                <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button></td>
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
                            <form id="user-crud-form" class="mt-4">
                                <div class="mb-3">
                                    <label for="user-id" class="form-label">User ID</label>
                                    <input type="text" id="user-id" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="user-email" class="form-label">Email</label>
                                    <input type="email" id="user-email" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="user-name" class="form-label">Name</label>
                                    <input type="text" id="user-name" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="user-phone" class="form-label">Phone</label>
                                    <input type="text" id="user-phone" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Create User</button>
                            </form>
                        `;
                        document.getElementById('user-crud-form').addEventListener('submit', function(e) {
                            e.preventDefault();
                            const id = document.getElementById('user-id').value;
                            const email = document.getElementById('user-email').value;
                            const name = document.getElementById('user-name').value;
                            const phone = document.getElementById('user-phone').value;
                            fetch('http://localhost:8081/user/create', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id, email, name, phone })
                            })
                            .then(response => response.json())
                            .then(result => {
                                alert('User created successfully');
                                loadUsers();
                            })
                            .catch(error => showError('Failed to create user.'));
                        });
                        window.editUser = function(id) {
                            fetch(`http://localhost:8081/user/${id}`)
                                .then(response => response.json())
                                .then(user => {
                                    mainContent.innerHTML = `
                                        <h2>Edit User</h2>
                                        <form id="edit-user-form" class="row g-3">
                                            <div class="col-md-3">
                                                <label for="edit-user-id" class="form-label">User ID</label>
                                                <input type="text" id="edit-user-id" class="form-control" value="${user.id}" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="edit-user-email" class="form-label">Email</label>
                                                <input type="email" id="edit-user-email" class="form-control" value="${user.email}" required>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="edit-user-name" class="form-label">Name</label>
                                                <input type="text" id="edit-user-name" class="form-control" value="${user.name}" required>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="edit-user-phone" class="form-label">Phone</label>
                                                <input type="text" id="edit-user-phone" class="form-control" value="${user.phone}" required>
                                            </div>
                                            <div class="col-12">
                                                <button type="submit" class="btn btn-primary">Update User</button>
                                            </div>
                                        </form>
                                    `;
                                    document.getElementById('edit-user-form').addEventListener('submit', function(e) {
                                        e.preventDefault();
                                        const id = document.getElementById('edit-user-id').value;
                                        const email = document.getElementById('edit-user-email').value;
                                        const name = document.getElementById('edit-user-name').value;
                                        const phone = document.getElementById('edit-user-phone').value;
                                        fetch(`http://localhost:8081/user/update/${id}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ email, name, phone })
                                        })
                                        .then(response => response.json())
                                        .then(result => {
                                            alert('User updated successfully');
                                            loadUsers();
                                        })
                                        .catch(error => showError('Failed to update user.'));
                                    });
                                })
                                .catch(error => showError('Failed to load user.'));
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
                break;
            case 'send-notification':
                mainContent.innerHTML = `
                    <h2>Send Notification</h2>
                    <form id="notification-form" class="row g-3">
                        <div class="col-md-6">
                            <label for="notification-title" class="form-label">Title</label>
                            <input type="text" id="notification-title" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label for="notification-message" class="form-label">Message</label>
                            <textarea id="notification-message" class="form-control" rows="4" required></textarea>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Send Notification</button>
                        </div>
                    </form>
                `;
                document.getElementById('notification-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const title = document.getElementById('notification-title').value;
                    const message = document.getElementById('notification-message').value;
                    // Implement notification send logic here
                    alert('Notification sent successfully');
                });
                break;
            default:
                mainContent.innerHTML = '<p>Page not found.</p>';
        }
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
                        <td><button class="btn btn-primary btn-sm" onclick="editAdmin(${admin.id})">Edit</button></td>
                        <td><button class="btn btn-danger btn-sm" onclick="deleteAdmin(${admin.id})">Delete</button></td>
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
                window.editAdmin = function(id) {
                    fetch(`http://localhost:8081/admin/${id}`)
                        .then(response => response.json())
                        .then(admin => {
                            mainContent.innerHTML = `
                                <h2>Edit Admin</h2>
                                <form id="edit-admin-form" class="row g-3">
                                    <div class="col-md-3">
                                        <label for="edit-admin-id" class="form-label">Admin ID</label>
                                        <input type="text" id="edit-admin-id" class="form-control" value="${admin.id}" readonly>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="edit-admin-email" class="form-label">Email</label>
                                        <input type="email" id="edit-admin-email" class="form-control" value="${admin.email}" required>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="edit-admin-name" class="form-label">Name</label>
                                        <input type="text" id="edit-admin-name" class="form-control" value="${admin.name}" required>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="edit-admin-phone" class="form-label">Phone</label>
                                        <input type="text" id="edit-admin-phone" class="form-control" value="${admin.phone}" required>
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary">Update Admin</button>
                                    </div>
                                </form>
                            `;
                            document.getElementById('edit-admin-form').addEventListener('submit', function(e) {
                                e.preventDefault();
                                const email = document.getElementById('edit-admin-email').value;
                                const name = document.getElementById('edit-admin-name').value;
                                const phone = document.getElementById('edit-admin-phone').value;
                                fetch(`http://localhost:8081/admin/update/${id}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ email, name, phone })
                                })
                                .then(response => response.json())
                                .then(result => {
                                    alert('Admin updated successfully');
                                    loadAdmins();
                                })
                                .catch(error => showError('Failed to update admin.'));
                            });
                        })
                        .catch(error => showError('Failed to load admin.'));
                };
                window.deleteAdmin = function(id) {
                    fetch(`http://localhost:8081/admin/delete/${id}`, { method: 'DELETE' })
                        .then(response => {
                            if (response.ok) alert('Admin deleted successfully');
                            else throw new Error('Failed to delete admin');
                        })
                        .catch(error => showError('Failed to delete admin.'));
                };
            })
            .catch(error => showError('Failed to load admins.'));
    }
});
