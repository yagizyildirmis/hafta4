import { events, formatDate, toInputDate } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("#baslik");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

// Önce kontrol, sonra yaz: bulunamazsa event.title okumayız.
if (!event) {
  document.title = "Etkinlik bulunamadı — Kampüs Etkinlikleri";
  baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `<div class="hata-kutusu" role="alert">
  <p>Bu adrese ait bir etkinlik yok. Bağlantı eksik ya da hatalı olabilir.</p>
</div>
<p><a class="buton" href="etkinlikler.html">&larr; Listeye dön</a></p>`;
} else {
  document.title = `${event.title} — Kampüs Etkinlikleri`;
  baslik.textContent = event.title;

  const gorsel = event.image
    ? `<img src="${event.image}" alt="${event.title} afişi" width="480" height="270">`
    : `<div class="afis" role="img" aria-label="${event.title} afişi">
        <span class="afis-baslik">${event.title}</span>
        <span class="afis-bilgi">${formatDate(event.date)} &middot; ${event.location}</span>
      </div>`;

  container.innerHTML = `<div class="detay-ust">
  <figure>
    ${gorsel}
    <figcaption>Şekil 1: ${event.title} afişi</figcaption>
  </figure>

  <section class="kunye">
    <h2>Etkinlik Künyesi</h2>
    <dl>
      <dt>Tarih</dt>
      <dd><time datetime="${toInputDate(event.date)}T${event.time}">${formatDate(event.date)}, ${event.time}</time></dd>
      <dt>Yer</dt>
      <dd>${event.location}</dd>
      <dt>Kategori</dt>
      <dd>${event.category}</dd>
      <dt>Kontenjan</dt>
      <dd>${event.capacity} kişi</dd>
    </dl>
  </section>
</div>

<h2>Açıklama</h2>
<p>${event.description}</p>

<p class="form-butonlar">
  <a class="buton" href="etkinlikler.html">&larr; Listeye dön</a>
  <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
</p>`;
}
