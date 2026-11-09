export type Language = 'en' | 'si';

export interface Translations {
  // Navigation
  navPavilion: string;
  navOrigins: string;
  navGrammar: string;
  navTimeline: string;
  navLiterature: string;
  navShakespeare: string;
  navTrivia: string;
  navActivities: string;
  navSchedule: string;
  tutorBtn: string;
  passBtn: string;

  // Hero Section
  festivalKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  venueLabel: string;
  venueValue: string;
  datesLabel: string;
  datesValue: string;
  openBadge: string;
  plateCaption: string;
  dispatchKicker: string;
  dispatchTitle: string;
  dispatchP1: string;
  dispatchP2: string;
  grammarLabCardTitle: string;
  grammarLabCardDesc: string;
  shakespeareCardTitle: string;
  shakespeareCardDesc: string;
  exploreActivitiesBtn: string;

  // Timeline
  timelineKicker: string;
  timelineTitle: string;
  timelineSubtitle: string;

  // Trivia
  triviaKicker: string;
  triviaTitle: string;
  triviaSubtitle: string;
  questionsAnswered: string;
  accuracy: string;
  bestRound: string;
  newRoundBtn: string;
  askTutorBtn: string;

  // Tutor
  tutorTitle: string;
  tutorSubtitle: string;
  handsFreeMode: string;
  listeningNow: string;
  clickToSpeak: string;
  inputPlaceholder: string;
  translateTab: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    navPavilion: 'The Pavilion',
    navOrigins: 'Origins',
    navGrammar: 'Grammar Lab',
    navTimeline: 'Eras Timeline',
    navLiterature: 'Literature',
    navShakespeare: 'Shakespeare Review',
    navTrivia: 'Daily Trivia',
    navActivities: 'Activities',
    navSchedule: 'Schedule',
    tutorBtn: 'AI English Tutor',
    passBtn: 'Festival Pass',

    festivalKicker: 'Sanjanani Literary Festival 2026 · Asgiri Maha Vihara · Kandy, Sri Lanka',
    heroTitle: 'The English Corner',
    heroSubtitle: 'Where Sacred Monastic Heritage Meets the Symphony of English Letters, Grammar & Shakespearean Drama',
    venueLabel: 'Venue:',
    venueValue: 'Asgiri Maha Vihara Maha Pirivena Premises, Kandy',
    datesLabel: 'Festival Dates:',
    datesValue: 'October 07, 08, 09, 2026 (3 Days)',
    openBadge: 'Open to All',
    plateCaption: 'Plate I — English Corner Scholarly Pavilion, Asgiri Maha Vihara Maha Pirivena, Kandy, Sri Lanka (Sanjanani 2026).',
    dispatchKicker: 'Monastic Curatorial Dispatch',
    dispatchTitle: 'Fostering Global Expression from the Foothills of Kandy',
    dispatchP1: 'Founded during the medieval kingdom of Kandy, Asgiri Maha Vihara Maha Pirivena has preserved sacred Buddhist scriptures for centuries. At Sanjanani 2026, the English Corner serves as a bridge between monastic scholarship and the living stream of modern English usage.',
    dispatchP2: 'Step inside to master English grammar, explore world literature from Elizabethan drama to modern post-colonial epics, immerse yourself in our William Shakespeare review, and participate in workshops that celebrate every tone of expression.',
    grammarLabCardTitle: 'Grammar Lab',
    grammarLabCardDesc: 'Syntax, tenses, and punctuation doctor.',
    shakespeareCardTitle: 'Shakespeare Review',
    shakespeareCardDesc: 'Hamlet, Macbeth, Sonnets & Globe folio.',
    exploreActivitiesBtn: 'Interactive Writing & Play Activities',

    timelineKicker: 'Chronological Odyssey',
    timelineTitle: 'Literary Eras Timeline',
    timelineSubtitle: 'Explore the evolution of English literature from Anglo-Saxon epic verse to contemporary Sri Lankan letters. Click any era to uncover iconic authors, signature traits, and famous excerpts.',

    triviaKicker: 'The Daily Scholarly Challenge',
    triviaTitle: 'Literary Trivia & Mind Gymnasium',
    triviaSubtitle: 'Test your erudition across classical English literature, Shakespearean drama, poetic meters, and Island loanword etymologies.',
    questionsAnswered: 'Questions Answered:',
    accuracy: 'Lifetime Accuracy:',
    bestRound: 'Best Round:',
    newRoundBtn: 'New Round',
    askTutorBtn: 'Ask Scholar AI',

