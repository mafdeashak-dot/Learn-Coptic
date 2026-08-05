

function buildBookCard(book) {
  return `
    <div class="book-card">
      <div class="book-cover">ⳳ</div>
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      ${book.file
        ? `<a class="btn btn-outline" href="${book.file}" target="_blank" rel="noopener">👁 مشاهدة</a>
        <br><br>
<a class="btn btn-outline" href="${book.file}" download>📥 تحميل</a>`
        : `<span class="btn btn-outline" style="opacity:.5;pointer-events:none">قريبًا</span>`}
    </div>`;
}

function renderBooks() {
  const wrap = document.getElementById("booksGrid");
  if (!wrap) return;
  if (!BOOKS.length) {
    wrap.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="glyph">ⲡ</div><h3>لا توجد كتب بعد</h3><p>سيتم إضافة الكتب وملفات PDF قريبًا.</p></div>`;
    return;
  }
  wrap.innerHTML = BOOKS.map(buildBookCard).join("");
}

function renderGallery() {
  const wrap = document.getElementById("galleryGrid");
  if (!wrap) return;
  if (!GALLERY_IMAGES.length) {
    wrap.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="glyph">ⲓ</div><h3>لا توجد صور بعد</h3><p>سيتم إضافة معرض الصور قريبًا.</p></div>`;
    return;
  }
wrap.innerHTML = GALLERY_IMAGES
  .map((item) => `
    <div class="gallery-item">
      <img
        src="${item.src}"
        alt="${item.title}"
        data-lightbox="${item.src}"
      >
      <h4 class="gallery-title">${item.title}</h4>
    </div>
  `)
  .join("");
  wireLightboxResources();
}

function wireLightboxResources() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxDl = document.getElementById("lightboxDl");
  document.querySelectorAll("[data-lightbox]").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.getAttribute("data-lightbox");
      lightboxDl.href = img.getAttribute("data-lightbox");
      lightbox.classList.add("open");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderBooks();
  renderGallery();

  const tabs = document.querySelectorAll(".res-tab");
  const panels = {
    books: document.getElementById("booksPanel"),
    gallery: document.getElementById("galleryPanel")
  };
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      Object.entries(panels).forEach(([key, el]) => {
        if (!el) return;
        el.style.display = key === target ? "" : "none";
      });
    });
  });

  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightboxClose");
  if (closeBtn) closeBtn.addEventListener("click", () => lightbox.classList.remove("open"));
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
  }
});
