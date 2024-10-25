const postList = document.getElementById("postList");

// Funktion som hämtar inlägg och kommentarer
async function fetchPosts() {
    try {
        // Hämta inlägg och kommentarer
        const [postsResponse, commentsResponse] = await Promise.all([
            fetch("http://localhost:3000/posts"),
            fetch("http://localhost:3000/comments")
        ]);
        const posts = await postsResponse.json();
        const comments = await commentsResponse.json();

        // Rensa listan innan vi lägger till nya inlägg
        postList.innerHTML = '';

        // Iterera genom varje inlägg
        posts.forEach(post => {
            const postItem = document.createElement("li");
            postItem.textContent = `${post.title} - ${post.author}`;

            // Skapa en lista för kommentarer
            const commentList = document.createElement("ul");

            // Filtrera kommentarer för att endast visa de som hör till inlägget
            const postComments = comments.filter(comment => comment.postId === post.id);

            postComments.forEach(comment => {
                const commentItem = document.createElement("li");
                commentItem.textContent = `${comment.body} - ${comment.author}`;
                commentList.appendChild(commentItem);
            });

            // Lägg till kommentarer under inlägget
            postItem.appendChild(commentList);
            postList.appendChild(postItem);
        });
    } catch (error) {
        console.error("Kunde inte hämta inlägg eller kommentarer:", error);
    }
}

// Kör funktionen när sidan laddas
document.addEventListener("DOMContentLoaded", fetchPosts);
