import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects
} from '@lwtickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
