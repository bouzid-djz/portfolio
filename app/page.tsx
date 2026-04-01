import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Timeline } from "@/components/timeline"
import { Veille } from "@/components/veille"
import { Contact } from "@/components/contact"
import { SidebarMenu } from "@/components/sidebar-menu"
import { GridBackground } from "@/components/grid-background"
import { Terminal } from "@/components/terminal"
import { ScrollProgress } from "@/components/scroll-progress"
import { KonamiEasterEgg } from "@/components/konami-easter-egg"
import { PresentationMode } from "@/components/presentation-mode"

const funFacts = [
  "🗼 La tour Eiffel était initialement peinte en jaune brun lors de l'Exposition universelle de 1889.",
  "🐋 Une baleine bleue émet des sons jusqu'à 188 décibels, plus fort qu'un réacteur d'avion.",
  "🎡 En 1912, un parc d'attractions appelé Luna Park existait sur la glace du fleuve Hudson à New York.",
  "🦠 Le mot « quarantaine » vient de l'italien « quaranta giorni » (quarante jours), période d'isolement durant la peste noire.",
  "🦪 Les huîtres changent de sexe plusieurs fois au cours de leur vie selon les besoins de leur banc.",
  "📺 Lors de la première émission TV en couleur aux États-Unis en 1954, seulement 0,1% des foyers avaient un téléviseur compatible.",
  "🐕 Le chien de Pavlov n'était pas un seul animal, mais des dizaines utilisés dans ses recherches sur le conditionnement.",
  "📚 En Islande, la tradition du « Jólabókaflóð » offre des livres le soir de Noël pour lire toute la nuit.",
  "💻 Le Z3 de Konrad Zuse (1941), premier ordinateur programmable, utilisait des relais téléphoniques et faisait 3-4 opérations/seconde.",
  "🦩 Les flamants roses naissent gris/blanc ; leur couleur vient des caroténoïdes des crevettes et algues qu'ils mangent.",
  "✈️ Pendant la Seconde Guerre mondiale, les Britanniques ont utilisé du linoléum imitant des voies ferrées pour dérouter les bombers nazis.",
  "📏 Le système métrique a été adopté en France en 1795, mais seulement rendu obligatoire en 1840.",
  "🦜 Des perroquets gris du Gabon ont été observés utilisant des bâtons comme outils pour se gratter dans la nature.",
  "😂 La plus ancienne blague connue (tablette sumérienne, ~1900 av. J.-C.) portait sur une femme n'ayant jamais péri dans les genoux de son mari.",
  "🐜 Certaines fourmis amputent les pattes de camarades blessés pour stopper les infections, un comportement de soins médicaux chez les invertébrés.",
  "🍯 Le miel ne périme jamais : des pots comestibles ont été trouvés dans des tombeaux égyptiens vieux de 3 000 ans.",
  "🪐 Une journée sur Vénus (243 jours terrestres) est plus longue qu'une année sur Vénus (225 jours terrestres).",
  "📖 Le mot « set » en anglais a plus de 430 définitions différentes dans le dictionnaire Oxford.",
  "🐙 Les pieuvres ont trois cœurs : deux pompent le sang vers les branchies, un vers le corps.",
  "🐀 En 2019, des scientifiques ont fait pousser des oreilles humaines sur des rats pour étudier la greffe de tissus.",
  "🦋 Le premier ordinateur « bug » fut un papillon coincé dans un relais du Harvard Mark II en 1947.",
  "🐱 Les chats ne peuvent pas goûter le sucré : leurs récepteurs gustatifs pour le sucre sont non fonctionnels.",
  "🏯 La Grande Muraille de Chine n'est pas visible à l'œil nu depuis l'espace, contrairement au mythe.",
  "🦄 Un groupe de licornes s'appelle une « bénédiction » selon le bestiaire médiéval.",
  "☕ Le café fut découvert par un berger éthiopien qui nota l'énergie de ses chèvres après qu'elles eurent mangé des baies de caféier.",
  "🦴 Les omoplates humaines flottent uniquement rattachées par des muscles, sans articulation osseuse fixe.",
  "🩸 En Antarctique, il existe une chute d'eau sanglante appelée « Blood Falls », due au fer oxydé dans l'eau souterraine.",
  "🤖 Le mot « robot » vient du tchèque « robota » (travail forcé), introduit par Karel Čapek en 1920.",
  "☁️ Les nuages cumulonimbus peuvent peser jusqu'à 500 000 tonnes, équivalent à 100 éléphants.",
  "🍌 La banane est légèrement radioactive à cause de son potassium-40 naturel (mais inoffensive).",
  "☿ Un jour sur Mercure dure deux années mercuriennes à cause de sa rotation lente et de son orbite rapide.",
  "📧 Le premier spam électronique date de 1978 : un message publicitaire envoyé à 600 utilisateurs d'ARPANET.",
  "🦚 Les autruches ne mettent pas leur tête dans le sol : elles baissent la tête pour retourner leurs œufs dans le nid.",
  "🦀 Le sang des limules (crabes chevaliers) est bleu et utilisé pour tester la stérilité des vaccins.",
  "🚁 En 2021, une équipe a fait voler un hélicoptère sur Mars pour la première fois (Ingenuity).",
  "💬 Le mot « désespéré » vient du latin « desperare » = perdre tout espoir, littéralement « sans espoir ».",
  "💧 Une goutte d'eau contient environ 1,5 sextillion de molécules d'H₂O.",
  "🐨 Les koalas ont des empreintes digitales si proches de celles des humains qu'elles peuvent brouiller des enquêtes criminelles.",
  "🌿 Le plus ancien chewing-gum connu a 9 000 ans : il était fait de résine de bouleau trouvé en Suède.",
  "☠️ Les pirates hissaient souvent un drapeau noir, pas forcément la tête de mort (cette dernière venant plus tard).",
  "🧠 Le cerveau humain génère assez d'électricité pour faire briller une petite ampoule (environ 20 watts).",
  "🦔 En Japon, il existe des cafés où l'on peut caresser des hérissons africains pygmées.",
  "🗼 La tour de Pise ne penchait pas initialement : l'inclinaison commença dès la construction du troisième étage en 1178.",
  "⚡ Un éclair contient assez d'énergie pour toaster 100 000 tranches de pain.",
  "❓ Le mot « quiz » aurait été inventé en 1791 par un théâtre de Dublin comme pari : faire entrer un mot sans sens dans la langue en 48 heures.",
  "⭐ Les étoiles de mer peuvent régénérer un corps entier à partir d'un seul bras tant qu'une partie du disque central reste.",
  "💥 En 1908, une explosion au-dessus de la Tunguska (Sibérie) rasa 2 000 km² de forêt sans laisser de cratère (probablement une comète).",
  "🐣 Les poussins communiquent dans l'œuf par des cris avant l'éclosion pour synchroniser leur naissance.",
  "📜 Le premier brevet déposé aux États-Unis (1790) concernait un procédé pour produire de la potasse et de la cendre de bois.",
  "🚢 Des bateaux en béton ont été construits durant les deux guerres mondiales lorsque l'acier manquait (ex : SS Selma en 1919).",
  "🤧 Un éternuement peut atteindre 160 km/h, plus rapide qu'un guépard au sprint.",
  "😴 Le mot « pyjama » vient du persan « pay-jama » = vêtement de jambe, adopté par les Britanniques en Inde.",
  "🐜 Une seule fourmi légionnaire peut soulever 50 fois son propre poids.",
  "🌿 Le Sahara était autrefois un paysage verdoyant avec des lacs et des rivières il y a 6 000 ans (période humide africaine).",
  "🤳 Le premier selfie connu date de 1839 : un autoportrait pris par Robert Cornelius avec un daguerréotype.",
  "🐦 Les pigeons peuvent se reconnaître eux-mêmes dans un miroir, signe de conscience de soi rare chez les oiseaux.",
  "🇰🇷 En Corée du Sud, il est considéré comme impoli d'écrire son nom en encre rouge (associé à la mort).",
  "🍄 Le plus grand organisme vivant est un champignon Armillaria dans l'Oregon couvrant 9,6 km² et âgé de 2 400 ans.",
  "🦎 Les lézards à cornes du désert peuvent envoyer du sang par leurs yeux pour repousser les prédateurs.",
  "💰 Le mot « tarif » vient de l'arabe « taʿrīf » = notification, passant par l'italien « tariffa » avant le français.",
  "🐴 Les hippocampes mâles portent les œufs dans une poche ventrale jusqu'à l'éclosion.",
  "🎬 Le premier film projeté publiquement fut « La Sortie de l'usine Lumière à Lyon » en 1895.",
  "🐜 Les fourmis coupeuses de feuilles ne mangent pas les feuilles : elles les utilisent pour cultiver des champignons dans leurs nids.",
  "🐙 En 2020, des chercheurs ont découvert que les pieuvres peuvent éditer leur propre ARN pour s'adapter à l'eau froide.",
  "🍳 Le mot « casserole » vient du provençal « cassa » = bassine, dérivé du latin « cattia ».",
  "🌿 Les bananes poussent vers le haut, pas vers le bas : elles sont négativement géotropes.",
  "💻 Le premier virus informatique fut le « Creeper » en 1971, affichant « I'M THE CREEPER : CATCH ME IF YOU CAN ».",
  "⭐ Les étoiles de mer n'ont pas de cerveau ni de sang : elles utilisent de l'eau de mer pour transporter les nutriments.",
  "📱 En Finlande, il existe une compétition officielle de lancer de téléphone portable depuis 2000.",
  "🍯 Le miel de manuka néo-zélandais possède des propriétés antibactériennes uniques utilisées en médecine.",
  "🦒 Une girafe peut nettoyer ses oreilles avec sa langue de 50 cm de long.",
  "🔤 Le mot « alphabet » vient des deux premières lettres de l'alphabet grec : alpha et bêta.",
  "🐦 Les pies bavardes peuvent reconnaître des visages humains individuels et se souvenir de ceux qui les ont menacés.",
  "🌸 Le premier parfum synthétique fut créé en 1868 : la coumarine, imitant l'odeur de la fève tonka.",
  "🦣 En 2018, des scientifiques ont transposé le génome d'un mammouth laineux dans des cellules d'éléphant d'Asie.",
  "🦭 Les otaries peuvent fermer leurs oreilles lorsqu'elles plongent pour empêcher l'eau d'entrer.",
  "☕ Le mot « café » vient de l'arabe « qahwa », initialement utilisé pour un vin stimulant.",
  "🐜 Les fourmis légionnaires forment des ponts vivants avec leurs corps pour permettre au reste de la colonie de traverser des obstacles.",
  "💎 Le plus grand diamant jamais trouvé, le Cullinan (3 106 carats), fut offert au roi Édouard VII en 1907.",
  "🇮🇸 En Islande, il n'y a pas de moustiques indigènes : le climat et la géologie empêchent leur cycle de vie.",
  "🐍 Une seule goutte de venin de serpent à sonnettes peut tuer jusqu'à 80 humains.",
  "🌅 Le mot « matin » vient du latin « matutinus » lié à Matuta, déesse de l'aurore.",
  "🌳 Les arbres communiquent via un réseau souterrain de champignons appelé le « Wood Wide Web », échangeant nutriments et signaux d'alerte.",
  "🎮 Le premier jeu vidéo connu est « Tennis for Two » créé en 1958 sur un oscilloscope.",
  "🐨 Les koalas dorment jusqu'à 22 heures par jour à cause de leur régime pauvre en nutriments (feuilles d'eucalyptus).",
  "🐷 En Suisse, il est illégal de posséder un seul cochon d'Inde : ils nécessitent obligatoirement un compagnon.",
  "🌀 Le mot « chaos » vient du grec ancien « χάος » (kháos) signifiant abîme ou gouffre béant.",
  "♾️ Les méduses Turritopsis dohrnii sont biologiquement immortelles : elles peuvent revenir à l'état de polype après reproduction.",
  "📞 Le premier brevet pour un téléphone fut déposé par Alexander Graham Bell et Elisha Gray le même jour en 1876 (Bell gagna par quelques heures).",
  "🐪 Les chameaux ne stockent pas d'eau dans leurs bosses : elles contiennent de la graisse métabolisable en énergie et eau.",
  "🐕 En 1940, des fermiers français ont découvert par hasard la grotte ornée de Lascaux en cherchant leur chien tombé dans un trou.",
  "💃 Le mot « danse » vient peut-être du francisque « dintjan » (trembler, battre).",
  "🐧 Les manchots empereurs peuvent plonger à plus de 500 mètres de profondeur et rester sous l'eau 20 minutes.",
  "📬 Le premier email fut envoyé en 1971 par Ray Tomlinson entre deux ordinateurs côte à côte (il choisit le @ pour séparer l'utilisateur de la machine).",
  "🏗️ Les termites construisent des nids pouvant atteindre 9 mètres de hauteur, équivalent à un gratte-ciel proportionnellement à leur taille.",
  "🇰🇵 En Corée du Nord, il existe un calendrier basé sur la date de naissance de Kim Il-sung (1912 = année 1 du juche).",
  "💉 Le mot « vaccin » vient du latin « vacca » (vache), grâce aux travaux de Jenner sur la variole utilisant la vaccine bovine.",
  "🪼 Une méduse Nemopilema nomurai peut peser jusqu'à 200 kg avec un diamètre de cloche de 2 mètres.",
]

function getRandomFact() {
  return funFacts[Math.floor(Math.random() * funFacts.length)]
}

export default function Home() {
  const fact = getRandomFact()
  return (
    <div className="relative min-h-screen bg-background">
      <ScrollProgress />
      <GridBackground />
      <SidebarMenu />
      <PresentationMode />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Timeline />
        <Veille />
        <Contact />
      </main>
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">© 2026 Quentin SILVA - Tous droits réservés</p>
          <p className="mt-2 text-xs text-muted-foreground/70 italic">💡 Le saviez-vous ? {fact}</p>
        </div>
      </footer>
      <Terminal />
      <KonamiEasterEgg />
    </div>
  )
}
