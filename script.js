const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      console.log(entry);
      entry.target.classList.toggle('show', entry.isIntersecting);
      // if (entry.isIntersecting) observer.unobserve(entry.target); // FUNGSI INI JUGA BISA DI GUNAKAN JIKA threshold BERNILAI LEBIH DARI 0, DAN FUNGSI INI SEPERTI threshold BERNILAI 0
    });
  },
  {
    threshold: 1, // SECARA DEFAULT THRESHOLD BERNILAI 0 ATAU LEBIH, CONTOH 0.5, THRESHOLD TIDAK BOLEH LEBIH DARI 1
    // rootMargin: "-100px" // FUNGSI INI UNTUK MEMBUAT MARGIN ATAS DAN BAWAH
  }
);

const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  loadNewCards(); // FUNGSI MENAMBAH CARD BARU
  lastCardObserver.unobserve(lastCard.target);
  // lastCardObserver.observe(document.querySelectorAll('.card:last-child'));
  lastCardObserver.observe(document.querySelector('.card:last-child'));
}, {
  rootMargin: '100px'
});

lastCardObserver.observe(document.querySelector('.card:last-child'));

cards.forEach((card) => {
  observer.observe(card);
});

const cardContainer = document.querySelector('.card-container');
function loadNewCards() { // FUNGSI MENAMBAH CARD BARU
  for (let i = 0; i < 10; i++) { // MENAMBAH SEBANYAK 10 CARD
    const card = document.createElement('div'); // CREATE ELEMENT BARU DIV
    card.textContent = `New Card ${i+1}`; // BERI CONTENT 
    card.classList.add('card'); // TAMBAHKAN CLASS card DI ELEMENT DIV BARU TADI
    observer.observe(card); // FUNGSI observer LINE 3 DIATAS DI OBSERVE
    cardContainer.append(card); // TAMBAHKAN ELEMENT CARD BARU DI CONTAINER CARD NYA
  }
}
