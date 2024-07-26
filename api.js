const apiUrl = 'https://api.data.gov/ed/collegescorecard/v1/schools.json';
const apiKey = 'YOUR_API_KEY'; // Replace with your College Scorecard API key

async function fetchCollegeData(collegeName) {
    const response = await fetch(`${apiUrl}?school.name=${encodeURIComponent(collegeName)}&api_key=${apiKey}`);
    const data = await response.json();
    return data.results;
}
