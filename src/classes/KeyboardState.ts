const PRESSED = 1;
const RELEASED = 0;

export class KeyboardState {
  // Holds the current state of a given key
  keyStates: Map<string, 0 | 1> = new Map();
  // Holds the callback functions for a given key code
  keyMap: Map<string, Function> = new Map();

  addMapping(code: string, callback: Function) {
    this.keyMap.set(code, callback);
  }

  handleEvent(event: KeyboardEvent) {
    const { code } = event;

    if (!this.keyMap.has(code)) {
      //Key not yet mapped
      return;
    }

    event.preventDefault();
    const keyState = event.type === "keydown" ? PRESSED : RELEASED;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);

    this.keyMap.get(code)!(keyState);
  }

  listenTo(window: Window) {
    ["keydown", "keyup"].forEach((eventName) => {
      window.addEventListener(eventName, (event: Event) => {
        this.handleEvent(event as KeyboardEvent);
      });
    });
  }
}
