import '~/styles/style.scss';
import DataProvider from '~/redux/store';

function App({ Component, pageProps }) {
    return (
        <DataProvider>
            <Component {...pageProps} />
        </DataProvider>
    );
}

export default App;
