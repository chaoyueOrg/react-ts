import { makeAutoObservable } from "mobx";

class App {
  id?: number = 1;
  constructor() {
    makeAutoObservable(this);
  }
}

export default new App();
