/**
 * RevisionProgressCard.tsx - Shows the student's overall revision progress
 * 
 * Displays a circular progress ring with the percentage of topics revised,
 * plus the revision score. Used on the Revision Hub page.
 */

import { Card, Progress, Typography, Row, Col, Statistic, Tag } from 'antd'
import { BookOutlined, TrophyOutlined, CheckCircleFilled } from '@ant-design/icons'

const { Text, Title } = Typography

type RevisionProgressCardProps = {
  totalTopics: number      // Total number of topics in the syllabus
  revisedTopics: number    // How many topics the student has revised
  progressPercent: number  // Percentage of syllabus revised (0-100)
  score: number            // Student's revision score
  totalScore: number       // Maximum possible score
}

export default function RevisionProgressCard({
  totalTopics,
  revisedTopics,
  progressPercent,
  score,
  totalScore,
}: RevisionProgressCardProps) {
  const topicsSuffix = "/ " + totalTopics
  const scoreSuffix = "/ " + totalScore

  return (
    <Card
      style={{
        borderRadius: 20,
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
        background: '#ffffff',
        overflow: 'hidden',
      }}
      bodyStyle={{ padding: 28 }}
    >
      <Row gutter={[28, 20]} align="middle">
        {/* Left side: Circular progress ring */}
        <Col xs={24} sm={9} style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Progress
              type="circle"
              percent={progressPercent}
              size={150}
              strokeWidth={10}
              strokeColor={{
                '0%': '#0ea5e9',
                '100%': '#2563eb',
              }}
              format={(percent) => (
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
                    {percent}%
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 4 }}>
                    Syllabus Revised
                  </div>
                </div>
              )}
            />
          </div>
        </Col>

        {/* Right side: Stats & Highlights */}
        <Col xs={24} sm={15}>
          <div style={{ marginBottom: 16 }}>
            <Tag color="blue" style={{ borderRadius: 12, fontWeight: 600, padding: '2px 10px' }}>
              Overall NEET 2026 Readiness
            </Tag>
          </div>

          <Row gutter={[16, 16]}>
            {/* Topics revised count */}
            <Col span={12}>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: 14,
                  padding: '12px 16px',
                }}
              >
                <Statistic
                  title={
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>
                      Topics Revised
                    </span>
                  }
                  value={revisedTopics}
                  suffix={<span style={{ fontSize: 13, color: '#94a3b8' }}>{topicsSuffix}</span>}
                  prefix={<BookOutlined style={{ color: '#0ea5e9', marginRight: 6 }} />}
                  valueStyle={{ fontWeight: 800, fontSize: 24, color: '#0f172a' }}
                />
              </div>
            </Col>

            {/* Revision score */}
            <Col span={12}>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: 14,
                  padding: '12px 16px',
                }}
              >
                <Statistic
                  title={
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>
                      Revision Score
                    </span>
                  }
                  value={score}
                  suffix={<span style={{ fontSize: 13, color: '#94a3b8' }}>{scoreSuffix}</span>}
                  prefix={<TrophyOutlined style={{ color: '#f59e0b', marginRight: 6 }} />}
                  valueStyle={{ fontWeight: 800, fontSize: 24, color: '#0f172a' }}
                />
              </div>
            </Col>
          </Row>

          {/* Motivational banner */}
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#f0fdf4',
              border: '1px solid #dcfce7',
              borderRadius: 10,
              padding: '8px 14px',
            }}
          >
            <CheckCircleFilled style={{ color: '#16a34a' }} />
            <Text style={{ fontSize: 12, color: '#15803d', fontWeight: 600 }}>
              {progressPercent < 30
                ? 'Just getting started! Consistency builds champions.'
                : progressPercent < 60
                  ? 'Great pace! Your concept foundation is strengthening.'
                  : progressPercent < 80
                    ? 'Superb work! More than halfway through the syllabus.'
                    : 'Peak revision! You are ready for top percentile.'}
            </Text>
          </div>
        </Col>
      </Row>
    </Card>
  )
}