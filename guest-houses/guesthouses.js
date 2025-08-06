let guesthouses = []; // to hold backend data

function getRoundedStar(rating) {
  if (rating > 5) return '5plus';
  const floored = Math.floor(rating);
  if (floored < 4) return 'below4';
  if (floored === 4) return '4';
  return '5';
}

function displayGuesthouses(filter = 'all') {
  const container = document.getElementById("guesthouseContainer");
  container.innerHTML = "";

  guesthouses.forEach(gh => {
    const roundedCategory = getRoundedStar(gh.rating);

    if (filter === 'all' || filter === roundedCategory) {
      const card = document.createElement("div");
      card.className = "guesthouse-card";

      // Format pricing nicely if exists
      let pricingHTML = "";
      if (gh.pricing && typeof gh.pricing === "object") {
        pricingHTML = "<ul>";
        for (const key in gh.pricing) {
          pricingHTML += `<li><strong>${key}:</strong> ${gh.pricing[key]}</li>`;
        }
        pricingHTML += "</ul>";
      }

      card.innerHTML = `
        <img src="${gh.image}" alt="${gh.name}" class="guesthouse-img">
        <div class="guesthouse-info">
          <h3>${gh.name}</h3>
          <p><strong>Island:</strong> ${gh.island}</p>
          <p><strong>Rating:</strong> ⭐ ${gh.rating}</p>
        </div>
      `;

      container.appendChild(card);
    }
  });
}

function filterGuesthouses(ratingCategory) {
  displayGuesthouses(ratingCategory);
}

async function loadGuesthouses() {
  try {
    const response = await fetch('http://skylinebackend.local/get_guesthouses.php'); // Change to your actual URL
    if (!response.ok) throw new Error('Failed to fetch guesthouses');

    const data = await response.json();

    // Backend sends maxAandC but your frontend uses maxAdultsAndChildren
    guesthouses = data.map(gh => ({
      ...gh,
      maxAdultsAndChildren: gh.maxAdultsAndChildren || gh.maxAandC || gh.maxAdultsAndChildren, // fallback
      rating: parseFloat(gh.rating) || 0,
      maxinfants: gh.maxinfants || 0,
      maxpets: gh.maxpets || 0,
      pricing: gh.pricing || {}
    }));

    displayGuesthouses();
  } catch (error) {
    console.error('Error loading guesthouses:', error);
  }
}

window.onload = () => {
  loadGuesthouses();

  // attach filter onchange listener (in case your HTML dynamically added)
  const filterSelect = document.getElementById('ratingFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', e => filterGuesthouses(e.target.value));
  }
};
