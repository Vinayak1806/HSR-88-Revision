/**
 * RevisionHub.tsx - Central hub for the NEET Smart Revision module
 * 
 * Route: /revision
 */

import { Row, Col, Typography, Card, Button, Space, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  BookOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  ThunderboltFilled,
  RightOutlined,
} from '@ant-design/icons'
import RevisionProgressCard from '../../components/revision/RevisionProgressCard'
import RevisionStreak from '../../components/revision/RevisionStreak'

const { Title, Text, Paragraph } = Typography

const PLACEHOLDER_PROGRESS = {
  totalTopics: 180,
  revisedTopics: 112,
  progressPercent: 62,
  score: 41,
  totalScore: 80,
  streakDays: 7,
}

const QUICK_ACTIONS = [
  {
    key: 'subjects',
    title: 'Subjectwise Revision',
    description: 'Deep dive into Physics, Chemistry, Botany, and Zoology chapters',
    icon: <BookOutlined />,
    iconBg: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
    badge: 'Core',
    path: '/revision/subjects',
  },
  {
    key: 'spaced',
    title: 'Spaced Repetition',
    description: 'AI-scheduled review intervals engineered for long-term memory',
    icon: <ClockCircleOutlined />,
    iconBg: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    badge: 'AI Powered',
    path: '/revision/progress',
  },
  {
    key: 'notes',
    title: 'Quick Revision Notes',
    description: 'High-yield cheat sheets, core formulas, and labeled diagrams',
    icon: <FileTextOutlined />,
    iconBg: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    badge: 'Cheat Sheets',
    path: '/revision/subjects',
  },
  {
    key: 'progress',
    title: 'Revision Analytics',
    description: 'Weak topic identification, accuracy tracking, and historical timeline',
    icon: <BarChartOutlined />,
    iconBg: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    badge: 'Insights',
    path: '/revision/progress',
  },
  {
    key: 'high-yield',
    title: 'High-Yield Topics',
    description: 'Most frequently repeated concepts and questions from past 15 years',
    icon: <StarOutlined />,
    iconBg: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
    badge: 'High ROI',
    path: '/revision/subjects',
  },
  {
    key: 'completed',
    title: 'Completed Topics',
    description: 'Review topics you have mastered and refresh your confidence ratings',
    icon: <CheckCircleOutlined />,
    iconBg: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    badge: 'Mastery',
    path: '/revision/progress',
  },
]

const TODAY_RECOMMENDATIONS = [
  {
    name: 'Photoelectric Effect',
    subject: 'Physics',
    subjectColor: '#3b82f6',
    confidence: 'low',
    reason: 'Due for spaced repetition review (last revised 4 days ago)',
    chapterId: 'ch-1',
  },
  {
    name: 'Chemical Kinetics',
    subject: 'Chemistry',
    subjectColor: '#8b5cf6',
    confidence: 'medium',
    reason: 'Frequent formula recall needed for physical chemistry',
    chapterId: 'ch-2',
  },
  {
    name: 'Cell Cycle & Division',
    subject: 'Botany',
    subjectColor: '#10b981',
    confidence: 'low',
    reason: 'High-yield NEET chapter (3-4 questions expected)',
    chapterId: 'ch-3',
  },
]

export default function RevisionHub() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24 }}>
      {/* Page Header Title */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Tag color="cyan" style={{ borderRadius: 12, fontWeight: 700, padding: '2px 10px' }}>
            NEET 2026
          </Tag>
          <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>
            Retention Engine
          </Text>
        </div>
        <Title level={2} style={{ marginBottom: 4, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
          Smart Revision Hub
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 15 }}>
          Scientific spaced repetition & high-yield topic drill to maximize your retention score.
        </Paragraph>
      </div>

      {/* Hero Stats Row */}
      <Row gutter={[20, 20]} style={{ marginBottom: 36 }}>
        <Col xs={24} lg={16}>
          <RevisionProgressCard
            totalTopics={PLACEHOLDER_PROGRESS.totalTopics}
            revisedTopics={PLACEHOLDER_PROGRESS.revisedTopics}
            progressPercent={PLACEHOLDER_PROGRESS.progressPercent}
            score={PLACEHOLDER_PROGRESS.score}
            totalScore={PLACEHOLDER_PROGRESS.totalScore}
          />
        </Col>

        <Col xs={24} lg={8}>
          <RevisionStreak streakDays={PLACEHOLDER_PROGRESS.streakDays} />
        </Col>
      </Row>

      {/* Quick Actions Grid */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <Title level={4} style={{ marginBottom: 2, fontWeight: 700, color: '#0f172a' }}>
              Revision Pathways
            </Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Choose how you want to prepare today
            </Text>
          </div>
        </div>

        <Row gutter={[20, 20]}>
          {QUICK_ACTIONS.map((action) => (
            <Col xs={24} sm={12} md={8} key={action.key}>
              <Card
                hoverable
                onClick={() => navigate(action.path)}
                style={{
                  borderRadius: 18,
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 10px -2px rgba(0,0,0,0.03)',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                bodyStyle={{ padding: 22 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: action.iconBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: 20,
                          boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                        }}
                      >
                        {action.icon}
                      </div>
                      <Tag
                        style={{
                          borderRadius: 10,
                          fontSize: 11,
                          fontWeight: 700,
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          color: '#475569',
                          margin: 0,
                        }}
                      >
                        {action.badge}
                      </Tag>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', marginBottom: 6 }}>
                      {action.title}
                    </div>

                    <Text type="secondary" style={{ fontSize: 13, lineHeight: 1.5, display: 'block' }}>
                      {action.description}
                    </Text>
                  </div>

                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#0ea5e9', fontWeight: 600, fontSize: 13 }}>
                    <span>Launch</span>
                    <RightOutlined style={{ fontSize: 10 }} />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Today's High Priority Recommendations */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <Title level={4} style={{ marginBottom: 2, fontWeight: 700, color: '#0f172a' }}>
              ⚡ Recommended For Today
            </Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Topics prioritized based on retention decay and mock test analytics
            </Text>
          </div>
          <Button type="link" onClick={() => navigate('/revision/subjects')} style={{ fontWeight: 600 }}>
            Browse All Subjects <ArrowRightOutlined />
          </Button>
        </div>

        <Row gutter={[20, 20]}>
          {TODAY_RECOMMENDATIONS.map((topic, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                style={{
                  borderRadius: 18,
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 10px -2px rgba(0,0,0,0.03)',
                  height: '100%',
                }}
                bodyStyle={{ padding: 22 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <Tag
                        style={{
                          borderRadius: 8,
                          fontWeight: 700,
                          fontSize: 11,
                          background: `${topic.subjectColor}15`,
                          color: topic.subjectColor,
                          border: `1px solid ${topic.subjectColor}30`,
                        }}
                      >
                        {topic.subject}
                      </Tag>
                      <Tag
                        color={topic.confidence === 'low' ? 'error' : 'warning'}
                        style={{ borderRadius: 8, fontWeight: 600, fontSize: 11 }}
                      >
                        {topic.confidence === 'low' ? 'Low Confidence' : 'Medium Confidence'}
                      </Tag>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', marginBottom: 6 }}>
                      {topic.name}
                    </div>

                    <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.5, display: 'block', marginBottom: 16 }}>
                      {topic.reason}
                    </Text>
                  </div>

                  <Button
                    type="primary"
                    block
                    size="large"
                    icon={<ThunderboltFilled />}
                    onClick={() => navigate('/revision/chapters/' + topic.chapterId)}
                    style={{
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                      border: 'none',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.25)',
                    }}
                  >
                    Revise Topic Now
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}