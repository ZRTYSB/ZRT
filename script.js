const stage = document.querySelector(".stage");
const envelopeBtn = document.getElementById("envelopeBtn");
const letter = document.getElementById("letter");
const letterSheet = document.getElementById("letterContent");
const hint = document.getElementById("hint");
const archiveBtn = document.getElementById("archiveBtn");
const archivePanel = document.getElementById("archivePanel");
const archiveList = document.getElementById("archiveList");
const petalField = document.getElementById("petalField");
const gate = document.getElementById("gate");
const gateForm = document.getElementById("gateForm");
const gateAnswer = document.getElementById("gateAnswer");
const gateError = document.getElementById("gateError");
const gateEyebrow = document.getElementById("gateEyebrow");
const gateTitle = document.getElementById("gateTitle");
const gateQuestion = document.getElementById("gateQuestion");
const archiveMenu = document.querySelector(".archive-menu");

const STORAGE_KEY = "zehra-letters-v1";
const GATE_KEY = "zehra-gate-unlocked";
const GATE_FAIL_COOKIE = "zehra-gate-fails";
const GATE_FAIL_LIMIT = 3;
const GATE_UNLOCK_PHRASE = "Yusuf seni çok seviyorum";
const DEFAULT_MUSIC = { videoId: "T1bDNsX6_lA", endSec: 64 };
const LETTER_REVEAL_MS = 1250;
const PETAL_CLEANUP_MS = 11000;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 15/10/1995 + 12/02/1997 → tüm rakamların toplamı
function sumDigits(value) {
  return String(value)
    .replace(/\D/g, "")
    .split("")
    .reduce((total, digit) => total + Number(digit), 0);
}

const GATE_ANSWER = sumDigits("15101995") + sumDigits("12021997"); // 62

function getCookie(name) {
  const encoded = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(encoded)) {
      return decodeURIComponent(trimmed.slice(encoded.length));
    }
  }
  return "";
}

