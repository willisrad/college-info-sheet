document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key if required
    const apiUrl = 'https://api.example.com/colleges'; // Placeholder API URL

    const addCollegeButton = document.getElementById('add-column');
    const sheetContainer = document.querySelector('.sheet-container');

    // Function to fetch college data
    async function fetchCollegeData(collegeName) {
        const response = await fetch(`${apiUrl}?name=${collegeName}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        return data;
    }

    // Function to update college info in the UI
    function updateCollegeInfo(collegeElement, data) {
        collegeElement.querySelector('.college-name').textContent = data.name || 'College Name';
        collegeElement.querySelector('.acceptance-rate').textContent = data.acceptance_rate || 'N/A';
        collegeElement.querySelector('.average-tuition').textContent = `$${data.average_tuition}` || 'N/A';
        collegeElement.querySelector('.instate-tuition').textContent = `$${data.instate_tuition}` || 'N/A';
        collegeElement.querySelector('.average-gpa').textContent = data.average_gpa || 'N/A';
        collegeElement.querySelector('.average-sat').textContent = data.average_sat || 'N/A';
        collegeElement.querySelector('.average-act').textContent = data.average_act || 'N/A';
        collegeElement.querySelector('.climate').textContent = data.climate || 'N/A';
    }

    // Event listener for input field
    sheetContainer.addEventListener('input', async (event) => {
        if (event.target.classList.contains('college-input')) {
            const collegeName = event.target.value.trim();
            if (collegeName.length > 2) { // Minimal length to trigger search
                try {
                    const data = await fetchCollegeData(collegeName);
                    if (data && data.length > 0) {
                        updateCollegeInfo(event.target.closest('.college-sheet'), data[0]);
                    }
                } catch (error) {
                    console.error('Error fetching college data:', error);
                }
            }
        }
    });

    // Event listener for adding new college column
    addCollegeButton.addEventListener('click', () => {
        const newCollegeSheet = document.createElement('div');
        newCollegeSheet.className = 'college-sheet';
        newCollegeSheet.innerHTML = `
            <input type="text" class="college-input" placeholder="Enter College Name" />
            <div class="college-info">
                <div class="college-name">College Name</div>
                <div class="info-row">
                    <span>Acceptance Rate:</span>
                    <span class="acceptance-rate">N/A</span>
                </div>
                <div class="info-row">
                    <span>Average Tuition:</span>
                    <span class="average-tuition">N/A</span>
                </div>
                <div class="info-row">
                    <span>In-state Tuition:</span>
                    <span class="instate-tuition">N/A</span>
                </div>
                <div class="info-row">
                    <span>Average GPA:</span>
                    <span class="average-gpa">N/A</span>
                </div>
                <div class="info-row">
                    <span>Average SAT Score:</span>
                    <span class="average-sat">N/A</span>
                </div>
                <div class="info-row">
                    <span>Average ACT Score:</span>
                    <span class="average-act">N/A</span>
                </div>
                <div class="info-row">
                    <span>Climate:</span>
                    <span class="climate">N/A</span>
                </div>
            </div>
        `;
        sheetContainer.appendChild(newCollegeSheet);
    });
});
