export class DateHelper {
  static getToday(format: 'YYYY-MM-DD' | 'DD/MM/YYYY' = 'YYYY-MM-DD'): string {
    const today = new Date();
    return this.formatDate(today, format);
  }

  static getFutureDate(daysToAdd: number, format: 'YYYY-MM-DD' | 'DD/MM/YYYY' = 'YYYY-MM-DD'): string {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return this.formatDate(date, format);
  }

  static getPastDate(daysToSubtract: number, format: 'YYYY-MM-DD' | 'DD/MM/YYYY' = 'YYYY-MM-DD'): string {
    const date = new Date();
    date.setDate(date.getDate() - daysToSubtract);
    return this.formatDate(date, format);
  }

  private static formatDate(date: Date, format: 'YYYY-MM-DD' | 'DD/MM/YYYY'): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (format === 'DD/MM/YYYY') {
      return `${day}/${month}/${year}`;
    }
    return `${year}-${month}-${day}`;
  }
}
