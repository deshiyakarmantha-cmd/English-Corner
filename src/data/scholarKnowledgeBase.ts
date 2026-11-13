import { CURATED_LITERARY_WORDS } from './literaryWords';
import { CURIOUS_LOANWORDS } from './festivalData';

export interface BilingualLexiconEntry {
  word: string;
  phonetic: string;
  pos: string;
  definition: string;
  sinhala: string;
  tamil: string;
  etymology: string;
  exampleEn: string;
  exampleSi: string;
}

export const BILINGUAL_LEXICON: Record<string, BilingualLexiconEntry> = {
  serendipity: {
    word: 'Serendipity',
    phonetic: '/ˌsɛr.ənˈdɪp.ɪ.ti/',
    pos: 'noun',
    definition: 'The fortunate occurrence of finding valuable, wise, or delightful things unexpectedly by chance.',
    sinhala: 'නොසිතූ මොහොතක අහම්බෙන් ලබන සුබ වාසනාව / සොඳුරු අනපේක්ෂිත සොයාගැනීම',
    tamil: 'எதிர்பாராத மகிழ்ச்சியான தற்செயல் கண்டுபிடிப்பு / நல்வாய்ப்பு',
    etymology: 'Coined in 1754 by Horace Walpole from "Serendip" (ancient Persian name for Sri Lanka / Ceylon) after the tale "The Three Princes of Serendip".',
    exampleEn: 'Uncovering the rare palm-leaf manuscript in the Kandy archives was pure serendipity.',
    exampleSi: 'මහනුවර ලේඛනාගාරයේදී එම දුර්ලභ පුස්කොළ පොත හමුවීම සැබෑ අහම්බ සුබ සොයාගැනීමකි (serendipity).'
  },
  ephemeral: {
    word: 'Ephemeral',
    phonetic: '/ɪˈfɛm.ər.əl/',
    pos: 'adjective',
    definition: 'Lasting for only a very brief period of time; transitory, fleeting, or impermanent.',
    sinhala: 'තාවකාලික / ක්ෂණිකව වියැකී යන / අනිත්‍ය',
    tamil: 'நிலையில்லாத / குறுகிய காலமே நீடிக்கக்கூடிய',
    etymology: 'From ancient Greek "ephēmeros" meaning "lasting only one day" (epi- "upon" + hēmera "day"). Mirrors the Buddhist concept of Anicca (impermanence).',
    exampleEn: 'Morning mist above Asgiri Vihara is ephemeral, vanishing once the golden sun ascends.',
    exampleSi: 'අස්ගිරි විහාරයට ඉහළින් ඇති උදෑසන මීදුම හිරු උදාවත් සමඟ මැකී යන තාවකාලික (ephemeral) දසුනකි.'
  },
  freedom: {
    word: 'Freedom',
    phonetic: '/ˈfriː.dəm/',
    pos: 'noun',
    definition: 'The power or right to act, speak, think, or exist without unjust restraint, oppression, or bondage.',
    sinhala: 'නිදහස / විමුක්තිය / ස්වාධීනත්වය',
    tamil: 'சுதந்திரம் / விடுதலை',
    etymology: 'From Old English "frēodōm" (frēo "free, not in bondage" + -dōm "state or condition"), cognate with Germanic terms for peace and affection.',
    exampleEn: 'True freedom begins when the mind is liberated from ignorance through knowledge.',
    exampleSi: 'සැබෑ නිදහස ආරම්භ වන්නේ ප්‍රඥාව තුළින් මනස අවිද්‍යාවෙන් මිදුණු විටය.'
  },
  wisdom: {
    word: 'Wisdom',
    phonetic: '/ˈwɪz.dəm/',
    pos: 'noun',
    definition: 'The quality of having deep experience, discernment, knowledge, and compassionate sound judgment.',
    sinhala: 'ප්‍රඥාව / ඥානය / නුවණ',
    tamil: 'ஞானம் / அறிவுடைமை / விவேகம்',
    etymology: 'From Old English "wīsdōm", combining "wīs" (wise, discerning) + "-dōm" (jurisdiction, state of being). Closely parallels Pali "Paññā".',
    exampleEn: 'Knowledge collects facts, whereas wisdom discerns what is right and compassionate.',
    exampleSi: 'දැනුම යනු කරුණු රැස් කිරීමයි; ප්‍රඥාව යනු නිවැරදි හා කාරුණික දේ හඳුනා ගැනීමයි.'
  },
  peace: {
    word: 'Peace',
    phonetic: '/piːs/',
    pos: 'noun',
    definition: 'Freedom from disturbance, conflict, or war; inner tranquility and harmony.',
    sinhala: 'සාමය / ශාන්තිය / සංසිඳීම',
    tamil: 'அமைதி / சமாதானம்',
    etymology: 'From Old French "pais" and Latin "pāx" (treaty, tranquility, absence of hostility). Parallels Pali "Santi".',
    exampleEn: 'An atmosphere of profound peace pervades the ancient courtyard at twilight.',
    exampleSi: 'සැන්දෑ යාමයේ පුරාණ මළුව පුරා ගැඹුරු ශාන්තියක් පැතිර පවතී.'
  },
  knowledge: {
    word: 'Knowledge',
    phonetic: '/ˈnɒl.ɪdʒ/',
    pos: 'noun',
    definition: 'Facts, information, understanding, and skills acquired through education, reading, or experience.',
    sinhala: 'දැනුම / විද්‍යාව / ශාස්ත්‍රීය අවබෝධය',
    tamil: 'அறிவு / கல்வி ஞானம்',
    etymology: 'From Middle English "knouleche", combining Old English "cnāwan" (to recognize, know) + the suffix "-leche" (action or condition).',
    exampleEn: 'Monastic pirivenas have served as sanctuaries of sacred and secular knowledge for centuries.',
    exampleSi: 'පිරිවෙන් ආයතන සියවස් ගණනාවක් පුරා පූජනීය හා ලෞකික දැනුමේ මධ්‍යස්ථාන ලෙස ක්‍රියා කර ඇත.'
  },
  compassion: {
    word: 'Compassion',
    phonetic: '/kəmˈpæʃ.ən/',
    pos: 'noun',
    definition: 'Deep sympathetic pity and concern for the sufferings of others coupled with a desire to alleviate them.',
    sinhala: 'කරුණාව / අනුකම්පාව',
    tamil: 'கருணை / இரக்கம்',
    etymology: 'From Late Latin "compassiō" (com- "together with" + pati "to suffer"), meaning literally "to suffer alongside another". Mirrors Pali "Karuṇā".',
    exampleEn: 'Literature teaches us compassion by letting us live inside another person’s heart.',
    exampleSi: 'අන් අයගේ හදවත් තුළ ජීවත් වීමට ඉඩ සලසමින් සාහිත්‍යය අපට කරුණාව උගන්වයි.'
  },
  literature: {
    word: 'Literature',
    phonetic: '/ˈlɪt.ər.ə.tʃər/',
    pos: 'noun',
    definition: 'Written works—especially poetry, drama, and prose—valued for artistic beauty, enduring ideas, or intellectual merit.',
    sinhala: 'සාහිත්‍යය / ග්‍රන්ථකරණය',
    tamil: 'இலக்கியம்',
    etymology: 'From Latin "litterātūra" (learning, writing, grammar), derived from "littera" meaning "a letter of the alphabet".',
    exampleEn: 'Sanjanani celebrates world literature as a bridge linking languages and generations.',
    exampleSi: 'සංජානනී උළෙල භාෂාවන් හා පරම්පරාවන් යා කරන පාලමක් ලෙස ලෝක සාහිත්‍යය සමරයි.'
  },
  eloquence: {
    word: 'Eloquence',
    phonetic: '/ˈɛl.ə.kwəns/',
    pos: 'noun',
    definition: 'Fluent, persuasive, graceful, and deeply moving speaking or writing.',
    sinhala: 'වාග් චාතුර්යය / චතුර කථිකත්වය',
    tamil: 'சொல்வன்மை / நாவன்மை',
    etymology: 'From Latin "ēloquentia", from "ēloquī" ("to speak out cleanly": ē- "out" + loquī "to speak").',
    exampleEn: 'The young orator addressed the assembly with rare eloquence and humility.',
    exampleSi: 'තරුණ කථිකයා දුර්ලභ වාග් චාතුර්යයකින් හා නිහතමානීකමින් සභාව ඇමතීය.'
  },
  solitude: {
    word: 'Solitude',
    phonetic: '/ˈsɒl.ɪ.tjuːd/',
    pos: 'noun',
    definition: 'The peaceful, deliberate state of being alone for contemplation without feeling lonely.',
    sinhala: 'හුදෙකලාව / විවේක සුවය',
    tamil: 'தனிமை / அமைதியான தனித்திருத்தல்',
    etymology: 'From Latin "sōlitūdō", from "sōlus" (alone, single). Contrast with "loneliness" (painful isolation).',
    exampleEn: 'Wordsworth celebrated "that inward eye / Which is the bliss of solitude."',
    exampleSi: 'වර්ඩ්ස්වර්ත් කවියා හුදෙකලාවේ ආශීර්වාදය පිළිබඳව ඉතා මනරම් ලෙස කවි පබැඳීය.'
  },
  resilience: {
    word: 'Resilience',
    phonetic: '/rɪˈzɪl.i.əns/',
    pos: 'noun',
    definition: 'The capacity to withstand or recover swiftly from adversity, hardship, or change.',
    sinhala: 'ඔරොත්තු දීමේ හැකියාව / අධිෂ්ඨානශීලී බව',
    tamil: 'மீள்தன்மை / மன உறுதி',
    etymology: 'From Latin "resiliēns" (present participle of "resilīre": re- "back" + salīre "to leap"), literally "to spring back".',
    exampleEn: 'Through centuries of change, pirivena education has shown remarkable resilience.',
    exampleSi: 'සියවස් ගණනාවක වෙනස්කම් මධ්‍යයේ වුවද පිරිවෙන් අධ්‍යාපනය විශිෂ්ට ඔරොත්තු දීමේ හැකියාවක් පෙන්වා ඇත.'
  },
  nostalgia: {
    word: 'Nostalgia',
    phonetic: '/nɒˈstæl.dʒə/',
    pos: 'noun',
    definition: 'A bittersweet sentimental longing or wistful affection for a past time or ancestral home.',
    sinhala: 'අතීත කාමය / පැරණි මතකයන් කෙරෙහි ඇති සෙනෙහස',
    tamil: 'கடந்த கால நினைவு ஏக்கம்',
    etymology: 'Coined in 1688 from Greek "nóstos" (homecoming, return) + "álgos" (ache, pain).',
    exampleEn: 'Hearing the temple drum at dusk filled the elders with gentle nostalgia.',
    exampleSi: 'සැන්දෑවේ පන්සල් බෙර හඬ ඇසීමෙන් වැඩිහිටියන්ගේ සිත්හි මෘදු අතීත මතකයන් අවදි විය.'
  },
  truth: {
    word: 'Truth',
    phonetic: '/truːθ/',
    pos: 'noun',
    definition: 'That which is true or in accordance with fact, reality, or moral integrity.',
    sinhala: 'සත්‍යය / ඇත්ත / සැබෑව',
    tamil: 'உண்மை / சத்தியம்',
    etymology: 'From Old English "trēowþ" (faithfulness, loyalty, veracity), related to "true" and "trust".',
    exampleEn: 'Honest inquiry always leads toward truth.',
    exampleSi: 'අවංක ගවේෂණය සැමවිටම සත්‍යය කරා මඟ පෙන්වයි.'
  },
  beauty: {
    word: 'Beauty',
    phonetic: '/ˈbjuː.ti/',
    pos: 'noun',
    definition: 'A combination of qualities—such as form, harmony, sound, or moral grace—that pleases the aesthetic senses or intellect.',
    sinhala: 'සුන්දරත්වය / සෞන්දර්යය / අලංකාරය',
    tamil: 'அழகு / எழில்',
    etymology: 'From Old French "biauté" and Latin "bellus" (pretty, fine, charming).',
    exampleEn: 'John Keats wrote, "A thing of beauty is a joy for ever."',
    exampleSi: '"සුන්දර වස්තුවක් යනු සදාකාලික ප්‍රීතියකි" යැයි ජෝන් කීට්ස් කවියා පැවසීය.'
  },
  justice: {
    word: 'Justice',
    phonetic: '/ˈdʒʌs.tɪs/',
    pos: 'noun',
    definition: 'Fairness, moral rightness, equity, and the lawful administration of what is due.',
    sinhala: 'යුක්තිය / සාධාරණත්වය',
    tamil: 'நீதி / நியாயம்',
    etymology: 'From Old French "justice" and Latin "iūstitia" (righteousness, equity), from "iūstus" (just, upright).',
    exampleEn: 'Portia reminds Shylock that "earthly power doth then show likest God\'s when mercy seasons justice."',
    exampleSi: 'දයාව සමඟ මුසු වූ විට යුක්තිය වඩාත් උත්තරීතර වන බව ෂේක්ස්පියර් පෙන්වා දෙයි.'
  },
  courage: {
    word: 'Courage',
    phonetic: '/ˈkʌr.ɪdʒ/',
    pos: 'noun',
    definition: 'Mental or moral strength to venture, persevere, and withstand danger, fear, or difficulty.',
    sinhala: 'ධෛර්යය / වීර්යය / නිර්භීතකම',
    tamil: 'துணிச்சல் / வீரம் / மனத்திடம்',
    etymology: 'From Old French "corage", originating from Latin "cor" meaning "heart"—literally speaking or acting from the heart.',
    exampleEn: 'It takes courage to speak truth kindly in times of misunderstanding.',
    exampleSi: 'වැරදි වැටහීම් මැද වුවද කරුණාවෙන් සත්‍යය පැවසීමට ධෛර්යය අවශ්‍ය වේ.'
  },
  love: {
    word: 'Love',
    phonetic: '/lʌv/',
    pos: 'noun / verb',
    definition: 'Deep affection, tender attachment, or selfless goodwill toward another being.',
    sinhala: 'ආදරය / සෙනෙහස / මෛත්‍රිය',
    tamil: 'அன்பு / நேசம் / காதல்',
    etymology: 'From Old English "lufu" (affection, friendliness), sharing Proto-Indo-European roots with Sanskrit "lubhyati" (desires, cherishes).',
    exampleEn: 'In Shakespeare\'s Sonnet 116, true love "alters not when it alteration finds."',
    exampleSi: 'ෂේක්ස්පියර්ගේ 116 වන සොනට් කාව්‍යයට අනුව සැබෑ ආදරය කාලය හමුවේ නොසැලී පවතී.'
  },
  hope: {
    word: 'Hope',
    phonetic: '/həʊp/',
    pos: 'noun / verb',
    definition: 'A feeling of expectation and trustful desire for positive outcomes in the future.',
    sinhala: 'බලාපොරොත්තුව / අපේක්ෂාව',
    tamil: 'நம்பிக்கை / எதிர்பார்ப்பு',
    etymology: 'From Old English "hopa" (confidence in the future), of Germanic origin.',
    exampleEn: 'Emily Dickinson famously wrote, "\'Hope\' is the thing with feathers / That perches in the soul."',
    exampleSi: 'එමිලි ඩිකින්සන් කිවිඳිය "බලාපොරොත්තුව යනු ආත්මය මත ලැගුම් ගන්නා පියාපත් ඇති පක්ෂියෙකි" යැයි කීවාය.'
  },
  rain: {
    word: 'Rain',
    phonetic: '/reɪn/',
    pos: 'noun / verb',
    definition: 'Condensed moisture from clouds falling in distinct droplets upon the earth.',
    sinhala: 'වැස්ස / වර්ෂාව',
    tamil: 'மழை',
    etymology: 'From Old English "regn", of ancient Germanic origin; paired in English literature with petrichor and renewal.',
    exampleEn: 'Evening rain cooled the flagstones of the Kandy monastery.',
    exampleSi: 'සැන්දෑ වැස්ස මහනුවර විහාර මළුව සිසිල් කළේය.'
  },
  light: {
    word: 'Light',
    phonetic: '/laɪt/',
    pos: 'noun / adjective',
    definition: 'Visible illumination that dispels darkness; metaphorically, enlightenment and truth.',
    sinhala: 'ආලෝකය / එළිය / ප්‍රභාව',
    tamil: 'ஒளி / வெளிச்சம்',
    etymology: 'From Old English "lēoht", tracing back to Proto-Indo-European "*leuk-" (brightness, also the root of "lucid" and "luminescence").',
    exampleEn: 'Knowledge is an inward light that no shadow can extinguish.',
    exampleSi: 'දැනුම යනු කිසිදු අඳුරකට නිවා දැමිය නොහැකි අභ්‍යන්තර ආලෝකයකි.'
  },
  wisdom_quote: {
    word: 'Philosophy',
    phonetic: '/fɪˈlɒs.ə.fi/',
    pos: 'noun',
    definition: 'The study of the fundamental nature of knowledge, reality, ethics, and human existence.',
    sinhala: 'දර්ශනය / චින්තන විද්‍යාව',
    tamil: 'தத்துவம் / மெய்யியல்',
    etymology: 'From ancient Greek "philosophía", literally meaning "love of wisdom" (philos "loving" + sophia "wisdom").',
    exampleEn: 'Hamlet reminds Horatio that "there are more things in heaven and earth than are dreamt of in your philosophy."',
    exampleSi: 'මිනිස් දර්ශනයට හසු නොවන බොහෝ දේ විශ්වයේ පවතින බව හැම්ලට් පවසයි.'
  },
  metaphor: {
    word: 'Metaphor',
    phonetic: '/ˈmɛt.ə.fɔːr/',
    pos: 'noun',
    definition: 'A figure of speech identifying one thing as directly being another to reveal a symbolic similarity.',
    sinhala: 'රූපකාලංකාරය / උපමා රූපකය',
    tamil: 'உருவகம்',
    etymology: 'From Greek "metaphorá" ("a transfer, carrying across": meta- "across" + pherein "to bear/carry").',
    exampleEn: '"All the world\'s a stage" is Shakespeare\'s most celebrated metaphor.',
    exampleSi: '"මුළු ලොවම රංග පීඨයකි" යන්න ෂේක්ස්පියර්ගේ ප්‍රසිද්ධම රූපකයයි.'
  },
  poetry: {
    word: 'Poetry',
    phonetic: '/ˈpəʊ.ɪ.tri/',
    pos: 'noun',
    definition: 'Literary work in which intense expression of feelings and ideas is given through distinctive rhythm, imagery, and diction.',
    sinhala: 'කාව්‍යය / පද්‍ය සාහිත්‍යය',
    tamil: 'கவிதை / செய்யுள்',
    etymology: 'From Greek "poiēsis" meaning "a making or creating" (from poiein "to make"). A poet is literally a "maker" of worlds in words.',
    exampleEn: 'Coleridge defined poetry as "the best words in the best order."',
    exampleSi: 'කවිය යනු "හොඳම වචන හොඳම අනුපිළිවෙලින් පෙළගැස්වීම" බව කෝල්රිජ් පැවසීය.'
  },
  monastery: {
    word: 'Monastery',
    phonetic: '/ˈmɒn.ə.stər.i/',
    pos: 'noun',
    definition: 'A sacred residence and center of learning occupied by monks living under religious vows.',
    sinhala: 'විහාරස්ථානය / ආරාමය / පිරිවෙන',
    tamil: 'மடாலயம் / விகாரை',
    etymology: 'From Greek "monastērion" ("to live alone", from "monos" meaning single or solitary).',
    exampleEn: 'Asgiri Maha Vihara is a venerable monastery famed for centuries of Sinhala, Pali, and English scholarship.',
    exampleSi: 'අස්ගිරි මහා විහාරය සියවස් ගණනාවක් පැරණි ශාස්ත්‍රීය විහාරස්ථානයකි.'
  },
  time: {
    word: 'Time',
    phonetic: '/taɪm/',
    pos: 'noun',
    definition: 'The indefinite continued progress of existence and events in the past, present, and future.',
    sinhala: 'කාලය / වේලාව / සමය',
    tamil: 'நேரம் / காலம்',
    etymology: 'From Old English "tīma" (limited space of time, season), related to "tide".',
    exampleEn: 'Time and tide wait for no man.',
    exampleSi: 'කාලය සහ මුහුදු රළ කිසිවෙකු වෙනුවෙන් බලා සිටින්නේ නැත.'
  },
  book: {
    word: 'Book',
    phonetic: '/bʊk/',
    pos: 'noun',
    definition: 'A written or printed work consisting of pages bound together, or a major division of a literary work.',
    sinhala: 'පොත / ග්‍රන්ථය',
    tamil: 'புத்தகம் / நூல்',
    etymology: 'From Old English "bōc", originally related to the beech tree ("bēce") whose smooth bark or tablets were carved with ancient runes.',
    exampleEn: 'A great book leaves a lifelong conversation inside its reader.',
    exampleSi: 'උසස් ග්‍රන්ථයක් පාඨකයා තුළ සදාකාලික සංවාදයක් ඉතිරි කරයි.'
  },
  happiness: {
    word: 'Happiness',
    phonetic: '/ˈhæp.i.nəs/',
    pos: 'noun',
    definition: 'The state of feeling contentment, joy, spiritual peace, or well-being.',
    sinhala: 'සතුට / සෞභාග්‍යය / ප්‍රීතිය',
    tamil: 'மகிழ்ச்சி / ஆனந்தம்',
    etymology: 'From Middle English "happy" ("hap" meaning good fortune or chance + "-y") + "-ness". Literally "blessed by good fortune".',
    exampleEn: 'Lasting happiness grows from contentment and service.',
    exampleSi: 'ස්ථිර සතුට උපදින්නේ සන්තුෂ්ටියෙන් හා සේවයෙන්ය.'
  },
  education: {
    word: 'Education',
    phonetic: '/ˌɛdʒ.ʊˈkeɪ.ʃən/',
    pos: 'noun',
    definition: 'The systematic process of receiving or giving illuminating instruction, character formation, and critical inquiry.',
    sinhala: 'අධ්‍යාපනය / ශික්ෂණය',
    tamil: 'கல்வி / கற்பித்தல்',
    etymology: 'From Latin "ēducātiō", from "ēducere" ("to lead out / draw forth" one\'s innate potential: ē- "out" + dūcere "to lead").',
    exampleEn: 'True education draws forth both intellectual brilliance and moral grace.',
    exampleSi: 'සැබෑ අධ්‍යාපනය මගින් බුද්ධිමය දීප්තිය මෙන්ම සදාචාරාත්මක ගුණධර්මද ඉස්මතු කරයි.'
  },
  friend: {
    word: 'Friend',
    phonetic: '/frɛnd/',
    pos: 'noun',
    definition: 'A person with whom one shares a bond of mutual affection, trust, and loyalty.',
    sinhala: 'මිතුරා / මිත්‍රයා / යහළුවා',
    tamil: 'நண்பன் / தோழன்',
    etymology: 'From Old English "frēond", originally the present participle of "frēogan" ("to love or hold dear").',
    exampleEn: 'Polonius urges: "Those friends thou hast, and their adoption tried, / Grapple them to thy soul with hoops of steel."',
    exampleSi: 'පරීක්ෂාවට ලක් වූ විශ්වාසවන්ත මිතුරන් ආත්මයෙන්ම රැකගත යුතු බව ෂේක්ස්පියර් පවසයි.'
  },
  nature: {
    word: 'Nature',
    phonetic: '/ˈneɪ.tʃər/',
    pos: 'noun',
    definition: 'The phenomena of the physical world collectively—mountains, forests, rivers, skies, and living creatures.',
    sinhala: 'ස්වභාවධර්මය / පරිසරය',
    tamil: 'இயற்கை / பிரகிருதி',
    etymology: 'From Old French and Latin "nātūra" (birth, essential character, course of things), from "nāscī" ("to be born").',
    exampleEn: 'For Wordsworth, Nature is "the anchor of my purest thoughts, the nurse, the guide, the guardian of my heart."',
    exampleSi: 'වර්ඩ්ස්වර්ත්ට අනුව ස්වභාවධර්මය යනු පිවිතුරු සිතුවිලිවල උත්තරීතර මගපෙන්වන්නාය.'
  },
  harmony: {
    word: 'Harmony',
    phonetic: '/ˈhɑː.mə.ni/',
    pos: 'noun',
    definition: 'A pleasing, balanced agreement of sounds, ideas, colors, or human hearts living peacefully together.',
    sinhala: 'සමගිය / සංහිඳියාව / සුසංයෝගය',
    tamil: 'இணக்கம் / ஒற்றுமை / இசைவு',
    etymology: 'From Greek "harmonía" ("a joining, fitting together, concord of musical sounds").',
    exampleEn: 'Three languages met in quiet harmony under the Bodhi canopy at Kandy.',
    exampleSi: 'මහනුවර බෝ සෙවණ යටදී භාෂා තුනක් සුන්දර සංහිඳියාවෙන් හමු විය.'
  }
};

