import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <span className="kart-kategori">{event.category}</span>
      <p>
        Tarih: {formatDate(event.date)}, {event.time}
      </p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <p>
        <a
          className="kart-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onShowDetail(event.id);
          }}
        >
          Detayları gör
        </a>
      </p>
    </article>
  );
}

export default EventCard;