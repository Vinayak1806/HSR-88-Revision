/**
 * RevisionProgress.tsx - Revision Progress Analytics Dashboard
 * Route: /revision/progress
 */

import { Card, Row, Col, Typography, Progress, Statistic, Tag, Space, List, Timeline, Button, Breadcrumb } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOutlined,
  FireOutlined,
  TrophyOutlined,
  WarningOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  HomeOutlined,
  ArrowRightOutlined,
  ThunderboltFilled,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const PLACEHOLDER_STATS = {
  totalTopics: 180,
  revisedTopics: 112,
  streakDays: 7,
  subjectsCovered: 4,
  weakTopicsCount: 4,
}

const SUBJECT_PROGRESS = [
  { name: 'Physics', revised: 30, total: 45, percent: 67, color: '#0284c7' },
  { name: 'Chemistry', revised: 28, total: 50, percent: 56, color: '#7c3aed' },
  { name: 'Botany', revised: 30, total: 42, percent: 71, color: '#059669' },
  { name: 'Zoology', revised: 24, total: 43, percent: 56, color: '#d97706' },
]

const WEAK_TOPICS = [
  { name: 'Thermodynamics & Heat Cycles', subject: 'Physics', confidence: 'low', lastRevised: '5 days ago', chapterId: 'ch-3' },
  { name: 'Organic Reactions & Mechanisms', subject: 'Chemistry', confidence: 'low', lastRevised: '3 days ago', chapterId: 'ch-2' },
  { name: 'Genetics & Mendelian Inheritance', subject: 'Botany', confidence: 'medium', lastRevised: '2 days ago', chapterId: 'ch-1' },
  { name: 'Electrostatics & Potential', subject: 'Physics', confidence: 'low', lastRevised: '7 days ago', chapterId: 'ch-5' },
]

const REVISION_HISTORY = [
  { date: 'Today, 4:30 PM', topics: ['Photoelectric Effect', 'Dual Nature of Matter'], subject: 'Physics' },
  { date: 'Yesterday, 8:15 PM', topics: ['Cell Division & Mitosis', 'Plant Anatomy'], subject: 'Botany' },
  { date: '2 days ago', topics: ['Aldehydes & Ketones', 'Electrochemistry'], subject: 'Chemistry' },
  { date: '3 days ago', topics: ['Kinematics 2D', 'Newtonian Mechanics'], subject: 'Physics' },
]

