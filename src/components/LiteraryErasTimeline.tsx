import React, { useState } from 'react';
import { 
  History, 
  Sparkles, 
  BookOpen, 
  Feather, 
  Scroll, 
  Quote, 
  ChevronRight, 
  MessageSquare, 
  Calendar,
  Compass
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

export interface TimelineEra {
  id: string;
  century: string;
  period: string;
  nameEn: string;
  nameSi: string;
  iconTag: string;
  summaryEn: string;
  summarySi: string;
  definingTraitsEn: string[];
  definingTraitsSi: string[];
  iconicAuthors: {
    name: string;
    work: string;
    role: string;
  }[];
  famousExcerpt: {
    quote: string;
    author: string;
    work: string;
  };
  monasticInsightEn: string;
  monasticInsightSi: string;
}

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: 'old-english',
    century: '5th–11th C.',
    period: 'c. 450 – 1066',
    nameEn: 'Old English & Anglo-Saxon Verse',
    nameSi: 'පැරණි ඉංග්‍රීසි හා ඇංග්ලෝ-සැක්සන් යුගය',
    iconTag: 'Epic Heroism',
    summaryEn: 'Forged in alliterative heroic verse, Old English literature was chanted by scops around peat fires, blending pagan battle fatalism with early Christian monastic illuminated manuscripts.',
    summarySi: 'ඇංග්ලෝ-සැක්සන් රණකාමී විරුවන්ගේ සටන්, දෛවය සහ පැරණි කිතුනු පැවිදි අත්පිටපත් එකමුතු වූ සියවස් පහක ආරම්භක ඉංග්‍රීසි කාව්‍ය යුගයයි.',
    definingTraitsEn: [
      'Alliterative verse meter without end-rhyme',
      'Heroic code, warrior comitatus & wyrd (fate)',
      'Kennings (metaphorical compounds like "whale-road" for sea)',
      'Monastic preservation in codices (Nowell, Exeter Book)'
    ],
    definingTraitsSi: [
      'අවසාන එළිසමයකින් තොර අනුප්‍රාස කාව්‍ය රටාව',
      'වීර චර්යාව සහ දෛවය පිළිබඳ විශ්වාසය',
      'කෙනින්ස් (Kennings) සංකේතාත්මක වචන භාවිතය',
      'පැවිදි අසපු ආශ්‍රිතව අත්පිටපත් සංරක්ෂණය වීම'
    ],
    iconicAuthors: [
      { name: 'Anonymous Scop', work: 'Beowulf (c. 750)', role: 'Epic heroic poetry' },
      { name: 'Cædmon', work: 'Hymn of Creation (c. 680)', role: 'First recorded English poet' },
      { name: 'The Venerable Bede', work: 'Historia Ecclesiastica', role: 'Monastic chronicler & scholar' }
    ],
    famousExcerpt: {
      quote: 'Hwæt! We Gardena in geardagum, þeodcyninga, þrym gefrunon...',
      author: 'Unknown Poet',
      work: 'Beowulf (Opening call to attention)'
    },
    monasticInsightEn: 'Parallel to medieval Sinhala sandesha and rock inscriptions at Anuradhapura, Old English survived solely through the painstaking hand-lettering of monastic scribes.',
    monasticInsightSi: 'අනුරාධපුර යුගයේ පුස්කොළ පොත් ලියූ භික්ෂූන් වහන්සේලා මෙන්ම, මෙම පැරණි ඉංග්‍රීසි කාව්‍ය ලොවට ඉතිරි වූයේද බටහිර පැවිදි හිමිවරුන්ගේ ලේඛන කලාව නිසාවෙනි.'
  },
  {
    id: 'middle-english',
    century: '11th–15th C.',
    period: 'c. 1066 – 1500',
    nameEn: 'Middle English & The Chaucerian Epoch',
    nameSi: 'මධ්‍යතන ඉංග්‍රීසි හා චෝසර් යුගය',
    iconTag: 'Pilgrimage & Satire',
    summaryEn: 'Following the Norman Conquest (1066), Anglo-Saxon merged with French and Latin. Geoffrey Chaucer established London English as a legitimate literary tongue with humor, irony, and vivid character portraits.',
    summarySi: 'නෝර්මන් ආක්‍රමණයත් සමඟ ප්‍රංශ සහ ලතින් වචන මිශ්‍ර වී ඉංග්‍රීසි බස පෝෂණය වූ අතර, ජෙෆ්‍රි චෝසර් විසින් සාමාන්‍ය මිනිසුන්ගේ ජීවිතය හාස්‍යය හා උපහාසය මුසු කාව්‍යයට නැගීය.',
    definingTraitsEn: [
      'Tri-lingual society (French court, Latin church, English commoners)',
      'Introduction of rhymed iambic decasyllable (heroic couplets)',
      'Chivalric romances and Arthurian legend cycles',
      'Vibrant estate satire questioning ecclesiastical corruption'
    ],
    definingTraitsSi: [
      'ප්‍රංශ රාජසභාව, ලතින් පල්ලිය සහ ඉංග්‍රීසි ගැමියන් අතර ත්‍රෛභාෂික පරිසරය',
      'එළිසම සහිත අක්ෂර දහයේ කාව්‍ය පද හඳුන්වා දීම',
      'ආතර් රජු සහ නයිට්වරුන්ගේ වීරකතා සම්ප්‍රදාය',
      'සමාජ පන්ති සහ ආගමික පූජකයන්ගේ දුබලතා උපහාසයට ලක් කිරීම'
    ],
    iconicAuthors: [
      { name: 'Geoffrey Chaucer', work: 'The Canterbury Tales (c. 1387)', role: 'Father of English Poetry' },
      { name: 'The Pearl Poet', work: 'Sir Gawain and the Green Knight', role: 'Alliterative chivalric romance' },
      { name: 'Sir Thomas Malory', work: 'Le Morte d\'Arthur (1485)', role: 'First great prose Arthurian cycle' }
    ],
    famousExcerpt: {
      quote: 'Whan that Aprill with his shoures soote / The droghte of March hath perced to the roote...',
      author: 'Geoffrey Chaucer',
      work: 'General Prologue to The Canterbury Tales'
    },
    monasticInsightEn: 'Chaucer’s pilgrims journeyed toward Canterbury Cathedral much as Sri Lankan pilgrims traverse the ancient steps to Sri Pada and the Temple of the Sacred Tooth Relic in Kandy.',
    monasticInsightSi: 'චෝසර්ගේ වන්දනාකරුවන් කැන්ටබරිය බලා ගමන් ගත්තේද, අපේ සැදැහැවතුන් සිරිපා කරුණා කරන්නාක් මෙන් සහ දළදා වහන්සේ වැඳපුදා ගැනීමට මහනුවරට පැමිණෙන්නාක් මෙනි.'
  },
  {
    id: 'renaissance',
    century: '16th–17th C.',
    period: 'c. 1500 – 1660',
    nameEn: 'The English Renaissance & Shakespearean Golden Age',
    nameSi: 'ඉංග්‍රීසි පුනරුදය හා ෂේක්ස්පියර් ස්වර්ණ යුගය',
    iconTag: 'Humanism & Globe Folio',
    summaryEn: 'An explosion of humanist inquiry, maritime discovery, and theatrical grandeur under the Tudors and Stuarts. Blank verse achieved unmatched heights through Marlowe, Shakespeare, and Milton.',
    summarySi: 'මානවවාදය, වේදිකා නාට්‍ය සහ කාව්‍යමය නිදහස උච්චතම ස්ථානයට පත්වූ යුගයයි. විලියම් ෂේක්ස්පියර්, ක්‍රිස්ටෝපර් මාර්ලෝ සහ ජෝන් මිල්ටන් ඉංග්‍රීසි බසට නව වචන දහස් ගණනක් එක් කළහ.',
    definingTraitsEn: [
      'Flourishing of Elizabethan and Jacobean commercial drama',
      'Mastery of unrhymed Iambic Pentameter (Blank Verse)',
      'Petrarchan and Shakespearean sonnet sequences',
      'Vernacular Bible translation (King James Bible, 1611)'
    ],
    definingTraitsSi: [
      'එලිසබෙත් හා ජැකෝබියන් වේදිකා නාට්‍ය කලාවේ පුනරුදය',
      'බ්ලෑන්ක් වර්ස් (Blank Verse) නම් රිද්මයානුකූල පද්‍ය විලාසය',
      'ෂේක්ස්පියර්ගේ ආදර හා දාර්ශනික සොනට් කාව්‍ය',
      '1611 කිං ජේම්ස් බයිබල් පරිවර්තනයෙන් භාෂාව විධිමත් වීම'
    ],
    iconicAuthors: [
      { name: 'William Shakespeare', work: 'Hamlet, Macbeth, Sonnets', role: 'Universal dramatist & bard' },
      { name: 'Christopher Marlowe', work: 'Doctor Faustus (c. 1592)', role: 'Mighty blank verse innovator' },
      { name: 'John Milton', work: 'Paradise Lost (1667)', role: 'Epic grand style theological master' },
      { name: 'John Donne', work: 'Holy Sonnets', role: 'Metaphysical poetic conceits' }
    ],
    famousExcerpt: {
      quote: 'What a piece of work is a man! How noble in reason, how infinite in faculties...',
      author: 'William Shakespeare',
      work: 'Hamlet (Act II, Scene 2)'
    },
    monasticInsightEn: 'During this identical era (1590s), Kandy became the independent citadel of the Kingdom of Kandy, where Asgiri Maha Vihara protected the sacred Dhamma amidst foreign coastal wars.',
    monasticInsightSi: 'මෙම යුගයේදීම (1590 ගණන්වල), මහනුවර ස්වාධීන රාජධානිය බවට පත් වූ අතර අස්ගිරි මහා විහාරය විදේශීය ආක්‍රමණ හමුවේ සඟරුවන හා දළදා තේවාව සුරක්ෂිත කළේය.'
  },
  {
    id: 'enlightenment',
    century: '17th–18th C.',
    period: 'c. 1660 – 1798',
    nameEn: 'The Enlightenment & Neoclassical Age of Reason',
    nameSi: 'ප්‍රබුද්ධත්ව යුගය හා නියෝ-සම්භාව්‍ය බුද්ධිවාදය',
    iconTag: 'Reason, Satire & Prose',
    summaryEn: 'An era prizing logic, order, scientific empiricism, and polished wit. Saw the birth of the English novel, the first definitive English dictionary by Samuel Johnson, and stinging political satire.',
    summarySi: 'තර්කය, විද්‍යාව, සමබරතාවය සහ සදාචාරය අගය කළ යුගයයි. පළමු ඉංග්‍රීසි නවකතා බිහිවීම, සැමුවෙල් ජොන්සන්ගේ ශබ්දකෝෂය සහ තියුණු සමාජ උපහාසාත්මක කෘති මෙහි කැපී පෙනේ.',
    definingTraitsEn: [
      'Heroic couplets with crystalline symmetry and balance',
      'Emergence of the periodic essay and coffeehouse intellectual culture',
      'Rise of the modern novel (Defoe, Richardson, Fielding)',
      'Codification of English lexicography (Johnson’s Dictionary, 1755)'
    ],
    definingTraitsSi: [
      'සමමිතික සහ නිරවුල් එළිසම සහිත දෙපද කාව්‍ය රටාව',
      'නූතන ඉංග්‍රීසි නවකතාවේ උපත (රොබින්සන් කෲසෝ, ගලිවර්ගේ චාරිකා)',
      'සැමුවෙල් ජොන්සන් විසින් ප්‍රථම පූර්ණ ඉංග්‍රීසි ශබ්දකෝෂය සම්පාදනය (1755)',
      'බුද්ධිමය සංවාදශීලී සාකච්ඡා සංස්කෘතිය'
    ],
    iconicAuthors: [
      { name: 'Alexander Pope', work: 'The Rape of the Lock, An Essay on Man', role: 'Master of neoclassical epigram' },
      { name: 'Jonathan Swift', work: 'Gulliver\'s Travels (1726)', role: 'Searing satirical visionary' },
      { name: 'Samuel Johnson', work: 'Dictionary of the English Language', role: 'Foundational lexicographer & critic' },
      { name: 'Daniel Defoe', work: 'Robinson Crusoe (1719)', role: 'Pioneer of realistic narrative prose' }
    ],
    famousExcerpt: {
      quote: 'A little learning is a dang\'rous thing; / Drink deep, or taste not the Pierian spring...',
      author: 'Alexander Pope',
      work: 'An Essay on Criticism (1711)'
    },
    monasticInsightEn: 'In 1754, Horace Walpole coined "Serendipity" from Serendib (Sri Lanka). Concurrently in Kandy, Ven. Welivita Saranankara Thero restored the higher ordination (Upasampada), revitalizing scholarship.',
    monasticInsightSi: '1754 දී හොරේස් වොල්පෝල් විසින් ලංකාව (Serendib) ඇසුරින් "Serendipity" වචනය නිර්මාණය කළ අතර, එම වසරවලදීම වැලිවිට සරණංකර සංඝරාජ මාහිමියන් උපසම්පදාව යළි පිහිටුවා සඟ පරපුර පෝෂණය කළහ.'
  },
  {
    id: 'romanticism',
    century: 'Late 18th–19th C.',
    period: 'c. 1798 – 1837',
    nameEn: 'The Romantic Era: Imagination & Nature',
    nameSi: 'රොමැන්ටික් යුගය: සොබාදහම සහ ආධ්‍යාත්මික පරිකල්පනය',
    iconTag: 'The Sublime & Emotion',
    summaryEn: 'A passionate rebellion against industrial factories and cold rationalism. Poets turned toward sublime landscapes, solitary contemplation, the purity of childhood, and emotional intensity.',
    summarySi: 'කාර්මිකරණයට හා යාන්ත්‍රිකත්වයට එරෙහිව සොබාදහමේ අසිරිය, මිනිස් හැඟීම්වල පවිත්‍රත්වය සහ ගැඹුරු පරිකල්පනය මුල්කොට ගත් විප්ලවීය කාව්‍ය ව්‍යාපාරයයි.',
    definingTraitsEn: [
      'The Sublime: experiencing awe and spiritual terror in wild nature',
      'Individual inward consciousness over societal conformity',
      'The lyrical ballad written in the natural diction of ordinary people',
      'Sensory synesthesia and negative capability (Keats)'
    ],
    definingTraitsSi: [
      'වනගත සොබාදහමෙන් ආධ්‍යාත්මික සුවය සහ ප්‍රමෝදය ලැබීම',
      'සමාජ සම්මුතීන්ට වඩා පුද්ගල අභ්‍යන්තර හැඟීම්වලට මුල්තැන දීම',
      'සරල ජන වහරෙන් ලියැවුණු ගීතාත්මක කාව්‍ය (Lyrical Ballads)',
      'ජෝන් කීට්ස්ගේ සෞන්දර්යවාදී සංවේදන'
    ],
    iconicAuthors: [
      { name: 'William Wordsworth', work: 'Lyrical Ballads, The Prelude', role: 'Poet of nature and memory' },
      { name: 'Samuel Taylor Coleridge', work: 'The Rime of the Ancient Mariner', role: 'Supernatural and psychological vision' },
      { name: 'John Keats', work: 'Ode to a Nightingale, Ode on a Grecian Urn', role: 'Sensuous beauty and mortality' },
      { name: 'Percy Bysshe Shelley', work: 'Ozymandias, Ode to the West Wind', role: 'Radical political idealism' },
      { name: 'Jane Austen', work: 'Pride and Prejudice (1813)', role: 'Quiet irony and social realism' }
    ],
    famousExcerpt: {
      quote: 'Beauty is truth, truth beauty,—that is all / Ye know on earth, and all ye need to know.',
      author: 'John Keats',
      work: 'Ode on a Grecian Urn (1819)'
    },
    monasticInsightEn: 'Wordsworth’s reverence for natural solitude mirrors the ascetic forest-dwelling tradition (Aranyavasi) of Buddhist monks meditating in the central hills of Kandy.',
    monasticInsightSi: 'වර්ඩ්ස්වර්ත් සොබාදහමේ හුදකලාව අගය කළ ආකාරය, අපේ අරණ්‍යවාසී භික්ෂූන් වහන්සේලා සෙංකඩගල වන සෙනසුන්හි භාවනායෝගීව වැඩසිටි ආකාරයට පුදුම සමානකමක් දක්වයි.'
  },
  {
    id: 'victorian',
    century: '19th C.',
    period: 'c. 1837 – 1901',
    nameEn: 'The Victorian Epoch: Progress, Empire & Realism',
    nameSi: 'වික්ටෝරියානු යුගය: කාර්මික දියුණුව සහ සමාජ යථාර්ථවාදය',
    iconTag: 'Social Realism & The Novel',
    summaryEn: 'Marked by industrial expansion, scientific debates on Darwinian evolution, and profound moral dilemmas. The Golden Age of the serial novel exposing class inequities and female agency.',
    summarySi: 'විද්‍යාවේ දියුණුව, ඩාර්වින්ගේ පරිණාමවාදී සංකල්ප සහ දැඩි සමාජ විෂමතා පසුබිම් කරගනිමින් චාල්ස් ඩිකන්ස් සහ බ්‍රොන්ටේ සහෝදරියන් විසින් සමාජ යථාර්ථවාදී නවකතා බිහි කළ යුගයයි.',
    definingTraitsEn: [
      'Social problem novels exposing child labor and slums (Dickens)',
      'Complex psychological female protagonists (Brontë sisters, George Eliot)',
      'Dramatic monologues exploring conflicted moral consciences (Browning)',
      'Tension between spiritual faith and scientific doubt (Tennyson)'
    ],
    definingTraitsSi: [
      'ළමා ශ්‍රමය සහ දුගී ජනතාවගේ පීඩනය හෙළි කළ යථාර්ථවාදී නවකතා (ඩිකන්ස්)',
      'කාන්තා නිදහස හා මානසිකත්වය විවරණය කළ කෘති (ජේන් අයර්, වදරිං හයිට්ස්)',
      'නාට්‍යමය ඒකාංග කාව්‍ය (Dramatic Monologues)',
      'ආගමික විශ්වාසය සහ විද්‍යාත්මක සැකය අතර ගැටුම (ටෙනිසන්)'
    ],
    iconicAuthors: [
      { name: 'Charles Dickens', work: 'Great Expectations, Bleak House', role: 'Champion of the oppressed & serial master' },
      { name: 'Charlotte Brontë', work: 'Jane Eyre (1847)', role: 'Gothic realism and female autonomy' },
      { name: 'George Eliot (Mary Ann Evans)', work: 'Middlemarch (1871)', role: 'Philosophical panoramic realism' },
      { name: 'Alfred, Lord Tennyson', work: 'In Memoriam A.H.H., Ulysses', role: 'Poet Laureate of melancholic music' }
    ],
    famousExcerpt: {
      quote: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness...',
      author: 'Charles Dickens',
      work: 'A Tale of Two Cities (1859)'
    },
    monasticInsightEn: 'During this epoch, British civil servants and orientalists (Rhys Davids, Turnour) collaborated with Pirivena monks in Kandy to transcribe the Mahavamsa and create the Pali Text Society.',
    monasticInsightSi: 'මෙම යුගයේදී ටර්නර් සහ රීස් ඩේවිඩ්ස් වැනි විද්වතුන් මහනුවර පිරිවෙන් හිමිවරුන් සමඟ එක්ව මහාවංසය ඉංග්‍රීසියට පරිවර්තනය කර පාලි ග්‍රන්ථ සමාගම පිහිටුවූහ.'
  },
  {
    id: 'modernism',
    century: '20th C.',
    period: 'c. 1901 – 1970',
    nameEn: 'Modernism & The Post-War Avant-Garde',
    nameSi: 'නූතනවාදය හා පශ්චාත්-යුධ සාහිත්‍යය',
    iconTag: 'Fragmentation & Free Verse',
    summaryEn: 'Traumatized by two World Wars, artists fractured traditional chronology and perspective. Embraced stream-of-consciousness prose, free verse, existentialism, and psychological relativity.',
    summarySi: 'ලෝක යුද්ධ දෙකක කම්පනය හමුවේ සම්ප්‍රදායික රීති බිඳදමා විඥාන ධාරා (Stream of Consciousness) රීතිය සහ නිදහස් කාව්‍යය බිහි කළ විප්ලවීය යුගයයි.',
    definingTraitsEn: [
      'Stream-of-consciousness narrative style (Joyce, Woolf)',
      'Free verse and high intertextual fragmentation (T.S. Eliot)',
      'Dystopian political warning allegories (Orwell, Huxley)',
      'The Lost Generation tackling alienation and disillusionment'
    ],
    definingTraitsSi: [
      'මිනිස් සිතුවිලි ගලායාම නිරූපණය කරන විඥාන ධාරා ශෛලිය (වර්ජිනියා වුල්ෆ්)',
      'නිදහස් ආරේ අසම්පූර්ණ කාව්‍ය (ටී. එස්. එලියට්ගේ The Waste Land)',
      'දේශපාලන ඒකාධිපතිවාදයට එරෙහි අනතුරු ඇඟවීම් (ජෝර්ජ් ඕවල්)',
      'යුද්ධයෙන් පසු මිනිසාගේ ආගන්තුකභාවය සහ අසරණකම'
    ],
    iconicAuthors: [
      { name: 'T.S. Eliot', work: 'The Waste Land (1922), Four Quartets', role: 'Modernist poetic titan' },
      { name: 'Virginia Woolf', work: 'Mrs. Dalloway, To the Lighthouse', role: 'Pioneer of lyrical stream-of-consciousness' },
      { name: 'James Joyce', work: 'Ulysses (1922)', role: 'Encyclopedic linguistic reinvention' },
      { name: 'George Orwell', work: 'Nineteen Eighty-Four, Animal Farm', role: 'Democratic socialist & essayist' }
    ],
    famousExcerpt: {
      quote: 'These fragments I have shored against my ruins / Why then Ile fit you. Hieronymo\'s mad againe.',
      author: 'T.S. Eliot',
      work: 'The Waste Land (1922)'
    },
    monasticInsightEn: 'In his landmark "Four Quartets", T.S. Eliot explicitly wove Eastern philosophical detachment and Buddhist fire meditation into modern English poetic syntax.',
    monasticInsightSi: 'ටී. එස්. එලියට් තම Four Quartets කාව්‍යයේදී බෞද්ධ දර්ශනයේ එන අනිත්‍යය සහ මධ්‍යම ප්‍රතිපදාව නූතන ඉංග්‍රීසි කාව්‍යයට බද්ධ කළේය.'
  },
  {
    id: 'sri-lankan-contemporary',
    century: 'Late 20th–21st C.',
    period: 'c. 1970 – Present',
    nameEn: 'Post-Colonial & Sri Lankan English Letters',
    nameSi: 'පශ්චාත්-යටත්විජිත හා ශ්‍රී ලාංකේය ඉංග්‍රීසි සාහිත්‍යය',
    iconTag: 'Island Idiom & Global Reach',
    summaryEn: 'English reclaimed as a dynamic island voice. Sri Lankan writers blend tropical landscapes, Buddhist mindfulness, family memory, and war trauma into Booker-winning literature and vibrant local drama.',
    summarySi: 'ඉංග්‍රීසි භාෂාව ශ්‍රී ලාංකේය සංස්කෘතික සුවඳින් පෝෂණය කරමින් ජාත්‍යන්තර බුකර් ත්‍යාග දක්වා ඉහළට ඔසවා තැබූ නූතන ශ්‍රී ලාංකික කතුවරුන්ගේ සහ පරිවර්තකයන්ගේ ස්වර්ණමය යුගයයි.',
    definingTraitsEn: [
      'Decolonization of English: infusing Sinhala and Tamil rhythms',
      'Thematic focus on ancestral memory, civil conflict, and reconciliation',
      'Rich monastic translation tradition bridging Pali cannon with world letters',
      'International recognition (Booker Prize winners Ondaatje & Karunatilaka)'
    ],
    definingTraitsSi: [
      'දේශීය සිංහල හා දෙමළ රිද්මයෙන් ඉංග්‍රීසි භාෂාව නැවුම් ලෙස භාවිතය',
      'පවුල් මතකයන්, යුධ අත්දැකීම් සහ ජාතික සංහිඳියාව විවරණය කිරීම',
      'ත්‍රිපිටක ධර්මය සහ අටුවා ලොවට ගෙන යන පිරිවෙන් පරිවර්තන සේවාව',
      'ජාත්‍යන්තර සම්මාන දිනූ මයිකල් ඔන්ඩාච්චි සහ ෂෙහාන් කරුණාතිලකගේ සාහිත්‍යය'
    ],
    iconicAuthors: [
      { name: 'Michael Ondaatje', work: 'The English Patient (Booker Prize), Running in the Family', role: 'Lyrical memoirist & novelist' },
      { name: 'Shehan Karunatilaka', work: 'The Seven Moons of Maali Almeida (Booker 2022)', role: 'Satirical magical realist' },
      { name: 'Punyakante Wijenaike', work: 'The Waiting Earth, Giraya', role: 'Chronicler of rural agrarian Ceylon' },
      { name: 'Lakdhas Wikkramasinha', work: 'Nossa Senhora dos Chingalas', role: 'Indigenist radical English poet' },
      { name: 'Jean Arasanayagam', work: 'A Nice Burgher Girl, Peacocks and Dreams', role: 'Kandy poetess of cultural hybridity' }
    ],
    famousExcerpt: {
      quote: 'I have seen pictures of an ancestor who came to this island... What began in a foreign tongue now sings with the sound of our own rains.',
      author: 'Michael Ondaatje',
      work: 'Running in the Family (Ceylon Memoir)'
    },
    monasticInsightEn: 'Right here at Asgiri Maha Vihara in Kandy, Pirivena students continue this legacy daily: mastering English to share the compassionate philosophy of the Buddha with seekers across all continents.',
    monasticInsightSi: 'අද දිනයේත් ඓතිහාසික අස්ගිරි මහා විහාරයේ වැඩසිටින ශිෂ්‍ය හිමිවරුන් මෙම උරුමය ඉදිරියට ගෙන යමින්, බුදුදහම ලොවට බෙදාහැරීමට ඉංග්‍රීසි භාෂාව මැනවින් ප්‍රගුණ කරති.'
  }
];

