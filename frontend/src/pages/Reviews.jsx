import { useEffect, useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Guest Reviews</h1>

        {reviews.map((review) => (                              
        <div
          key={review.id}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{review.hotel}</h3>
          <p>{review.review}</p>
          <p>Rating: {review.rating}</p>
          <p>Sentiment: {review.sentiment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;