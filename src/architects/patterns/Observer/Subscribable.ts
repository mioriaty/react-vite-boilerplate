export class Subscribable<MessageType> {
  private subscribers: Set<(msg: MessageType) => void> = new Set();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  subscribe(cb: (msg: MessageType) => void) {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }
  publish(msg: MessageType) {
    this.subscribers.forEach(cb => cb(msg));
  }
}

// example
const sub = new Subscribable<string>();
const unsub = sub.subscribe(console.log);

sub.publish('Hello');
sub.publish('Im');
unsub();
sub.publish('Duong');

/** result:
 * Hello
 * Im
 */
