import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import injectContext from "./store/appContext";

import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Contacto } from "./pages/contacto";
import { Rutas } from "./pages/rutas";
import { About } from "./pages/about";
import { Dashboard } from "./pages/dashboard";
import { Register } from "./pages/register"


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Contacto />} path="/contacto" />
                        <Route element={<Rutas />} path="/rutas" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<About />} path="/about" />  
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
