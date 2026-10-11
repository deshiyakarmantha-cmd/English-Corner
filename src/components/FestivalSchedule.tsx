import React, { useState } from 'react';
import { FESTIVAL_SCHEDULE, FESTIVAL_METADATA } from '../data/festivalData';
import { Calendar, Clock, MapPin, MessageSquare, Send, Check } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  name: string;
  cityOrSchool: string;
  quoteOrPledge: string;
  date: string;
}

const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Ven. Medhankara Thero',
    cityOrSchool: 'Vidyodaya Pirivena, Colombo',
    quoteOrPledge: 'May the light of learning illuminate all hearts across cultural and linguistic shores.',
    date: '18 Oct 2026',
  },
  {
    id: 'gb-2',
    name: 'Prof. Shantha Wijekoon',
    cityOrSchool: 'University of Peradeniya',
    quoteOrPledge: 'Splendid initiative at Asgiri Pirivena. Shakespeare and monastic scholarship are natural kindred spirits.',
    date: '18 Oct 2026',
  },
  {
    id: 'gb-3',
    name: 'Nethmi Jayasuriya',
    cityOrSchool: 'Hillwood College, Kandy',
    quoteOrPledge: '“Brevity is the soul of wit.” Inspired to write my first Shakespearean sonnet today!',
    date: '19 Oct 2026',
  },
];

export const FestivalSchedule: React.FC = () => {
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(() => {
    const saved = localStorage.getItem('sanjanani_guestbook');
    return saved ? JSON.parse(saved) : INITIAL_GUESTBOOK;
  });

  const [guestName, setGuestName] = useState('');
  const [guestAffiliation, setGuestAffiliation] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name: guestName.trim(),
      cityOrSchool: guestAffiliation.trim() || 'Visitor from Kandy',
      quoteOrPledge: guestMessage.trim(),
      date: 'Today',
    };

    const updated = [newEntry, ...guestbook];
    setGuestbook(updated);
    localStorage.setItem('sanjanani_guestbook', JSON.stringify(updated));

    setGuestName('');
    setGuestAffiliation('');
    setGuestMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 lg:py-24 border-b border-stone-200 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 mb-2">
            <Calendar className="w-4 h-4 text-amber-800" />
            <span>Festival Program & Venue Dossier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Sanjanani Festival Calendar · Kandy 2026
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Three days of intellectual discourse, Shakespearean drama, spelling crucibles, and bilingual poetic recitations nestled within the serene hill-slopes of Asgiri Maha Vihara.
          </p>
        </div>

        {/* Schedule Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          
          {/* Left 8 Cols: The Chronological Sessions */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-4 flex flex-wrap items-baseline gap-2">
              <span>Festival Program & English Corner Docket</span>
              <span className="text-xs font-mono font-medium text-amber-900">
                (October 07, 08, 09, 2026 · ඔක්තෝබර් 07, 08, 09 තෙදින පුරා)
              </span>
            </h3>

            {FESTIVAL_SCHEDULE.map((event, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs hover:border-amber-900/30 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-900 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-800" />
                    <span>{event.time}</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-stone-900">
                    {event.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="text-[11px] text-stone-500 font-medium">
                    Led by: {event.speakerOrLead}
                  </div>
                </div>

                <div className="shrink-0 self-start sm:self-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-[11px] text-stone-700 font-medium">
                    <MapPin className="w-3 h-3 text-amber-800" />
                    <span>{event.location}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right 4 Cols: Asgiri Heritage Card & Venue Notes */}
          <div className="lg:col-span-4 bg-[#F8F5EE] border border-amber-950/15 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2">
                <MapPin className="w-3.5 h-3.5 text-amber-800" />
                <span>Historic Venue Sanctuary</span>
              </div>
              <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">
                Asgiri Maha Vihara Maha Pirivena
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Founded in the 14th century during the Kurunegala and Gampola eras, the Asgiriya Chapter represents one of the two premier monastic custodians of the Sacred Relic of the Tooth in Kandy.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200/80 text-xs space-y-2">
              <div className="font-semibold text-stone-900">Official Festival Stalls:</div>
              <p className="text-stone-600 font-serif leading-relaxed">
                {FESTIVAL_METADATA.exhibitionStallsSinhala}
              </p>
              <div className="pt-2 border-t border-stone-100 font-semibold text-stone-900">
                Official Festival Contact:
              </div>
              <p className="text-stone-600">
                • <strong>Telephone:</strong> {FESTIVAL_METADATA.contact.tel}
              </p>
              <p className="text-stone-600">
                • <strong>Mobile:</strong> {FESTIVAL_METADATA.contact.mobile}
              </p>
              <p className="text-stone-600">
                • <strong>Email:</strong> {FESTIVAL_METADATA.contact.email}
              </p>
              <p className="text-stone-600">
                • <strong>Web:</strong> {FESTIVAL_METADATA.contact.web}
              </p>
              <p className="text-stone-600 pt-1 text-[11px]">
                • <strong>Media Sponsor:</strong> {FESTIVAL_METADATA.contact.mediaUnit}
              </p>
            </div>

            <div className="p-4 bg-amber-950 text-white rounded-xl text-xs space-y-2">
              <span className="font-bold block text-amber-200 font-serif text-sm">
                {FESTIVAL_METADATA.invitationSinhala}
              </span>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                A respectful invitation to all monks, students, scholars, and visitors to take part in this monumental 3-day festival of arts, culture, and English literature.
              </p>
            </div>
          </div>

        </div>

        {/* VISITOR GUESTBOOK & PLEDGE WALL */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-amber-800" />
                <span>Festival Guestbook</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                Sign the English Corner Chronicle
              </h3>
              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                Leave your reflections, favorite quote from Shakespeare, or a message of goodwill for the scholars of Asgiri Pirivena.
              </p>

              <form onSubmit={handleSubmitGuestbook} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Ruwanthi Wickramasinghe"
                    required
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Institution / City
                  </label>
                  <input
                    type="text"
                    value={guestAffiliation}
                    onChange={(e) => setGuestAffiliation(e.target.value)}
                    placeholder="e.g. University of Peradeniya / Kandy"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Message or Literary Quote *
                  </label>
                  <textarea
                    rows={3}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Share a thought, favorite Shakespeare quote, or festival wish..."
                    required
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-900"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-950 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inscribe in Chronicle</span>
                  </button>

                  {submitted && (
                    <span className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Inscribed!</span>
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* List of Entries */}
            <div className="lg:col-span-7">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-4">
                Recent Signatures ({guestbook.length})
              </h4>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
                {guestbook.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 bg-[#FAF7F2] border border-amber-950/10 rounded-xl"
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-serif font-bold text-amber-950 text-sm">
                        {entry.name}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        {entry.date}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 mb-2">
                      {entry.cityOrSchool}
                    </div>
                    <p className="text-xs font-serif italic text-stone-800 leading-relaxed">
                      &ldquo;{entry.quoteOrPledge}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
