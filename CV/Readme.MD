# Nobita Nobi-ren curriculuma

Nobita Nobi pertsonaiaren CV-a HTML eta CSS bidez eginda, hauek erabilita: `box-sizing: border-box`, CSS aldagaiak, `rem` unitateak, `calc()`, `min()`, atzealde-irudia, gradientea, txartel moldagarriak, Grid, Flexbox eta diseinu erantzulea (responsive).

## Fitxategiak

- `index.html` — CV-aren egitura.
- `nobita.css` — estilo guztiak.
- `nobita.jpg` — profileko argazkia (`index.html` fitxategiaren karpeta berean egon behar du).
- `escuela.jpg` — goiburuaren atzealdeko argazkia (`index.html` fitxategiaren karpeta berean egon behar du).

## CV-aren egitura

Son Goku-ren CV-aren maketazioan oinarrituta (argazkia eta alboko barra altuera osoan, kolore bakarreko goiburua eduki-zutabearen barruan, eta atzealde neutro baten gainean zentratutako zabalera finkoko "orria"), dokumentua honela banatzen da:

1. **`.page-outer`** — leiho osoa betetzen duen atzealde neutroa, orria zentratzen duena, PDF ikusle baten itxura emanez.
2. **`.sheet`** — CV-aren "orria" bera: zabalera finkoa (`min(60rem, 96vw)`), ertz biribilduak eta itzala, nabigatzailearen zabalera osoa hartzen duen web bat izan beharrean orri bat dela ematen duena.
3. **`.sidebar`** — argazkia, datu pertsonalak, gaitasunak (aurrerapen-barrekin), objektu gakoak, hizkuntzak eta aipu bat. Orriaren altuera osoa hartzen du (ez bakarrik bere edukiarena), Goku-ren CV-an bezala.
4. **`.main-content`** — kolore bakarreko goiburua (`.cv-header`), bloke ilun bakar batean izena (`.header-top`) eta profil profesionala (`.header-profile`, mahaigainean bi zutabetan) biltzen dituena — Goku-ren CV-an bezala, non profila goiburuari itsatsita dagoen eta ez den kutxa bereizi bat. Azpian, atzealde zuriaren gainean: esperientzia (ez paragrafoak, zerrenda buletadunak), prestakuntza 01-04 zenbakitutako txartelen bidez, eta bi zutabeko bloke bat, lorpen nabarmenak (zerrenda) eta maniak eta trikimailuak (etiketak) elkarrekin dituena — Goku-ren "Logros destacados / Técnicas y transformaciones" atala errepikatuz. Balentrien erregistroa taula batekin amaitzen da.

Orriak **Flexbox** erabiltzen du layout orokor gisa (`.sheet`): mugikorrean alboko barra eta edukia zutabe batean pilatzen ditu; media query-tik aurrera, errenkadan jartzen ditu, alboko barra zabalera finkoarekin eta edukia gainerakoa betetzen. Atalen barruan **Grid** erabiltzen da `gap`-arekin prestakuntza-txartelentzat (`.training-grid`) eta lorpen/maniak blokerako (`.split-block`), eta **Flexbox** etiketak, txartelen goiburuak, datu pertsonalak eta profil profesionalaren bi zutabeak lerrokatzeko. Balentrien erregistroa HTML taula semantiko batean erakusten da, `.table-wrapper` batean bilduta `overflow-x: auto`-rekin, mugikorrean irakurgarria izan dadin beste media query bat behar izan gabe.

## Datu sinplifikatuak

Goiburuko posta elektronikoa eta telefono fikziozkoak kendu dira (lehen hezkuntzako ikasle batentzat errealistak ez direnez), eta etiketa laburrekin ordezkatu dira, alboko barran dagoeneko erabiltzen zen `.tag` klase bera berrerabiliz, klase berri bat sortu beharrean.

## Animazioak

Orria sarrera-animazio txiki batekin aurkezten da kargatzean, lehen baino bizi-bizia baina serio jarraituz (errebotarik edo keinurik gabe):

- Alboko barra eta eduki nagusia atalez atal agertzen dira, desagerpen arin batekin eta gora egiten duen desplazamendu batekin (`@keyframes fade-in-up`), bloke bakoitza aurrekoarekiko atzerapen txiki batekin.
- Gaitasunen barrak 0tik azken baliora "hazten" dira kargatzean (`@keyframes grow-bar`).
- Txartelak apur bat altxatzen dira sagua gainetik pasatzean.
- Etiketek eta erregistro-taulako errenkadek kolorea aldatzen dute sagua gainetik pasatzean.