// Also register all CURATED_LITERARY_WORDS and CURIOUS_LOANWORDS automatically
CURATED_LITERARY_WORDS.forEach((w) => {
  BILINGUAL_LEXICON[w.word.toLowerCase()] = {
    word: w.word,
    phonetic: w.phonetic,
    pos: w.partOfSpeech,
    definition: w.definition,
    sinhala: w.sinhalaTranslation,
    tamil: w.tamilTranslation,
    etymology: w.etymology,
    exampleEn: w.literaryExample,
    exampleSi: w.scholarNote,
  };
});

CURIOUS_LOANWORDS.forEach((lw) => {
  const key = lw.word.toLowerCase();
  if (!BILINGUAL_LEXICON[key]) {
    BILINGUAL_LEXICON[key] = {
      word: lw.word,
      phonetic: '',
      pos: 'noun',
      definition: lw.meaning,
      sinhala: `${lw.origin} සම්භවයක් ඇති ඉංග්‍රීසි වචනයකි — ${lw.meaning}`,
      tamil: `${lw.origin} வேர்ச்சொல்லிலிருந்து வந்த ஆங்கிலச் சொல்`,
      etymology: `Originates from ${lw.origin}. ${lw.meaning}`,
      exampleEn: `The English word "${lw.word}" illuminates centuries of maritime and cultural exchange.`,
      exampleSi: `"${lw.word}" යන වචනය ශතවර්ෂ ගණනාවක සංස්කෘතික හුවමාරුව පිළිබිඹු කරයි.`
    };
  }
});

