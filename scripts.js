const myList = document.querySelector('ul');
const myRequest = new Request('https://d1-marcelline.matthewincardona.workers.dev/api/users');

fetch(myRequest)
    .then((response) => response.json())
    .then((data) => {
        for (const user of data) {
            const listItem = document.createElement('li');

            listItem.appendChild(document.createElement('strong')).textContent = user.UserName;

            listItem.append(document.createElement('strong')).textContent = `Applications: ${user.UserCounter}`;
        }
    })
    .catch(console.error)