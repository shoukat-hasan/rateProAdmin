// Simple syntax test for SurveyBuilder
try {
  const fs = require('fs');
  const path = require('path');
  
  const filePath = path.join(__dirname, 'src', 'pages', 'Surveys', 'SurveyBuilder.jsx');
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Basic syntax check - count braces
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  
  console.log('Open braces:', openBraces);
  console.log('Close braces:', closeBraces);
  console.log('Balanced:', openBraces === closeBraces ? 'YES' : 'NO');
  
  // Check for proper component structure
  const hasDefaultExport = content.includes('export default SurveyBuilder');
  console.log('Has default export:', hasDefaultExport ? 'YES' : 'NO');
  
} catch (error) {
  console.error('Error:', error.message);
}