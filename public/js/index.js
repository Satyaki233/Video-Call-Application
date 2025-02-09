const usernameInput = document.getElementById('username');
const createBtn = document.getElementById('createBtn');
const joinBtn = document.getElementById('joinBtn');
const modal = document.getElementById('roomLinkModal');
const roomIdInput = document.getElementById('roomId');

usernameInput.addEventListener('input', function() {
    const isEmpty = !this.value.trim();
    createBtn.disabled = isEmpty;
    joinBtn.disabled = isEmpty;
});

function handleCreate(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert('Please enter your name first!');
        return;
    }

    const button = event.target;
    button.classList.add('active');

    setTimeout(() => {
        const roomId = uuid.v4();
        window.location.href = `/room/${encodeURIComponent(roomId)}/?username=${encodeURIComponent(username)}`;
    }, 150);
}

function handleJoin(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert('Please enter your name first!');
        return;
    }

    const button = event.target;
    button.classList.add('active');

    setTimeout(() => {
        modal.style.display = 'block';
        button.classList.remove('active');
    }, 150);
}

function closeModal() {
    modal.style.display = 'none';
    roomIdInput.value = '';
}

function joinRoom(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const roomId = roomIdInput.value.trim();
    
    if (!roomId) {
        alert('Please enter a room ID!');
        return;
    }

    const button = event.target;
    button.classList.add('active');

    setTimeout(() => {
        window.location.href = `/room/${encodeURIComponent(roomId)}/?username=${encodeURIComponent(username)}`;
    }, 150);
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Optional: Remove active state if navigation is prevented
window.addEventListener('beforeunload', () => {
    createBtn.classList.remove('active');
    joinBtn.classList.remove('active');
});