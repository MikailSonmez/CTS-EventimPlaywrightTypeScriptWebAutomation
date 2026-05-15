export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export class UserDataBuilder {
  private user: UserData;

  constructor() {
    this.user = {
      firstName: 'Test',
      lastName: 'User',
      email: `testuser_${Date.now()}@eventim.com`,
      phone: '1234567890',
      address: '123 Test Street',
      city: 'Berlin',
      zipCode: '10115',
    };
  }

  withFirstName(firstName: string): UserDataBuilder {
    this.user.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): UserDataBuilder {
    this.user.lastName = lastName;
    return this;
  }

  withEmail(email: string): UserDataBuilder {
    this.user.email = email;
    return this;
  }

  withRandomEmail(): UserDataBuilder {
    this.user.email = `random_${Math.floor(Math.random() * 10000)}_${Date.now()}@eventim.com`;
    return this;
  }

  build(): UserData {
    return this.user;
  }
}

export interface EventData {
  title: string;
  date: string;
  location: string;
  category: string;
  price: number;
}

export class EventDataBuilder {
  private event: EventData;

  constructor() {
    this.event = {
      title: 'Default Event',
      date: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
      location: 'Berlin Arena',
      category: 'Concert',
      price: 50.00,
    };
  }

  withTitle(title: string): EventDataBuilder {
    this.event.title = title;
    return this;
  }

  withCategory(category: string): EventDataBuilder {
    this.event.category = category;
    return this;
  }

  withPrice(price: number): EventDataBuilder {
    this.event.price = price;
    return this;
  }

  build(): EventData {
    return this.event;
  }
}
