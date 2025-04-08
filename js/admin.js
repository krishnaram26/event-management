function showAddEventModal() {
    document.getElementById('addEventModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addEventModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addEventModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking X
document.querySelector('.close').onclick = function() {
    document.getElementById('addEventModal').style.display = 'none';
}