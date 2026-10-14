// Etkinlik verisi: tüm sayfalar buradan üretilir.
// Tarih biçimi GG-AA-YYYY, saat SS:DD. image boşsa detayda otomatik afiş çizilir.
export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120,
    image: "afis.svg",
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    capacity: 30,
    image: "",
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    capacity: 150,
    image: "",
  },
  {
    id: "event-4",
    title: "Yapay Zekâ ve Günlük Hayat",
    category: "Seminer",
    date: "04-11-2026",
    time: "15:00",
    location: "A Blok Konferans Salonu",
    description: "Yapay zekâ araçlarının öğrenmeye ve işe etkisi, örneklerle.",
    capacity: 100,
    image: "",
  },
  {
    id: "event-5",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "11-11-2026",
    time: "14:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk sayfanı baştan sona kur, bilgisayarını getir.",
    capacity: 25,
    image: "",
  },
  {
    id: "event-6",
    title: "Kampüs Kodlama Yarışması",
    category: "Yarışma",
    date: "18-11-2026",
    time: "11:00",
    location: "C Blok Salon",
    description: "Ekipler halinde, üç saatte birkaç problemi çözme yarışı.",
    capacity: 60,
    image: "",
  },
];

// "12-10-2026" → Date (sıralamak için; metin olarak kıyaslarsak önce gün sayılır)
export function parseDate(text) {
  const [gun, ay, yil] = text.split("-").map(Number);
  return new Date(yil, ay - 1, gun);
}

// "12-10-2026" → "12 Ekim 2026"
export function formatDate(text) {
  return parseDate(text).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// "12-10-2026" → "2026-10-12" (input type="date" ve datetime özniteliği için)
export function toInputDate(text) {
  const [gun, ay, yil] = text.split("-");
  return `${yil}-${ay}-${gun}`;
}

// "2026-10-12" → "12-10-2026" (formdan gelen değeri data.js biçimine çevirir)
export function fromInputDate(text) {
  const [yil, ay, gun] = text.split("-");
  return `${gun}-${ay}-${yil}`;
}
