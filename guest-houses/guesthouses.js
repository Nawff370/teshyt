const guesthouses = [
  {
    name: "Hevana Guesthouse",
    island: "Keyodhoo",
    default_price: 300,
    rating: 4.8,
    pricing_table: "",
    image: "https://photos.maldivesholidayoffers.com/hotel_rooms/f4e9a75ccf211efe8f0cebecda1ebea0-org.jpg"
  },
  {
    name: "Ocean Breeze Stay",
    island: "Maafushi",
    default_price: 85,
    rating: 4.3,
    pricing_table: "",
    image: "https://photos.maldivesholidayoffers.com/hotel_rooms/f4e9a75ccf211efe8f0cebecda1ebea0-org.jpg"
  },
  {
    name: "Palm Tree Inn",
    island: "Thoddoo",
    default_price: 40,
    rating: 4.1,
    pricing_table: "",
    image: "https://photos.maldivesholidayoffers.com/hotel_rooms/f4e9a75ccf211efe8f0cebecda1ebea0-org.jpg"
  },
  {
    name: "Blue Sky Retreat",
    island: "Ukulhas",
    default_price: 70,
    rating: 4.5,
    pricing_table: "",
    image: "https://photos.maldivesholidayoffers.com/hotel_rooms/f4e9a75ccf211efe8f0cebecda1ebea0-org.jpg"
  },
  {
    name: "Sunset Bay Lodge",
    island: "Dhigurah",
    default_price: 250,
    rating: 5.6,
    pricing_table: "",
    image: "https://photos.maldivesholidayoffers.com/hotel_rooms/f4e9a75ccf211efe8f0cebecda1ebea0-org.jpg"
  }
];


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

      card.innerHTML = `
        <img src="${gh.image}" alt="${gh.name}" class="guesthouse-img">
        <div class="guesthouse-info">
          <h3>${gh.name}</h3>
          <p><strong>Island:</strong> ${gh.island}</p>
          <p><strong>Price:</strong> $${gh.default_price}/night</p>
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


window.onload = () => displayGuesthouses();
