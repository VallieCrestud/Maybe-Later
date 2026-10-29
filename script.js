
/* =========================================
   MAYBE LATER
   Pause, Think, Then Decide.
   ========================================= */

const $ = (id) => document.getElementById(id);

let language = localStorage.getItem("maybeLaterLanguage") || "en";
let currentItem = {};
let wishlist = loadWishlist();

const pageIds = ["page-start", "page-check", "page-result", "page-wishlist"];

const translations = {
  en: {
    lang: "EN / ID",
    startEyebrow: "YOUR MINDFUL SHOPPING SPACE",
    startTitle: 'You can want it<br><span>without buying it today.</span>',
    startDescription: "A little pause can help you make a choice that feels right for you.",
    formTitle: "Let's start with your wishlist item",
    itemLabel: "What do you want to buy?",
    itemPlaceholder: "e.g. A new skincare serum",
    priceLabel: "What's the price? (IDR)",
    pricePlaceholder: "e.g. 150000",
    categoryLabel: "Which category?",
    categoryPlaceholder: "Choose a category",
    budgetLabel: "Your budget for this item (IDR)",
    budgetPlaceholder: "e.g. 200000",
    reasonLabel: "Why do you want it?",
    reasonPlaceholder: "I need it because...",
    continue: "Let's think it through →",
    checkEyebrow: "A MOMENT OF REFLECTION",
    checkTitle: "Before you add something new...",
    checkDescription: "Let's see whether you already have something that does the same job.",
    similarLabel: "Do you already own something similar?",
    similarPlaceholder: "List similar items you already own...",
    conditionLabel: "Can your current item still be used?",
    conditionPlaceholder: "Choose an answer",
    urgencyLabel: "When do you actually need it?",
    urgencyPlaceholder: "Choose an answer",
    back: "← Back",
    seeReflection: "See my reflection →",
    resultEyebrow: "YOUR BUYING REFLECTION",
    resultTitle: "Let's look at the bigger picture.",
    resultDescription: "There's no right or wrong answer. The goal is to make an intentional choice.",
    itemHeading: "YOUR ITEM",
    priceHeading: "Price",
    budgetHeading: "Your budget",
    insightHeading: "A thought to consider",
    saveLater: "Maybe later ♡",
    review: "← Review answers",
    restart: "Start again",
    wishlistEyebrow: "GIVE YOURSELF SOME TIME",
    wishlistTitle: "Good things can wait.",
    wishlistDescription: "Save your item and give yourself time to reconsider before buying.",
    waitingLabel: "How long would you like to wait?",
    customLabel: "Enter your waiting period",
    customUnitLabel: "Choose a unit",
    customPlaceholder: "e.g. 10",
    customDays: "Days",
    customWeeks: "Weeks",
    customMonths: "Months",
    customYears: "Years",
    countdown: "Your reconsideration date",
    saveWishlist: "Save to wishlist ♡",
    savedTitle: "Your wishlist",
    empty: "Your wishlist is waiting for its first item.",
    footer: "Made with care · Maybe Later © 2026",
    tagline: "Pause, Think, Then Decide.",
    invalid: "Please complete all required fields with a valid price and budget.",
    invalidCheck: "Please answer both reflection questions.",
    invalidDuration: "Please enter a whole number from 1 to 120 for your custom duration.",
    chooseDuration: "Please choose a waiting period.",
    budgetOver: "This item exceeds your budget by {amount}. Consider whether the difference is comfortable for you.",
    budgetWithin: "This item fits within your budget, with {amount} left.",
    duplicate: "You mentioned owning something similar. Could your current item meet the same need?",
    noDuplicate: "You haven't listed a similar item. Consider whether this fills a real need.",
    usable: "Your existing item is still usable. Waiting until you finish it may be practical.",
    almost: "Your existing item is nearly finished. Consider whether you need a replacement now.",
    emptyItem: "Your existing item may be empty or unusable. Replacing it may make sense if you still need it.",
    none: "You don't own a similar item. Consider whether this fills a real need or is simply something you want.",
    now: "You said you need it now. If it solves an immediate need and fits your budget, buying it may be reasonable.",
    soon: "You may need it soon. Would waiting a few days affect your daily life?",
    later: "You said it's something you want rather than need right now. A waiting period could help clarify your feelings.",
    reason: "Your reason: “{reason}”",
    waitAdvice: "A little pause may help you decide with more confidence.",
    buyAdvice: "Buying it may be reasonable if it meets a real need and feels affordable.",
    saved: "Added to your wishlist! Reconsider it on {date}.",
    remove: "Remove",
    evaluate: "Review now",
    reconsider: "Reconsider on",
    daysLeft: "{days} day(s) left",
    ready: "Waiting period complete — time to reconsider!",
    today: "Today is your reconsideration day!",
    confirmDelete: "Remove this item from your wishlist?",
    removed: "Item removed from your wishlist.",
    noReason: "No reason provided",
    waiting: "Waiting period",
    readyStatus: "Ready to reconsider",
    reviewResult: "Review your answers",
    chooseCategory: "Choose a category"
  },

  id: {
    lang: "ID / EN",
    startEyebrow: "RUANG BELANJA LEBIH BIJAK",
    startTitle: 'Boleh menginginkannya<br><span>tanpa harus membelinya hari ini.</span>',
    startDescription: "Jeda sejenak untuk membantumu membuat keputusan yang lebih tepat.",
    formTitle: "Yuk, mulai dari barang yang kamu inginkan",
    itemLabel: "Barang apa yang ingin kamu beli?",
    itemPlaceholder: "Contoh: serum wajah baru",
    priceLabel: "Berapa harganya? (Rupiah)",
    pricePlaceholder: "Contoh: 150000",
    categoryLabel: "Kategori barang",
    categoryPlaceholder: "Pilih kategori",
    budgetLabel: "Budget kamu untuk barang ini (Rupiah)",
    budgetPlaceholder: "Contoh: 200000",
    reasonLabel: "Kenapa kamu menginginkannya?",
    reasonPlaceholder: "Aku menginginkannya karena...",
    continue: "Pikirkan dulu, yuk →",
    checkEyebrow: "JEDA UNTUK BERPIKIR",
    checkTitle: "Sebelum menambah barang baru...",
    checkDescription: "Coba cek apakah kamu sudah punya barang dengan fungsi serupa.",
    similarLabel: "Apakah kamu sudah punya barang serupa?",
    similarPlaceholder: "Tuliskan barang serupa yang kamu punya...",
    conditionLabel: "Apakah barang yang kamu punya masih bisa digunakan?",
    conditionPlaceholder: "Pilih jawaban",
    urgencyLabel: "Kapan kamu benar-benar membutuhkannya?",
    urgencyPlaceholder: "Pilih jawaban",
    back: "← Kembali",
    seeReflection: "Lihat hasil pertimbangan →",
    resultEyebrow: "PERTIMBANGAN PEMBELIANMU",
    resultTitle: "Mari lihat gambaran besarnya.",
    resultDescription: "Tidak ada jawaban benar atau salah. Tujuannya adalah membuat keputusan dengan sadar.",
    itemHeading: "BARANG INCARAN",
    priceHeading: "Harga",
    budgetHeading: "Budget kamu",
    insightHeading: "Hal yang bisa kamu pertimbangkan",
    saveLater: "Mungkin nanti ♡",
    review: "← Periksa jawaban",
    restart: "Mulai lagi",
    wishlistEyebrow: "BERI DIRIMU WAKTU",
    wishlistTitle: "Tidak harus sekarang.",
    wishlistDescription: "Simpan barang incaranmu dan beri waktu untuk mempertimbangkannya kembali.",
    waitingLabel: "Berapa lama kamu ingin menunggu?",
    customLabel: "Masukkan durasi tunggu",
    customUnitLabel: "Pilih satuan waktu",
    customPlaceholder: "Contoh: 10",
    customDays: "Hari",
    customWeeks: "Minggu",
    customMonths: "Bulan",
    customYears: "Tahun",
    countdown: "Tanggal untuk mempertimbangkan kembali",
    saveWishlist: "Simpan ke wishlist ♡",
    savedTitle: "Wishlist kamu",
    empty: "Wishlist-mu siap diisi barang incaran pertamamu.",
    footer: "Dibuat dengan sepenuh hati · Maybe Later © 2026",
    tagline: "Pause, Think, Then Decide.",
    invalid: "Lengkapi semua kolom wajib dengan harga dan budget yang valid, ya.",
    invalidCheck: "Jawab kedua pertanyaan refleksi terlebih dahulu, ya.",
    invalidDuration: "Masukkan angka bulat dari 1 sampai 120 untuk durasi khusus.",
    chooseDuration: "Pilih masa tunggu terlebih dahulu.",
    budgetOver: "Harga barang ini melebihi budget-mu sebesar {amount}. Pertimbangkan apakah selisihnya masih bisa kamu tanggung.",
    budgetWithin: "Barang ini masih dalam budget-mu, dengan sisa {amount}.",
    duplicate: "Kamu menyebutkan punya barang serupa. Apakah barang yang sekarang sudah memenuhi kebutuhanmu?",
    noDuplicate: "Kamu belum mencantumkan barang serupa. Pertimbangkan apakah barang ini benar-benar dibutuhkan.",
    usable: "Barang yang kamu punya masih bisa digunakan. Menunggu sampai barang itu habis bisa menjadi pilihan praktis.",
    almost: "Barang yang kamu punya hampir habis. Pertimbangkan apakah perlu menggantinya sekarang.",
    emptyItem: "Barang yang kamu punya mungkin sudah habis atau tidak bisa digunakan. Menggantinya bisa masuk akal jika masih dibutuhkan.",
    none: "Kamu belum punya barang serupa. Pertimbangkan apakah barang ini memenuhi kebutuhan atau hanya keinginan.",
    now: "Kamu merasa membutuhkannya sekarang. Jika memenuhi kebutuhan mendesak dan sesuai budget, membelinya mungkin masuk akal.",
    soon: "Kamu mungkin membutuhkannya dalam waktu dekat. Apakah menunggu beberapa hari akan mengganggu aktivitasmu?",
    later: "Kamu mengatakan bahwa barang ini lebih merupakan keinginan daripada kebutuhan saat ini. Masa tunggu bisa membantu memperjelas perasaanmu.",
    reason: "Alasanmu: “{reason}”",
    waitAdvice: "Jeda sebentar bisa membantumu memutuskan dengan lebih yakin.",
    buyAdvice: "Membelinya mungkin masuk akal jika memenuhi kebutuhan nyata dan harganya terasa terjangkau.",
    saved: "Berhasil disimpan ke wishlist! Pertimbangkan kembali pada {date}.",
    remove: "Hapus",
    evaluate: "Tinjau sekarang",
    reconsider: "Pertimbangkan kembali pada",
    daysLeft: "Sisa {days} hari",
    ready: "Masa tunggu selesai — waktunya mempertimbangkan kembali!",
    today: "Hari ini waktunya mempertimbangkan kembali!",
    confirmDelete: "Hapus barang ini dari wishlist?",
    removed: "Barang dihapus dari wishlist.",
    noReason: "Belum ada alasan",
    waiting: "Masa tunggu",
    readyStatus: "Siap dipertimbangkan kembali",
    reviewResult: "Periksa jawabanmu",
    chooseCategory: "Pilih kategori"
  }
};

