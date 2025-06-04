import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Define the draggable card component
const DraggableCard = ({ card, index, moveCard, setSocialCard, socialCard, dropdown, setDropdown, handleDeleteCard, handleChangePlatform }) => {
  const ref = useRef(null);

  // Define drag source
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Define drop target
  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  // Connect the drag and drop refs
  drag(drop(ref));

  // Calculate styles - this is what adds the smooth transition
  const style = {
    opacity: isDragging ? 0.5 : 1,
    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    position: 'relative',
    zIndex: isDragging ? 100 : 1
  };

  return (
    <div 
      ref={ref} 
      className="social-links__card"
      style={style}
    >
      <div className="social-links__card__title">
        <div className="social-links__card__title__icon">
          <div>
            {!card?.platform && (
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                  stroke="#565856"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          
            {card?.platform === "Spotify" && (
               <Image
               src="/assets/icons/spotify.svg"
               width={20}
               height={20}
               alt="Spotify icon"
             />
            )}
            {card?.platform === "YouTube" && (
             <Image
             src="/assets/icons/youtube.svg"
             width={20}
             height={20}
             alt="YouTube icon"
           />
            )}
            {card?.platform === "SoundCloud" && (
             <Image
             src="/assets/icons/soundclouds.png"
             width={30}
             height={20}
             alt="YouTube icon"
           />
            )}
            {card?.platform === "ApplePodcast" && (
             <Image
             src="/assets/icons/applePodcast.svg"
             width={20}
             height={20}
             alt="YouTube icon"
           />
            )}
            {card?.platform === "CastBox" && (
             <Image
             src="/assets/icons/castBox.png"
             width={20}
             height={20}
             alt="YouTube icon"
           />
            )}
          
          </div>
          <div>
            <div>
              {card?.platform}
            </div>
            <div>Handle/Link</div>
          </div>
        </div>

        <div className="social-links__card__title__actions">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleDeleteCard(index)}
          >
            <path
              d="M13.3333 4.99984V4.33317C13.3333 3.39975 13.3333 2.93304 13.1517 2.57652C12.9919 2.26292 12.7369 2.00795 12.4233 1.84816C12.0668 1.6665 11.6001 1.6665 10.6667 1.6665H9.33333C8.39991 1.6665 7.9332 1.6665 7.57668 1.84816C7.26308 2.00795 7.00811 2.26292 6.84832 2.57652C6.66667 2.93304 6.66667 3.39975 6.66667 4.33317V4.99984M8.33333 9.58317V13.7498M11.6667 9.58317V13.7498M2.5 4.99984H17.5M15.8333 4.99984V14.3332C15.8333 15.7333 15.8333 16.4334 15.5608 16.9681C15.3212 17.4386 14.9387 17.821 14.4683 18.0607C13.9335 18.3332 13.2335 18.3332 11.8333 18.3332H8.16667C6.76654 18.3332 6.06647 18.3332 5.53169 18.0607C5.06129 17.821 4.67883 17.4386 4.43915 16.9681C4.16667 16.4334 4.16667 15.7333 4.16667 14.3332V4.99984"
              stroke="#929692"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {socialCard !== index && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setSocialCard(index)}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#929692"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {socialCard === index && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setSocialCard(null)}
            >
              <path
                d="M15 12.5L10 7.5L5 12.5"
                stroke="#929692"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      {socialCard === index && (
        <>
        <br />
          <label htmlFor=" ">Platform</label>
          <div
            className="social-links__card__select"
            onClick={() => dropdown === index ? setDropdown(null) : setDropdown(index)}
          >
            <div>{card?.platform}</div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#929692"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {dropdown === index && (
            <div className="social-links__card__dropdown">
              <div onClick={() => handleChangePlatform(index, "Spotify")}>
                Spotify{" "}
                {card?.platform === "Spotify" && (
                  <Image src="/assets/icons/spotify.svg" width={20} height={20} alt="Green Tick" />
                )}
              </div>
              <div onClick={() => handleChangePlatform(index, "YouTube")}>
                YouTube{" "}
                {card?.platform === "YouTube" && (
                  <Image src="/assets/icons/greenTick.svg" width={20} height={20} alt="Green Tick" />
                )}
              </div>
              <div onClick={() => handleChangePlatform(index, "SoundCloud")}>
                SoundCloud{" "}
                {card?.platform === "SoundCloud" && (
                  <Image src="/assets/icons/greenTick.svg" width={20} height={20} alt="Green Tick" />
                )}
              </div>
              <div onClick={() => handleChangePlatform(index, "ApplePodcast")}>
                ApplePodcast{" "}
                {card?.platform === "ApplePodcast" && (
                  <Image src="/assets/icons/greenTick.svg" width={20} height={20} alt="Green Tick" />
                )}
              </div>
              <div onClick={() => handleChangePlatform(index, "CastBox")}>
                CastBox{" "}
                {card?.platform === "CastBox" && (
                  <Image src="/assets/icons/greenTick.svg" width={20} height={20} alt="Green Tick" />
                )}
              </div>
            </div>
          )}

          {card?.platform?.length > 0 && (
            <>
            <br />
              <label htmlFor=" ">Link</label>

              <div className="social-links__card__select">
                <div></div>
                <input type="text" placeholder="Paste podcast link here" />
              </div>
            </>
          )}
          {card?.platform === "Website" && (
            <>
              <label htmlFor="">Link/URL</label>
              <div className="social-links__card__select">
                <input
                  type="text"
                  placeholder="E.g https://dettydecember.xyz"
                />
              </div>
            </>
          )}
        </>
      )}

      {/* Drag handle - with a cursor: grab style to indicate dragability */}
      <div 
        className="social-links__card__move"
        style={{ cursor: 'grab' }}
      >
        <Image
          src="/assets/icons/moveItem.svg"
          width={20}
          height={48}
          alt="Move Item"
        />
      </div>
    </div>
  );
};