// Word-level Sinhala / Tamil gloss dictionary used to build genuine dynamic word-by-word translations
export const WORD_GLOSS_SI: Record<string, string> = {
  the: '', a: '', an: '', and: 'සහ', or: 'හෝ', but: 'නමුත්', for: 'සඳහා', to: 'වෙත', in: 'තුළ', on: 'මත', at: 'හිදී',
  of: 'හි', with: 'සමඟ', by: 'විසින්', from: 'සිට', is: 'වේ', are: 'වෙති', was: 'විය', were: 'වූහ',
  i: 'මම', my: 'මගේ', me: 'මට', we: 'අපි', our: 'අපේ', you: 'ඔබ', your: 'ඔබේ', they: 'ඔවුන්', their: 'ඔවුන්ගේ',
  he: 'ඔහු', she: 'ඇය', it: 'එය', this: 'මෙම', that: 'එම',
  woods: 'වනය', dark: 'අඳුරු', deep: 'ගැඹුරු', lovely: 'සුන්දර', promises: 'පොරොන්දු', keep: 'රැකීමට',
  miles: 'සැතපුම්', go: 'යාමට', before: 'පෙර', sleep: 'නින්දට', road: 'මාවත', roads: 'මාවත්',
  two: 'දෙකක්', diverged: 'බෙදී ගියේය', yellow: 'රන්වන් කහ', summer: 'ගිම්හාන', day: 'දිනයක්',
  compare: 'සංසන්දනය කරන්නද', thee: 'ඔබව', shall: 'කළ හැකිද', more: 'වඩා', temperate: 'සෞම්‍ය',
  literature: 'සාහිත්‍යය', wisdom: 'ප්‍රඥාව', knowledge: 'දැනුම', peace: 'සාමය', freedom: 'නිදහස',
  truth: 'සත්‍යය', light: 'ආලෝකය', love: 'ආදරය', hope: 'බලාපොරොත්තුව', compassion: 'කරුණාව',
  empathy: 'සහකම්පනය', culture: 'සංස්කෘතිය', language: 'භාෂාව', history: 'ඉතිහාසය',
  moral: 'සදාචාරාත්මක', development: 'සංවර්ධනය', human: 'මානව', spirit: 'ආත්මය',
  heart: 'හදවත', mind: 'මනස', soul: 'ආත්මය', morning: 'උදෑසන', rain: 'වැස්ස', mist: 'මීදුම',
  mountain: 'කන්ද', river: 'ගංගාව', lake: 'වැව', book: 'පොත', word: 'වචනය', words: 'වචන',
  student: 'ශිෂ්‍යයා', students: 'ශිෂ්‍යයෝ', monk: 'භික්ෂුව', teacher: 'ගුරුවරයා', scholar: 'විද්වතා',
  instrument: 'මාධ්‍යයක් / උපකරණයක්', serves: 'ක්‍රියා කරයි', profound: 'ගැඹුරු', insight: 'අවබෝධය',
  beauty: 'සුන්දරත්වය', joy: 'සතුට', forever: 'සදාකාලිකව', world: 'ලෝකය', stage: 'වේදිකාව',
  good: 'යහපත්', great: 'ශ්‍රේෂ්ඨ', ancient: 'පුරාණ', sacred: 'පූජනීය', kandy: 'මහනුවර', festival: 'මහෝත්සවය'
};

