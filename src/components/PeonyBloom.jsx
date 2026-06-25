export default function PeonyBloom({ size = 300, opacity = 0.15, rotate = 0 }) {
  const c = size / 2
  const r = size * 0.38

  // Generate abstract peony petals — layered ellipses rotated around center
  const petalCounts = [8, 6, 5, 4]
  const petalLayers = petalCounts.map((count, layerIdx) => {
    const scale = 1 - layerIdx * 0.18
    const rx = r * scale * 0.55
    const ry = r * scale
    const dist = r * scale * 0.42
    const petals = Array.from({ length: count }, (_, i) => {
      const angle = (360 / count) * i + layerIdx * (360 / count / 2)
      return { angle, rx, ry, dist }
    })
    return petals
  })

  const colors = ['#f4a7b9', '#e8749a', '#c4476e', '#fde8ef']

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity}>
        {petalLayers.map((layer, li) =>
          layer.map((p, pi) => {
            const rad = (p.angle * Math.PI) / 180
            const px = c + Math.cos(rad) * p.dist
            const py = c + Math.sin(rad) * p.dist
            return (
              <ellipse
                key={`${li}-${pi}`}
                cx={px}
                cy={py}
                rx={p.rx}
                ry={p.ry}
                fill={colors[li]}
                transform={`rotate(${p.angle + 90}, ${px}, ${py})`}
                style={{ mixBlendMode: 'screen' }}
              />
            )
          })
        )}
        {/* Center bloom */}
        <circle cx={c} cy={c} r={r * 0.18} fill="#fde8ef" style={{ mixBlendMode: 'screen' }} />
        <circle cx={c} cy={c} r={r * 0.10} fill="white" opacity={0.6} />
      </g>
    </svg>
  )
}
