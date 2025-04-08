document.addEventListener('DOMContentLoaded', function() {
    loadColleges();
    loadEvents();

    // Event listener for View Details buttons
    document.querySelectorAll('.btn-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.closest('.event-card').dataset.eventId;
            fetch(`php/get_event_details.php?id=${eventId}`)
                .then(response => response.json())
                .then(event => {
                    document.querySelector('.popup-title').textContent = event.name;
                    document.querySelector('.popup-description p').textContent = event.description;
                    document.querySelector('.popup-image img').src = event.image || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500';
                    document.querySelector('.event-date span').textContent = event.date;
                    document.querySelector('.event-time span').textContent = event.time;
                    document.querySelector('.event-price span').textContent = `${event.price}₹/-`;
                    document.querySelector('.event-venue span').textContent = event.venue;
                    
                    // Update coordinators
                    const coordList = document.querySelector('.event-coordinators ul');
                    coordList.innerHTML = '';
                    event.coordinators.split(',').forEach(coord => {
                        const li = document.createElement('li');
                        li.textContent = coord.trim();
                        coordList.appendChild(li);
                    });
                    
                    document.getElementById('eventPopup').style.display = 'block';
                });
        });
    });

    // Close popup when clicking X
    document.querySelector('.close-popup').addEventListener('click', function() {
        document.getElementById('eventPopup').style.display = 'none';
    });

    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        const popup = document.getElementById('eventPopup');
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

// Keep all your existing functions
function loadColleges() {
    // ... existing loadColleges code ...
}

function loadEvents(collegeId = '') {
    // ... existing loadEvents code ...
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    // Truncate description to 2 lines (approximately 100 characters)
    const truncatedDesc = event.short_description.length > 100 ? 
        event.short_description.substring(0, 100) + '...' : 
        event.short_description;

    card.innerHTML = `
        <img src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500" alt="${event.name}">
        <div class="event-details">
            <h3>${event.name}</h3>
            <p>${truncatedDesc}</p>
            <div class="event-info">
                <div class="info-group">
                    <span>Time:</span>
                    <span>${event.time}</span>
                </div>
                <div class="info-group">
                    <span>Place:</span>
                    <span>${event.venue}</span>
                </div>
                <div class="info-group">
                    <span>Date:</span>
                    <span>${event.date}</span>
                </div>
                <div class="info-group">
                    <span>Price:</span>
                    <span>${event.price}₹/-</span>
                </div>
            </div>
            <div class="button-group">
                <button class="btn-view" onclick="showEventDetails(${event.id})">View Details</button>
                <button class="btn-register" onclick="window.location.href='register.html?event=${event.id}'">Register</button>
            </div>
        </div>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch event data
    fetch('php/get_events.php')
        .then(response => response.json())
        .then(event => {
            const eventsGrid = document.querySelector('.events-grid');
            eventsGrid.appendChild(createEventCard(event));
        })
        .catch(error => console.error('Error:', error));
});

function showEventDetails(eventId) {
    // Fetch event data
    fetch(`php/get_event_details.php?id=${eventId}`)
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success') {
                displayEventPopup(data.data);
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayEventPopup(event) {
    // Update popup content with event details
    document.querySelector('.popup-title').textContent = event.name;
    document.querySelector('.popup-description p').textContent = event.description;
    document.getElementById('popupDate').textContent = event.date;
    document.getElementById('popupVenue').textContent = event.venue;
    document.getElementById('popupPrice').textContent = event.price + '₹/-';

    // Update coordinators list
    const coordinatorsList = document.getElementById('coordinatorsList');
    coordinatorsList.innerHTML = '';
    event.coordinators.forEach(coordinator => {
        const li = document.createElement('li');
        li.textContent = coordinator.trim();
        coordinatorsList.appendChild(li);
    });

    // Show popup
    document.getElementById('eventPopup').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closePopup() {
    document.getElementById('eventPopup').style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}