export interface CanonicalPoemTranslation {
  keywords: string[];
  title: string;
  poet: string;
  englishLines: string;
  sinhalaLines: string;
  tamilLines: string;
  analysis: string;
}

export const FAMOUS_POEM_TRANSLATIONS: CanonicalPoemTranslation[] = [
  {
    keywords: ['woods are lovely', 'promises to keep', 'miles to go', 'snowy evening'],
    title: 'Stopping by Woods on a Snowy Evening (Final Stanza)',
    poet: 'Robert Frost (1923)',
    englishLines: `> *"The woods are lovely, dark and deep,  \n> But I have promises to keep,  \n> And miles to go before I sleep,  \n> And miles to go before I sleep."*`,
    sinhalaLines: `> *"වනය සුන්දරය — අඳුරුය, ගැඹුරුය;  \n> නමුත් මා රැකිය යුතු පොරොන්දු බොහෝය.  \n> සදා නිදන්නට පෙර ගෙවිය යුතු මාවත දිගුය;  \n> සැතපුම් ගණනාවක් තවමත් ඉදිරියෙන් ඇත."*`,
    tamilLines: `> *"அந்தக் காடு அழகானது, இருண்டது, ஆழமானது;  \n> ஆனால் நான் காக்க வேண்டிய வாக்குறுதிகள் உள்ளன;  \n> நான் உறங்கும் முன் இன்னும் பல மைல்கள் கடக்க வேண்டியுள்ளது."*`,
    analysis: 'Notice how Frost repeats the final line to shift from literal travel to a spiritual reflection on duty and mortality. The Sinhala translation preserves the contemplative pause (*අඳුරුය, ගැඹුරුය*) and moral resolve (*රැකිය යුතු පොරොන්දු*).'
  },
  {
    keywords: ['two roads diverged', 'yellow wood', 'road not taken', 'traveled by'],
    title: 'The Road Not Taken (Opening & Climax)',
    poet: 'Robert Frost (1915)',
    englishLines: `> *"Two roads diverged in a yellow wood,  \n> And sorry I could not travel both...  \n> I took the one less traveled by,  \n> And that has made all the difference."*`,
    sinhalaLines: `> *"රන්වන් කහ වනපෙත මැද මාවත් දෙකක් බෙදී ගියේය;  \n> දෙමඟම එකවර ගමන් කළ නොහැකි වූ බැවින් මම කනගාටු වීමි...  \n> මම මිනිසුන් අඩුවෙන් ගමන් කළ මාවත තෝරා ගතිමි;  \n> මාගේ ජීවිතයේ සියලු වෙනස සිදු වූයේ එතැනිනි."*`,
    tamilLines: `> *"பொன்நிற இலைகள் உதிர்ந்த காட்டில் இரு பாதைகள் பிரிந்தன;  \n> இரண்டிலும் ஒரே நேரத்தில் பயணிக்க முடியவில்லையே...  \n> மக்கள் குறைவாகச் சென்ற பாதையை நான் தேர்ந்தெடுத்தேன்;  \n> அதுவே என் வாழ்வின் அனைத்து மாற்றத்தையும் உருவாக்கியது."*`,
    analysis: 'This iconic lyric explores personal choice and individuality. In translation, keeping *"yellow wood"* as *රන්වන් කහ වනපෙත* captures autumn imagery cleanly.'
  },
  {
    keywords: ['compare thee', 'summer\'s day', 'sonnet 18', 'more lovely and more temperate'],
    title: 'Sonnet 18',
    poet: 'William Shakespeare (1609)',
    englishLines: `> *"Shall I compare thee to a summer's day?  \n> Thou art more lovely and more temperate:  \n> Rough winds do shake the darling buds of May,  \n> And summer's lease hath all too short a date."*`,
    sinhalaLines: `> *"ගිම්හාන දිනයකට ඔබ සම කළ හැකිද මට?  \n> එයටත් වඩා ඔබ සුන්දරය, සෞම්‍යය, ශාන්තය;  \n> වසන්තයේ මල් කැකුළු සැඩ සුළඟින් සැලී ගියද,  \n> ගිම්හාන සමය ඉතා ඉක්මනින් ගෙවී යන්නේය."*`,
    tamilLines: `> *"கோடை காலத்தின் அழகிய நாளோடு உன்னை ஒப்பிடலாமா?  \n> அதைவிட நீ இனிமையானவள், மென்மையானவள்;  \n> இளவேனில் அரும்புகளைப் புயற்காற்று உலுக்கினாலும்,  \n> கோடைக் காலமும் விரைவில் மறைந்து விடும்."*`,
    analysis: 'Shakespeare contrasts transient seasonal weather with eternal poetic immortality (*"So long lives this, and this gives life to thee"*).'
  },
  {
    keywords: ['wandered lonely as a cloud', 'daffodils', 'golden daffodils', 'wordsworth'],
    title: 'I Wandered Lonely as a Cloud (Daffodils)',
    poet: 'William Wordsworth (1807)',
    englishLines: `> *"I wandered lonely as a cloud  \n> That floats on high o'er vales and hills,  \n> When all at once I saw a crowd,  \n> A host, of golden daffodils."*`,
    sinhalaLines: `> *"කඳු හා නිම්න මතින් ඉහළ අහසේ පාවෙන  \n> හුදෙකලා වලාකුළක් සේ මම සැරිසැරුවෙමි;  \n> එක්වනම මම දුටුවෙමි රන්වන් පැහැති  \n> ඩැෆඩිල් මල් සමූහයක් සතුටින් නටනු."*`,
    tamilLines: `> *"மலைகளும் பள்ளத்தாக்குகளும் மேலே மிதக்கும்  \n> தனித்த மேகம் போல நான் அலைந்து திரிந்தேன்;  \n> திடீரென அங்கே பொன்நிற டாஃபோடில் மலர்களின்  \n> பெருங்கூட்டத்தைக் கண்டு வியந்தேன்."*`,
    analysis: 'Wordsworth captures Romantic tranquility and memory, moving from solitary wandering to sudden joy awakened by nature.'
  },
  {
    keywords: ['thing with feathers', 'hope is the thing', 'emily dickinson'],
    title: 'Hope Is the Thing with Feathers',
    poet: 'Emily Dickinson (1861)',
    englishLines: `> *"'Hope' is the thing with feathers —  \n> That perches in the soul —  \n> And sings the tune without the words —  \n> And never stops — at all —"*`,
    sinhalaLines: `> *"'බලාපොරොත්තුව' යනු පියාපත් ඇති පුංචි කුරුල්ලෙකි;  \n> හදවතේ ගැඹුරුම අත්ත මත ලැගුම් ගනී;  \n> වචන නැති මිහිරි ගීයක් ගයමින්  \n> කිසිදා නොනැවතී නාද දෙයි."*`,
    tamilLines: `> *"'நம்பிக்கை' என்பது சிறகுகள் கொண்ட பறவை —  \n> அது நம் ஆன்மாவின் உள்ளே அமர்ந்திருக்கும் —  \n> வார்த்தைகளற்ற இனிய கீதத்தைப் பாடியபடி  \n> ஒருபோதும் ஓய்வதே இல்லை —"*`,
    analysis: 'An extended metaphor personifying inner resilience as a tireless songbird that weather and storms cannot silence.'
  }
];