interface LiteraryErasTimelineProps {
  currentLang?: Language;
  onOpenAiTutor?: (prefillQuery?: string) => void;
}

export const LiteraryErasTimeline: React.FC<LiteraryErasTimelineProps> = ({ 
  currentLang, 
  onOpenAiTutor 
}) => {
  const { language } = useLanguage();
  const activeLang = currentLang || language;
  const [selectedEraId, setSelectedEraId] = useState<string>('renaissance');
  const t = TRANSLATIONS[activeLang];

  const activeEra = TIMELINE_ERAS.find(e => e.id === selectedEraId) || TIMELINE_ERAS[2];

  const handleStudyWithAi = (era: TimelineEra) => {
    if (onOpenAiTutor) {
      const eraName = activeLang === 'si' ? era.nameSi : era.nameEn;
      onOpenAiTutor(
        `I would like a detailed scholarly analysis of the "${eraName}" (${era.period}). What were its primary literary techniques, defining authors, and historical significance?`
      );
    }
  };

  return (
    <section id="timeline" className="py-16 lg:py-24 border-b border-stone-300/80 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
            <History className="w-4 h-4 text-amber-800" />
            <span>{t.timelineKicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t.timelineTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
            {t.timelineSubtitle}
          </p>
        </div>

        {/* Horizontal Timeline Rail */}
        <div className="relative mb-10 overflow-x-auto pb-4 no-scrollbar">
          {/* Timeline background track line */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-amber-900/20 -translate-y-1/2 z-0" />

          <div className="flex items-center gap-3 sm:gap-4 min-w-max px-2 relative z-10">
            {TIMELINE_ERAS.map((era, idx) => {
              const isSelected = era.id === selectedEraId;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEraId(era.id)}
                  className={`flex flex-col items-center text-left p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950 text-white border-amber-950 shadow-md scale-105 ring-2 ring-amber-400/40'
                      : 'bg-[#FFFDF9] text-stone-800 border-stone-300 hover:border-amber-800/50 hover:bg-[#FAF4EB]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono mb-1">
                    <span className={isSelected ? 'text-amber-300 font-bold' : 'text-amber-800 font-bold'}>
                      0{idx + 1}.
                    </span>
                    <span className={isSelected ? 'text-stone-200' : 'text-stone-500'}>
                      {era.century}
                    </span>
                  </div>

                  <span className="font-serif font-bold text-xs sm:text-sm tracking-tight whitespace-nowrap">
                    {activeLang === 'si' ? era.nameSi : era.nameEn}
                  </span>

                  <span className={`text-[10px] font-mono mt-0.5 whitespace-nowrap ${isSelected ? 'text-amber-200/90' : 'text-stone-500'}`}>
                    {era.period}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Era Interactive Dossier Card */}
        <div className="bg-[#FFFDF9] border border-stone-300/90 rounded-2xl p-6 sm:p-10 shadow-xs transition-all animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Era Overview, Defining Traits & Notable Authors */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-900 mb-2">
                  <span className="font-bold uppercase tracking-wider">{activeEra.period}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold">{activeEra.iconTag}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-500">{activeEra.century}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                  {activeLang === 'si' ? activeEra.nameSi : activeEra.nameEn}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed font-sans first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-amber-900">
                  {activeLang === 'si' ? activeEra.summarySi : activeEra.summaryEn}
                </p>
              </div>

              {/* Defining Traits Checklist */}
              <div className="bg-[#F8F4EC] border border-amber-900/10 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-950 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  <span>
                    {activeLang === 'si' ? 'සුවිශේෂී සාහිත්‍ය ලක්ෂණ:' : 'Signature Literary Characteristics:'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {(activeLang === 'si' ? activeEra.definingTraitsSi : activeEra.definingTraitsEn).map((trait, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 bg-[#FCFAF5] rounded-lg border border-stone-200/90">
                      <span className="text-amber-800 font-bold shrink-0">✦</span>
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Iconic Authors & Signature Works */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-amber-800" />
                  <span>
                    {activeLang === 'si' ? 'කීර්තිමත් කතුවරුන් සහ ප්‍රධාන නිර්මාණ:' : 'Iconic Authors & Landmark Works:'}
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeEra.iconicAuthors.map((author, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF6EE] border border-stone-200/90 rounded-xl">
                      <div className="font-serif font-bold text-amber-950 text-sm">
                        {author.name}
                      </div>
                      <div className="text-xs text-stone-800 font-medium mt-0.5">
                        {author.work}
                      </div>
                      <div className="text-[11px] text-stone-500 font-sans mt-0.5">
                        {author.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trigger to Study with AI */}
              <div className="pt-2">
                <button
                  onClick={() => handleStudyWithAi(activeEra)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-950 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-amber-300" />
                  <span>
                    {activeLang === 'si' 
                      ? `මෙම යුගය ගැන AI ගුරුතුමාගෙන් විමසන්න` 
                      : `Deep-Dive "${activeEra.nameEn}" with Scholar AI`}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Canonical Quote & Monastic Heritage Connection */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Landmark Canonical Quote Box */}
              <div className="bg-[#FAF6EE] border border-amber-900/15 rounded-xl p-6 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-3">
                  <Quote className="w-3.5 h-3.5 text-amber-800" />
                  <span>
                    {activeLang === 'si' ? 'සම්භාව්‍ය පාඨය හා උපුටා ගැනීම:' : 'Landmark Canonical Excerpt:'}
                  </span>
                </div>

                <blockquote className="font-serif italic text-sm sm:text-base text-stone-800 leading-relaxed border-l-2 border-amber-800 pl-3.5 my-2">
                  &ldquo;{activeEra.famousExcerpt.quote}&rdquo;
                </blockquote>

                <cite className="text-xs font-sans text-stone-600 block mt-2 not-italic">
                  — <strong className="text-stone-900">{activeEra.famousExcerpt.author}</strong>, 
                  <span className="italic ml-1">{activeEra.famousExcerpt.work}</span>
                </cite>
              </div>

              {/* Asgiriya / Sri Lanka Monastic Intersection */}
              <div className="bg-stone-900 text-stone-100 rounded-xl p-6 shadow-md border border-stone-800">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-300 mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>
                    {activeLang === 'si' ? 'අස්ගිරි විහාර හා ලාංකේය සබඳතාව:' : 'Asgiri Vihara & Island Intersection:'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  {activeLang === 'si' ? activeEra.monasticInsightSi : activeEra.monasticInsightEn}
                </p>
              </div>

              {/* Fast Epoch Jump Matrix */}
              <div className="bg-[#F5EFE6] border border-amber-900/10 rounded-xl p-4 text-xs">
                <span className="font-mono uppercase text-stone-500 font-bold block mb-2 text-[10px]">
                  {activeLang === 'si' ? 'යුගයන් අතර සංචාලනය:' : 'Jump Across Eras:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TIMELINE_ERAS.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => setSelectedEraId(e.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                        selectedEraId === e.id
                          ? 'bg-amber-950 text-white font-semibold'
                          : 'bg-[#FFFDF9] text-stone-700 hover:bg-[#FAF4EB] hover:text-amber-950 border border-stone-200'
                      }`}
                    >
                      {activeLang === 'si' ? e.nameSi.split(' ')[0] : e.nameEn.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
