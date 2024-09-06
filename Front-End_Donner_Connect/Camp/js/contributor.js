document.getElementById('addContributorBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('contributorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const nic = document.getElementById('nic').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    // Add new contributor to the table
    const newRow = `<tr>
        <td>${name}</td>
        <td>${email}</td>
        <td>${nic}</td>
        <td>${address}</td>
        <td>${city}</td>
        <td>${phone}</td>
        <td>********</td>
    </tr>`;

    document.getElementById('contributorsTable').innerHTML += newRow;

    // Close the modal
    document.getElementById('modal').style.display = 'none';
    
    // Reset the form
    document.getElementById('contributorForm').reset();
});
