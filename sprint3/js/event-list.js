import { events, formatDate, parseDate, toInputDate } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
// Ana sayfada kartlar h2 altında (h3), liste sayfasında h1 altında (h2)
const baslik = list.dataset.limit ? "h3" : "h2";

function createCard(event) {
  return `<article class="kart">
  <${baslik}>${event.title}</${baslik}>
  <p class="kart-kategori">${event.category}</p>
  <p>Tarih: <time datetime="${toInputDate(event.date)}T${event.time}">${formatDate(event.date)}, ${event.time}</time></p>
  <p>Yer: ${event.location}</p>
  <p>${event.description}</p>
  <p><a class="kart-link" href="etkinlik-detay.html?id=${event.id}">Detayları gör</a></p>
</article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  // Ana sayfa: tarihi en yakın N etkinlik. Önce kopya, sonra sırala.
  const yaklasan = [...events]
    .sort((a, b) => parseDate(a.date) - parseDate(b.date))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
  filtreyiKur();
}

function filtreyiKur() {
  const form = document.querySelector("#filtre-formu");
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategori seçenekleri veriden gelir, her biri bir kez
  [...new Set(events.map((e) => e.category))].forEach((kategori) => {
    kategoriSecimi.append(new Option(kategori, kategori));
  });

  const kucult = (metin) => metin.toLocaleLowerCase("tr-TR");

  function filtrele() {
    const aranan = kucult(arama.value.trim());
    const secilen = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metin = kucult(
        `${e.title} ${e.category} ${e.location} ${e.description}`
      );
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent =
      sonuc.length === 0
        ? "Aramanıza uygun etkinlik bulunamadı."
        : `${sonuc.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  form.addEventListener("submit", (e) => e.preventDefault()); // Enter sayfayı yenilemesin
  filtrele();
}