export default function SocialLinks({cards, setCards}) {
  const [platform, setPlatform] = useState("");
  const [socialCard, setSocialCard] = useState(null);
  const [dropdown, setDropdown] = useState(null);


  // Adding global styles for the transition of cards in the container
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    
    // Define the transition styles for cards
    styleElement.innerHTML = `
      .social-links__card {
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
    `;
    
    // Append the style element to the document head
    document.head.appendChild(styleElement);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleAddCard = () => {
    setCards([...cards, {
      platform: "",
      handle: "",
    }]);
  };

  const handleChangePlatform = (index, value) => {
    let temp = [...cards];
    if (temp[index]) {
      temp[index].platform = value;
    }
    setCards(temp);
    setDropdown(null);
  };

  const handleDeleteCard = (cardIndex) => {
    const temp = cards?.filter((card, index) => index !== cardIndex);
    setCards([...temp]);
  };

  // Function to handle card reordering
  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    
    // Create a new array without modifying the original
    const newCards = [...cards];
    
    // Remove the dragged item
    newCards.splice(dragIndex, 1);
    
    // Insert the dragged item at the new position
    newCards.splice(hoverIndex, 0, dragCard);
    
    // Update the state with the new array
    setCards(newCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="business-settings__group">
        <div className="title">
          <div>Social links</div>
          <div>Add links to your website and social media accounts</div>
        </div>
        <div className="social-links">
          {cards?.map((card, index) => (
            <DraggableCard
              key={index}
              index={index}
              card={card}
              moveCard={moveCard}
              setSocialCard={setSocialCard}
              socialCard={socialCard}
              dropdown={dropdown}
              setDropdown={setDropdown}
              handleDeleteCard={handleDeleteCard}
              handleChangePlatform={handleChangePlatform}
            />
          ))}

          <div className="social-links__add-link">
            <button onClick={handleAddCard} type="button">Add social link</button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}