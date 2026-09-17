/**
 * TopicRevision.tsx - Interactive topic revision viewer
 * Route: /revision/chapters/:chapterId
 */

import { Card, Typography, Space, Tag, Button, Breadcrumb, Divider, List, Rate, message } from 'antd'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  CheckCircleFilled,
  StarFilled,
  ArrowRightOutlined,
  BookOutlined,
  HomeOutlined,
  ThunderboltFilled,
  CopyOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const PLACEHOLDER_TOPICS = [
  {
    id: 'topic-1',
    name: 'Photoelectric Effect & Einstein Equation',
    isHighYield: true,
    keyPoints: [
      'Light behaves as quantized energy packets (photons) when interacting with matter.',
      'Energy of a single photon: E = hν (where h = 6.626 × 10⁻³⁴ J·s, ν = frequency).',
      'Work Function (φ₀): Minimum energy required to eject an electron from a metal surface.',
      'Threshold Frequency (ν₀): Below ν₀, no photoelectric emission occurs regardless of intensity.',
      'Maximum Kinetic Energy: KE_max = hν - φ₀ = eV₀ (V₀ = stopping potential).',
      'Intensity of incident radiation increases photo-current linearly, but does NOT alter KE_max.',
    ],
    formulas: [
      'E = hν = hc / λ',
      'KE_max = hν - φ₀',
      'eV₀ = h(ν - ν₀)',
      'p = h / λ (de Broglie momentum)',
    ],
    revised: false,
    confidence: 0,
  },
  {
    id: 'topic-2',
    name: 'Dual Nature of Radiation & Matter Waves',
    isHighYield: false,
    keyPoints: [
      'De Broglie hypothesis: Every moving particle has an associated matter wave.',
      'De Broglie wavelength: λ = h / p = h / (mv) = h / √(2m·KE).',
      'For electron accelerated through potential V: λ ≈ 12.27 / √V Å.',
      'Davisson-Germer experiment proved electron wave nature via nickel crystal diffraction.',
    ],
    formulas: [
      'λ = h / p',
      'λ = h / √(2mqV)',
      'λ_e = 1.227 / √V nm',
    ],
    revised: true,
    confidence: 4,
  },
]

