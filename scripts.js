const emojiContainer = document.querySelector('.emoji-container');
const categoryBtns = document.querySelectorAll('.category-btn');

const emojis = {
    'Happy': ['😀', '😄', '😁', '😆', '😅', '😂'],
    'Sad': ['😔', '😞', '😟', '😢', '😥', '😰']
};

function changeEmoji() {
    const category = Object.keys(emojis);
    const randomCategory = category[Math.floor(Math.random() * category.length)];
    const randomEmoji = emojis[randomCategory][Math.floor(Math.random() * emojis[randomCategory].length)];
    emojiContainer.textContent = randomEmoji;
}

categoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const category = btn.textContent;
        if (emojis[category].includes(emojiContainer.textContent)) {
            alert('Correct!');
            changeEmoji();
        } else {
            alert('Wrong!');
        }
    });
});

changeEmoji();
