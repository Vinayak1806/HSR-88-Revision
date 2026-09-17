/**
 * SubjectRevision.tsx - Shows all subjects available for revision
 * Route: /revision/subjects
 */

import { Card, Row, Col, Typography, Progress, Space, Tag, Button, Breadcrumb } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  BookOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const PLACEHOLDER_SUBJECTS = [
  {
    id: 'physics',
    name: 'Physics',
    icon: <ExperimentOutlined />,
    themeColor: '#0284c7',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    bgTint: '#f0f9ff',
    totalChapters: 15,
    totalTopics: 45,
    revisedTopics: 30,
    progressPercent: 67,
    lastRevised: '2 hours ago',
    highYieldCount: 12,
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: <ExperimentOutlined />,
    themeColor: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    bgTint: '#f5f3ff',
    totalChapters: 16,
    totalTopics: 50,
    revisedTopics: 28,
    progressPercent: 56,
    lastRevised: '1 day ago',
    highYieldCount: 14,
  },
  {
    id: 'botany',
    name: 'Botany',
    icon: <MedicineBoxOutlined />,
    themeColor: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    bgTint: '#ecfdf5',
    totalChapters: 16,
    totalTopics: 42,
    revisedTopics: 30,
    progressPercent: 71,
    lastRevised: '3 hours ago',
    highYieldCount: 15,
  },
  {
    id: 'zoology',
    name: 'Zoology',
    icon: <MedicineBoxOutlined />,
    themeColor: '#d97706',
    gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
    bgTint: '#fffbeb',
    totalChapters: 15,
    totalTopics: 43,
    revisedTopics: 24,
    progressPercent: 56,
    lastRevised: '2 days ago',
    highYieldCount: 11,
  },
]

export default function SubjectRevision() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24 }}>
      {/* Breadcrumb Navigation */}
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
          { title: 'Subjects' },
        ]}
      />

      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <Title level={2} style={{ marginBottom: 4, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
          Subjectwise Revision
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 15 }}>
          Select a subject to drill into high-yield chapters, formulas, and spaced practice.
        </Paragraph>
      </div>

      {/* Subject Cards Grid */}
      <Row gutter={[24, 24]}>
        {PLACEHOLDER_SUBJECTS.map((subject) => (
          <Col xs={24} md={12} key={subject.id}>
            <Card
              hoverable
              onClick={() => navigate('/revision/subjects/' + subject.id)}
              style={{
                borderRadius: 20,
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 16px -2px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              bodyStyle={{ padding: 26 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Header Row: Subject Icon + Title + High Yield Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: subject.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 24,
                        boxShadow: `0 6px 16px ${subject.themeColor}35`,
                      }}
                    >
                      {subject.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 20, color: '#0f172a' }}>
                        {subject.name}
                      </div>
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        {subject.totalChapters} Chapters • {subject.totalTopics} Topics
                      </Text>
                    </div>
                  </div>

                  <Tag
                    style={{
                      borderRadius: 10,
                      fontWeight: 700,
                      background: subject.bgTint,
                      color: subject.themeColor,
                      border: `1px solid ${subject.themeColor}30`,
                      padding: '3px 10px',
                    }}
                  >
                    {subject.highYieldCount} High-Yield
                  </Tag>
                </div>

                {/* Progress Bar & Stats */}
                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: 14,
                    padding: '14px 18px',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>
                      {subject.revisedTopics} of {subject.totalTopics} topics revised
                    </Text>
                    <Text strong style={{ color: subject.themeColor, fontSize: 14 }}>
                      {subject.progressPercent}%
                    </Text>
                  </div>
                  <Progress
                    percent={subject.progressPercent}
                    showInfo={false}
                    strokeColor={subject.themeColor}
                    size="small"
                  />
                </div>

                {/* Footer Row: Last revised + View Chapters CTA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    🕒 Last revised: {subject.lastRevised}
                  </Text>
                  <Button
                    type="text"
                    style={{ color: subject.themeColor, fontWeight: 700, padding: 0 }}
                    icon={<ArrowRightOutlined />}
                  >
                    View Chapters
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}