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
// Türkiye saatiyle 28 Kasım 2026, 17:00
const MEETING_AT = new Date("2026-11-28T17:00:00+03:00");
const DEFAULT_MUSIC = { videoId: "T1bDNsX6_lA", endSec: 64 };
const START_LETTER_ID = "2026-08-25"; // Geç Mektup — varsayılan başlangıç
const NEW_BADGE_LETTER_ID = "2026-11-22"; // yalnızca bu mektupta "Yeni" rozeti
const LETTER_REVEAL_MS = 1250;
const PETAL_CLEANUP_MS = 11000;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SEED_LETTERS = [
  {
    id: "2026-11-22",
    title: "Son 6 Gün",
    date: "22 Kasım 2026",
    dateTime: "2026-11-22",
    music: {
      url: "https://www.youtube.com/watch?v=BkuGka1NNCc",
      videoId: "BkuGka1NNCc",
      endSec: 224, // 3:44
    },
    greeting: "Benim bir tanecik Zehram,",
    body: [
      "Bu hafta sana mektup yazarken içimde her zamankinden biraz daha farklı duygular var. Normalde sana bir mektup yazacağım zaman yüzümde bir gülümseme olur. Seni ne kadar sevdiğimi, seninle ilgili kurduğum hayalleri, seni düşündüğümde içimde oluşan o güzel heyecanı anlatmak için sabırsızlanırım. Bugün de seni çok seviyorum. Hatta belki de bu kadar sevdiğim için içimde biriken bazı şeyleri sana anlatmak istiyorum.",
      "Birtanem, bu hafta birbirimizi biraz fazla yorduk galiba. Bazen anlaşamadık, bazen istemeden kırıldık, bazen de birbirimize söylemek istediğimiz şeyleri doğru anlatamadık. Ama bütün bunların içinde benim içime dokunan küçük bir şey var. Sen bana çok değer verdiğini söylüyorsun ve ben buna inanmak istiyorum. Yalnız bazen bu değeri senin davranışlarında, senin hayatındaki yerimde benim sana verdiğim kadar güçlü hissedemiyorum. Belki sevgimizi gösterme şeklimiz farklıdır, belki de ben bazı şeyleri gereğinden fazla önemsiyorumdur. Bilmiyorum. Bildiğim tek şey, sen benim hayatımda öyle kıymetli bir yerdesin ki senin en küçük üzüntünü bile kendime dert edinebiliyorum. Ve içimden bazen, keşke ben de onun gözünde böyle kıymetli olsam, keşke benim kırgınlığım da onun kalbine benimki kadar dokunsa, diyorum. Bunu sana bir sitem olsun diye değil, içimdeki küçücük bir eksikliği bil diye anlatıyorum. Çünkü ben bir gün senin de bana verdiğin değeri, benim sana verdiğim değeri hissettiğim kadar derinden hissedebilmeyi çok istiyorum.",
      "Gelecek hafta ailenle tanışacağım. Bunu düşündükçe içimdeki heyecan hâlâ ilk günkü gibi. Bir yandan günler geçsin istiyorum, bir yandan da o gün geldiğinde nasıl davranacağımı düşünüyorum. Daha birkaç ay önce birbirimizi tanımıyorken şimdi senin ailenin karşısına çıkacak olmam bana inanılmaz geliyor. Seni büyüten, bugün olduğun insan olmanda emeği olan insanlarla tanışacağım. Bu benim için sıradan bir ziyaret değil birtanem. Seninle ilgili ne kadar ciddi ve güzel niyetler taşıdığımın hayatımızdaki en anlamlı adımlarından biri.",
      "Bazen kendi kendime gülüyorum. Acaba annenle baban beni nasıl karşılayacak? İlk konuşmamız nasıl olacak? Heyecanımı belli edecek miyim? Bir de senin o gün bana nasıl bakacağını merak ediyorum. Belki göz göze geldiğimizde gülmemek için kendimizi zor tutacağız. Belki de sen benim heyecanımı fark edip sonrasında günlerce benimle uğraşacaksın. Ama olsun, senin yüzünden yaşadığım bu tatlı heyecana da razıyım. Hem en damat olacağımı söylemiştim, sözümün arkasındayım.",
      "Zehram, bazen 7 Haziran'dan bugüne kadar yaşadıklarımızı düşünüyorum. İlk konuşmalarımızı, birbirimizi tanımaya çalıştığımız günleri, ilk buluşmamızı, birbirimize alışmamızı… Şimdi ise hayatımızın çok daha farklı bir dönemine doğru ilerliyoruz. Bütün bunların içinde en çok hoşuma giden şey, seni tanıdıkça seninle ilgili hayallerimin azalmak yerine çoğalması. Seni hayatımda yalnızca bugün değil, yıllar sonra da görmek istiyorum. Aynı sofrada oturduğumuz, birbirimize günümüzü anlattığımız, bazen saçma sapan şeylere güldüğümüz, bazen de birbirimize sarılıp bütün yorgunluğumuzu unuttuğumuz bir hayat hayal ediyorum.",
      "Biliyor musun kelebeğim, seninle ilgili kurduğum hayallerin çoğu aslında çok sıradan. Ama ben o sıradanlığın içinde senin olmanı seviyorum. Birlikte alışverişe gitmeyi, ne yiyeceğimize karar verememeyi, bazen birbirimize takılmayı, bazen senin huysuzluklarını çekmeyi, bazen de benim seni güldürmek için türlü saçmalıklar yapmamı… İnsan sevdiği kişiyle yalnızca özel günleri değil, hayatın bütün küçük ayrıntılarını paylaşmak istiyormuş. Ben bunu seninle öğrendim.",
      "Bir tanem, seninle ilgili hissettiklerimin en güzel tarafı, hâlâ seni düşünürken heyecanlanıyor olmam. Seni göreceğim günü beklerken içimde oluşan o sabırsızlık, sesini duyduğumda yüzümde beliren gülümseme, seninle ilgili güzel bir gelişme olduğunda yaşadığım mutluluk… Bunların hepsi benim için çok kıymetli. Ve ben bu duyguların yıllar geçse de hayatımızda kalmasını istiyorum.",
      "İnşallah gelecek hafta hepimiz için çok güzel geçer. İnşallah ailenle güzel bir tanışmamız olur. İnşallah bugün heyecanla beklediğimiz bu günleri ileride birlikte hatırlayıp gülümseriz. Belki bir gün kendi evimizde otururken sana dönüp, \"Hatırlıyor musun, ailenle tanışmadan önce ne kadar heyecanlanmıştım?\" derim. Sen de büyük ihtimalle yine benimle dalga geçersin. Ama ben o gün de bugünkü kadar mutlu olmayı isterim.",
      "Sana karşı hissettiğim sevginin ne kadar büyük olduğunu anlatmak için bugüne kadar çok fazla mektup yazdım. Belki daha da yüzlercesini yazacağım. Ama her mektubumda değişmeyen bir şey olacak: Ben seni hayatımda olduğun için, seninle bir gelecek düşünebildiğim için ve seni tanıdığım her yeni günde yeniden sevebildiğim için çok seviyorum.",
      "Rabbim hakkımızda hayırlısını nasip etsin benim güzel sevdiceğim. İnşallah bugün kurduğumuz hayaller, yarın birlikte yaşayacağımız güzel hatıralara dönüşür.",
    ],
    closing: [
      "Seni çok seviyorum benim bir tanecik Zehram.",
      "Gelecek hafta seni göreceğim, aileni tanıyacağım ve seninle güzel bir anımız daha olacak. Şimdiden sabırsızlanıyorum.",
    ],
    signature: "Seni çok seven, seninle ilgili her güzel gelişmede çocuklar gibi sevinen Yusuf'un. ❤️",
  },
  {
    id: "2026-11-15",
    title: "Tanışma Haberi",
    date: "15 Kasım 2026",
    dateTime: "2026-11-15",
    music: {
      url: "https://www.youtube.com/watch?v=ZeS7Fjk2sKk",
      videoId: "ZeS7Fjk2sKk",
      endSec: 239, // 3:59
    },
    greeting: "Benim güzel Zehram,",
    body: [
      "Bu ayın sonunu düşündükçe içimde neler olup bittiğini bir bilsen… Bir yandan günler bir an önce geçsin istiyorum, bir yandan da o gün geldiğinde nasıl davranacağımı, ne söyleyeceğimi, heyecanımı ne kadar belli edeceğimi düşünüyorum. Hatta bazen kendi kendime gülüyorum. Seninle saatlerce konuşabilen, sana söyleyecek sözü hiç bitmeyen ben, ailenle tanışacağım günü düşününce şimdiden söyleyeceğim cümleleri kafamda prova ediyorum.",
      "Garip değil mi birtanem? Seni tanımadan önce varlığından bile haberdar olmadığım insanlar, bugün benim için böylesine önemli bir hâle geldi. Annenin, babanın karşısına çıkacak olmak beni heyecanlandırıyor. Çünkü onlar benim için yalnızca tanışacağım insanlar değil. Onlar benim bu kadar sevdiğim, hayatımda bu kadar kıymetli bir yere koyduğum kadının ailesi. Senin büyüdüğün evin, çocukluğunun, bugün olduğun insanın bir parçası olan insanlarla tanışacağım. Bunu düşündüğümde bile yüzümde bir gülümseme oluşuyor.",
      "Senden saklayacak değilim, biraz da geriliyorum. Acaba nasıl karşılanacağım, hakkımda ne düşünecekler, kendimi doğru anlatabilecek miyim? İlk birkaç dakika nasıl geçecek? Bunların hepsi aklımdan geçiyor. Belki normalde hiç düşünmeyeceğim ayrıntıları bile düşünüyorum. Ama bu gerginliğin sebebi korkmam değil hayatım. Ben bu tanışmanın güzel geçmesini gerçekten çok istiyorum. Çünkü seninle ilgili hiçbir şeyi gelişigüzel yaşamıyorum. Hele ki ailelerimizin de dâhil olmaya başladığı böyle bir dönemi…",
      "Bir de işin en güzel tarafı var. Bütün bu heyecanın arasında öyle mutluyum ki! Bazen durup kendi kendime soruyorum: Gerçekten bu noktaya geldik mi biz? 7 Haziran'da başlayan konuşmalarımız bizi buraya mı getirdi? O günlerde seninle konuşabilmek için heyecanlanan ben, şimdi ailenle tanışmak için gün sayıyorum. Üstelik bu kez heyecanım yalnızca seni görecek olmaktan kaynaklanmıyor. Senin hayatında biraz daha yakından yer alacak olmanın mutluluğunu da yaşıyorum.",
      "Hatırlıyor musun bilmiyorum, ilk zamanlarımızda içimden hep dualar ediyordum. Anlaşabilecek miyiz, birbirimizi sevecek miyiz, acaba her şey güzel ilerleyecek mi diye… Şimdi dönüp baktığımda o günlerde kurduğum bazı hayallerin yavaş yavaş gerçeğe dönüşüyor olması beni çok duygulandırıyor. Rabbime şükrediyorum. İnşallah bundan sonrası da ikimiz için hayırlı ve güzel olur.",
      "Biliyor musun kelebeğim, bazen seninle ilgili öyle bir heyecana kapılıyorum ki kendimi durduramıyorum. Daha ayın sonu gelmeden o günü defalarca yaşadım kafamda. Kapıdan girişimi, ilk selamlaşmamızı, oturup sohbet etmemizi… Hatta senin bana bakıp heyecanımı anlayacağını düşünüyorum. Muhtemelen sonrasında benimle biraz dalga da geçersin. Ama geç bakalım, senin yüzünden bu hâldeyim zaten. ❤️",
      "Şaka bir yana canımın içi, benim için bu tanışmanın anlamı çok büyük. Çünkü ben seni hayatımın gelip geçici bir dönemine sığdırmıyorum. Seni sevdiğimi söylerken ne kadar ciddi olduğumu sen biliyorsun. Seninle ilgili niyetimin, kurduğum hayallerin ve sana duyduğum sevginin ne kadar gerçek olduğunu da biliyorsun. Şimdi bunların hayatımızda karşılık bulmaya başlaması beni hem heyecanlandırıyor hem de tarifsiz bir şekilde mutlu ediyor.",
      "Bir şey daha var sana söylemek istediğim. Ben ailenle tanışırken kendimi olduğumdan farklı göstermeye çalışmak istemiyorum. Beni olduğum gibi tanısınlar istiyorum. Elbette kusurlarım var, eksiklerim var, bazen gereğinden fazla heyecanlanıyorum, bazen de söylemek istediğim şeyleri tam olarak anlatamıyorum. Ama bir konuda içim çok rahat: Kızlarını ne kadar sevdiğimi ve ona karşı ne kadar güzel niyetler taşıdığımı biliyorum. Umarım zamanla onlar da bunu görürler. Bir de en damat ben olacağım.",
      "Zehram, seninle ilgili en çok hoşuma giden şeylerden biri de bu aslında. Bana daha önce yaşamadığım heyecanlar yaşatıyorsun. Seni ilk göreceğim günü beklemek başka güzeldi, sana yeniden kavuşacağım günü beklemek başka… Şimdi ise bambaşka bir heyecanın içindeyim. Her defasında seni sevmenin yeni bir tarafıyla karşılaşıyorum. Ve inan bana, bu duyguların hiçbirinden vazgeçmek istemiyorum.",
      "Bu ayın sonunda nasıl bir gün geçireceğimizi henüz bilmiyorum. Belki düşündüğümden çok daha rahat olacağım, belki heyecandan bazı cümleleri birbirine karıştıracağım. Ama o günün sonunda sana dönüp gülümseyebilmek, seninle bu güzel adımı da yaşamış olmak bana çok iyi gelecek.",
      "Birtanem, sana olan sevgimi anlatmak için bugüne kadar çok fazla cümle kurdum. Bu kez senden tek bir şey bilmeni istiyorum: Ben seninle ilgili yaşadığımız her güzel gelişmeye, sanki hayatımın en güzel haberiymiş gibi seviniyorum. Çünkü gerçekten öyle hissediyorum. Seninle geleceğe dair konuşabilmek bile beni mutlu ederken, şimdi o geleceğe doğru somut bir adım atacak olmak beni yerimde duramaz hâle getiriyor.",
      "Ayın sonu bir an önce gelsin istiyorum bebeğim. Hem seni göreyim, hem aileni tanıyayım, hem de yıllar sonra inşallah birlikte gülümseyerek hatırlayacağımız bir günümüz daha olsun.",
      "Allah hakkımızda hayırlısını nasip etsin benim güzel sevdiceğim. Eğer nasibimiz birbirimizsek, bugün içimizde taşıdığımız bu heyecanı bir gün aynı yuvanın içinde, çok daha güzel mutluluklarla hatırlayalım.",
    ],
    closing: [
      "Seni çok seviyorum Zehram. Hem de bu satırları yazarken yüzümde oluşan gülümsemeyi sana gösterebilmeyi isteyecek kadar.",
      "Seninle yaşayacaklarımız için çok heyecanlıyım, benim bir tanecik kelebeğim.",
    ],
    signature: "Seni çok seven Yusuf'un. ❤️",
  },
  {
    id: "2026-11-05",
    title: "Yusufça Sevmek",
    date: "5 Kasım 2026",
    dateTime: "2026-11-05",
    music: {
      url: "https://www.youtube.com/watch?v=ot1UxWuSbpk",
      videoId: "ot1UxWuSbpk",
      endSec: 270, // 4:30
    },
    greeting: "Hayatımın anlamı, birtanecik sevdiğim…",
    body: [
      "Bazen düşünüyorum da sevgi dediğimiz şey, iki insanın birbirini sevdiğini söylemesinden çok daha fazlası. Hatta belki de sevginin en güzel tarafı, söylenen sözlerden ziyade insanın davranışlarında saklı.",
      "Sevmek, zor zamanlarda kapıyı çekip gitmek değil, o zorluğun içinden el ele geçmeye çalışmaktır. Her şey yolundayken yanında olmak değil, işler yolunda gitmediğinde de aynı yerde durabilmektir. Sevgi, yalnızca güzel günleri paylaşmak değil, güzel olmayan günlerde de birbirine güzel gelebilmektir.",
      "Sevmek, karşındaki insanı kendine benzetmeye çalışmak değil, onun senden farklı yanlarını da sevebilmektir. Onu kendi doğrularına göre değiştirmek değil, olduğu insanı tanımak, anlamak ve bütün hâliyle kabul etmektir. Çünkü insan sevdiği kişiyi kusursuz olduğu için değil, bütün kusurlarına, farklılıklarına ve kendine has yanlarına rağmen değil, tam da onlarla birlikte sever.",
      "Sevmek, her anlaşmazlıkta vazgeçmeyi düşünmek değil, bazen kendi haklılığından vazgeçip birbirini anlamayı seçmektir. Her tartışmayı kazanmak değil, tartışmanın sonunda birbirimizi kaybetmemiş olmayı önemsemektir. Birbirimizin kalbini kırdıktan sonra haklı çıkmanın hiçbir anlamı olmadığını bilmektir.",
      "Sevmek, yalnızca güzel sözler söylemek değil, o sözleri söylerken bile karşındakinin kalbini düşünmektir. Bir cümlenin onu nasıl hissettireceğini hesaba katmak, en mutlu olduğu anda bile incinme ihtimalini önemsemektir. Bazen söyleyecek çok şeyin varken susmayı, bazen de susmak yerine sarılıp her şeyi anlatmayı bilmektir.",
      "Sevmek, bir insanın hayatına girmek kadar o hayatta kalabilmek için de emek vermektir. Onun hayallerini kendi hayallerin kadar önemsemek, mutluluğunu kendi mutluluğundan ayrı görmemek, düştüğünde elinden tutmak ama yürüyebileceğine de inanmasını sağlamaktır.",
      "Ve biliyor musun hayatım, ben seni tam olarak böyle seviyorum. Birbirimizi hiç üzmediğimiz, hiç anlaşmazlık yaşamadığımız bir hayatın mümkün olduğunu düşünmüyorum. Ama ne yaşarsak yaşayalım birbirimizin kalbini ve bu ilişkinin kıymetini unutmadığımız bir hayat istiyorum. Birbirimizi değiştirmeye çalışmadan birlikte büyüdüğümüz, hayallerimize ortak olduğumuz, bazen çocuklar gibi güldüğümüz, bazen de hiçbir şey konuşmadan birbirimize sarılmanın yettiği bir hayat…",
      "Ben seninle sadece bugünü değil, henüz yaşamadığımız bütün yarınları da istiyorum. Birlikte vereceğimiz kararları, kuracağımız düzeni, küçük mutluluklarımızı, uzun sohbetlerimizi, sıradan günlerimizi… Yıllar geçse de sana bakarken içimden gelen o güzel hissin eksilmemesini istiyorum.",
      "Sana verebileceğim en güzel söz, her şeyin hep mükemmel olacağı değil. Seni anlamaya çalışmaktan, sana özen göstermekten, birlikte kurduğumuz bu güzel şeye emek vermekten vazgeçmeyeceğim.",
      "Bu mektupta sevgimi sana biraz daha detaylandırmaya çalıştım. Bir tanem mektubumu tam dört gün boyunca parça parça yazdım. En doğru cümleleri bulabilmek için. Sen benim her şeyimsin. Umarım sende benim sana hissettiğim gibi bir sevgi hissediyorsundur. Ama kabul etki ben seni daha çok seviyorum benim bir tanecik Zehram.",
      "İyi ki hayatımdasın bebeğim. İyi ki yollarımız kesişmiş, iyi ki seni tanımışım. Ben seninle aynı yolda yürümeyi, o yolun her hâlini seninle yaşamayı çok istiyorum.",
    ],
    closing: "Seni çok seviyorum, canımın içi.",
    signature: "Yusuf",
  },
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
let heartbeatTimer = null;
let ambientHeartTimer = null;

const BPM_MIN = 60;
const BPM_MAX = 100;
// Bu süreden uzakken sakin kalır; yaklaştıkça BPM yükselir
const BPM_HORIZON_MS = 21 * 24 * 60 * 60 * 1000;

function pad2(value) {
  return String(value).padStart(2, "0");
}

function getCountdownDiff() {
  return MEETING_AT.getTime() - Date.now();
}

function getMeetingBpm(diff = getCountdownDiff()) {
  if (diff <= 0) return BPM_MAX;
  const proximity = 1 - Math.min(Math.max(diff / BPM_HORIZON_MS, 0), 1);
  // Son günlerde daha belirgin yükselsin
  const eased = proximity * proximity;
  return Math.round(BPM_MIN + (BPM_MAX - BPM_MIN) * eased);
}

function stopCountdownHeartbeat() {
  window.clearTimeout(heartbeatTimer);
  heartbeatTimer = null;
}

function beatCountdownHeart(bpm) {
  const heartbeat = document.getElementById("countdownHeartbeat");
  if (!heartbeat) return;

  const safeBpm = Math.min(Math.max(bpm || BPM_MIN, BPM_MIN), BPM_MAX);
  const intervalMs = 60000 / safeBpm;
  const animMs = Math.max(280, Math.min(intervalMs * 0.82, intervalMs - 40));

  heartbeat.style.setProperty("--ecg-duration", `${animMs}ms`);
  const bpmLabel = document.getElementById("ecgBpm");
  if (bpmLabel) bpmLabel.textContent = `${safeBpm} BPM`;

  if (prefersReducedMotion) return;

  heartbeat.classList.remove("is-beating");
  void heartbeat.offsetWidth;
  heartbeat.classList.add("is-beating");
}

function scheduleCountdownHeartbeat() {
  stopCountdownHeartbeat();
  if (!countdownGrid || countdownGrid.hidden || prefersReducedMotion) {
    const bpm = getMeetingBpm();
    const bpmLabel = document.getElementById("ecgBpm");
    if (bpmLabel) bpmLabel.textContent = `${bpm} BPM`;
    return;
  }

  const tick = () => {
    const diff = getCountdownDiff();
    if (diff <= 0) {
      stopCountdownHeartbeat();
      return;
    }

    const bpm = getMeetingBpm(diff);
    beatCountdownHeart(bpm);
    heartbeatTimer = window.setTimeout(tick, 60000 / bpm);
  };

  tick();
}

function updateCountdown() {
  if (!countdownGrid) return;

  const diff = getCountdownDiff();

  if (diff <= 0) {
    countdownGrid.hidden = true;
    if (countdownDone) countdownDone.hidden = false;
    window.clearInterval(countdownTimer);
    countdownTimer = null;
    stopCountdownHeartbeat();
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

  // BPM etiketini saniye güncellemesinde de taze tut
  const bpmLabel = document.getElementById("ecgBpm");
  if (bpmLabel) bpmLabel.textContent = `${getMeetingBpm(diff)} BPM`;
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

let landingHideTimer = null;

function hideLanding() {
  if (!landing) return;
  landing.setAttribute("aria-hidden", "true");
  window.clearTimeout(landingHideTimer);
  landingHideTimer = window.setTimeout(() => {
    landing.hidden = true;
  }, prefersReducedMotion ? 0 : 600);
}

function closeLetterNow() {
  setArchiveOpen(false);
  if (!isOpen) return;
  isAnimating = false;
  setOpen(false);
}

function goToLetters() {
  document.body.classList.remove("is-landing", "is-game");
  if (game) game.hidden = true;
  if (archiveMenu) archiveMenu.hidden = false;
  if (stage) stage.hidden = false;
  hideLanding();

  window.setTimeout(() => envelopeBtn?.focus({ preventScroll: true }), 50);
}

function goToLanding() {
  closeLetterNow();
  window.clearTimeout(landingHideTimer);
  document.body.classList.remove("is-game");
  document.body.classList.add("is-landing");
  if (game) game.hidden = true;
  if (archiveMenu) archiveMenu.hidden = true;
  if (stage) stage.hidden = true;
  if (landing) {
    landing.hidden = false;
    landing.removeAttribute("aria-hidden");
  }
}

function goToGame() {
  closeLetterNow();
  document.body.classList.remove("is-landing");
  document.body.classList.add("is-game");
  if (archiveMenu) archiveMenu.hidden = true;
  if (stage) stage.hidden = true;
  if (game) game.hidden = false;
  hideLanding();
  showGameMenu();
}

// ---------- Oyun ----------

const game = document.getElementById("game");
const gameCard = document.getElementById("gameCard");
const GAME_DATA_URL = "oyun.json";
const GAME_BEST_KEY = "zehra-game-best-v1";

let gameData = null;
let gameState = null;
let letterData = null;
let letterState = null;

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeQuestion(raw, index) {
  const options = Array.isArray(raw?.options) ? raw.options.map(String) : [];
  const answer = String(raw?.answer ?? "");
  if (!raw?.question || options.length < 2 || !options.includes(answer)) {
    console.warn(`oyun.json: ${index + 1}. soru atlandı (soru metni, en az 2 seçenek ve seçeneklerden biriyle birebir aynı "answer" gerekli).`, raw);
    return null;
  }
  return {
    question: String(raw.question),
    options,
    answer,
    points: Math.max(0, Number(raw.points) || 0),
    note: raw.note ? String(raw.note) : "",
    wrongNotes: raw.wrongNotes && typeof raw.wrongNotes === "object" ? raw.wrongNotes : {},
  };
}

async function loadGameData() {
  if (gameData) return gameData;

  const response = await fetch(GAME_DATA_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const raw = await response.json();

  const questions = (Array.isArray(raw.questions) ? raw.questions : [])
    .map(normalizeQuestion)
    .filter(Boolean);
  if (!questions.length) throw new Error("Geçerli soru bulunamadı");

  const results = (Array.isArray(raw.results) ? raw.results : [])
    .map((item) => ({ ...item, minPercent: Number(item.minPercent) || 0 }))
    .sort((a, b) => b.minPercent - a.minPercent);

  gameData = {
    title: raw.title || "Oyun",
    description: raw.description || "",
    shuffleOptions: raw.shuffleOptions !== false,
    shuffleQuestions: Boolean(raw.shuffleQuestions),
    questions,
    results,
    maxScore: questions.reduce((sum, item) => sum + item.points, 0),
  };
  return gameData;
}

function getBestScore() {
  const value = Number(localStorage.getItem(GAME_BEST_KEY));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function saveBestScore(score) {
  try {
    localStorage.setItem(GAME_BEST_KEY, String(score));
  } catch (_) {
    /* private mode / quota */
  }
}

function setGameCardWide(wide) {
  gameCard?.classList.toggle("is-wide", Boolean(wide));
}

function showGameMenu() {
  if (!gameCard) return;
  gameState = null;
  letterState = null;
  setGameCardWide(false);
  gameCard.innerHTML = `
    <p class="landing-eyebrow">Oyunlar</p>
    <h2 class="game-title">Hangisini oynayalım?</h2>
    <p class="game-text">Biri A'dan Z'ye, biri mektuplardan.</p>
    <button class="landing-btn" type="button" data-game-action="menu-letters">A'dan Z'ye</button>
    <button class="landing-btn landing-btn-alt" type="button" data-game-action="menu-quiz">Bizi ne kadar tanıyorsun?</button>
  `;
}

async function showGameIntro() {
  if (!gameCard) return;
  setGameCardWide(false);
  gameCard.innerHTML = '<p class="game-status">Sorular yükleniyor…</p>';

  let data;
  try {
    data = await loadGameData();
  } catch (error) {
    console.error(error);
    gameCard.innerHTML = `
      <p class="landing-eyebrow">Oyun</p>
      <h2 class="game-title">Sorular yüklenemedi</h2>
      <p class="game-text">
        <code>oyun.json</code> dosyası okunamadı. Sayfa doğrudan dosyadan (file://) açıldıysa
        tarayıcı JSON okumayı engeller; siteyi bir sunucu üzerinden açmayı dene.
      </p>
      <button class="landing-btn" type="button" data-game-action="retry">Tekrar dene</button>
      <button class="landing-btn landing-btn-alt" type="button" data-game-action="menu">Oyunlara dön</button>
    `;
    return;
  }

  const best = getBestScore();
  gameCard.innerHTML = `
    <p class="landing-eyebrow">Oyun</p>
    <h2 class="game-title">${escapeHtml(data.title)}</h2>
    ${data.description ? `<p class="game-text">${escapeHtml(data.description)}</p>` : ""}
    <div class="game-stats">
      <div class="game-stat">
        <span class="game-stat-value">${data.questions.length}</span>
        <span class="game-stat-name">Soru</span>
      </div>
      <div class="game-stat">
        <span class="game-stat-value">${data.maxScore}</span>
        <span class="game-stat-name">Toplam puan</span>
      </div>
      <div class="game-stat">
        <span class="game-stat-value">${best || "—"}</span>
        <span class="game-stat-name">En iyi skor</span>
      </div>
    </div>
    <button class="landing-btn" type="button" data-game-action="start">Başla</button>
    <button class="landing-btn landing-btn-alt" type="button" data-game-action="menu">Oyunlara dön</button>
  `;
}

function startGame() {
  if (!gameData) return;
  const ordered = gameData.shuffleQuestions ? shuffle(gameData.questions) : gameData.questions;

  gameState = {
    questions: ordered.map((item) => ({
      ...item,
      options: gameData.shuffleOptions ? shuffle(item.options) : item.options,
    })),
    index: 0,
    score: 0,
    correctCount: 0,
    answered: false,
  };
  renderGameQuestion();
}

function renderGameQuestion() {
  if (!gameCard || !gameState) return;
  const { questions, index, score } = gameState;
  const current = questions[index];
  const progress = (index / questions.length) * 100;

  gameCard.innerHTML = `
    <div class="game-head">
      <span>Soru ${index + 1} / ${questions.length}</span>
      <span>Puan: <strong>${score}</strong></span>
    </div>
    <div class="game-progress" aria-hidden="true">
      <span style="width: ${progress}%"></span>
    </div>
    <span class="game-points">+${current.points} puan</span>
    <h2 class="game-question">${escapeHtml(current.question)}</h2>
    <div class="game-options">
      ${current.options
        .map(
          (option, optionIndex) => `
            <button class="game-option" type="button" data-option-index="${optionIndex}">
              ${escapeHtml(option)}
            </button>
          `
        )
        .join("")}
    </div>
    <div class="game-feedback" id="gameFeedback"></div>
  `;
  gameState.answered = false;
}

function answerGameQuestion(optionIndex) {
  if (!gameState || gameState.answered) return;
  gameState.answered = true;

  const current = gameState.questions[gameState.index];
  const chosen = current.options[optionIndex];
  const isCorrect = chosen === current.answer;

  if (isCorrect) {
    gameState.score += current.points;
    gameState.correctCount += 1;
  }

  gameCard.querySelectorAll(".game-option").forEach((button) => {
    const option = current.options[Number(button.dataset.optionIndex)];
    button.disabled = true;
    if (option === current.answer) button.classList.add("is-correct");
    else if (option === chosen) button.classList.add("is-wrong");
  });

  const scoreEl = gameCard.querySelector(".game-head strong");
  if (scoreEl) scoreEl.textContent = String(gameState.score);

  const wrongNote = isCorrect ? "" : String(current.wrongNotes[chosen] || "");
  const isLast = gameState.index >= gameState.questions.length - 1;
  const feedback = gameCard.querySelector("#gameFeedback");
  if (feedback) {
    feedback.innerHTML = `
      <p class="game-verdict ${isCorrect ? "is-correct" : "is-wrong"}">
        ${isCorrect ? `Doğru! +${current.points} puan` : `Yanlış. Doğru cevap: ${escapeHtml(current.answer)}`}
      </p>
      ${wrongNote ? `<p class="game-note">${escapeHtml(wrongNote)}</p>` : ""}
      ${current.note ? `<p class="game-note">${escapeHtml(current.note)}</p>` : ""}
      <button class="landing-btn" type="button" data-game-action="next">
        ${isLast ? "Sonucu gör" : "Sonraki soru"}
      </button>
    `;
    feedback.querySelector("button")?.focus({ preventScroll: true });
  }
}

function nextGameQuestion() {
  if (!gameState) return;
  if (gameState.index >= gameState.questions.length - 1) {
    renderGameResult();
    return;
  }
  gameState.index += 1;
  renderGameQuestion();
}

function renderGameResult() {
  if (!gameCard || !gameState || !gameData) return;
  const { score, correctCount, questions } = gameState;
  const max = gameData.maxScore;
  const percent = max > 0 ? Math.round((score / max) * 100) : 0;
  const result = gameData.results.find((item) => percent >= item.minPercent);

  const previousBest = getBestScore();
  const isNewBest = score > previousBest;
  if (isNewBest) saveBestScore(score);

  gameCard.innerHTML = `
    <p class="landing-eyebrow">Sonuç</p>
    <p class="game-score">${score}<small> / ${max}</small></p>
    <p class="game-text">${correctCount} / ${questions.length} doğru · %${percent}</p>
    ${isNewBest && score > 0 ? '<span class="archive-badge game-best-badge">Yeni rekor</span>' : ""}
    ${result?.title ? `<h2 class="game-title">${escapeHtml(result.title)}</h2>` : ""}
    ${result?.message ? `<p class="game-text">${escapeHtml(result.message)}</p>` : ""}
    <button class="landing-btn" type="button" data-game-action="start">Tekrar oyna</button>
    <button class="landing-btn landing-btn-alt" type="button" data-game-action="menu">Oyunlara dön</button>
    <button class="landing-btn landing-btn-alt" type="button" data-game-action="letters">Mektuplara git</button>
  `;

  if (percent >= 60) spawnPetalRain();
}

// ---------- A'dan Z'ye ----------

const LETTER_DATA_URL = "harfler.json";
const LETTER_BEST_KEY = "zehra-az-best-v2";

function foldTr(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "")
    .toLocaleLowerCase("tr-TR");
}

function letterCaption(letter) {
  if (letter === "I") return "Noktasız I";
  if (letter === "İ") return "Noktalı İ";
  if (letter === "Ğ") return "Yumuşak ge";
  return "";
}

function normalizeLetter(raw, index) {
  const letter = String(raw?.letter ?? "").trim();
  const answers = (Array.isArray(raw?.answers) ? raw.answers : [])
    .map((item) => String(item).trim())
    .filter(Boolean);
  const shared = Boolean(raw?.shared);
  if (!letter || (!raw?.question && !shared)) {
    console.warn(`harfler.json: ${index + 1}. harf atlandı.`, raw);
    return null;
  }
  if (!shared && !answers.length) {
    console.warn(`harfler.json: ${letter} için cevap yok, bu tur geçilecek.`, raw);
  }
  return {
    letter,
    question: String(raw?.question || ""),
    answers,
    shared,
    note: raw?.note ? String(raw.note) : "",
    unwritten: !shared && !answers.length,
  };
}

async function loadLetterData() {
  if (letterData) return letterData;

  const response = await fetch(LETTER_DATA_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const raw = await response.json();
  const letters = (Array.isArray(raw.letters) ? raw.letters : [])
    .map(normalizeLetter)
    .filter(Boolean);
  if (!letters.length) throw new Error("Geçerli harf bulunamadı");

  letterData = {
    title: raw.title || "A'dan Z'ye",
    description: raw.description || "",
    letters,
  };
  return letterData;
}

function getAzBest() {
  const value = Number(localStorage.getItem(LETTER_BEST_KEY));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function saveAzBest(score) {
  try {
    localStorage.setItem(LETTER_BEST_KEY, String(score));
  } catch (_) {
    /* private mode / quota */
  }
}

function renderAzScore(score, extraClass = "") {
  return `
    <div class="az-scores is-solo ${extraClass}">
      <div class="az-score is-zehra is-turn">
        <span class="az-score-value">${score}</span>
        <span class="az-score-name">Zehra</span>
      </div>
    </div>
  `;
}

function renderAzBoard(letters, marks, currentIndex, center = null) {
  const count = Math.max(letters.length, 1);
  const beads = letters
    .map((item, index) => {
      const turn = -Math.PI / 2 + (index / count) * Math.PI * 2;
      const x = (50 + Math.cos(turn) * 39).toFixed(2);
      const y = (50 + Math.sin(turn) * 39).toFixed(2);
      const mark = marks[index];
      const classes = ["az-letter"];
      if (index === currentIndex) classes.push("is-current");
      if (mark === "zehra") classes.push("is-zehra");
      else if (mark === "shared") classes.push("is-shared");
      else if (mark === "miss") classes.push("is-miss");
      return `<span class="${classes.join(" ")}" style="left:${x}%;top:${y}%">${escapeHtml(item.letter)}</span>`;
    })
    .join("");
  const caption = center?.caption
    ? `<p class="az-hint">${escapeHtml(center.caption)}</p>`
    : "";
  const middle = center?.letter
    ? `<div class="az-ring-center">
        <p class="az-ring-letter ${center.className || ""}">${escapeHtml(center.letter)}</p>
        ${caption}
      </div>`
    : `<span class="az-ring-dot"></span>`;

  return `
    <div class="az-ring is-zehra" aria-hidden="true">
      <svg class="az-ring-line" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="39" />
      </svg>
      ${beads}
      ${middle}
    </div>
  `;
}

async function showLetterIntro() {
  if (!gameCard) return;
  letterState = null;
  setGameCardWide(true);
  gameCard.innerHTML = '<p class="game-status">Harfler yükleniyor…</p>';

  let data;
  try {
    data = await loadLetterData();
  } catch (error) {
    console.error(error);
    gameCard.innerHTML = `
      <p class="landing-eyebrow">A'dan Z'ye</p>
      <h2 class="game-title">Harfler yüklenemedi</h2>
      <p class="game-text">
        <code>harfler.json</code> okunamadı. Sayfa doğrudan dosyadan açıldıysa
        siteyi bir sunucu üzerinden açmayı dene.
      </p>
      <button class="landing-btn" type="button" data-game-action="letter-retry">Tekrar dene</button>
      <button class="landing-btn landing-btn-alt" type="button" data-game-action="menu">Oyunlara dön</button>
    `;
    return;
  }

  const best = getAzBest();
  gameCard.innerHTML = `
    <p class="landing-eyebrow">Bilgi yarışması</p>
    <h2 class="game-title">${escapeHtml(data.title)}</h2>
    <p class="game-text">${escapeHtml(data.description)}</p>
    <div class="game-stats">
      <div class="game-stat">
        <span class="game-stat-value">${data.letters.length}</span>
        <span class="game-stat-name">Harf</span>
      </div>
      <div class="game-stat">
        <span class="game-stat-value">Yok</span>
        <span class="game-stat-name">Süre</span>
      </div>
      <div class="game-stat">
        <span class="game-stat-value">${best || "—"}</span>
        <span class="game-stat-name">Toplam rekor</span>
      </div>
    </div>
    <button class="landing-btn" type="button" data-game-action="letter-start">Başla</button>
    <button class="landing-btn landing-btn-alt" type="button" data-game-action="menu">Oyunlara dön</button>
  `;
}

function startLetterGame() {
  if (!letterData) return;
  letterState = {
    index: 0,
    score: 0,
    marks: Array(letterData.letters.length).fill(null),
    reveal: null,
  };
  renderLetterRound();
}

function renderLetterRound() {
  if (!gameCard || !letterState || !letterData) return;
  const { letters } = letterData;
  const state = letterState;
  const current = letters[state.index];
  if (!current) {
    renderLetterResult();
    return;
  }

  setGameCardWide(true);
  const caption = letterCaption(current.letter);
  const score = renderAzScore(state.score);

  if (state.reveal) {
    const shared = Boolean(state.reveal.shared);
    const correct = Boolean(state.reveal.correct);
    const heroClass = shared ? "is-shared" : correct ? "is-zehra" : "is-miss";
    const board = renderAzBoard(letters, state.marks, state.index, {
      letter: current.letter,
      className: heroClass,
      caption,
    });
    const verdict = shared ? "Bu tur senin." : correct ? "Buldun." : "Bu harf açıkta kaldı.";
    const answerHtml = current.answers[0]
      ? `<p class="game-text">Doğru cevap: ${escapeHtml(current.answers[0])}</p>`
      : "";

    gameCard.innerHTML = `
      ${score}
      ${board}
      <h2 class="game-question">${escapeHtml(current.question)}</h2>
      <p class="game-verdict ${correct ? "is-correct" : "is-wrong"}">${verdict}</p>
      ${answerHtml}
      ${current.note ? `<p class="game-note">${escapeHtml(current.note)}</p>` : ""}
      <button class="landing-btn" type="button" data-game-action="letter-next">
        ${state.index >= letters.length - 1 ? "Sonucu gör" : "Sonraki harf"}
      </button>
    `;
    return;
  }

  if (current.unwritten) {
    const board = renderAzBoard(letters, state.marks, state.index, {
      letter: current.letter,
      className: "is-zehra",
    });
    gameCard.innerHTML = `
      ${score}
      ${board}
      <h2 class="game-question">Bu harfin sorusu henüz yok.</h2>
      <p class="game-text">Bu harfi geçebilirsin.</p>
      <button class="landing-btn" type="button" data-game-action="letter-next">Sonraki harf</button>
    `;
    return;
  }

  if (current.shared) {
    const board = renderAzBoard(letters, state.marks, state.index, {
      letter: current.letter,
      className: "is-shared",
      caption,
    });
    gameCard.innerHTML = `
      ${score}
      ${board}
      <h2 class="game-question">${escapeHtml(current.question)}</h2>
      <button class="landing-btn" type="button" data-game-action="letter-shared">Puanı al</button>
    `;
    return;
  }

  const board = renderAzBoard(letters, state.marks, state.index, {
    letter: current.letter,
    className: "is-zehra",
    caption,
  });
  gameCard.innerHTML = `
    ${score}
    ${board}
    <h2 class="game-question">${escapeHtml(current.question)}</h2>
    <form data-letter-form>
      <input
        class="az-input"
        id="letterAnswer"
        name="answer"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        enterkeyhint="done"
        placeholder="${escapeHtml(current.letter)} ile başlayan cevap"
        aria-label="Cevap"
      />
      <p class="az-error" id="letterError" role="alert"></p>
      <div class="az-actions">
        <button class="landing-btn" type="submit">Cevapla</button>
        <button class="landing-btn landing-btn-alt" type="button" data-game-action="letter-pass">Pas</button>
      </div>
    </form>
  `;
  const field = document.getElementById("letterAnswer");
  field?.focus({ preventScroll: true });
  field?.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function submitLetterAnswer() {
  if (!letterState || !letterData || letterState.reveal) return;
  const current = letterData.letters[letterState.index];
  if (!current || current.shared || current.unwritten) return;

  const input = document.getElementById("letterAnswer");
  const error = document.getElementById("letterError");
  const value = foldTr(input?.value || "");
  if (!value) {
    if (error) error.textContent = "Bir cevap yaz.";
    return;
  }

  const correct = current.answers.some((answer) => foldTr(answer) === value);
  if (correct) {
    letterState.score += 1;
    letterState.marks[letterState.index] = "zehra";
    letterState.reveal = { correct: true };
    renderLetterRound();
    return;
  }

  if (!value.startsWith(foldTr(current.letter))) {
    if (error) error.textContent = `Cevap ${current.letter} harfiyle başlamalı. Bir daha dene.`;
    input?.focus({ preventScroll: true });
    return;
  }

  letterState.marks[letterState.index] = "miss";
  letterState.reveal = { correct: false };
  renderLetterRound();
}

function passLetter() {
  if (!letterState || !letterData || letterState.reveal) return;
  const current = letterData.letters[letterState.index];
  if (!current || current.shared || current.unwritten) return;

  letterState.marks[letterState.index] = "miss";
  letterState.reveal = { correct: false };
  renderLetterRound();
}

function claimSharedLetter() {
  if (!letterState || !letterData || letterState.reveal) return;
  const current = letterData.letters[letterState.index];
  if (!current?.shared) return;
  letterState.score += 1;
  letterState.marks[letterState.index] = "shared";
  letterState.reveal = { correct: true, shared: true };
  renderLetterRound();
}

function nextLetter() {
  if (!letterState || !letterData) return;
  const current = letterData.letters[letterState.index];
  if (current?.unwritten && letterState.marks[letterState.index] == null) {
    letterState.marks[letterState.index] = "empty";
  }
  letterState.reveal = null;
  letterState.index += 1;
  if (letterState.index >= letterData.letters.length) {
    renderLetterResult();
    return;
  }
  renderLetterRound();
}

function renderLetterResult() {
  if (!gameCard || !letterState || !letterData) return;
  const { letters } = letterData;
  const { score, marks } = letterState;
  const total = letters.length;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  let title = "Bir daha";
  let message = "Cevaplar sende. İstersen bir tur daha.";
  if (percent >= 90) {
    title = "Mükemmel";
    message = "Aşkımızı çok iyi biliyorsun.";
  } else if (percent >= 60) {
    title = "Çok iyi";
    message = "Çoğunu bildin. Birkaç harf kaçmış.";
  } else if (percent >= 30) {
    title = "Fena değil";
    message = "Bir kısmı duruyor. İstersen bir tur daha.";
  }

  const previousBest = getAzBest();
  const isNewBest = score > previousBest;
  if (isNewBest && score > 0) saveAzBest(score);

  setGameCardWide(true);
  gameCard.innerHTML = `
    <p class="landing-eyebrow">A'dan Z'ye</p>
    ${renderAzScore(score, "az-scores-final")}
    ${renderAzBoard(letters, marks, -1)}
    <p class="az-legend">Kırmızı olanlar doğru</p>
    <p class="game-text">${score} / ${total} doğru</p>
    ${isNewBest && score > 0 ? '<span class="archive-badge game-best-badge">Yeni rekor</span>' : ""}
    <h2 class="game-title">${escapeHtml(title)}</h2>
    <p class="game-text">${escapeHtml(message)}</p>
    <button class="landing-btn" type="button" data-game-action="menu-letters">Tekrar oyna</button>
    <button class="landing-btn landing-btn-alt" type="button" data-game-action="menu">Oyunlara dön</button>
    <button class="landing-btn landing-btn-alt" type="button" data-game-action="letters">Mektuplara git</button>
  `;

  if (percent >= 60) spawnPetalRain();
}

gameCard?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-option-index]");
  if (option) {
    answerGameQuestion(Number(option.dataset.optionIndex));
    return;
  }

  const actionEl = event.target.closest("[data-game-action]");
  const action = actionEl?.dataset.gameAction;
  if (action === "start") startGame();
  else if (action === "next") nextGameQuestion();
  else if (action === "retry") showGameIntro();
  else if (action === "letters") goToLetters();
  else if (action === "menu") showGameMenu();
  else if (action === "menu-quiz") showGameIntro();
  else if (action === "menu-letters" || action === "letter-retry") showLetterIntro();
  else if (action === "letter-start") startLetterGame();
  else if (action === "letter-pass") passLetter();
  else if (action === "letter-next") nextLetter();
  else if (action === "letter-shared") claimSharedLetter();
});

gameCard?.addEventListener("submit", (event) => {
  if (!event.target?.matches?.("[data-letter-form]")) return;
  event.preventDefault();
  submitLetterAnswer();
});

goLettersBtn?.addEventListener("click", goToLetters);
document.getElementById("goGameBtn")?.addEventListener("click", goToGame);
document.getElementById("lettersGameBtn")?.addEventListener("click", goToGame);
document.getElementById("gameHomeBtn")?.addEventListener("click", goToLanding);
document.getElementById("gameLettersBtn")?.addEventListener("click", goToLetters);

loadLetters();
renderActiveLetter();
scheduleLetterUnlocks();
updateCountdown();
countdownTimer = window.setInterval(updateCountdown, 1000);
scheduleCountdownHeartbeat();
startAmbientHearts();
