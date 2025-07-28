const userTableBody = document.getElementById('userTableBody');
const createUserButton = document.getElementById('createUserButton');
const userFormModal = document.getElementById('userFormModal');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
const totalPages = 20; // Example total pages; adjust based on API meta.pagination

// Fetch Users from API
function fetchUsers(page = 1) {
    fetch(`https://gorest.co.in/public-api/users?page=${page}`)
        .then(response => response.json())
        .then(data => {
            displayUsers(data.data);
            generatePaginationControls(data.meta.pagination.pages);
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Display Users in Table
function displayUsers(users) {
    userTableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.status}</td>
            <td>
                <button class="viewUserButton" data-id="${user.id}">View</button>
                <button class="editUserButton" data-id="${user.id}">Edit</button>
                <button class="deleteUserButton" data-id="${user.id}">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Pagination Controls
function generatePaginationControls(totalPagesCount) {
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.className = 'pagination-button';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => { currentPage--; fetchUsers(currentPage); };
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPagesCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'pagination-button' + (i === currentPage ? ' active' : '');
        pageButton.onclick = () => { currentPage = i; fetchUsers(currentPage); };
        paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.className = 'pagination-button';
    nextButton.disabled = currentPage === totalPagesCount;
    nextButton.onclick = () => { currentPage++; fetchUsers(currentPage); };
    paginationContainer.appendChild(nextButton);
}

// Placeholder for showing User Form Modal (Future Implementation)
createUserButton.addEventListener('click', () => {
    userFormModal.style.display = 'block';
});

// Event Delegation for View, Edit, Delete Buttons
userTableBody.addEventListener('click', (event) => {
    const userId = event.target.getAttribute('data-id');
    if (event.target.classList.contains('viewUserButton')) {
        alert(`View user details for ID: ${userId}`);
    } else if (event.target.classList.contains('editUserButton')) {
        alert(`Edit user details for ID: ${userId}`);
    } else if (event.target.classList.contains('deleteUserButton')) {
        alert(`Delete user with ID: ${userId}`);
    }
});

// Initial Fetch on Page Load
fetchUsers();
