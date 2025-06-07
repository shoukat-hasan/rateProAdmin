// src\App.jsx

"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "./components/Layout/Layout.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import SurveyList from "./pages/Surveys/SurveyList.jsx"
import CreateSurvey from "./pages/Surveys/CreateSurvey.jsx"
import SurveySettings from "./pages/Surveys/SurveySettings.jsx"
import SurveyDetail from "./pages/Surveys/SurveyDetail.jsx"
import SurveyResponses from "./pages/Surveys/SurveyResponses.jsx"
import SurveyAnalytics from "./pages/Surveys/SurveyAnalytics.jsx"
import SurveyScheduling from "./pages/Surveys/SurveyScheduling.jsx"
import SurveyTemplates from "./pages/Surveys/SurveyTemplates.jsx"
import SurveyCustomization from "./pages/Surveys/SurveyCustomization.jsx"
import SurveySharing from "./pages/Surveys/SurveySharing.jsx"
import TakeSurvey from "./pages/Surveys/TakeSurvey.jsx"
import Templates from "./pages/Templates/Templates.jsx"
import Audiences from "./pages/Audiences/Audiences.jsx"
import AudienceSegmentation from "./pages/Audiences/AudienceSegmentation.jsx"
import Analytics from "./pages/Analytics/Analytics.jsx"
import RealTimeResults from "./pages/Analytics/RealTimeResults.jsx"
import TrendAnalysis from "./pages/Analytics/TrendAnalysis.jsx"
import Settings from "./pages/Settings/Settings.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import UserList from "./pages/UserManagement/UserList.jsx"
import UserForm from "./pages/UserManagement/UserForm.jsx"
import AccessManagement from "./pages/AccessManagement/AccessManagement.jsx"
import RoleManagement from "./pages/AccessManagement/RoleManagement.jsx"
import PermissionManagement from "./pages/AccessManagement/PermissionManagement.jsx"
import EmailManagement from "./pages/Communication/EmailManagement.jsx"
import EmailTemplates from "./pages/Communication/EmailTemplates.jsx"
import NotificationCenter from "./pages/Communication/NotificationCenter.jsx"
import SupportTickets from "./pages/Support/SupportTickets.jsx"
import TicketDetail from "./pages/Support/TicketDetail.jsx"
import CreateTicket from "./pages/Support/CreateTicket.jsx"

import Testimonials from "./pages/ContentManagement/Testimonials.jsx"
import Widgets from "./pages/ContentManagement/Widgets.jsx"
import IncentiveManagement from "./pages/Incentives/IncentiveManagement.jsx"
import RewardSystem from "./pages/Incentives/RewardSystem.jsx"
import CompanyRegistration from "./pages/Auth/CompanyRegistration.jsx"
import Login from "./pages/Auth/Login.jsx"
import Signup from "./pages/Auth/Signup.jsx"
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx"
import ResetPassword from "./pages/Auth/ResetPassword.jsx"
import EnterEmail from "./pages/Auth/EnterEmail.jsx"
import EnterResetCode from "./pages/Auth/EnterResetCode.jsx"
import ThankYou from "./pages/Settings/ThankYouPage.jsx"
import CustomThankYou from "./pages/Settings/CustomThankYou.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx"
import BillingPlans from "./pages/Settings/BillingPlans.jsx"
import ThankYouPage from "./pages/Settings/ThankYouPage.jsx"
import NotificationSettings from "./pages/Settings/NotificationSettings.jsx"
import ThemeSettings from "./pages/Settings/ThemeSettings.jsx"
import SMTPConfig from "./pages/Settings/SMTPConfig.jsx"
import CustomReports from "./pages/Analytics/CustomReports.jsx"
import Features from "./pages/ContentManagement/Features.jsx"
import Pricing from "./pages/ContentManagement/Pricing.jsx"

