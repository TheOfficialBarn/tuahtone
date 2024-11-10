import React from "react";

export default function Flashcard() {
  return (
    <div className="py-4 px-8 bg-songblockbackground rounded-xl">
      <div className="group h-64 w-64" style={{ perspective: '1000px' }}>
        <div className="relative h-full w-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
            <h2 className="text-center">Missionary!</h2>
            <p className="break-words">what</p>
          </div>
          <div className="absolute inset-0" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
            <h2 className="text-center">Back Shots!</h2>
            <p className="break-words">More content here</p>
          </div>
        </div>
      </div>
    </div>
  );
}