export default function RevisionProgress() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24 }}>
      {/* Breadcrumbs */}
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          {
            title: (
              <Link to="/revision" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <HomeOutlined /> Revision Hub
              </Link>
            ),
          },
          { title: 'Revision Analytics' },
        ]}
      />

      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <Title level={2} style={{ marginBottom: 4, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
          Revision Progress & Retention
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 15 }}>
          Track comprehensive syllabus coverage, analyze weak concept areas, and review your revision log.
        </Paragraph>
      </div>

      {/* Stats Row */}
      <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              borderRadius: 18,
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 12px -2px rgba(0,0,0,0.03)',
            }}
          >
            <Statistic
              title={<span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Total Topics Revised</span>}
              value={PLACEHOLDER_STATS.revisedTopics}
              suffix={<span style={{ fontSize: 13, color: '#94a3b8' }}>/ {PLACEHOLDER_STATS.totalTopics}</span>}
              prefix={<BookOutlined style={{ color: '#0ea5e9' }} />}
              valueStyle={{ fontWeight: 800, color: '#0f172a' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              borderRadius: 18,
              border: '1px solid #ffedd5',
              background: 'linear-gradient(145deg, #fff7ed 0%, #ffffff 100%)',
              boxShadow: '0 4px 12px -2px rgba(249, 115, 22, 0.05)',
            }}
          >
            <Statistic
              title={<span style={{ fontSize: 13, color: '#c2410c', fontWeight: 600 }}>Revision Streak</span>}
              value={PLACEHOLDER_STATS.streakDays}
              suffix="days"
              prefix={<FireOutlined style={{ color: '#ea580c' }} />}
              valueStyle={{ fontWeight: 800, color: '#ea580c' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              borderRadius: 18,
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 12px -2px rgba(0,0,0,0.03)',
            }}
          >
            <Statistic
              title={<span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Subjects Active</span>}
              value={PLACEHOLDER_STATS.subjectsCovered}
              suffix="/ 4"
              prefix={<TrophyOutlined style={{ color: '#10b981' }} />}
              valueStyle={{ fontWeight: 800, color: '#0f172a' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              borderRadius: 18,
              border: '1px solid #fee2e2',
              background: 'linear-gradient(145deg, #fff5f5 0%, #ffffff 100%)',
              boxShadow: '0 4px 12px -2px rgba(239, 68, 68, 0.05)',
            }}
          >
            <Statistic
              title={<span style={{ fontSize: 13, color: '#b91c1c', fontWeight: 600 }}>Needs Attention</span>}
              value={PLACEHOLDER_STATS.weakTopicsCount}
              suffix="topics"
              prefix={<WarningOutlined style={{ color: '#ef4444' }} />}
              valueStyle={{ fontWeight: 800, color: '#b91c1c' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Left Column: Subject Progress + Weak Topics */}
        <Col xs={24} lg={15}>
          {/* Subject-wise Progress */}
          <Card
            title={<span style={{ fontWeight: 700, fontSize: 16 }}>Subject-wise Syllabus Coverage</span>}
            style={{
              borderRadius: 18,
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 12px -2px rgba(0,0,0,0.03)',
              marginBottom: 24,
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Space direction="vertical" size={18} style={{ width: '100%' }}>
              {SUBJECT_PROGRESS.map((subject) => (
                <div key={subject.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text strong style={{ fontSize: 14 }}>{subject.name}</Text>
                    <Text strong style={{ color: subject.color, fontSize: 14 }}>
                      {subject.revised} / {subject.total} ({subject.percent}%)
                    </Text>
                  </div>
                  <Progress
                    percent={subject.percent}
                    showInfo={false}
                    strokeColor={subject.color}
                    size="small"
                  />
                </div>
              ))}
            </Space>
          </Card>

          {/* Weak Topics */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>⚠️ Weak Concepts Needing Reinforcement</span>
              </div>
            }
            style={{
              borderRadius: 18,
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 12px -2px rgba(0,0,0,0.03)',
            }}
            bodyStyle={{ padding: 20 }}
          >
            <List
              dataSource={WEAK_TOPICS}
              renderItem={(topic) => (
                <div
                  key={topic.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: '#f8fafc',
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>
                      {topic.name}
                    </div>
                    <Space size={8}>
                      <Tag color="blue" style={{ borderRadius: 6, fontSize: 11 }}>
                        {topic.subject}
                      </Tag>
                      <Tag color={topic.confidence === 'low' ? 'error' : 'warning'} style={{ borderRadius: 6, fontSize: 11 }}>
                        {topic.confidence === 'low' ? 'Low Confidence' : 'Medium Confidence'}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Last revised: {topic.lastRevised}
                      </Text>
                    </Space>
                  </div>

                  <Button
                    type="primary"
                    size="small"
                    icon={<ThunderboltFilled />}
                    onClick={() => navigate('/revision/chapters/' + topic.chapterId)}
                    style={{
                      borderRadius: 8,
                      background: '#0284c7',
                      fontWeight: 600,
                    }}
                  >
                    Drill Now
                  </Button>
                </div>
              )}
            />
          </Card>
        </Col>

        {/* Right Column: Revision History Timeline */}
        <Col xs={24} lg={9}>
          <Card
            title={<span style={{ fontWeight: 700, fontSize: 16 }}>Recent Activity Timeline</span>}
            style={{
              borderRadius: 18,
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 12px -2px rgba(0,0,0,0.03)',
              height: '100%',
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Timeline
              items={REVISION_HISTORY.map((entry) => ({
                color: '#0284c7',
                dot: <CheckCircleFilled style={{ color: '#0ea5e9', fontSize: 16 }} />,
                children: (
                  <div style={{ marginBottom: 14 }}>
                    <Text strong style={{ fontSize: 13, color: '#0f172a' }}>
                      {entry.date}
                    </Text>
                    <div style={{ marginTop: 2 }}>
                      <Tag color="blue" style={{ borderRadius: 6, fontSize: 10, fontWeight: 700 }}>
                        {entry.subject}
                      </Tag>
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                      {entry.topics.join(' • ')}
                    </div>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}