function t(key) {
  return translations[language][key] || translations.en[key] || key;
}

function loadWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem("maybeLaterWishlist") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveWishlist() {
  localStorage.setItem("maybeLaterWishlist", JSON.stringify(wishlist));
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function formatMoney(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(dateString + "T12:00:00"));
}

function showPage(pageId) {
  pageIds.forEach(id => {
    const page = $(id);
    if (page) {
      page.hidden = id !== pageId;
      page.classList.toggle("active", id === pageId);
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================
   LANGUAGE
   ========================================= */

function setText(id, value) {
  const element = $(id);
  if (element) element.textContent = value;
}

function setPlaceholder(id, value) {
  const element = $(id);
  if (element) element.placeholder = value;
}

function translateOptions(id, options) {
  const select = $(id);
  if (!select) return;

  Array.from(select.options).forEach(option => {
    if (options[option.value]) {
      option.textContent = options[option.value];
    }
  });
}

function updateLanguage() {
  document.documentElement.lang = language;
  setText("language-toggle", t("lang"));

  const textIds = {
    "start-eyebrow": "startEyebrow",
    "start-description": "startDescription",
    "form-title": "formTitle",
    "item-label": "itemLabel",
    "price-label": "priceLabel",
    "category-label": "categoryLabel",
    "budget-label": "budgetLabel",
    "reason-label": "reasonLabel",
    "continue-button": "continue",
    "check-eyebrow": "checkEyebrow",
    "check-title": "checkTitle",
    "check-description": "checkDescription",
    "similar-label": "similarLabel",
    "condition-label": "conditionLabel",
    "urgency-label": "urgencyLabel",
    "back-button": "back",
    "reflection-continue": "seeReflection",
    "result-eyebrow": "resultEyebrow",
    "result-title": "resultTitle",
    "result-description": "resultDescription",
    "result-item-label": "itemHeading",
    "result-price-label": "priceHeading",
    "result-budget-label": "budgetHeading",
    "insight-title": "insightHeading",
    "wishlist-button": "saveLater",
    "result-back-button": "review",
    "restart-button": "restart",
    "wishlist-eyebrow": "wishlistEyebrow",
    "wishlist-title": "wishlistTitle",
    "wishlist-description": "wishlistDescription",
    "waiting-label": "waitingLabel",
    "custom-duration-label": "customLabel",
    "custom-duration-unit-label": "customUnitLabel",
    "countdown-label": "countdown",
    "save-wishlist-button": "saveWishlist",
    "saved-items-title": "savedTitle",
    "footer-text": "footer",
    "footer-tagline": "tagline"
  };

  Object.entries(textIds).forEach(([id, key]) => setText(id, t(key)));

  $("start-title").innerHTML = t("startTitle");

  setPlaceholder("item-name", t("itemPlaceholder"));
  setPlaceholder("item-price", t("pricePlaceholder"));
  setPlaceholder("item-budget", t("budgetPlaceholder"));
  setPlaceholder("item-reason", t("reasonPlaceholder"));
  setPlaceholder("similar-items", t("similarPlaceholder"));
  setPlaceholder("custom-duration-value", t("customPlaceholder"));

  setText("category-placeholder", t("categoryPlaceholder"));
  setText("condition-placeholder", t("conditionPlaceholder"));
  setText("urgency-placeholder", t("urgencyPlaceholder"));

  translateOptions("item-category", {
    skincare: language === "id" ? "Perawatan kulit" : "Skincare",
    makeup: "Makeup",
    clothing: language === "id" ? "Pakaian" : "Clothing",
    gadgets: "Gadget",
    "daily-needs": language === "id" ? "Kebutuhan sehari-hari" : "Daily needs",
    other: language === "id" ? "Lainnya" : "Other"
  });

  translateOptions("existing-condition", {
    usable: language === "id" ? "Ya, masih bisa digunakan" : "Yes, it's still usable",
    "almost-finished": language === "id" ? "Hampir habis" : "Almost finished",
    empty: language === "id" ? "Habis atau tidak bisa digunakan" : "Empty or unusable",
    none: language === "id" ? "Aku belum punya barang serupa" : "I don't own a similar item"
  });

  translateOptions("purchase-urgency", {
    now: language === "id" ? "Aku membutuhkannya sekarang" : "I need it now",
    soon: language === "id" ? "Dalam beberapa minggu ke depan" : "Within the next few weeks",
    later: language === "id" ? "Sebenarnya hanya menginginkannya" : "It's just something I want"
  });

  translateOptions("waiting-period", {
    "3d": language === "id" ? "3 hari" : "3 days",
    "7d": language === "id" ? "7 hari" : "7 days",
    "2w": language === "id" ? "2 minggu" : "2 weeks",
    "3w": language === "id" ? "3 minggu" : "3 weeks",
    "4w": language === "id" ? "4 minggu" : "4 weeks",
    "5w": language === "id" ? "5 minggu" : "5 weeks",
    "6w": language === "id" ? "6 minggu" : "6 weeks",
    "2m": language === "id" ? "2 bulan" : "2 months",
    "3m": language === "id" ? "3 bulan" : "3 months",
    "4m": language === "id" ? "4 bulan" : "4 months",
    "5m": language === "id" ? "5 bulan" : "5 months",
    "6m": language === "id" ? "6 bulan" : "6 months",
    "9m": language === "id" ? "9 bulan" : "9 months",
    "1y": language === "id" ? "1 tahun" : "1 year",
    "2y": language === "id" ? "2 tahun" : "2 years",
    "3y": language === "id" ? "3 tahun" : "3 years",
    custom: language === "id" ? "Durasi khusus" : "Custom duration"
  });

  translateOptions("custom-duration-unit", {
    d: t("customDays"),
    w: t("customWeeks"),
    m: t("customMonths"),
    y: t("customYears")
  });

  renderWishlist();
}

$("language-toggle").addEventListener("click", () => {
  language = language === "en" ? "id" : "en";
  localStorage.setItem("maybeLaterLanguage", language);
  updateLanguage();
});

/* =========================================
   STEP 1: ITEM DETAILS
   ========================================= */

$("purchase-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("item-name").value.trim();
  const priceText = $("item-price").value.trim();
  const budgetText = $("item-budget").value.trim();
  const price = Number(priceText);
  const budget = Number(budgetText);
  const category = $("item-category").value;
  const reason = $("item-reason").value.trim();

  if (!name || !category || !reason || priceText === "" ||
      budgetText === "" || !Number.isFinite(price) ||
      !Number.isFinite(budget) || price <= 0 || budget < 0) {
    alert(t("invalid"));
    return;
  }

  currentItem = { name, price, budget, category, reason };
  showPage("page-check");
});

$("back-button").addEventListener("click", () => showPage("page-start"));

/* =========================================
   STEP 2: REFLECTION
   ========================================= */

$("reflection-form").addEventListener("submit", event => {
  event.preventDefault();

  const condition = $("existing-condition").value;
  const urgency = $("purchase-urgency").value;

  if (!condition || !urgency) {
    alert(t("invalidCheck"));
    return;
  }

  currentItem.similarItems = $("similar-items").value.trim();
  currentItem.condition = condition;
  currentItem.urgency = urgency;

  createReflection();
  showPage("page-result");
});

function createReflection() {
  setText("result-item-name", currentItem.name);
  setText("result-price", formatMoney(currentItem.price));
  setText("result-budget", formatMoney(currentItem.budget));

  const messages = [];

  if (currentItem.price > currentItem.budget) {
    messages.push(t("budgetOver").replace(
      "{amount}", formatMoney(currentItem.price - currentItem.budget)
    ));
  } else {
    messages.push(t("budgetWithin").replace(
      "{amount}", formatMoney(currentItem.budget - currentItem.price)
    ));
  }

  messages.push(currentItem.similarItems ? t("duplicate") : t("noDuplicate"));

  const conditionMessages = {
    usable: "usable",
    "almost-finished": "almost",
    empty: "emptyItem",
    none: "none"
  };
  messages.push(t(conditionMessages[currentItem.condition]));

  messages.push(t(currentItem.urgency));

  if (currentItem.reason) {
    messages.push(t("reason").replace(
      "{reason}", escapeHTML(currentItem.reason)
    ));
  }

  const shouldWait =
    currentItem.price > currentItem.budget ||
    Boolean(currentItem.similarItems) ||
    currentItem.condition === "usable" ||
    currentItem.condition === "almost-finished" ||
    currentItem.urgency === "later";

  messages.push(t(shouldWait ? "waitAdvice" : "buyAdvice"));

  $("result-insight").innerHTML = messages
    .map(message => `<p>${message}</p>`)
    .join("");
}

$("result-back-button").addEventListener("click", () => showPage("page-check"));

$("restart-button").addEventListener("click", () => {
  currentItem = {};
  $("purchase-form").reset();
  $("reflection-form").reset();
  setText("wishlist-feedback", "");
  showPage("page-start");
});

/* =========================================
   STEP 3: WAITING PERIOD
   ========================================= */

function getDuration() {
  const selected = $("waiting-period").value;

  if (selected !== "custom") {
    return {
      amount: Number(selected.slice(0, -1)),
      unit: selected.slice(-1)
    };
  }

  const amount = Number($("custom-duration-value").value);
  const unit = $("custom-duration-unit").value;

  if (!Number.isInteger(amount) || amount < 1 || amount > 120) {
    return null;
  }

  return { amount, unit };
}

function calculateDate(duration) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);

  const { amount, unit } = duration;

  if (unit === "d" || unit === "w") {
    date.setDate(date.getDate() + amount * (unit === "w" ? 7 : 1));
    return date;
  }

  const originalDay = date.getDate();
  const targetMonth = date.getMonth() + amount * (unit === "y" ? 12 : 1);

  date.setDate(1);
  date.setMonth(targetMonth);

  const lastDay = new Date(
    date.getFullYear(), date.getMonth() + 1, 0
  ).getDate();

  date.setDate(Math.min(originalDay, lastDay));
  return date;
}

function dateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateReconsiderDate() {
  const duration = getDuration();

  if (!duration) {
    setText("reconsider-date", t("invalidDuration"));
    return "";
  }

  const dateString = dateToISO(calculateDate(duration));
  setText("reconsider-date", formatDate(dateString));
  return dateString;
}

function toggleCustomDuration() {
  const isCustom = $("waiting-period").value === "custom";
  $("custom-duration-fields").hidden = !isCustom;
  $("custom-duration-value").required = isCustom;
  $("custom-duration-unit").required = isCustom;
  updateReconsiderDate();
}

$("wishlist-button").addEventListener("click", () => {
  setText("wishlist-item-name", currentItem.name);
  setText("wishlist-item-price", formatMoney(currentItem.price));
  setText("wishlist-feedback", "");

  $("save-wishlist-button").disabled = false;
  setText("save-wishlist-button", t("saveWishlist"));

  $("waiting-period").value = "7d";
  $("custom-duration-value").value = "";
  $("custom-duration-unit").value = "d";

  toggleCustomDuration();
  showPage("page-wishlist");
});

$("waiting-period").addEventListener("change", toggleCustomDuration);
$("custom-duration-value").addEventListener("input", updateReconsiderDate);
$("custom-duration-unit").addEventListener("change", updateReconsiderDate);

$("wishlist-back-button").addEventListener("click", () => showPage("page-result"));

$("save-wishlist-button").addEventListener("click", () => {
  const duration = getDuration();

  if (!duration) {
    alert(t("invalidDuration"));
    return;
  }

  if (!Number.isInteger(duration.amount) || duration.amount < 1) {
    alert(t("invalidDuration"));
    return;
  }

  const reconsiderDate = updateReconsiderDate();
  if (!reconsiderDate) return;

  const entry = {
    id: Date.now().toString(),
    name: currentItem.name,
    price: currentItem.price,
    category: currentItem.category,
    budget: currentItem.budget,
    reason: currentItem.reason,
    similarItems: currentItem.similarItems || "",
    condition: currentItem.condition || "",
    urgency: currentItem.urgency || "",
    duration,
    reconsiderDate,
    createdAt: new Date().toISOString()
  };

  wishlist.unshift(entry);
  saveWishlist();
  renderWishlist();

  setText("wishlist-feedback", t("saved").replace(
    "{date}", formatDate(reconsiderDate)
  ));

  $("save-wishlist-button").disabled = true;
  setText(
    "save-wishlist-button",
    language === "id" ? "Tersimpan ✓" : "Saved ✓"
  );
});

/* =========================================
   WISHLIST DISPLAY, REVIEW AND REMOVE
   ========================================= */

function renderWishlist() {
  const container = $("saved-items-list");
  if (!container) return;

  if (!wishlist.length) {
    container.innerHTML = `<p>${t("empty")}</p>`;
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  container.innerHTML = wishlist.map(item => {
    const target = new Date(item.reconsiderDate + "T00:00:00");
    const daysLeft = Math.ceil((target - today) / 86400000);
    const ready = daysLeft <= 0;
    const status = ready
      ? t("readyStatus")
      : t("daysLeft").replace("{days}", daysLeft);

    return `
      <article class="saved-item-card">
        <h3>${escapeHTML(item.name)}</h3>
        <p><strong>${formatMoney(item.price)}</strong></p>
        <p>${t("reconsider")}: ${formatDate(item.reconsiderDate)}</p>
        <p>${escapeHTML(status)}</p>
        ${ready ? `<p><strong>${t("today")}</strong></p>` : ""}
        <p>${escapeHTML(item.reason || t("noReason"))}</p>
        <div class="button-group">
          <button type="button" class="secondary-button"
            data-action="review" data-id="${escapeHTML(item.id)}">
            ${t("evaluate")}
          </button>
          <button type="button" class="secondary-button"
            data-action="remove" data-id="${escapeHTML(item.id)}">
            ${t("remove")}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

$("saved-items-list").addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = wishlist.find(entry => entry.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "remove") {
    if (!confirm(t("confirmDelete"))) return;

    wishlist = wishlist.filter(entry => entry.id !== item.id);
    saveWishlist();
    renderWishlist();
    setText("wishlist-feedback", t("removed"));
    return;
  }

  if (button.dataset.action === "review") {
    currentItem = { ...item };

    $("item-name").value = item.name;
    $("item-price").value = item.price;
    $("item-category").value = item.category;
    $("item-budget").value = item.budget;
    $("item-reason").value = item.reason;
    $("similar-items").value = item.similarItems || "";
    $("existing-condition").value = item.condition || "";
    $("purchase-urgency").value = item.urgency || "";

    createReflection();
    showPage("page-result");
  }
});

/* =========================================
   START WEBSITE
   ========================================= */

updateLanguage();
toggleCustomDuration();
showPage("page-start");
