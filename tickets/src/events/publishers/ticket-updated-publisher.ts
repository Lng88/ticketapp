import { Publisher, Subjects, TicketUpdatedEvent } from '@lwtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
