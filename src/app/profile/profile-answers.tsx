type ProfileAnswersProps = {
  answers: {
    optimizedUrl: string;
    question: {
      title: string;
    };
  }[];
};
export const ProfileAnswers = ({ answers }: ProfileAnswersProps) => {
  return (
    <div className="bg-white p-3 shadow-sm rounded-sm">
      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
        <span className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </span>
        <span className="tracking-wide">Video Answers</span>
      </div>
      <div className="grid grid-cols-2"></div>
      {answers.map(({ optimizedUrl, question: { title } }) => (
        <div key={title} className="flex items-center my-3 rounded-lg px-6 py-4 bg-green-100">
          <p className="flex-1 px-6">{title}</p>
          <a
            target="_blank"
            href={optimizedUrl}
            className="grid w-[15%] h-10 bg-green-200 rounded-lg place-content-center text-green-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};
