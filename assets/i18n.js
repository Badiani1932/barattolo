/* Badiani Il Barattolo - lightweight i18n + language switcher
   Supports: en, it, es, fr
   - Persists selection in localStorage
   - Updates <html lang>
   - Translates key UI strings for both desktop and mobile pages
*/

(function () {
  'use strict';

  const SUPPORTED = ['en', 'it', 'es', 'fr'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'badianiLang';

  /** @type {Record<string, Record<string, string>>} */
  const STRINGS = {
    en: {
      'lang.name.en': 'English',
      'lang.name.it': 'Italiano',
      'lang.name.es': 'Español',
      'lang.name.fr': 'Français',

      'nav.home': 'Home',
      'nav.story': 'Story',
      'nav.products': 'Products',
      'nav.heritage': 'Heritage',
      'nav.barattolo': 'Il Barattolo',
      'nav.contact': 'Contact',

      // 'header.beInspired': 'BE INSPIRED',

      'music.on': 'Music: On',
      'music.off': 'Music: Off',

      'customizer.title': 'Create Your Gelato',
      'customizer.subtitle': 'Choose your favorite flavors for your custom cursor!',
      'customizer.leftScoop': 'Left Scoop',
      'customizer.rightScoop': 'Right Scoop',
      'customizer.previewTitle': 'Your Custom Cursor',
      'customizer.close': 'Close',

      'flavor.hazelnut': 'Hazelnut',
      'flavor.strawberry': 'Strawberry',
      'flavor.pistachio': 'Pistachio',
      'flavor.buontalenti': 'Buontalenti®',
      'flavor.mango': 'Mango',
      'flavor.blueberry': 'Blueberry',

      'hero.titleHtml': 'Il Barattolo <span>GELATO</span>',
      'hero.subtitle': 'A Creative Flavour Journey from Florence',
      'hero.lead': 'Authentic Florentine gelato for premium retail distribution. Over 90 years of gelato-making excellence from the birthplace of gelato.',
      'hero.ctaExplore': 'Explore Flavours',
      'hero.ctaAria': 'Jump to products',

      'banner.hero': 'iconic italian gelato · since 1932 · from florence with love',
      'banner.story': 'the renaissance of gelato · born in florence 1932 · tradition meets innovation',
      'banner.heritage': 'from florence to the world · since 1932 · a global legacy',
      'banner.barattolo': 'il barattolo · premium retail format · authentic florentine gelato at home',
      'banner.products': 'award-winning flavours · classico · pistacchio · la dolcevita',
      'banner.mission': 'Florentine know-how · premium ingredients · unforgettable taste',
      'banner.gallery': 'silky texture · generous swirls · visual delight in every spoonful',
      'banner.locations': 'london · barcelona · paris · tokyo · florence · everywhere in style',
      'banner.why': 'heritage · quality · global reach · retail excellence · choose badiani',
      'banner.contact': "partner with us · bring florence to your customers · let's grow together",

      'story.title': 'Buontalenti®: The Gelato That Made History',
      'story.titleHtml': '<span class="story-title-main"><span class="story-title-buontalenti">Buontalenti<sup class="reg">®</sup></span>:</span><br class="st-br"> <span class="story-title-sub">The Gelato That Made History</span>',
      'story.lead': 'Florentine tradition says gelato was born at the Medici court in the 16th century, thanks to the architect Bernardo Buontalenti. Our signature flavour carries his name.',
      'story.leadHtml': 'Florentine tradition says <span class="highlight-pink">gelato</span> was born at the Medici court in the 16th century, thanks to the architect <span class="highlight-pink">Bernardo Buontalenti</span>. Our signature flavour carries his name.',
      'story.tl.origin': 'The Origin',
      'story.tl.originDesc': 'As tradition has it, Bernardo Buontalenti invents gelato in Renaissance Florence, for the Medici court.',
      'story.tl.originDescHtml': 'As tradition has it, Bernardo Buontalenti invents gelato in <span class="highlight-pink">Renaissance Florence</span>, for the Medici court.',
      'story.tl.tribute': 'The House',
      'story.tl.tributeDesc': 'Idilio Badiani opens his gelateria in Florence. Later, Paolo Pomposi makes Buontalenti® the house signature: 4 simple ingredients (cream, milk, sugar, eggs).',
      'story.tl.tributeDescHtml': 'Idilio Badiani opens his gelateria in Florence. Later, Paolo Pomposi makes Buontalenti® the house signature: <span class="highlight-pink">4 simple ingredients</span> <span class="nowrap">(cream, milk, sugar, eggs)</span>.',
      'story.tl.legacy': 'The Legacy',
      'story.tl.legacyDesc': 'Il Barattolo Gelato brings this iconic Florentine flavour to premium retail worldwide.',
      'story.tl.legacyDescHtml': 'Il Barattolo Gelato brings this iconic Florentine flavour to <span class="highlight-pink">premium retail</span> worldwide.',
      'story.tl.year.today': 'TODAY',
      'story.tl.year.origin': '1500s',

      'heritage.title': 'A Legacy of Excellence',
      'heritage.intro': "Born in Florence in 1932, Badiani is one of the world's most prestigious gelato producers. From the birthplace of gelato, we have built an international presence spanning five countries on two continents.",
      'heritage.introHtml': "Born in <span class=\"highlight-pink\">Florence in 1932</span>, Badiani is one of the world's most prestigious gelato producers. From the birthplace of gelato, we have built an international presence spanning five countries on two continents.",
      'heritage.stat.founded': 'Founded in Florence',
      'heritage.stat.stores': 'Stores Worldwide',
      'heritage.stat.quality': 'Italian Quality',
      'heritage.stat.countries': 'Countries',

      'barattolo.p1': 'Thanks to the success of our Buontalenti®, Buontalenti® Pistacchio, and La Dolcevita flavours, we have developed Il Barattolo GELATO — a premium line designed for large-scale distribution.',
      'barattolo.p1Html': 'Thanks to the success of our Buontalenti®, Buontalenti® Pistacchio, and La Dolcevita flavours, we have developed <span class="highlight-pink">Il Barattolo GELATO</span> — a premium line designed for <span class="highlight-pink">large-scale distribution</span>.',
      'barattolo.p2': 'This innovative format brings the authentic quality of our gelato to a wider audience, making it more accessible without compromising on ingredient excellence or the Florentine tradition.',
      'barattolo.p3': 'With Il Barattolo Gelato, everyone can enjoy the rich, creamy flavours that have made Badiani famous, now in a convenient 500ml format.',
      'barattolo.p3Html': 'With Il Barattolo Gelato, everyone can enjoy the rich, creamy flavours that have made Badiani famous, now in a convenient <span class="highlight-pink">500ml format</span>.',

      'products.titlePrefix': 'Premium',
      'products.titleEm': 'Collection',
      'products.subtitle': 'Three iconic flavours, the authentic Florentine recipe',

      'btn.viewSpecs': 'View Specs',

      'award.bestFlavour2015': 'Best Flavour 2015',
      'award.worldBestSeller': 'World Best-Seller',

      'card.classico.desc': 'Our world-famous flagship flavour. <br>Made with only four ingredients: cream, milk, sugar, and free-range eggs.',
      'card.classico.f1': '4 ingredients only',
      'card.classico.f2': 'Free-range eggs',
      'card.classico.f3': 'Gluten-free',
      'card.classico.f4': '24-month shelf life',

      'card.dolcevita.desc': 'Custard gelato with gianduia hazelnut-cocoa spread (20%). <br>Made with Italian hazelnut paste and Madagascar Bourbon vanilla.',
      'card.dolcevita.f1': 'Italian hazelnut paste',
      'card.dolcevita.f2': 'Madagascar vanilla',
      'card.dolcevita.f3': 'Gluten-free',
      'card.dolcevita.f4': 'Award-winning',

      'card.pistacchio.desc': 'Our most popular flavour worldwide. <br>Custard gelato swirled with pistachio spreadable cream (20%) and 5% pure pistachio paste.',
      'card.pistacchio.f1': '5% pistachio paste',
      'card.pistacchio.f2': 'Free-range eggs',
      'card.pistacchio.f3': 'Gluten-free',
      'card.pistacchio.f4': 'Global favourite',

      'mission.tab.mission': 'Mission',
      'mission.tab.vision': 'Vision',
      'mission.title': 'Our Mission',
      'mission.strong': 'Bring Flavour to Your Life',
      'mission.body': 'To bring joy to consumers of all ages through our iconic gelato, always adhering to principles of high quality and sustainability.',
      'vision.title': 'Our Vision',
      'vision.strong': 'Inspiring the World with Gelato',
      'vision.body': 'To become the finest gelato brand in the world and inspire people with the taste of freshly made gelato.',

      'gallery.title': 'Inside the Barattolo',
      'gallery.subtitle': 'Creamy texture, iconic recipes and retail-ready impact in every 500ml jar.',
      'gallery.kicker': 'Retail texture story',
      'gallery.classico.label': 'Classico',
      'gallery.classico.title': 'Pure Florentine gelato',
      'gallery.classico.body': 'Only four ingredients, our signature Buontalenti® identity.',
      'gallery.dolcevita.label': 'La Dolcevita',
      'gallery.dolcevita.title': 'Gianduia swirl',
      'gallery.dolcevita.body': 'Custard gelato with hazelnut-cocoa spread and Madagascar vanilla.',
      'gallery.pistacchio.label': 'Pistacchio',
      'gallery.pistacchio.title': 'Pistachio depth',
      'gallery.pistacchio.body': 'Creamy custard gelato with pistachio spread and pure pistachio paste.',
      'gallery.badge.shelf': '24-month shelf life',
      'gallery.badge.award': 'Award-winning',
      'gallery.badge.retail': 'Retail ready',
      'gallery.badge.global': 'Global favourite',

      'locations.aria': 'Badiani around the world means gelato',
      'locations.top': 'Badiani Around The World',
      'locations.mid': 'Means',
      'locations.bottom': 'Gelato',
      'mobile.scrollHint': '← Scroll to see it all →',

      'why.title': 'Why Choose Badiani',
      'why.b1.title': 'Heritage',
      'why.b1.desc': 'Since 1932: gelato-making excellence from Florence, the birthplace of gelato',
      'why.b1.descHtml': '<span class="highlight-pink">Since 1932</span>: gelato-making excellence from Florence, the birthplace of gelato',
      'why.b2.title': 'Global Presence',
      'why.b2.desc': '30+ stores worldwide including the Carrousel du Louvre in Paris',
      'why.b2.descHtml': '30+ stores worldwide including the <span class="highlight-pink">Carrousel du Louvre</span> in Paris',
      'why.b3.title': 'Authentic Quality',
      'why.b3.desc': 'Premium Italian ingredients and award-winning recipes, bringing the true heritage of Florence to the world.',
      'why.b4.title': 'Retail Ready',
      'why.b4.desc': '500ml format, 24-month shelf life at -18°C, EUR/EPAL pallet compatible',
      'why.b4.descHtml': '500ml format, <span class="highlight-pink">24-month shelf life</span> at -18°C, EUR/EPAL pallet compatible',

      'contact.title': 'Partner With Badiani',
      'contact.highlight': 'Bring the authentic taste of Florence to your customers',
      'contact.cta': 'REQUEST SAMPLES AND PRICES NOW',
      'contact.ctaAria': 'Request distribution information via email',
      // finestra del modulo «Richiedi campioni e prezzi» (stesse parole della home del sito)
      'form.title': 'Request samples and prices',
      'form.close': 'Close',
      'form.fallback': 'If the form doesn’t load:',
      'form.openForm': 'open it in a new tab',
      'form.emailAlt': 'or write to',
      'mail.subject': 'Il Barattolo Gelato – request for samples and prices',
      'mail.body': 'Hello,\n\nI would like to receive samples and prices for Il Barattolo Gelato.\n\nCompany:\nCountry / city:\nType of business (supermarket, delicatessen, distributor, HoReCa…):\nNumber of stores:\nFlavours of interest (Classico, La Dolcevita, Pistacchio):\nPhone:\n\nThank you,\n',

      'footer.html': '&copy; {year} <span>Badiani Gelato Firenze 1932</span> &middot; Made in Italy',

      'spec.productCode': 'Product Code',
      'spec.description': 'Description',
      'spec.netWeight': 'Net Weight',
      'spec.eanProduct': 'EAN Product',
      'spec.eanCarton': 'EAN Carton',
      'spec.shelfLife': 'Shelf Life',
      'spec.energy': 'Energy',
      'spec.allergens': 'Allergens',
      'spec.mayContain': 'May Contain',
      'spec.gluten': 'Gluten',
      'spec.ingredients': 'Ingredients',
      'spec.storage': 'Storage',
      'spec.packaging': 'Packaging',
      'spec.nutrition': 'Nutritional information',
      'spec.nutritionPer100g': 'average values per 100g',

      'nutrition.energy': 'Energy',
      'nutrition.fat': 'Fat',
      'nutrition.saturates': 'of which saturates',
      'nutrition.carbs': 'Carbohydrates',
      'nutrition.sugars': 'of which sugars',
      'nutrition.protein': 'Protein',
      'nutrition.salt': 'Salt',
      'nutrition.fiber': 'Fibre',

      'hint.tapForSpecs': 'Tap for specs',

      'specValue.custardGelato': 'Custard Gelato',
      'specValue.dolcevitaDesc': 'Custard gelato with gianduia spread 20%',
      'specValue.pistacchioDesc': 'Custard gelato with pistachio spread 20%',
      'specValue.shelfLife24': '24 months at -18°C (-0.4°F)',
      'specValue.glutenFree': 'GLUTEN FREE',
      'specValue.mayContain.classico': 'SOY, NUTS, PEANUTS',
      'specValue.mayContain.dolcevita': 'SOY, other NUTS, PEANUTS',
      'specValue.mayContain.pistacchio': 'SOY, other NUTS, PEANUTS',

      'specValue.ingredients.classico': 'Fresh Italian CREAM, Italian fresh whole MILK, sugar, skimmed MILK powder, free-range EGG yolk',
      'specValue.ingredients.dolcevita': 'Fresh Italian CREAM 36%, sugar, Italian fresh whole MILK 23%, sunflower oil, skimmed MILK powder, Italian HAZELNUT paste, Italian free-range EGG yolk 1.6%, low-fat cocoa powder, BUTTER, Madagascar Bourbon vanilla extract',
      'specValue.ingredients.pistacchio': 'Fresh Italian CREAM 36%, Italian fresh whole MILK 24%, sugar, skimmed MILK powder, PISTACHIO paste 5%, sunflower oil, Italian free-range EGG yolk 1.6%, BUTTER, salt',
      'specValue.storage': 'Keep at -18°C (-0.4°F). Do not refreeze after defrosting.',
      'specValue.packaging': 'Container PET01, lid PP05, seal PAP22. Check the recycling rules and regulations of your council.',
      'specValue.allergens.classico': 'MILK, EGGS',
      'specValue.allergens.dolcevita': 'MILK, HAZELNUTS, EGGS',
      'specValue.allergens.pistacchio': 'MILK, PISTACHIO'
    },

    it: {
      'lang.name.en': 'Inglese',
      'lang.name.it': 'Italiano',
      'lang.name.es': 'Spagnolo',
      'lang.name.fr': 'Francese',

      'nav.home': 'Home',
      'nav.story': 'Storia',
      'nav.products': 'Prodotti',
      'nav.heritage': 'Heritage',
      'nav.barattolo': 'Il Barattolo',
      'nav.contact': 'Contatti',

      // 'header.beInspired': 'LASCIATI ISPIRARE',

      'music.on': 'Musica: On',
      'music.off': 'Musica: Off',

      'customizer.title': 'Crea il tuo Gelato',
      'customizer.subtitle': 'Scegli i tuoi gusti preferiti per il cursore personalizzato!',
      'customizer.leftScoop': 'Pallina sinistra',
      'customizer.rightScoop': 'Pallina destra',
      'customizer.previewTitle': 'Il tuo cursore',
      'customizer.close': 'Chiudi',

      'flavor.hazelnut': 'Nocciola',
      'flavor.strawberry': 'Fragola',
      'flavor.pistachio': 'Pistacchio',
      'flavor.buontalenti': 'Buontalenti®',
      'flavor.mango': 'Mango',
      'flavor.blueberry': 'Mirtillo',

      'hero.titleHtml': 'Il Barattolo <span>GELATO</span>',
      'hero.subtitle': 'Un viaggio creativo nei sapori da Firenze',
      'hero.lead': "Gelato fiorentino autentico per la distribuzione retail premium. Oltre 90 anni di eccellenza nella gelateria, dalla città in cui è nato il gelato.",
      'hero.ctaExplore': 'Scopri i gusti',
      'hero.ctaAria': 'Vai ai prodotti',

      'banner.hero': 'gelato italiano iconico · dal 1932 · da firenze con amore',
      'banner.story': 'il rinascimento del gelato · nato a firenze nel 1932 · tradizione e innovazione',
      'banner.heritage': 'da firenze al mondo · dal 1932 · un’eredità globale',
      'banner.barattolo': 'il barattolo · formato retail premium · gelato fiorentino a casa',
      'banner.products': 'gusti premiati · classico · pistacchio · la dolcevita',
      'banner.mission': 'saper fare fiorentino · ingredienti premium · gusto indimenticabile',
      'banner.gallery': 'consistenza setosa · variegature generose · bellezza in ogni cucchiaio',
      'banner.locations': 'londra · barcellona · parigi · tokyo · firenze · ovunque con stile',
      'banner.why': 'heritage · qualità · presenza globale · eccellenza retail · scegli badiani',
      'banner.contact': 'collabora con noi · porta firenze ai tuoi clienti · cresciamo insieme',

      'story.title': 'Buontalenti®: il gelato che ha fatto la storia',
      'story.titleHtml': '<span class="story-title-main"><span class="story-title-buontalenti">Buontalenti<sup class="reg">®</sup></span>:</span><br class="st-br"> <span class="story-title-sub">il gelato che ha fatto la storia</span>',
      'story.lead': 'Secondo la tradizione fiorentina il gelato nacque alla corte dei Medici, nel Cinquecento, grazie all’architetto Bernardo Buontalenti. Il nostro gusto simbolo porta il suo nome.',
      'story.leadHtml': 'Secondo la tradizione fiorentina il <span class="highlight-pink">gelato</span> nacque alla corte dei Medici, nel Cinquecento, grazie all’architetto <span class="highlight-pink">Bernardo Buontalenti</span>. Il nostro gusto simbolo porta il suo nome.',
      'story.tl.origin': 'L’origine',
      'story.tl.originDesc': 'Secondo la tradizione, Bernardo Buontalenti inventa il gelato nella Firenze rinascimentale, per la corte dei Medici.',
      'story.tl.originDescHtml': 'Secondo la tradizione, Bernardo Buontalenti inventa il gelato nella <span class="highlight-pink">Firenze rinascimentale</span>, per la corte dei Medici.',
      'story.tl.tribute': 'La Casa',
      'story.tl.tributeDesc': 'Idilio Badiani apre la sua gelateria a Firenze. Più tardi Paolo Pomposi fa del Buontalenti® la firma della casa: 4 ingredienti semplici (panna, latte, zucchero, uova).',
      'story.tl.tributeDescHtml': 'Idilio Badiani apre la sua gelateria a Firenze. Più tardi Paolo Pomposi fa del Buontalenti® la firma della casa: <span class="highlight-pink">4 ingredienti semplici</span> <span class="nowrap">(panna, latte, zucchero, uova)</span>.',
      'story.tl.legacy': 'L’eredità',
      'story.tl.legacyDesc': 'Il Barattolo Gelato porta questo iconico gusto fiorentino nel retail premium in tutto il mondo.',
      'story.tl.legacyDescHtml': 'Il Barattolo Gelato porta questo iconico gusto fiorentino nel <span class="highlight-pink">retail premium</span> in tutto il mondo.',
      'story.tl.year.today': 'OGGI',
      'story.tl.year.origin': 'XVI SECOLO',

      'heritage.title': 'Un’eredità di eccellenza',
      'heritage.intro': 'Nata a Firenze nel 1932, Badiani è tra i produttori di gelato più prestigiosi al mondo. Dalla città in cui è nato il gelato, abbiamo costruito una presenza internazionale in cinque paesi su due continenti.',
      'heritage.introHtml': 'Nata a <span class="highlight-pink">Firenze nel 1932</span>, Badiani è tra i produttori di gelato più prestigiosi al mondo. Dalla città in cui è nato il gelato, abbiamo costruito una presenza internazionale in cinque paesi su due continenti.',
      'heritage.stat.founded': 'Fondata a Firenze',
      'heritage.stat.stores': 'Negozi nel mondo',
      'heritage.stat.quality': 'Qualità Italiana',
      'heritage.stat.countries': 'Paesi',

      'barattolo.p1': 'Grazie al successo dei gusti Buontalenti®, Buontalenti® Pistacchio e La Dolcevita, abbiamo sviluppato Il Barattolo GELATO — una linea premium pensata per la distribuzione su larga scala.',
      'barattolo.p1Html': 'Grazie al successo dei gusti Buontalenti®, Buontalenti® Pistacchio e La Dolcevita, abbiamo sviluppato <span class="highlight-pink">Il Barattolo GELATO</span> — una linea premium pensata per la <span class="highlight-pink">distribuzione su larga scala</span>.',
      'barattolo.p2': 'Questo formato innovativo porta la qualità autentica del nostro gelato a un pubblico più ampio, rendendolo più accessibile senza compromessi sugli ingredienti e sulla lavorazione tradizionale.',
      'barattolo.p3': 'Con Il Barattolo Gelato, tutti possono gustare i sapori ricchi e cremosi che hanno reso Badiani famosa, ora nel comodo formato da 500ml.',
      'barattolo.p3Html': 'Con Il Barattolo Gelato, tutti possono gustare i sapori ricchi e cremosi che hanno reso Badiani famosa, ora nel comodo <span class="highlight-pink">formato da 500ml</span>.',

      'products.titlePrefix': 'Collezione',
      'products.titleEm': 'Premium',
      'products.subtitle': 'Tre gusti iconici, autentica maestria fiorentina',

      'btn.viewSpecs': 'Scheda tecnica',

      'award.bestFlavour2015': 'Miglior gusto 2015',
      'award.worldBestSeller': 'Best-seller mondiale',

      'card.classico.desc': 'Il nostro gusto di punta, famoso in tutto il mondo. <br>Realizzato con soli quattro ingredienti: panna, latte, zucchero e uova da allevamento all’aperto.',
      'card.classico.f1': 'Solo 4 ingredienti',
      'card.classico.f2': 'Uova da allevamento all’aperto',
      'card.classico.f3': 'Senza glutine',
      'card.classico.f4': 'Shelf life 24 mesi',

      'card.dolcevita.desc': 'Gelato alla crema con variegatura alla gianduia (20%). <br>Con pasta di nocciola italiana e vaniglia Bourbon del Madagascar.',
      'card.dolcevita.f1': 'Pasta di nocciola italiana',
      'card.dolcevita.f2': 'Vaniglia del Madagascar',
      'card.dolcevita.f3': 'Senza glutine',
      'card.dolcevita.f4': 'Premiato',

      'card.pistacchio.desc': 'Il nostro gusto più amato nel mondo. <br>Gelato alla crema con variegatura al pistacchio (20%) e pasta di pistacchio puro al 5%.',
      'card.pistacchio.f1': '5% pasta di pistacchio',
      'card.pistacchio.f2': 'Uova da allevamento all’aperto',
      'card.pistacchio.f3': 'Senza glutine',
      'card.pistacchio.f4': 'Amato nel mondo',

      'mission.tab.mission': 'Missione',
      'mission.tab.vision': 'Visione',
      'mission.title': 'La nostra missione',
      'mission.strong': 'Portare gusto nella tua vita',
      'mission.body': 'Portare gioia ai consumatori di tutte le età con il nostro gelato iconico, seguendo sempre principi di alta qualità e sostenibilità.',
      'vision.title': 'La nostra visione',
      'vision.strong': 'Ispirare il mondo con il gelato',
      'vision.body': 'Diventare il miglior brand di gelato al mondo e ispirare le persone con il gusto del gelato appena fatto.',

      'gallery.title': 'Dentro il Barattolo',
      'gallery.subtitle': 'Texture cremosa, ricette iconiche e impatto retail in ogni barattolo da 500ml.',
      'gallery.kicker': 'Texture story retail',
      'gallery.classico.label': 'Classico',
      'gallery.classico.title': 'Puro gelato fiorentino',
      'gallery.classico.body': 'Solo quattro ingredienti, la nostra identità Buontalenti®.',
      'gallery.dolcevita.label': 'La Dolcevita',
      'gallery.dolcevita.title': 'Variegatura gianduia',
      'gallery.dolcevita.body': 'Gelato alla crema con variegatura nocciola-cacao e vaniglia del Madagascar.',
      'gallery.pistacchio.label': 'Pistacchio',
      'gallery.pistacchio.title': 'Profondità pistacchio',
      'gallery.pistacchio.body': 'Gelato cremoso alla crema con variegatura al pistacchio e pura pasta di pistacchio.',
      'gallery.badge.shelf': 'Shelf life 24 mesi',
      'gallery.badge.award': 'Premiato',
      'gallery.badge.retail': 'Pronto retail',
      'gallery.badge.global': 'Amato nel mondo',

      'locations.aria': 'Badiani nel mondo significa gelato',
      'locations.top': 'Badiani nel mondo',
      'locations.mid': 'significa',
      'locations.bottom': 'gelato',
      'mobile.scrollHint': '← Scorri per vedere tutto →',

      'why.title': 'Perché scegliere Badiani',
      'why.b1.title': 'Tradizione',
      'why.b1.desc': 'Dal 1932: eccellenza nella gelateria da Firenze, la culla del gelato',
      'why.b1.descHtml': '<span class="highlight-pink">Dal 1932</span>: eccellenza nella gelateria da Firenze, la culla del gelato',
      'why.b2.title': 'Presenza globale',
      'why.b2.desc': 'Oltre 30 negozi nel mondo, incluso il Carrousel du Louvre a Parigi',
      'why.b2.descHtml': 'Oltre 30 negozi nel mondo, incluso il <span class="highlight-pink">Carrousel du Louvre</span> a Parigi',
      'why.b3.title': 'Qualità Autentica',
      'why.b3.desc': 'Ingredienti italiani premium e ricette premiate, che portano la vera eredità di Firenze nel mondo.',
      'why.b4.title': 'Pronto per il retail',
      'why.b4.desc': 'Formato 500ml, shelf life 24 mesi a -18°C, compatibile con pallet EUR/EPAL',
      'why.b4.descHtml': 'Formato 500ml, <span class="highlight-pink">shelf life 24 mesi</span> a -18°C, compatibile con pallet EUR/EPAL',

      'contact.title': 'Collabora con Badiani',
      'contact.highlight': 'Porta il gusto autentico di Firenze ai tuoi clienti',
      'contact.cta': 'RICHIEDI CAMPIONI E PREZZI ORA',
      'contact.ctaAria': 'Richiedi informazioni sulla distribuzione via email',
      // finestra del modulo «Richiedi campioni e prezzi» (stesse parole della home del sito)
      'form.title': 'Richiedi campioni e prezzi',
      'form.close': 'Chiudi',
      'form.fallback': 'Se il modulo non si carica:',
      'form.openForm': 'aprilo in una nuova scheda',
      'form.emailAlt': 'oppure scrivi a',
      'mail.subject': 'Il Barattolo Gelato – richiesta campioni e prezzi',
      'mail.body': 'Buongiorno,\n\nvorrei ricevere campioni e prezzi per Il Barattolo Gelato.\n\nAzienda:\nPaese / città:\nTipo di attività (supermercato, gastronomia, distributore, HoReCa…):\nNumero di punti vendita:\nGusti di interesse (Classico, La Dolcevita, Pistacchio):\nTelefono:\n\nGrazie,\n',

      'footer.html': '&copy; {year} <span>Badiani Gelato Firenze 1932</span> &middot; Made in Italy',

      'spec.productCode': 'Codice prodotto',
      'spec.description': 'Descrizione',
      'spec.netWeight': 'Peso netto',
      'spec.eanProduct': 'EAN prodotto',
      'spec.eanCarton': 'EAN cartone',
      'spec.shelfLife': 'Shelf life',
      'spec.energy': 'Energia',
      'spec.allergens': 'Allergeni',
      'spec.mayContain': 'Può contenere',
      'spec.gluten': 'Glutine',
      'spec.ingredients': 'Ingredienti',
      'spec.storage': 'Conservazione',
      'spec.packaging': 'Imballaggio',
      'spec.nutrition': 'Valori nutrizionali',
      'spec.nutritionPer100g': 'valori medi per 100g',

      'nutrition.energy': 'Energia',
      'nutrition.fat': 'Grassi',
      'nutrition.saturates': 'di cui acidi grassi saturi',
      'nutrition.carbs': 'Carboidrati',
      'nutrition.sugars': 'di cui zuccheri',
      'nutrition.protein': 'Proteine',
      'nutrition.salt': 'Sale',
      'nutrition.fiber': 'Fibre',

      'hint.tapForSpecs': 'Tocca per le specifiche',

      'specValue.custardGelato': 'Gelato alla crema',
      'specValue.dolcevitaDesc': 'Gelato alla crema con variegatura alla gianduia 20%',
      'specValue.pistacchioDesc': 'Gelato alla crema con variegatura al pistacchio 20%',
      'specValue.shelfLife24': '24 mesi a -18°C (-0,4°F)',
      'specValue.glutenFree': 'SENZA GLUTINE',
      'specValue.mayContain.classico': 'SOIA, FRUTTA A GUSCIO, ARACHIDI',
      'specValue.mayContain.dolcevita': 'SOIA, altra FRUTTA A GUSCIO, ARACHIDI',
      'specValue.mayContain.pistacchio': 'SOIA, altra FRUTTA A GUSCIO, ARACHIDI',

      'specValue.ingredients.classico': 'PANNA fresca italiana, LATTE fresco intero italiano, zucchero, LATTE scremato in polvere, tuorlo d’UOVO da allevamento all’aperto',
      'specValue.ingredients.dolcevita': 'PANNA fresca italiana 36%, zucchero, LATTE fresco intero italiano 23%, olio di girasole, LATTE scremato in polvere, pasta di NOCCIOLA italiana, tuorlo d’UOVO italiano (allevamento all’aperto) 1,6%, cacao magro in polvere, BURRO, estratto di vaniglia Bourbon del Madagascar',
      'specValue.ingredients.pistacchio': 'PANNA fresca italiana 36%, LATTE fresco intero italiano 24%, zucchero, LATTE scremato in polvere, pasta di PISTACCHIO 5%, olio di girasole, tuorlo d’UOVO italiano (allevamento all’aperto) 1,6%, BURRO, sale',
      'specValue.storage': 'Conservare a -18°C (-0,4°F). Una volta scongelato, non ricongelare.',
      'specValue.packaging': 'Contenitore PET01, coperchio PP05, sigillo PAP22. Verifica le regole di riciclo del tuo comune.',
      'specValue.allergens.classico': 'LATTE, UOVA',
      'specValue.allergens.dolcevita': 'LATTE, NOCCIOLE, UOVA',
      'specValue.allergens.pistacchio': 'LATTE, PISTACCHIO'
    },

    es: {
      'lang.name.en': 'Inglés',
      'lang.name.it': 'Italiano',
      'lang.name.es': 'Español',
      'lang.name.fr': 'Francés',

      'nav.home': 'Inicio',
      'nav.story': 'Historia',
      'nav.products': 'Productos',
      'nav.heritage': 'Herencia',
      'nav.barattolo': 'Il Barattolo',
      'nav.contact': 'Contacto',

      // 'header.beInspired': 'INSPÍRATE',

      'music.on': 'Música: On',
      'music.off': 'Música: Off',

      'customizer.title': 'Crea tu helado',
      'customizer.subtitle': 'Elige tus sabores favoritos para tu cursor personalizado.',
      'customizer.leftScoop': 'Bola izquierda',
      'customizer.rightScoop': 'Bola derecha',
      'customizer.previewTitle': 'Tu cursor',
      'customizer.close': 'Cerrar',

      'flavor.hazelnut': 'Avellana',
      'flavor.strawberry': 'Fresa',
      'flavor.pistachio': 'Pistacho',
      'flavor.buontalenti': 'Buontalenti®',
      'flavor.mango': 'Mango',
      'flavor.blueberry': 'Arándano',

      'hero.titleHtml': 'Il Barattolo <span>GELATO</span>',
      'hero.subtitle': 'Un viaje creativo de sabores desde Florencia',
      'hero.lead': 'Helado florentino auténtico para distribución retail premium. Más de 90 años de excelencia heladera desde la cuna del helado.',
      'hero.ctaExplore': 'Explorar sabores',
      'hero.ctaAria': 'Ir a productos',

      'banner.hero': 'helado italiano icónico · desde 1932 · desde florencia con amor',
      'banner.story': 'el renacimiento del helado · nacido en florencia 1932 · tradición e innovación',
      'banner.heritage': 'de florencia al mundo · desde 1932 · un legado global',
      'banner.barattolo': 'il barattolo · formato retail premium · helado florentino en casa',
      'banner.products': 'sabores premiados · classico · pistacchio · la dolcevita',
      'banner.mission': 'saber hacer florentino · ingredientes premium · sabor inolvidable',
      'banner.gallery': 'textura sedosa · vetas generosas · belleza en cada cucharada',
      'banner.locations': 'londres · barcelona · parís · tokio · florencia · en todas partes con estilo',
      'banner.why': 'herencia · calidad · alcance global · excelencia retail · elige badiani',
      'banner.contact': 'colabora con nosotros · lleva florencia a tus clientes · crezcamos juntos',

      'story.title': 'Buontalenti®: el helado que hizo historia',
      'story.titleHtml': '<span class="story-title-main"><span class="story-title-buontalenti">Buontalenti<sup class="reg">®</sup></span>:</span><br class="st-br"> <span class="story-title-sub">el helado que hizo historia</span>',
      'story.lead': 'Según la tradición florentina, el helado nació en la corte de los Médici, en el siglo XVI, gracias al arquitecto Bernardo Buontalenti. Nuestro sabor emblema lleva su nombre.',
      'story.leadHtml': 'Según la tradición florentina, el <span class="highlight-pink">helado</span> nació en la corte de los Médici, en el siglo XVI, gracias al arquitecto <span class="highlight-pink">Bernardo Buontalenti</span>. Nuestro sabor emblema lleva su nombre.',
      'story.tl.origin': 'El origen',
      'story.tl.originDesc': 'Según la tradición, Bernardo Buontalenti inventa el helado en la Florencia renacentista, para la corte de los Médici.',
      'story.tl.originDescHtml': 'Según la tradición, Bernardo Buontalenti inventa el helado en la <span class="highlight-pink">Florencia renacentista</span>, para la corte de los Médici.',
      'story.tl.tribute': 'La Casa',
      'story.tl.tributeDesc': 'Idilio Badiani abre su heladería en Florencia. Más tarde, Paolo Pomposi hace del Buontalenti® la firma de la casa: 4 ingredientes simples (nata, leche, azúcar, huevos).',
      'story.tl.tributeDescHtml': 'Idilio Badiani abre su heladería en Florencia. Más tarde, Paolo Pomposi hace del Buontalenti® la firma de la casa: <span class="highlight-pink">4 ingredientes simples</span> <span class="nowrap">(nata, leche, azúcar, huevos)</span>.',
      'story.tl.legacy': 'El legado',
      'story.tl.legacyDesc': 'Il Barattolo Gelato lleva este icónico sabor florentino al retail premium en todo el mundo.',
      'story.tl.legacyDescHtml': 'Il Barattolo Gelato lleva este icónico sabor florentino al <span class="highlight-pink">retail premium</span> en todo el mundo.',
      'story.tl.year.today': 'HOY',
      'story.tl.year.origin': 'SIGLO XVI',

      'heritage.title': 'Un legado de excelencia',
      'heritage.intro': 'Nacida en Florencia en 1932, Badiani es uno de los productores de helado más prestigiosos del mundo. Desde la cuna del helado, hemos construido una presencia internacional en cinco países de dos continentes.',
      'heritage.introHtml': 'Nacida en <span class="highlight-pink">Florencia en 1932</span>, Badiani es uno de los productores de helado más prestigiosos del mundo. Desde la cuna del helado, hemos construido una presencia internacional en cinco países de dos continentes.',
      'heritage.stat.founded': 'Fundada en Florencia',
      'heritage.stat.stores': 'Tiendas en el mundo',
      'heritage.stat.quality': 'Calidad Italiana',
      'heritage.stat.countries': 'Países',

      'barattolo.p1': 'Gracias al éxito de nuestros sabores Buontalenti®, Buontalenti® Pistacchio y La Dolcevita, hemos desarrollado Il Barattolo GELATO: una línea premium diseñada para la distribución a gran escala.',
      'barattolo.p1Html': 'Gracias al éxito de nuestros sabores Buontalenti®, Buontalenti® Pistacchio y La Dolcevita, hemos desarrollado <span class="highlight-pink">Il Barattolo GELATO</span>: una línea premium diseñada para la <span class="highlight-pink">distribución a gran escala</span>.',
      'barattolo.p2': 'Este formato innovador lleva la auténtica calidad de nuestro helado a un público más amplio, haciéndolo más accesible sin comprometer los ingredientes ni la tradición.',
      'barattolo.p3': 'Con Il Barattolo Gelato, todos pueden disfrutar de los sabores ricos y cremosos que han hecho famosa a Badiani, ahora en un práctico formato de 500ml.',
      'barattolo.p3Html': 'Con Il Barattolo Gelato, todos pueden disfrutar de los sabores ricos y cremosos que han hecho famosa a Badiani, ahora en un práctico <span class="highlight-pink">formato de 500ml</span>.',

      'products.titlePrefix': 'Colección',
      'products.titleEm': 'Premium',
      'products.subtitle': 'Tres sabores icónicos, auténtica maestría florentina',

      'btn.viewSpecs': 'Ver ficha',

      'award.bestFlavour2015': 'Mejor sabor 2015',
      'award.worldBestSeller': 'Superventas mundial',

      'card.classico.desc': 'Nuestro sabor insignia, famoso en todo el mundo. <br>Elaborado solo con cuatro ingredientes: nata, leche, azúcar y huevos de gallinas camperas.',
      'card.classico.f1': 'Solo 4 ingredientes',
      'card.classico.f2': 'Huevos camperos',
      'card.classico.f3': 'Sin gluten',
      'card.classico.f4': 'Vida útil 24 meses',

      'card.dolcevita.desc': 'Helado de crema con gianduia de avellana y cacao (20%). <br>Con pasta de avellana italiana y vainilla Bourbon de Madagascar.',
      'card.dolcevita.f1': 'Pasta de avellana italiana',
      'card.dolcevita.f2': 'Vainilla de Madagascar',
      'card.dolcevita.f3': 'Sin gluten',
      'card.dolcevita.f4': 'Premiado',

      'card.pistacchio.desc': 'Nuestro sabor más popular en el mundo. <br>Helado de crema con crema untuosa de pistacho (20%) y 5% de pasta de pistacho puro.',
      'card.pistacchio.f1': '5% pasta de pistacho',
      'card.pistacchio.f2': 'Huevos camperos',
      'card.pistacchio.f3': 'Sin gluten',
      'card.pistacchio.f4': 'Favorito global',

      'mission.tab.mission': 'Misión',
      'mission.tab.vision': 'Visión',
      'mission.title': 'Nuestra misión',
      'mission.strong': 'Llevar sabor a tu vida',
      'mission.body': 'Llevar alegría a consumidores de todas las edades a través de nuestro helado icónico, siempre siguiendo principios de alta calidad y sostenibilidad.',
      'vision.title': 'Nuestra visión',
      'vision.strong': 'Inspirar al mundo con helado',
      'vision.body': 'Convertirnos en la mejor marca de helado del mundo e inspirar a las personas con el sabor del helado recién hecho.',

      'gallery.title': 'Dentro del Barattolo',
      'gallery.subtitle': 'Textura cremosa, recetas icónicas e impacto retail en cada tarro de 500ml.',
      'gallery.kicker': 'Historia de textura retail',
      'gallery.classico.label': 'Classico',
      'gallery.classico.title': 'Puro helado florentino',
      'gallery.classico.body': 'Solo cuatro ingredientes, nuestra identidad Buontalenti®.',
      'gallery.dolcevita.label': 'La Dolcevita',
      'gallery.dolcevita.title': 'Remolino de gianduia',
      'gallery.dolcevita.body': 'Helado de crema con gianduia de avellana y cacao, y vainilla de Madagascar.',
      'gallery.pistacchio.label': 'Pistacchio',
      'gallery.pistacchio.title': 'Profundidad de pistacho',
      'gallery.pistacchio.body': 'Helado de crema con crema de pistacho y pasta pura de pistacho.',
      'gallery.badge.shelf': '24 meses de vida útil',
      'gallery.badge.award': 'Premiado',
      'gallery.badge.retail': 'Listo para retail',
      'gallery.badge.global': 'Favorito global',

      'locations.aria': 'Badiani alrededor del mundo significa helado',
      'locations.top': 'Badiani alrededor del mundo',
      'locations.mid': 'Significa',
      'locations.bottom': 'Helado',
      'mobile.scrollHint': '← Desliza para verlo todo →',

      'why.title': 'Por qué elegir Badiani',
      'why.b1.title': 'Herencia',
      'why.b1.desc': 'Desde 1932: excelencia heladera nacida en Florencia, la cuna del helado',
      'why.b1.descHtml': '<span class="highlight-pink">Desde 1932</span>: excelencia heladera nacida en Florencia, la cuna del helado',
      'why.b2.title': 'Presencia global',
      'why.b2.desc': 'Más de 30 tiendas en el mundo, incluido el Carrousel du Louvre en París',
      'why.b2.descHtml': 'Más de 30 tiendas en el mundo, incluido el <span class="highlight-pink">Carrousel du Louvre</span> en París',
      'why.b3.title': 'Calidad Auténtica',
      'why.b3.desc': 'Ingredientes italianos premium y recetas galardonadas, llevando la verdadera herencia de Florencia al mundo.',
      'why.b4.title': 'Listo para retail',
      'why.b4.desc': 'Formato 500ml, vida útil 24 meses a -18°C, compatible con palets EUR/EPAL',
      'why.b4.descHtml': 'Formato 500ml, <span class="highlight-pink">vida útil 24 meses</span> a -18°C, compatible con palets EUR/EPAL',

      'contact.title': 'Colabora con Badiani',
      'contact.highlight': 'Lleva el auténtico sabor de Florencia a tus clientes',
      'contact.cta': 'SOLICITA MUESTRAS Y PRECIOS AHORA',
      'contact.ctaAria': 'Solicitar información de distribución por email',
      // finestra del modulo «Richiedi campioni e prezzi» (stesse parole della home del sito)
      'form.title': 'Solicita muestras y precios',
      'form.close': 'Cerrar',
      'form.fallback': 'Si el formulario no carga:',
      'form.openForm': 'ábrelo en una nueva pestaña',
      'form.emailAlt': 'o escribe a',
      'mail.subject': 'Il Barattolo Gelato – solicitud de muestras y precios',
      'mail.body': 'Hola:\n\nme gustaría recibir muestras y precios de Il Barattolo Gelato.\n\nEmpresa:\nPaís / ciudad:\nTipo de negocio (supermercado, tienda gourmet, distribuidor, HORECA…):\nNúmero de tiendas:\nSabores de interés (Classico, La Dolcevita, Pistacchio):\nTeléfono:\n\nGracias,\n',

      'footer.html': '&copy; {year} <span>Badiani Gelato Firenze 1932</span> &middot; Made in Italy',

      'spec.productCode': 'Código de producto',
      'spec.description': 'Descripción',
      'spec.netWeight': 'Peso neto',
      'spec.eanProduct': 'EAN producto',
      'spec.eanCarton': 'EAN caja',
      'spec.shelfLife': 'Vida útil',
      'spec.energy': 'Energía',
      'spec.allergens': 'Alérgenos',
      'spec.mayContain': 'Puede contener',
      'spec.gluten': 'Gluten',
      'spec.ingredients': 'Ingredientes',
      'spec.storage': 'Conservación',
      'spec.packaging': 'Envase',
      'spec.nutrition': 'Valores nutricionales',
      'spec.nutritionPer100g': 'valores medios por 100 g',

      'nutrition.energy': 'Valor energético',
      'nutrition.fat': 'Grasas',
      'nutrition.saturates': 'de las cuales saturadas',
      'nutrition.carbs': 'Hidratos de carbono',
      'nutrition.sugars': 'de los cuales azúcares',
      'nutrition.protein': 'Proteínas',
      'nutrition.salt': 'Sal',
      'nutrition.fiber': 'Fibra alimentaria',

      'hint.tapForSpecs': 'Toca para ver',

      'specValue.custardGelato': 'Helado de crema',
      'specValue.dolcevitaDesc': 'Helado de crema con gianduia 20%',
      'specValue.pistacchioDesc': 'Helado de crema con pistacho 20%',
      'specValue.shelfLife24': '24 meses a -18°C (-0,4°F)',
      'specValue.glutenFree': 'SIN GLUTEN',
      'specValue.mayContain.classico': 'SOJA, FRUTOS SECOS, CACAHUETES',
      'specValue.mayContain.dolcevita': 'SOJA, otros FRUTOS SECOS, CACAHUETES',
      'specValue.mayContain.pistacchio': 'SOJA, otros FRUTOS SECOS, CACAHUETES',

      'specValue.ingredients.classico': 'NATA fresca italiana, LECHE entera fresca italiana, azúcar, LECHE desnatada en polvo, yema de HUEVO de gallinas camperas',
      'specValue.ingredients.dolcevita': 'NATA fresca italiana 36%, azúcar, LECHE entera fresca italiana 23%, aceite de girasol, LECHE desnatada en polvo, pasta de AVELLANAS italiana, yema de HUEVO italiana (de gallinas camperas) 1,6%, cacao sin grasas en polvo, MANTEQUILLA, extracto de vainilla Bourbon de Madagascar',
      'specValue.ingredients.pistacchio': 'NATA fresca italiana 36%, LECHE entera fresca italiana 24%, azúcar, LECHE desnatada en polvo, pasta de PISTACHO 5%, aceite de girasol, yema de HUEVO italiana (de gallinas camperas) 1,6%, MANTEQUILLA, sal',
      'specValue.storage': 'Conservar a -18°C (-0,4°F). Una vez descongelado no volver a congelar.',
      'specValue.packaging': 'Envase PET01, tapa PP05 y opérculo PAP22. Verifica las normas de reciclaje de tu municipio.',
      'specValue.allergens.classico': 'LECHE, HUEVOS',
      'specValue.allergens.dolcevita': 'LECHE, AVELLANAS, HUEVOS',
      'specValue.allergens.pistacchio': 'LECHE, PISTACHO'
    },

    fr: {
      'lang.name.en': 'Anglais',
      'lang.name.it': 'Italien',
      'lang.name.es': 'Espagnol',
      'lang.name.fr': 'Français',

      'nav.home': 'Accueil',
      'nav.story': 'Histoire',
      'nav.products': 'Produits',
      'nav.heritage': 'Héritage',
      'nav.barattolo': 'Il Barattolo',
      'nav.contact': 'Contact',

      // 'header.beInspired': 'SOIS INSPIRÉ',

      'music.on': 'Musique : On',
      'music.off': 'Musique : Off',

      'customizer.title': 'Créez votre gelato',
      'customizer.subtitle': 'Choisissez vos parfums préférés pour votre curseur personnalisé !',
      'customizer.leftScoop': 'Boule gauche',
      'customizer.rightScoop': 'Boule droite',
      'customizer.previewTitle': 'Votre curseur',
      'customizer.close': 'Fermer',

      'flavor.hazelnut': 'Noisette',
      'flavor.strawberry': 'Fraise',
      'flavor.pistachio': 'Pistache',
      'flavor.buontalenti': 'Buontalenti®',
      'flavor.mango': 'Mangue',
      'flavor.blueberry': 'Myrtille',

      'hero.titleHtml': 'Il Barattolo <span>GELATO</span>',
      'hero.subtitle': 'Un voyage créatif de saveurs depuis Florence',
      'hero.lead': 'Gelato florentin authentique pour la distribution retail premium. Plus de 90 ans d’excellence depuis le berceau du gelato.',
      'hero.ctaExplore': 'Découvrir les parfums',
      'hero.ctaAria': 'Aller aux produits',

      'banner.hero': 'gelato italien iconique · depuis 1932 · de florence avec amour',
      'banner.story': 'la renaissance du gelato · né à florence en 1932 · tradition et innovation',
      'banner.heritage': 'de florence au monde · depuis 1932 · un héritage mondial',
      'banner.barattolo': 'il barattolo · format retail premium · gelato florentin à la maison',
      'banner.products': 'saveurs primées · classico · pistacchio · la dolcevita',
      'banner.mission': 'savoir-faire florentin · ingrédients premium · goût inoubliable',
      'banner.gallery': 'texture soyeuse · marbrages généreux · beauté à chaque cuillère',
      'banner.locations': 'londres · barcelone · paris · tokyo · florence · partout avec style',
      'banner.why': 'héritage · qualité · présence mondiale · excellence retail · choisissez badiani',
      'banner.contact': 'devenez partenaire · apportez florence à vos clients · grandissons ensemble',

      'story.title': 'Buontalenti® : le gelato qui a marqué l’histoire',
      'story.titleHtml': '<span class="story-title-main"><span class="story-title-buontalenti">Buontalenti<sup class="reg">®</sup></span> :</span><br class="st-br"> <span class="story-title-sub">le gelato qui a marqué l’histoire</span>',
      'story.lead': 'Selon la tradition florentine, le gelato est né à la cour des Médicis, au XVIe siècle, grâce à l’architecte Bernardo Buontalenti. Notre parfum emblématique porte son nom.',
      'story.leadHtml': 'Selon la tradition florentine, le <span class="highlight-pink">gelato</span> est né à la cour des Médicis, au XVIe siècle, grâce à l’architecte <span class="highlight-pink">Bernardo Buontalenti</span>. Notre parfum emblématique porte son nom.',
      'story.tl.origin': 'L’origine',
      'story.tl.originDesc': 'Selon la tradition, Bernardo Buontalenti invente le gelato dans la Florence de la Renaissance, pour la cour des Médicis.',
      'story.tl.originDescHtml': 'Selon la tradition, Bernardo Buontalenti invente le gelato dans la <span class="highlight-pink">Florence de la Renaissance</span>, pour la cour des Médicis.',
      'story.tl.tribute': 'La Maison',
      'story.tl.tributeDesc': 'Idilio Badiani ouvre sa gelateria à Florence. Plus tard, Paolo Pomposi fait du Buontalenti® la signature de la maison : 4 ingrédients simples (crème, lait, sucre, œufs).',
      'story.tl.tributeDescHtml': 'Idilio Badiani ouvre sa gelateria à Florence. Plus tard, Paolo Pomposi fait du Buontalenti® la signature de la maison : <span class="highlight-pink">4 ingrédients simples</span> <span class="nowrap">(crème, lait, sucre, œufs)</span>.',
      'story.tl.legacy': 'L’héritage',
      'story.tl.legacyDesc': 'Il Barattolo Gelato apporte ce parfum florentin iconique au retail premium dans le monde entier.',
      'story.tl.legacyDescHtml': 'Il Barattolo Gelato apporte ce parfum florentin iconique au <span class="highlight-pink">retail premium</span> dans le monde entier.',
      'story.tl.year.today': 'AUJOURD’HUI',
      'story.tl.year.origin': 'XVIe SIÈCLE',

      'heritage.title': 'Un héritage d’excellence',
      'heritage.intro': 'Née à Florence en 1932, Badiani est l’un des producteurs de gelato les plus prestigieux au monde. Depuis le berceau du gelato, nous avons bâti une présence internationale dans cinq pays sur deux continents.',
      'heritage.introHtml': 'Née à <span class="highlight-pink">Florence en 1932</span>, Badiani est l’un des producteurs de gelato les plus prestigieux au monde. Depuis le berceau du gelato, nous avons bâti une présence internationale dans cinq pays sur deux continents.',
      'heritage.stat.founded': 'Fondée à Florence',
      'heritage.stat.stores': 'Boutiques dans le monde',
      'heritage.stat.quality': 'Qualité Italienne',
      'heritage.stat.countries': 'Pays',

      'barattolo.p1': 'Grâce au succès de nos parfums Buontalenti®, Buontalenti® Pistacchio et La Dolcevita, nous avons développé Il Barattolo GELATO — une gamme premium conçue pour la distribution à grande échelle.',
      'barattolo.p1Html': 'Grâce au succès de nos parfums Buontalenti®, Buontalenti® Pistacchio et La Dolcevita, nous avons développé <span class="highlight-pink">Il Barattolo GELATO</span> — une gamme premium conçue pour la <span class="highlight-pink">distribution à grande échelle</span>.',
      'barattolo.p2': 'Ce format innovant apporte la qualité authentique de notre gelato à un public plus large, sans compromis sur les ingrédients ni le savoir-faire traditionnel.',
      'barattolo.p3': 'Avec Il Barattolo Gelato, chacun peut savourer les parfums riches et onctueux qui ont fait la renommée de Badiani, désormais dans un format pratique de 500ml.',
      'barattolo.p3Html': 'Avec Il Barattolo Gelato, chacun peut savourer les parfums riches et onctueux qui ont fait la renommée de Badiani, désormais dans un <span class="highlight-pink">format pratique de 500ml</span>.',

      'products.titlePrefix': 'Collection',
      'products.titleEm': 'Premium',
      'products.subtitle': 'Trois parfums iconiques, un savoir-faire florentin authentique',

      'btn.viewSpecs': 'Voir la fiche',

      'award.bestFlavour2015': 'Meilleur parfum 2015',
      'award.worldBestSeller': 'Best-seller mondial',

      'card.classico.desc': 'Notre parfum signature, célèbre dans le monde entier. <br>Élaboré avec seulement quatre ingrédients : crème, lait, sucre et œufs plein air.',
      'card.classico.f1': 'Seulement 4 ingrédients',
      'card.classico.f2': 'Œufs plein air',
      'card.classico.f3': 'Sans gluten',
      'card.classico.f4': 'Conservation 24 mois',

      'card.dolcevita.desc': 'Gelato à la crème avec gianduia noisette-cacao (20%). <br>Avec pâte de noisette italienne et vanille Bourbon de Madagascar.',
      'card.dolcevita.f1': 'Pâte de noisette italienne',
      'card.dolcevita.f2': 'Vanille de Madagascar',
      'card.dolcevita.f3': 'Sans gluten',
      'card.dolcevita.f4': 'Primé',

      'card.pistacchio.desc': 'Notre parfum le plus populaire dans le monde. <br>Gelato à la crème marbré de crème de pistache (20%) et de 5% de pâte de pistache pure.',
      'card.pistacchio.f1': '5% pâte de pistache',
      'card.pistacchio.f2': 'Œufs plein air',
      'card.pistacchio.f3': 'Sans gluten',
      'card.pistacchio.f4': 'Favori mondial',

      'mission.tab.mission': 'Mission',
      'mission.tab.vision': 'Vision',
      'mission.title': 'Notre mission',
      'mission.strong': 'Apporter de la saveur à votre vie',
      'mission.body': 'Apporter de la joie aux consommateurs de tous âges grâce à notre gelato iconique, en respectant toujours des principes de haute qualité et de durabilité.',
      'vision.title': 'Notre vision',
      'vision.strong': 'Inspirer le monde avec le gelato',
      'vision.body': 'Devenir la meilleure marque de gelato au monde et inspirer les gens avec le goût du gelato fraîchement préparé.',

      'gallery.title': 'Dans le Barattolo',
      'gallery.subtitle': 'Texture crémeuse, recettes iconiques et impact retail dans chaque pot de 500ml.',
      'gallery.kicker': 'Texture story retail',
      'gallery.classico.label': 'Classico',
      'gallery.classico.title': 'Pur gelato florentin',
      'gallery.classico.body': 'Seulement quatre ingrédients, notre identité Buontalenti®.',
      'gallery.dolcevita.label': 'La Dolcevita',
      'gallery.dolcevita.title': 'Marbrage gianduia',
      'gallery.dolcevita.body': 'Gelato à la crème, gianduia noisette-cacao et vanille de Madagascar.',
      'gallery.pistacchio.label': 'Pistacchio',
      'gallery.pistacchio.title': 'Profondeur pistache',
      'gallery.pistacchio.body': 'Gelato à la crème, crème de pistache et pâte de pistache pure.',
      'gallery.badge.shelf': '24 mois de conservation',
      'gallery.badge.award': 'Primé',
      'gallery.badge.retail': 'Prêt retail',
      'gallery.badge.global': 'Favori mondial',

      'locations.aria': 'Badiani dans le monde signifie gelato',
      'locations.top': 'Badiani dans le monde',
      'locations.mid': 'signifie',
      'locations.bottom': 'gelato',
      'mobile.scrollHint': '← Faites défiler pour tout voir →',

      'why.title': 'Pourquoi choisir Badiani',
      'why.b1.title': 'Héritage',
      'why.b1.desc': 'Depuis 1932 : l’excellence née à Florence, berceau du gelato',
      'why.b1.descHtml': '<span class="highlight-pink">Depuis 1932</span> : l’excellence née à Florence, berceau du gelato',
      'why.b2.title': 'Présence mondiale',
      'why.b2.desc': 'Plus de 30 boutiques dans le monde, dont le Carrousel du Louvre à Paris',
      'why.b2.descHtml': 'Plus de 30 boutiques dans le monde, dont le <span class="highlight-pink">Carrousel du Louvre</span> à Paris',
      'why.b3.title': 'Qualité Authentique',
      'why.b3.desc': 'Ingrédients italiens premium et recettes primées, apportant le véritable héritage de Florence au monde.',
      'why.b4.title': 'Prêt pour le retail',
      'why.b4.desc': 'Format 500ml, conservation 24 mois à -18°C, compatible palettes EUR/EPAL',
      'why.b4.descHtml': 'Format 500ml, <span class="highlight-pink">conservation 24 mois</span> à -18°C, compatible palettes EUR/EPAL',

      'contact.title': 'Devenez partenaire Badiani',
      'contact.highlight': 'Apportez le goût authentique de Florence à vos clients',
      'contact.cta': 'DEMANDEZ DES ÉCHANTILLONS ET LES PRIX MAINTENANT',
      'contact.ctaAria': 'Demander les informations de distribution par email',
      // finestra del modulo «Richiedi campioni e prezzi» (stesse parole della home del sito)
      'form.title': 'Demander des échantillons et les prix',
      'form.close': 'Fermer',
      'form.fallback': 'Si le formulaire ne se charge pas :',
      'form.openForm': 'ouvrez-le dans un nouvel onglet',
      'form.emailAlt': 'ou écrivez à',
      'mail.subject': 'Il Barattolo Gelato – demande d’échantillons et de prix',
      'mail.body': 'Bonjour,\n\nje souhaiterais recevoir des échantillons et les prix d’Il Barattolo Gelato.\n\nSociété :\nPays / ville :\nType d’activité (supermarché, épicerie fine, distributeur, CHR…) :\nNombre de points de vente :\nParfums qui vous intéressent (Classico, La Dolcevita, Pistacchio) :\nTéléphone :\n\nMerci,\n',

      'footer.html': '&copy; {year} <span>Badiani Gelato Firenze 1932</span> &middot; Made in Italy',

      'spec.productCode': 'Code produit',
      'spec.description': 'Description',
      'spec.netWeight': 'Poids net',
      'spec.eanProduct': 'EAN produit',
      'spec.eanCarton': 'EAN carton',
      'spec.shelfLife': 'Durée de conservation',
      'spec.energy': 'Énergie',
      'spec.allergens': 'Allergènes',
      'spec.mayContain': 'Peut contenir',
      'spec.gluten': 'Gluten',
      'spec.ingredients': 'Ingrédients',
      'spec.storage': 'Conservation',
      'spec.packaging': 'Emballage',
      'spec.nutrition': 'Valeurs nutritionnelles',
      'spec.nutritionPer100g': 'valeurs moyennes pour 100 g',

      'nutrition.energy': 'Énergie',
      'nutrition.fat': 'Matières grasses',
      'nutrition.saturates': 'dont acides gras saturés',
      'nutrition.carbs': 'Glucides',
      'nutrition.sugars': 'dont sucres',
      'nutrition.protein': 'Protéines',
      'nutrition.salt': 'Sel',
      'nutrition.fiber': 'Fibres alimentaires',

      'hint.tapForSpecs': 'Appuyez pour voir',

      'specValue.custardGelato': 'Gelato à la crème',
      'specValue.dolcevitaDesc': 'Gelato à la crème avec gianduia 20%',
      'specValue.pistacchioDesc': 'Gelato à la crème avec pistache 20%',
      'specValue.shelfLife24': '24 mois à -18°C (-0,4°F)',
      'specValue.glutenFree': 'SANS GLUTEN',
      'specValue.mayContain.classico': 'SOJA, FRUITS À COQUE, ARACHIDES',
      'specValue.mayContain.dolcevita': 'SOJA, autres FRUITS À COQUE, ARACHIDES',
      'specValue.mayContain.pistacchio': 'SOJA, autres FRUITS À COQUE, ARACHIDES',

      'specValue.ingredients.classico': 'CRÈME fraîche italienne, LAIT frais entier italien, sucre, LAIT écrémé en poudre, jaune d’ŒUF de poules élevées en plein air',
      'specValue.ingredients.dolcevita': 'CRÈME fraîche italienne 36%, sucre, LAIT frais entier italien 23%, huile de tournesol, LAIT écrémé en poudre, pâte de NOISETTE italienne, jaune d’ŒUF italien (de poules élevées en plein air) 1,6%, cacao maigre en poudre, BEURRE, extrait de vanille Bourbon de Madagascar',
      'specValue.ingredients.pistacchio': 'CRÈME fraîche italienne 36%, LAIT frais entier italien 24%, sucre, LAIT écrémé en poudre, pâte de PISTACHE 5%, huile de tournesol, jaune d’ŒUF italien (de poules élevées en plein air) 1,6%, BEURRE, sel',
      'specValue.storage': 'Conserver à -18°C (-0,4°F). Ne pas recongeler après décongélation.',
      'specValue.packaging': 'Bac PET01, couvercle PP05 et opercule PAP22. Vérifiez les consignes de tri de votre commune.',
      'specValue.allergens.classico': 'LAIT, ŒUFS',
      'specValue.allergens.dolcevita': 'LAIT, NOISETTES, ŒUFS',
      'specValue.allergens.pistacchio': 'LAIT, PISTACHE'
    }
  };

  const SPEC_LABEL_KEYS_BY_EN = {
    'Product Code': 'spec.productCode',
    'Description': 'spec.description',
    'Net Weight': 'spec.netWeight',
    'EAN Product': 'spec.eanProduct',
    'EAN Carton': 'spec.eanCarton',
    'Shelf Life': 'spec.shelfLife',
    'Energy': 'spec.energy',
    'Allergens': 'spec.allergens',
    'May Contain': 'spec.mayContain',
    'Gluten': 'spec.gluten',
    'Ingredients': 'spec.ingredients',
    'Storage': 'spec.storage',
    'Packaging': 'spec.packaging'
  };

  /** @type {Array<() => void>} */
  const listeners = [];

  function normalizeLang(lang) {
    if (!lang) return DEFAULT_LANG;
    const lower = String(lang).toLowerCase();
    const base = lower.split('-')[0];
    return SUPPORTED.includes(base) ? base : DEFAULT_LANG;
  }

  function getInitialLang() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const q = params.get('lang');
      if (q) return normalizeLang(q);
    } catch {
      // ignore
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return normalizeLang(saved);
    } catch {
      // ignore
    }

    return normalizeLang(navigator.language || DEFAULT_LANG);
  }

  let currentLang = getInitialLang();

  function template(str, vars) {
    if (!vars) return str;
    return String(str).replace(/\{(\w+)\}/g, (m, k) => {
      if (Object.prototype.hasOwnProperty.call(vars, k)) return String(vars[k]);
      return m;
    });
  }

  function t(key, vars) {
    const dict = STRINGS[currentLang] || STRINGS[DEFAULT_LANG];
    const fallback = STRINGS[DEFAULT_LANG] || {};
    const raw = (dict && dict[key]) != null ? dict[key] : fallback[key];
    if (raw == null) return key;
    return template(raw, vars);
  }

  function setLang(nextLang) {
    const lang = normalizeLang(nextLang);
    if (lang === currentLang) return;
    currentLang = lang;

    try {
      localStorage.setItem(STORAGE_KEY, currentLang);
    } catch {
      // ignore
    }

    document.documentElement.setAttribute('lang', currentLang);

    applyTranslations();
    listeners.forEach((fn) => {
      try { fn(); } catch { /* ignore */ }
    });
  }

  function getLang() {
    return currentLang;
  }

  function onChange(fn) {
    if (typeof fn !== 'function') return;
    listeners.push(fn);
  }

  function translateSpecLabelLabelToKey(label) {
    return SPEC_LABEL_KEYS_BY_EN[label] || null;
  }

  function translateSpecValue(productId, label, value) {
    // Keep codes/weights etc untouched; translate only known textual values.
    if (label === 'Description') {
      if (productId === 'classico' && value === 'Custard Gelato') return t('specValue.custardGelato');
      if (productId === 'dolcevita' && value === 'Custard gelato with gianduia spread 20%') return t('specValue.dolcevitaDesc');
      if (productId === 'pistacchio' && value === 'Custard gelato with pistachio spread 20%') return t('specValue.pistacchioDesc');
    }

    if (label === 'Shelf Life' && value === '24 months at -18°C (-0.4°F)') return t('specValue.shelfLife24');
    if (label === 'Gluten' && value === 'GLUTEN FREE') return t('specValue.glutenFree');

    if (label === 'May Contain') {
      if (productId === 'classico' && value === 'SOY, NUTS, PEANUTS') return t('specValue.mayContain.classico');
      if (productId === 'dolcevita' && value === 'SOY, other NUTS, PEANUTS') return t('specValue.mayContain.dolcevita');
      if (productId === 'pistacchio' && value === 'SOY, other NUTS, PEANUTS') return t('specValue.mayContain.pistacchio');
    }

    if (label === 'Ingredients' && ['classico', 'dolcevita', 'pistacchio'].includes(productId)) {
      return t('specValue.ingredients.' + productId);
    }
    if (label === 'Allergens' && ['classico', 'dolcevita', 'pistacchio'].includes(productId)) {
      return t('specValue.allergens.' + productId);
    }
    if (label === 'Storage') return t('specValue.storage');
    if (label === 'Packaging') return t('specValue.packaging');

    return value;
  }

  function injectLanguageSwitcherStyles() {
    if (document.getElementById('badiani-lang-switcher-styles')) return;

    const style = document.createElement('style');
    style.id = 'badiani-lang-switcher-styles';
    style.textContent = `
      .lang-switcher{ position:relative; display:inline-flex; align-items:center; flex:none; }
      .lang-switcher__btn{
        -webkit-appearance:none; -moz-appearance:none; appearance:none;
        display:inline-flex; align-items:center; gap:8px; min-height:44px; margin:0; padding:calc(2 * .1em) 8px 0;
        border:0; border-radius:0; background:none; color:#fff; cursor:pointer; -webkit-tap-highlight-color:transparent;
        font-family:'SuperGroteskC', Arial, sans-serif; font-weight:400; font-size:.8125rem; line-height:1; letter-spacing:.08em; text-transform:uppercase;
      }
      .lang-switcher__btn:hover, .lang-switcher__btn:active, .lang-switcher__btn[aria-expanded="true"]{ background:none; transform:none; }
      .lang-switcher__btn:focus{ outline:none; }
      .lang-switcher__btn:focus-visible{ outline:3px solid #fff; outline-offset:3px; }
      .lang-switcher__chev{ position:relative; top:-.161em; width:10px; height:10px; flex:none; transition:rotate .28s cubic-bezier(.16,1,.3,1); }
      .lang-switcher__btn[aria-expanded="true"] .lang-switcher__chev{ rotate:180deg; }

      .lang-switcher__menu{
        position:absolute; top:calc(100% + 8px); right:0; min-width:11rem; margin:0; padding:8px;
        background:#fff; border:1px solid rgba(33,64,152,.32); border-radius:0; box-shadow:0 12px 32px -12px rgba(26,50,117,.28);
        display:none; z-index:99999;
      }
      .lang-switcher__menu.is-open{ display:block; animation:lang-rise .28s cubic-bezier(.16,1,.3,1); }
      @keyframes lang-rise{ from{ opacity:0; translate:0 -8px; } to{ opacity:1; translate:0 0; } }

      .lang-switcher__item{
        display:flex; align-items:center; gap:12px; width:100%; min-height:44px; margin:0; padding:0 12px;
        border:0; border-radius:0; background:none; color:#4f515e; cursor:pointer; white-space:nowrap; text-align:left;
        font-family:'SuperGroteskA', Arial, sans-serif; font-size:.875rem; letter-spacing:0; line-height:1.3;
      }
      .lang-switcher__item::before{ content:""; width:6px; height:6px; flex:none; background:transparent; }
      .lang-switcher__item:hover, .lang-switcher__item:focus-visible{ background:none; color:#214098; text-decoration:underline; text-decoration-thickness:1px; text-underline-offset:5px; }
      .lang-switcher__item:focus-visible{ outline:3px solid #214098; outline-offset:-3px; }
      .lang-switcher__item[aria-checked="true"]{ background:none; color:#214098; }
      .lang-switcher__item[aria-checked="true"]::before{ background:#214098; }

      /* Telefono: compatto, in linea con le voci */
      @media (max-width: 900px), (max-height: 500px) and (hover: none){
        .lang-switcher__btn{ min-height:40px; padding:calc(2 * .161em) 4px 0; gap:6px; font-size:11px; letter-spacing:.05em; }
        .lang-switcher__menu{ min-width:9.5rem; }
      }
      @media (prefers-reduced-motion: reduce){
        .lang-switcher__menu.is-open{ animation:none; }
        .lang-switcher__chev{ transition:none; }
      }
    `;

    document.head.appendChild(style);
  }

  function ensureLanguageSwitcher() {
    const nav = document.getElementById('navMenu');
    if (!nav) return;

    if (document.getElementById('langSwitcher')) return;

    injectLanguageSwitcherStyles();

    const wrap = document.createElement('div');
    wrap.className = 'lang-switcher';
    wrap.id = 'langSwitcher';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-switcher__btn';
    btn.id = 'langSwitcherBtn';
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', currentLang.toUpperCase() + ' – ' + t('lang.name.' + currentLang));

    const code = document.createElement('span');
    code.id = 'langSwitcherCode';
    code.textContent = currentLang.toUpperCase();

    // chevron SVG (come icons.njk del sito: tratto 2px, estremi quadri); i font non hanno frecce
    const chev = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chev.setAttribute('class', 'lang-switcher__chev');
    chev.setAttribute('viewBox', '0 0 10 10');
    chev.setAttribute('aria-hidden', 'true');
    chev.setAttribute('focusable', 'false');
    const chevPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    chevPath.setAttribute('d', 'M1 3l4 4 4-4');
    chevPath.setAttribute('fill', 'none');
    chevPath.setAttribute('stroke', 'currentColor');
    chevPath.setAttribute('stroke-width', '2');
    chevPath.setAttribute('stroke-linecap', 'square');
    chev.appendChild(chevPath);

    btn.appendChild(code);
    btn.appendChild(chev);

    const menu = document.createElement('div');
    menu.className = 'lang-switcher__menu';
    menu.id = 'langSwitcherMenu';
    menu.setAttribute('role', 'menu');

    /** @type {Array<{lang:string,labelKey:string}>} */
    const items = [
      { lang: 'en', labelKey: 'lang.name.en' },
      { lang: 'it', labelKey: 'lang.name.it' },
      { lang: 'es', labelKey: 'lang.name.es' },
      { lang: 'fr', labelKey: 'lang.name.fr' }
    ];

    items.forEach(({ lang, labelKey }) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'lang-switcher__item';
      item.dataset.lang = lang;
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute('aria-checked', String(lang === currentLang));
      item.textContent = t(labelKey);
      item.addEventListener('click', () => {
        setLang(lang);
        closeMenu();
      });
      menu.appendChild(item);
    });

    function positionMenu() {
      const rect = btn.getBoundingClientRect();
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const isMobile = window.matchMedia && window.matchMedia('(max-width: 900px), (max-height: 500px) and (hover: none)').matches;
      const navMenu = document.getElementById('navMenu');
      const navIsOpen = navMenu && navMenu.classList.contains('active');

      if (isMobile && navIsOpen && navMenu) {
        // Mobile: render as a simple static panel inside the menu.
        menu.style.position = 'static';
        menu.style.left = 'auto';
        menu.style.right = 'auto';
        menu.style.top = 'auto';
        menu.style.bottom = 'auto';
        return;
      }

      // Desktop (or when mobile menu is not open): use fixed positioning in viewport.
      menu.style.position = 'fixed';
      const top = Math.min(rect.bottom + 10, vh - 10);
      menu.style.top = `${top}px`;

      // Clamp horizontally within the viewport.
      const menuWidth = menu.offsetWidth || 180;
      const minLeft = 10;
      const maxLeft = Math.max(minLeft, vw - menuWidth - 10);
      const desiredLeft = rect.right - menuWidth;
      const left = Math.min(Math.max(desiredLeft, minLeft), maxLeft);
      menu.style.left = `${left}px`;
      menu.style.right = 'auto';
      menu.style.bottom = 'auto';
    }

    function openMenu() {
      menu.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      positionMenu();
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      if (menu.classList.contains('is-open')) closeMenu();
      else openMenu();
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener('click', (e) => {
      if (!menu.classList.contains('is-open')) return;
      const tEl = e && e.target;
      // Check if click is inside the button wrapper or the menu itself
      if (tEl && (wrap.contains(tEl) || menu.contains(tEl))) return;
      closeMenu();
    });

    window.addEventListener('resize', () => {
      if (menu.classList.contains('is-open')) positionMenu();
    });

    window.addEventListener('scroll', () => {
      if (menu.classList.contains('is-open')) positionMenu();
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (menu.classList.contains('is-open')) closeMenu();
    });

    wrap.appendChild(btn);
    // Append menu to body to avoid clipping issues with sticky header in Chrome/Safari
    document.body.appendChild(menu);
    nav.appendChild(wrap);

    // Update labels when language changes.
    onChange(() => {
      code.textContent = currentLang.toUpperCase();
      btn.setAttribute('aria-label', currentLang.toUpperCase() + ' – ' + t('lang.name.' + currentLang));
      Array.from(menu.querySelectorAll('.lang-switcher__item')).forEach((el) => {
        const lang = el.dataset.lang;
        el.setAttribute('aria-checked', String(lang === currentLang));
        const labelKey = `lang.name.${lang}`;
        el.textContent = t(labelKey);
      });
    });
  }

  /**
   * Bindings are resolved after DOM is ready.
   * We keep bindings in a list so we can re-apply them on language change.
   */
  /** @type {Array<() => void>} */
  const bindings = [];

  function bindText(selector, key) {
    bindings.push(() => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.textContent = t(key);
    });
  }

  function bindTextAll(selector, key) {
    bindings.push(() => {
      const els = document.querySelectorAll(selector);
      if (!els || !els.length) return;
      els.forEach((el) => {
        el.textContent = t(key);
      });
    });
  }

  function bindHTML(selector, key, vars) {
    bindings.push(() => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.innerHTML = t(key, vars);
    });
  }

  function bindAttr(selector, attr, key) {
    bindings.push(() => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.setAttribute(attr, t(key));
    });
  }

  function bindDataTextForSection(sectionId, key) {
    bindings.push(() => {
      const el = document.querySelector(`.section-divider-data[data-section="${sectionId}"]`);
      if (!el) return;
      el.dataset.text = t(key);
    });
  }

  function applyTranslations() {
    // Ensure lang attribute is correct even on first run.
    document.documentElement.setAttribute('lang', currentLang);

    // Update title (simple, no markup)
    document.title = 'Badiani Il Barattolo — Iconic Italian Gelato for Retail';

    // Header / nav
    // bindText('#beInspiredText', 'header.beInspired');

    // Desktop nav (story/products/contact)
    bindText('#navMenu a[href="#story"]', 'nav.story');
    bindText('#navMenu a[href="#products"]', 'nav.products');
    bindText('#navMenu a[href="#contact"]', 'nav.contact');

    // Mobile nav (home + more anchors)
    bindText('#navMenu a[href="#hero"]', 'nav.home');
    bindText('#navMenu a[href="#heritage"]', 'nav.heritage');
    bindText('#navMenu a[href="#barattolo"]', 'nav.barattolo');

    // Music button label is controlled by the page script; we just provide keys.

    // Customizer modal
    bindText('.customizer-title', 'customizer.title');
    bindText('.customizer-subtitle', 'customizer.subtitle');
    bindText('#customizerModal .flavor-selector:nth-of-type(1) .flavor-label', 'customizer.leftScoop');
    bindText('#customizerModal .flavor-selector:nth-of-type(2) .flavor-label', 'customizer.rightScoop');
    bindText('#customizerModal .preview-title', 'customizer.previewTitle');
    bindAttr('#customizerClose', 'aria-label', 'customizer.close');

    // Flavor names
    bindTextAll('#customizerModal .flavor-option[data-name="Hazelnut"] .flavor-name', 'flavor.hazelnut');
    bindTextAll('#customizerModal .flavor-option[data-name="Strawberry"] .flavor-name', 'flavor.strawberry');
    bindTextAll('#customizerModal .flavor-option[data-name="Pistachio"] .flavor-name', 'flavor.pistachio');
    bindTextAll('#customizerModal .flavor-option[data-name="Buontalenti®"] .flavor-name', 'flavor.buontalenti');
    bindTextAll('#customizerModal .flavor-option[data-name="Mango"] .flavor-name', 'flavor.mango');
    bindTextAll('#customizerModal .flavor-option[data-name="Blueberry"] .flavor-name', 'flavor.blueberry');

    // Hero
    bindText('#hero .hero-subtitle', 'hero.subtitle');
    bindText('#hero .hero-content > p:not(.hero-subtitle)', 'hero.lead');
    bindText('#hero .hero-cta .btn-label', 'hero.ctaExplore');

    // Banners (data + visible divider paragraphs)
    bindDataTextForSection('hero', 'banner.hero');
    bindDataTextForSection('story', 'banner.story');
    bindDataTextForSection('heritage', 'banner.heritage');
    bindDataTextForSection('barattolo', 'banner.barattolo');
    bindDataTextForSection('products', 'banner.products');
    bindDataTextForSection('mission', 'banner.mission');
    bindDataTextForSection('gallery', 'banner.gallery');
    bindDataTextForSection('locations', 'banner.locations');
    bindDataTextForSection('why', 'banner.why');
    bindDataTextForSection('contact', 'banner.contact');

    // Visible dividers: match by the section immediately following
    bindings.push(() => {
      document.querySelectorAll('.section-divider.visible').forEach((divider) => {
        // Look ahead for the next section-divider-data or section in DOM
        const nextData = divider.nextElementSibling;
        if (nextData && nextData.classList && nextData.classList.contains('section-divider-data')) {
          const keyBySection = {
            hero: 'banner.hero',
            story: 'banner.story',
            heritage: 'banner.heritage',
            barattolo: 'banner.barattolo',
            products: 'banner.products',
            mission: 'banner.mission',
            gallery: 'banner.gallery',
            locations: 'banner.locations',
            why: 'banner.why',
            contact: 'banner.contact'
          };
          const section = nextData.dataset.section;
          const key = section && keyBySection[section];
          if (!key) return;
          const p = divider.querySelector('p');
          if (p) p.textContent = t(key);
        }
      });
    });

    // Story
    bindHTML('#story .story-title', 'story.titleHtml');
    bindHTML('#story .story-lead', 'story.leadHtml');

    bindText('#story .timeline-item:nth-child(1) .timeline-title', 'story.tl.origin');
    bindText('#story .timeline-item:nth-child(2) .timeline-title', 'story.tl.tribute');
    bindText('#story .timeline-item:nth-child(3) .timeline-title', 'story.tl.legacy');

    bindHTML('#story .timeline-item:nth-child(1) .timeline-desc', 'story.tl.originDescHtml');
    bindHTML('#story .timeline-item:nth-child(2) .timeline-desc', 'story.tl.tributeDescHtml');
    bindHTML('#story .timeline-item:nth-child(3) .timeline-desc', 'story.tl.legacyDescHtml');

    // Heritage
    bindText('#heritage > h2', 'heritage.title');
    bindHTML('#heritage .heritage-intro', 'heritage.introHtml');
    bindText('#heritage .stat:nth-child(1) .stat-label', 'heritage.stat.founded');
    bindText('#heritage .stat:nth-child(2) .stat-label', 'heritage.stat.stores');
    bindText('#heritage .stat:nth-child(3) .stat-label', 'heritage.stat.quality');
    bindText('#heritage .stat:nth-child(4) .stat-label', 'heritage.stat.countries');

    // Barattolo paragraphs (keep highlight spans)
    bindings.push(() => {
      const p = Array.from(document.querySelectorAll('#barattolo .barattolo-text p'));
      if (p[0]) p[0].innerHTML = t('barattolo.p1Html');
      if (p[1]) p[1].textContent = t('barattolo.p2');
      if (p[2]) p[2].innerHTML = t('barattolo.p3Html');
    });

    // Products
    bindings.push(() => {
      const h2 = document.querySelector('#products .section-title');
      if (!h2) return;
      const span = h2.querySelector('span');
      if (!span) {
        h2.textContent = `${t('products.titlePrefix')} ${t('products.titleEm')}`;
        return;
      }
      // Keep span styling.
      h2.childNodes.forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) n.nodeValue = t('products.titlePrefix') + ' ';
      });
      span.textContent = t('products.titleEm');
    });
    bindText('#products .section-subtitle', 'products.subtitle');

    // Card buttons + awards
    bindings.push(() => {
      document.querySelectorAll('.card .card-btn').forEach((btn) => {
        btn.textContent = t('btn.viewSpecs');
      });
    });

    bindText('.card.dolcevita .card-award', 'award.bestFlavour2015');
    bindText('.card.pistacchio .card-award', 'award.worldBestSeller');

    // Card descriptions + features (desktop+mobile)
    bindHTML('.card.classico .card-description', 'card.classico.desc');
    bindText('.card.classico .card-features li:nth-child(1)', 'card.classico.f1');
    bindText('.card.classico .card-features li:nth-child(2)', 'card.classico.f2');
    bindText('.card.classico .card-features li:nth-child(3)', 'card.classico.f3');
    bindText('.card.classico .card-features li:nth-child(4)', 'card.classico.f4');

    bindHTML('.card.dolcevita .card-description', 'card.dolcevita.desc');
    bindText('.card.dolcevita .card-features li:nth-child(1)', 'card.dolcevita.f1');
    bindText('.card.dolcevita .card-features li:nth-child(2)', 'card.dolcevita.f2');
    bindText('.card.dolcevita .card-features li:nth-child(3)', 'card.dolcevita.f3');
    bindText('.card.dolcevita .card-features li:nth-child(4)', 'card.dolcevita.f4');

    bindHTML('.card.pistacchio .card-description', 'card.pistacchio.desc');
    bindText('.card.pistacchio .card-features li:nth-child(1)', 'card.pistacchio.f1');
    bindText('.card.pistacchio .card-features li:nth-child(2)', 'card.pistacchio.f2');
    bindText('.card.pistacchio .card-features li:nth-child(3)', 'card.pistacchio.f3');
    bindText('.card.pistacchio .card-features li:nth-child(4)', 'card.pistacchio.f4');

    // Mission / Vision
    bindText('#mission .mv-tab[data-target="mission-box"]', 'mission.tab.mission');
    bindText('#mission .mv-tab[data-target="vision-box"]', 'mission.tab.vision');

    bindText('#mission .mission-box h2', 'mission.title');
    bindText('#mission .mission-box strong', 'mission.strong');
    bindText('#mission .mission-box p:nth-of-type(2)', 'mission.body');

    bindText('#mission .vision-box h2', 'vision.title');
    bindText('#mission .vision-box strong', 'vision.strong');
    bindText('#mission .vision-box p:nth-of-type(2)', 'vision.body');

    // Gallery
    bindText('#gallery .gallery-kicker', 'gallery.kicker');
    bindText('#gallery > h2', 'gallery.title');
    bindText('#gallery .gallery-subtitle', 'gallery.subtitle');
    bindText('#gallery .texture-classico .texture-label', 'gallery.classico.label');
    bindText('#gallery .texture-classico h3', 'gallery.classico.title');
    bindText('#gallery .texture-classico p', 'gallery.classico.body');
    bindText('#gallery .texture-dolcevita .texture-label', 'gallery.dolcevita.label');
    bindText('#gallery .texture-dolcevita h3', 'gallery.dolcevita.title');
    bindText('#gallery .texture-dolcevita p', 'gallery.dolcevita.body');
    bindText('#gallery .texture-pistacchio .texture-label', 'gallery.pistacchio.label');
    bindText('#gallery .texture-pistacchio h3', 'gallery.pistacchio.title');
    bindText('#gallery .texture-pistacchio p', 'gallery.pistacchio.body');
    bindText('#gallery [data-i18n="gallery.badge.shelf"]', 'gallery.badge.shelf');
    bindText('#gallery [data-i18n="gallery.badge.award"]', 'gallery.badge.award');
    document.querySelectorAll('#gallery [data-i18n="gallery.badge.retail"]').forEach((el) => { el.textContent = t('gallery.badge.retail'); });
    bindText('#gallery [data-i18n="gallery.badge.global"]', 'gallery.badge.global');
    bindText('#gallery .texture-cta .btn-label', 'contact.cta');

    // Locations headline
    bindAttr('#locations .world-means-title', 'aria-label', 'locations.aria');
    bindText('#locations .wmt-top', 'locations.top');
    bindText('#locations .wmt-mid', 'locations.mid');
    bindText('#locations .wmt-bottom', 'locations.bottom');
    bindText('#locations .global-presence-scroll-hint', 'mobile.scrollHint');

    // Why
    bindings.push(() => {
      const h2 = document.querySelector('#why > h2');
      if (!h2) return;
      const span = h2.querySelector('span');
      if (!span) {
        h2.textContent = t('why.title');
        return;
      }
      // Keep the brand span.
      const brand = span.outerHTML;
      const base = t('why.title');
      // Replace the brand word if present; otherwise build from scratch.
      const textOnly = base.replace(/Badiani/i, '').trim();
      h2.innerHTML = `${textOnly} ${brand}`.trim();
    });
    bindText('#why .benefit:nth-child(1) h3', 'why.b1.title');
    bindText('#why .benefit:nth-child(2) h3', 'why.b2.title');
    bindText('#why .benefit:nth-child(3) h3', 'why.b3.title');
    bindText('#why .benefit:nth-child(4) h3', 'why.b4.title');

    bindings.push(() => {
      const p1 = document.querySelector('#why .benefit:nth-child(1) p');
      const p2 = document.querySelector('#why .benefit:nth-child(2) p');
      const p3 = document.querySelector('#why .benefit:nth-child(3) p');
      const p4 = document.querySelector('#why .benefit:nth-child(4) p');

      if (p1) p1.innerHTML = t('why.b1.descHtml');
      if (p2) p2.innerHTML = t('why.b2.descHtml');
      if (p3) p3.textContent = t('why.b3.desc');
      if (p4) p4.innerHTML = t('why.b4.descHtml');
    });

    // Contact
    bindText('#contact > h2', 'contact.title');
    bindText('#contact .highlight', 'contact.highlight');
    bindText('#requestDistributionBtn .btn-label', 'contact.cta');
    bindings.push(() => {
      document.querySelectorAll('.barattolo-cta .btn-label').forEach((el) => {
        el.textContent = t('contact.cta');
      });
    });

    // Finestra del modulo: titolo e nota via data-i18n; qui gli attributi
    bindAttr('#formModal .form-modal__close', 'aria-label', 'form.close');
    bindAttr('#formModal iframe', 'title', 'form.title');

    // Pulsanti email: la mail si apre con oggetto e una traccia da compilare, nella lingua scelta
    bindings.push(() => {
      const href = 'mailto:retail@badiani1932.com?subject=' + encodeURIComponent(t('mail.subject')) +
        '&body=' + encodeURIComponent(t('mail.body').replace(/\n/g, '\r\n'));
      document.querySelectorAll('a[href^="mailto:retail@badiani1932.com"]').forEach((a) => a.setAttribute('href', href));
    });

    // Footer
    bindHTML('#footerLegal', 'footer.html', { year: new Date().getFullYear() });

    // Generic data-i18n hooks (text/HTML) for any future elements
    bindings.push(() => {
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        el.textContent = t(key);
      });
      document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        if (!key) return;
        el.innerHTML = t(key);
      });
    });

    // Apply (run) bindings now
    const run = () => {
      // Recreate bindings list each time to avoid duplicates
      // (bindings are built by calls above; after running, reset for next apply)
      const fns = bindings.splice(0, bindings.length);
      fns.forEach((fn) => {
        try { fn(); } catch { /* ignore */ }
      });
    };

    run();

    // Notify listeners (e.g., other scripts can update).
  }

  // Expose public API
  window.BadianiI18n = {
    t,
    setLang,
    getLang,
    onChange,
    translateSpecLabelLabelToKey,
    translateSpecValue
  };

  function init() {
    document.documentElement.setAttribute('lang', currentLang);
    ensureLanguageSwitcher();
    applyTranslations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

