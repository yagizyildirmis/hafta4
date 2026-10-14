import { useEffect, useState } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const SITE_NAME = "Kampüs Etkinlikleri";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const categoryList: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function formatDate(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
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
              go("detail", event.id);
            }}
          >
            Detayları gör
          </a>
        </p>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>

      <nav className="menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.page}>
              <a
                href="#"
                aria-current={page === item.page ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.page);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <>
            <h2 id="yaklasan" className="bolum-baslik">
              Yaklaşan 2 Etkinlik
            </h2>
            <section className="etkinlik-listesi" aria-labelledby="yaklasan">
              {upcoming.map(renderCard)}
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
            <div className="filtre">
              <p className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </p>
            </div>

            <p className="sonuc" role="status">
              {filtered.length === 0
                ? "Aradığınız kriterlere uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
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
          <article className="detay">
            <div className="detay-ust">
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}

              <section className="kunye">
                <h2>Etkinlik Künyesi</h2>
                <dl>
                  <dt>Tarih</dt>
                  <dd>
                    {formatDate(selected.date)}, {selected.time}
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </section>
            </div>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <p className="form-butonlar">
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("update", selected.id);
                }}
              >
                Bu etkinliği güncelle
              </a>
            </p>
          </article>
        )}

        {/* EKLE ve GÜNCELLE: aynı form */}
        {(page === "add" || page === "update") && (
          <>
            <p className="bilgi">
              Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri kaydetmez.
            </p>

            <form
              className="form"
              id="etkinlik-formu"
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <p className="alan">
                <label htmlFor="ad">Etkinlik Adı *</label>
                <input
                  type="text"
                  id="ad"
                  name="ad"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                  required
                  aria-describedby="ad-hata"
                />
                <span className="alan-hata" id="ad-hata"></span>
              </p>

              <p className="alan">
                <label htmlFor="kategori">Kategori *</label>
                <select
                  id="kategori"
                  name="kategori"
                  defaultValue=""
                  required
                  aria-describedby="kategori-hata"
                >
                  <option value="">Seçiniz</option>
                  {categoryList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="alan-hata" id="kategori-hata"></span>
              </p>

              <p className="alan">
                <label htmlFor="tarih">Tarih *</label>
                <input
                  type="date"
                  id="tarih"
                  name="tarih"
                  required
                  aria-describedby="tarih-hata"
                />
                <span className="alan-hata" id="tarih-hata"></span>
              </p>

              <p className="alan">
                <label htmlFor="saat">Saat *</label>
                <input
                  type="time"
                  id="saat"
                  name="saat"
                  required
                  aria-describedby="saat-hata"
                />
                <span className="alan-hata" id="saat-hata"></span>
              </p>

              <p className="alan">
                <label htmlFor="yer">Yer *</label>
                <input
                  type="text"
                  id="yer"
                  name="yer"
                  maxLength={80}
                  placeholder="Örn. A Blok Konferans Salonu"
                  required
                  aria-describedby="yer-hata"
                />
                <span className="alan-hata" id="yer-hata"></span>
              </p>

              <p className="alan">
                <label htmlFor="kontenjan">Kontenjan</label>
                <input
                  type="number"
                  id="kontenjan"
                  name="kontenjan"
                  min={1}
                  max={1000}
                  aria-describedby="kontenjan-hata"
                />
                <span className="alan-hata" id="kontenjan-hata"></span>
              </p>

              <p className="alan">
                <label htmlFor="aciklama">Açıklama</label>
                <textarea id="aciklama" name="aciklama" rows={5}></textarea>
              </p>

              <p className="form-butonlar">
                <button type="submit" className="buton">
                  Kaydet
                </button>
              </p>

              <div id="form-mesaj" role="status" aria-live="polite"></div>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Yağız Yıldırmış &middot; 2416501007 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;