import { Publisher, Subjects, OrderCancelledEvent } from '@lwtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
