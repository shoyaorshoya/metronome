import styles from './Background.module.css'
import PeonyBloom from './PeonyBloom'

export default function Background() {
  return (
    <div className={styles.bg}>
      {/* Ambient gradient orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Abstract peony decorations */}
      <div className={styles.peonyTopRight}>
        <PeonyBloom size={420} opacity={0.18} rotate={-30} />
      </div>
      <div className={styles.peonyBottomLeft}>
        <PeonyBloom size={320} opacity={0.12} rotate={60} />
      </div>
      <div className={styles.peonyMidRight}>
        <PeonyBloom size={200} opacity={0.09} rotate={15} />
      </div>
    </div>
  )
}
