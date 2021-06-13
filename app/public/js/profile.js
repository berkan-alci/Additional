const log = console.log;

window.addEventListener('load', (e) => {
    const withdraw = document.getElementById('login-info');
    const add = document.getElementById('add');

    const withdraw = document.querySelector('input[name="withdraw"]');
    const add = document.querySelector('input[name="add"]');

    const errWithdraw = document.querySelector('#withdraw-valid');
    const errAdd = document.querySelector('#add-valid');


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

     
        const result = await fetch('/add', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                add: add.value,
                
            })
        }).then((res) => res.json())

        if(result.status === 'ok'){
            alert('Addition Successful!');
            success.style.display ="block";
            success.innerText = 'Addition successful!';
            resetAdd();
        } else {
            alert(result.error)
        }
    }

    const sendRequestWithdraw = async () =>{
        

        const result = await fetch('/withdraw', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                withdraw: withdraw.value,
                
            })
        }).then((res) => res.json())

        if(result.status === 'ok'){
            alert('Withdrawal Successful!');
            success.style.display ="block";
            success.innerText = 'Withdrawal successful!';
            resetWithdraw();
        } else {
            alert(result.error)
        }
    }
});