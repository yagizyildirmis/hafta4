import { useEffect, useState } from "react";
import "./App.css";
import type { Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import type { PageName } from "./types/page";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import Header from "./components/layout/Header";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";


const SITE_NAME = "Kampüs Etkinlikleri";






function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Ana sayfa: tarihe göre en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlikler sayfası: filtreli liste state değil, her çizimde hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const categoryOptions = [...new Set(events.map((e) => e.category))];

  // Detay sayfası: seçili etkinlik
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Sayfaya göre üst başlık
  let title = SITE_NAME;
  let subtitle: string | undefined;
  if (page === "home") {
    subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  } else if (page === "events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (page === "detail") {
    title = selected ? selected.title : "Etkinlik bulunamadı";
  } else if (page === "add") {
    title = "Etkinlik Ekle";
  } else if (page === "update") {
    title = "Etkinlik Güncelle";
  }

  useEffect(() => {
    document.title = title === SITE_NAME ? SITE_NAME : `${SITE_NAME} — ${title}`;
  }, [title]);

  return (
    <>
     <Header title={title} text={subtitle} />

      <Navigation current={page} onNavigate={go} />

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <>
            <h2 id="yaklasan" className="bolum-baslik">
              Yaklaşan 2 Etkinlik
            </h2>
            <section className="etkinlik-listesi" aria-labelledby="yaklasan">
  <EventList
    events={upcoming}
    onShowDetail={(id) => go("detail", id)}
  />
</section>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {/* ETKİNLİKLER */}
        {page === "events" && (
          <>
              <EventFilter
              searchText={searchText}
              category={category}
              categoryOptions={categoryOptions}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />

            <p className="sonuc" role="status">
              {filtered.length === 0
                ? "Aradığınız kriterlere uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">
  <EventList
    events={filtered}
    onShowDetail={(id) => go("detail", id)}
  />
</section>
          
          </>
        )}

        {/* DETAY: etkinlik bulunamadı */}
        {page === "detail" && !selected && (
          <div className="hata-kutusu" role="alert">
            <p>Bu etkinlik bulunamadı.</p>
            <a
              className="buton"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              Listeye dön
            </a>
          </div>
        )}

        {/* DETAY: etkinlik var */}
                {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {/* EKLE ve GÜNCELLE: aynı form */}
               {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;