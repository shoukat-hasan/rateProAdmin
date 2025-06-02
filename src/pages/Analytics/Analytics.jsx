// src/pages/Analytics/Analytics.jsx
"use client"

import { useState } from "react"
import { Line, Bar, Pie } from "react-chartjs-2"
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from "chart.js"
import { MdDownload, MdFilterAlt } from "react-icons/md"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days')
  const [surveyFilter, setSurveyFilter] = useState('all')

  // Sample data
  const responseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Responses',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(74, 108, 247, 0.2)',
        borderColor: 'rgba(74, 108, 247, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  }

  const satisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    datasets: [
      {
        data: [30, 40, 15, 10, 5],
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)',
          'rgba(100, 200, 100, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(253, 126, 20, 0.7)',
          'rgba(220, 53, 69, 0.7)'
        ]
      }
    ]
  }

  const npsData = {
    labels: ['Promoters (9-10)', 'Passives (7-8)', 'Detractors (0-6)'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(220, 53, 69, 0.7)'
        ]
      }
    ]
  }

  const exportData = () => {
    // Export logic
    console.log('Exporting data...')
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <div className="filters">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">Last Year</option>
          </select>
          <select value={surveyFilter} onChange={(e) => setSurveyFilter(e.target.value)}>
            <option value="all">All Surveys</option>
            <option value="csat">Customer Satisfaction</option>
            <option value="nps">NPS Survey</option>
          </select>
          <button className="btn btn-outline-primary" onClick={exportData}>
            <MdDownload /> Export
          </button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h2>Response Trends</h2>
          <div className="chart-container">
            <Line 
              data={responseData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        <div className="analytics-card">
          <h2>Satisfaction Distribution</h2>
          <div className="chart-container">
            <Pie 
              data={satisfactionData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        <div className="analytics-card">
          <h2>Net Promoter Score</h2>
          <div className="chart-container">
            <Pie 
              data={npsData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
          <div className="nps-score">
            <h3>NPS: 25</h3>
            <p>(Promoters - Detractors)</p>
          </div>
        </div>

        <div className="analytics-card full-width">
          <h2>Question Performance</h2>
          <div className="chart-container">
            <Bar 
              data={{
                labels: ['Q1: Overall Satisfaction', 'Q2: Product Quality', 'Q3: Customer Support', 'Q4: Likely to Recommend'],
                datasets: [{
                  label: 'Average Rating',
                  data: [4.2, 4.5, 3.8, 4.1],
                  backgroundColor: 'rgba(74, 108, 247, 0.7)'
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics