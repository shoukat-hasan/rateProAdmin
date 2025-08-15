// // // src\App.jsx

// // "use client"

// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// // import { useState, useEffect } from "react"
// // import Layout from "./components/Layout/Layout.jsx"
// // import Dashboard from "./pages/Dashboard/Dashboard.jsx"
// // import SurveyList from "./pages/Surveys/SurveyList.jsx"
// // import CreateSurvey from "./pages/Surveys/CreateSurvey.jsx"
// // import SurveySettings from "./pages/Surveys/SurveySettings.jsx"
// // import SurveyDetail from "./pages/Surveys/SurveyDetail.jsx"
// // import SurveyResponses from "./pages/Surveys/SurveyResponses.jsx"
// // import SurveyAnalytics from "./pages/Surveys/SurveyAnalytics.jsx"
// // import SurveyScheduling from "./pages/Surveys/SurveyScheduling.jsx"
// // import SurveyTemplates from "./pages/Surveys/SurveyTemplates.jsx"
// // import SurveyCustomization from "./pages/Surveys/SurveyCustomization.jsx"
// // import SurveySharing from "./pages/Surveys/SurveySharing.jsx"
// // import TakeSurvey from "./pages/Surveys/TakeSurvey.jsx"
// // import Templates from "./pages/Templates/Templates.jsx"
// // import Audiences from "./pages/Audiences/Audiences.jsx"
// // import AudienceSegmentation from "./pages/Audiences/AudienceSegmentation.jsx"
// // import Analytics from "./pages/Analytics/Analytics.jsx"
// // import RealTimeResults from "./pages/Analytics/RealTimeResults.jsx"
// // import TrendAnalysis from "./pages/Analytics/TrendAnalysis.jsx"
// // import Settings from "./pages/Settings/Settings.jsx"
// // import Profile from "./pages/Profile/Profile.jsx"
// // import UserList from "./pages/UserManagement/UserList.jsx"
// // import UserForm from "./pages/UserManagement/UserForm.jsx"
// // import AccessManagement from "./pages/AccessManagement/AccessManagement.jsx"
// // import RoleManagement from "./pages/AccessManagement/RoleManagement.jsx"
// // import PermissionManagement from "./pages/AccessManagement/PermissionManagement.jsx"
// // import EmailManagement from "./pages/Communication/EmailManagement.jsx"
// // import EmailTemplates from "./pages/Communication/EmailTemplates.jsx"
// // import NotificationCenter from "./pages/Communication/NotificationCenter.jsx"
// // import SupportTickets from "./pages/Support/SupportTickets.jsx"
// // import TicketDetail from "./pages/Support/TicketDetail.jsx"
// // import CreateTicket from "./pages/Support/CreateTicket.jsx"

// // import Testimonials from "./pages/ContentManagement/Testimonials.jsx"
// // import Widgets from "./pages/ContentManagement/Widgets.jsx"
// // import IncentiveManagement from "./pages/Incentives/IncentiveManagement.jsx"
// // import RewardSystem from "./pages/Incentives/RewardSystem.jsx"
// // import CompanyRegistration from "./pages/Auth/CompanyRegistration.jsx"
// // import Login from "./pages/Auth/Login.jsx"
// // import Signup from "./pages/Auth/Signup.jsx"
// // import ForgotPassword from "./pages/Auth/ForgotPassword.jsx"
// // import ResetPassword from "./pages/Auth/ResetPassword.jsx"
// // import EnterEmail from "./pages/Auth/EnterEmail.jsx"
// // import EnterResetCode from "./pages/Auth/EnterResetCode.jsx"
// // import ThankYou from "./pages/Settings/ThankYouPage.jsx"
// // import CustomThankYou from "./pages/Settings/CustomThankYou.jsx"
// // import NotFound from "./pages/NotFound/NotFound.jsx"
// // import BillingPlans from "./pages/Settings/BillingPlans.jsx"
// // import ThankYouPage from "./pages/Settings/ThankYouPage.jsx"
// // import NotificationSettings from "./pages/Settings/NotificationSettings.jsx"
// // import ThemeSettings from "./pages/Settings/ThemeSettings.jsx"
// // import SMTPConfig from "./pages/Settings/SMTPConfig.jsx"
// // import CustomReports from "./pages/Analytics/CustomReports.jsx"
// // import Features from "./pages/ContentManagement/Features.jsx"
// // import Pricing from "./pages/ContentManagement/Pricing.jsx"
// // import ResponseOverview from "./pages/Analytics/ResponseOverview.jsx"
// // import ContactManagement from "./pages/Audiences/ContactManagement.jsx"
// // import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx"