    tutorTitle: 'Sanjanani English Scholar AI',
    tutorSubtitle: 'English Corner · Asgiri Maha Vihara (Oct 07–09, 2026)',
    handsFreeMode: 'Hands-Free Speech Practice',
    listeningNow: 'Listening... Speak your question now',
    clickToSpeak: 'Speak your question (Web Speech)',
    inputPlaceholder: 'Ask grammar, translate poem/essay, or speak via mic...',
    translateTab: 'Translation Studio',
  },
  si: {
    navPavilion: 'මණ්ඩපය',
    navOrigins: 'මූලාරම්භය',
    navGrammar: 'ව්‍යාකරණ විද්‍යාගාරය',
    navTimeline: 'සාහිත්‍ය යුග කාලරේඛාව',
    navLiterature: 'ඉංග්‍රීසි සාහිත්‍යය',
    navShakespeare: 'ෂේක්ස්පියර් විවරණය',
    navTrivia: 'දෛනික ප්‍රශ්නාවලිය',
    navActivities: 'ක්‍රියාකාරකම්',
    navSchedule: 'උත්සව කාලසටහන',
    tutorBtn: 'ඉංග්‍රීසි AI ගුරුතුමා',
    passBtn: 'උත්සව සහතිකය',

    festivalKicker: 'සංජානනී ශිෂ්‍ය කලා මහෝත්සවය 2026 · අස්ගිරි මහා විහාරය · මහනුවර',
    heroTitle: 'ඉංග්‍රීසි සාහිත්‍ය මණ්ඩපය',
    heroSubtitle: 'ඓතිහාසික අස්ගිරි පිරිවෙන් ශාස්ත්‍රීය උරුමය සහ ඉංග්‍රීසි භාෂා සාහිත්‍යය එකමුතු වන සුවිශේෂී අධ්‍යාපනික කලාපය',
    venueLabel: 'ස්ථානය:',
    venueValue: 'ඓතිහාසික අස්ගිරි මහා විහාර මහ පිරිවෙන් පරිශ්‍රය, මහනුවර',
    datesLabel: 'දිනයන්:',
    datesValue: '2026 ඔක්තෝබර් 07, 08, 09 (තෙදින පුරා)',
    openBadge: 'සැමට විවෘතයි',
    plateCaption: 'ඡායාරූප I — සංජානනී 2026 ඉංග්‍රීසි සාහිත්‍ය මණ්ඩපය, අස්ගිරි මහා විහාර මහ පිරිවෙන, මහනුවර.',
    dispatchKicker: 'අස්ගිරි විහාර ශාස්ත්‍රීය පණිවිඩය',
    dispatchTitle: 'ඓතිහාසික සෙංකඩගල පුරවරයෙන් ගෝලීය ඉංග්‍රීසි සාහිත්‍යයට මාවතක්',
    dispatchP1: 'මධ්‍යතන මහනුවර රාජධානි සමයේ පිහිටුවන ලද ඓතිහාසික අස්ගිරි මහා විහාර මහ පිරිවෙන සියවස් ගණනාවක් පුරා උතුම් ත්‍රිපිටක ධර්මය සහ ශාස්ත්‍රීය දැනුම සුරැකීය. සංජානනී 2026 මහෝත්සවයේදී, ඉංග්‍රීසි අංශය අපගේ පාරම්පරික ඥානය ගෝලීය ඉංග්‍රීසි භාෂා ධාරාව සමඟ යා කරන පාලමක් බඳුය.',
    dispatchP2: 'ඉංග්‍රීසි ව්‍යාකරණ සරලව ප්‍රගුණ කිරීමට, එලිසබෙත් යුගයේ නාට්‍යවල සිට නූතන පශ්චාත් යටත්විජිත සාහිත්‍යය දක්වා ගවේෂණය කිරීමට සහ ශේක්ස්පියර් විවරණ රසවිඳීමට අප සමඟ එක්වන්න.',
    grammarLabCardTitle: 'ව්‍යාකරණ විද්‍යාගාරය',
    grammarLabCardDesc: 'කාල භේදය, වාක්‍ය රටා සහ ලකුණු කිරීම්.',
    shakespeareCardTitle: 'ෂේක්ස්පියර් විවරණය',
    shakespeareCardDesc: 'හැම්ලට්, මැක්බත්, සොනට් සහ ග්ලෝබ් නාට්‍ය.',
    exploreActivitiesBtn: 'ප්‍රායෝගික රචනා හා ක්‍රීඩා ක්‍රියාකාරකම්',

    timelineKicker: 'ඓතිහාසික ගමන් මඟ',
    timelineTitle: 'ඉංග්‍රීසි සාහිත්‍ය යුග කාලරේඛාව',
    timelineSubtitle: 'ඈත ඇංග්ලෝ සැක්සන් යුගයේ සිට නූතන ශ්‍රී ලාංකේය ඉංග්‍රීසි සාහිත්‍යය දක්වා සියවස් ගණනාවක පරිණාමය. එක් එක් යුගය ක්ලික් කර කතුවරුන් සහ විශේෂ ලක්ෂණ හදාරන්න.',

    triviaKicker: 'දෛනික බුද්ධි පරීක්ෂණය',
    triviaTitle: 'සාහිත්‍ය ප්‍රශ්නාවලිය හා දැනුම මිනුම',
    triviaSubtitle: 'ඉංග්‍රීසි සම්භාව්‍ය සාහිත්‍යය, ෂේක්ස්පියර් නාට්‍ය සහ ශ්‍රී ලාංකේය ඉංග්‍රීසි ණය වචන පිළිබඳ ඔබේ දැනුම මැන බලන්න.',
    questionsAnswered: 'පිළිතුරු දුන් ප්‍රශ්න:',
    accuracy: 'සමස්ත නිරවද්‍යතාව:',
    bestRound: 'ඉහළම ලකුණු:',
    newRoundBtn: 'නව වටයක්',
    askTutorBtn: 'AI ගුරුතුමාගෙන් විමසන්න',

    tutorTitle: 'සංජානනී ඉංග්‍රීසි විද්වත් AI',
    tutorSubtitle: 'ඉංග්‍රීසි අංශය · අස්ගිරි මහා විහාරය (2026 ඔක්තෝබර් 07–09)',
    handsFreeMode: 'කථන පුහුණුව (Hands-Free Speech)',
    listeningNow: 'සවන් දෙමින් පවතී... ඔබේ ප්‍රශ්නය කතා කරන්න',
    clickToSpeak: 'කථනයෙන් ප්‍රශ්න අසන්න (Web Speech)',
    inputPlaceholder: 'ව්‍යාකරණ, කවි/රචනා පරිවර්තන සිංහලෙන් හෝ ඉංග්‍රීසියෙන් විමසන්න...',
    translateTab: 'පරිවර්තන මැදිරිය',
  },
};
