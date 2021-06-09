module.exports = class User {
    constructor(id, userName, password, email, city, zip, street, cardNumber, birthdate, credit) {
        this._id = id;
        this._userName = userName;
        this._password = password;
        this._email = email;
        this._city = city;
        this._zip = zip;
        this._street = street;
        this._cardNumber = cardNumber;
        this._birthdate = birthdate;
        this._credit = credit;
    }


    get id() {
        return this._id;
    }

    get userName() {
        return this._userName;
    }

    get password() {
        return this._password;
    }

    get email() {
        return this._email;
    }

    get city() {
        return this._city;
    }

    get zip() {
        return this._zip;
    }

    get street() {
        return this._street;
    }

    get cardNumber() {
        return this._cardNumber;
    }

    get birthdate() {
        return this._birthdate;
    }

    get credit() {
        return this._credit;
    }
};