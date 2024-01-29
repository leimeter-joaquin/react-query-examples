import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toast from "./Toast.tsx";

import { openToast } from "./redux/toastSlice.ts";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      store.dispatch(
        openToast({ message: `There's been an error: ${error}`, error: true })
      );
      console.error(error);
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
