import { useState } from 'react'
import styles from './InsightPanel.module.css'
import PeonyBloom from './PeonyBloom'

const INSIGHTS = [
  {
    category: 'Pace & Rhythm',
    icon: '♩',
    color: '#e8749a',
    items: [
      {
        title: 'The Golden Rate',
        body: 'Research shows the ideal conversational speaking rate is 130–150 words per minute. Below 100 WPM sounds labored; above 180 WPM loses retention. At 72 BPM with ~2 syllables per beat, you hit 144 WPM — the sweet spot.',
        tip: 'Record yourself for 60 seconds, count words, divide by 1.',
      },
      {
        title: 'Purposeful Pauses',
        body: 'A 2–3 second pause after a key point increases audience retention by up to 40%. Silence isn\'t dead air — it\'s space for ideas to settle. Great speakers use pauses as punctuation.',
        tip: 'Mark pause points in your script with [P2] or [P3] for 2 or 3 seconds.',
      },
      {
        title: 'Vary Your Tempo',
        body: 'Monotone pace hypnotizes audiences into inattention. Speed up during exciting narrative, slow down for significance. A 20% variation in pace keeps listeners subconsciously engaged.',
        tip: 'Practice the same paragraph at 60 BPM, 80 BPM, and 100 BPM. Notice how each feels.',
      },
    ],
  },
  {
    category: 'Voice & Resonance',
    icon: '◈',
    color: '#a78bfa',
    items: [
      {
        title: 'Diaphragmatic Breath',
        body: 'Chest breathing produces a thinner, higher-pitched voice under stress. Diaphragmatic breathing lowers your center of gravity, reduces anxiety hormones, and produces fuller, more resonant sound.',
        tip: 'Place one hand on your chest, one on your belly. Breathe so only the belly hand moves.',
      },
      {
        title: 'The Resonance Trick',
        body: 'Hum at your natural pitch until you feel vibration in your chest and face. This warm-up opens your resonance chambers and makes your voice sound 30% richer without effort.',
        tip: 'Hum for 30 seconds before any important speech or presentation.',
      },
      {
        title: 'Lower Is More Credible',
        body: 'Studies show lower-pitched voices are consistently rated as more authoritative, trustworthy, and competent. Nervousness raises pitch. Consciously lowering your starting pitch counters stress.',
        tip: 'Start every sentence 10% lower than you think you should. It will sound normal to listeners.',
      },
    ],
  },
  {
    category: 'Presence & Confidence',
    icon: '✦',
    color: '#67e8f9',
    items: [
      {
        title: 'Power Posture',
        body: 'Amy Cuddy\'s research found 2 minutes of expansive posture before speaking reduces cortisol by 25% and raises testosterone by 20%. Your body language changes your chemistry, not just how others see you.',
        tip: 'Before your next presentation: 2 min standing with feet wide, hands on hips or raised.',
      },
      {
        title: 'The 3-Second Eye Contact Rule',
        body: 'Hold eye contact for 3–5 seconds per person before moving on. Less feels shifty, more becomes intense. Distribute eye contact evenly across all sections of your audience.',
        tip: 'Practice with a grid of sticky notes on the wall, making a thought at each one.',
      },
      {
        title: 'Embrace the Filler Purge',
        body: '"Um", "uh", "like", and "you know" erode perceived intelligence. They are habits, not needs. Replace fillers with silence — a breath, a pause. Listeners interpret pauses as confidence.',
        tip: 'Record yourself. Count fillers. Set a target to halve them each week.',
      },
    ],
  },
  {
    category: 'Structure & Story',
    icon: '❋',
    color: '#fbbf24',
    items: [
      {
        title: 'The Rule of Three',
        body: 'The human brain processes information best in triples: "Life, Liberty, and the Pursuit of Happiness." Structure arguments, examples, and takeaways in groups of three for maximum memorability.',
        tip: 'Review your next presentation: does each section have 3 core points?',
      },
      {
        title: 'Open with a Hook',
        body: 'Audiences decide within 30 seconds whether to engage. Start with a provocative question, a surprising statistic, a vivid image, or a short story — never with "thank you for having me."',
        tip: 'Write 5 possible opening lines for your next talk. Choose the boldest one.',
      },
      {
        title: 'Stories Create Memory',
        body: 'Facts presented in narrative form are 22× more memorable than bullet points alone. Your brain stores stories as experiences, not data. Every key point deserves a small story.',
        tip: 'For each main point, ask: "What personal experience illustrates this?"',
      },
    ],
  },
]

