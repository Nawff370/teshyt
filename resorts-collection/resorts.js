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
            <div style="background-image: url(${resort.image});" class="resort-details">
                <h3>${resort.name}</h3>
                <div class="resort-info">
                    <p><strong>Atoll:</strong> ${resort.atoll}</p>
                    <p><strong>Category:</strong> ${resort.category} Star Resort</p>
                    <p><strong>Transport:</strong> ${transportText}</p>
                    <p><strong>Interests:</strong> ${resort.interests.map(int => int.charAt(0).toUpperCase() + int.slice(1)).join(', ')}</p>
                </div>
            </div>
        `;

        resultsContainer.appendChild(resortCard);

        resortCard.addEventListener('click', () => {
         const resortSlug = resort.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
         location.href = `resort.php?slug=${resortSlug}`;
        });

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

fetch('http://skylinebackend.local/get_resorts.php') // Change this to your actual PHP API endpoint
  .then(response => response.json())
  .then(data => {
    const atollSelect = document.getElementById('atoll');
    const atollSet = new Set();

    data.forEach(resort => {
      if (resort.atoll) {
        atollSet.add(resort.atoll);
      }
    });

    // Convert to sorted array
    const sortedAtolls = [...atollSet].sort();

    sortedAtolls.forEach(atoll => {
      const option = document.createElement('option');
      option.value = atoll.toLowerCase();
      option.textContent = atoll;
      atollSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error loading data:', error));



