import supabase from "../supabaseClient";
import { useAppDispatch } from "../store/hook";
import { setIsAuth, setSession } from "../features/person/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const useRedirect = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const currLocation = useLocation().pathname;

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => dispatch(setSession(session)));

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      if (session) {
        dispatch(setIsAuth(true));
        currLocation == ("/sign-in" || "/sign-up") && navigate("/");
      } else {
        dispatch(setIsAuth(false));

        currLocation !== "/login" && navigate("/sign-in");
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);
};

export default useRedirect;
