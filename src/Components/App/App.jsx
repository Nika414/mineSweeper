import Game from '../Game/Game';

function App() {
  const bombAmount = 40;
  const width = 16;
  const height = 16;

  return (
    <div className="app">
      <h1 className="app__header">Minesweeper</h1>
      <Game bombAmount={bombAmount} width={width} height={height} />
    </div>
  );
}

export default App;
