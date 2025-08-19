import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, me } from "../slices/authSlice";
import { fetchUserPermissions } from "../slices/permissionSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, user, error } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      dispatch(me()).then((res) => {
        const uid = res.payload?._id;
        if (uid) dispatch(fetchUserPermissions(uid));
        navigate("/");
      });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const uid = res?.payload?._id;
        dispatch(fetchUserPermissions(uid));
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-2xl shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Sign in</h1>
        <input
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded-xl px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {status === "failed" && <p className="text-red-600 text-sm">{error}</p>}
        <button
          disabled={status === "loading"}
          className="w-full bg-black text-white rounded-xl py-2 cursor-pointer"
        >
          {status === "loading" ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