function setCookie(name, value, days = 30) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; path=/; max-age=0; SameSite=Lax`;
}

function getFailCount() {
  const raw = Number(getCookie(GATE_FAIL_COOKIE));
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
}

function setFailCount(count) {
  setCookie(GATE_FAIL_COOKIE, String(count));
}

function clearFailCount() {
  deleteCookie(GATE_FAIL_COOKIE);
}

function normalizePhrase(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("tr-TR");
}

function isPhraseUnlock(value) {
  return normalizePhrase(value) === normalizePhrase(GATE_UNLOCK_PHRASE);
}

function isGateUnlocked() {
  try {
    return sessionStorage.getItem(GATE_KEY) === "1";
  } catch (_) {
    return false;
  }
}

function unlockSite() {
  try {
    sessionStorage.setItem(GATE_KEY, "1");
  } catch (_) {
    /* ignore */
  }

  clearFailCount();
  document.body.classList.remove("is-locked", "gate-locked-hard");
  if (archiveMenu) archiveMenu.hidden = false;
  if (stage) stage.hidden = false;

  if (gate) {
    window.setTimeout(() => {
      gate.setAttribute("aria-hidden", "true");
      gate.hidden = true;
    }, prefersReducedMotion ? 0 : 560);
  }

  window.setTimeout(() => {
    gateAnswer?.blur();
  }, 0);
}

function lockSite() {
  document.body.classList.add("is-locked");
  if (archiveMenu) archiveMenu.hidden = true;
  if (stage) stage.hidden = true;
  if (gate) {
    gate.hidden = false;
    gate.setAttribute("aria-hidden", "false");
  }
}

function showGateError(message) {
  if (!gateError) return;
  gateError.hidden = false;
  gateError.textContent = message;
}

function shakeGateInput() {
  if (!gateAnswer) return;
  gateAnswer.classList.remove("is-shake");
  void gateAnswer.offsetWidth;
  gateAnswer.classList.add("is-shake");
}

function setGateMode(mode) {
  const hardLock = mode === "phrase";
  document.body.classList.toggle("gate-locked-hard", hardLock);

  if (gateEyebrow) {
    gateEyebrow.textContent = hardLock ? "Son şans" : "Sadece bizim bildiğimiz";
  }
  if (gateTitle) {
    gateTitle.textContent = hardLock ? "Kilitlendin" : "Bir soru";
  }
  if (gateQuestion) {
    gateQuestion.textContent = hardLock
      ? "Siteyi açmak için şunu yaz: Yusuf seni çok seviyorum"
      : "İkimizin doğum tarihleri rakamları toplamı kaçtır?";
  }

  if (gateAnswer) {
    gateAnswer.value = "";
    if (hardLock) {
      gateAnswer.removeAttribute("inputmode");
      gateAnswer.removeAttribute("pattern");
      gateAnswer.setAttribute("maxlength", "64");
      gateAnswer.placeholder = "Yaz…";
      gateAnswer.type = "text";
    } else {
      gateAnswer.setAttribute("inputmode", "numeric");
      gateAnswer.setAttribute("pattern", "[0-9]*");
      gateAnswer.setAttribute("maxlength", "4");
      gateAnswer.placeholder = "?";
      gateAnswer.type = "text";
    }
  }

  if (gateError) {
    gateError.hidden = true;
  }
}

function initGate() {
  if (isGateUnlocked()) {
    document.body.classList.remove("is-locked", "gate-locked-hard");
    if (archiveMenu) archiveMenu.hidden = false;
    if (stage) stage.hidden = false;
    if (gate) {
      gate.hidden = true;
      gate.setAttribute("aria-hidden", "true");
    }
    return;
  }

  lockSite();
  setGateMode(getFailCount() >= GATE_FAIL_LIMIT ? "phrase" : "number");
  window.setTimeout(() => gateAnswer?.focus(), 80);
}

gateForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const raw = String(gateAnswer?.value || "").trim();
  const hardLock = getFailCount() >= GATE_FAIL_LIMIT;

  if (hardLock) {
    if (isPhraseUnlock(raw)) {
      unlockSite();
      return;
    }

    showGateError("Tam olarak yazmalısın: Yusuf seni çok seviyorum");
    if (gateAnswer) {
      gateAnswer.value = "";
      gateAnswer.focus();
    }
    shakeGateInput();
    return;
  }

  const numeric = Number(raw.replace(/\D/g, ""));

  if (numeric === GATE_ANSWER) {
    unlockSite();
    return;
  }

  const fails = getFailCount() + 1;
  setFailCount(fails);

  if (fails >= GATE_FAIL_LIMIT) {
    setGateMode("phrase");
    showGateError("3 yanlış cevap. Artık sadece özel cümle ile açabilirsin.");
    window.setTimeout(() => gateAnswer?.focus(), 40);
    return;
  }

  showGateError(`Yanlış cevap. Kalan deneme: ${GATE_FAIL_LIMIT - fails}`);
  if (gateAnswer) {
    gateAnswer.value = "";
    gateAnswer.focus();
  }
  shakeGateInput();
});

initGate();

const SEED_LETTERS = [
  {
    id: "2026-08-02",
    title: "56. Gün",
    date: "2 Ağustos 2026",
    dateTime: "2026-08-02",
    music: { videoId: "B9IyTw2lWco", endSec: 144 }, // 2:24
    greeting: "Canım Zehra,",
    body: [
      "Bazen düşünüyorum da…",
      "Hayatımın sadece elli altı günü değişmedi. Hayatıma bambaşka bir insan girdi.",
      "Daha birkaç ay önce birbirimizin varlığından bile habersizdik. Şimdi ise gün içinde yaşadığım en küçük şeyi bile sana anlatmak istiyorum. Güzel bir şey olduğunda ilk sen aklıma geliyorsun, canımı sıkan bir şey olduğunda yine seninle paylaşmak istiyorum. Farkında olmadan hayatımın en doğal parçası hâline geldin.",
      "Mesafeler var, kilometreler var… Ama buna rağmen elli altı gündür neredeyse tek bir gün bile geçmedi ki seni düşünmeyeyim. Bazen sabah gözümü açınca, bazen uzun bir yolculukta, bazen gece uyumadan hemen önce… Günün mutlaka bir yerinde aklım senden geçiyor.",
      "İnsan her gün aynı kişiyi düşünüyorsa, bunun adı artık alışkanlık değil; gönülden değer vermektir.",
      "Seninle konuşurken zamanın nasıl geçtiğini anlamıyorum. Bazen saatlerce konuşuyoruz, bazen birkaç dakika… Ama süre hiçbir zaman önemli olmuyor. Çünkü bana iyi gelen şey konuşmanın uzunluğu değil, konuştuğum kişinin sen olman.",
      'İlk kez yüz yüze geldiğimiz günü düşündükçe hâlâ gülümsüyorum. O gün sadece seni görmedim; yazışmaların arkasındaki insanı tanıdım. Gözlerine bakınca, sesini karşımda duyunca, yürüyüşünü izleyince içimde tek bir düşünce oluştu: "İyi ki bu yola çıkmışım."',
      "O günden sonra seni sadece daha çok tanımak istemedim. Hayatımın içinde daha fazla görmek istedim.",
      "Ben seni bugünün heyecanıyla sevmiyorum. Ben seni geleceği düşünerek seviyorum.",
      "Bir gün aynı sofrada kahvaltı etmeyi, akşam eve döndüğümde kapıyı senin açmanı, yorgun geçen bir günün sonunda aynı salonda oturup hiçbir şey konuşmadan bile huzur bulmayı hayal ediyorum. Çünkü bana göre mutluluk büyük olaylarda değil, aynı hayatı paylaşabildiğin doğru insanın yanında saklı.",
      "Elbette her ilişkide olduğu gibi biz de bazen kırılıyoruz. Bazen yanlış anlıyoruz, bazen yanlış anlaşılıyoruz. Ama dikkat ettin mi? Günü küs bitiremiyoruz. İçimiz rahat etmiyor. Bu bile bana, birbirimizin hayatındaki yerimizi anlatmaya yetiyor.",
      "Ben kusursuz biri değilim. Sen de değilsin. Belki daha çok hata yapacağız. Belki yine canımızı sıkan günler olacak. Ama benim inandığım şey şu: İki insan birbirini gerçekten seviyorsa, sorunlar onları birbirinden uzaklaştırmak yerine birbirini daha iyi anlamaya vesile olmalı.",
      "Sana bir şeyi de bütün samimiyetimle söylemek istiyorum.",
      'Bazen "Herkes herkesten vazgeçebilir." diyorsun. Bu cümleyi her duyduğumda içimde bir boşluk oluşuyor. Çünkü ben aramızdaki ilişkiye hiçbir zaman böyle bakmadım.',
      "Benim için bir ilişki, denemek için girilen bir yol değil. Ben bir yola çıkacaksam, o yolu gerçekten yürümek için çıkarım. Daha en başından dönüş ihtimalini düşünerek adım atmam. Elbette hayatın ne getireceğini kimse bilemez ama benim sana olan hislerimin negatif olacağına inanmıyorum.",
      "Benim karakterimde bir yola ya girilir ya da girilmez. Eğer girdiysem, ilk zorlukta vazgeçmek benim dünyamda yoktur. Ben emek vermeye, anlamaya, sabretmeye ve birlikte yürümeye inanırım.",
      "Belki bu yüzden seni hayatımda sıradan biri olarak göremiyorum.",
      "Sana baktığımda sadece bugünü değil, yarını da düşünüyorum.",
      "Ve bunu sana bir yük olsun diye değil, sana verdiğim değerin büyüklüğünü bil diye söylüyorum.",
      "İyi ki hayatıma girdin.",
      "İyi ki seni tanıdım.",
      "İyi ki yollarımız kesişti.",
      'Umarım yıllar sonra dönüp bugüne baktığımızda, "İyi ki o gün birbirimizden vazgeçmemişiz." diyebilen iki insan oluruz.',
    ],
    closing: [
      "Seni çok seviyorum, Zehra.",
      "Ve Allah nasip ederse, bu sevgiyi sadece bugünde değil, bir ömürde yaşamak istiyorum.",
    ],
    signature: "Seni çok Seven Yusuf Salih",
  },
  {
    id: "2026-07-25",
    title: "İlk Mektup",
    date: "25 Temmuz 2026",
    dateTime: "2026-07-25",
    music: { videoId: "T1bDNsX6_lA", endSec: 64 }, // 1:04
    greeting: "Zehram,",
    body: [
      "Bu mektubu yazarken fark ettim ki sana olan sevgimi birkaç cümleyle anlatmak hiç kolay değil. Çünkü ben seni sadece güzel anlarımız için sevmedim. Seni, birlikte güldüğümüz kadar tartıştığımız, birbirimizi anlamaya çalışırken bazen yorulduğumuz ama yine de birbirimizden vazgeçmek istemediğimiz için de sevdim.",
      "Sen hayatıma girdiğinden beri birçok şeye farklı bakmaya başladım. Senin düşünme şeklin, değerlerine bağlı oluşun, işine olan emeğin ve en önemlisi karakterin bana her geçen gün seni biraz daha tanıma isteği verdi. Bazen aynı noktaya farklı yerlerden baktık, bazen birbirimizi kırdık. Ama hiçbir zaman içimdeki \"iyi ki seni tanımışım\" düşüncesi değişmedi.",
      "Konuşmalarımıza dönüp baktığımda en çok dikkatimi çeken şey şu oldu: Aslında ikimiz de aynı şeyi istiyormuşuz. Birbirimizi kaybetmemek. Bazen bunu yanlış cümlelerle anlattık, bazen kırgınlıklarımız sevgimizin önüne geçti. Ama ne zaman birimiz üzülse, diğerimiz o kırgınlığı onarmaya çalıştı. Belki de sevginin en gerçek hâli tam olarak budur.",
      "Seni tarif edebilecek en doğru kelime belki de şu: Şansım . Hayatıma iyi ki dokundun. İyi ki seni tanıdım, iyi ki kalbimde sana ait bir yer oluştu. Bunun için her zaman Allah'a şükredeceğim. Eğer bu hayatta bana \"En gerçek hissettiğin duygu neydi?\" diye sorarlarsa, hiç düşünmeden \"Zehra'yı sevmek.\" derim.",
      "Ben geleceği düşündüğümde yanımda sadece sevdiğim bir kadını değil, birlikte güçleneceğim, birbirimizi tamamlayacağımız, iyi günde de zor günde de omuz omuza duracağımız bir hayat arkadaşı görüyorum. Seninle kurduğum hayaller; gösterişli oldukları için değil, içinde sen olduğun için güzel geliyor bana.",
      "Belki her zaman doğru cümleyi kuramadım, belki seni istemeden kırdığım anlar oldu. Bunun pişmanlığını hep taşıdım. Ama şunu bilmeni isterim ki sana duyduğum sevgi hiçbir zaman anlık bir heves olmadı. Seni tanıdıkça büyüyen, sana saygı duydukça derinleşen ve seni kaybetme ihtimalini düşündükçe kıymetini daha çok anladığım bir sevgi oldu.",
      "İyi ki yollarımız kesişti. Hayat beni nereye götürürse götürsün, kalbimde her zaman sana ayrılmış çok özel bir yer olacak. Ve eğer bir gün dönüp bu mektubu tekrar okursan, bil ki burada yazan her kelime, seni gerçekten seven bir kalbin en samimi hisleridir.",
    ],
    closing: "Seni çok seviyorum.",
    signature: "Seni çok Seven Yusuf Salih",
  },
];

let isOpen = false;
let isAnimating = false;
let ytPlayer = null;
let musicStarted = false;
let musicStopped = false;
let musicPending = false;
let musicWatchTimer = null;
let letterRevealTimer = null;
let petalCleanupTimer = null;
let letters = [];
let activeLetterId = SEED_LETTERS[0].id;
let archiveOpen = false;

const PETAL_PALETTE = [
  ["#d7e8fb", "#7eafdf", "#3f74b5"],
  ["#c9dff7", "#6a9fd6", "#355f9c"],
  ["#e3f0fc", "#8fb8e4", "#4a7cbc"],
  ["#b9d4f0", "#5d92cb", "#2f5a94"],
  ["#cfe3f8", "#74a6d8", "#3a6aa8"],
];

const HEART_PALETTE = [
  ["#ffd0d8", "#e86b7f", "#b83d55"],
  ["#ffc4cf", "#df5f78", "#a8324c"],
  ["#f6c2dc", "#d86a9d", "#a63d6f"],
  ["#c9d9f5", "#7f9fd6", "#4b6eae"],
];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createPetalSvg(colors) {
  const [hi, mid, deep] = colors;
  const id = `p${Math.random().toString(36).slice(2, 8)}`;
  return `
    <svg viewBox="0 0 48 68" aria-hidden="true">
      <defs>
        <linearGradient id="${id}" x1="18%" y1="8%" x2="82%" y2="92%">
          <stop offset="0%" stop-color="${hi}" />
          <stop offset="48%" stop-color="${mid}" />
          <stop offset="100%" stop-color="${deep}" />
        </linearGradient>
      </defs>
      <path
        fill="url(#${id})"
        d="M24.2 2.4C18.6 10.8 8.4 21.6 7.2 36.2c-1.1 13.4 7.8 24.8 17 28.6 9.2-3.8 18.1-15.2 17-28.6C40 21.6 29.8 10.8 24.2 2.4Z"
      />
      <path
        fill="rgba(255,255,255,0.34)"
        d="M18.4 14.2c-2.8 6.2-5.8 13.4-5.4 21.2 0.3 5.4 2.7 10.1 5.9 13.4-4.8-5.6-7.6-13.6-6.8-22.2 0.5-5.4 2.8-9.8 6.3-12.4Z"
      />
      <path
        fill="none"
        stroke="rgba(28,55,98,0.22)"
        stroke-width="1.1"
        d="M24.2 8.5c0 12.5-1.2 24.8-1.2 37.2"
      />
    </svg>
  `;
}

function createHeartSvg(colors) {
  const [hi, mid, deep] = colors;
  const id = `h${Math.random().toString(36).slice(2, 8)}`;
  return `
    <svg viewBox="0 0 48 44" aria-hidden="true">
      <defs>
        <linearGradient id="${id}" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stop-color="${hi}" />
          <stop offset="46%" stop-color="${mid}" />
          <stop offset="100%" stop-color="${deep}" />
        </linearGradient>
      </defs>
      <path
        fill="url(#${id})"
        d="M24 41.2C10.4 31.2 2.8 23.1 2.8 14.6 2.8 8.1 7.8 3.4 14 3.4c3.7 0 7.1 1.8 10 4.6 2.9-2.8 6.3-4.6 10-4.6 6.2 0 11.2 4.7 11.2 11.2 0 8.5-7.6 16.6-21.2 26.6Z"
      />
      <path
        fill="rgba(255,255,255,0.32)"
        d="M14.6 8.2c-2.9 0.4-5.1 2.7-5.1 5.6 0 1.4 0.4 2.7 1.1 3.8 0.3-4.2 2.8-7.4 6.4-8.8-0.8-0.4-1.6-0.6-2.4-0.6Z"
      />
    </svg>
  `;
}

function clearPetals() {
  window.clearTimeout(petalCleanupTimer);
  if (!petalField) return;
  petalField.classList.remove("is-active");
  petalField.innerHTML = "";
}

function spawnPetalRain() {
  if (!petalField || prefersReducedMotion) return;

  clearPetals();
  petalField.classList.add("is-active");

  const mobile = window.matchMedia("(max-width: 640px)").matches;
  const count = mobile ? 34 : 52;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const isHeart = Math.random() < 0.34;
    const piece = document.createElement("span");
    piece.className = `fall-piece fall-${isHeart ? "heart" : "petal"}`;
    piece.innerHTML = isHeart
      ? createHeartSvg(pick(HEART_PALETTE))
      : createPetalSvg(pick(PETAL_PALETTE));

    // En az 2x daha büyük yaprak / kalp
    const size = isHeart
      ? rand(mobile ? 30 : 36, mobile ? 52 : 64)
      : rand(mobile ? 34 : 40, mobile ? 68 : 82);

    piece.style.setProperty("--x", `${rand(6, 94)}%`);
    piece.style.setProperty("--size", `${size}px`);
    piece.style.setProperty("--delay", `${rand(0, 1.8)}s`);
    piece.style.setProperty("--duration", `${rand(mobile ? 6.4 : 6.8, mobile ? 9.2 : 10)}s`);
    piece.style.setProperty("--sway", `${rand(-22, 22)}px`);
    piece.style.setProperty("--drift", `${rand(-48, 48)}px`);
    piece.style.setProperty("--spin", `${rand(-140, 140)}deg`);
    piece.style.setProperty("--rot", `${rand(-28, 28)}deg`);
    piece.style.setProperty("--scale", `${rand(0.9, 1.12)}`);
    fragment.appendChild(piece);
  }

  petalField.appendChild(fragment);

  petalCleanupTimer = window.setTimeout(() => {
    clearPetals();
  }, PETAL_CLEANUP_MS);
}

function loadLetters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      letters = structuredClone(SEED_LETTERS);
      activeLetterId = letters[0].id;
      saveLetters();
      return;
    }

    const parsed = JSON.parse(raw);
    const stored = Array.isArray(parsed.letters) ? parsed.letters : [];
    const byId = new Map(stored.map((item) => [item.id, item]));

    // Seed mektupları her zaman kaynak olsun (metin + müzik güncel kalsın)
    letters = SEED_LETTERS.map((seed) => {
      const existing = byId.get(seed.id);
      return existing ? { ...existing, ...seed } : structuredClone(seed);
    });

    // Seed dışında sonradan eklenen mektupları da tut
    for (const item of stored) {
      if (!letters.some((letterItem) => letterItem.id === item.id)) {
        letters.push(item);
      }
    }

    letters.sort((a, b) => String(b.dateTime).localeCompare(String(a.dateTime)));

    const preferred =
      parsed.activeId && letters.some((item) => item.id === parsed.activeId)
        ? parsed.activeId
        : letters[0]?.id;

    activeLetterId = preferred || SEED_LETTERS[0].id;
    saveLetters();
  } catch (_) {
    letters = structuredClone(SEED_LETTERS);
    activeLetterId = letters[0].id;
  }
}

function saveLetters() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeId: activeLetterId,
        letters,
      })
    );
  } catch (_) {
    /* private mode / quota */
  }
}

function getActiveLetter() {
  return letters.find((item) => item.id === activeLetterId) || letters[0] || SEED_LETTERS[0];
}

function getMusicConfig() {
  const current = getActiveLetter();
  return {
    videoId: current?.music?.videoId || DEFAULT_MUSIC.videoId,
    endSec: Number(current?.music?.endSec) || DEFAULT_MUSIC.endSec,
  };
}

function setLetterContent({
  date = "25 Temmuz 2026",
  dateTime = "2026-07-25",
  greeting = "Zehram,",
  body = [],
  closing = "Seni çok seviyorum.",
  signature = "Seni çok Seven Yusuf Salih",
} = {}) {
  const sheet = document.getElementById("letterContent");
  if (!sheet) return;

  const paragraphs = (Array.isArray(body) ? body : [body])
    .filter(Boolean)
    .map((text) => `<p>${escapeHtml(text)}</p>`)
    .join("");

  const closingLines = (Array.isArray(closing) ? closing : [closing])
    .filter(Boolean)
    .map((line) => escapeHtml(line))
    .join("<br />");

  sheet.innerHTML = `
    <time class="letter-date" datetime="${escapeHtml(dateTime)}">${escapeHtml(date)}</time>
    <p class="letter-greeting">${escapeHtml(greeting)}</p>
    ${paragraphs}
    <p class="letter-closing">
      ${closingLines}<br />
      <span class="signature">${escapeHtml(signature)}</span>
    </p>
  `;
}

function renderActiveLetter() {
  const current = getActiveLetter();
  if (!current) return;
  setLetterContent(current);
  renderArchiveList();
}

function renderArchiveList() {
  if (!archiveList) return;

  archiveList.innerHTML = letters
    .map((item) => {
      const isActive = item.id === activeLetterId;
      return `
        <li>
          <button
            type="button"
            class="archive-item${isActive ? " is-active" : ""}"
            data-letter-id="${escapeHtml(item.id)}"
            aria-current="${isActive ? "true" : "false"}"
          >
            <span class="archive-item-title">${escapeHtml(item.title || item.date)}</span>
            <span class="archive-item-date">${escapeHtml(item.date)}</span>
          </button>
        </li>
      `;
    })
    .join("");
}

function setArchiveOpen(open) {
  archiveOpen = open;
  document.body.classList.toggle("archive-open", open);
  archiveBtn?.setAttribute("aria-expanded", String(open));
  archivePanel?.setAttribute("aria-hidden", String(!open));
}

function selectLetter(id) {
  if (!letters.some((item) => item.id === id)) return;

  const changed = id !== activeLetterId;
  activeLetterId = id;
  saveLetters();
  renderActiveLetter();
  setArchiveOpen(false);

  if (letterSheet) {
    letterSheet.scrollTop = 0;
  }

  if (!isOpen) {
    setOpen(true);
    return;
  }

  if (changed) {
    playLetterMusic();
  }
}

function setOpen(open) {
  if (isAnimating || open === isOpen) return;

  isAnimating = true;
  isOpen = open;
  stage.classList.toggle("is-open", open);
  envelopeBtn.setAttribute("aria-expanded", String(open));
  envelopeBtn.setAttribute("aria-label", open ? "Zarfı kapat" : "Zarfı aç");
  letter.setAttribute("aria-hidden", String(!open));
  hint.textContent = open ? "" : "Zarfı açmak için dokun";

  window.clearTimeout(letterRevealTimer);

  if (open) {
    if (letterSheet) {
      letterSheet.scrollTop = 0;
    }

    stage.classList.remove("is-letter-ready");
    spawnPetalRain();
    playLetterMusic();

    const revealDelay = prefersReducedMotion ? 0 : LETTER_REVEAL_MS;
    letterRevealTimer = window.setTimeout(() => {
      stage.classList.add("is-letter-ready");
    }, revealDelay);

    window.setTimeout(() => {
      isAnimating = false;
    }, prefersReducedMotion ? 50 : 650);
    return;
  }

  stage.classList.remove("is-letter-ready");
  setArchiveOpen(false);
  pauseMusic();
  clearPetals();

  window.setTimeout(() => {
    isAnimating = false;
  }, 700);
}

envelopeBtn.addEventListener("click", (event) => {
  if (event.target.closest(".archive-menu") || event.target.closest("#archivePanel")) {
    return;
  }

  if (isOpen) {
    if (!event.target.closest(".letter-sheet")) {
      setOpen(false);
    }
    return;
  }

  setOpen(true);
});

letterSheet.addEventListener("click", (event) => {
  event.stopPropagation();
});

archiveBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  setArchiveOpen(!archiveOpen);
});

archiveList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-letter-id]");
  if (!button) return;
  event.stopPropagation();
  selectLetter(button.getAttribute("data-letter-id"));
});

document.addEventListener("pointerdown", (event) => {
  if (archiveOpen && !event.target.closest(".archive-menu")) {
    setArchiveOpen(false);
  }

  if (!isOpen || isAnimating) return;
  if (event.target.closest(".letter-sheet")) return;
  if (event.target.closest(".archive-menu")) return;
  setOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (archiveOpen) {
      setArchiveOpen(false);
      return;
    }
    if (isOpen) {
      setOpen(false);
    }
  }
});

function clearMusicWatch() {
  if (musicWatchTimer) {
    window.clearInterval(musicWatchTimer);
    musicWatchTimer = null;
  }
}

function pauseMusic() {
  clearMusicWatch();
  musicStarted = false;

  try {
    ytPlayer?.pauseVideo();
  } catch (_) {
    /* ignore */
  }
}

function stopMusic() {
  if (musicStopped) return;
  musicStopped = true;
  clearMusicWatch();

  try {
    ytPlayer?.pauseVideo();
    ytPlayer?.stopVideo();
  } catch (_) {
    /* ignore */
  }
}

function watchMusicProgress() {
  if (musicWatchTimer || musicStopped || !ytPlayer || !isOpen) return;

  musicWatchTimer = window.setInterval(() => {
    try {
      const { endSec } = getMusicConfig();
      const current = ytPlayer.getCurrentTime?.() ?? 0;
      if (current >= endSec) {
        stopMusic();
      }
    } catch (_) {
      /* ignore */
    }
  }, 250);
}

function startMusic() {
  if (!isOpen || musicStopped || !ytPlayer) return;

  try {
    ytPlayer.unMute?.();
    ytPlayer.setVolume?.(100);
    ytPlayer.playVideo();
  } catch (_) {
    /* ignore — tarayıcı otomatik sesi engelleyebilir */
  }
}

function playLetterMusic() {
  musicPending = true;

  if (!ytPlayer) return;

  const { videoId, endSec } = getMusicConfig();
  clearMusicWatch();
  musicStopped = false;
  musicStarted = false;

  try {
    ytPlayer.loadVideoById({
      videoId,
      startSeconds: 0,
      endSeconds: endSec,
    });
    ytPlayer.unMute?.();
    ytPlayer.setVolume?.(100);
    ytPlayer.playVideo();
    musicPending = false;
  } catch (_) {
    /* ignore */
  }
}

function onPlayerReady() {
  if (musicPending && isOpen) {
    playLetterMusic();
    return;
  }

  const { videoId, endSec } = getMusicConfig();
  try {
    ytPlayer.cueVideoById({
      videoId,
      startSeconds: 0,
      endSeconds: endSec,
    });
  } catch (_) {
    /* ignore */
  }
}

function onPlayerStateChange(event) {
  // 1 = PLAYING
  if (event.data === 1 && !musicStarted) {
    musicStarted = true;
    musicPending = false;
    watchMusicProgress();
  }

  // 0 = ENDED (end param veya video bitti)
  if (event.data === 0) {
    stopMusic();
  }
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  const { videoId, endSec } = getMusicConfig();

  ytPlayer = new YT.Player("youtube-player", {
    width: 320,
    height: 180,
    videoId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      start: 0,
      end: endSec,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

document.addEventListener("pointerdown", () => {
  if (isOpen && !musicStopped) startMusic();
});

document.addEventListener("keydown", () => {
  if (isOpen && !musicStopped) startMusic();
});

window.setLetterContent = setLetterContent;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

loadLetters();
renderActiveLetter();
