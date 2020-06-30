import { Publisher, OrderCreatedEvent, Subjects } from '@lwtickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
