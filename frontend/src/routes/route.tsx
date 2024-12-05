import {
  createBrowserRouter,
} from "react-router-dom";
import App from '../App.tsx'
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Recipes from "../pages/Recipes.tsx";
import Shop from "../pages/Shop.tsx";
import SingleProductPage from "../pages/SingleProductPage.tsx";
import RecipePage from "../pages/RecipePage.tsx";
import { ScrollToTop } from "../utils/helperFunctions.ts";
import Checkout from "../pages/Checkout.tsx";
import Contact from "../pages/Contact.tsx";
import SuccessPayment from "../pages/SuccessPayment.tsx";
import Login from "../components/Login.tsx";
import AdminDashboard from "../pages/Admin.tsx";
import Packages from "../pages/Packages.tsx";
import AdminRoute from "../components/admin/AdminRoute.tsx";
import Events from "../pages/Events.tsx";
import Tobia from "../pages/Tobia.tsx";

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
        path: "/TOBIA",
        element: <Tobia />
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
        path: "/login",
        element: <Login />,
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
        element: <SuccessPayment />,
      },
    ]
  }
])