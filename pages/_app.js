import "rsuite/dist/rsuite.min.css";
import "../styles/styles.sass";
import { Provider } from "react-redux";
import store from "../store/store.js";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
