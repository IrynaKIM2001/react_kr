import type { FC } from "react";
import './PaginationComponent.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaginationComponent: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
    return (
        <div className="pagination">
            <button className='paginBtn' onClick={handlePrev} disabled={currentPage === 1}>
                ←
            </button>
            <button className='paginBtn' onClick={handleNext} disabled={currentPage === totalPages}>
                →
            </button>
        </div>
    );
};
