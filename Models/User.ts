import { faker } from "@faker-js/faker";

export type PaymentInfo = {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expirationMonth: string;
    expirationYear: string;
}

export type AddressInfo = {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
};


export default class User{
    private payment:PaymentInfo; 
    private address:AddressInfo;
    private email:string;
    private password:string;
    private firstname:string;
    private subject:string;
    private message:string;


    constructor(email: string, password?: string, firstName?: string, Subject?: string, Message?: string) {
        this.email = email;
        this.password = password ?? "";
        this.firstname = firstName ?? "";
        this.subject = Subject ?? "";
        this.message = Message ?? "";
        this.address = User.randomAddress(this.firstname);
        this.payment = User.cardInfo(this.firstname)
    }

    getCardInfo() { return this.payment}
    getAddress() { return this.address;}
    getEmail(){ return this.email}
    getPassword(){ return this.password}
    getFirstName(){ return this.firstname}
    getSubject(){ return this.subject}
    getMessage(){ return this.message}
    getCreateAccountForm() {
        return {
            name: this.firstname,
            email: this.email,
            password: this.password,
            title: 'Mr',
            birth_date: '01',
            birth_month: '05',
            birth_year: '1999',
            firstname: this.address.firstName,
            lastname: this.address.lastName,
            company: this.address.company,
            address1: this.address.address1,
            address2: this.address.address2,
            country: this.address.country,
            zipcode: this.address.zipcode,
            state: this.address.state,
            city: this.address.city,
            mobile_number: this.address.mobile
        };
    }

    static cardInfo(nameOnCard:string): PaymentInfo {
        const expiryDate = faker.date.future({ years: 5 });
        return{
            nameOnCard,
            cardNumber: faker.finance.accountNumber(14),
            cvc: faker.finance.creditCardCVV(),
            expirationMonth: String(expiryDate.getMonth()).padStart(2,'0'),
            expirationYear: String(expiryDate.getFullYear())
        };
    }

    static randomAddress(firstName: string ): AddressInfo {
    return {
      firstName,
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'India',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobile: faker.phone.number(),
    };
    }

    static random() {
        return new User(faker.internet.email(), faker.internet.password(), faker.person.firstName(), faker.lorem.words(), faker.lorem.text());
    }
    static notRandom(){
        return new User("Nyasia.Leannon@gmail.com","Test1234", "Lazaro", faker.lorem.words(), faker.lorem.text());

    }
}   