// src\App.jsx
"use client"

import { Routes, Route, Navigate } from "react-router-dom"
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
import SurveyForm from "./pages/Surveys/SurveyForm"
import SurveyBuilder from "./pages/Surveys/SurveyBuilder"
import SurveyDistribution from "./pages/Surveys/SurveyDistribution"
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
import AnalyticsDashboard from "./pages/Analytics/AnalyticsDashboard"
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
import WhatsAppSettings from "./pages/Communication/WhatsAppSettings"
import SMSSettings from "./pages/Communication/SMSSettings"
import FeedbackAnalysis from "./pages/Analytics/FeedbackAnalysis"
import AIManagement from "./pages/AI/AIManagement"
import ActionManagement from "./pages/Actions/ActionManagement"
import { ToastContainer } from "react-toastify"
import { useAuth } from "./context/AuthContext"
import FullScreenLoader from "./components/Loader/FullScreenLoader"
import { startSilentTokenRefresh } from "./api/axiosInstance"

function App() {
  // const navigate = useNavigate();
  const { loading, globalLoading } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("darkMode")
      return saved !== null
        ? JSON.parse(saved)
        : window.matchMedia("(prefers-color-scheme: dark)").matches
    } catch (err) {
      console.log("Error getting dark mode from localStorage:", err);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  })

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

 useEffect(() => {
    startSilentTokenRefresh();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div>
      <>
      {(loading || globalLoading) && <FullScreenLoader />}
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
              <Route path="surveys/create" element={<SurveyBuilder darkMode={darkMode} />} />
              <Route path="surveys/builder" element={<SurveyBuilder darkMode={darkMode} />} />
              <Route path="surveys/builder/edit/:id" element={<SurveyBuilder darkMode={darkMode} />} />
              {/* <Route path="surveys/edit/:id" element={<SurveyForm />} /> */}
              <Route path="surveys/detail/:id" element={<SurveyDetail />} />
              <Route path="surveys/responses/:id" element={<SurveyResponses />} />
              <Route path="surveys/analytics/:id" element={<SurveyAnalytics />} />
              <Route path="surveys/distribution/:id" element={<SurveyDistribution />} />
              <Route path="surveys/customize/:id" element={<SurveyCustomization />} />
              <Route path="surveys/share/:id" element={<SurveySharing />} />
              <Route path="surveys/scheduling" element={<SurveyScheduling />} />
              <Route path="surveys/templates" element={<SurveyTemplates />} />
              <Route path="surveys/templates/create" element={<SurveyBuilder />} />
              <Route path="surveys/takesurvey/:id" element={<TakeSurvey />} />
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
              <Route path="analytics/dashboard" element={<AnalyticsDashboard />} />
              <Route path="analytics/feedback" element={<FeedbackAnalysis />} />
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

              {/* Actions */}
              <Route path="actions" element={<ActionManagement />} />

              {/* AI Management */}
              <Route path="ai" element={<AIManagement />} />

              {/* Communication */}
              <Route path="communication/whatsapp" element={<WhatsAppSettings />} />
              <Route path="communication/sms" element={<SMSSettings />} />

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
