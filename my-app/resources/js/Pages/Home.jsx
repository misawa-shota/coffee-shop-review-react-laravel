import react from "react";

const Home = (props) => {
    return (
        <>
            <h1>ショップ一覧</h1>
            <ul>
                {props.shops.map((shop) => (
                    <li key={shop.id}>{shop.name}</li>
                ))}
            </ul>
            <br />
            <h2>新着レビュー</h2>
            <ul>
                {props.newReviews.map((review) => (
                    <li key={review.id}>
                        {review.comment}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;
