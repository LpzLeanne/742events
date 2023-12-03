import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc =
    data?.focus?.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? - 1 : 1
    ) || [];

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  useEffect(() => {
    const nextCard = () => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length -1 ? prevIndex + 1 : 0
      );
    };

  const interval = setInterval(() => {
    setIndex((prevIndex) => {
      nextCard();
      // console.log("Previous index:", prevIndex);
      return prevIndex;
    });
  }, 5000);

  return () => {
    clearInterval(interval);
  };
}, [byDateDesc]);

  return (
    <div className="SlideCardList" data-testid="slide-card-list">
      {byDateDesc?.map((focus, focusIdx) => (
        <div
          key={focus.id}
          className={`SlideCard SlideCard--${
            index === focusIdx ? "display" : "hide"
          }`}
        >
          <img src={focus.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{focus.title}</h3>
              <p>{focus.description}</p>
              <div>{getMonth(new Date(focus.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div
        className="SlideCard__paginationContainer"
        data-testid="pagination-container"
      >
        <div className="SlideCard__pagination" data-testid="pagination">
          {byDateDesc.map((focus, radioIdx) => (
            <input
              key={focus.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => {
                handleRadioChange(radioIdx);
              }}
              value={radioIdx}
              data-testid="radio-button"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
