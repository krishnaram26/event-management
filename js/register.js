document.addEventListener('DOMContentLoaded', function() {
    // Instead of getting event from URL, we'll add a dropdown to select events
    const form = document.getElementById('registrationForm');
    
    // Create event selection dropdown
    const eventSelectDiv = document.createElement('div');
    eventSelectDiv.className = 'form-group';
    eventSelectDiv.innerHTML = `
        <label for="event_id">Select Event:</label>
        <select id="event_id" name="event_id" required>
            <option value="">-- Select an event --</option>
        </select>
    `;
    
    // Insert the event selection as the first form element
    form.insertBefore(eventSelectDiv, form.firstChild);
    
    // Load available events
    loadEvents();

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch('php/register.php', {
            method: 'POST',
            body: new FormData(this)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                window.location.href = 'index.html';
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => {
            alert('Error submitting registration');
            console.error('Error:', error);
        });
    });

    // Function to load events for the dropdown
    function loadEvents() {
        fetch('php/get_events.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const eventSelect = document.getElementById('event_id');
                    data.events.forEach(event => {
                        const option = document.createElement('option');
                        option.value = event.id;
                        option.textContent = event.name;
                        eventSelect.appendChild(option);
                    });
                    
                    // Update event name when selection changes
                    eventSelect.addEventListener('change', function() {
                        if (this.value) {
                            fetch(`php/get_event_details.php?id=${this.value}`)
                                .then(response => response.json())
                                .then(event => {
                                    if (event.status === 'success') {
                                        document.getElementById('eventName').textContent = event.data.name;
                                    }
                                });
                        } else {
                            document.getElementById('eventName').textContent = 'Please select an event';
                        }
                    });
                    
                    // Set default text
                    document.getElementById('eventName').textContent = 'Please select an event';
                } else {
                    console.error('Failed to load events');
                }
            })
            .catch(error => {
                console.error('Error loading events:', error);
            });
    }
});

// Add this to your existing JavaScript
document.getElementById('phone').addEventListener('input', function(e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});