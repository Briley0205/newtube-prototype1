const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, newCommentId) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    newComment.dataset.id = newCommentId;
    const newCommentText = document.createElement("span");
    const newCommentDelete = document.createElement("span");
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
