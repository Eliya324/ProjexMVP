"use client";

import React, { useState } from "react";
import { Button } from "./button";

interface FeedbackPopupProps {
    type: 'rating' | 'binary';
    question: string;
    onClose: () => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ type, question, onClose }) => {
    const [rating, setRating] = useState<number | null>(null);
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
    const [comment, setComment] = useState<string>("");

    const popupSizeClasses = type === 'rating'
        ? 'w-[300px] h-[330px]'
        : 'w-[300px] h-[130px]';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white font-bold rounded-2xl shadow-lg relative flex flex-col overflow-hidden ${popupSizeClasses} border-2 border-white`}>
                <div className="bg-[#000080] w-full p-1 text-center text-white relative">
                    <h2 className="text-xl">Hey jony 👋</h2>
                    <p className="text-sm">{question}</p>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    {type === 'rating' ? (
                        <>
                            <div className="flex justify-center gap-3 text-3xl">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setRating(num)}
                                        className={`${rating && rating >= num ? "text-yellow-400" : "text-gray-300"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                placeholder="Write additional comments here..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full border rounded-2xl p-2 h-24 mt-4 text-sm"
                            />
                            <Button
                                variant="primary"
                                onClick={() => {
                                    console.log("Feedback submitted", { rating, comment });
                                    onClose();
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={onClose}
                                className="mt-2 text-sm text-gray-500 hover:text-gray-900"
                            >
                                Not Now
                            </Button>
                        </>
                    ) : (
                        <div className="flex justify-center gap-12 mt-[12px]">
                            <Button variant="primary" className="text-red-600"
                                onClick={() => {
                                    setIsHelpful(false);
                                    onClose();
                                }}
                            >
                                No
                            </Button>
                            <Button variant="primary" className="text-green-600"
                                onClick={() => {
                                    setIsHelpful(true);
                                    onClose();
                                }}                            >
                                Yes
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackPopup;