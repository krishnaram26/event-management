document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');

    // Add hidden input for event_id
    const form = document.getElementById('registrationForm');
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'event_id';
    hiddenInput.value = eventId;
    form.appendChild(hiddenInput);

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
});

// Update event name if available
if (eventId) {
    fetch(`php/get_event_details.php?id=${eventId}`)
        .then(response => response.json())
        .then(event => {
            document.getElementById('eventName').textContent = `${event.name} of ${event.college}`;
        });
}

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.append('event_id', eventId);

    fetch('php/register.php', {
        method: 'POST',
        body: formData
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

// Add this to your existing JavaScript
document.getElementById('phone').addEventListener('input', function(e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});