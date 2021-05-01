module.exports = class User {
    constructor(id, userName, password, email, city, zip, street, cardNumber, birthdate, credit) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.city = city;
        this.zip = zip;
        this.street = street;
        this.cardNumber = cardNumber;
        this.birthdate = birthdate;
        this.credit = credit;
    }
};