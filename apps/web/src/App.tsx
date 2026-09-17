/**
 * App.tsx - Main application routes
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Spin } from 'antd'

// Auth & Dashboard
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

// Revision module pages
const RevisionHub = lazy(() => import('./pages/revision/RevisionHub'))
const SubjectRevision = lazy(() => import('./pages/revision/SubjectRevision'))
const ChapterRevision = lazy(() => import('./pages/revision/ChapterRevision'))
const TopicRevision = lazy(() => import('./pages/revision/TopicRevision'))
const RevisionProgress = lazy(() => import('./pages/revision/RevisionProgress'))

function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin size="large" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Revision module routes */}
        <Route path="/revision" element={<RevisionHub />} />
        <Route path="/revision/subjects" element={<SubjectRevision />} />
        <Route path="/revision/subjects/:subjectId" element={<ChapterRevision />} />
        <Route path="/revision/chapters/:chapterId" element={<TopicRevision />} />
        <Route path="/revision/progress" element={<RevisionProgress />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}