// // function App() {
// //   const [darkMode, setDarkMode] = useState(() => {

// //     try {
// //       const saved = localStorage.getItem("darkMode")
// //       return saved !== null ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches
// //     } catch (err) {
// //       return window.matchMedia("(prefers-color-scheme: dark)").matches
// //     }
// //   })

// //   useEffect(() => {
// //     localStorage.setItem("darkMode", JSON.stringify(darkMode))
// //     document.documentElement.classList.toggle("dark", darkMode)
// //   }, [darkMode])

// //   const toggleTheme = () => {
// //     setDarkMode((prev) => !prev)
// //   }

// //   return (
// //     <Router>
// //       <div className={`app-container ${darkMode ? "dark" : "light"}`}>
// //         <Routes>
// //           {/* Auth Pages */}
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />
// //           <Route path="/company-registration" element={<CompanyRegistration />} />
// //           <Route path="/forgot-password" element={<ForgotPassword />} />
// //           <Route path="/reset-password" element={<ResetPassword />} />
// //           <Route path="/enter-email" element={<EnterEmail />} />
// //           <Route path="/enter-reset-code" element={<EnterResetCode />} />

// //           {/* Default redirect */}
// //           <Route path="/" element={<Navigate to="/login" />} />

// //           {/* Public Survey Pages */}
// //           <Route path="/survey/:id" element={<TakeSurvey />} />
// //           <Route path="/survey/:id/password" element={<TakeSurvey />} />
// //           <Route path="/thank-you" element={<ThankYou />} />
// //           <Route path="/thank-you/:surveyId" element={<CustomThankYou />} />

// //           {/* Protected layout */}
// //           {/* <Route path="/app" element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}>
// //             <Route index element={<Dashboard />} /> */}

// //           {/* Protected Layout */}
// //           <Route
// //             path="/app"
// //             element={
// //               <ProtectedRoute>
// //                 <Layout darkMode={darkMode} toggleTheme={toggleTheme} />
// //               </ProtectedRoute>
// //             }
// //           >
// //             <Route index element={<Dashboard />} />

// //             {/* Survey Management */}
// //             <Route path="surveys" element={<SurveyList />} />
// //             <Route path="surveys/create" element={<CreateSurvey />} />
// //             <Route path="surveys/:id/edit" element={<CreateSurvey />} />
// //             <Route path="surveys/detail" element={<SurveyDetail />} />
// //             <Route path="surveys/:id/responses" element={<SurveyResponses />} />
// //             <Route path="surveys/analytics" element={<SurveyAnalytics />} />
// //             <Route path="surveys/:id/customize" element={<SurveyCustomization />} />
// //             <Route path="surveys/:id/share" element={<SurveySharing />} />
// //             <Route path="surveys/scheduling" element={<SurveyScheduling />} />
// //             <Route path="surveys/templates" element={<SurveyTemplates />} />
// //             <Route path="surveys/takesurvey" element={<TakeSurvey />} />
// //             <Route path="surveys/list" element={<SurveyList />} />
// //             <Route path="surveys/settings" element={<SurveySettings />} />

// //             {/* User Management */}
// //             <Route path="users" element={<UserList />} />
// //             <Route path="users/create" element={<UserForm />} />
// //             <Route path="users/:id/edit" element={<UserForm />} />
// //             <Route path="users/form" element={<UserForm />} />
// //             <Route path="users/role-permissions" element={<PermissionManagement />} />

// //             {/* Access Management */}
// //             <Route path="access" element={<AccessManagement />} />
// //             <Route path="access/roles" element={<RoleManagement />} />
// //             <Route path="access/permissions" element={<PermissionManagement />} />

// //             {/* Audience Management */}
// //             <Route path="audiences" element={<Audiences />} />
// //             <Route path="audiences/segmentation" element={<AudienceSegmentation />} />
// //             <Route path="audiences/contact-management" element={<ContactManagement />} />

// //             {/* Analytics & Reporting */}
// //             <Route path="analytics" element={<Analytics />} />
// //             <Route path="analytics/custom-reports" element={<CustomReports />} />
// //             <Route path="analytics/real-time" element={<RealTimeResults />} />
// //             <Route path="analytics/trends" element={<TrendAnalysis />} />
// //             <Route path="analytics/response-overview" element={<ResponseOverview />} />

