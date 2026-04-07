import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { TripProvider } from './context/TripContext'
import { TripDrawer } from './components/TripDrawer'

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { AdminBookings } from './components/admin/AdminBookings'
import { Login } from './components/admin/Login'
import { ActionCenter } from './components/ActionCenter'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SetupAdmin } from './components/admin/SetupAdmin'

const PAYPAL_OPTIONS = {
  "client-id": "Ac2BqCCX6oo9fJaNOo4tLiY7gOChpQkI1jhqI_ENWsVr2JAyD5HD4VkRetlBgUkjXbN1J0bVS4eyVQsE",
  components: "buttons",
  currency: "USD",
  intent: "capture"
};

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
  </div>
)

function App() {
  return (
    <PayPalScriptProvider options={PAYPAL_OPTIONS}>
      <TripProvider>
        <Router>
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

            {/* Admin Routes */}
            <Route path="/admin/setup" element={<SetupAdmin />} />
            <Route path="/admin/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="calendar" element={<div className="p-10 bg-white rounded-lg shadow-sm border border-zinc-200 min-h-screen">Expedition Calendar (Field Telemetry WIP)</div>} />
                <Route path="analytics" element={<div className="p-10 bg-white rounded-lg shadow-sm border border-zinc-200 min-h-screen">Financial Analytics (Revenue/Conversion WIP)</div>} />
              </Route>
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TripProvider>
    </PayPalScriptProvider>
  )
}

export default App
