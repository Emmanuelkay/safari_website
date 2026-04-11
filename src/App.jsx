import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { TripProvider } from './context/TripContext'
import { TripDrawer } from './components/TripDrawer'
import { ActionCenter } from './components/ActionCenter'
import { ErrorBoundary } from './components/ErrorBoundary'
import { NotFound } from './pages/NotFound'
import { ScrollToTop } from './components/ScrollToTop'
import { CookieConsent } from './components/CookieConsent'
import { BackToTop } from './components/BackToTop'

// Lazy-loaded routes (not needed on initial page load)
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })))
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })))
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminBookings = lazy(() => import('./components/admin/AdminBookings').then(m => ({ default: m.AdminBookings })))
const AdminAnalytics = lazy(() => import('./components/admin/AdminAnalytics').then(m => ({ default: m.AdminAnalytics })))
const AdminCalendar = lazy(() => import('./components/admin/AdminCalendar').then(m => ({ default: m.AdminCalendar })))
const AdminPackages = lazy(() => import('./components/admin/AdminPackages').then(m => ({ default: m.AdminPackages })))
const BookingStatus = lazy(() => import('./pages/BookingStatus').then(m => ({ default: m.BookingStatus })))
const Login = lazy(() => import('./components/admin/Login').then(m => ({ default: m.Login })))
const SetupAdmin = lazy(() => import('./components/admin/SetupAdmin').then(m => ({ default: m.SetupAdmin })))

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4" />
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">Loading</p>
    </div>
  </div>
);

// Layout for public travelers
const PublicLayout = ({ children }) => (
  <div className="relative">
    <Navbar />
    <main>
      {children}
    </main>
    <Footer />
    <TripDrawer />
    <ActionCenter />
    <BackToTop />
    <CookieConsent />
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <TripProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Website */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />
            <Route
              path="/privacy"
              element={
                <PublicLayout>
                  <Privacy />
                </PublicLayout>
              }
            />
            <Route
              path="/booking/status"
              element={
                <PublicLayout>
                  <BookingStatus />
                </PublicLayout>
              }
            />
            <Route
              path="/terms"
              element={
                <PublicLayout>
                  <Terms />
                </PublicLayout>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/setup" element={<SetupAdmin />} />
            <Route path="/admin/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="packages" element={<AdminPackages />} />
                <Route path="calendar" element={<AdminCalendar />} />
                <Route path="analytics" element={<AdminAnalytics />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </Router>
      </TripProvider>
    </ErrorBoundary>
  )
}

export default App
