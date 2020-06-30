import { Subjects, Publisher, PaymentCreatedEvent } from '@lwtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