function App() {
  const [darkMode, setDarkMode] = useState(() => {


   

    try {
      const saved = localStorage.getItem("darkMode")
      return saved !== null ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches
    } catch (err) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
  })

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark" : "light"}`}>
        <Routes>
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/company-registration" element={<CompanyRegistration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/enter-email" element={<EnterEmail />} />
          <Route path="/enter-reset-code" element={<EnterResetCode />} />

          {/* Public Survey Pages */}
          <Route path="/survey/:id" element={<TakeSurvey />} />
          <Route path="/survey/:id/password" element={<TakeSurvey />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/thank-you/:surveyId" element={<CustomThankYou />} />

          {/* Protected layout */}
          <Route path="/" element={<Layout darkMode={darkMode} toggleTheme={toggleTheme} />}>
            <Route index element={<Dashboard />} />

            {/* Survey Management */}
            <Route path="surveys" element={<SurveyList />} />
            <Route path="surveys/create" element={<CreateSurvey />} />
            <Route path="surveys/:id/edit" element={<CreateSurvey />} />
            <Route path="surveys/detail" element={<SurveyDetail />} />
            <Route path="surveys/:id/responses" element={<SurveyResponses />} />
            <Route path="surveys/analytics" element={<SurveyAnalytics />} />
            <Route path="surveys/:id/customize" element={<SurveyCustomization />} />
            <Route path="surveys/:id/share" element={<SurveySharing />} />
            <Route path="surveys/scheduling" element={<SurveyScheduling />} />
            <Route path="surveys/templates" element={<SurveyTemplates />} />
            <Route path="surveys/takesurvey" element={<TakeSurvey />} />
          <Route path="surveys/list" element={<SurveyList />} />
          <Route path="surveys/settings" element={<SurveySettings />} />



            {/* User Management */}
            <Route path="users" element={<UserList />} />
            <Route path="users/create" element={<UserForm />} />
            <Route path="users/:id/edit" element={<UserForm />} />
            <Route path="users/form" element={<UserForm />} />
            <Route path="users/role-permissions" element={<PermissionManagement />} />

            {/* Access Management */}
            <Route path="access" element={<AccessManagement />} />
            <Route path="access/roles" element={<RoleManagement />} />
            <Route path="access/permissions" element={<PermissionManagement />} />

            {/* Audience Management */}
            <Route path="audiences" element={<Audiences />} />
            <Route path="audiences/segmentation" element={<AudienceSegmentation />} />

            {/* Analytics & Reporting */}
            <Route path="analytics" element={<Analytics />} />
            <Route path="analytics/custom-reports" element={<CustomReports />} />
            <Route path="analytics/real-time" element={<RealTimeResults />} />
            <Route path="analytics/trends" element={<TrendAnalysis />} />

            {/* Communication */}
            <Route path="communication/emails" element={<EmailManagement />} />
            <Route path="communication/templates" element={<EmailTemplates />} />
            <Route path="communication/notifications" element={<NotificationCenter />} />

            {/* Support System */}
            <Route path="support" element={<SupportTickets />} />
            <Route path="support/create" element={<CreateTicket />} />
            <Route path="support/:id" element={<TicketDetail />} />

            {/* Incentives */}
            <Route path="incentives" element={<IncentiveManagement />} />
            <Route path="incentives/rewards" element={<RewardSystem />} />

            {/* Templates */}
            <Route path="templates" element={<Templates />} />

            {/* Settings */}
            <Route path="settings" element={<Settings />} />
            <Route path="settings/thank-you" element={<CustomThankYou />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/settings/billing-plans" element={<BillingPlans />} />
            <Route path="/settings/custom-thank-you" element={<ThankYouPage/>} />
            <Route path="/settings/email-templates" element={<EmailTemplates/>} />
            <Route path="/settings/notification-settings" element={<NotificationSettings/>} />
            <Route path="/settings/smtp-config" element={<SMTPConfig/>} />
            <Route path="/settings/theme-settings" element={<ThemeSettings/>} />

            {/* Content Management */}
            <Route path="features" element={<Features />} />
            <Route path="content/pricing" element={<Pricing />} />
            <Route path="content/testimonials" element={<Testimonials />} />
            <Route path="content/widgets" element={<Widgets />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
