import { useState } from 'react';
import './StarRating.css';

const StarRating = () => {
    const [rating, setRating] = useState<number>(0);
    const handleRating = (index: number) => {
        setRating(index + 1);
    };

    return (
        <div className="star-rating">
            {[...Array(10)].map((_, index) => (
                <span
                    key={index}
                    className={`star ${index < rating ? 'selected' : ''}`}
                    onClick={() => handleRating(index)}>
          ★
        </span>
            ))}
        </div>
    );
};

export default StarRating;
