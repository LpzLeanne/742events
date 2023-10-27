import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter events by category
  const allEvents = data?.events || [];
  const filteredEvents = allEvents.filter(
    (event) => !type || event.type === type
  );

  // Sort events by date
  filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Apply pagination
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = currentPage * PER_PAGE;
  const eventsToDisplay = filteredEvents.slice(startIndex, endIndex);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);

  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {eventsToDisplay.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              <a // eslint-disable-next-line react/no-array-index-key
                key={n}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
                style={{
                  fontWeight: n + 1 === currentPage ? "bold" : "normal",
                  color: n + 1 === currentPage ? "white" : "gray",
                }}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
