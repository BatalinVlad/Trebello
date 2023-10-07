import React from "react";

function BoardPreview({ board }) {
  return (
    <div className="board-preview card">
      <img src={board.boardBgThumbnail} alt="none" />
      <div className="fill-height fill-width flex justify-center align-center title-container">
        <p className="capitalize" >{board.title}</p>
      </div>
    </div>
  );
}

export default (BoardPreview)