import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Toaster} from "sonner";

export default function Layout({ children }) {
    return (
        <>
            <Toaster expand={true}  />
            <Header />
            { children }
            <Footer />
        </>
    );
}