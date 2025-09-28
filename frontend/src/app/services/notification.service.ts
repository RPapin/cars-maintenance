import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Durée par défaut globale des notifications (5 secondes)
  private static readonly DEFAULT_DURATION = 4000;

  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() { }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  show(notificationData: Omit<Notification, 'id' | 'timestamp'>) {
    const notification: Notification = {
      ...notificationData,
      id: this.generateId(),
      timestamp: new Date(),
      duration: notificationData.duration || NotificationService.DEFAULT_DURATION
    };

    this.notifications.unshift(notification);
    this.notificationsSubject.next([...this.notifications]);

    // Auto-masquer après le délai spécifié
    setTimeout(() => {
      this.hide(notification.id);
    }, notification.duration);
  }

  showSuccess(message: string, duration?: number) {
    this.show({ type: 'success', message, duration });
  }

  showError(message: string, duration?: number) {
    this.show({ type: 'error', message, duration });
  }

  showInfo(message: string, duration?: number) {
    this.show({ type: 'info', message, duration });
  }

  showWarning(message: string, duration?: number) {
    this.show({ type: 'warning', message, duration });
  }

  hide(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notificationsSubject.next([...this.notifications]);
  }

  clear() {
    this.notifications = [];
    this.notificationsSubject.next([]);
  }

  /**
   * Retourne la durée par défaut des notifications
   */
  static getDefaultDuration(): number {
    return NotificationService.DEFAULT_DURATION;
  }
}
