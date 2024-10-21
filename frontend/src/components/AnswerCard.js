import React from 'react';
import { SiMinutemailer } from 'react-icons/si'; // Importing the icon

const AnswerCard = ({ data }) => {
  // Construct the Gmail compose link
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${encodeURIComponent(data.title)}&body=${encodeURIComponent(data.url)}`;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border hover:shadow-xl transition duration-300 m-4 flex flex-col justify-between">
      <div className="px-6 py-4">
        {/* Title with a link */}
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          <h2 className="font-bold text-xl text-blue-600 hover:underline">
            {data.title}
          </h2>
        </a>
        {/* Author and score */}
        <p className="text-gray-700 text-sm mt-2">
          <span className="font-semibold">Author:</span> {data.author}
        </p>
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Score:</span> {data.score}
        </p>
        {/* Conditional rendering for subreddit (only for Reddit data) */}
        {data.subreddit && (
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Subreddit:</span> {data.subreddit}
          </p>
        )}
      </div>

      {/* Tags */}
      {data.tags && (
        <div className="px-6 pt-4 pb-2">
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Share via Email Button centered at the bottom */}
      <div className="px-6 pb-4 mt-auto flex justify-center">
        <a
          href={gmailLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <SiMinutemailer className="mr-2" /> {/* Added Icon */}
          Share via Email
        </a>
      </div>
    </div>
  );
};

export default AnswerCard;



