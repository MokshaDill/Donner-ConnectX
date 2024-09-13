function openRole(evt, roleName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the 'active' class from all tab buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the clicked tab content
    document.getElementById(roleName).style.display = "block";
    evt.currentTarget.className += " active";

    // Show/Hide the 'Sign Up' link based on the selected role
    if (roleName === 'User') {
        document.getElementById('toggleLink').style.display = 'block';  // Show the 'Sign Up' link
    } else {
        document.getElementById('toggleLink').style.display = 'none';   // Hide the 'Sign Up' link
    }
}



function openForm() {
    document.getElementById("loginForm").style.display = "block";
}

// Function to close the login form
function closeForm() {
    document.getElementById("loginForm").style.display = "none";
}

// Function to switch to the Sign Up form
function toggleToSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

// Function to switch back to the Login form
function toggleToLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}


function handleLoginUser(event) {
    event.preventDefault();

    const uname = document.getElementById("usernameUser").value;
    const password = document.getElementById("passwordUser").value;


    fetch('http://localhost:8083/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username" : uname,
            "password" : password
            //"role": "USER"
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Login successful userId= '+data.user.id); 
        localStorage.setItem('username', data.user.username);
            console.log(data); 
            window.location.href = "../../index.html";
        
    })
    .catch(error => console.error('Error:', error));
}

function handleLoginContributor(event) {
    // event.preventDefault();

    // const uname = document.getElementById("usernameContributor").value;
    // const password = document.getElementById("passwordContributor").value;


    // fetch('http://localhost:8083/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         "username" : uname,
    //         "password" : password
    //         //"role": "USER"
    //     }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     alert('Login successful userId= '+data.user.id); 
    //     localStorage.setItem('username', data.user.username);
    //         console.log(data); 
    //         window.location.href = "../Contributor/index.html";
    // })
    // .catch(error => console.error('Error:', error));
}

function handleLoginUserAdmin(event) {
    event.preventDefault();

    const uname = document.getElementById("usernameAdmin").value;
    const password = document.getElementById("passwordAdmin").value;

    console.log(uname); 
    console.log(password); 

    fetch('http://localhost:8083/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username" : uname,
            "password" : password
            // "username" : uname,
            // "password" : password
            //"role": "USER"
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Login successful userId= '+data.userId); 
        // localStorage.setItem('username', data.user.username);
        console.log(data); 
        window.location.href = "../../index.html";
        
    })
    .catch(error => console.error('Error:', error));
}



function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="text"]').value;
    const uname = form.querySelector('input[type="username"]').value;
    const password = form.querySelector('input[type="password"]').value;

    fetch('http://localhost:8083/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email" : email,
            "username" : uname,
            "password" : password,
            "role" : "USER"
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Registration successful');
        console.log(data.user.role); 
        localStorage.setItem('username', data.user.username);
        // if("USER" == data.user.role){
        //     window.location.href = ../welcome page/home.html;
        // }
        // if("CONTRIBUTOR" == data.user.role){
        //     window.location.href = ../welcome page/about.html;
        // }
        if("ADMIN" == data.user.role){
            window.location.href = "../../index.html";
        }
    })
    .catch(error => console.error('Error:', error));
}

// //Retrieve the userId from localStorage (or sessionStorage)
// const userName = localStorage.getItem('username');

// if (userName) {
//     console.log("User Name from localStorage:", userName);
//     // Use the userId for further logic
// }

window.onload = function() {
    const userName = localStorage.getItem('username');
    
    if (userName) {
        // Hide the login button
        document.getElementById('open-button').style.display = 'none';
        
        // Show the greeting message with the username
        document.getElementById('userGreeting').style.display = 'block';
        document.getElementById('usernameDisplay').innerText = userName;
    }
};

function handleLogout() {
    // Remove the username from localStorage
    localStorage.removeItem('username');
    
    // Reload the page or redirect to the login page
    window.location.reload(); 
}







