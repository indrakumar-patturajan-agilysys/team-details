import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  
  log(message: string, data?: any): void {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`, data);
  }

  error(message: string, error?: any): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  }

  warn(message: string, data?: any): void {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, data);
  }

  info(message: string, data?: any): void {
    console.info(`[INFO] ${new Date().toISOString()}: ${message}`, data);
  }
}
