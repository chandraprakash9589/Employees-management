import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { MyDailyStatus } from "./pages/MyDailyStatus/MyDailyStatus";
import { MyLeave } from "./pages/Myleave/MyLeave";
import { Holidays } from "./pages/Holidays/Holidays";
import SendMyDailyStatus from "./pages/SendMyDailyStatus/SendMyDailyStatus";
import { MyDailyStatusNewId } from "./pages/MyDailyStatus/MyDailyStatusNew";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/notFound/NotFound";
import ForgotPassword from "./Auth/ForgotPassword";
import Signup from "../src/Auth/signup/index";
import Login from "../src/Auth/Login/index";
import { AuthenticationRoutes } from "./Auth/authentication";
import { EditEmployeesDetails } from "./pages/editEmployeesDetails/EditEmployeesDetails";
import { AddSkills } from "./pages/editSkills/AddSkills";
import { EditSkills } from "./pages/editSkills/EditSkills";
import EditPersonalInfo from "./pages/Edit_personal_info/EditPersonalInfo";
import { ApplyLeave } from "./pages/Myleave/ApplyLeave";
import { DiscussionDesk } from "./pages/discussionDesk/DiscussionDesk";
import { HelpDesk } from "./pages/helpDesk/HelpDesk";
import ProjectUpdate from "./pages/adminPanel/ProjectUpdate";
import EditProject from "./pages/adminPanel/EditProject";
import Calls from "./pages/TestCalls/Calls";
import Tests from "./pages/TestCalls/Tests";
import ResetPassword from "./Auth/resetPassword";
import { AddDiscussion } from "./pages/discussionDesk/AddDiscussion";
import Users from "./pages/adminPanel/Users";
import Projects from "./pages/ProjectUpdate/Projects";
import Skills from "./pages/adminPanel/Skills";
import ShowSkills from "./pages/adminPanel/ShowSkills";
import { AddHoliday } from "./pages/adminPanel/AddHoliday";
import { AllLeaves } from "./pages/adminPanel/AllLeaves/AllLeaves";
import TestsCalls, {
  CallsForm,
  TestForm,
} from "./pages/adminPanel/testscalls/TestsCalls";
import ViewTests, { ShowTests } from "./pages/adminPanel/testscalls/ViewTests";
import ViewCalls, { ShowCalls } from "./pages/adminPanel/testscalls/ViewCalls";

function App() {
  const role = localStorage.getItem("role");
  return (
    <div
      style={{
        backgroundColor: "#000",
        margin: 0,
        padding: 0,
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {role === "admin" && (
            <>
              <Route path="/Signup" element={<Signup />} />
              <Route path="/projectUpdate" element={<ProjectUpdate />} />
              <Route path="/edit_project" element={<EditProject />} />
              <Route path="/All_users" element={<Users />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/show_skills" element={<ShowSkills />} />
              <Route path="/tests_calls" element={<TestsCalls />} />
              <Route path="/testsform" element={<TestForm />} />
              <Route path="/callsform" element={<CallsForm />} />
              <Route path="/viewtests" element={<ViewTests />} />
              <Route path="/viewcalls" element={<ViewCalls />} />
              <Route path="/viewtests/:id" element={<ShowTests />} />
              <Route path="/viewcalls/:id" element={<ShowCalls />} />
              <Route path="/all_leaves" element={<AllLeaves />} />
              <Route path="/add_holidays" element={<AddHoliday />} />
            </>
          )}
          <Route
            path="/"
            element={
              <AuthenticationRoutes>
                <Dashboard />
              </AuthenticationRoutes>
            }
          />
          <Route path="/daily_status_updates" element={<MyDailyStatus />} />
          <Route
            path="/daily_status_updates_details/"
            element={<MyDailyStatusNewId />}
          />
          <Route path="/send_daily_status" element={<SendMyDailyStatus />} />
          <Route path="/my_leave" element={<MyLeave />} />

          <Route path="/holidays" element={<Holidays />} />
          <Route path="/add-skills" element={<AddSkills />} />
          <Route path="/edit_skills" element={<EditSkills />} />
          <Route path="/edit_profile" element={<EditEmployeesDetails />} />
          <Route path="/edit_personal_info" element={<EditPersonalInfo />} />
          <Route path="/discussion_desk" element={<DiscussionDesk />} />
          <Route path="/discussion_desk/:new" element={<AddDiscussion />} />
          <Route path="/help_desk" element={<HelpDesk />} />
          <Route path="/my_leave/:new" element={<ApplyLeave />} />
          <Route path="*" element={<NotFound />} />
          <Route path="Calls" element={<Calls />} />
          <Route path="Tests" element={<Tests />} />
          <Route
            path="/forgotPass/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="projects" element={<Projects />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
