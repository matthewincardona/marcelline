const myList = document.querySelector('#users');
const myRequest = new Request('https://d1-marcelline.matthewincardona.workers.dev/api/users');

function fetchUsers() {
    fetch(myRequest)
        .then((response) => response.json())
        .then((data) => {
            myList.innerHTML = ''; // Clear the existing list
            for (const user of data) {
                const listItem = document.createElement('li');

                const userNameStrong = document.createElement('strong');
                userNameStrong.textContent = user.UserName;
                listItem.appendChild(userNameStrong);

                const userCounterStrong = document.createElement('strong');
                userCounterStrong.textContent = ` Applications: ${user.UserCounter}`;
                listItem.appendChild(userCounterStrong);

                const incrementButton = document.createElement('button');
                incrementButton.textContent = 'Increment Counter';
                incrementButton.addEventListener('click', () => updateUserCounter(user.UserId, 'increment'));
                listItem.appendChild(incrementButton);

                const decrementButton = document.createElement('button');
                decrementButton.textContent = 'Decrement Counter';
                decrementButton.addEventListener('click', () => updateUserCounter(user.UserId, 'decrement'));
                listItem.appendChild(decrementButton);

                const clearButton = document.createElement('button');
                clearButton.textContent = 'Clear Counter';
                clearButton.addEventListener('click', () => updateUserCounter(user.UserId, 'clear'));
                listItem.appendChild(clearButton);

                myList.appendChild(listItem);
            }
        })
        .catch(console.error);
}

function updateUserCounter(userId, action) {
    fetch('https://d1-marcelline.matthewincardona.workers.dev/api/update-counter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, action })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetchUsers(); // Refresh the user list to show the updated counter
        })
        .catch(console.error);
}

// Call the function to fetch and display users when the page loads
window.onload = fetchUsers;