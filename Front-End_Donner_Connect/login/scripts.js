function openRole(evt, roleName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(roleName).style.display = "block";
    evt.currentTarget.className += " active";

    // Hide signup link for Contributor and Admin
    if (roleName === 'Contributor' || roleName === 'Admin') {
        document.getElementById('registerLink').style.display = 'none';
    } else {
        document.getElementById('registerLink').style.display = 'block';
    }
}

document.getElementById("User").style.display = "block"; // Default tab open

function handleLogin(event, role) {
    event.preventDefault();
    //const form = event.target;

    var uname = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var requestBody = {
        email: uname,
        password: password,
        role: role
    };

    // const uname = form.querySelector('input[type="username"]').value;
    // const password = form.querySelector('input[type="password"]').value;

    var url = 'http://localhost:8083/login';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        alert('Login successful'); 
        window.location.href = "register.html";
        console.log(data); 
    })
    .catch(error => console.error('Error:', error));
}


function handleSignup(event) {
    print("SignUp");
    event.preventDefault();
    const form = event.target;
    const fname = form.querySelector('input[type="text"]').value;
    const lname = form.querySelector('input[type="text"]').value;
    const uname = form.querySelector('input[type="username"]').value;
    const password = form.querySelector('input[type="password"]').value;

    fetch('http://localhost:8083/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "firstName" : fname,
            "lastName" : lname,
            "username" : uname,
            "password" : password,
            "role" : "ADMIN"
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Registration successful');
        console.log(data); 
    })
    .catch(error => console.error('Error:', error));
}