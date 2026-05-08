export interface TestUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface TestBooking {
  eventId: string;
  userId: string;
  seats: number;
  paymentMethod: string;
}

export class TestDataBuilder {
  static createUser(overrides: Partial<TestUser> = {}): TestUser {
    return {
      id: `user-${Date.now()}`,
      email: `test.${Date.now()}@eventim-qa.de`,
      password: 'TestPass123!',
      firstName: 'Test',
      lastName: 'User',
      ...overrides,
    };
  }

  static createBooking(overrides: Partial<TestBooking> = {}): TestBooking {
    return {
      eventId: `evt-${Math.floor(Math.random() * 1000)}`,
      userId: `user-${Math.floor(Math.random() * 1000)}`,
      seats: 1,
      paymentMethod: 'credit_card',
      ...overrides,
    };
  }

  static generateEventSearchQuery(): string {
    const queries = ['Coldplay', 'Bayern München', 'Rammstein', 'Taylor Swift', 'Roland Kaiser'];
    return queries[Math.floor(Math.random() * queries.length)];
  }
}