export default function TopicRevision() {
  const { chapterId } = useParams()
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, number>>({})
  const [markedRevised, setMarkedRevised] = useState<Record<string, boolean>>({})

  const currentTopic = PLACEHOLDER_TOPICS[currentTopicIndex]

  const handleMarkRevised = () => {
    setMarkedRevised((prev) => ({
      ...prev,
      [currentTopic.id]: true,
    }))
    message.success('Topic marked as revised! Your retention score updated.')
  }

  const handleConfidenceChange = (value: number) => {
    setConfidenceRatings((prev) => ({
      ...prev,
      [currentTopic.id]: value,
    }))
    message.info('Confidence level saved!')
  }

  const goToNextTopic = () => {
    if (currentTopicIndex < PLACEHOLDER_TOPICS.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1)
    }
  }

  const isRevised = currentTopic.revised || markedRevised[currentTopic.id]
  const confidence = confidenceRatings[currentTopic.id] ?? currentTopic.confidence

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
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
          { title: <Link to="/revision/subjects/physics">Physics</Link> },
          { title: 'Modern Physics' },
        ]}
      />

      {/* Topic Switcher Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffffff',
          padding: '16px 24px',
          borderRadius: 16,
          border: '1px solid #f1f5f9',
          boxShadow: '0 2px 10px -2px rgba(0,0,0,0.03)',
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Title level={3} style={{ marginBottom: 0, fontWeight: 800, color: '#0f172a' }}>
              {currentTopic.name}
            </Title>
            {currentTopic.isHighYield && (
              <Tag color="red" icon={<StarFilled />} style={{ borderRadius: 8, fontWeight: 700 }}>
                High Yield
              </Tag>
            )}
            {isRevised && (
              <Tag color="green" icon={<CheckCircleFilled />} style={{ borderRadius: 8, fontWeight: 700 }}>
                Revised
              </Tag>
            )}
          </div>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Topic {currentTopicIndex + 1} of {PLACEHOLDER_TOPICS.length} • Chapter: Modern Physics
          </Text>
        </div>

        {currentTopicIndex < PLACEHOLDER_TOPICS.length - 1 && (
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={goToNextTopic}
            style={{
              borderRadius: 10,
              background: '#0284c7',
              fontWeight: 600,
            }}
          >
            Next Topic
          </Button>
        )}
      </div>

      {/* Key Concepts Card */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 16 }}>
            <BookOutlined style={{ color: '#0ea5e9' }} /> Core Concepts for Quick Recall
          </div>
        }
        style={{
          borderRadius: 18,
          border: '1px solid #f1f5f9',
          boxShadow: '0 2px 12px -2px rgba(0,0,0,0.03)',
          marginBottom: 20,
        }}
        bodyStyle={{ padding: 24 }}
      >
        <List
          dataSource={currentTopic.keyPoints}
          renderItem={(point, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '12px 16px',
                background: index % 2 === 0 ? '#f8fafc' : '#ffffff',
                borderRadius: 12,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 12,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {index + 1}
              </div>
              <Text style={{ fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{point}</Text>
            </div>
          )}
        />
      </Card>

      {/* Formulas Card */}
      {currentTopic.formulas.length > 0 && (
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 16 }}>
              <ThunderboltFilled style={{ color: '#f59e0b' }} /> Essential Formula Cheat Sheet
            </div>
          }
          style={{
            borderRadius: 18,
            border: '1px solid #f1f5f9',
            boxShadow: '0 2px 12px -2px rgba(0,0,0,0.03)',
            marginBottom: 20,
          }}
          bodyStyle={{ padding: 24 }}
        >
          <Row gutter={[16, 16]}>
            {currentTopic.formulas.map((formula, index) => (
              <Col xs={24} sm={12} key={index}>
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '14px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>
                    {formula}
                  </span>
                  <Tag color="blue" style={{ borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                    Formula
                  </Tag>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      )}

      {/* Bottom Sticky Action: Confidence Rating + Mark Revised */}
      <Card
        style={{
          borderRadius: 18,
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 24px -4px rgba(0,0,0,0.06)',
          background: '#ffffff',
        }}
        bodyStyle={{ padding: 24 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <Text strong style={{ fontSize: 15, color: '#0f172a', display: 'block', marginBottom: 6 }}>
              How confident do you feel about this topic?
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Rate
                value={confidence}
                onChange={handleConfidenceChange}
                character={({ index = 0 }) => {
                  const emojis = ['😟', '😕', '😐', '🙂', '😊']
                  return <span style={{ fontSize: 24 }}>{emojis[index]}</span>
                }}
              />
              <Text type="secondary" style={{ fontSize: 13, fontWeight: 600 }}>
                {confidence === 0 && 'Rate your recall after revising'}
                {confidence === 1 && 'Needs urgent review'}
                {confidence === 2 && 'Partially understood'}
                {confidence === 3 && 'Decent grasp'}
                {confidence === 4 && 'Confident for exam'}
                {confidence === 5 && 'Full mastery! 🎯'}
              </Text>
            </div>
          </div>

          <Space size={12}>
            {!isRevised ? (
              <Button
                type="primary"
                size="large"
                icon={<CheckCircleFilled />}
                onClick={handleMarkRevised}
                style={{
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  border: 'none',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)',
                  height: 44,
                  padding: '0 24px',
                }}
              >
                Mark as Revised
              </Button>
            ) : (
              <Button
                size="large"
                icon={<CheckCircleFilled />}
                disabled
                style={{
                  borderRadius: 10,
                  height: 44,
                  padding: '0 24px',
                  fontWeight: 700,
                  background: '#f0fdf4',
                  borderColor: '#bbf7d0',
                  color: '#16a34a',
                }}
              >
                Revised ✓
              </Button>
            )}

            {currentTopicIndex < PLACEHOLDER_TOPICS.length - 1 && (
              <Button
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={goToNextTopic}
                style={{ borderRadius: 10, height: 44, fontWeight: 600 }}
              >
                Next Topic
              </Button>
            )}
          </Space>
        </div>
      </Card>
    </div>
    </div>
  )
}