export interface LiteraryWorkGuide {
  keywords: string[];
  title: string;
  author: string;
  year: string;
  era: string;
  summary: string;
  themes: string[];
  famousQuote: string;
  examInsight: string;
}

export const CANONICAL_WORKS_GUIDE: LiteraryWorkGuide[] = [
  {
    keywords: ['1984', 'nineteen eighty-four', 'orwell', 'big brother', 'winston smith'],
    title: 'Nineteen Eighty-Four (1984) & Animal Farm',
    author: 'George Orwell (Eric Arthur Blair)',
    year: '1949 (1984) / 1945 (Animal Farm)',
    era: 'Mid-20th Century Political Dystopia & Allegory',
    summary: 'George Orwell wrote *1984* as an urgent warning against totalitarian surveillance, state censorship, and the manipulation of truth (*Newspeak*, *"Big Brother is watching you"*). His earlier novella *Animal Farm* (1945) uses an allegorical fable of barnyard animals overthrowing a farmer to critique how political revolutions can betray their original egalitarian ideals (*"All animals are equal, but some animals are more equal than others"*).',
    themes: ['Totalitarian control & surveillance (*Big Brother*)', 'Corruption of language & truth (*Doublethink, Newspeak*)', 'Power & betrayal in political allegory (*Animal Farm*)'],
    famousQuote: '"Who controls the past controls the future: who controls the present controls the past." — *Nineteen Eighty-Four*',
    examInsight: 'Notice Orwell’s deliberately lucid, plain prose style—he championed clarity over ornate rhetoric so political truths could never be disguised.'
  },
  {
    keywords: ['pride and prejudice', 'jane austen', 'elizabeth bennet', 'mr darcy', 'darcy'],
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: '1813',
    era: 'Regency Era / Early 19th-Century Novel of Manners',
    summary: 'Set in rural Regency England, the novel follows the sharp-witted Elizabeth Bennet and the aristocratic Fitzwilliam Darcy. Both must overcome their respective flaws—Darcy’s aristocratic *pride* and Elizabeth’s hasty *prejudice*—before achieving mutual respect and love.',
    themes: ['Class, property & marriage economics', 'First impressions vs. moral growth', 'Gentle satirical irony regarding Regency society'],
    famousQuote: '"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."',
    examInsight: 'Austen pioneered *free indirect discourse*, letting the third-person narrator subtly echo Elizabeth’s private thoughts and wit.'
  },
  {
    keywords: ['great expectations', 'oliver twist', 'charles dickens', 'dickens', 'tale of two cities', 'pip'],
    title: 'Major Novels of Charles Dickens',
    author: 'Charles Dickens (1812–1870)',
    year: '1838–1861',
    era: 'Victorian Social Realism',
    summary: 'Dickens was the supreme chronicler of Victorian London’s industrial poverty and human resilience. In *Oliver Twist*, an orphan boy confronts workhouse cruelty (*"Please, sir, I want some more"*); in *Great Expectations*, Pip learns that true gentility lies in kindness and loyalty rather than inherited wealth; in *A Tale of Two Cities*, he contrasts London and Paris during the French Revolution.',
    themes: ['Social injustice, poverty & child welfare', 'Moral redemption vs. shallow wealth', 'Vivid caricatures and memorable dialogue'],
    famousQuote: '"It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness..." — *A Tale of Two Cities*',
    examInsight: 'Many Dickens novels were serialized in weekly magazines, which shaped their cliffhangers, large casts, and dramatic chapter endings.'
  },
  {
    keywords: ['to kill a mockingbird', 'harper lee', 'atticus finch', 'scout'],
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: '1960',
    era: 'Modern American Literature',
    summary: 'Narrated by young Scout Finch in Depression-era Alabama, the novel portrays her principled father, lawyer Atticus Finch, defending Tom Robinson—a Black man falsely accused in a deeply prejudiced court.',
    themes: ['Moral courage & empathy (*"climb into his skin and walk around in it"*)', 'Loss of childhood innocence', 'Destruction of innocence symbolized by the harmless mockingbird'],
    famousQuote: '"Shoot all the bluejays you want, if you can hit \'em, but remember it\'s a sin to kill a mockingbird."',
    examInsight: 'Scout’s dual perspective (child observer + adult reflective narrator) blends humor with searing moral clarity.'
  },
  {
    keywords: ['great gatsby', 'gatsby', 'fitzgerald', 'daisy buchanan'],
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: '1925',
    era: 'Modernism / The Jazz Age',
    summary: 'Observed through Nick Carraway, millionaire Jay Gatsby throws lavish parties on Long Island in an obsessive effort to win back his lost love, Daisy Buchanan, illuminating the illusion and disillusionment of the American Dream.',
    themes: ['The hollowness of gilded materialism', 'Obsession with recapturing the past', 'Symbolism of the green light & Valley of Ashes'],
    famousQuote: '"So we beat on, boats against the current, borne back ceaselessly into the past."',
    examInsight: 'Every object in Fitzgerald’s lyrical prose carries symbolic gravity—from the green light at the end of Daisy’s dock to the eyes of Dr. T.J. Eckleburg.'
  },
  {
    keywords: ['paradise lost', 'john milton', 'milton'],
    title: 'Paradise Lost',
    author: 'John Milton',
    year: '1667',
    era: '17th-Century English Renaissance / Restoration Epic',
    summary: 'Composed in soaring unrhymed iambic pentameter (blank verse) after Milton lost his eyesight, this twelve-book epic retells the rebellion of Satan, the creation of the world, and the Fall of Adam and Eve to *"justify the ways of God to men."*',
    themes: ['Free will, pride, and moral disobedience', 'Grand Latinate diction & epic similes', 'The human mind as its own sanctuary (*"The mind is its own place"*)'],
    famousQuote: '"The mind is its own place, and in itself / Can make a heaven of hell, a hell of heaven."',
    examInsight: 'Milton raised English blank verse to the monumental stature of Homer and Virgil.'
  },
  {
    keywords: ['canterbury tales', 'chaucer', 'geoffrey chaucer'],
    title: 'The Canterbury Tales',
    author: 'Geoffrey Chaucer (c. 1343–1400)',
    year: 'c. 1387–1400',
    era: 'Middle English Era',
    summary: 'Considered the "Father of English Poetry," Chaucer united pilgrims from every stratum of medieval society—from a humble Clerk of Oxford and Prioress to a Knight and Wife of Bath—telling lively stories on their journey to Canterbury Shrine.',
    themes: ['Frame narrative & social satire', 'Elevation of vernacular Middle English over Latin/French', 'Heroic rhyming couplets'],
    famousQuote: '"And gladly wolde he lerne, and gladly teche." — *General Prologue (The Clerk)*',
    examInsight: 'Notice how Chaucer wrote in the spoken London dialect of English at a time when noble courts still wrote primarily in French and Latin.'
  },
  {
    keywords: ['beowulf', 'old english epic', 'grendel'],
    title: 'Beowulf',
    author: 'Anonymous Anglo-Saxon Scop (Poet)',
    year: 'c. 700–1000 AD',
    era: 'Old English / Anglo-Saxon Period',
    summary: 'The oldest surviving long epic poem in Old English. The Geatish hero Beowulf sails to Denmark to rescue King Hrothgar’s mead-hall Heorot from the monster Grendel and Grendel’s mother, later giving his life in old age slaying a fiery dragon.',
    themes: ['Heroic code, loyalty & *wyrd* (fate)', 'Alliterative verse & poetic *kennings* (*whale-road* = sea)', 'Transience of earthly glory'],
    famousQuote: '"Fate often saves an undoomed man when his courage is good."',
    examInsight: 'Rather than end-rhyme, Old English poetry relies on strong alliteration and vivid compound metaphors called *kennings*.'
  },
  {
    keywords: ['waste land', 't.s. eliot', 'ts eliot', 'prufrock', 'modernism'],
    title: 'Modernist Literature (T.S. Eliot, Virginia Woolf, James Joyce)',
    author: 'T.S. Eliot, Virginia Woolf, James Joyce',
    year: '1914–1939',
    era: '20th-Century Modernism',
    summary: 'Emerging after the trauma of World War I, Modernism shattered Victorian linear plots in favor of **stream-of-consciousness** narration (Woolf’s *Mrs Dalloway*, Joyce’s *Ulysses*) and fragmented mythic collage (Eliot’s *The Waste Land* and *Love Song of J. Alfred Prufrock*).',
    themes: ['Alienation in the industrial city', 'Interior psychological time (*epiphany*)', 'Fragmentation & mythic allusion ("These fragments I have shored against my ruins")'],
    famousQuote: '"April is the cruellest month, breeding / Lilacs out of the dead land..." — T.S. Eliot, *The Waste Land*',
    examInsight: 'Ezra Pound’s rallying cry *"Make it new!"* sums up Modernism’s daring formal experimentation.'
  },
  {
    keywords: ['frankenstein', 'mary shelley', 'keats', 'ode on a grecian urn', 'ode to a nightingale', 'shelley', 'ozymandias', 'coleridge', 'ancient mariner'],
    title: 'The Romantics: Shelley, Keats & Coleridge',
    author: 'Mary Shelley, John Keats, P.B. Shelley, S.T. Coleridge',
    year: '1798–1832',
    era: 'The Romantic Period',
    summary: 'Alongside Wordsworth, these Romantics explored nature, mortality, and imagination: Mary Shelley’s *Frankenstein* (1818) cautioned against unchecked scientific ambition; Keats celebrated fleeting beauty and *"Negative Capability"*; P.B. Shelley dismantled imperial pride in *"Ozymandias"*; and Coleridge conjured supernatural mystery in *"The Rime of the Ancient Mariner"*.',
    themes: ['Transience of worldly power (*"Look on my works, ye Mighty, and despair!"*)', 'Truth and aesthetic beauty (*Keats*)', 'Moral guilt and reverence for all living things (*Coleridge*)'],
    famousQuote: '"He prayeth best, who loveth best / All things both great and small." — S.T. Coleridge',
    examInsight: 'Keats’s *"Negative Capability"* means the artistic grace of remaining in uncertainty and mystery without forcing rigid logic.'
  }
];
