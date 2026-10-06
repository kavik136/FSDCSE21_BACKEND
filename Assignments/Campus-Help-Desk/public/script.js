const form = document.getElementById("requestForm");

const requestList = document.getElementById("requestList");

const requestId = document.getElementById("requestId");

const studentName = document.getElementById("studentName");

const email = document.getElementById("email");

const category = document.getElementById("category");

const description = document.getElementById("description");

const priority = document.getElementById("priority");

const submitButton = document.getElementById("submitButton");


// Load all requests when page opens
function loadRequests() {

    fetch("/api/requests")

        .then(response => response.json())

        .then(data => {

            requestList.innerHTML = "";

            if (data.length === 0) {

                requestList.innerHTML =
                    '<div class="no-requests">No requests submitted yet.</div>';

                return;
            }

            data.forEach(request => {

                const card = document.createElement("div");

                card.className = "request-card";

                card.innerHTML = `

                    <h3>
                        Request #${request.id}
                    </h3>

                    <p>
                        <strong>Student:</strong>
                        ${request.studentName}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${request.email}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${request.category}
                    </p>

                    <p>
                        <strong>Description:</strong>
                        ${request.description}
                    </p>

                    <p>
                        <strong>Priority:</strong>
                        ${request.priority}
                    </p>

                    <button
                        class="edit-btn"
                        onclick="editRequest(${request.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteRequest(${request.id})"
                    >
                        Delete
                    </button>
                `;

                requestList.appendChild(card);
            });

        })

        .catch(error => {
            console.log("Error:", error);
        });
}


// Submit new request or update existing request
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const requestData = {

        studentName: studentName.value,

        email: email.value,

        category: category.value,

        description: description.value,

        priority: priority.value
    };


    // If requestId is empty, create a new request
    if (requestId.value === "") {

        fetch("/api/requests", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(requestData)

        })

        .then(response => response.json())

        .then(data => {

            alert("Request submitted successfully");

            form.reset();

            loadRequests();
        });

    }

    // Otherwise update existing request
    else {

        fetch("/api/requests/" + requestId.value, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(requestData)

        })

        .then(response => response.json())

        .then(data => {

            alert("Request updated successfully");

            form.reset();

            requestId.value = "";

            submitButton.innerText = "Submit Request";

            loadRequests();
        });
    }

});


// Edit request
function editRequest(id) {

    fetch("/api/requests/" + id)

        .then(response => response.json())

        .then(request => {

            requestId.value = request.id;

            studentName.value = request.studentName;

            email.value = request.email;

            category.value = request.category;

            description.value = request.description;

            priority.value = request.priority;

            submitButton.innerText = "Update Request";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

}


// Delete request
function deleteRequest(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this request?");

    if (confirmDelete) {

        fetch("/api/requests/" + id, {

            method: "DELETE"

        })

        .then(response => response.json())

        .then(data => {

            alert("Request deleted successfully");

            loadRequests();
        });
    }
}


// Load requests when page opens
loadRequests();