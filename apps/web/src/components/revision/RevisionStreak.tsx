/**
 * RevisionStreak.tsx - Shows the student's revision streak
 * 
 * Includes animated fire badge, streak counter, and weekly revision activity dots.
 */

import { Card, Typography, Space, Tag } from 'antd'
import { FireFilled, ThunderboltFilled } from '@ant-design/icons'

const { Title, Text } = Typography

type RevisionStreakProps = {
  streakDays: number
}

export default function RevisionStreak({ streakDays }: RevisionStreakProps) {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  // Represent recent days activity (e.g., 7 days active)
  const activeDays = [true, true, true, true, true, true, true]

  return (
    <Card
      style={{
        borderRadius: 20,
        border: '1px solid #ffedd5',
        background: 'linear-gradient(145deg, #fff7ed 0%, #ffffff 100%)',
        boxShadow: '0 4px 20px -2px rgba(249, 115, 22, 0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      bodyStyle={{ padding: 24, textAlign: 'center' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Fire Badge with subtle glowing ring */}
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 28,
            boxShadow: '0 6px 16px rgba(249, 115, 22, 0.35)',
            marginBottom: 10,
          }}
        >
          <FireFilled />
        </div>

        {/* The streak number */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', letterSpacing: '-1px' }}>
            {streakDays}
          </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#ea580c' }}>
            Days Streak
          </span>
        </div>

        <Text style={{ fontSize: 13, color: '#c2410c', fontWeight: 600, marginBottom: 16 }}>
          🔥 You are on fire! Keep it rolling!
        </Text>

        {/* Weekly Activity Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            padding: '10px 14px',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 12,
            border: '1px solid #fed7aa',
            width: '100%',
            maxWidth: 240,
          }}
        >
          {weekDays.map((day, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: activeDays[idx] ? '#f97316' : '#e2e8f0',
                  color: activeDays[idx] ? '#fff' : '#94a3b8',
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 4,
                }}
              >
                ✓
              </div>
              <span style={{ fontSize: 10, color: '#64748b', fontWeight: 600 }}>{day}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}