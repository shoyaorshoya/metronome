import { useState } from 'react'
import Background from './components/Background'
import Header from './components/Header'
import Metronome from './components/Metronome'
import InsightPanel from './components/InsightPanel'
import TipsDrawer from './components/TipsDrawer'
import styles from './App.module.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('metronome')

  return (
    <div className={styles.app}>
      <Background />
      <Header />
      <nav className={styles.nav}>
        <button
          className={`${styles.tab} ${activeTab === 'metronome' ? styles.active : ''}`}
          onClick={() => setActiveTab('metronome')}
        >
          Metronome
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'insights' ? styles.active : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'tips' ? styles.active : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          Practice Guide
        </button>
      </nav>
      <main className={styles.main}>
        {activeTab === 'metronome' && <Metronome />}
        {activeTab === 'insights' && <InsightPanel />}
        {activeTab === 'tips' && <TipsDrawer />}
      </main>
    </div>
  )
}
