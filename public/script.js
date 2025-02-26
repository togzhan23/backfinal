const API_URL = "http://localhost:3000/tasks";
const USER_API_URL = "http://localhost:3000/users/profile";
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

function showMessage(message, isError = true) {
    const msgElement = document.getElementById("message");
    msgElement.innerText = message;
    msgElement.className = isError ? "error-message" : "success-message";
}

async function fetchUserProfile() {
    const response = await fetch(USER_API_URL, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    const user = await response.json();
    document.getElementById("username").innerText = user.username;
    document.getElementById("email").innerText = user.email;
}

async function fetchTasks() {
    const response = await fetch(API_URL, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.setAttribute("id", `task-${task._id}`);
        li.innerHTML = `
            <span id="title-${task._id}">${task.title}</span>
            <span id="desc-${task._id}">${task.description}</span>
            <button class="edit-btn" onclick="editTask('${task._id}')">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

async function createTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();

    if (!title || !description) {
        alert("Please enter both title and description.");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
        alert("Error creating task.");
        return;
    }

    // Очищаем поля ввода после успешного добавления
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";

    fetchTasks(); // Перезагружаем список задач
}

async function editTask(taskId) {
    const newTitle = prompt("Enter new task title:");
    const newDescription = prompt("Enter new task description:");

    if (!newTitle || !newDescription) {
        alert("Title and description cannot be empty!");
        return;
    }

    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle, description: newDescription })
    });

    if (!response.ok) {
        alert("Error updating task.");
        return;
    }

    fetchTasks(); // Обновляем список задач
}

async function deleteTask(taskId) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert("Error deleting task.");
        return;
    }

    fetchTasks(); // Обновляем список задач
}


function openPopup() {
    document.getElementById("profilePopup").style.display = "block";
}

function closePopup() {
    document.getElementById("profilePopup").style.display = "none";
}

async function updateProfile() {
    const newUsername = document.getElementById("newUsername").value.trim();
    if (!newUsername) {
        alert("Username cannot be empty!");
        return;
    }

    const response = await fetch(USER_API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ username: newUsername })
    });

    if (!response.ok) {
        alert("Error updating profile.");
        return;
    }

    fetchUserProfile();
    closePopup();
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();
    fetchUserProfile();

    document.getElementById("openProfilePopup").addEventListener("click", openPopup);
});
