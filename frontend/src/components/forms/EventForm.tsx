import type { Category } from "../../types/campus-event";

const categoryList: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="bilgi">
        Yıldızlı (*) alanlar zorunludur. Bu sprintte form veri kaydetmez.
      </p>

      <form
        className="form"
        id="etkinlik-formu"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
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
  );
}

export default EventForm;