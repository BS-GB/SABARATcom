import { Routes, Route } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| Client Layout
|--------------------------------------------------------------------------
*/

import ClientLayout from "../layouts/ClientLayout";


/*
|--------------------------------------------------------------------------
| Dashboard Layout
|--------------------------------------------------------------------------
*/

import DashboardLayout from "../layouts/DashboardLayout";


/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
*/

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import PortfolioPage from "../pages/PortfolioPage";
import PortfolioDetailsPage from "../pages/PortfolioDetailsPage";
import ContactPage from "../pages/ContactPage";

import ClientDiscoveryPage from "../pages/ClientDiscoveryPage";
import DiscoveryPrintPage from "../pages/DiscoveryPrintPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import ClientDashboardPage from "../pages/ClientDashboardPage";

import DashboardPage from "../pages/DashboardPage";

import NotFoundPage from "../pages/NotFoundPage";


function AppRoutes() {

    return (
        <Routes>

            {/* =====================================================
                Public Website
            ===================================================== */}

            <Route element={<ClientLayout />}>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />

                <Route
                    path="/services"
                    element={<ServicesPage />}
                />

                <Route
                    path="/services/:slug"
                    element={<ServiceDetailsPage />}
                />

                <Route
                    path="/portfolio"
                    element={<PortfolioPage />}
                />

                <Route
                    path="/portfolio/:slug"
                    element={<PortfolioDetailsPage />}
                />

                <Route
                    path="/contact"
                    element={<ContactPage />}
                />

                <Route
                    path="/client-discovery"
                    element={<ClientDiscoveryPage />}
                />

            </Route>


            {/* =====================================================
                Discovery Print
            ===================================================== */}

            <Route
                path="/client-discovery/print"
                element={<DiscoveryPrintPage />}
            />


            {/* =====================================================
                Authentication
            =====================================================*/}

            <Route
                path="/login"
                element={<LoginPage />}
            />
            <Route
                path="/register"
                element={<RegisterPage />}
            />


            {/* =====================================================
                Client Dashboard
            ===================================================== */}

            <Route
                path="/client-dashboard"
                element={<ClientDashboardPage />}
            />


            {/* =====================================================
                Internal Dashboard
            ===================================================== */}

            <Route element={<DashboardLayout />}>

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

            </Route>


            {/* =====================================================
                404
            ===================================================== */}

            <Route
                path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    );
}

export default AppRoutes;