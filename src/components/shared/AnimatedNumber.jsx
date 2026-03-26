import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedNumber({ value, duration = 1.2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!isInView) return

    // Parse the value to extract prefix, number, suffix
    const match = String(value).match(/^([^0-9]*)([0-9,]+\.?[0-9]*)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }

    const [, prefix, numStr, suffix] = match
    const cleanNum = numStr.replace(/,/g, '')
    const target = parseFloat(cleanNum)
    const hasDecimals = cleanNum.includes('.')
    const decimalPlaces = hasDecimals ? cleanNum.split('.')[1].length : 0
    const hasCommas = numStr.includes(',')

    if (isNaN(target)) {
      setDisplay(value)
      return
    }

    const startTime = performance.now()
    let rafId

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased

      let formatted = hasDecimals ? current.toFixed(decimalPlaces) : Math.round(current).toString()
      if (hasCommas) {
        const parts = formatted.split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        formatted = parts.join('.')
      }

      setDisplay(`${prefix}${formatted}${suffix}`)

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, value, duration])

  return <span ref={ref}>{display}</span>
}
