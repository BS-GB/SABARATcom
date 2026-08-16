import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function ClientLayout() {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>
            
            <Footer />
        </>
    );
}

export default ClientLayout;