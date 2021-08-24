function filterReviews() {
    const rating = document.getElementById("rating").value;
    const minRating = document.getElementById("minRating").value;
    const date = document.getElementById("date").value;
    const hasText = document.getElementById("hasText").value;

    $.getJSON("reviews.json", function(reviews) {
        const filteredReviews = reviews.filter(review=> review.rating>=minRating);

        const sortedReviews = filteredReviews.sort((firstReview, secondReview)=>{
            if(hasText==="Yes" && compareByText(firstReview,secondReview)!==0){
                return compareByText(firstReview,secondReview);
            }
            else if(compareByRating(rating,firstReview,secondReview)!==0){
                return compareByRating(rating,firstReview,secondReview);
            }
            else return compareByDate(date,firstReview,secondReview);
        });

        showResult(sortedReviews);
    });
}

function compareByDate(order,first, second) {
    if(order==="Oldest first"){
        if(first.reviewCreatedOnDate>second.reviewCreatedOnDate) return 1;
        if(first.reviewCreatedOnDate<second.reviewCreatedOnDate) return -1;
        else return 0;
    }
    else {
        if(first.reviewCreatedOnDate>second.reviewCreatedOnDate) return -1;
        if(first.reviewCreatedOnDate<second.reviewCreatedOnDate) return 1;
        else return 0;
    }
}

function compareByRating(order ,first, second) {
    if(order==="Lowest first"){
        return first.rating-second.rating
    }
    else return second.rating-first.rating;
}

function compareByText(first, second) {
    if(hasTextReview(first) === hasTextReview((second)))
    {
        return 0;
    }
    if(hasTextReview(first)){
        return -1;
    }
    if(hasTextReview(second)){
        return 1;
    }
}

function hasTextReview(review) {
    return review.reviewText.length !== 0;
}

function showResult(data){
    var table = $('#result');

    $.each(data, function(){
        table.append(
            $('<tr></tr>').append(
                $('<td></td>').text(this.rating),
                $('<td></td>').text(this.reviewText),
                $('<td></td>').text(this.reviewCreatedOnDate),
            )
        );
    });
}