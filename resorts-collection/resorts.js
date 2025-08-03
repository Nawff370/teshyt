// Function to display resorts
function displayResorts(filteredResorts) {
    const resultsContainer = document.getElementById('resort-results');
    resultsContainer.innerHTML = '';

    if (!filteredResorts || filteredResorts.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No resorts match your filters. Please try different criteria.</p>';
        return;
    }

    filteredResorts.forEach(resort => {
        const resortCard = document.createElement('div');
        resortCard.className = 'resort-card';

        let transportText = resort.transport === 'both' ? 'Speedboat & Seaplane' : 
                            resort.transport === 'speedboat' ? 'Speedboat' : 
                            'Seaplane';

        resortCard.innerHTML = `
            <div class="resort-image">
                <img src="${resort.image}" alt="${resort.name}">
            </div>
            <div class="resort-details">
                <h3>${resort.name}</h3>
                <div class="resort-info">
                    <p><strong>Atoll:</strong> ${resort.atoll}</p>
                    <p><strong>Category:</strong> ${resort.category} Star Resort</p>
                    <p><strong>Transport:</strong> ${transportText}</p>
                    <p><strong>Interests:</strong> ${resort.interests.map(int => int.charAt(0).toUpperCase() + int.slice(1)).join(', ')}</p>
                </div>
                <button id="view resort" onclick="viewResort()" class="view-resort" data-name="${resort.name}">View Resort</button>
            </div>
        `;

        resultsContainer.appendChild(resortCard);
    });
}

// Function to filter resorts
function filterResorts() {
    const categoryFilter = document.getElementById('resort-category').value;
    const transportFilter = document.getElementById('transport').value;
    const atollFilter = document.getElementById('atoll').value.toLowerCase();
    const interestFilter = document.getElementById('travel-interest').value;

    const filtered = window.resorts.filter(resort => {
        const resortAtoll = resort.atoll.toLowerCase();
        const transportMatch = transportFilter === 'all' ||
            resort.transport === transportFilter ||
            (transportFilter !== 'all' && resort.transport === 'both');

        return (categoryFilter === 'all' || resort.category === categoryFilter) &&
               transportMatch &&
               (atollFilter === 'all' || resortAtoll.includes(atollFilter)) &&
               (interestFilter === 'all' || resort.interests.includes(interestFilter));
    });

    displayResorts(filtered);
}

// Load resorts when page is ready
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://skylinebackend.local/get_resorts.php") // your PHP backend URL
        .then(response => response.json())
        .then(data => {
            window.resorts = data; // store globally
            displayResorts(data);

            document.getElementById('apply-filters').addEventListener('click', filterResorts);

            const filterSelects = document.querySelectorAll('.filter-group select');
            filterSelects.forEach(select => {
                select.addEventListener('change', filterResorts);
            });
        })
        .catch(err => {
            console.error("Error loading resorts:", err);
        });
});


function viewResort() {
    
}
