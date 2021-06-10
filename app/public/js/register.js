const log = console.log;


window.addEventListener('load', (e) => {
    const form = document.getElementById('register-info');
    
    const username = document.querySelector('input=[name="username"]');
    const password = document.querySelector('input=[name="password"]');
    const confirmPassword = document.querySelector('input=[name="confirmPassword"]');
    const email = document.querySelector('input=[name="email"]');
    const address = document.querySelector('input=[name="street"]');
    const city = document.querySelector('input=[name="city"]');
    const zip = document.querySelector('input=[name="zip"]');
    const cardNumber = document.querySelector('input=[name="cardNumber"]');
    const birthdate = document.querySelector('input=[name="birthdate"]');
    const tos = document.querySelector('input=[name="tos"]');

    const errUsername = document.querySelector('username-valid');
    const errPassword = document.querySelector('password-valid');
    const errConfirmPassword = document.querySelector('confirm-password-valid');
    const errEmail = document.querySelector('email-valid');
    const errAddress = document.querySelector('address-valid');
    const errCity = document.querySelector('city-valid');
    const errZip = document.querySelector('zip-valid');
    const errCardNumber = document.querySelector('cardNumber-valid');
    const errBirthdate = document.querySelector('birthdate-valid');
    const errTos = document.querySelector('tos-valid');

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
});




    
    

