import { v4 as uuid } from 'uuid';
import { numbersMapping } from '../../utils/constants';

export default function BombCounter({ bombCounter }) {
  const bombCounterMapping = `0${bombCounter}`;

  return (
    <div className="bomb-counter">
      {Array.from(bombCounterMapping)
        .map((number) => (<div key={uuid()} className={`bomb-counter__item bomb-counter__item_${numbersMapping[Number(number)]}`} />))}
    </div>
  );
}
