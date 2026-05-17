import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';

export class TicketApi extends BaseApi {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async generateTicket(token: string, orderId: string): Promise<APIResponse> {
    return this.post(`/tickets/generate`, { orderId }, { 'Authorization': `Bearer ${token}` });
  }

  async getTicketDetails(token: string, ticketId: string): Promise<APIResponse> {
    return this.get(`/tickets/${ticketId}`, undefined, { 'Authorization': `Bearer ${token}` });
  }

  async scanTicket(scannerToken: string, ticketCode: string): Promise<APIResponse> {
    return this.post(`/tickets/scan`, { code: ticketCode }, { 'Authorization': `Bearer ${scannerToken}` });
  }

  async invalidateTicket(adminToken: string, ticketId: string, reason: string): Promise<APIResponse> {
    return this.post(`/tickets/${ticketId}/invalidate`, { reason }, { 'Authorization': `Bearer ${adminToken}` });
  }

  async transferTicket(token: string, ticketId: string, targetEmail: string): Promise<APIResponse> {
    return this.post(`/tickets/${ticketId}/transfer`, { email: targetEmail }, { 'Authorization': `Bearer ${token}` });
  }

  async acceptTicketTransfer(token: string, transferToken: string): Promise<APIResponse> {
    return this.post(`/tickets/transfer/accept`, { transferToken }, { 'Authorization': `Bearer ${token}` });
  }

  async getMyTickets(token: string, params?: Record<string, string | number>): Promise<APIResponse> {
    return this.get(`/tickets/me`, params, { 'Authorization': `Bearer ${token}` });
  }
}
