import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
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
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "AThFofUKMpxD6qNfID5Tvq3rovbxFumzroZRHz_pg9S5_ve0EuWwZSLIl_MVwB4sPOustkY_nVmvX-7E",
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
