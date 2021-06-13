const log = console.log;

window.addEventListener('load', (e) => {
    const withdraw = document.getElementById('login-info');
    const add = document.getElementById('add');

    const withdraw = document.querySelector('input[name="withdraw"]');
    const add = document.querySelector('input[name="add"]');

    const errWithdraw = document.querySelector('#withdraw-valid');
    const errAdd = document.querySelector('#add-valid');
    user = JSON.parse(user);

    const success = document.querySelector('#success-message');

    withdraw.addEventListener('submit', async (e) => {
        e.preventDefault();

        success.style.display = "none";
        success.innerText ="";
        move.style.display="none";
        move.innerText="";
        
        resetErrWithdraw();
        const isValid = validateWithdraw();
        if (isValid) {
            sendRequestWithdraw();
        }
    });

    add.addEventListener('submit', async (e) => {
        e.preventDefault();

        success.style.display = "none";
        success.innerText ="";
        move.style.display="none";
        move.innerText="";
        
        resetErrAdd();
        const isValid = validateAdd();
        if (isValid) {
            sendRequestAdd();
        }

    });

    const validateWithdraw = () => {
        let isValid = true;
         if(withdraw.value === "" || isNaN(withdraw.value)) {
             setErr(errWithdraw, 'Enter a valid amount to add to your balance!');
         }
         return isValid;
     };

     const validateAdd = () => {
         let isValid = true;
         if(add.value === "" || isNaN(add.value)) {
             setErr(errAdd, 'Enter a valid amount to add to your balance!');
         }
         return isValid;
     }

    const resetErrAdd = () => {
        errWithdraw.style.display = "none";
    };

    const resetErrWithdraw = () => {
        errWithdraw.style.display = "none";
    };

    const setErr = (element, message) => {
        element.style.display = 'block';
        element.innerText = message;
    };

    const resetAdd = () => {
        add.value = "";
    };

    const resetWithdraw = () => {
        withdraw.value = "";
    }
    
    const sendRequestAdd = async () => {

     
        fetch('http://localhost:3000/api/users/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                add: add.value
            })
        })
            .then(() => {
                //console.log('credit updated');
                //console.log(JSON.stringify(user));

                window.location.href = "/profile";
                resetErrAdd();
            })
            .catch(() => console.log('Error get'))
    }

    const sendRequestWithdraw = async () =>{
        

        fetch('http://localhost:3000/api/users/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                withdraw: withdraw.value
            })
        })
            .then(() => {
                //console.log('credit updated');
                //console.log(JSON.stringify(user));

                window.location.href = "/profile";
                resetErrWithdraw();
            })
            .catch(() => console.log('Error get'))
    }
});