export class CurrencyFormatter {
  static formatToEuro(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  static formatToUSD(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  static parseCurrencyStringToNumber(currencyString: string): number {
    // E.g. "€ 50,00" -> 50.00
    // Strip everything except numbers, commas and dots
    const cleanString = currencyString.replace(/[^\d.,-]/g, '');
    
    // In German locale 50,00 -> we need to replace comma with dot
    // In US locale 50.00 -> already fine
    // This is a naive implementation, can be improved based on specific locale
    if (cleanString.includes(',') && cleanString.includes('.')) {
      // e.g. 1.000,50 -> 1000.50
      const noThousands = cleanString.replace(/\./g, '');
      return parseFloat(noThousands.replace(',', '.'));
    } else if (cleanString.includes(',')) {
      // e.g. 50,00
      return parseFloat(cleanString.replace(',', '.'));
    }
    
    return parseFloat(cleanString);
  }
}
