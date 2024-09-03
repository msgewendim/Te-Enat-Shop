import {
  createBrowserRouter,
} from "react-router-dom";
import App from '../App.tsx'
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Recipes from "../pages/Recipes.tsx";
import Error from "../components/Error.tsx";
import Shop from "../pages/Shop.tsx";
import SingleProductPage from "../pages/SingleProductPage.tsx";
import RecipePage from "../pages/RecipePage.tsx";
import { ScrollToTop } from "../utils/helperFunctions.ts";
import Checkout from "../pages/Checkout.tsx";

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
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "*",
        element: <Error />
      }
    ]
  }
])