// //             {/* Communication */}
// //             <Route path="communication/emails" element={<EmailManagement />} />
// //             <Route path="communication/templates" element={<EmailTemplates />} />
// //             <Route path="communication/notifications" element={<NotificationCenter />} />

// //             {/* Support System */}
// //             <Route path="support" element={<SupportTickets />} />
// //             <Route path="support/create" element={<CreateTicket />} />
// //             <Route path="support/:id" element={<TicketDetail />} />

// //             {/* Incentives */}
// //             <Route path="incentives" element={<IncentiveManagement />} />
// //             <Route path="incentives/rewards" element={<RewardSystem />} />

// //             {/* Templates */}
// //             <Route path="templates" element={<Templates />} />

// //             {/* Settings */}
// //             <Route path="settings" element={<Settings />} />
// //             <Route path="settings/thank-you" element={<CustomThankYou />} />
// //             <Route path="settings/billing-plans" element={<BillingPlans />} />
// //             <Route path="settings/custom-thank-you" element={<ThankYouPage />} />
// //             <Route path="settings/email-templates" element={<EmailTemplates />} />
// //             <Route path="settings/notification-settings" element={<NotificationSettings />} />
// //             <Route path="settings/smtp-config" element={<SMTPConfig />} />
// //             <Route path="settings/theme-settings" element={<ThemeSettings />} />

// //             {/* Profile */}
// //             <Route path="profile" element={<Profile />} />

// //             {/* Content Management */}
// //             <Route path="features" element={<Features />} />
// //             <Route path="content/pricing" element={<Pricing />} />
// //             <Route path="content/testimonials" element={<Testimonials />} />
// //             <Route path="content/widgets" element={<Widgets />} />

// //           </Route>


// //           {/* </Route> */}

// //           {/* 404 */}
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </div>
// //     </Router >
// //   )
// // }

// // export default App

"use client"

import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

// Layout & Pages
import Layout from "./components/Layout/Layout"
import Dashboard from "./pages/Dashboard/Dashboard"

// Auth Pages
import Login from "./pages/Auth/Login"
import ForgotPasswordFlow from "./pages/Auth/ForgotPasswordFlow"
import ResetPassword from "./pages/Auth/ResetPassword"
import EnterEmail from "./pages/Auth/EnterEmail"
import EnterResetCode from "./pages/Auth/EnterResetCode"

// Public Pages
import TakeSurvey from "./pages/Surveys/TakeSurvey"
import ThankYou from "./pages/Settings/ThankYouPage"
import CustomThankYou from "./pages/Settings/CustomThankYou"

// 404
import NotFound from "./pages/NotFound/NotFound"

import SurveyList from "./pages/Surveys/SurveyList"
import CreateSurvey from "./pages/Surveys/CreateSurvey"
import SurveySettings from "./pages/Surveys/SurveySettings"
import SurveyDetail from "./pages/Surveys/SurveyDetail"
import SurveyResponses from "./pages/Surveys/SurveyResponses"
import SurveyAnalytics from "./pages/Surveys/SurveyAnalytics"
import SurveyScheduling from "./pages/Surveys/SurveyScheduling"
import SurveyTemplates from "./pages/Surveys/SurveyTemplates"
import SurveyCustomization from "./pages/Surveys/SurveyCustomization"
import SurveySharing from "./pages/Surveys/SurveySharing"
import Templates from "./pages/Templates/Templates"
import Audiences from "./pages/Audiences/Audiences"
import AudienceSegmentation from "./pages/Audiences/AudienceSegmentation"
import Analytics from "./pages/Analytics/Analytics"
import RealTimeResults from "./pages/Analytics/RealTimeResults"
import TrendAnalysis from "./pages/Analytics/TrendAnalysis"
import CustomReports from "./pages/Analytics/CustomReports"
import ResponseOverview from "./pages/Analytics/ResponseOverview"
import Settings from "./pages/Settings/Settings"
import ThankYouPage from "./pages/Settings/ThankYouPage"
import NotificationSettings from "./pages/Settings/NotificationSettings"
import ThemeSettings from "./pages/Settings/ThemeSettings"
import SMTPConfig from "./pages/Settings/SMTPConfig"
import Profile from "./pages/Profile/Profile"
import UserList from "./pages/UserManagement/UserList"
import UserForm from "./pages/UserManagement/UserForm"
import AccessManagement from "./pages/AccessManagement/AccessManagement"
import RoleManagement from "./pages/AccessManagement/RoleManagement"
import EmailTemplates from "./pages/Communication/EmailTemplates"
import SupportTickets from "./pages/Support/SupportTickets"
import TicketDetail from "./pages/Support/TicketDetail"
import CreateTicket from "./pages/Support/CreateTicket"
import Testimonials from "./pages/ContentManagement/Testimonials"
import Widgets from "./pages/ContentManagement/Widgets"
import Features from "./pages/ContentManagement/Features"
import Pricing from "./pages/ContentManagement/Pricing"
import ContactManagement from "./pages/Audiences/ContactManagement"
import Support from "./pages/Support/CreateTicket"
import VerifyEmail from "./pages/Auth/VerifyEmail"
import TokenRedirector from "./components/TokenRedirector"
import { ToastContainer } from "react-toastify"

