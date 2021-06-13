const log = console.log;

window.addEventListener('load', (e) => {
    const withdrawForm = document.getElementById('login-info');
    const addForm = document.getElementById('add');

    const withdraw = document.querySelector('input[name="withdraw"]');
    const add = document.querySelector('input[name="add"]');

    const errWithdraw = document.querySelector('#withdraw-valid');
    const errAdd = document.querySelector('#add-valid');
    user = JSON.parse(user);

    const success = document.querySelector('#success-message');

    if(!withdrawForm) {
        addForm.addEventListener('submit',  (e) => {
            e.preventDefault();
    
            success.style.display = "none";
            success.innerText ="";
            
            resetErrAdd();
            const isValid = validateAdd();
            if (isValid) {
                sendRequestAdd();
            }
    
        });

        const validateAdd = () => {
            let isValid = true;
            if(add.value === "" || isNaN(add.value)) {
                setErr(errAdd, 'Enter a valid amount to add to your balance!');
            }
            return isValid;
        }

        const resetErrAdd = () => {
            errAdd.style.display = "none";
        };

        const resetAdd = () => {
            add.value = "";
        };

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
                    resetAdd();
                })
                .catch(() => console.log('Error get'))
        }

    } else {
        withdrawForm.addEventListener('submit',  (e) => {
            e.preventDefault();
    
            success.style.display = "none";
            success.innerText ="";
            
            resetErrWithdraw();
            const isValid = validateWithdraw();
            if (isValid) {
                sendRequestWithdraw();
            }
        });

        const validateWithdraw = () => {
            let isValid = true;
             if(withdraw.value === "" || isNaN(withdraw.value)) {
                 setErr(errWithdraw, 'Enter a valid amount to add to your balance!');
             }
             return isValid;
         };

         const resetErrWithdraw = () => {
            errWithdraw.style.display = "none";
        };

        const resetWithdraw = () => {
            withdraw.value = "";
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
                    resetWithdraw();
                })
                .catch(() => console.log('Error get'))
        }
    }

    const setErr = (element, message) => {
        element.style.display = 'block';
        element.innerText = message;
    };
   
});