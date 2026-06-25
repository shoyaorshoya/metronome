import styles from './Header.module.css'
import PeonyBloom from './PeonyBloom'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoRow}>
        <div className={styles.peonyIcon}>
          <PeonyBloom size={40} opacity={0.9} rotate={0} />
        </div>
        <h1 className={styles.title}>Eloquence</h1>
      </div>
      <p className={styles.subtitle}>Your practice companion for confident, compelling speech</p>
    </header>
  )
}
