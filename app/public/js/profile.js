const log = console.log;

window.addEventListener('load', (e) => {
    const formAddress = document.getElementById('edit-address');
    const formCard = document.getElementById('edit-card');
    const formEmail = document.getElementById('edit-email');
    const formPassword = document.getElementById('edit-password');
    
    const username = document.querySelector('input[name="username"]');
    const password = document.querySelector('input[name="password"]');
    const address = document.querySelector('input[name="street"]');
    const cardNumber = document.querySelector('input[name="cardNumber"]');

    const errUsername = document.querySelector('#username-valid');
    const errPassword = document.querySelector('#password-valid');
    const errAddress = document.querySelector('#address-valid');
    const errCardNumber = document.querySelector('#cardNumber-valid');

    const successOne = document.querySelector('#success-message-1');
    const successOne = document.querySelector('#success-message-2');
    const successOne = document.querySelector('#success-message-3');
    const successOne = document.querySelector('#success-message-4');
    
    formEmail.addEventListener('submit', async (e) => {
        e.preventDefault();

        successOne.style.display = "none";
        successOne.innerText ="";
        move.style.display="none";
        move.innerText="";
        
        resetErr();
        const isValid = validateForm();
        if (isValid) {
            sendRequest();
        }

    });

    const validateForm = () => {
        let isValid = true;
        
        if(email.value === "") {
            setErr(errEmail, 'Enter an email!');
            isValid = false;

        } else if (!email.value === /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g ) {
            setErr(errEmail, 'Enter a valid email!');
            isValid = false;
        }

        if (address.value === "" ) {
            setErr(errZip, 'Enter a valid Address!');
            isValid = false;
        }

        if (cardNumber.value === "") {
            setErr(errCardNumber, 'Enter your IBAN!');
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
        errCardNumber.style.display = "none";
        errAddress.style.display = "none";
        
    };

    const setErr = (element, message) => {
        element.style.display = 'block';
        element.innerText = message;
    };

    const reset = () => {
        username.value = "";
        password.value = "";
        address.value = "";
        cardNumber.value = "";
    };

    const sendRequest = async () => {

     
        const result = await fetch('/login', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        }).then((res) => res.json())

        if(result.status === 'ok'){
            alert('Login Successful!');
            success.style.display ="block";
            success.innerText = 'Login successful!';
            move.style.display="block";
            move.innerText="Click here";
            reset();
        } else {
            alert(result.error)
        }
    }
});