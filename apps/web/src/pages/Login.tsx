import { Card, Form, Input, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4">
      <Card className="w-full max-w-md shadow">
        <Title level={3} className="!mb-6 text-center">
          Log in
        </Title>
        <Form layout="vertical" onFinish={(v) => console.log('TODO login', v)}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="••••••••" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form>
        <div className="mt-4 text-center text-sm">
          New here? <Link to="/register">Create an account</Link>
        </div>
      </Card>
    </div>
  )
}
