import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "./store";
import App from "./App";

test("renders the Amaya app shell without crashing", () => {
  const { container } = render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );

  expect(container).toBeTruthy();
});
