const myList = document.querySelector('#users');
const myRequest = new Request('https://d1-marcelline.matthewincardona.workers.dev/api/users');

function fetchUsers() {
    fetch(myRequest)
        .then((response) => response.json())
        .then((data) => {
            myList.innerHTML = ''; // Clear the existing list
            for (const user of data) {
                const listItem = document.createElement('div');
                listItem.classList.add('user-list__inner');

                // user-list__inner
                const userNameStrong = document.createElement('h3');
                userNameStrong.textContent = user.UserName;
                listItem.appendChild(userNameStrong);

                const userCounterStrong = document.createElement('strong');
                userCounterStrong.textContent = `Applications: ${user.UserCounter}`;
                listItem.appendChild(userCounterStrong);

                const clearButton = document.createElement('button');
                clearButton.textContent = 'Clear';
                clearButton.addEventListener('click', () => updateUserCounter(user.UserId, 'clear'));
                listItem.appendChild(clearButton);

                // user-list__inner__controls
                const listItemControls = document.createElement('div');
                listItemControls.classList.add('user-list__inner__controls');

                const incrementButton = document.createElement('button');
                incrementButton.textContent = '+';
                incrementButton.addEventListener('click', () => updateUserCounter(user.UserId, 'increment'));
                listItemControls.appendChild(incrementButton);

                const decrementButton = document.createElement('button');
                decrementButton.textContent = '-';
                decrementButton.addEventListener('click', () => updateUserCounter(user.UserId, 'decrement'));
                listItemControls.appendChild(decrementButton);

                listItem.appendChild(listItemControls);
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
