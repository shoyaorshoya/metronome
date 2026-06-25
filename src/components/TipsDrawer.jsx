import { useState } from 'react'
import styles from './TipsDrawer.module.css'
import PeonyBloom from './PeonyBloom'

const EXERCISES = [
  {
    id: 'warm-up',
    title: '5-Minute Vocal Warm-Up',
    duration: '5 min',
    level: 'Daily',
    color: '#a78bfa',
    steps: [
      { time: '0:00', label: 'Lip trills', desc: 'Exhale through relaxed lips making a motorboat sound. 3 × 10 sec.' },
      { time: '1:00', label: 'Humming', desc: 'Hum your comfortable pitch, feel chest vibrate. Scale up and down slowly.' },
      { time: '2:00', label: 'Jaw release', desc: 'Open wide, hold 5 sec, release. Repeat 5×. Loosens tension that tightens your voice.' },
      { time: '3:00', label: 'Tongue twisters', desc: '"Red lorry, yellow lorry" × 5 slow, then × 5 fast. Articulation training.' },
      { time: '4:00', label: 'Resonance breath', desc: 'Breathe in 4 counts, hold 4, exhale on "haaaaah" for 8 counts. Feel the resonance.' },
    ],
  },
  {
    id: 'pace-drill',
    title: 'Metronome Pace Drill',
    duration: '10 min',
    level: 'Intermediate',
    color: '#e8749a',
    steps: [
      { time: 'Set metronome to 60 BPM', label: 'Slow read', desc: 'Read any paragraph aloud, one stressed syllable per beat. Feel each word.' },
      { time: 'Set metronome to 80 BPM', label: 'Natural pace', desc: 'Read the same paragraph. Notice the difference in tone and energy.' },
      { time: 'Set metronome to 100 BPM', label: 'Fast read', desc: 'Same paragraph at speed. Note what clarity you sacrifice.' },
      { time: 'No metronome', label: 'Free read', desc: 'Read it with natural variation — slow on key phrases, faster on connectors.' },
      { time: 'Reflect', label: 'Self-review', desc: 'Which tempo felt most authoritative? Most engaging? Practice the contrast.' },
    ],
  },
  {
    id: 'pause-mastery',
    title: 'The Pause & Land Exercise',
    duration: '8 min',
    level: 'Beginner',
    color: '#67e8f9',
    steps: [
      { time: 'Prep', label: 'Mark your script', desc: 'Choose a 1-min passage. Mark 5 places with [PAUSE]. These must be after your most important word.' },
      { time: 'Round 1', label: 'Read normally', desc: 'Read without pauses. Record it. Notice how ideas blur together.' },
      { time: 'Round 2', label: 'With pauses', desc: 'Read it with deliberate 3-second pauses at your marks. Record this too.' },
      { time: 'Compare', label: 'Listen back', desc: 'Which version felt more commanding? Which ideas landed more clearly?' },
      { time: 'Mastery', label: 'Add eye contact', desc: 'In round 2, hold eye contact during each pause. Scan the room during the silence.' },
    ],
  },
  {
    id: 'storytelling',
    title: 'The 2-Minute Story Structure',
    duration: '15 min',
    level: 'Advanced',
    color: '#fbbf24',
    steps: [
      { time: '0–0:15', label: 'Hook (15 sec)', desc: 'Open with one sentence that creates tension or surprise. "The day I nearly ruined everything..."' },
      { time: '0:15–1:00', label: 'Context (45 sec)', desc: 'Who? Where? When? Minimum detail needed for the listener to care. Don\'t over-explain.' },
      { time: '1:00–1:30', label: 'Turning point (30 sec)', desc: 'The moment everything changed. Slow down here — this is the heart of the story.' },
      { time: '1:30–1:50', label: 'Resolution (20 sec)', desc: 'What happened as a result. Keep it clean and brief.' },
      { time: '1:50–2:00', label: 'The lesson (10 sec)', desc: 'One sentence that connects the story to your audience\'s life or your core point.' },
    ],
  },
  {
    id: 'anxiety',
    title: 'Performance Anxiety Reset',
    duration: '3 min',
    level: 'Essential',
    color: '#34d399',
    steps: [
      { time: '0–1:00', label: 'Physiological sigh', desc: 'Double inhale through nose (short + long), then one long exhale. Repeat 3×. Activates calm nervous system in seconds.' },
      { time: '1:00–1:30', label: 'Reframe', desc: 'Name the feeling: "I am excited" not "I am nervous." Physiologically identical — but one is fuel, one is fear.' },
      { time: '1:30–2:30', label: 'Power pose', desc: 'Stand tall, feet wide, arms open or on hips. Hold for 60 seconds. Do this somewhere private before you speak.' },
      { time: '2:30–3:00', label: 'First line', desc: 'Say your opening line out loud three times, slowly and confidently. Muscle memory removes the blank-mind moment.' },
    ],
  },
]

