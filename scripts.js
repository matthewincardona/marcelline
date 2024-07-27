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
                const underlineSpan = document.createElement('span');
                underlineSpan.classList.add('underline-number');
                underlineSpan.textContent = user.UserCounter;
                userCounterStrong.textContent = `Applications: `;
                userCounterStrong.appendChild(underlineSpan);
                listItem.appendChild(userCounterStrong);

                // user-list__inner__actions
                const listItemActions = document.createElement('div');
                listItemActions.classList.add('user-list__inner__actions');

                const clearButton = document.createElement('button');
                clearButton.textContent = 'Clear';
                clearButton.addEventListener('click', () => updateUserCounter(user.UserId, 'clear'));
                listItemActions.appendChild(clearButton);

                // user-list__inner__buttons
                const listItemButtons = document.createElement('div');
                listItemButtons.classList.add('user-list__inner__buttons');

                const incrementButton = document.createElement('button');
                incrementButton.textContent = '+';
                incrementButton.addEventListener('click', () => updateUserCounter(user.UserId, 'increment'));
                listItemButtons.appendChild(incrementButton);

                const decrementButton = document.createElement('button');
                decrementButton.textContent = '-';
                decrementButton.addEventListener('click', () => updateUserCounter(user.UserId, 'decrement'));
                listItemButtons.appendChild(decrementButton);

                listItemActions.appendChild(listItemButtons);
                listItem.appendChild(listItemActions);
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

    if (action == 'increment') // Launch fireworks when the counter is incremented
        launchFireworks();
}

// Call the function to fetch and display users when the page loads
window.onload = fetchUsers;
