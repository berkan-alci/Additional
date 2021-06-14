const log = console.log;


window.addEventListener('load', (e) => {
    const form = document.getElementById('register-info');
    
    const username = document.querySelector('input[name="username"]');
    const password = document.querySelector('input[name="password"]');
    const confirmPassword = document.querySelector('input[name="confirmPassword"]');
    const email = document.querySelector('input[name="email"]');
    const address = document.querySelector('input[name="street"]');
    const city = document.querySelector('input[name="city"]');
    const zip = document.querySelector('input[name="zip"]');
    const cardNumber = document.querySelector('input[name="cardNumber"]');
    const birthdate = document.querySelector('input[name="birthdate"]');
    const tos = document.querySelector('input[name="tos"]');

    const errUsername = document.querySelector('#username-valid');
    const errPassword = document.querySelector('#password-valid');
    const errConfirmPassword = document.querySelector('#confirm-password-valid');
    const errEmail = document.querySelector('#email-input-valid');
    const errAddress = document.querySelector('#address-valid');
    const errCity = document.querySelector('#city-valid');
    const errZip = document.querySelector('#zip-valid');
    const errCardNumber = document.querySelector('#cardNumber-valid');
    const errBirthdate = document.querySelector('#birthdate-valid');
    const errTos = document.querySelector('#tos-valid');

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

        if (password.value !== confirmPassword.value) {
            setErr(errPassword, 'Both passwords must match!');
            isValid = false;
        }

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

        if (zip.value === "" || isNaN(zip.value)) {
            setErr(errZip, 'Enter a valid ZIP!');
            isValid = false;
        }

        if(city.value === "") {
            setErr(errCity, 'Enter a city!');
            isValid = false;
        }

        if (cardNumber.value === "") {
            setErr(errCardNumber, 'Enter your IBAN!');
            isValid = false;
        }

        if(birthdate.value === "") {
            setErr(errBirthdate, 'Enter your birthdate!');
            isValid = false;
        }

        if(tos.checked === false) {
            setErr(errCardNumber, 'You must accept the ToS!');
            isValid = false;
        }

        return isValid;
     };

    const resetErr = () => {
        errUsername.style.display = "none";
        errPassword.style.display = "none";
        errConfirmPassword.style.display = "none";
        errEmail.style.display = "none";
        errAddress.style.display = "none";
        errCity.style.display = "none";
        errZip.style.display = "none";
        errCardNumber.style.display = "none";
        errBirthdate.style.display = "none";
        errTos.style.display = "none";
    };

    const setErr = (element, message) => {
        element.style.display = 'block';
        element.innerText = message;
    };

    const reset = () => {
        username.value = "";
        password.value = "";
        confirmPassword.value = "";
        email.value = "";
        address.value = "";
        city.value = "";
        zip.value = "";
        cardNumber.value = "";
        birthdate.value = "";
        tos.checked = false;
    };

    const sendRequest = async () => {

        const data = {
            username: username.value,
            password: password.value,
            email: email.value,
            street: address.value,
            city: city.value,
            zip: zip.value,
            cardNumber: cardNumber.value,
            birthdate: birthdate.value
        }

        const result = await fetch('/register', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            window.location.href = '/login';
        })

      
    }
});




    
    

