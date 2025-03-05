import {
  createBrowserRouter,
} from "react-router-dom";

import App from '../App.tsx'
import AdminRoute from "../components/admin/AdminRoute.tsx";
import About from "../pages/About.tsx";
import AdminDashboard from "../pages/Admin.tsx";
import Checkout from "../pages/Checkout.tsx";
import Contact from "../pages/Contact.tsx";
import Events from "../pages/Events.tsx";
import Home from "../pages/Home.tsx";
import Packages from "../pages/Packages.tsx";
import RecipePage from "../pages/RecipePage.tsx";
import Recipes from "../pages/Recipes.tsx";
import Shop from "../pages/Shop.tsx";
import SingleProductPage from "../pages/SingleProductPage.tsx";
import ThankYou from '../pages/ThankYou';
import { ScrollToTop } from "../utils/helperFunctions.ts";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/products",
        element: <Shop />
      },
      {
        path: "/products/:productID/info",
        element: <SingleProductPage />,
      },
      {
        path: "/recipes/:recipeID",
        element: <RecipePage />
      },
      {
        path: "/recipes",
        element: <Recipes />
      },
      {
        path: "/events",
        element: <Events />
      },
      {
        path: "/packages",
        element: <Packages />
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        )
      },
      {
        path: "/thank-you",
        element: <ThankYou />,
      },
    ]
  }
])