document.getElementById('addContributorBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

function fetchAndDisplayContributors() {
    fetch('http://localhost:8085/contributor/contributors')
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching contributors:', response.status);
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById('contributorsTable');
            tableBody.innerHTML = '';
            data.forEach(contributor => {
                const newRow = `<tr>
                    <td>${contributor.name}</td>
                    <td>${contributor.email}</td>
                    <td>${contributor.nic}</td>
                    <td>${contributor.address}</td>
                    <td>${contributor.city}</td>
                    <td>${contributor.phoneNumber}</td>
                    <td>********</td>
                </tr>`;
                tableBody.innerHTML += newRow;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load contributors');
        });
}

// Fetch contributors when page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayContributors);


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
    
    // Create a contributor object
    const contributorData = {
        name: name,
        email: email,
        nic: nic,
        address: address,
        city: city,
        phoneNumber: phone,
        password: password
    };

    // Send data to the backend using Fetch API
    fetch('http://localhost:8085/contributor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contributorData)
    })
    .then(response => {
        if (!response.ok) {
            // Log the status if response is not OK (e.g., 4xx or 5xx errors)
            console.error('Server error:', response.status);
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Add the new contributor to the table dynamically
        const newRow = `<tr>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.nic}</td>
            <td>${data.address}</td>
            <td>${data.city}</td>
            <td>${data.phoneNumber}</td>
            <td>********</td>
        </tr>`;

        document.getElementById('contributorsTable').innerHTML += newRow;

        // Close the modal and reset the form
        document.getElementById('modal').style.display = 'none';
        document.getElementById('contributorForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add contributor');
    });
});

