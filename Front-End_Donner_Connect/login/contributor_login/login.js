function loginUser(event) {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var url = 'http://localhost:8083/getUserIDByEmailAndPassword';

    var requestBody = {
        email: email,
        password: password
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.text())
    .then(data => {
        console.log("Received data:", data);
        if (parseInt(data) > 0) {
            // Store contributorId in local storage
            localStorage.setItem("contributorId", data);

            //alert("Login successful! User ID: " + data);
            alert("Login successful! User ID: " + data);
            window.location.href = "../../Camp/index.html"; // Redirect to camp creation page
        } else {
            alert("Invalid email or password");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



function openForm() {
    document.getElementById("loginForm").style.display = "block";
}

function closeForm() {
    document.getElementById("loginForm").style.display = "none";
}
