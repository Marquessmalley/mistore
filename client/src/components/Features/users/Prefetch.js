import { usersApiSlice } from "./usersApiSlice";
import { store } from "../../../store/index";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");

    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    // store.dispatch(
    //   usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    // );

    return () => {
      console.log("unsubscribing");
      //unsubscribe when leaving protected pages
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
