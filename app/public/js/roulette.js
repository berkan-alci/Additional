/**
 * Roulette logica
 *
 * @author Tibo Moreel
 */


    //keep bets
    let bets = [];
    let max = user.credit;

    console.log(user);

    window.addEventListener('load', async function () {
        await createBoard();
        document.getElementById('max').innerHTML = 'Money:' + max;
        //listen to play
        document.getElementById('play').addEventListener('click', function () {
            play();
            for (let but of document.querySelectorAll("button")) {
                but.disabled = true;
            }
        });
    })

    //save bets and add badge
    function buttonClick(e) {
        let val = undefined;
        if (!e.target.classList.contains('badge')) {
            val = e.target.name;
        } else {
            val = e.target.parentElement.name;
        }

        let money = Number(document.querySelector("input[name='chips']:checked").value);
        if (e.which == 1) {
            if (money < max || money === max) {
                console.log(money + " euro on " + val);
                bets[val] = (bets[val] !== undefined) ? money + Number(bets[val]) : money;

                if (e.target.children[0]) {
                    e.target.children[0].innerHTML = bets[val];
                } else if (e.target.classList.contains('badge')) {
                    e.target.innerHTML = bets[val];
                } else {
                    let span = document.createElement('span');
                    span.classList.add('badge');
                    span.innerHTML = bets[val];
                    span.disabled = true;
                    e.target.appendChild(span);
                }
                max -= money;
            } else {
                alert('You don\'t have ' + money + ' euro');
            }

        } else {
            console.log(bets);
            if (bets[val] !== undefined) {
                console.log(money + " euro of off " + val);
                max += ((Number(bets[val]) - Math.abs(Number(bets[val]) - money)) > 0) ? Number(bets[val]) - Math.abs(Number(bets[val]) - money) : Number(bets[val]);
                bets[val] = Number(bets[val]) - money;

                if (bets[val] <= 0) {
                    delete bets[val];
                    if (e.target.children[0]) {
                        e.target.children[0].remove();
                    } else {
                        e.target.remove();
                    }
                } else {
                    if (e.target.children[0]) {
                        e.target.children[0].innerHTML = bets[val];
                    } else if (e.target.classList.contains('badge')) {
                        e.target.innerHTML = bets[val];
                    } else {
                        let span = document.createElement('span');
                        span.classList.add('badge');
                        span.innerHTML = bets[val];
                        span.disabled = true;
                        e.target.appendChild(span);
                    }
                }
            }
        }
        updateBets();
    }

    //get random winning number
    function play() {
        let ran = Math.floor(Math.random()) + 1;
        console.log(ran);
        for (let i = 0; i < ran; i++) {
            setTimeout(() => {
                roll();
            }, i * 36 * 200);
        }
        let winner = Math.floor(Math.random() * 37);
        //winner = 35;
        console.log(winner);
        setTimeout(() => {
            roll(winner);
        }, ran * 37 * 200);
        //calculateWinner(winner);
        setTimeout(() => {
            calculateWinner(winner);
        }, (ran * 38 * 200) + winner * 200 + 1000);
        setTimeout(() => {
            reset();
        }, (ran * 38 * 200) + winner * 200 + 1200);
    }

    //roll light over board
    function roll(winner = 37) {
        let nums = document.querySelector('.numbers').children;
        let nul = document.querySelector('.zeroButton');

        for (let but = -1; but < winner; but++) {
            if (but < 36) {
                if (but > 0) {
                    setTimeout(() => {
                        nums[but].classList.add('light');
                        nums[but - 1].classList.remove('light');
                    }, (but + 1) * 200);
                } else if (but > -1) {
                    setTimeout(() => {
                        nums[but].classList.add('light');
                        nul.classList.remove('light');
                    }, (but + 1) * 200);
                } else {
                    setTimeout(() => {
                        nul.classList.add('light');
                    }, (but + 1) * 200);
                }
            } else {
                setTimeout(() => {
                    nums[35].classList.remove('light');
                }, 37 * 200);
            }
        }
    }

    //after showing winning nummer look what has been won
    function calculateWinner(winner) {
        console.log(bets)
        let win = null;
        //zero
        if (winner == 0) {
            if (bets[0] !== undefined) {
                win += 35 * Number(bets[0]) + Number(bets[0]);
            }
        } else {
            //1 to 18 or 19 to 36 plus 1st 12 and 3rd 12
            if (winner < 19) {
                if (bets['1 to 18'] !== undefined) {
                    win += Number(bets['1 to 18']) + Number(bets['1 to 18']);
                }
                if (winner < 13) {
                    if (bets['1st 12'] !== undefined) {
                        win += 2 * Number(bets['1st 12']) + Number(bets['1st 12']);
                    }
                }
            } else {
                if (bets['19 to 36'] !== undefined) {
                    win += Number(bets['19 to 36']) + Number(bets['19 to 36']);
                }
                if (winner > 24) {
                    if (bets['3rd 12'] !== undefined) {
                        win += 2 * Number(bets['3rd 12']) + Number(bets['3rd 12']);
                    }
                }
            }

            //2nd 12
            if (12 < winner && winner < 25) {
                if (bets['2nd 12'] !== undefined) {
                    win += 2 * Number(bets['2nd 12']) + Number(bets['2nd 12']);
                }
            }

            //Even and odd
            if (winner % 2 == 0) {
                if (bets['EVEN'] !== undefined) {
                    win += Number(bets['EVEN']) + Number(bets['EVEN']);
                }
            } else {
                if (bets['ODD'] !== undefined) {
                    win += Number(bets['ODD']) + Number(bets['ODD']);
                }
            }

            //black and red
            if ([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].includes(winner)) {
                if (bets['BLACK'] !== undefined) {
                    win += Number(bets['BLACK']) + Number(bets['BLACK']);
                }
            } else {
                if (bets['RED'] !== undefined) {
                    win += Number(bets['RED']) + Number(bets['RED']);
                }
            }

            //rows
            if ((winner - 1) % 3 == 0) {
                if (bets['1st row'] !== undefined) {
                    win += 2 * Number(bets['1st row']) + Number(bets['1st row']);
                }
            } else if ((winner - 2) % 3 == 0) {
                if (bets['2nd row'] !== undefined) {
                    win += 2 * Number(bets['2nd row']) + Number(bets['2nd row']);
                }
            } else {
                if (bets['3rd row'] !== undefined) {
                    win += 2 * Number(bets['3rd row']) + Number(bets['3rd row']);
                }
            }

            //check number
            if (bets[winner] !== undefined) {
                win += 35 * Number(bets[winner]) + Number(bets[winner]);
            }
        }

        if (!win) {
            alert('You Lose');
        } else {
            alert('YOU WIN ' + win + '!!!!');
            max += win;
        }
    }

    //update bets table
    function updateBets() {
        document.getElementById('max').innerHTML = 'Money:' + max;
        console.log(max);
        let table = document.getElementById('bets');
        console.log(Object.keys(bets).length);
        if (Object.keys(bets).length === 0) {
            table.innerHTML = '';
        } else {
            table.innerHTML = `
        <tr>
            <th>Gok</th>
            <th>Waarde</th>
            <th>Delete</th>
        </tr>
        `;

            for (let bet in bets) {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${bet}</td>
                <td>${bets[bet]}</td>
            `
                let td = document.createElement('td');
                let but = document.createElement('button');
                but.classList.add('delete');
                but.innerHTML = 'Delete';
                but.addEventListener('click', function (e) {
                    delBet(e)
                });

                td.append(but);
                tr.append(td);
                table.children[0].append(tr);
            }
        }
    }

    //Delete bet with table button
    function delBet(e) {
        let val = e.target.parentNode.parentNode.children[0].innerHTML;
        console.log(val);
        if (bets[val] !== undefined) {
            document.querySelector('[name = "' + val + '"]').children[0].remove();
            max += bets[val];
            delete bets[val];
            updateBets();
        } else {
            console.log('idk');
        }
    }

    //reset bets after rolling
    function reset() {
        bets = [];
        for (let but of document.querySelectorAll("button")) {
            but.disabled = false;
            but.classList.remove('light');
            if (but.children[0]) but.children[0].remove();
        }
        updateBets();
    }

    //make board
    function createBoard() {
        let field = document.createElement('div');
        field.classList.add('playingField');

        let upperField = document.createElement('div');
        upperField.classList.add('upperField');

        let lowerField = document.createElement('div');
        lowerField.classList.add('lowerField');

        //Green 0 button
        let zeroButton = document.createElement('button');
        zeroButton.classList.add('zeroButton');
        zeroButton.innerHTML = '0';
        zeroButton.name = '0';
        zeroButton.addEventListener('click', function (e) {
            buttonClick(e)
        })
        zeroButton.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })

        upperField.appendChild(zeroButton);

        //Number buttons
        let numbs = document.createElement('div');
        numbs.classList.add('numbers');

        for (let i = 1; i < 37; i++) {
            let button = document.createElement('button');
            button.classList.add('number');
            ([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].includes(i)) ? button.classList.add('black') : button.classList.add('red');
            button.innerHTML = i;
            button.name = i;
            button.addEventListener('click', function (e) {
                buttonClick(e)
            })
            button.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                buttonClick(e);
            })
            numbs.appendChild(button);
        }

        upperField.appendChild(numbs)

        //2 to 1 buttons
        let twoToOne = document.createElement('div');
        twoToOne.classList.add('column');

        let arr = ['st', 'nd', 'rd']
        for (let i = 0; i < 3; i++) {
            let button = document.createElement('button');
            button.innerHTML = '2 to 1';
            button.name = '' + (i + 1) + arr[i] + ' row';
            button.classList.add('number');
            button.addEventListener('click', function (e) {
                buttonClick(e)
            })
            button.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                buttonClick(e);
            })
            twoToOne.appendChild(button);
        }

        upperField.appendChild(twoToOne)

        //first row 2nd half
        let rowOne = document.createElement('div');
        rowOne.classList.add('row');

        let first = document.createElement('button');
        first.innerHTML = '1st 12';
        first.name = '1st 12';
        first.classList.add('special');
        first.addEventListener('click', function (e) {
            buttonClick(e)
        })
        first.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowOne.appendChild(first);

        let second = document.createElement('button');
        second.innerHTML = '2nd 12';
        second.name = '2nd 12';
        second.classList.add('special');
        second.addEventListener('click', function (e) {
            buttonClick(e)
        })
        second.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowOne.appendChild(second);

        let third = document.createElement('button');
        third.innerHTML = '3rd 12';
        third.name = '3rd 12';
        third.classList.add('special');
        third.addEventListener('click', function (e) {
            buttonClick(e)
        })
        third.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowOne.appendChild(third);

        lowerField.appendChild(rowOne);

        //2nd row 2nd half
        let rowTwo = document.createElement('div');
        rowTwo.classList.add('row');

        let oneTo = document.createElement('button');
        oneTo.innerHTML = '1 to 18';
        oneTo.name = '1 to 18';
        oneTo.classList.add('special');
        oneTo.addEventListener('click', function (e) {
            buttonClick(e)
        })
        oneTo.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowTwo.appendChild(oneTo);

        let even = document.createElement('button');
        even.innerHTML = 'EVEN';
        even.name = 'EVEN';
        even.classList.add('special');
        even.addEventListener('click', function (e) {
            buttonClick(e)
        })
        even.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowTwo.appendChild(even);

        let black = document.createElement('button');
        black.innerHTML = 'BLACK';
        black.name = 'BLACK'
        black.classList.add('black')
        black.classList.add('special');
        black.addEventListener('click', function (e) {
            buttonClick(e)
        })
        black.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowTwo.appendChild(black);

        let red = document.createElement('button');
        red.innerHTML = 'RED';
        red.name = 'RED';
        red.classList.add('red')
        red.classList.add('special');
        red.addEventListener('click', function (e) {
            buttonClick(e)
        })
        red.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowTwo.appendChild(red);

        let odd = document.createElement('button');
        odd.innerHTML = 'ODD';
        odd.name = 'ODD';
        odd.classList.add('special');
        odd.addEventListener('click', function (e) {
            buttonClick(e)
        })
        odd.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowTwo.appendChild(odd);

        let toEnd = document.createElement('button');
        toEnd.innerHTML = '19 to 36';
        toEnd.name = '19 to 36';
        toEnd.classList.add('special');
        toEnd.addEventListener('click', function (e) {
            buttonClick(e)
        })
        toEnd.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            buttonClick(e);
        })
        rowTwo.appendChild(toEnd);

        lowerField.appendChild(rowTwo);

        field.appendChild(upperField);
        field.appendChild(lowerField);

        document.getElementById('game').appendChild(field);
    }

