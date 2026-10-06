import React, { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const STORY_DATA = {
  heroHeadline: "More than just a cafe. A community.",
  heroPhoto: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop", 
  
  storyTitle: "Our Story",
  storyQuote: "It started with one table and a lot of hope.",
  storyText: "Banacho began with a simple idea: to create a space where people could slow down and connect. We realized that in our busy world, true hospitality was becoming rare. Inspired by the warm, bustling cafes of the past, we opened our doors to offer not just a cup of coffee, but a moment of genuine comfort and belonging. What started as a tiny passion project has blossomed into the heart of our neighborhood.",
  
  differentTitle: "What Makes Us Different",
  differentText: "We specialize in single-origin, meticulously roasted coffee and daily house-baked artisan goods. Unlike massive chains, every single item on our menu is crafted in-house from scratch. From our signature cold brew that steeps for 24 hours, to the fresh sourdough baked every morning at 4 AM, we don't cut corners. We believe you can taste the dedication in every bite and every sip.",
  
  missionTitle: "Mission & Values",
  missionText: "At our core, we care deeply about three things: uncompromising quality, true sustainability, and fostering our community. We don't believe in buzzwords. We believe in fair-trade practices that pay farmers what they deserve, composting our grounds to respect the earth, and treating every guest like an old friend.",
  
  sourcingTitle: "Sourcing & Ingredients",
  sourcingText: "Great food starts with honest ingredients. Our coffee beans are ethically sourced from small-lot farmers in Colombia and Ethiopia. Our milk, eggs, and seasonal produce come directly from local, family-owned farms just miles away. By partnering with local suppliers, we ensure everything we serve is fresh, seasonal, and directly supports our local economy.",
  
  teamTitle: "Meet The Team",
  owner: { name: "Elena Rostova", role: "Founder & Owner", quote: "I wanted to build a place that felt like home.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  staff: [
    { name: "Marcus Chen", role: "Head Roaster", quote: "Coffee is an art form that takes patience and respect.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
    { name: "Sarah Jenkins", role: "Executive Pastry Chef", quote: "Baking is just love made visible.", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
    { name: "David O'Connor", role: "Senior Barista", quote: "Every cup tells a story.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { name: "Mia Wong", role: "Cafe Manager", quote: "We serve moments, not just coffee.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" },
  ],
  
  closingText: "Your table is waiting."
};

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray('.about-reveal');
    
    elements.forEach((el: any) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main className="about-page" ref={containerRef}>
      {/* 1. Hero */}
      <section className="about-hero">
        <div className="about-hero-content about-reveal">
          <h1>{STORY_DATA.heroHeadline}</h1>
        </div>
        <div className="about-hero-image about-reveal">
          <img src={STORY_DATA.heroPhoto} alt="Cafe ambiance" loading="lazy" />
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="about-story">
        <div className="story-container">
          <h2 className="about-reveal">{STORY_DATA.storyTitle}</h2>
          <blockquote className="story-quote about-reveal">"{STORY_DATA.storyQuote}"</blockquote>
          <p className="story-text about-reveal">{STORY_DATA.storyText}</p>
        </div>
      </section>

      {/* 3. What Makes Us Different & Mission (Side by side on desktop, stacked on mobile) */}
      <section className="about-values-section">
        <div className="values-grid">
          <div className="value-block about-reveal">
            <h3>{STORY_DATA.differentTitle}</h3>
            <p>{STORY_DATA.differentText}</p>
          </div>
          <div className="value-block about-reveal">
            <h3>{STORY_DATA.missionTitle}</h3>
            <p>{STORY_DATA.missionText}</p>
          </div>
        </div>
      </section>

      {/* 4. Sourcing & Ingredients */}
      <section className="about-sourcing">
        <div className="sourcing-container about-reveal">
          <h2>{STORY_DATA.sourcingTitle}</h2>
          <p>{STORY_DATA.sourcingText}</p>
        </div>
      </section>

      {/* 5. The Team */}
      <section className="about-team">
        <h2 className="about-reveal">{STORY_DATA.teamTitle}</h2>
        
        {/* Owner - Static */}
        <div className="owner-section about-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div className="team-photo-wrap" style={{ width: '250px', height: '250px', marginBottom: '1.5rem' }}>
            <img src={STORY_DATA.owner.photo} alt={STORY_DATA.owner.name} loading="lazy" className="team-photo" />
          </div>
          <div className="team-info">
            <h3 style={{ fontFamily: '"Fraunces", serif', fontSize: '1.8rem', color: 'var(--ink)' }}>{STORY_DATA.owner.name}</h3>
            <span className="team-role" style={{ color: 'var(--tomato)', fontWeight: 'bold' }}>{STORY_DATA.owner.role}</span>
            <p className="team-quote" style={{ marginTop: '0.5rem', fontStyle: 'italic', color: '#666' }}>"{STORY_DATA.owner.quote}"</p>
          </div>
        </div>

        {/* Staff - Marquee */}
        <div className="marquee-wrapper mt-12">
          <div className="marquee-track" style={{ animationDuration: '20s' }}>
            {[...STORY_DATA.staff, ...STORY_DATA.staff].map((person, i) => (
              <div key={`${person.name}-${i}`} className="team-card marquee-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '280px', textDecoration: 'none' }}>
                <div className="team-photo-wrap" style={{ width: '150px', height: '150px' }}>
                  <img src={person.photo} alt={person.name} loading="lazy" className="team-photo" />
                </div>
                <div className="team-info text-center mt-4">
                  <h3 style={{ fontFamily: '"Fraunces", serif', fontSize: '1.25rem', color: 'var(--ink)' }}>{person.name}</h3>
                  <span className="team-role" style={{ color: 'var(--tomato)', fontSize: '0.9rem', fontWeight: 'bold' }}>{person.role}</span>
                  <p className="team-quote" style={{ fontSize: '0.9rem', marginTop: '0.5rem', fontStyle: 'italic' }}>"{person.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing */}
      <section className="about-closing about-reveal">
        <h2>{STORY_DATA.closingText}</h2>
        <Link to="/contact" className="visit-btn">Plan your visit</Link>
      </section>
    </main>
  );
}
