const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtns = document.querySelectorAll(".deleteBtn");

const handleDeleteComment = async (event) => {
    const li = event.srcElement.parentNode;
    const {
        dataset: {
            id: commentId
        },
    } = li;
    li.remove();
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const addComment = (text, newCommentId) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    newComment.dataset.id = newCommentId;
    const newCommentText = document.createElement("span");
    const newCommentDelete = document.createElement("span");
    newCommentDelete.className = "deleteBtn";
    newCommentText.innerText = `${text}`;
    newCommentDelete.innerText = "💥";
    newComment.appendChild(newCommentText);
    newComment.appendChild(newCommentDelete);
    videoComments.prepend(newComment);
}

const handleSubmit = async(event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text,
        }),
    });
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
}
if (form) {
    form.addEventListener("submit", handleSubmit);
}
if (deleteCommentBtns) {
    deleteCommentBtns.forEach((deleteCommentBtn) =>
        deleteCommentBtn.addEventListener("click", handleDeleteComment)
    );
} 