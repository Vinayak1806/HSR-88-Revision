import { Card, Form, Input, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4">
      <Card className="w-full max-w-md shadow">
        <Title level={3} className="!mb-6 text-center">
          Create your account
        </Title>
        <Form layout="vertical" onFinish={(v) => console.log('TODO register', v)}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Your name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, min: 8 }]}>
            <Input.Password placeholder="At least 8 characters" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create account
          </Button>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already registered? <Link to="/login">Log in</Link>
        </div>
      </Card>
    </div>
  )
}
