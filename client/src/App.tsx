import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import ForgotPassword from "./pages/Forgot-password";
import ResetPassword from "./pages/Reset-password";
import MainLayout from "./layout/Main-layout";
import ProfileSetting from "./pages/Profile-setting";
import ViewPage from "./pages/income/ViewIncome";
import ViewExpense from "./pages/expense/ViewExpense";
import ViewBudget from "./pages/budget/ViewBudget";
import ViewGoal from "./pages/goal/viewGoal";
// import GoalHistory from "./pages/goal/viewGoal-history";
import { ViewAllNotification } from "./pages/notification/view-all-notification";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import ProtectedRoute from "./routes/protectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Without layout */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* With layout (Sidebar + Header always visible) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile-setting" element={<ProfileSetting />} />
              <Route path="/transaction" element={<ViewPage />} />
              <Route path="/transaction/income" element={<ViewPage />} />
              <Route path="/transaction/expense" element={<ViewExpense />} />
              <Route path="/transaction/budget" element={<ViewBudget />} />
              <Route path="/goal" element={<ViewGoal />}></Route>
              {/* <Route path="/goal-history" element={<GoalHistory />}></Route> */}
              <Route
                path="/notification"
                element={<ViewAllNotification />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        newestOnTop
        theme="light"
        transition={Slide}
      />
    </>
  );
}

export default App;
