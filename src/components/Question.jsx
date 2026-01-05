const Question = ({ question, index, selectedAnswer, onAnswer }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 leading-relaxed">
        {index + 1}. {question.question}
      </h3>

      {question.type === "true_false" ? (
        <div className="space-y-2 sm:space-y-3">
          <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <input
              type="radio"
              name={`q-${question.id}`}
              checked={selectedAnswer === true}
              onChange={() => onAnswer(question.id, true)}
              className="mr-3 w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="text-sm sm:text-base">True</span>
          </label>

          <label className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <input
              type="radio"
              name={`q-${question.id}`}
              checked={selectedAnswer === false}
              onChange={() => onAnswer(question.id, false)}
              className="mr-3 w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="text-sm sm:text-base">False</span>
          </label>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((opt) => (
            <label key={opt} className="flex items-start p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={selectedAnswer === opt}
                onChange={() => onAnswer(question.id, opt)}
                className="mr-3 mt-0.5 w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              />
              <span className="text-sm sm:text-base leading-relaxed">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;