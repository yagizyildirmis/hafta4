**Canlı adres:** [https://kampus-etkinlik-navy.vercel.app](https://kampus-etkinlik-navy.vercel.app)

# Kampüs Etkinlikleri — Sprint 3

Sprint 2'deki sayfalar artık JavaScript ile canlı: etkinlikler `data.js` içindeki veriden üretiliyor, aranabiliyor ve form kendini kontrol ediyor.

- **Öğrenci:** Yağız Yıldırmış — 2416501007
- **CSS dosyası:** `css/2416501007.css`
- **Renk tonu:** 2416501007 mod 360 = 287  ·  **Font:** son hane 7 → Palatino

## Dosya yapısı

| Dosya | Görevi |
| --- | --- |
| `js/data.js` | 6 etkinlik (dizi) ve tarih yardımcı fonksiyonları |
| `js/event-list.js` | Ana sayfa (yaklaşan 2) ve liste sayfası (hepsi, arama, kategori) |
| `js/event-detail.js` | `etkinlik-detay.html?id=...` ile doğru etkinliği açar |
| `js/event-form.js` | Ekle ve Güncelle formları, doğrulama, hata ve başarı mesajı |

## Bu sprintte yapılanlar

- Kartlar HTML'e elle yazılmıyor; `createCard` ile `data.js`'ten üretiliyor.
- Ana sayfa `data-limit="2"` işaretiyle tarihi en yakın 2 etkinliği, liste sayfası hepsini gösteriyor.
- Arama kutusu ve kategori seçimi birlikte çalışıyor, sonuç sayısı yazılıyor, sonuç yoksa mesaj çıkıyor.
- Detay sayfası adresteki `?id=` değerine göre başlığı, sekme adını ve künyeyi dolduruyor. Geçersiz ya da eksik id'de hata kutusu çıkıyor.
- Formlar `novalidate` ile kendi hata mesajını gösteriyor. Hata yoksa oluşan nesne JSON olarak yeşil kutuda görünüyor. Veri kaydedilmiyor (localStorage yok).
- Güncelle sayfası menüden kalktı; detaydaki "Bu etkinliği güncelle" bağlantısıyla `?id=` ile açılıyor ve alanlar dolu geliyor. id'siz açılırsa uyarı çıkıyor.

## Çalıştırma

`type="module"` kullanıldığı için sayfa dosyaya çift tıklanarak değil, VS Code Live Server ile (`http://127.0.0.1:5500/sprint3/`) veya Vercel üzerinden açılmalı.
