import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // or specific module where it should be provided
})
export class SharedEventService {
  public eventEmitter: EventEmitter<any> = new EventEmitter();
  private eventSubject = new Subject<any>();
  public loginEmitter: EventEmitter<any> = new EventEmitter();
  public dashboardActivation: EventEmitter<string> = new EventEmitter<string>();

  // sample =========================

  // Observable to subscribe to for listening to events
  event$ = this.eventSubject.asObservable();

  // Method to emit events
  emitEvent(data: any) {
    this.eventSubject.next(data);
  }

  // sample end ====================

  // buy sale dashboard activation
  private buySaleDashboard = new BehaviorSubject<any>(false);
  buySaleDashboardStatus$ = this.buySaleDashboard.asObservable();

  emitBuySaleDashboardStatus(code: any) {
    this.buySaleDashboard.next(code);
  }

  // buy sale dashboard activation end ==========

  emitDashboardActivation(routeCheck: string) {
    this.dashboardActivation.emit(routeCheck);
  }

  getDashboardActivation(): Observable<string> {
      return this.dashboardActivation.asObservable();
  }

  emitLogin() {
    this.loginEmitter.emit();
  }

  getLogin(): Observable<string> {
      return this.loginEmitter.asObservable();
  }
}