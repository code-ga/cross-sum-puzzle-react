import "./Input.css";

export const QuestionInput: React.FC<{
  value: string;
  correct: 'normal' | 'correct' | 'wrong';
  onChange: (value: string) => void;
}> = ({ value, correct, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`question-input ${
        correct === "correct" ? "correct" : correct === "wrong" ? "wrong" : ""
      }`}
    />
  );
};
