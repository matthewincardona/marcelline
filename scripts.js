const myList = document.querySelector('ul');
const myRequest = new Request('https://d1-marcelline.matthewincardona.workers.dev/api/users');

fetch(myRequest)
    .then((response) => response.json())
    .then((data) => {
        for (const user of data) {
            const listItem = document.createElement('li');

            const userNameStrong = document.createElement('strong');
            userNameStrong.textContent = user.UserName;
            listItem.appendChild(userNameStrong);

            const userCounterStrong = document.createElement('strong');
            userCounterStrong.textContent = ` Applications: ${user.UserCounter}`;
            listItem.appendChild(userCounterStrong);

            myList.appendChild(listItem);
        }
    })
    .catch(console.error);