export default function Emoji({ emojiStatus, onClick }) {
  return (
    <div className="emoji">
      <button className="emoji__button" type="button" onClick={() => onClick()}>
        <div className={`emoji__img emoji__img_${emojiStatus}`} />
      </button>
    </div>
  );
}
