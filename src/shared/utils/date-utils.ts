export class DateUtils {
  static formatDate(date: Date, format: string = 'MM/dd/yyyy'): string {
    const options: Intl.DateTimeFormatOptions = {};
    
    switch (format) {
      case 'MM/dd/yyyy':
        return date.toLocaleDateString('en-US');
      case 'dd/MM/yyyy':
        return date.toLocaleDateString('en-GB');
      case 'yyyy-MM-dd':
        return date.toISOString().split('T')[0];
      default:
        return date.toLocaleDateString();
    }
  }

  static isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  static getDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
}
