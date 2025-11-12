const ratingSections = document.querySelectorAll('.rating');

ratingSections.forEach(ratingSection => {
    let stars = ratingSection.querySelectorAll('.star'),
        currentRating = 5, totalVotes = 1;

    stars.forEach(star => star.addEventListener('click', handleStarClick));

    function handleStarClick(event) {
        if (!ratingSection.hasAttribute('estimated')) {
            ratingSection.setAttribute('estimated', 'true');
            const star = event.target;
            const rs = star.parentNode.parentNode;
            const value = parseFloat(star.getAttribute('data-value'));
            const starMask = rs.querySelector('.star-mask');
            totalVotes++;
            currentRating = (currentRating * (totalVotes - 1) + value) / totalVotes;
            if (starMask) starMask.style.width = `${100 - currentRating * 100 / 5}%`;
        }
    }
});