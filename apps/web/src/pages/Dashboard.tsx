import { Layout, Menu, Card, Statistic, Row, Col, Progress, Typography, Space, Tag } from 'antd'
import {
  DashboardOutlined,
  ExperimentOutlined,
  ReadOutlined,
  TrophyOutlined,
  RobotOutlined,
  BellOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography

export default function Dashboard() {
  return (
    <Layout className="min-h-screen">
      <Sider theme="light" width={220} className="border-r border-slate-200">
        <div className="flex h-16 items-center justify-center border-b border-slate-200 font-semibold">
          NEET Community
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={[
            { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
            { key: 'quizzes', icon: <ExperimentOutlined />, label: 'Quizzes' },
            { key: 'tests', icon: <ReadOutlined />, label: 'Tests' },
            { key: 'leaderboard', icon: <TrophyOutlined />, label: 'Leaderboard' },
            { key: 'ai-doubt', icon: <RobotOutlined />, label: 'AI Doubt' },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between bg-white px-6 shadow-sm">
          <Title level={4} className="!mb-0">
            Welcome back
          </Title>
          <Space>
            <BellOutlined className="text-xl" />
            <Tag color="blue">Student</Tag>
          </Space>
        </Header>
        <Content className="p-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="Current streak" value={0} suffix="days" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="AI doubts left today" value={5} suffix="/ 5" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="Preparation score" value={0} suffix="/ 100" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="Rank (this week)" value="—" />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24} md={16}>
              <Card title="Today's Quiz">
                <Text type="secondary">Placeholder — the daily quiz card lands here (NEET-18).</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Weak topics">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text>Kinematics</Text>
                    <Progress percent={40} size="small" />
                  </div>
                  <div>
                    <Text>Genetics</Text>
                    <Progress percent={55} size="small" />
                  </div>
                  <div>
                    <Text>Thermodynamics</Text>
                    <Progress percent={62} size="small" />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}
