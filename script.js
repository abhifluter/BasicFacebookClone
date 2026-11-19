// Sample user data
let currentUser = {
    name: 'John Doe',
    profilePic: 'https://picsum.photos/200/300'
};

// Sample posts data
let posts = [
    {
        id: 1,
        user: {
            name: 'Jane Smith',
            profilePic: 'https://picsum.photos/200/300'
        },
        content: 'Hello, Facebook!',
        likes: 0,
        comments: []
    }
];

// DOM Elements
const postText = document.getElementById('post-text');
const postBtn = document.querySelector('.post-btn');
const postsFeed = document.getElementById('posts-feed');
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');

// Login/Logout functionality
loginBtn.addEventListener('click', () => {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
});

logoutBtn.addEventListener('click', () => {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
});

// Create new post
function createPost(content) {
    const post = {
        id: posts.length + 1,
        user: currentUser,
        content: content,
        likes: 0,
        comments: []
    };
    posts.unshift(post);
    renderPosts();
}

// Render posts
function renderPosts() {
    postsFeed.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.user.profilePic}" alt="Profile" class="profile-pic">
                <div>
                    <h4>${post.user.name}</h4>
                    <small>Just now</small>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
            <div class="post-actions">
                <button onclick="likePost(${post.id})">
                    <i class="fas fa-thumbs-up"></i>
                    <span>${post.likes}</span>
                </button>
                <button onclick="commentOnPost(${post.id})">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments.length}</span>
                </button>
            </div>
        `;
        postsFeed.appendChild(postElement);
    });
}

// Like post functionality
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        renderPosts();
    }
}

// Comment on post functionality
function commentOnPost(postId) {
    const comment = prompt('Write a comment:');
    if (comment) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({
                user: currentUser,
                content: comment
            });
            renderPosts();
        }
    }
}

// Post button click handler
postBtn.addEventListener('click', () => {
    const content = postText.value.trim();
    if (content) {
        createPost(content);
        postText.value = '';
    }
});

// Enter key handler for post input
postText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const content = postText.value.trim();
        if (content) {
            createPost(content);
            postText.value = '';
        }
    }
});

// Initial render
renderPosts(); 