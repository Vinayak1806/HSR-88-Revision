/**
 * ChapterRevision.tsx - Shows chapters within a subject for revision
 * Route: /revision/subjects/:subjectId
 */

import { Card, List, Typography, Progress, Tag, Space, Button, Breadcrumb } from 'antd'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  CheckCircleFilled,
  ClockCircleFilled,
  PlayCircleFilled,
  ArrowRightOutlined,
  HomeOutlined,
  BookOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const PLACEHOLDER_CHAPTERS = [
  {
    id: 'ch-1',
    name: 'Modern Physics & Dual Nature',
    topicsCount: 8,
    revisedCount: 6,
    status: 'in_progress',
    progressPercent: 75,
    isHighYield: true,
  },
  {
    id: 'ch-2',
    name: 'Kinematics & Motion in a Plane',
    topicsCount: 6,
    revisedCount: 6,
    status: 'completed',
    progressPercent: 100,
    isHighYield: false,
  },
  {
    id: 'ch-3',
    name: 'Thermodynamics & Heat Transfer',
    topicsCount: 7,
    revisedCount: 0,
    status: 'not_started',
    progressPercent: 0,
    isHighYield: true,
  },
  {
    id: 'ch-4',
    name: 'Ray & Wave Optics',
    topicsCount: 5,
    revisedCount: 3,
    status: 'in_progress',
    progressPercent: 60,
    isHighYield: true,
  },
  {
    id: 'ch-5',
    name: 'Electrostatics & Capacitance',
    topicsCount: 6,
    revisedCount: 0,
    status: 'not_started',
    progressPercent: 0,
    isHighYield: true,
  },
  {
    id: 'ch-6',
    name: 'Magnetic Effects of Current',
    topicsCount: 5,
    revisedCount: 5,
    status: 'completed',
    progressPercent: 100,
    isHighYield: false,
  },
]

function getStatusDisplay(status: string) {
  switch (status) {
    case 'completed':
      return {
        color: '#16a34a',
        bg: '#f0fdf4',
        border: '#bbf7d0',
        label: 'Completed',
        icon: <CheckCircleFilled />,
      }
    case 'in_progress':
      return {
        color: '#0284c7',
        bg: '#f0f9ff',
        border: '#bae6fd',
        label: 'In Progress',
        icon: <ClockCircleFilled />,
      }
    default:
      return {
        color: '#64748b',
        bg: '#f8fafc',
        border: '#e2e8f0',
        label: 'Not Started',
        icon: <PlayCircleFilled />,
      }
  }
}

export default function ChapterRevision() {
  const { subjectId } = useParams()
  const navigate = useNavigate()

  const subjectName = subjectId
    ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1)
    : 'Physics'

  return (
    <div style={{ padding: 24 }}>
      {/* Breadcrumb navigation */}
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
          { title: <Link to="/revision/subjects">Subjects</Link> },
          { title: subjectName },
        ]}
      />

      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Tag color="blue" style={{ borderRadius: 10, fontWeight: 700 }}>
            {subjectName}
          </Tag>
          <Text type="secondary" style={{ fontSize: 13 }}>
            6 Chapters • 37 Total Topics
          </Text>
        </div>
        <Title level={2} style={{ marginBottom: 4, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
          {subjectName} Revision
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 15 }}>
          Pick a chapter to view its high-yield revision notes, formula cheat sheets, and active recall cards.
        </Paragraph>
      </div>

      {/* Chapters List */}
      <List
        dataSource={PLACEHOLDER_CHAPTERS}
        renderItem={(chapter) => {
          const status = getStatusDisplay(chapter.status)

          return (
            <Card
              hoverable
              onClick={() => navigate('/revision/chapters/' + chapter.id)}
              style={{
                marginBottom: 16,
                borderRadius: 18,
                border: '1px solid #f1f5f9',
                boxShadow: '0 2px 10px -2px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              bodyStyle={{ padding: 22 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                {/* Left side: Chapter details */}
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#0f172a' }}>
                      {chapter.name}
                    </div>
                    {chapter.isHighYield && (
                      <Tag color="red" style={{ borderRadius: 8, fontWeight: 700, fontSize: 11 }}>
                        ⭐ High Yield
                      </Tag>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>
                      {chapter.revisedCount} of {chapter.topicsCount} topics revised
                    </Text>
                    <span
                      style={{
                        background: status.bg,
                        color: status.color,
                        border: `1px solid ${status.border}`,
                        padding: '2px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      {status.icon} {status.label}
                    </span>
                  </div>

                  <Progress
                    percent={chapter.progressPercent}
                    size="small"
                    strokeColor={chapter.status === 'completed' ? '#16a34a' : '#0ea5e9'}
                    style={{ maxWidth: 360, margin: 0 }}
                  />
                </div>

                {/* Right side: Button CTA */}
                <div>
                  <Button
                    type={chapter.status === 'not_started' ? 'primary' : 'default'}
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{
                      borderRadius: 10,
                      fontWeight: 700,
                      background: chapter.status === 'not_started' ? 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)' : undefined,
                      border: chapter.status === 'not_started' ? 'none' : '1px solid #e2e8f0',
                    }}
                  >
                    {chapter.status === 'not_started'
                      ? 'Start Revision'
                      : chapter.status === 'in_progress'
                        ? 'Continue Revision'
                        : 'Review Notes'}
                  </Button>
                </div>
              </div>
            </Card>
          )
        }}
      />
    </div>
  )
}