const PRINCIPLES = [
  {
    title: 'Speak to move, not to inform',
    body: 'Every word you say should either advance an argument, create an emotion, or paint a picture. If a sentence does none of these, cut it. Your goal is not to transmit information — it is to change how someone thinks, feels, or acts.',
  },
  {
    title: 'Authenticity outperforms technique',
    body: 'A technically perfect speaker who seems rehearsed will always lose to an imperfect speaker who feels real. Technique serves authenticity — it removes friction between your genuine ideas and how they land. Never let the polish kill the person.',
  },
  {
    title: 'Your body is your instrument',
    body: 'Professional singers warm up their voice. Professional speakers warm up their whole instrument — posture, breath, face, voice. A 5-minute warm-up before any important speech is not vanity; it is preparation.',
  },
  {
    title: 'Discomfort is the signal, not the problem',
    body: 'Nerves before speaking are your body allocating resources for performance. The goal is not to eliminate nerves — it is to direct that energy. Great speakers learn to use the activation, not suppress it.',
  },
]

export default function TipsDrawer() {
  const [activeExercise, setActiveExercise] = useState(null)

  return (
    <div className={styles.container}>
      <div className={styles.heroCard}>
        <div className={styles.heroPeony}>
          <PeonyBloom size={200} opacity={0.18} rotate={30} />
        </div>
        <h2 className={styles.heroTitle}>Practice Guide</h2>
        <p className={styles.heroSubtitle}>
          Structured exercises to build real skill, not just confidence.
          Pick one exercise per session and commit fully to it.
        </p>
      </div>

      {/* Principles */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Core Principles</h3>
        <div className={styles.principleGrid}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} className={styles.principleCard}>
              <h4 className={styles.principleTitle}>{p.title}</h4>
              <p className={styles.principleBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Exercises</h3>
        <div className={styles.exerciseList}>
          {EXERCISES.map((ex) => (
            <div key={ex.id} className={styles.exerciseWrap}>
              <button
                className={`${styles.exerciseBtn} ${activeExercise === ex.id ? styles.exerciseOpen : ''}`}
                onClick={() => setActiveExercise(activeExercise === ex.id ? null : ex.id)}
                style={{ '--ex-color': ex.color }}
              >
                <div className={styles.exMeta}>
                  <span className={styles.exLevel} style={{ color: ex.color }}>{ex.level}</span>
                  <span className={styles.exDuration}>{ex.duration}</span>
                </div>
                <div className={styles.exTitleRow}>
                  <span className={styles.exTitle}>{ex.title}</span>
                  <span className={styles.exChevron}>{activeExercise === ex.id ? '−' : '+'}</span>
                </div>
              </button>

              {activeExercise === ex.id && (
                <div className={styles.steps}>
                  {ex.steps.map((s, i) => (
                    <div key={i} className={styles.step}>
                      <div className={styles.stepDot} style={{ background: ex.color }} />
                      <div className={styles.stepContent}>
                        <div className={styles.stepHeader}>
                          <span className={styles.stepTime}>{s.time}</span>
                          <span className={styles.stepLabel}>{s.label}</span>
                        </div>
                        <p className={styles.stepDesc}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
