const log = console.log;

window.addEventListener('load', (e) => {
    const form = document.getElementById('register-info');
    
    const password = document.querySelector('input[name="password"]');
    const confirmPassword = document.querySelector('input[name="confirmPassword"]');

    const errPassword = document.querySelector('#password-valid');
    const errConfirmPassword = document.querySelector('#confirm-password-valid');
  

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

        if (password.value === "") {
            setErr(errPassword, 'Enter a password!');
            isValid = false;
        }

        if (password.value !== confirmPassword.value) {
            setErr(errPassword, 'Both passwords must match!');
            isValid = false;
        }

        return isValid;
     };

    const resetErr = () => {
        errPassword.style.display = "none";
        errConfirmPassword.style.display = "none";
    };

    const setErr = (element, message) => {
        element.style.display = 'block';
        element.innerText = message;
    };

    const reset = () => {
        password.value = "";
        confirmPassword.value = "";
      
    };

    const sendRequest = async () => {

        const data = {
            password: password.value
        }

        const result = await fetch('/', {
            method:'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())

        if(result.status === 'ok'){
            alert('Password changed successful!');
            success.style.display ="block";
            success.innerText = 'Password changed successfully!';
            reset();
        } else {
            alert(result.error)
        }
    }
});




    
    

