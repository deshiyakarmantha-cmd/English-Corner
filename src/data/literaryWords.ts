export interface LiteraryWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  etymology: string;
  literaryExample: string;
  authorOrWork: string;
  sinhalaTranslation: string;
  tamilTranslation: string;
  scholarNote: string;
}

export const CURATED_LITERARY_WORDS: LiteraryWord[] = [
  {
    id: 'serendipity',
    word: 'Serendipity',
    phonetic: '/ˌsɛr.ənˈdɪp.ɪ.ti/',
    partOfSpeech: 'noun',
    definition: 'The occurrence and development of finding valuable or delightful things by chance in a happy or unexpected way; fortunate sagacity.',
    etymology: 'Coined in 1754 by English man of letters Horace Walpole from the ancient Persian name for Sri Lanka ("Serendip" / Sarandīb), inspired by the Persian fairy tale "The Three Princes of Serendip", whose heroes were continually making discoveries, by accidents and sagacity, of things they were not in quest of.',
    literaryExample: 'In the quiet study of ancient scriptures, one often experiences the supreme serendipity of uncovering a forgotten truth.',
    authorOrWork: 'Horace Walpole, Letter to Horace Mann (1754)',
    sinhalaTranslation: 'නොසිතූ මොහොතක ලබන සුබ වාසනාව / අනපේක්ෂිත සොඳුරු සොයාගැනීම',
    tamilTranslation: 'எதிர்பாராத மகிழ்ச்சியான கண்டுபிடிப்பு / நல்வாய்ப்பு',
    scholarNote: 'A word of profound historic pride for Sri Lankan scholarship, reminding us that our island has inspired world literature for centuries.'
  },
  {
    id: 'halcyon',
    word: 'Halcyon',
    phonetic: '/ˈhæl.si.ən/',
    partOfSpeech: 'adjective',
    definition: 'Denoting a period of time in the past that was idyllically peaceful, serene, prosperous, and deeply untroubled.',
    etymology: 'From Latin halcyon, from ancient Greek alkyōn (the kingfisher). According to Hellenic myth, the bird laid its eggs in a floating nest on the winter sea, calming the ferocious waves for seven days before and after the winter solstice—the legendary "halcyon days".',
    literaryExample: 'The venerable monks recalled those halcyon years when the temple libraries brimmed with handwritten palm-leaf manuscripts.',
    authorOrWork: 'William Shakespeare, Henry VI, Part 1 (I.ii)',
    sinhalaTranslation: 'ශාන්ත හා සෞභාග්‍යමත් යුගය / සන්සුන් වාසනාවන්ත සමය',
    tamilTranslation: 'அமைதியான மற்றும் மகிழ்ச்சியான பொற்காலம்',
    scholarNote: 'A masterwork of classical allusion, ideal for reflective essays and historical literature reviews.'
  },
  {
    id: 'petrichor',
    word: 'Petrichor',
    phonetic: '/ˈpɛt.rɪ.kɔːr/',
    partOfSpeech: 'noun',
    definition: 'A pleasant, earthy scent that accompanies the first rain after a long period of warm, dry weather.',
    etymology: 'Constructed from Greek petra ("stone" or "rock") and ichōr ("the ethereal fluid or blood of the Olympian gods"). Coined in 1964 by Australian researchers Isabel Joy Bear and Richard Thomas to name the scent of rain-soaked earth.',
    literaryExample: 'The parched terracotta tiles of the pirivena veranda released the rich petrichor of the sudden mountain monsoon.',
    authorOrWork: 'Contemporary Commonwealth Letters',
    sinhalaTranslation: 'වියළි පොළොවට පළමු වැසි වැටෙද්දී නැගෙන මිහිකත සුවඳ',
    tamilTranslation: 'மழை பெய்யும்போது மண்ணிலிருந்து எழும் இனிய நறுமணம்',
    scholarNote: 'One of the sensory triumphs of modern English vocabulary, beautifully evoking the mountain rains of Kandy.'
  },
  {
    id: 'ineffable',
    word: 'Ineffable',
    phonetic: '/ɪnˈɛf.ə.bəl/',
    partOfSpeech: 'adjective',
    definition: 'Too great, sublime, or transcendent to be expressed or described in spoken words; defying lexical boundaries.',
    etymology: 'From Old French, and directly from Latin ineffabilis, compounded from in- ("not") + effabilis ("utterable"), from effari ("to speak out", from ex- + fari "to speak"). Long employed in monastic Latin theology to describe divine contemplation.',
    literaryExample: 'Standing atop the sacred ridge of Asgiri at dawn, one witnesses a silence of ineffable grandeur.',
    authorOrWork: 'William Wordsworth, The Prelude',
    sinhalaTranslation: 'වචනයෙන් විස්තර කළ නොහැකි තරම් උත්තරීතර / වදන් ඉක්මවූ',
    tamilTranslation: 'சொற்களால் விவரிக்க முடியாத உன்னதமான பேரானந்தம்',
    scholarNote: 'Use this adjective in literary critiques when analyzing transcendental poetry, mystical drama, or profound aesthetic experiences.'
  },
  {
    id: 'mellifluous',
    word: 'Mellifluous',
    phonetic: '/məˈlɪf.lu.əs/',
    partOfSpeech: 'adjective',
    definition: 'Sweet or musical; pleasant to hear; having a smooth, honeyed, flowing cadence.',
    etymology: 'From Late Latin mellifluus, composed of mel (genitive mellis, "honey") and fluere ("to flow"). Originally applied to describe the honey-tongued eloquence of classical rhetoricians and sacred chanters.',
    literaryExample: 'The mellifluous recitation of Shakespearean blank verse resonated across the courtyard like a gentle lute.',
    authorOrWork: 'William Shakespeare, Twelfth Night (II.iii)',
    sinhalaTranslation: 'මී පැණි බඳු කන්කලු / මිහිරි ස්වරයෙන් ගලායන',
    tamilTranslation: 'தேன் போன்ற இனிமையான குரல் அல்லது சொல்வளம்',
    scholarNote: 'A vital rhetorical descriptor when examining poetic metrics, Shakespearean soliloquies, and oratory delivery.'
  },
  {
    id: 'verisimilitude',
    word: 'Verisimilitude',
    phonetic: '/ˌvɛr.ɪ.sɪˈmɪl.ɪ.tjuːd/',
    partOfSpeech: 'noun',
    definition: 'The appearance or semblance of truth; the quality of realism in a work of literature, art, or theatre that makes it convincing to the reader.',
    etymology: 'From Latin verisimilitudo, combining verus ("true") with similis ("like" or "resembling"). A foundational tenet of Aristotle’s Poetics, later embraced by Renaissance and Victorian dramatists.',
    literaryExample: 'By weaving authentic street dialects into his tragic narrative, the playwright achieved remarkable verisimilitude.',
    authorOrWork: 'Samuel Taylor Coleridge, Biographia Literaria',
    sinhalaTranslation: 'සත්‍යය බඳු බව / සැබෑ ජීවිතය සේ දැනෙන සාහිත්‍යමය තාත්විකත්වය',
    tamilTranslation: 'உண்மைத்தன்மை அல்லது எதார்த்த பாவனை',
    scholarNote: 'Crucial critical vocabulary for secondary and university literature students evaluating prose fiction and stage realism.'
  },
  {
    id: 'susurrus',
    word: 'Susurrus',
    phonetic: '/sʊˈsʌr.əs/',
    partOfSpeech: 'noun',
    definition: 'A whispering, murmuring, or rustling sound; soft ambient acoustic murmur.',
    etymology: 'From Latin susurrus ("a murmur, whisper, buzzing"), an exquisite Indo-European onomatopoeic creation mimicking the sibilant hiss of wind through temple groves.',
    literaryExample: 'The susurrus of wind among the ancient Bo leaves accompanied the student’s late-night reading.',
    authorOrWork: 'Alfred, Lord Tennyson, The Lotos-Eaters',
    sinhalaTranslation: 'මඳනලින් නැගෙන පත් සිලිසිලිය / මෘදු කොඳුරුම් හඬ',
    tamilTranslation: 'மெல்லிய சலசலப்பு ஒலி / முணுமுணுப்பு',
    scholarNote: 'A quintessential exemplar of poetic auditory imagery and phonetic mimicry.'
  },
  {
    id: 'epiphany',
    word: 'Epiphany',
    phonetic: '/ɪˈpɪf.ə.ni/',
    partOfSpeech: 'noun',
    definition: 'A moment of sudden and profound revelation, intuitive realization, or transformative spiritual insight.',
    etymology: 'From ancient Greek epiphaneia ("manifestation, appearance"), from epi- ("upon") + phainein ("to shine, to display"). Adapted in modern 20th-century literature by James Joyce to signify the sudden psychological flash where an everyday object or gesture reveals its deeper spiritual essence.',
    literaryExample: 'In that instant of reading the ancient ode, she experienced an epiphany regarding her own poetic destiny.',
    authorOrWork: 'James Joyce, Dubliners (1914)',
    sinhalaTranslation: 'ක්ෂණික ඥානාලෝකය / හදිසියේ පහළ වන ගැඹුරු ප්‍රත්‍යක්ෂය',
    tamilTranslation: 'திடீர் உள்ளுணர்வு அல்லது வாழ்க்கை மாறும் பேரறிவு',
    scholarNote: 'Essential for dissecting modern novelistic climaxes and character maturation arcs.'
  }
];

export function getCuratedWord(index?: number): LiteraryWord {
  if (typeof index === 'number' && index >= 0) {
    return CURATED_LITERARY_WORDS[index % CURATED_LITERARY_WORDS.length];
  }
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return CURATED_LITERARY_WORDS[dayOfYear % CURATED_LITERARY_WORDS.length];
}
