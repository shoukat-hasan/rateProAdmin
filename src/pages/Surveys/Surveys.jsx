// src\pages\Surveys\Surveys.jsx
"use client"

import { useState } from "react"
import { MdAdd, MdFilterList, MdSearch } from "react-icons/md"
import SurveyList from "./SurveyList.jsx"
import "./Surveys.css"

const Surveys = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="surveys-page">
      <div className="page-header">
        <h1>Surveys</h1>
        <button className="btn btn-primary">
          <MdAdd /> Create New Survey
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search surveys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <button className="filter-btn">
            <MdFilterList /> Filter <span className="filter-count">0</span>
          </button>
          <select className="sort-select">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="responses-high">Most Responses</option>
            <option value="responses-low">Least Responses</option>
          </select>
        </div>
      </div>

      <div className="surveys-container">
        <SurveyList />
      </div>
    </div>
  )
}

export default Surveys
