import { observer } from "mobx-react";
import app from "@/store/app";
import "./App.css";
import Home from "./pages/home";
import { useDebounceEffect } from "ahooks";

function App() {
  useDebounceEffect(() => {
    console.log(app.id);
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default observer(App);
