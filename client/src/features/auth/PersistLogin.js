import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../utils/hooks/usePersist";
import { useSelector } from "react-redux";
import Unauthorized from "../../components/Errors/Unauthorized";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector((state) => state.auth.token);

  const [refresh, { data, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  const effectRan = useRef(false);

  useEffect(() => {
    console.log("effect Ran", effectRan);
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (err) {
          console.log(err);
        }
      };
      verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = <Outlet />;
  } else if (isError) {
    content = <Unauthorized />;
  }

  return <>{content}</>;
};
export default PersistLogin;
