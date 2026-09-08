import { faker } from "@faker-js/faker";


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
    private address: AddressInfo;
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
    }

    getAddress() { return this.address; }
    getEmail(){ return this.email }
    getPassword(){ return this.password}
    getFirstName(){ return this.firstname}
    getSubject(){ return this.subject}
    getMessage(){ return this.message}

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