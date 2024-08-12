import {
  createBrowserRouter,
} from "react-router-dom";
import App from '../App.tsx'
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Recipes from "../pages/Recipes.tsx";
import Error from "../components/Error.tsx";
import Login from "../components/Login.tsx"
import Register from "../components/Register.tsx"
import Shop from "../pages/Shop.tsx";
import SingleProductPage from "../pages/SingleProductPage.tsx";
import RecipePage from "../pages/RecipePage.tsx";
import Cart from "../pages/Cart.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/products",
        element: <Shop />
      },
      {
        path: "/products/:productID",
        element: <SingleProductPage />
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element : <Error />
      } 
    ]
  }
]);
