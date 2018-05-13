class Event {
    constructor(sender) {
        this.sender = sender;
        this.listeners = [];
    }

    attach (listener) {
        this.listeners.push(listener);
    }

    notify (args) {
        for (let i = 0; i < this.listeners.length; i += 1) {
            this.listeners[i](this.sender, args);
        }
    }
}