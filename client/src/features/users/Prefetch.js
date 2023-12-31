import { usersApiSlice } from "./usersApiSlice";
import { productsApiSlice } from "../products/productsApiSlice";
import { store } from "../../store/index";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");

    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const products = store.dispatch(
      productsApiSlice.endpoints.getProducts.initiate()
    );

    // store.dispatch(
    //   usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    // );

    return () => {
      console.log("unsubscribing");
      //unsubscribe when leaving protected pages
      users.unsubscribe();
      products.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
