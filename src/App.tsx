import { useEffect, useState } from "react";
import "./App.css";
import { QuestionInput } from "./components/Input";
import { checkSolved, generateTable } from "./util/generateTable";
import Toast from "./components/Toast";
import { isNumeric } from "./util";
import { Modal } from "./components/CustomModal";

const row = 5;
const column = 5;

function App() {
  const [
    { questionTable, sumOfEachColumn, sumOfEachRow, answerTable },
    setTable,
  ] = useState(generateTable(row, column));
  const [isSolved, setIsSolved] = useState(false);
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [error, setError] = useState("");
  const [inputValues, setInputValues] = useState([...questionTable]);
  const [helpModal, setHelpModal] = useState(false);

  const handleChange = (i: number, j: number) => (value: string) => {
    if (!isNumeric(value) && value !== "") {
      setError("Please enter a number");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    setInputValues((old) => {
      const newInputValues = [...old];
      newInputValues[i][j] = Number(value);
      return newInputValues;
    });
    if (Number(value) < 0 || Number(value) > 9) {
      setError("Please enter a number between 0 and 9");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    setNumberOfMoves((move) => move + 1);
  };

  const newGame = () => {
    const table = generateTable(row, column);
    setTable(table);
    setInputValues([...table.questionTable]);
    setIsSolved(false);
    setNumberOfMoves(0);
  };

  useEffect(() => {
    setIsSolved(checkSolved(inputValues, answerTable));
  }, [answerTable, inputValues]);
  console.log(answerTable, isSolved);
  return (
    <div className="container">
      <h1>Cross Sum Puzzle</h1>
      <h3>
        The green cells are the correct answers. the red cells are the wrong
        answers. the no color cells are the not sure answers. Range from 0 to 9{" "}
        <button onClick={() => setHelpModal(true)}>How to play</button>
      </h3>
      <h4>
        Move: {numberOfMoves}{" "}
        <button onClick={newGame}>give up for new game?</button>
      </h4>
      <Toast message={error}></Toast>
      <Modal onClose={() => setIsSolved(false)} open={isSolved}>
        <h2 style={{ color: "green", textAlign: "center" }}>
          Congratulations! You solved the puzzle.
        </h2>
        <p style={{ textAlign: "center" }}>Number of moves: {numberOfMoves}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={newGame} style={{ padding: "10px 20px" }}>
            Reset gane
          </button>
        </div>
      </Modal>
      <Modal onClose={() => setHelpModal(false)} open={helpModal}>
        <h2 style={{ color: "green", textAlign: "center" }}>How to play</h2>
        <p style={{ textAlign: "center" }}>
          Enter the number in the cell to make the sum of each row equal to the
          sum of that row (correct sum is in the right of that row) and the sum
          of each column equal to the sum of that column (correct sum is in the
          top of that column)
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setHelpModal(false)}
            style={{ padding: "10px 20px" }}
          >
            Close
          </button>
        </div>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>Sum</th>
            {sumOfEachColumn.map((num, i) => (
              <th key={i} className="columnSum">
                {num}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questionTable.map((row, i) => (
            <tr key={i}>
              <td className="rowSum">{sumOfEachRow[i]}</td>
              {row.map((_, j) => (
                <td key={j}>
                  <QuestionInput
                    value={String(inputValues[i][j])}
                    correct={
                      Number(inputValues[i][j]) == answerTable[i][j]
                        ? "correct"
                        : Number(inputValues[i][j]) != questionTable[i][j]
                        ? "wrong"
                        : "normal"
                    }
                    onChange={handleChange(i, j)}
                  ></QuestionInput>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <footer>Make by 💕 and 💪</footer>
    </div>
  );
}

export default App;
