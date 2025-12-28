'use client'

import { useEffect, useState } from 'react'

/**
 * 流星动画组件
 * @param {Object} props - 组件属性
 * @param {number} props.number - 流星数量，默认 20
 * @param {number} props.minDelay - 最小延迟时间（秒），默认 0.2
 * @param {number} props.maxDelay - 最大延迟时间（秒），默认 1.2
 * @param {number} props.minDuration - 最小持续时间（秒），默认 2
 * @param {number} props.maxDuration - 最大持续时间（秒），默认 10
 * @param {number} props.angle - 流星角度，默认 215
 * @param {string} props.className - 自定义类名
 * @returns {JSX.Element}
 */
export default function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className = ''
}) {
  const [meteors, setMeteors] = useState([])

  useEffect(() => {
    const meteorArray = Array.from({ length: number }, (_, i) => {
      // 根据角度调整起始位置，确保流星能从屏幕边缘外开始
      const leftPosition = Math.random() * 140 - 20 // 从-20%到120%
      const topPosition = Math.random() * 40 - 20 // 从-20px到20px的随机高度

      return {
        id: i,
        delay: Math.random() * (maxDelay - minDelay) + minDelay,
        duration: Math.random() * (maxDuration - minDuration) + minDuration,
        left: `${leftPosition}%`,
        top: `${topPosition}px`,
        animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
        animationDuration: `${Math.random() * (maxDuration - minDuration) + minDuration}s`
      }
    })
    setMeteors(meteorArray)
  }, [number, minDelay, maxDelay, minDuration, maxDuration])

  return (
    <>
      <style>
        {`
        @keyframes meteor-fall {
          0% {
            transform: rotate(${angle}deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(${angle}deg) translateX(-800px);
            opacity: 0;
          }
        }
        .meteor {
          animation: meteor-fall linear infinite;
        }
        .meteor::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, currentColor, transparent);
        }
      `}
      </style>
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {meteors.map(meteor => (
          <span
            key={meteor.id}
            className='meteor absolute h-0.5 w-0.5 rounded-full bg-slate-600 dark:bg-slate-400 shadow-[0_0_0_1px_#00000010] dark:shadow-[0_0_0_1px_#ffffff10]'
            style={{
              top: meteor.top,
              left: meteor.left,
              animationDelay: meteor.animationDelay,
              animationDuration: meteor.animationDuration,
              transform: `rotate(${angle}deg)`
            }}
          />
        ))}
      </div>
    </>
  )
}
