const log = console.log;

window.addEventListener('load', (e) => {
    const withdrawForm = document.getElementById('withdraw');
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
                console.log('valid');
                console.log(add.value);
                sendRequestAdd(parseFloat(add.value));
            }
    
        });

        const validateAdd = () => {
            let isValid = true;
            if(add.value === "" || isNaN(add.value) || parseFloat(add.value) <= 0) {
                setErr(errAdd, 'Enter a valid amount to add to your balance!');
                isValid = false;
                console.log('not valid');
            }
            return isValid;
        };

        const resetErrAdd = () => {
            errAdd.style.display = "none";
        };

        const resetAdd = () => {
            add.value = "";
        };

        const sendRequestAdd = (add) => {
            user.credit = parseFloat(user.credit) + add;
            console.log('user:');
            console.log(user);
            fetch('http://localhost:3000/api/users/' + user.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(() => {
                    resetAdd();
                    window.location.href = "/profile";
                })
                .catch(() => console.log('Error PUT'))
        }

    } else {
        withdrawForm.addEventListener('submit',  (e) => {
            e.preventDefault();
    
            success.style.display = "none";
            success.innerText ="";
            
            resetErrWithdraw();
            const isValid = validateWithdraw();
            if (isValid) {
                console.log('valid');
                console.log(withdraw.value);
                sendRequestWithdraw(parseFloat(withdraw.value));
            }
        });

        const validateWithdraw = () => {
            let isValid = true;
             if(withdraw.value === "" || isNaN(withdraw.value) || parseFloat(withdraw.value) <= 0
                 || parseFloat(withdraw.value) > parseFloat(user.credit)) {
                 setErr(errWithdraw, 'Enter a valid amount to add to your balance!');
                 isValid = false;
             }
             return isValid;
         };

         const resetErrWithdraw = () => {
            errWithdraw.style.display = "none";
        };

        const resetWithdraw = () => {
            withdraw.value = "";
        };

        const sendRequestWithdraw = (withdraw) =>{
            user.credit = parseFloat(user.credit) - withdraw;
            console.log('user:');
            console.log(user);
            fetch('http://localhost:3000/api/users/' + user.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(() => {
                    resetWithdraw();
                    window.location.href = "/profile";
                })
                .catch(() => console.log('Error PUT'))
        }
    }

    const setErr = (element, message) => {
        element.style.display = 'block';
        element.innerText = message;
    };
   
});