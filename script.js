const stage = document.querySelector(".stage");
const envelopeBtn = document.getElementById("envelopeBtn");
const letter = document.getElementById("letter");
const letterSheet = document.getElementById("letterContent");
const hint = document.getElementById("hint");
const archiveBtn = document.getElementById("archiveBtn");
const archivePanel = document.getElementById("archivePanel");
const archiveList = document.getElementById("archiveList");
const petalField = document.getElementById("petalField");
const landing = document.getElementById("landing");
const goLettersBtn = document.getElementById("goLettersBtn");
const countdownGrid = document.getElementById("countdownGrid");
const countdownDone = document.getElementById("countdownDone");
const ambientHearts = document.getElementById("ambientHearts");
const archiveMenu = document.querySelector(".archive-menu");

const STORAGE_KEY = "zehra-letters-v1";
// Türkiye saatiyle 23 Ekim 2026, 10:00
const MEETING_AT = new Date("2026-10-23T10:00:00+03:00");
const DEFAULT_MUSIC = { videoId: "T1bDNsX6_lA", endSec: 64 };
const START_LETTER_ID = "2026-08-25"; // Geç Mektup — varsayılan başlangıç
const NEW_BADGE_LETTER_ID = "2026-10-23"; // yalnızca bu mektupta "Yeni" rozeti
const LETTER_REVEAL_MS = 1250;
const PETAL_CLEANUP_MS = 11000;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SEED_LETTERS = [
  {
    id: "2026-10-23",
    title: "Kavuşma",
    date: "23 Ekim 2026",
    dateTime: "2026-10-23",
    // Bu saatten önce menüde görünmez (Türkiye saati)
    availableFrom: "2026-10-23T09:30:00+03:00",
    music: {
      url: "https://www.youtube.com/watch?v=yaWe_qnyYvA",
      videoId: "yaWe_qnyYvA",
      endSec: 288, // 4:48
    },
    greeting: "Benim güzel Zehram,",
    body: [
      "Birtanem, şu an sana bunları yazarken yarın yanında olacağımı düşünüyorum. Günlerdir içimde biriken özlemin sonunda sana sarılabileceğim. Sesini telefondan duymak yerine yanı başımda duyacağım, yüzünü ekrandan görmek yerine karşımda göreceğim. Belki sana kavuştuğumda anlatmak istediğim onca şeyi unutacağım. Belki de sana öyle bir sarılacağım ki günlerdir içimde tuttuğum ne varsa o sarılmanın içine sığacak.",
      "Zehram, ben seni gerçekten çok seviyorum. Bazen bunu sana nasıl anlatacağımı bilmiyorum. Sana seni çok sevdiğimi söylüyorum ama içimdeki şeyin yalnızca bu üç kelimeden ibaret olmadığını biliyorum. Keşke bir anlığına kalbimin içini sana gösterebilsem. Benim seni düşünürken nasıl gülümsediğimi, senden bahsederken içimin nasıl kıpır kıpır olduğunu, seninle geçireceğim küçücük bir zamanın bile benim için nasıl bir anlam taşıdığını görebilsen. Belki o zaman sana neden doyamadığımı, neden her görüşmemizden sonra yeniden özlediğimi anlardın.",
      "İnsan birini bu kadar severken onunla ilgili ne çok şey hayal ediyormuş, biliyor musun? Bazen öyle büyük şeyler bile değil. Seninle yan yana oturmak, sana bir şey anlatırken yüzüne bakmak, durduk yere gülüşüne şahit olmak, bir gün hiçbir yere yetişme telaşımız olmadan birlikte vakit geçirmek. Bunları düşündüğümde bile mutlu oluyorum. Çünkü hayalimdeki güzel şeylerin içinde sen varsın. Bir yere gitmekten, bir şey yapmaktan daha çok, bunları seninle yaşıyor olmak heyecanlandırıyor beni. Benim için mesele yalnızca güzel günler geçirmek değil; o günlerin içinde seninle birlikte olmak.",
      "Bir de seni özlemenin garip bir tarafı var birtanem. İnsan uzaktayken kavuşacağı anı düşünüyor ya, ben bazen o anı bile özlüyorum. Sana doğru geldiğim yolu, seni ilk gördüğüm anı, yüzündeki ifadeyi, birbirimize kavuştuğumuzda yaşayacağımız o birkaç saniyeyi… Yarın bunların hepsi gerçekten yaşanacak ve ben şu an bile o anı düşününce heyecanlanıyorum. Belki sana bunları okuduktan sonra neden böyle baktığımı sorarsın. Belki de hiçbir şey sormazsın. Ama ben sana bakarken içimden geçenleri keşke bilebilsen.",
      "Seninle tanışmış olmamın, seni seviyor olmamın benim için ne kadar büyük bir şey olduğunu bazen kendime bile anlatamıyorum. Hayatımda ilk defa bir insana duyduğum özlemi günler sayarak, kavuşacağımız anı düşünerek, söyleyeceğim sözleri kafamda kurarak yaşıyorum. Ve bütün bunların içinde en güzeli şu: Ben yalnızca sana kavuşmayı beklemiyorum; seninle daha yaşayacağımız onca şeyin hayalini de kuruyorum. Daha birlikte güleceğimiz, birbirimize anlatacağımız, yıllar sonra hatırlayıp yine gülümseyeceğimiz ne çok anımız olsun istiyorum.",
      "Birtanem , yarın sana geldiğimde belki bu mektuptaki hiçbir cümleyi hatırlamayacağım. Çünkü karşımda sen olacaksın. Ben de büyük ihtimalle seni seyretmekle sesini dinlemekle meşgul olacağım. Ama sen şunu bil istiyorum: Ben buraya yalnızca seni özlediğim için gelmiyorum. Ben seni sevdiğim için, seninle geçirdiğim zamanı hayatımın en kıymetli anlarından biri olarak gördüğüm için, seninle yaşadığım şeyin benim için ne kadar gerçek ve güzel olduğunu her geçen gün biraz daha anladığım için geliyorum.",
      "Sana kavuşacağım için çok mutluyum canımın içi. Şu an tek istediğim şey yarının gelmesi ve sonunda seni görebilmek. Belki o an sana yalnızca “Çok özledim seni” diyeceğim. Ama o cümlenin içinde kaç gündür seni düşündüğümü, seni ne kadar çok sevdiğimi ve şu an yanında olabilmek için ne kadar heyecanlandığımı sen bil istiyorum.",
      "Yarın geliyorum birtanem. Bu kez seni uzaktan özlemek yerine, sana sarılıp biraz da öyle seveyim.",
    ],
    closing: [
      "Seni çok seviyorum benim güzel Zehram. Hem de sana bazen anlatabildiğimden çok daha fazla.",
      "Not: Bu mektup ben İzmire indiğimde yayına geçecek.",
    ],
    signature: "Yusuf",
  },
  {
    id: "2026-10-18",
    title: "Güzel Kelebeğim",
    date: "18 Ekim 2026",
    dateTime: "2026-10-18",
    music: {
      url: "https://www.youtube.com/watch?v=A33z9eomcr0",
      videoId: "A33z9eomcr0",
      endSec: 237, // 3:57
    },
    greeting: "Canımın içi, benim güzel sevdiceğim…",
    body: [
      "Hayatım, bazen bir insanı ne kadar çok sevdiğini bilmekle ona bu sevgiyi gerektiği gibi hissettirebilmek arasında bir fark oluyor. Ben seni ne kadar sevdiğimi, benim için ne kadar kıymetli olduğunu biliyorum. Ama biliyorum ki senin de bunu yalnızca benim içimde var olan bir duygu olarak değil, hayatının içinde her zaman hissedebildiğin bir şey olarak yaşaman gerekiyor.",
      "Dün yaşadıklarını düşündükçe aklım sende kalıyor birtanem. Gözündeki ağrının sol koluna kadar vurduğunu biliyorum. O an yanında olup seninle ilgilenmem, nasıl olduğunu takip etmem, kendini yalnız hissetmemen için elimden geleni yapmam gerekirdi. Bazen insanın en çok ihtiyaç duyduğu şey büyük sözler ya da çözümler değil, sevdiği insanın yanında olduğunu bilmek oluyor. Ben senin böyle zamanlarında kendini yalnız hissetmeni istemiyorum hayatım. Çünkü senin canının yanması da üzülmen de benim için önemli. Senin iyi olman, kendini güvende ve değerli hissetmen benim için sıradan şeyler değil.",
      "Birtanem, sana olan sevgim yalnızca güzel günlerde, keyfimiz yerindeyken ya da birbirimize güzel sözler söylerken var olan bir şey değil. Ben seni hayatımın her hâlinde istiyorum. İyi olduğun günlerde sevincini paylaşmak, zorlandığın günlerde yükünü hafifletmek, kendini kötü hissettiğinde yanında olduğunu sana hissettirmek istiyorum. Senin hayatında yalnızca seni güldüren biri değil, ihtiyaç duyduğunda güvenle yaslanabileceğin insan da olmak istiyorum.",
      "Aramızda bazı şeylerin eskisi kadar kolay hissettirmediğinin, bazı duyguların ve güvenin zaman zaman incinebildiğinin farkındayım. Bunu birkaç güzel cümleyle geçiştirmek ya da sana her şeyin hemen düzeleceğini söylemek istemiyorum. Çünkü senin bana duyduğun güven benim için çok kıymetli. Eğer bu güvenin bir kısmını eksilttiysem onu yeniden kazanmanın benim sorumluluğum olduğunu biliyorum. Belki bunun için zamana ihtiyacımız olacak, belki aynı şeyi defalarca davranışlarımla göstermem gerekecek. Ben bundan kaçmak istemiyorum. Sana verdiğim değeri yalnızca anlatmak değil, sana yaşatmak istiyorum. Bir gün geriye dönüp baktığında, kırılan yerlerin gerçekten onarıldığını ve sevgimin sözde kalmadığını hissetmeni istiyorum.",
      "Seni çok seviyorum benim güzel kelebeğim. Bunu yalnızca şu an aramız limoni olduğu için söylemiyorum. Sen benim hayatımda olduğun için, seni tanıdığım için, seninle bir gelecek hayal edebildiğim için seviyorum. Senin gülüşünü, sesini, bana kendini anlatışını, bazen küçücük bir şeyle bile günümü güzelleştirişini. Seni sen yapan şeyleri seviyorum. Ve bütün bunların yanında, sana karşı daha dikkatli olmayı, seni daha iyi anlamayı ve sevgimi sana daha doğru hissettirmeyi de istiyorum.",
      "Ben senin kalbinde güzel bir yerim olsun istiyorum hayatım. Sadece beni sevdiğin için değil, bana güvendiğin, ihtiyaç duyduğunda yanında bulduğun ve kendini benimle huzurlu hissettiğin için de. Bunun bir anda olmayacağını biliyorum ama sana bunu hissettirmekten vazgeçmeyeceğim.",
      "İyi ki hayatımdasın canımın içi. Senin benim için ne kadar kıymetli olduğunu bazen kelimelerle anlatmak yetmiyor. Umarım bundan sonra bunu sana daha çok davranışlarımla gösterebilirim. Çünkü sen benim için yalnızca çok sevdiğim kadın değil, sevgisine özen göstermek ve kalbini incitmemek için daha iyisini öğrenmek istediğim insansın.",
    ],
    closing: "Seni çok seviyorum birtanem. Hem bugün hem de birlikte yaşayacağımız bütün yarınlarda 🩵",
    signature: "Yusuf",
  },
  {
    id: "2026-10-11",
    title: "Yanındayım",
    date: "11 Ekim 2026",
    dateTime: "2026-10-11",
    music: {
      url: "https://youtu.be/oKJqORouB8w",
      videoId: "oKJqORouB8w",
      endSec: 225, // 3:45
    },
    greeting: "Hayatımın anlamı, birtanecik sevdiğim…",
    body: [
      "Öncelikle şunu bilmeni istiyorum hayatım, bugün konuştuklarımızın seni bu kadar üzmesini ben de istemezdim. Seni kırmak, kendini değersiz hissetmene sebep olmak ya da sana senden uzaklaşmak istediğimi düşündürmek benim isteyeceğim en son şeylerden biri. Çünkü ben senden uzaklaşmak istediğimi söylemedim. Ben, bazı şeyler yüzünden kendimi senden uzaklaştırılıyormuş gibi hissettiğimi anlatmaya çalıştım. Belki bunu anlatırken kendimi doğru ifade edemedim, belki ikimiz de birbirimizi anlamakta zorlandık ama içimde olan şey senin düşündüğün gibi senden vazgeçmek değildi.",
      "İzmir'e gelmek için sana müsait olup olmadığını sorduğumda aslında seninle görüşmeyi istiyordum. Seni görmek, seninle vakit geçirmek, biraz olsun yanında olmak istiyordum. Sana bunu sorarken senden gelecek cevabı da önemsiyordum. Çünkü insan sevdiği kişiyi görmek istediğinde yalnızca bir plan yapmıyor, o kişinin de kendisini görmek isteyip istemediğini merak ediyor. Ben de senin beni görmek istediğini hissetmek istedim. Bana “bakarız” dediğinde ne düşüneceğimi bilemedim. Belki senin aklında bambaşka şeyler vardı, belki beni kendimi mecbur hissetmekten korumaya çalışıyordun. Ama ben o an senin beni görmek isteyip istemediğini anlayamadım. Sonra da bunu sana kendi kırgınlığımın içinden anlatmaya çalıştım.",
      "Ben seninle bir şeyleri zorla yaşamak istemiyorum. Beni görmek zorundaymışsın, benim için bir şey yapmak zorundaymışsın ya da sırf söz verdin diye bir planı gerçekleştirmek zorundaymışsın gibi hissetmeni de istemem. Benim istediğim şey bunların mecburiyetten değil, ikimizin de içinden gelerek olması. Senin de benimle görüşmek istemen, benimle vakit geçirmekten mutlu olman, bazen senin de beni görmek için heveslenmen. Bunlar benim için kıymetli. Çünkü ben senin hayatında yalnızca yerine getirilmesi gereken bir sözün ya da yapılması gereken bir planın parçası olmak istemiyorum. Senin kendi isteğinle yanında tuttuğun, varlığına sevindiğin insan olmak istiyorum. Tıpkı benim seni kendi hayatımda istediğim gibi.",
      "Defalarca kez söylediğim gibi herhangi bir şey seni sevmediğim ya da senden vazgeçebileceğim anlamına gelmiyor. Tam tersine, sen benim için önemli olduğundan bu kadar çok takılıyorum sözlerine. Herhangi biriyle aramda böyle bir şey yaşasam belki üzerinde bu kadar durmam. Ama söz konusu sen olduğunda bazı şeyler içime dokunuyor. Çünkü ben seninle aramızdaki bağı önemsiyorum. Seninle geçirdiğim zamanı, yaptığımız planları, konuşmalarımızı, birbirimize anlattığımız küçücük şeyleri bile önemsiyorum. Seni hayatımda öylesine bulunan biri olarak görmüyorum ki seninle ilgili hissettiklerim de öylesine olsun.",
      "Bugün seni üzdüğüm için gerçekten üzgünüm. Özellikle de sözlerimin sende benden uzaklaşıyormuşum gibi bir his bırakmasına üzüldüm. Çünkü benim anlatmaya çalıştığım şey bu değildi. Ben seninle arama mesafe koymak değil, aramızdaki mesafenin neden oluştuğunu anlamak istiyorum. Aramızda mesafe oluştu derken telefonu kapatmaktan bahsediyorum. Bunu dert edinip aramıza bir mesafe koymaktan bahsetmiyorum.",
      "Seni seviyorum Zehram. Bunu yalnızca güzel günlerimizde değil, birbirimizi anlamakta zorlandığımız zamanlarda da bilmeni istiyorum. Benim için değerin bir tartışmayla, yanlış anlaşılmayla ya da bir kırgınlıkla değişemez. Sen benim hayatımda çok özel bir yere sahipsin.",
      "Ben seninle güzel günler yaşamak istiyorum. Birlikte planlar yapmak, birbirimizi görmek için heyecanlanmak, sıradan bir günü bile güzel bir anıya çevirmek istiyorum. Bazen senin bana, bazen benim sana koşarak geldiğimiz; ikimizin de kendini sevildiği kadar istendiğini de hissettiği bir ilişkimiz olsun istiyorum. Çünkü benim hayalim yalnızca birbirimizi sevmemiz değil, bu sevgiyi birbirimize hissettirebilmemiz.",
      "Seni çok seviyorum, canımın içi. Bugün yaşadığımız kırgınlığın sana olan sevgimi değiştirmediğini, senden uzaklaşmak istemediğimi ve aslında seninle aramızdaki şeyin daha güzel olmasını istediğimi bu mektupta tekrar tekrar dile getirmeye çalıştım.",
      "Her ne olursa olsun hiçbir şeyi tek başına çözmek zorunda değilsin. Her ne olursa olsun her zaman senin yanındayım. Buna inanmıyorsun şuan için farkındayım. Zamanla anlarsın.",
      "Son olarak misafirlerin suyunu yemeğini veriyorum demek benim için çok ayıp bir şey. Misafir dediğin evine gelen kişi hoş karşılanır , ikramda bulunulur vs. Bunun aksini yaptığını düşünmüyorum ama dediğim gibi ben bunu senden duymayı hiç beklemezdim.",
    ],
    closing: "Seni çok seviyorum, birtanem.",
    signature: "Yusuf",
  },
  {
    id: "2026-09-15",
    title: "100. Gün",
    date: "15 Eylül 2026",
    dateTime: "2026-09-15",
    music: {
      url: "https://www.youtube.com/watch?v=BkuGka1NNCc",
      videoId: "BkuGka1NNCc",
      endSec: 224, // 3:44
    },
    greeting: "Sevdiceğim ;",
    body: [
      "Bugün 100. günümüz. Hayatımın şuan için en güzel 100 günü. Bir süredir mektuplarım nerde diye soruyorsun. Mektupların bende hayatımın anlamı.",
      "Dün ve bugün çok yoğun bir süreçteydim. sana bunu anlatmak için çok sabırsızlanıyorum. Ama şimdi konumu bu değil.",
      "Seni ilk gördüğüm andan itibaren inşallah diye dua ettim. İnşallah anlaşırız. İnşallah beni sever. İnşallah benden hoşlanır vs. vs. Bugün çok şükür rabbim dualarımı kabul etmiş ve 100 gündür bir tanemle geçmiş.",
      "Sen benim için çok özelsin. Seni çok seviyorum. İyiki hayatımın bu 100 günü senle geçti. Her anı harika her anı çok güzeldi. Eğer hayırlısı ise rabbim ortak bir hayat yaşamamızı nasip etsin. Bu 100 günde anladığın en önemli şey. Seni ne kadar çok sevdiğim.",
    ],
    closing: "Seni çok seviyorum sevdiceğim.",
    signature: "Yusuf",
  },
  {
    id: "2026-09-10",
    title: "Telafi",
    date: "10 Eylül 2026",
    dateTime: "2026-09-10",
    music: {
      url: "https://www.youtube.com/watch?v=BkuGka1NNCc",
      videoId: "BkuGka1NNCc",
      endSec: 224, // 3:44
    },
    greeting: "Benim biricik sevdiğim.",
    body: [
      "Normalde mektuplarımda serzenişte bulunmam ama bu hafta beni biraz fazla üzdün. Ama çok şükür şuan için aramız çok iyi.",
      "Yarın annenin sonucunu öğreneceksin. Bu süreçte ilk süreçte yaptığımı asla tekrar etmeden çok bişeyden anlamasam da elimden geldiğince yanında olmaya çalıştım.İnşallah rabbim hayırlı haberler almayı nasip eder.",
      "Canımın içi , herşeyim insan her türlü hata yapabilir. Genelde de bunların dönüşü olur. Ama benimkinin pek dönüşü yok gibi. Zamanı geri alamıyorum. Ama bilmeni isterim ki , senle sadece iki anımın olmamasını istemezdim. Biride annenin ameliyat günü.Bazen mantıklı olayım derken saçmalıyorum. Hayatımın anlamı sen bana senden bazı şeyleri beklemiyorum dediğinde için sıkılıyor. Ama hak veriyorum. Ama ne olursa olsun yanında olavağımı bil.",
      "Canımın içi inşallah bununda üstesinde beraber geliriz. Seni her zaman çok sevdim ve seveceğim.",
    ],
    closing: "",
    signature: "Yusuf",
  },
  {
    id: "2026-09-03",
    title: "Huysuz ZRT",
    date: "3 Eylül 2026",
    dateTime: "2026-09-03",
    music: {
      url: "https://www.youtube.com/watch?v=BkuGka1NNCc",
      videoId: "BkuGka1NNCc",
      endSec: 224, // 3:44
    },
    greeting: "Hayatım,",
    body: [
      "Bu hafta birbirimizi kırdığımız , yanlış anladığımız ve birbirimizi istemeden üzdüğümüz zamanlar oldu.",
      "Ben kendi adıma  seni yeterince dinlemeden, kendimi anlatmaya fazla odaklandığımın farkındayım. Bazen haklı çıkmaya çalışırken senin ne hissettiğini ikinci plana attıyorum.",
      "Bu gerçekten doğru değil ama ben bizim için bir gelecek planı yapmaya çalışıyorum. Malesef ki bu pek kolay olmuyor.",
      "Seni kırmayı hiç istemiyorum. Ama bundan daha fazla ne istemiyorsun dersen. Senin benden  uzaklaşman derim.",
      "Ben seninle herşeyi aşabileceğimi düşünüyorum. her ne kadar kabul etmesende ben sırtımı sana dayamak senden güç alabileceğimi bilmek istiyorum",
      "Ben senden asla mükemmel olmanı beklemiyorum. Sende benden bunu beklemiyorsun. Ama bu hafta bir konuda eminim ki biz uzaklaşınca kavga ediyoruz.Ama ne olursa olsun",
    ],
    closing: [
      "Seni çook seviyorum.",
      "Bu hiçbir zaman değişmeyecek.",
    ],
    signature: "Yusuf",
  },
  {
    id: "2026-08-25",
    title: "Geç Mektup",
    date: "25 Ağustos 2026",
    dateTime: "2026-08-25",
    music: {
      url: "https://www.youtube.com/watch?v=BkuGka1NNCc",
      videoId: "BkuGka1NNCc",
      endSec: 224, // 3:44
    },
    greeting: "Zehra’m,",
    body: [
      "Bu mektubu sana geç yazıyorum. Sebebi izmirde olmam ama keşke önceden yazsaydım. Hayatımın anlamı seninle konuşmaya başladığımız günden itibaren bugüne kadar olan süreci hayal bile edemezdim.",
      "Seni tanıdıkça sadece sevdiğim bir insanı değil , hayatımda gerçekten olsun dediğim ve istediğin biri olduğuna eminim. Seninle konuştuğum dinlediğim ve sadece gözlerine baktığım zamanlar benim için çok kıymetli.",
      "İzmirde sana söylediğim gibi. Ben hayatımı paylaşabileceğim bir yol arkadaşımı bulmuş gibi hissediyorum.",
      "Daha yolun çok başındayız. Önümüzde inşallah çok güzel zamanlarımız olacak.",
      "7 Hazirandan bugüne kadar birgün bile aklımdan çıkmadın",
      "İyiki seni tanımışım.",
      "İyiki hayatımdasın.",
    ],
    closing: "Seni çok seviyorum.",
    signature: "Yusuf",
  },
  {
    id: "2026-08-15",
    title: "Son 6 Gün",
    date: "15 Ağustos 2026",
    dateTime: "2026-08-15",
    music: {
      url: "https://www.youtube.com/watch?v=WZemo2VoD4k",
      videoId: "WZemo2VoD4k",
      endSec: 265, // 4:25
    },
    greeting: "Zehra'm,",
    body: [
      "İzmir'e gelmeme altı gün kaldı.",
      "Ve sanırım bu sefer ilk gelişimden daha farklı bir heyecan var içimde. Çünkü artık seni ilk defa görmeye gitmiyorum. Seni tanıyorum, seni özlüyorum ve şimdi ikinci kez yanına geliyorum.",
      "Gerçi sen bana \"Seni görünce tanımam belki.\" diyorsun ya...",
      "Sen hiç merak etme, ben seni görünce tanırım. 😂",
      "Hatta sen beni tanımasan bile ben seni tanırım. O kadarını da kendime güveniyorum artık. Hem zaten seni ilk gördüğümde de tanımıştım. Şimdi aradan geçen bunca konuşmadan, bunca zamandan sonra seni tanımamam mümkün mü?",
      "7 Haziran'dan bugüne kadar düşündüğümde, aslında ne kadar çok şey yaşadığımızı fark ediyorum.",
      "Bir insanla konuşmaya başladık ve fark etmeden birbirimizin günlük hayatının içine girdik. Sonra konuşmalar uzadı, geceler uzadı, birbirimize anlatacak şeyler hiç bitmedi. Bir noktadan sonra gün içerisinde yaşadığım bir şeyi sana anlatmak istemeye, senin ne düşündüğünü merak etmeye başladım.",
      "Sonra seni gördüm.",
      "Ve bütün o konuşmaların karşısında gerçek bir Zehra vardı.",
      "İlk buluşmadan sonra da benim için bir şey değişti. Seni sadece konuştuğum bir insan olarak değil, gerçekten hayatımda görmek istediğim bir kadın olarak görmeye başladım.",
      "Şimdi ikinci kez İzmir'e gelirken bunu çok daha net hissediyorum.",
      "Seni görmek için gün sayıyorum.",
      "Seninle birkaç gün geçirmek, yine saatlerce konuşmak, birlikte bir yerlere gitmek, yemek yemek, yürümek, gülmek... Bunların hiçbirinin benim için küçük bir anlamı yok.",
      "Ben seninle vakit geçirmekten gerçekten çok büyük bir mutluluk duyuyorum.",
      "Hatta bazen sadece seninle konuşmuş olmak bile günümü güzelleştiriyor.",
      "Bunu özellikle söylemek istiyorum çünkü benim için senin hayatımdaki yerin artık normal bir yer değil.",
      "Aklımda herkesin girebildiği bir bölüm var.",
      "Bir de senin için ayrılmış, kimsenin yerini alamayacağı, sadece sana ait bir yer var.",
      "Sen tam olarak oradasın.",
      "Aklımın en derininde, kendime bile her zaman anlatamadığım bir yerde.",
      "Oraya seni ben koydum.",
      "Ve oradaki yerini de başka hiçbir şeyle doldurmak istemiyorum.",
      "Belki sana bazen bunu yeterince belli edemiyorum. Belki bazı şeyleri söylerken istediğim kadar düzgün ifade edemiyorum. Ama sana karşı hissettiğim şeyin ne kadar büyüdüğünü ben kendi içimde çok net görüyorum.",
      "Çünkü seni düşünmediğim bir gün neredeyse yok.",
      "Bir şey olduğunda sana anlatmak istiyorum.",
      "Bir şey gördüğümde senin ne diyeceğini düşünüyorum.",
      "Bir yere gittiğimde sen olsan ne yapardın diye aklımdan geçiriyorum.",
      "Ve bazen hiçbir sebep yokken sadece seni özlüyorum.",
      "Bütün bunların benim için ne anlama geldiğini artık biliyorum.",
      "Ben seni çok seviyorum.",
      "Ayrıca seninle geçirdiğim hiçbir zamandan pişman değilim.",
      "Her şeyin çok güzel olduğu zamanlarımız da oldu, ikimizin de birbirini anlamakta zorlandığı zamanlarımız da. Bazen birbirimizi kırdık, bazen saçma sapan şeylerin içinde kaldık.",
      "Ama bugün dönüp baktığımda bazı durumların haricinde hiçbirine \"Keşke yaşanmasaydı.\" demiyorum.",
      "Çünkü bütün bunların içerisinde seni tanıdım.",
      "Seni biraz daha anladım.",
      "Kendimi de biraz daha tanıdım.",
      "Ve bütün bunların sonunda sevgim sana karşı asla eksilmedi.",
      "Tam tersine.",
      "Daha da büyüdü.",
      "Şimdi geleceği düşündüğümde de seni orada görmek bana çok normal geliyor.",
      "Hatta bazen kendimi yakalıyorum; daha ortada hiçbir şey yokken bile seninle ileride nasıl bir hayatımız olur diye düşünüyorum.",
      "Birlikte yaşayacağımız evi, beraber kahvaltı etmeyi, gün sonunda birbirimize günümüzü anlatmayı...",
      "Ama benim asıl istediğim bunların kendisi değil.",
      "Ben hayatın kendisini seninle paylaşmak istiyorum.",
      "İyi bir günüm olduğunda da sen ol.",
      "Canım bir şey istediğinde de sen ol.",
      "Bir yere gitmek istediğimde de sen ol.",
      "Yıllar sonra bile başıma gelen saçma bir şeyi ilk sana anlatmak isteyeyim.",
      "Benim için gelecek fikrinin güzel tarafı bu.",
      "İçinde sen olması.",
      "Ve galiba bu yüzden İzmir'e ikinci kez geliyor olmak benim için sadece birkaç gün birlikte vakit geçirmek değil.",
      "Ben o birkaç günü çok önemsiyorum.",
      "Çünkü seni özledim.",
      "Seni görmek istiyorum.",
      "Yüzüne bakmak, yanında oturmak ve yine saatlerce konuşmak istiyorum.",
      "Altı gün sonra bunların hepsi gerçek olacak.",
      "Ve sen o gün beni görüp \"Bu kimdi ya?\" falan dersen gerçekten çok gülerim.",
      "Ama ben seni görünce kesin tanırım.",
      "Hem de hiç düşünmeden.",
      "Çünkü sen artık benim için sadece yüzünü bildiğim biri değilsin.",
      "Sen benim zihnimin en derininde kendine ait bir yeri olan kadınsın.",
      "Ve senin yerinin başka biriyle doldurulması gibi bir ihtimal de yok.",
      "Ben seni çok seviyorum Zehra.",
      "Bazen bunu tek bir cümleyle anlatmaya çalışıyorum ama yetmiyor.",
      "O yüzden bugün sadece şunu bilmeni istiyorum:",
      "7 Haziran'dan bugüne hayatımda seninle ilgili biriken ne varsa, hepsinin toplamı benim için çok değerli.",
      "Konuşmalarımız, gecelerimiz, ilk buluşmamız, birlikte geçirdiğimiz zamanlar, seni özlediğim günler, seni düşündüğüm anlar...",
      "Hepsi.",
      "Ve şimdi ikinci kez yanına geliyorum.",
      "Bu defa seni tanımaya değil.",
      "Seni özlemiş olarak geliyorum.",
    ],
    closing: [
      "Altı gün sonra görüşürüz güzelim.",
      "Ve merak etme...",
      "Ben seni tanırım. ❤️",
    ],
    signature: "Yusuf",
  },
  {
    id: "2026-08-09",
    title: "İkinci Ayımız <3",
    date: "9 Ağustos 2026",
    dateTime: "2026-08-09",
    music: {
      url: "https://www.youtube.com/watch?v=cEXdef-P-IY",
      videoId: "cEXdef-P-IY",
      endSec: 245, // 4:05
    },
    greeting: "Zehra,",
    body: [
      "Sana bu kez seni ne kadar sevdiğimi anlatmaya çalışmak yerine, sende sevdiğim şeyleri anlatmak istiyorum.",
      "Çünkü bazen bir insanı sevmenin sebebi tek bir şey olmuyor. Bir bakışı, bir cümlesi, bir düşüncesi, bir tepkisi, hatta bazen hiçbir şey yapmadan sadece hayatında oluşu bile insanın içinde bir yere dokunuyor.",
      "Sende benim için böyle olan çok fazla şey var.",
      "Mesela sen bir şey anlatırken konuyu anlatış biçimini seviyorum. Bir şeyi gerçekten önemsediğinde sesindeki değişikliği seviyorum. Bir konu hakkında düşünürken o kendine has ciddiyetini seviyorum. Bir şey hoşuna gittiğinde bunu belli edişini seviyorum. Bazen hiç farkında olmadan yaptığın küçük şeyleri bile seviyorum.",
      "Belki sen bunların çoğunu kendinde fark etmiyorsun.",
      "Ben fark ediyorum.",
      "Ve galiba seni tanımanın benim için en güzel taraflarından biri de bu. Seni sadece herkesin gördüğü hâlinle değil, zaman içerisinde fark ettiğim küçük ayrıntılarınla tanımak.",
      "Bir insanın güzelliğinin sadece yüzünde olmadığını sen bana çok güzel gösterdin.",
      "Seninle konuşurken bazen bir konudan diğerine geçiyoruz ve konuşmanın nereye gittiğini ikimiz de bilmiyoruz. Ama ben o anları seviyorum. Çünkü seninle konuşmanın güzel tarafı, her zaman önemli bir şey konuşmamız değil. Seninle konuşuyor olmam.",
      "Bazen telefonu kapatmak istemediğimiz o geceleri düşünüyorum.",
      "Aslında ortada olağanüstü bir şey yok. İki insan konuşuyor. Sonra birimiz yoruluyor, sesi yavaşlıyor, cümleler azalıyor. Ama ben o anlarda bile kendimi çok huzurlu hissediyorum.",
      "Bir insanın sesini duymanın insana bu kadar iyi gelebileceğini bilmiyordum.",
      "Şimdi biliyorum.",
      "Seninle ilgili sevdiğim başka bir şey de şu:",
      'Sen benim hayatıma girdiğinden beri bazı şeylere bakışım değişti. Gün içerisinde başıma gelen bir şeyi yaşarken, "Bunu Zehra\'ya anlatsam ne derdi?" diye düşündüğüm oluyor. Bir şey gördüğümde "Bunu kesin ona göndermeliyim." dediğim oluyor.',
      "Yani sen sadece konuştuğum biri olmadın.",
      "Düşüncelerimin arasına girdin.",
      "Ve bunu nasıl yaptığını bile anlamadım.",
      "Belki de seni benim için bu kadar özel yapan şeylerden biri de bu. Seni düşündüğümde içimde yalnızca özlemek olmuyor; sana anlatmak istediğim şeyler, birlikte yapmak istediğim şeyler, paylaşmak istediğim anlar geliyor aklıma.",
      "Sana baktığımda sadece sevdiğim bir kadını görmüyorum. Aynı zamanda yanında kendim olabildiğim, saatlerce konuşabildiğim, merak ettiğim, öğrenmek istediğim ve hayatını gerçekten önemsemeye başladığım bir insan görüyorum.",
      "Ben seni değiştirmek istemiyorum.",
      "Seni kendime benzetmek de istemiyorum.",
      "Senin Zehra olmanı seviyorum.",
      "Kendi düşüncelerinle, kendi karakterinle, kendi hayallerinle, kendi doğrularınla...",
      'Hatta belki seni sevmenin en güzel taraflarından biri de bu. Seni tanıdıkça, "Benim istediğim insan tam olarak böyle olmalı." diye bir kalıba sokmak yerine, sen olduğun için seni sevmeyi öğreniyorum.',
      "Zehra, bazen seni düşünürken geleceğin çok uzak bir şey olmadığını hissediyorum.",
      "Çünkü benim aklımdaki gelecek, büyük ve gösterişli şeylerden oluşmuyor.",
      "Birlikte geçirilen sıradan sabahlar geliyor aklıma.",
      "Aynı masada oturup kahvaltı etmek, gün içerisinde birbirimize küçük şeyler anlatmak, akşam eve geldiğimizde birbirimizin gününü sormak, yorulduğumuzda yan yana sessizce oturmak...",
      "Bir gün seninle yaşlanmayı düşündüğümde beni mutlu eden şey tam olarak bunlar.",
      "Yıllar geçmesine rağmen sana gün içerisinde başıma gelen saçma bir şeyi anlatmak istemek.",
      "Birlikte güldüğümüz şeyleri yıllar sonra bile hatırlamak.",
      "Bir yere gittiğimizde yine birbirimize dönüp fikir sormak.",
      "Ve bütün bunların arasında, hayatın içinde birbirimizin en yakını olmak.",
      "Ben aslında böyle bir ömür istiyorum.",
      "İçinde sen olan, seninle anlam kazanan bir hayat.",
      "Bugün sana bunları yazarken içimden geçen en basit şey ise şu:",
      "Seni hayatımda çok özel bir yere koydum Zehra.",
      "Seni özlediğimde bunu bütün kalbimle hissediyorum. Seni gördüğümde içimde oluşan mutluluğu tarif etmekte zorlanıyorum. Sesini duyduğumda günümün değiştiğini fark ediyorum.",
      "Ve bütün bunların arasında sana karşı hissettiğim şey her geçen gün biraz daha derinleşiyor.",
      "Belki sana her şeyi her zaman istediğim kadar güzel anlatamıyorum.",
      "Ama sana verdiğim değerin ne kadar büyük olduğunu bilmeni istiyorum.",
      "Çünkü sen benim için yalnızca güzel günlerimde hatırladığım biri değilsin.",
      "Hayatımın içinde yerini çoktan almış, varlığına alıştığım ve yokluğunu hissettiğim insansın.",
      "Seni seviyorum Zehra.",
      "Sana karşı hissettiğim şeyin en güzel tarafı da, bunu her gün yeniden hissetmem.",
      "Bazen bir mesajında, bazen sesinde, bazen bir bakışında, bazen de seni özlediğimi fark ettiğim o küçücük anda...",
      "Ve sanırım sana söylemek istediğim son şey şu:",
      "Ben hayatımın güzel taraflarını seninle paylaşmak istiyorum.",
      "Sevincimi, heyecanımı, hayallerimi, sıradan günlerimi...",
      "Birlikte biriktireceğimiz anıları düşünüyorum.",
      'Ve bütün bunların içinde en çok da, yıllar sonra bugünleri hatırlayıp "İyi ki birbirimizi bulmuşuz." diyebilmeyi istiyorum.',
      "İyi ki varsın Zehra.",
      "İyi ki hayatımdasın.",
    ],
    closing: "Seni çok seviyorum.",
    signature: "Yusuf",
  },
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
let musicWanted = false;
let musicWatchTimer = null;
let ignoreEndedUntil = 0;
let letterRevealTimer = null;
let petalCleanupTimer = null;
let letters = [];
let activeLetterId = START_LETTER_ID;
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
      letters.sort((a, b) => String(b.dateTime).localeCompare(String(a.dateTime)));
      activeLetterId = START_LETTER_ID;
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

    // Her girişte Geç Mektup'tan başla
    activeLetterId = letters.some((item) => item.id === START_LETTER_ID)
      ? START_LETTER_ID
      : letters[0]?.id || START_LETTER_ID;
    saveLetters();
  } catch (_) {
    letters = structuredClone(SEED_LETTERS);
    letters.sort((a, b) => String(b.dateTime).localeCompare(String(a.dateTime)));
    activeLetterId = START_LETTER_ID;
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

function isLetterAvailable(item) {
  if (!item?.availableFrom) return true;
  return Date.now() >= Date.parse(item.availableFrom);
}

function getVisibleLetters() {
  return letters.filter(isLetterAvailable);
}

function getActiveLetter() {
  const visible = getVisibleLetters();
  return (
    visible.find((item) => item.id === activeLetterId) ||
    visible.find((item) => item.id === START_LETTER_ID) ||
    visible[0] ||
    SEED_LETTERS.find((item) => item.id === START_LETTER_ID) ||
    SEED_LETTERS[0]
  );
}

function scheduleLetterUnlocks() {
  for (const item of letters) {
    if (!item.availableFrom) continue;
    const delay = Date.parse(item.availableFrom) - Date.now();
    if (delay > 0 && delay < 2 ** 31 - 1) {
      window.setTimeout(renderArchiveList, delay + 500);
    }
  }
}

// Uyku/arka plandan dönen cihazlarda zamanlayıcı kaçabilir
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) renderArchiveList();
});

