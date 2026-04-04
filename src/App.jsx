import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { Packages } from './components/Packages'
import { AddOns } from './components/AddOns'
import { Destinations } from './components/Destinations'
import { WildlifeTracker } from './components/WildlifeTracker'
import { Stays } from './components/Stays'
import { SocialProof } from './components/SocialProof'
import { EnquiryEngine } from './components/EnquiryEngine'
import { Footer } from './components/Footer'
import { PersistentBar } from './components/PersistentBar'

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <TrustBar />
      <Packages />
      <AddOns />
      <Destinations />
      <WildlifeTracker />
      <Stays />
      <SocialProof />
      <EnquiryEngine />
      <Footer />
      <PersistentBar />
    </div>
  )
}

export default App
