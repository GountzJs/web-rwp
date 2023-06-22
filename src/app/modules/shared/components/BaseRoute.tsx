import { Provider } from "react-redux";
import { Footer } from "../../layout/Footer";
import { Header } from "../../layout/Header";
import { store } from "../redux/store";

export function BaseRoute({ children }: { children: React.ReactElement}) {
  return (
    <Provider store={store}>
      <Header />
      { children }
      <Footer />
    </Provider>  
  )
}