// Resort data
const resorts = [
    {
        name: "The Ritz-Carlton Maldives, Fari Islands",
        atoll: "North Male Atoll",
        category: "5+",
        transport: "both",
        interests: ["honeymoon", "spa"],
        image: "ritz-carlton.jpg"
    },
    {
        name: "Milaidhoo Island Maldives",
        atoll: "Baa Atoll",
        category: "5",
        transport: "seaplane",
        interests: ["diving", "honeymoon"],
        image: "milaidhoo.jpg"
    },
    {
        name: "Conrad Maldives Rangali Island",
        atoll: "South Male Atoll",
        category: "5",
        transport: "seaplane",
        interests: ["family", "spa"],
        image: "conrad.jpg"
    },
    {
        name: "Four Seasons Resort Maldives at Landaa Giraavaru",
        atoll: "Baa Atoll",
        category: "5+",
        transport: "seaplane",
        interests: ["diving", "spa"],
        image: "four-seasons.jpg"
    },
    {
        name: "Kuredu Island Resort & Spa",
        atoll: "Lhaviyani Atoll",
        category: "4",
        transport: "speedboat",
        interests: ["family", "diving"],
        image: "kuredu.jpg"
    },
    {
        name: "Baros Maldives",
        atoll: "North Male Atoll",
        category: "5",
        transport: "speedboat",
        interests: ["honeymoon", "spa"],
        image: "baros.jpg"
    }
];

// Function to display resorts
function displayResorts(filteredResorts = resorts) {
    const resultsContainer = document.getElementById('resort-results');
    resultsContainer.innerHTML = '';
    
    if (filteredResorts.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No resorts match your filters. Please try different criteria.</p>';
        return;
    }
    
    filteredResorts.forEach(resort => {
        const resortCard = document.createElement('div');
        resortCard.className = 'resort-card';
        
        // Format transport display text
        let transportText = resort.transport === 'both' ? 'Speedboat & Seaplane' : 
                          resort.transport === 'speedboat' ? 'Speedboat' : 
                          'Seaplane';
        
        resortCard.innerHTML = `
            <div class="resort-image">
                <img src="../imgs/resorts/${resort.image}" alt="${resort.name}">
            </div>
            <div class="resort-details">
                <h3>${resort.name}</h3>
                <div class="resort-info">
                    <p><strong>Atoll:</strong> ${resort.atoll}</p>
                    <p><strong>Category:</strong> ${resort.category} Star Resort</p>
                    <p><strong>Transport:</strong> ${transportText}</p>
                    <p><strong>Interests:</strong> ${resort.interests.map(int => int.charAt(0).toUpperCase() + int.slice(1)).join(', ')}</p>
                </div>
                <button class="view-resort">View Resort</button>
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
    
    const filtered = resorts.filter(resort => {
        const resortAtoll = resort.atoll.toLowerCase();
        
        // Check transport filter - include 'both' when either speedboat or seaplane is selected
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

// Initialize and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Display all resorts initially
    displayResorts();
    
    // Set up filter button click event
    document.getElementById('apply-filters').addEventListener('click', filterResorts);
    
    // Optional: Add event listeners for instant filtering when select values change
    const filterSelects = document.querySelectorAll('.filter-group select');
    filterSelects.forEach(select => {
        select.addEventListener('change', filterResorts);
    });
});