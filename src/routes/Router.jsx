import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import TransitionComponent from "../components/Transition";
import AboutPage from "../pages/AboutPage/AboutPage";
import ServicesPage from "../pages/ServicesPage/ServicesPage"
import DevWorkPage from "../pages/DevWorkPage/DevWorkPage";
import DesignWorkPage from "../pages/DesignWorkPage/DesignWorkPage";
import { Route, Routes } from "react-router";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <TransitionComponent>
            <HomePage />
          </TransitionComponent>
        }
      />
      <Route
        path="about"
        element={
          <TransitionComponent>
            <AboutPage />
          </TransitionComponent>
        }
      />
      <Route
        path="dev-work"
        element={
          <TransitionComponent>
            <DevWorkPage />
          </TransitionComponent>
        }
      />
      <Route
        path="design-work"
        element={
          <TransitionComponent>
            <DesignWorkPage />
          </TransitionComponent>
        }
      />
      <Route
        path="Services-Page"
        element={
          <TransitionComponent>
            <ServicesPage />
          </TransitionComponent>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