function isNewArchiveLetter(item) {
  return item.id === NEW_BADGE_LETTER_ID;
}

function getMusicConfig() {
  const current = getActiveLetter();
  const music = current?.music || {};
  const videoId =
    extractYouTubeId(music.url) ||
    extractYouTubeId(music.videoId) ||
    DEFAULT_MUSIC.videoId;

  return {
    videoId,
    endSec: Number(music.endSec) || DEFAULT_MUSIC.endSec,
  };
}

function extractYouTubeId(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  // Düz video id
  if (/^[\w-]{11}$/.test(raw)) return raw;

  try {
    const url = new URL(raw);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }
    const fromQuery = url.searchParams.get("v");
    if (fromQuery) return fromQuery;
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIndex = parts.findIndex((part) => part === "embed" || part === "shorts");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
  } catch (_) {
    /* ignore */
  }

  const match = raw.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return match?.[1] || "";
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

  archiveList.innerHTML = getVisibleLetters()
    .map((item) => {
      const isActive = item.id === activeLetterId;
      const isNew = isNewArchiveLetter(item);
      return `
        <li>
          <button
            type="button"
            class="archive-item${isActive ? " is-active" : ""}${isNew ? " is-new" : ""}"
            data-letter-id="${escapeHtml(item.id)}"
            aria-current="${isActive ? "true" : "false"}"
          >
            <span class="archive-item-top">
              <span class="archive-item-title">${escapeHtml(item.title || item.date)}</span>
              ${isNew ? '<span class="archive-badge">Yeni</span>' : ""}
            </span>
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
  if (!getVisibleLetters().some((item) => item.id === id)) return;

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
  musicWanted = false;
  musicStarted = false;
  destroyMusicPlayer();
}

function stopMusic() {
  musicWanted = false;
  musicStopped = true;
  destroyMusicPlayer();
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

function forcePlayMusic() {
  if (!ytPlayer || !isOpen || musicStopped) return;

  try {
    ytPlayer.unMute?.();
    ytPlayer.setVolume?.(100);
    ytPlayer.playVideo();
  } catch (_) {
    /* ignore */
  }
}

function destroyMusicPlayer() {
  clearMusicWatch();

  if (ytPlayer) {
    try {
      ytPlayer.destroy?.();
    } catch (_) {
      /* ignore */
    }
    ytPlayer = null;
  }

  const mount = document.querySelector(".music-embed");
  if (mount) {
    mount.innerHTML = '<div id="youtube-player"></div>';
  }
}

function playLetterMusic() {
  musicWanted = true;
  musicStopped = false;
  musicStarted = false;
  ignoreEndedUntil = Date.now() + 2000;

  if (!window.YT || !window.YT.Player) {
    return;
  }

  const { videoId, endSec } = getMusicConfig();
  if (!videoId) return;

  destroyMusicPlayer();

  ytPlayer = new YT.Player("youtube-player", {
    width: 320,
    height: 180,
    videoId,
    playerVars: {
      autoplay: 1,
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
      onReady(event) {
        try {
          event.target.unMute();
          event.target.setVolume(100);
          event.target.playVideo();
        } catch (_) {
          /* ignore */
        }

        // Ses engellenirse mute -> play -> unmute
        window.setTimeout(() => {
          if (!musicWanted || musicStopped || !isOpen || !ytPlayer) return;
          try {
            if (ytPlayer.getPlayerState?.() !== 1) {
              ytPlayer.mute?.();
              ytPlayer.playVideo?.();
              window.setTimeout(() => {
                if (!musicWanted || musicStopped || !isOpen) return;
                forcePlayMusic();
              }, 400);
            }
          } catch (_) {
            /* ignore */
          }
        }, 500);
      },
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  // 1 = PLAYING
  if (event.data === 1) {
    musicStarted = true;
    try {
      ytPlayer.unMute?.();
      ytPlayer.setVolume?.(100);
    } catch (_) {
      /* ignore */
    }
    watchMusicProgress();
  }

  // 0 = ENDED
  if (event.data === 0) {
    if (Date.now() < ignoreEndedUntil) return;
    stopMusic();
  }
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  if (musicWanted && isOpen) {
    playLetterMusic();
  }
};

document.addEventListener("pointerdown", () => {
  if (isOpen && !musicStopped) forcePlayMusic();
});

document.addEventListener("keydown", () => {
  if (isOpen && !musicStopped) forcePlayMusic();
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

const AMBIENT_HEART_PALETTE = [
  ["#e3f0fc", "#8fb8e4", "#4a7cbc"],
  ["#d7e8fb", "#7eafdf", "#3f74b5"],
  ["#cfe3f8", "#74a6d8", "#3a6aa8"],
  ["#c9d9f5", "#7f9fd6", "#4b6eae"],
  ["#eaf4ff", "#a6c8ec", "#5d8fcc"],
];
const AMBIENT_HEART_MAX = 16;

let countdownTimer = null;
let ambientHeartTimer = null;

function pad2(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  if (!countdownGrid) return;

  const diff = MEETING_AT.getTime() - Date.now();

  if (diff <= 0) {
    countdownGrid.hidden = true;
    if (countdownDone) countdownDone.hidden = false;
    window.clearInterval(countdownTimer);
    countdownTimer = null;
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const values = {
    days: String(Math.floor(totalSeconds / 86400)),
    hours: pad2(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad2(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad2(totalSeconds % 60),
  };

  for (const [unit, value] of Object.entries(values)) {
    const el = countdownGrid.querySelector(`[data-unit="${unit}"]`);
    if (el && el.textContent !== value) el.textContent = value;
  }
}

function spawnAmbientHeart() {
  if (!ambientHearts || document.hidden) return;
  if (ambientHearts.childElementCount >= AMBIENT_HEART_MAX) return;

  const mobile = window.matchMedia("(max-width: 640px)").matches;
  const heart = document.createElement("span");
  heart.className = "ambient-heart";
  heart.innerHTML = createHeartSvg(pick(AMBIENT_HEART_PALETTE));
  heart.style.setProperty("--x", `${rand(2, 98)}%`);
  heart.style.setProperty("--size", `${rand(mobile ? 14 : 16, mobile ? 30 : 38)}px`);
  heart.style.setProperty("--duration", `${rand(10, 17)}s`);
  heart.style.setProperty("--sway", `${rand(-40, 40)}px`);
  heart.style.setProperty("--rot", `${rand(-18, 18)}deg`);
  heart.style.setProperty("--alpha", `${rand(0.45, 0.85)}`);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
  ambientHearts.appendChild(heart);
}

function startAmbientHearts() {
  if (!ambientHearts || prefersReducedMotion || ambientHeartTimer) return;

  for (let i = 0; i < 4; i += 1) {
    window.setTimeout(spawnAmbientHeart, i * 600);
  }

  const mobile = window.matchMedia("(max-width: 640px)").matches;
  ambientHeartTimer = window.setInterval(spawnAmbientHeart, mobile ? 1300 : 950);
}

function goToLetters() {
  document.body.classList.remove("is-landing");
  if (archiveMenu) archiveMenu.hidden = false;
  if (stage) stage.hidden = false;

  if (landing) {
    landing.setAttribute("aria-hidden", "true");
    window.setTimeout(() => {
      landing.hidden = true;
    }, prefersReducedMotion ? 0 : 600);
  }

  window.setTimeout(() => envelopeBtn?.focus({ preventScroll: true }), 50);
}

goLettersBtn?.addEventListener("click", goToLetters);

loadLetters();
renderActiveLetter();
scheduleLetterUnlocks();
updateCountdown();
countdownTimer = window.setInterval(updateCountdown, 1000);
startAmbientHearts();
