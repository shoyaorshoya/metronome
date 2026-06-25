import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Metronome.module.css'
import PeonyBloom from './PeonyBloom'

const PRESETS = [
  { label: 'Slow & Deliberate', bpm: 52, desc: 'One word per beat — gravitas & authority' },
  { label: 'Conversational', bpm: 72, desc: 'Natural pacing, relaxed and clear' },
  { label: 'Engaging', bpm: 88, desc: 'Energetic storytelling rhythm' },
  { label: 'Rapid Fire', bpm: 110, desc: 'High energy — use sparingly' },
]

const ACCENT_MAP = {
  1: [true],
  2: [true, false],
  3: [true, false, false],
  4: [true, false, false, false],
}

export default function Metronome() {
  const [bpm, setBpm] = useState(72)
  const [isPlaying, setIsPlaying] = useState(false)
  const [beat, setBeat] = useState(-1)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)
  const [volume, setVolume] = useState(0.7)
  const [swing, setSwing] = useState(0)

  const audioCtxRef = useRef(null)
  const nextBeatTimeRef = useRef(0)
  const currentBeatRef = useRef(0)
  const schedulerTimerRef = useRef(null)
  const bpmRef = useRef(bpm)
  const volumeRef = useRef(volume)
  const beatsRef = useRef(beatsPerMeasure)
  const swingRef = useRef(swing)

  useEffect(() => { bpmRef.current = bpm }, [bpm])
  useEffect(() => { volumeRef.current = volume }, [volume])
  useEffect(() => { beatsRef.current = beatsPerMeasure }, [beatsPerMeasure])
  useEffect(() => { swingRef.current = swing }, [swing])

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }, [])

  const scheduleClick = useCallback((time, isAccent) => {
    const ctx = getAudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.frequency.value = isAccent ? 1200 : 800
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(volumeRef.current * (isAccent ? 1 : 0.65), time + 0.002)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + (isAccent ? 0.08 : 0.055))

    osc.start(time)
    osc.stop(time + 0.1)
  }, [getAudioCtx])

  const scheduler = useCallback(() => {
    const ctx = getAudioCtx()
    const secondsPerBeat = 60 / bpmRef.current
    const lookahead = 0.1

    while (nextBeatTimeRef.current < ctx.currentTime + lookahead) {
      const beatIdx = currentBeatRef.current % beatsRef.current
      const isAccent = beatIdx === 0
      const swingOffset = (currentBeatRef.current % 2 === 1) ? (swingRef.current / 100) * secondsPerBeat * 0.33 : 0

      scheduleClick(nextBeatTimeRef.current + swingOffset, isAccent)

      const capturedBeatIdx = beatIdx
      const timeUntilBeat = (nextBeatTimeRef.current - ctx.currentTime) * 1000
      setTimeout(() => setBeat(capturedBeatIdx), Math.max(0, timeUntilBeat))

      nextBeatTimeRef.current += secondsPerBeat
      currentBeatRef.current += 1
    }

    schedulerTimerRef.current = setTimeout(scheduler, 25)
  }, [getAudioCtx, scheduleClick])

  const start = useCallback(() => {
    const ctx = getAudioCtx()
    if (ctx.state === 'suspended') ctx.resume()
    currentBeatRef.current = 0
    nextBeatTimeRef.current = ctx.currentTime + 0.05
    scheduler()
    setIsPlaying(true)
  }, [getAudioCtx, scheduler])

  const stop = useCallback(() => {
    clearTimeout(schedulerTimerRef.current)
    setIsPlaying(false)
    setBeat(-1)
  }, [])

  useEffect(() => {
    return () => clearTimeout(schedulerTimerRef.current)
  }, [])

  const handleBpmChange = (e) => setBpm(Number(e.target.value))

  const handleTap = useCallback(() => {
    // simple tap tempo
    const now = Date.now()
    if (!handleTap._taps) handleTap._taps = []
    handleTap._taps.push(now)
    if (handleTap._taps.length > 4) handleTap._taps.shift()
    if (handleTap._taps.length >= 2) {
      const diffs = handleTap._taps.slice(1).map((t, i) => t - handleTap._taps[i])
      const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length
      setBpm(Math.round(Math.min(200, Math.max(20, 60000 / avg))))
    }
  }, [])

  const pendulumAngle = isPlaying && beat >= 0
    ? (beat % 2 === 0 ? -28 : 28)
    : 0

  return (
    <div className={styles.container}>
      {/* Presets */}
      <div className={styles.presets}>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className={`${styles.preset} ${bpm === p.bpm ? styles.presetActive : ''}`}
            onClick={() => setBpm(p.bpm)}
          >
            <span className={styles.presetLabel}>{p.label}</span>
            <span className={styles.presetBpm}>{p.bpm} bpm</span>
            <span className={styles.presetDesc}>{p.desc}</span>
          </button>
        ))}
      </div>

      {/* Main glass card */}
      <div className={styles.card}>
        {/* Peony decoration inside card */}
        <div className={styles.cardPeony}>
          <PeonyBloom size={180} opacity={0.12} rotate={20} />
        </div>

        {/* BPM display */}
        <div className={styles.bpmDisplay}>
          <span className={styles.bpmNumber}>{bpm}</span>
          <span className={styles.bpmLabel}>BPM</span>
        </div>

        {/* Pendulum visualizer */}
        <div className={styles.pendulumWrap}>
          <div
            className={styles.pendulum}
            style={{ transform: `rotate(${pendulumAngle}deg)` }}
          >
            <div className={styles.pendulumLine} />
            <div className={`${styles.pendulumBob} ${isPlaying && beat === 0 ? styles.accent : ''}`} />
          </div>
        </div>

        {/* Beat dots */}
        <div className={styles.beatDots}>
          {Array.from({ length: beatsPerMeasure }, (_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${beat === i ? styles.dotActive : ''} ${i === 0 && beat === 0 ? styles.dotAccent : ''}`}
            />
          ))}
        </div>

        {/* BPM slider */}
        <div className={styles.sliderWrap}>
          <span className={styles.sliderMin}>20</span>
          <input
            type="range"
            min="20"
            max="200"
            value={bpm}
            onChange={handleBpmChange}
            className={styles.slider}
          />
          <span className={styles.sliderMax}>200</span>
        </div>

        {/* Controls row */}
        <div className={styles.controls}>
          <button className={styles.tapBtn} onClick={handleTap}>
            Tap Tempo
          </button>
          <button
            className={`${styles.playBtn} ${isPlaying ? styles.stopBtn : ''}`}
            onClick={isPlaying ? stop : start}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="4" y="3" width="4" height="14" rx="1"/>
                <rect x="12" y="3" width="4" height="14" rx="1"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 3.5l11 6.5-11 6.5V3.5z"/>
              </svg>
            )}
            {isPlaying ? 'Pause' : 'Start'}
          </button>
          <button className={styles.tapBtn} onClick={() => {}}>
            Reset
          </button>
        </div>

        {/* Secondary controls */}
        <div className={styles.secondaryControls}>
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>Time Signature</label>
            <div className={styles.segmented}>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  className={`${styles.seg} ${beatsPerMeasure === n ? styles.segActive : ''}`}
                  onClick={() => setBeatsPerMeasure(n)}
                >
                  {n}/4
                </button>
              ))}
            </div>
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={`${styles.slider} ${styles.smallSlider}`}
            />
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>Swing</label>
            <input
              type="range"
              min="0"
              max="100"
              value={swing}
              onChange={(e) => setSwing(Number(e.target.value))}
              className={`${styles.slider} ${styles.smallSlider}`}
            />
          </div>
        </div>
      </div>

      {/* Speaking guide */}
      <div className={styles.guide}>
        <h3 className={styles.guideTitle}>What this tempo means</h3>
        <p className={styles.guideText}>{getTempoGuide(bpm)}</p>
      </div>
    </div>
  )
}

function getTempoGuide(bpm) {
  if (bpm < 50) return 'Extremely slow — each beat marks a significant pause. Use for dramatic effect, eulogy-style gravity, or deliberate emphasis on a single word.'
  if (bpm < 65) return 'Presidential pace. Slow enough to convey deep authority and measured confidence. Each beat can mark one key phrase.'
  if (bpm < 80) return 'Conversational. This is the sweet spot for most speeches — calm, clear, and easy for audiences to follow. Aim for one thought per beat.'
  if (bpm < 95) return 'Engaged storytelling pace. Natural energy, good for narratives and building momentum. Keep breaths deliberate.'
  if (bpm < 115) return 'Lively and dynamic. Great for energetic openers or high-energy moments. Watch your articulation — consonants blur fast.'
  return 'Rapid delivery. Use only for practiced lists or to demonstrate urgency. Sustained use exhausts your audience. Pause deliberately to let ideas land.'
}
