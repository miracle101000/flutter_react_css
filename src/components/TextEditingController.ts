export class TextEditingController {
  private text: string; // The current text value
  private listeners: Function[]; // List of listeners to notify when the text changes

  constructor(initialText: string = "") {
    this.text = initialText;
    this.listeners = [];
  }

  // Getter for the text value
  get value(): string {
    return this.text;
  }

  // Setter for the text value, notifies listeners when the text changes
  set value(newText: string) {
    this.text = newText;
    this.notifyListeners();
  }

  // Add a listener that gets called when the text changes
  addListener(listener: Function) {
    this.listeners.push(listener);
  }

  // Notify all listeners about the text change
  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.text));
  }

  // Remove a listener
  removeListener(listener: Function) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // Clear the text value and notify listeners
  clear() {
    this.text = "";
    this.notifyListeners();
  }

  // Dispose of the controller and remove all listeners
  dispose() {
    this.listeners = [];
  }
}

export default new TextEditingController();