export default function InsightPanel() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [expandedItem, setExpandedItem] = useState(null)

  const cat = INSIGHTS[activeCategory]

  return (
    <div className={styles.container}>
      <div className={styles.heroCard}>
        <div className={styles.heroPeony}>
          <PeonyBloom size={220} opacity={0.2} rotate={-15} />
        </div>
        <h2 className={styles.heroTitle}>Skill Insights</h2>
        <p className={styles.heroSubtitle}>
          Evidence-based techniques from rhetoric, vocal coaching, and communication science.
          Each insight is actionable — use the practice tip immediately.
        </p>
      </div>

      {/* Category tabs */}
      <div className={styles.categories}>
        {INSIGHTS.map((ins, idx) => (
          <button
            key={ins.category}
            className={`${styles.catBtn} ${activeCategory === idx ? styles.catActive : ''}`}
            style={activeCategory === idx ? { '--cat-color': ins.color } : {}}
            onClick={() => { setActiveCategory(idx); setExpandedItem(null) }}
          >
            <span className={styles.catIcon}>{ins.icon}</span>
            <span>{ins.category}</span>
          </button>
        ))}
      </div>

      {/* Insight cards */}
      <div className={styles.insightList}>
        {cat.items.map((item, idx) => (
          <div
            key={item.title}
            className={`${styles.insightCard} ${expandedItem === idx ? styles.expanded : ''}`}
            onClick={() => setExpandedItem(expandedItem === idx ? null : idx)}
          >
            <div className={styles.insightHeader}>
              <h3 className={styles.insightTitle}>{item.title}</h3>
              <span className={styles.chevron}>{expandedItem === idx ? '−' : '+'}</span>
            </div>
            {expandedItem === idx && (
              <div className={styles.insightBody}>
                <p className={styles.insightText}>{item.body}</p>
                <div className={styles.tipBox}>
                  <span className={styles.tipLabel}>Practice now</span>
                  <p className={styles.tipText}>{item.tip}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Daily focus */}
      <DailyFocus />
    </div>
  )
}

function DailyFocus() {
  const day = new Date().getDay()
  const focuses = [
    { day: 'Sunday', focus: 'Rest & reflect on your week of practice', action: 'Journal: What landed well? What felt awkward?' },
    { day: 'Monday', focus: 'Pace mastery', action: 'Record 3 min at exactly 72 BPM. Count your WPM.' },
    { day: 'Tuesday', focus: 'Pause practice', action: 'Give a 2-min talk and insert 5 deliberate 3-sec pauses.' },
    { day: 'Wednesday', focus: 'Filler words', action: 'Tell a 1-min story with zero "um" or "uh". Start over each time you slip.' },
    { day: 'Thursday', focus: 'Vocal variety', action: 'Read a passage at 3 different tempos. Feel the emotional shift.' },
    { day: 'Friday', focus: 'Eye contact', action: 'Practice with a video call — hold gaze on camera, not the screen.' },
    { day: 'Saturday', focus: 'Full run', action: 'Deliver your current material from start to finish, recording audio.' },
  ]
  const f = focuses[day]

  return (
    <div className={styles.dailyCard}>
      <div className={styles.dailyBadge}>Today · {f.day}</div>
      <h3 className={styles.dailyFocus}>{f.focus}</h3>
      <p className={styles.dailyAction}>{f.action}</p>
    </div>
  )
}
