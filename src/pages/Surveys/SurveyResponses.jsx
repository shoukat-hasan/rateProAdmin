// src/pages/Surveys/SurveyResponses.jsx
"use client"

import { useParams } from "react-router-dom"

const SurveyResponses = () => {
  const { id } = useParams()
  
  return (
    <div className="survey-responses">
      <h1>Survey Responses - ID: {id}</h1>
      {/* Add your responses table here */}
    </div>
  )
}

export default SurveyResponses