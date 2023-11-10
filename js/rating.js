const ratingSections = document.querySelectorAll('.rating')

ratingSections.forEach(ratingSection => {
    let stars = ratingSection.querySelectorAll('.star'),
        currentRating = 0, totalVotes = 0,
        ratingValue = ratingSection.querySelector('.rating-value');
    stars.forEach((star) => {
        star.addEventListener('click', handleStarClick);
    });

    function handleStarClick(event) {
        let star = event.target, ratingSection = star.parentNode.parentNode,
            value = parseFloat(star.getAttribute('data-value')),
            starMask = ratingSection.querySelector('.star-mask');
        totalVotes++;
        currentRating = (currentRating * (totalVotes - 1) + value) / totalVotes;
        starMask.style.width = `${100 - currentRating * 100 / 5}%`;
        ratingValue.textContent = currentRating.toFixed(1);
    }
});