Dena `transition` edo animazio laburrekin (0,2 eta 0,6 segundo artean) eta JavaScript gabe.

## Berrerabilitako klaseak

- `.widget` — alboko barrako datu pertsonalen, gaitasunen, objektu gakoen eta hizkuntzen txartel berberak.
- `.card` — hiru esperientzia-lanpostuen oinarrizko txartel bera.
- `.tag` — etiketa-estilo bera objektu gakoetarako, hizkuntzetarako, maniak eta trikimailuetarako, eta goiburuko etiketetarako (`.tag-light` aldaerarekin atzealde ilunaren gainean ongi ikusteko).

## Aplikatutako CSS teknikak

- `:root`-eko aldagaiak koloreetarako, ertzen erradioetarako, letra-tamainetarako (`rem`) eta tarteetarako, balioak errepikatzea saihesteko.
- `calc()` goiburu ilunaren padding bertikalerako (`calc(var(--space-lg) + 0.5rem)`).
- `min()` orriaren zabalera mugatzeko (`min(60rem, 96vw)`) eta goiburuko izenaren tamainarako (`min(2.5rem, 8vw)`).
- Benetako atzealde-irudia (`escuela.jpg`, oso lausotua), puntu-patroi batekin (`radial-gradient`), eraztun dekoratibo batekin eta urre nagusiaren eta marroi ilunaren arteko gradiente lineal nabarmen batekin (`linear-gradient(135deg, var(--color-primary) 0%, var(--color-header-bg) 62%)`) konbinatuta goiburuan, Goku-ren goiburuko zeru gradientea eta enblema zirkularra imitatuz.
- Paleta minimalista: zuria oinarri gisa, urre-azentu apal bat, eta ñabardura iluna goiburuan eta oinaldean bakarrik, Goku-ren CV-aren kolore bakarreko blokea imitatuz.
- `!important` inon ez da erabili.

## Diseinu erantzulea: mobile first

**Mobile first** ikuspegia aukeratu da: oinarrizko estiloek (media query gabekoek) zutabe bakarra definitzen dute, pantaila txikietarako pentsatuta, eta handik aurrera konplexutasuna pixkanaka gehitzen da. Ikuspegi hau aukeratu da, zeren:

- CV bat askotan mugikorretik kontsultatzen da (adibidez, esteka partekatzean), beraz esperientzia hori oinarri gisa lehenestea zentzuzkoa da.
- Zutabe bakarretik abiatzeak edukia eta irakurketa-ordena sinplifikatzera behartzen du bi zutabeko antolaketa konplexuagoa gehitu aurretik, mahaigaineko diseinu konplexu bat "mozten" joan beharrean.
- Errazagoa da pantaila handietarako arauak `min-width`-ekin gehitzen joatea, mahaigaineko diseinu oso bat pantaila txikietan `max-width`-ekin gainidaztea baino.

## Media query

Breakpoint bakarra erabiltzen da:

```css
@media (min-width: 48rem) { ... }
```

48rem 768px-ren baliokidea da, mugikorrak (horizontalean daudenak barne) eta tablet/ordenagailu eramangarri txikiak bereizten dituen ohiko mugarria. Handik aurrera:

- `.sheet` zutabetik errenkadara pasatzen da: alboko barrak (`.sidebar`) zabalera finkoa hartzen du (`--sidebar-width`) eta edukiak (`.main-content`) gainerakoa betetzen du, alboko barra automatikoki orriaren altuera osora luzatzen delarik `align-items: stretch` erabiliz.
- `.training-grid` 1etik 4 zutabetara pasatzen da eta `.split-block` (lorpenak + maniak) 1etik 2ra, biak `gap`-a mantenduz.
- `.header-profile` zutabetik errenkadara pasatzen da, profilaren etiketa/izenburua eta paragrafoa elkarren ondoan gera daitezen, Goku-ren goiburuan bezala.

Zabalera horretatik behera, alboko barra edukiaren gainean pilatzen da eta sareta guztiak zutabe bakarrera pasatzen dira, zoomik egin edo horizontalki mugitu behar izan gabe irakurgarria izan dadin.
