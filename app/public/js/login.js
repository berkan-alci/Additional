const log = console.log;

window.addEventListener('load', (e) => {
    const form = document.getElementById('login-info');
    
    const username = document.querySelector('input[name="username"]');
    const password = document.querySelector('input[name="password"]');

    const errUsername = document.querySelector('#username-valid');
    const errPassword = document.querySelector('#password-valid');


    const success = document.querySelector('#success-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        success.style.display = "none";
        success.innerText ="";
        
        resetErr();
        const isValid = validateForm();
        if (isValid) {
            sendRequest();
        }

    });

    const validateForm = () => {
        let isValid = true;
        
        if(username.value === "") {
            setErr(errUsername, 'Enter a username!');
            isValid = false; 
        }

        if (password.value === "") {
            setErr(errPassword, 'Enter a password!');
            isValid = false;
        }

        return isValid;
     };

    const resetErr = () => {
        errUsername.style.display = "none";
        errPassword.style.display = "none";
        
    };

    const setErr = (element, message) => {
        element.style.display = 'block';
        element.innerText = message;
    };

    const reset = () => {
        username.value = "";
        password.value = "";
    };

    const sendRequest = async () => {

        const data = {
            username: username.value,
            password: password.value,
        }

        const result = await fetch('/login', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        // .then((response) => response.json())

        // if(result.status === 'ok'){
        //     alert('Login Successful!');
        //     success.style.display ="block";
        //     success.innerText = 'Login successful!';
        //     reset();
        // } else {
        //     alert(result.error)
        // }
    }
});