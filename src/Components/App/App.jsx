import CreateGridBoard from '../../utils/CreateGridBoard';
import Game from '../Game/Game';

function App() {
  console.log(CreateGridBoard(16, 16, 6));

  return (
    <div className="app">
      <h1 className="app__header">Minesweeper</h1>
      <Game />
    </div>
  );
}

export default App;
