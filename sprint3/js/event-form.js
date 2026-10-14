import { events, toInputDate, fromInputDate } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleme = form.dataset.mode === "guncelle";
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

let etkinlik = null;
if (guncelleme) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);
}

if (guncelleme && !etkinlik) {
  // id yok ya da hatalı: boş form yerine uyarı
  document.querySelector(".bilgi")?.remove();
  form.outerHTML = `<div class="hata-kutusu" role="alert">
  <p>Güncellenecek etkinlik bulunamadı. Güncelleme sayfasına bir etkinliğin detayından gelin.</p>
</div>
<p><a class="buton" href="etkinlikler.html">Etkinliklere git</a></p>`;
} else {
  formuKur();
}

function formuKur() {
  if (guncelleme) {
    form.elements["ad"].value = etkinlik.title;
    form.elements["kategori"].value = etkinlik.category;
    form.elements["tarih"].value = toInputDate(etkinlik.date);
    form.elements["saat"].value = etkinlik.time;
    form.elements["yer"].value = etkinlik.location;
    form.elements["kontenjan"].value = etkinlik.capacity;
    form.elements["aciklama"].value = etkinlik.description;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // sayfa yenilenmesin, yazılanlar kaybolmasın

    const fd = new FormData(form);
    const kontenjanMetni = fd.get("kontenjan").trim();
    const tarihMetni = fd.get("tarih");

    // Form alanları Türkçe, nesne alanları data.js gibi İngilizce
    const data = {
      id: guncelleme ? etkinlik.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: tarihMetni ? fromInputDate(tarihMetni) : "",
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      description: fd.get("aciklama").trim(),
      capacity: kontenjanMetni === "" ? null : Number(kontenjanMetni),
    };

    const errors = dogrula(data);
    hatalariGoster(errors);

    if (Object.keys(errors).length > 0) {
      mesaj.className = "hata-kutusu";
      mesaj.textContent = "Formda hatalı alanlar var. Kırmızı alanları düzeltin.";
      form.elements[Object.keys(errors)[0]].focus();
      return;
    }

    mesaj.className = "basari-kutusu";
    mesaj.textContent = "";
    const baslik = document.createElement("p");
    baslik.textContent = guncelleme
      ? "Etkinlik güncellendi. Bu sprintte veri kaydedilmez."
      : "Etkinlik eklendi. Bu sprintte veri kaydedilmez.";
    const nesne = document.createElement("pre");
    nesne.textContent = JSON.stringify(data, null, 2); // kullanıcı metni, textContent ile güvenli
    mesaj.append(baslik, nesne);
  });
}

function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Etkinliğin yerini yazın.";
  if (
    data.capacity !== null &&
    !(Number.isInteger(data.capacity) && data.capacity >= 1 && data.capacity <= 1000)
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  return errors;
}

function hatalariGoster(errors) {
  alanlar.forEach((ad) => {
    const alan = form.elements[ad];
    const yer = document.querySelector(`#${ad}-hata`);
    if (errors[ad]) {
      yer.textContent = errors[ad];
      alan.setAttribute("aria-invalid", "true");
    } else {
      yer.textContent = ""; // düzeltilen alanın eski hatası silinir
      alan.removeAttribute("aria-invalid");
    }
  });
}
