import { ChangeDetectionStrategy, Component, inject, signal, computed, effect, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, of, map } from 'rxjs';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatResponse {
  response: string;
}

interface HealthResponse {
  status: string;
}

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatbotComponent {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  
  protected readonly isOpen = signal(false);
  protected readonly isDarkMode = signal(false);
  protected readonly currentMessage = signal('');
  protected readonly isProcessing = signal(false);
  protected readonly isOnline = signal(false);
  protected readonly messages = signal<ChatMessage[]>([]);
  
  private readonly API_BASE_URL = 'http://127.0.0.1:5000';
  private readonly ANGULAR_LOGO_URL = 'https://angular.io/assets/images/logos/angular/angular.svg';
  
  constructor() {
    // Only run browser-specific code on the client
    if (isPlatformBrowser(this.platformId)) {
      // Check health status periodically
      this.checkHealthStatus();
      setInterval(() => this.checkHealthStatus(), 30000); // Check every 30 seconds
      
      // Load saved theme preference
      const savedTheme = localStorage.getItem('chatbot-theme');
      if (savedTheme === 'dark') {
        this.isDarkMode.set(true);
      }
      
      // Save theme preference when it changes
      effect(() => {
        localStorage.setItem('chatbot-theme', this.isDarkMode() ? 'dark' : 'light');
      });
    }
  }
  
  protected readonly chatContainerClasses = computed(() => {
    const baseClasses = 'chatbot-container';
    const themeClass = this.isDarkMode() ? 'dark-theme' : 'light-theme';
    const openClass = this.isOpen() ? 'open' : '';
    return `${baseClasses} ${themeClass} ${openClass}`;
  });
  
  toggleChatbot(): void {
    this.isOpen.update(isOpen => !isOpen);
  }
  
  closeChatbot(): void {
    this.isOpen.set(false);
  }
  
  toggleTheme(): void {
    this.isDarkMode.update(isDark => !isDark);
  }

  clearChat(): void {
    this.messages.set([]);
  }
  
  private checkHealthStatus(): void {
    this.http.get<HealthResponse>(`${this.API_BASE_URL}/api/health`)
      .pipe(
        map(response => response.status === 'Up and running'),
        catchError(() => of(false))
      )
      .subscribe(isOnline => {
        this.isOnline.set(isOnline);
      });
  }
  
  sendMessage(): void {
    const message = this.currentMessage().trim();
    if (!message || this.isProcessing()) {
      return;
    }
    
    // Add user message
    const userMessage: ChatMessage = {
      id: this.generateId(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };
    
    this.messages.update(messages => [...messages, userMessage]);
    this.currentMessage.set('');
    this.isProcessing.set(true);
    
    // Send to chatbot API
    this.http.post<ChatResponse>(`${this.API_BASE_URL}/api/chat`, { message })
      .pipe(
        catchError(error => {
          console.error('Chatbot API error:', error);
          return of({ response: 'Sorry, I am currently unavailable. Please try again later.' });
        })
      )
      .subscribe(response => {
        const botMessage: ChatMessage = {
          id: this.generateId(),
          text: response.response,
          isUser: false,
          timestamp: new Date()
        };
        
        this.messages.update(messages => [...messages, botMessage]);
        this.isProcessing.set(false);
        
        // Scroll to bottom after message is added
        setTimeout(() => this.scrollToBottom(), 100);
      });
  }
  
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
  
  private scrollToBottom(): void {
    const chatHistory = document.querySelector('.chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }
  
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  protected readonly angularLogoUrl = this.ANGULAR_LOGO_URL;
}