function App() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("darkMode")
      return saved !== null
        ? JSON.parse(saved)
        : window.matchMedia("(prefers-color-scheme: dark)").matches
    } catch (err) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
  })

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  // useEffect(() => {

  //   if () {
  //     try {
  //       localStorage.setItem("authUser", JSON.stringify(decoded));

  //       navigate("/app/dashboard", { replace: true });
  //     } 
  //   }
  // }, []);
  
  return (
    <div>
      <>
        <div className={`app-container ${darkMode ? "dark" : "light"}`}>
          <Routes>
            <Route path="/auth-redirect" element={<TokenRedirector />} />
            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/enter-email" element={<EnterEmail />} />
            <Route path="/enter-reset-code" element={<EnterResetCode />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Public Pages */}
            <Route path="/survey/:id" element={<TakeSurvey />} />
            <Route path="/survey/:id/password" element={<TakeSurvey />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/thank-you/:surveyId" element={<CustomThankYou />} />
            <Route path="/support" element={<Support />} />

            {/* Protected Layout */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Layout darkMode={darkMode} toggleTheme={toggleTheme} />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />

              {/* Surveys */}
              <Route path="surveys" element={<SurveyList />} />
              <Route path="surveys/create" element={<CreateSurvey />} />
              <Route path="surveys/:id/edit" element={<CreateSurvey />} />
              <Route path="surveys/:id/detail" element={<SurveyDetail />} />
              <Route path="surveys/:id/responses" element={<SurveyResponses />} />
              <Route path="surveys/:id/analytics" element={<SurveyAnalytics />} />
              <Route path="surveys/:id/customize" element={<SurveyCustomization />} />
              <Route path="surveys/:id/share" element={<SurveySharing />} />
              <Route path="surveys/scheduling" element={<SurveyScheduling />} />
              <Route path="surveys/templates" element={<SurveyTemplates />} />
              <Route path="surveys/:id/takesurvey" element={<TakeSurvey />} />
              <Route path="surveys/settings" element={<SurveySettings />} />

              {/* Users */}
              <Route path="users" element={<UserList />} />
              <Route path="users/:id/edit" element={<UserForm />} />
              <Route path="users/form" element={<UserForm />} />

              {/* Access */}
              <Route path="access" element={<AccessManagement />} />
              <Route path="roles" element={<RoleManagement />} />

              {/* Audiences */}
              <Route path="audiences" element={<Audiences />} />
              <Route path="audiences/segmentation" element={<AudienceSegmentation />} />
              <Route path="audiences/contact-management" element={<ContactManagement />} />

              {/* Analytics */}
              <Route path="analytics" element={<Analytics />} />
              <Route path="analytics/custom-reports" element={<CustomReports />} />
              <Route path="analytics/real-time" element={<RealTimeResults />} />
              <Route path="analytics/trends" element={<TrendAnalysis />} />
              <Route path="analytics/response-overview" element={<ResponseOverview />} />

              {/* Support */}
              <Route path="support" element={<SupportTickets />} />
              <Route path="support/create" element={<CreateTicket />} />
              <Route path="support/:id" element={<TicketDetail />} />

              {/* Templates */}
              <Route path="templates" element={<Templates />} />

              {/* Settings */}
              <Route path="settings" element={<Settings />} />
              <Route path="settings/thank-you" element={<CustomThankYou />} />
              {/* <Route path="settings/billing-plans" element={<BillingPlans />} /> */}
              <Route path="settings/custom-thank-you" element={<ThankYouPage />} />
              <Route path="settings/email-templates" element={<EmailTemplates />} />
              <Route path="settings/notification-settings" element={<NotificationSettings />} />
              <Route path="settings/smtp-config" element={<SMTPConfig />} />
              <Route path="settings/theme-settings" element={<ThemeSettings />} />

              {/* Profile */}
              <Route path="profile" element={<Profile />} />

              {/* Content */}
              <Route path="features" element={<Features />} />
              <Route path="content/pricing" element={<Pricing />} />
              <Route path="content/testimonials" element={<Testimonials />} />
              <Route path="content/widgets" element={<Widgets />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </>
      <ToastContainer />
    </div>
  )
}

export default App

// "use client"

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import { useState, useEffect } from "react"
// import { AuthProvider } from "./context/AuthContext"
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

// // Layout & Pages
// import Layout from "./components/Layout/Layout"
// import Dashboard from "./pages/Dashboard/Dashboard"

// // Auth Pages
// import Login from "./pages/Auth/Login"
// import Signup from "./pages/Auth/Signup"
// import CompanyRegistration from "./pages/Auth/CompanyRegistration"
// import ForgotPassword from "./pages/Auth/ForgotPassword"
// import ResetPassword from "./pages/Auth/ResetPassword"
// import EnterEmail from "./pages/Auth/EnterEmail"
// import EnterResetCode from "./pages/Auth/EnterResetCode"

// // Public Pages
// import TakeSurvey from "./pages/Surveys/TakeSurvey"
// import ThankYou from "./pages/Settings/ThankYouPage"
// import CustomThankYou from "./pages/Settings/CustomThankYou"

// // 404
// import NotFound from "./pages/NotFound/NotFound"

// // Survey Pages
// import SurveyList from "./pages/Surveys/SurveyList"
// import CreateSurvey from "./pages/Surveys/CreateSurvey"
// import SurveyDetail from "./pages/Surveys/SurveyDetail"
// import SurveyCustomization from "./pages/Surveys/SurveyCustomization"
// import SurveyResponses from "./pages/Surveys/SurveyResponses"
// import SurveyAnalytics from "./pages/Surveys/SurveyAnalytics"
// import SurveyScheduling from "./pages/Surveys/SurveyScheduling"
// import SurveySharing from "./pages/Surveys/SurveySharing"
// import SurveyTemplates from "./pages/Surveys/SurveyTemplates"

// // Other Modules
// import Audiences from "./pages/Audiences/Audiences"
// import AudienceSegmentation from "./pages/Audiences/AudienceSegmentation"
// import ContactManagement from "./pages/Audiences/ContactManagement"
// import Analytics from "./pages/Analytics/Analytics"
// import RealTimeResults from "./pages/Analytics/RealTimeResults"
// import TrendAnalysis from "./pages/Analytics/TrendAnalysis"
// import CustomReports from "./pages/Analytics/CustomReports"
// import ResponseOverview from "./pages/Analytics/ResponseOverview"
// import Settings from "./pages/Settings/Settings"
// import ThankYouPage from "./pages/Settings/ThankYouPage"
// import NotificationSettings from "./pages/Settings/NotificationSettings"
// import ThemeSettings from "./pages/Settings/ThemeSettings"
// import SMTPConfig from "./pages/Settings/SMTPConfig"
// import Profile from "./pages/Profile/Profile"
// import UserList from "./pages/UserManagement/UserList"
// import UserForm from "./pages/UserManagement/UserForm"
// import AccessManagement from "./pages/AccessManagement/AccessManagement"
// import RoleManagement from "./pages/AccessManagement/RoleManagement"
// import PermissionManagement from "./pages/AccessManagement/PermissionManagement"
// import EmailTemplates from "./pages/Communication/EmailTemplates"
// import NotificationCenter from "./pages/Communication/NotificationCenter"
// import SupportTickets from "./pages/Support/SupportTickets"
// import TicketDetail from "./pages/Support/TicketDetail"
// import CreateTicket from "./pages/Support/CreateTicket"
// import Features from "./pages/ContentManagement/Features"
// import Pricing from "./pages/ContentManagement/Pricing"
// import Testimonials from "./pages/ContentManagement/Testimonials"
// import Widgets from "./pages/ContentManagement/Widgets"

// function App() {
//   const [darkMode, setDarkMode] = useState(() => {
//     try {
//       const saved = localStorage.getItem("darkMode")
//       return saved !== null
//         ? JSON.parse(saved)
//         : window.matchMedia("(prefers-color-scheme: dark)").matches
//     } catch (err) {
//       return window.matchMedia("(prefers-color-scheme: dark)").matches
//     }
//   })

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode)
//     localStorage.setItem("darkMode", JSON.stringify(darkMode))
//   }, [darkMode])

//   const toggleTheme = () => {
//     setDarkMode(prev => !prev)
//   }

//   return (
//     <Router>
//       <AuthProvider>
//         <div className={`app-container ${darkMode ? "dark" : "light"}`}>
//           <Routes>

//             {/* Auth Pages */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/company-registration" element={<CompanyRegistration />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/enter-email" element={<EnterEmail />} />
//             <Route path="/enter-reset-code" element={<EnterResetCode />} />

//             {/* Public Survey Routes */}
//             <Route path="/survey/:id" element={<TakeSurvey />} />
//             <Route path="/thank-you" element={<ThankYou />} />
//             <Route path="/thank-you/:surveyId" element={<CustomThankYou />} />

//             {/* Redirect */}
//             <Route path="/" element={<Navigate to="/login" />} />

//             {/* Protected Area */}
//             <Route
//               path="/app"
//               element={
//                 <ProtectedRoute>
//                   <Layout darkMode={darkMode} toggleTheme={toggleTheme} />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<Dashboard />} />

//               {/* Surveys */}
//               <Route path="surveys" element={<SurveyList />} />
//               <Route path="surveys/create" element={<CreateSurvey />} />
//               <Route path="surveys/templates" element={<SurveyTemplates />} />
//               <Route path="analytics" element={<SurveyAnalytics />} />

//               <Route path="surveys/:id" element={<SurveyDetail />}>
//                 <Route path="edit" element={<CreateSurvey />} />
//                 <Route path="customize" element={<SurveyCustomization />} />
//                 <Route path="responses" element={<SurveyResponses />} />
//                 <Route path="analytics" element={<SurveyAnalytics />} />
//                 <Route path="scheduling" element={<SurveyScheduling />} />
//                 <Route path="share" element={<SurveySharing />} />
//               </Route>

//               {/* Users */}
//               <Route path="users" element={<UserList />} />
//               <Route path="users/create" element={<UserForm />} />
//               <Route path="users/:id/edit" element={<UserForm />} />
//               <Route path="users/role-permissions" element={<PermissionManagement />} />

//               {/* Access Management */}
//               <Route path="access" element={<AccessManagement />} />
//               <Route path="access/roles" element={<RoleManagement />} />
//               <Route path="access/permissions" element={<PermissionManagement />} />

//               {/* Audiences */}
//               <Route path="audiences" element={<Audiences />} />
//               <Route path="audiences/segmentation" element={<AudienceSegmentation />} />
//               <Route path="audiences/contact-management" element={<ContactManagement />} />

//               {/* Analytics */}
//               <Route path="analytics" element={<Analytics />} />
//               <Route path="analytics/custom-reports" element={<CustomReports />} />
//               <Route path="analytics/real-time" element={<RealTimeResults />} />
//               <Route path="analytics/trends" element={<TrendAnalysis />} />
//               <Route path="analytics/response-overview" element={<ResponseOverview />} />

//               {/* Communication */}
//               <Route path="communication/email-templates" element={<EmailTemplates />} />
//               <Route path="communication/notifications" element={<NotificationCenter />} />

//               {/* Support */}
//               <Route path="support" element={<SupportTickets />} />
//               <Route path="support/create" element={<CreateTicket />} />
//               <Route path="support/:id" element={<TicketDetail />} />

//               {/* Settings */}
//               <Route path="settings" element={<Settings />} />
//               <Route path="settings/thank-you" element={<ThankYouPage />} />
//               <Route path="settings/custom-thank-you" element={<CustomThankYou />} />
//               <Route path="settings/notification-settings" element={<NotificationSettings />} />
//               <Route path="settings/smtp-config" element={<SMTPConfig />} />
//               <Route path="settings/theme-settings" element={<ThemeSettings />} />

//               {/* Content Management */}
//               <Route path="features" element={<Features />} />
//               <Route path="content/pricing" element={<Pricing />} />
//               <Route path="content/testimonials" element={<Testimonials />} />
//               <Route path="content/widgets" element={<Widgets />} />

//               {/* Profile */}
//               <Route path="profile" element={<Profile />} />

//               {/* Templates */}
//               <Route path="templates" element={<SurveyTemplates />} />


//             </Route>

//             {/* 404 */}
//             <Route path="*" element={<NotFound />} />

//           </Routes>
//         </div>
//       </AuthProvider>
//     </Router>
//   )
// }

// export default App
