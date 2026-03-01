import { useEffect, useRef, useState } from 'react'
import './App.css'

const RESUME_CONTEXT = `Mukiri Kamala Beena (Beena) is a Backend Engineer based in Bengaluru, India with 3+ years of experience architecting secure, high-availability financial platforms.
Expert in Java/Spring Boot and Node.js microservices with deep focus on Core Banking System (CBS) integrations including AEPS, KYC/eKYC, and CKYC.
Designed fault-tolerant systems handling 5M+ monthly transactions with 99.99% uptime.
Specialist in enterprise-grade security (RSA, AES, OAuth2) and message-driven architectures (Kafka/RabbitMQ).
Currently works at Integra Micro Systems (June 2023 - Present) building backend services for HDFC Bank, IOB, Canara Bank, Union Bank of India, UBI Green Channel, and IDBI Bank.
Architected and secured 1,000+ mission-critical REST/gRPC APIs supporting 100,000+ users.
Built a custom API Gateway using Java (Spring Boot) & Nginx.
Skills: Java, Spring Boot, Project Loom, Hibernate/JPA, Node.js, Express.js, REST APIs, gRPC, Microservices, Python, API Security, Spring Security, AES & RSA Encryption, HMAC, TLS/HTTPS, JWT & OAuth2, AWS (EC2, Lambda, RDS), Docker, Kubernetes, CI/CD (Jenkins/GitHub Actions), Oracle Database, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ.
Internship at MalTech Solutions (Jun 2022 - Dec 2022) - backend APIs with Node.js, Oracle/MySQL, KYC modules.
Project: Distributed Fintech Wallet Microservices using Spring Boot, Kafka, Redis Distributed Locking, Double-Entry Ledger, Idempotency.
Education: B.Tech CSE from ANDHRA University (2016-2020). Java Full Stack Developer Certification from Jspyders (Jan-Jun 2023).
Contact: Phone available on request (see Contact section), linkedin.com/in/beenamukiri`;

function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return "Hey there! 👋 I'm Beena's AI assistant. Ask me anything about her skills, experience, projects, or how to get in touch!";
  }
  if (msg.includes('name') || msg.includes('who')) {
    return "She's Mukiri Kamala Beena — a Backend Engineer based in Bengaluru, India, specializing in FinTech and banking systems. 🚀";
  }
  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack') || msg.includes('know')) {
    return "Beena's core stack includes:\n\n⚡ **Backend:** Java, Spring Boot, Node.js, Express.js, Python, REST APIs, gRPC\n🔒 **Security:** AES/RSA, OAuth2, JWT, HMAC, Spring Security\n☁️ **Cloud:** AWS, Docker, Kubernetes, CI/CD\n🗄️ **Data:** Oracle DB, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ";
  }
  if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('company')) {
    return "Beena currently works as a **Backend Engineer at Integra Micro Systems** (June 2023 - Present), building secure microservices for major Indian banks including HDFC, Canara Bank, Union Bank, IOB & IDBI Bank.\n\nBefore that, she interned at **MalTech Solutions** (Jun-Dec 2022) working on Node.js APIs and KYC modules.";
  }
  if (msg.includes('project')) {
    return "Her standout project is a **Distributed Fintech Wallet Microservices** system — built with Spring Boot & Kafka, using Redis Distributed Locking to prevent double-spending. Features a Double-Entry Ledger with 100% data consistency! 💰";
  }
  if (msg.includes('education') || msg.includes('degree') || msg.includes('college') || msg.includes('university')) {
    return "🎓 **B.Tech in Computer Science Engineering** from ANDHRA University, Visakhapatnam (2016-2020)\n📜 **Java Full Stack Developer Certification** from Jspyders, Bengaluru (Jan-Jun 2023)";
  }
  if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone') || msg.includes('hire')) {
    return "You can reach Beena at:\n\n📱 **Phone:** +91 87XX XXX X03 (click the phone button in the Contact section to reveal)\n💼 **LinkedIn:** linkedin.com/in/beenamukiri\n✉️ **Email:** beenamukiri@gmail.com\n\nShe's open to exciting backend engineering opportunities!";
  }
  if (msg.includes('bank') || msg.includes('client')) {
    return "Beena has delivered backend services for some of India's leading banks:\n\n🏦 HDFC Bank\n🏦 Indian Overseas Bank (IOB)\n🏦 Canara Bank\n🏦 Union Bank of India (UBI)\n🏦 UBI Green Channel\n🏦 IDBI Bank";
  }
  if (msg.includes('api') || msg.includes('security') || msg.includes('encrypt')) {
    return "Beena has architected and secured **1,000+ mission-critical REST/gRPC APIs** using AES/RSA encryption and HMAC signing. She also built a custom API Gateway with Nginx implementing authentication, rate limiting, and request-level encryption. 🔐";
  }
  if (msg.includes('kafka') || msg.includes('redis') || msg.includes('message') || msg.includes('queue')) {
    return "Beena is experienced with message-driven architectures:\n\n📨 **Apache Kafka** — event-driven systems, wallet microservices\n⚡ **Redis** — distributed locking, caching\n🐰 **RabbitMQ** — high-volume financial workflows\n\nThese power her 5M+ monthly transaction systems!";
  }
  return "Great question! Beena is a Backend Engineer with 3+ years in FinTech, specializing in Java/Spring Boot microservices, banking integrations (AEPS, KYC), and enterprise security. Ask me about her **skills**, **experience**, **projects**, **education**, or how to **contact** her! 😊";
}

function App() {
  // --- Config: API URL from environment ---
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const API_KEY = import.meta.env.VITE_API_KEY || 'beena-portfolio-2024'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: "Hi! 👋 I'm Beena's AI assistant. Ask me anything about her skills, experience, or projects!" }
  ])
  const [chatInput, setChatInput] = useState('')
  const chatEndRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    // Scroll listener for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    // Mouse move for cursor glow
    const handleMouse = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', handleMouse)

    // --- Visitor Tracking ---
    const visitStartTime = Date.now()
    const visitorData = {
      event: 'page_visit',
      timestamp: new Date().toISOString(),
      page: window.location.href,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: navigator.platform || 'unknown',
      connectionType: navigator.connection?.effectiveType || 'unknown',
      touchSupport: 'ontouchstart' in window,
    }

    console.log('👁️ [Visitor Tracking] New visitor detected:', visitorData)

    // Send visitor data to Python server
    fetch(`${API_URL}/api/track-visitor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(visitorData)
    })
      .then(res => {
        console.log('✅ [Visitor Tracking] Sent to server. Status:', res.status)
      })
      .catch(err => {
        console.warn('⚠️ [Visitor Tracking] Could not reach server:', err.message)
      })

    // Track time spent on page when user leaves
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - visitStartTime) / 1000)
      const exitData = {
        event: 'page_exit',
        timestamp: new Date().toISOString(),
        page: window.location.href,
        timeSpentSeconds: timeSpent,
      }
      console.log('👋 [Visitor Tracking] Visitor leaving. Time spent:', timeSpent, 'seconds')
      // Use sendBeacon for reliable delivery on page close
      navigator.sendBeacon(
        `${API_URL}/api/track-visitor`,
        new Blob([JSON.stringify(exitData)], { type: 'application/json' })
      )
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      observer.disconnect()
    }
  }, [])

  // Re-observe after render
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // --- Security: Rate limiting ---
  const rateLimitRef = useRef([])  // timestamps of recent messages
  const RATE_LIMIT_MAX = 5         // max messages
  const RATE_LIMIT_WINDOW = 30000  // in 30 seconds
  const abortRef = useRef(null)

  // --- Security: Input sanitization ---
  const sanitizeInput = (input) => {
    return input
      .replace(/<[^>]*>/g, '')          // strip HTML tags
      .replace(/[<>"'`]/g, '')          // remove dangerous chars
      .replace(/javascript:/gi, '')     // block js: protocol
      .replace(/on\w+\s*=/gi, '')       // block event handlers
      .trim()
      .slice(0, 500)                    // max 500 characters
  }

  const handleChatSend = async () => {
    if (!chatInput.trim()) return

    // --- Security: Rate limit check ---
    const now = Date.now()
    rateLimitRef.current = rateLimitRef.current.filter(t => now - t < RATE_LIMIT_WINDOW)
    if (rateLimitRef.current.length >= RATE_LIMIT_MAX) {
      setChatMessages(prev => [...prev, {
        role: 'bot',
        text: '⚠️ You\'re sending messages too fast. Please wait a moment before trying again.'
      }])
      console.warn('🛑 [Security] Rate limit exceeded:', rateLimitRef.current.length, 'messages in', RATE_LIMIT_WINDOW / 1000, 'seconds')
      return
    }
    rateLimitRef.current.push(now)

    // --- Security: Sanitize input ---
    const rawMsg = chatInput.trim()
    const userMsg = sanitizeInput(rawMsg)
    if (!userMsg) return

    if (rawMsg !== userMsg) {
      console.warn('🛡️ [Security] Input sanitized:', { original: rawMsg, sanitized: userMsg })
    }

    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setChatInput('')

    // Add a typing indicator
    const typingId = Date.now()
    setChatMessages(prev => [...prev, { role: 'bot', text: '●●●', id: typingId, isTyping: true }])

    // --- Security: Abort controller with timeout ---
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const timeout = setTimeout(() => controller.abort(), 30000)  // 30s timeout

    try {
      console.log(`🚀 [RAG Request] Sending to ${API_URL}/api/query-stream`)
      console.log('📤 [RAG Request] Body:', JSON.stringify({ question: userMsg }))
      console.log('🔒 [Security] Rate:', rateLimitRef.current.length + '/' + RATE_LIMIT_MAX, '| Input length:', userMsg.length + '/500')

      const response = await fetch(`${API_URL}/api/query-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,          // API key for server-side validation
          'X-Request-Source': 'portfolio-chatbot',       // identify the source
          'X-Request-Timestamp': new Date().toISOString() // timestamp for replay protection
        },
        body: JSON.stringify({ question: userMsg }),
        signal: controller.signal
      })

      clearTimeout(timeout)
      console.log('📥 [RAG Response] Status:', response.status, response.statusText)
      console.log('📥 [RAG Response] Headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) throw new Error(`Server error: ${response.status} ${response.statusText}`)

      // Handle streaming response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      let chunkCount = 0

      // Remove typing indicator and add empty bot message
      setChatMessages(prev =>
        prev.filter(m => !(m.id === typingId)).concat([{ role: 'bot', text: '' }])
      )

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          console.log('✅ [RAG Stream] Stream complete. Total chunks:', chunkCount)
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        chunkCount++
        fullText += chunk
        console.log(`📦 [RAG Stream] Chunk #${chunkCount}:`, JSON.stringify(chunk))

        // --- Security: Cap response length ---
        if (fullText.length > 5000) {
          console.warn('🛡️ [Security] Response too long, truncating at 5000 chars')
          fullText = fullText.slice(0, 5000) + '...'
          reader.cancel()
          break
        }

        // Update the last bot message with streamed text
        setChatMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'bot', text: fullText }
          return updated
        })
      }

      console.log('📝 [RAG Final Response]:', fullText)

      // If no text was received, show a default
      if (!fullText.trim()) {
        console.warn('⚠️ [RAG Warning] Empty response received')
        setChatMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'bot', text: "I couldn't generate a response. Please try again!" }
          return updated
        })
      }
    } catch (err) {
      clearTimeout(timeout)
      if (err.name === 'AbortError') {
        console.error('⏱️ [Security] Request timed out after 30 seconds')
        setChatMessages(prev =>
          prev.filter(m => !(m.id === typingId)).concat([{
            role: 'bot', text: '⏱️ Request timed out. The server took too long to respond. Please try again.'
          }])
        )
      } else {
        console.error('❌ [RAG Error]:', err.message)
        console.error('❌ [RAG Error] Full:', err)
        console.log('🔄 [RAG Fallback] Using local keyword-based response')
        const fallback = getBotResponse(userMsg)
        setChatMessages(prev =>
          prev.filter(m => !(m.id === typingId)).concat([{ role: 'bot', text: fallback }])
        )
      }
    }
  }

  const handleChatKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChatSend()
    }
  }

  return (
    <>
      {/* Cursor Glow */}
      <div className="cursor-glow" ref={cursorRef}></div>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          MKB<span>.</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
          <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>Experience</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          <a href="#education" onClick={(e) => handleNavClick(e, 'education')}>Education</a>
          <a href="#contact" className="nav-cta" onClick={(e) => handleNavClick(e, 'contact')}>Let's Talk</a>
        </div>
        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-number">01</div>
        <div className="hero-content">
          <div className="hero-tag">FinTech Backend Engineer</div>
          <h1>
            Hi, I'm<br />
            <span className="gradient-text" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>Beena Mukiri</span><span className="gradient-text">.</span>
          </h1>
          <p className="hero-description">
            Backend Engineer with 3+ years of experience architecting high-availability
            financial systems handling 5M+ monthly transactions with 99.99% uptime.
            Specializing in Java/Spring Boot & Node.js microservices.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary" onClick={(e) => handleNavClick(e, 'contact')}>
              Get In Touch →
            </a>
            <a href="#experience" className="btn-secondary" onClick={(e) => handleNavClick(e, 'experience')}>
              View My Work
            </a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex' }}>
              {['JAVA', 'SPRING BOOT', 'NODE.JS', 'MICROSERVICES', 'KAFKA', 'REDIS', 'KUBERNETES', 'AWS', 'ORACLE DB', 'POSTGRESQL', 'DOCKER', 'REST APIs', 'gRPC'].map((tech, j) => (
                <div className="marquee-item" key={j}>
                  {tech}
                  <span className="dot"></span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="section about" id="about">
        <div className="section-header reveal">
          <div className="section-number">01 — About</div>
          <h2 className="section-title">
            We Listen. We Craft.<br />We Deliver.
          </h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal reveal-delay-1">
            <p>
              I'm Mukiri Kamala Beena, a Backend Engineer based in Bengaluru, India.
              With over 3 years of hands-on experience, I specialize in architecting
              secure, high-availability financial platforms that power India's
              leading banking institutions.
            </p>
            <p>
              My expertise spans Core Banking System (CBS) integrations including
              AEPS, KYC/eKYC, and CKYC modules. I design fault-tolerant systems
              that handle millions of transactions monthly with enterprise-grade
              security using RSA, AES, and OAuth2 protocols.
            </p>
            <p>
              From HDFC Bank and Canara Bank to Union Bank of India and IDBI Bank —
              I've delivered backend services powering secure and compliant banking
              workflows across multiple institutions.
            </p>
          </div>
          <div className="about-stats reveal reveal-delay-2">
            <div className="stat-card">
              <div className="stat-value">5M+</div>
              <div className="stat-label">Monthly Transactions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">99.99%</div>
              <div className="stat-label">System Uptime</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">1,000+</div>
              <div className="stat-label">APIs Secured</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">100K+</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section" id="skills">
        <div className="section-header reveal">
          <div className="section-number">02 — Expertise</div>
          <h2 className="section-title">
            Stuff I'm Really<br />Good At.
          </h2>
          <p className="section-subtitle">
            Specializing in enterprise-grade backend systems, security, and
            message-driven architectures for the financial sector.
          </p>
        </div>
        <div className="skills-grid">
          <div className="skill-category reveal reveal-delay-1">
            <div className="skill-icon">⚡</div>
            <h3>Programming & Backend</h3>
            <div className="skill-tags">
              {['Java', 'Spring Boot', 'Project Loom', 'Hibernate/JPA', 'Node.js', 'Express.js', 'REST APIs', 'gRPC', 'Microservices', 'Python'].map((s) => (
                <span className="skill-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="skill-category reveal reveal-delay-2">
            <div className="skill-icon">🔒</div>
            <h3>Security & Cloud</h3>
            <div className="skill-tags">
              {['API Security', 'Spring Security', 'AES & RSA', 'HMAC Signing', 'TLS/HTTPS', 'JWT & OAuth2', 'AWS (EC2, Lambda, RDS)', 'Docker', 'Kubernetes', 'CI/CD'].map((s) => (
                <span className="skill-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="skill-category reveal reveal-delay-3">
            <div className="skill-icon">🗄️</div>
            <h3>Databases & Messaging</h3>
            <div className="skill-tags">
              {['Oracle DB', 'PostgreSQL', 'MongoDB', 'Stored Procedures', 'PL/SQL Packages', 'Redis', 'Apache Kafka', 'RabbitMQ'].map((s) => (
                <span className="skill-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section experience" id="experience">
        <div className="section-header reveal">
          <div className="section-number">03 — Experience</div>
          <h2 className="section-title">
            Not a Cult. But Banks<br />Keep Coming Back.
          </h2>
        </div>
        <div className="experience-timeline">
          <div className="experience-item reveal">
            <div className="experience-date">June 2023 — Present</div>
            <h3>Backend Engineer</h3>
            <div className="experience-company">Integra Micro Systems • Bengaluru, India</div>
            <ul className="experience-details">
              <li>
                Developed and maintained secured microservices in Java (Spring Boot) and
                Node.js for AEPS and financial transaction processing, integrating with
                NPCI systems and Core Banking Systems (CBS).
              </li>
              <li>
                Delivered backend services for a multi-tenant banking platform serving HDFC
                Bank, Indian Overseas Bank (IOB), Canara Bank, Union Bank of India (UBI),
                UBI Green Channel, and IDBI Bank.
              </li>
              <li>
                Implemented Digital Account Opening services including live face capture
                (liveness) and identity validation workflows integrated with KYC/eKYC systems.
              </li>
              <li>
                Architected and secured 1,000+ mission-critical REST/gRPC APIs using AES/RSA
                encryption and HMAC signing for KYC, Reporting, and RD Enrollment modules,
                supporting 100,000+ users.
              </li>
              <li>
                Built and enhanced a custom API Gateway using Java (Spring Boot) & Nginx,
                implementing authentication, secure routing, rate limiting, and request-level
                encryption for high-value financial APIs.
              </li>
              <li>
                Designed end-to-end transaction lifecycle handling, including reversals, retries,
                status enquiries, audit logging, consent capture, and role-based access control.
              </li>
              <li>
                Worked extensively with Oracle Database (PL/SQL), Redis, and RabbitMQ to support
                high-concurrency, high-volume financial workflows.
              </li>
              <li>
                Provided technical leadership by reviewing code, assigning tasks, and mentoring
                backend engineers, improving code quality and delivery timelines.
              </li>
            </ul>
          </div>

          <div className="experience-item reveal">
            <div className="experience-date">June 2022 — December 2022</div>
            <h3>Software Engineering Intern</h3>
            <div className="experience-company">MalTech Solutions</div>
            <ul className="experience-details">
              <li>Assisted in developing backend APIs using Node.js and Express.js.</li>
              <li>Worked with Oracle/MySQL databases and basic stored procedures.</li>
              <li>Supported KYC-related modules and API testing.</li>
              <li>Gained exposure to banking and FinTech workflows.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="section-header reveal">
          <div className="section-number">04 — Projects</div>
          <h2 className="section-title">
            The Hype Is Real.
          </h2>
          <p className="section-subtitle">
            Passion projects showcasing distributed systems thinking and
            real-world fintech problem solving.
          </p>
        </div>
        <div className="projects-grid">
          <div className="project-card reveal">
            <div className="project-number">Featured Project</div>
            <h3>Distributed Fintech Wallet Microservices</h3>
            <p>
              Built a Spring Boot & Kafka event-driven system using Redis Distributed
              Locking to prevent double-spending and race conditions during high-concurrency
              transactions. Implemented a Double-Entry Ledger and Idempotency logic to ensure
              100% data consistency and auditability across microservices.
            </p>
            <div className="project-tech">
              {['Java', 'Spring Boot', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Docker'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="project-card reveal">
            <div className="project-number">Featured Project</div>
            <h3>RAG AI Resume Chatbot</h3>
            <p>
              Designed and built an AI-powered chatbot using Retrieval-Augmented Generation (RAG)
              trained on my personal resume. The model intelligently answers questions about my
              skills, experience, projects, and background — providing recruiters and visitors
              with an interactive way to explore my profile. Integrated directly into this
              portfolio as the live AI assistant you see on the bottom right.
            </p>
            <div className="project-tech">
              {['React', 'RAG Architecture', 'NLP', 'JavaScript', 'AI/ML', 'Prompt Engineering'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section education" id="education">
        <div className="section-header reveal">
          <div className="section-number">05 — Education & Certs</div>
          <h2 className="section-title">
            The Foundation.
          </h2>
        </div>
        <div className="education-grid">
          <div className="edu-card reveal reveal-delay-1">
            <div className="edu-icon">🎓</div>
            <h3>Bachelor of Computer Science Engineering</h3>
            <div className="edu-institution">ANDHRA University • Visakhapatnam, India</div>
            <div className="edu-date">Jun 2016 — May 2020</div>
          </div>
          <div className="edu-card reveal reveal-delay-2">
            <div className="edu-icon">📜</div>
            <h3>Java Full Stack Developer Certification</h3>
            <div className="edu-institution">Jspyders • Bengaluru, India</div>
            <div className="edu-date">Jan 2023 — Jun 2023</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact" id="contact">
        <div className="contact-bg-text">LET'S TALK</div>
        <div className="section-header reveal">
          <div className="section-number" style={{ justifyContent: 'center' }}>06 — Contact</div>
          <h2 className="section-title">
            Got a Vision?<br />
            <span className="gradient-text" style={{
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Let's Build It.</span>
          </h2>
          <p className="section-subtitle">
            Open to exciting backend engineering opportunities and collaborations
            in FinTech, banking, and distributed systems.
          </p>
        </div>
        <div className="contact-links reveal">
          <a
            href="#"
            className="contact-link"
            onClick={(e) => {
              e.preventDefault()
              // Decode phone number only on click (anti-scraper)
              const p = atob('KzkxIDg3OTA3Njk2MDM=')
              e.currentTarget.querySelector('.phone-text').textContent = p
              e.currentTarget.href = `tel:${p.replace(/\s/g, '')}`
              e.currentTarget.onclick = null
            }}
          >
            📱 <span className="phone-text">+91 87XX XXX X03 — Click to reveal</span>
          </a>
          <a href="https://linkedin.com/in/beenamukiri" target="_blank" rel="noopener noreferrer" className="contact-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </a>
          <a href="https://github.com/beenamukiri" target="_blank" rel="noopener noreferrer" className="contact-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            GitHub
          </a>
          <a href="https://instagram.com/beenamukiri" target="_blank" rel="noopener noreferrer" className="contact-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
            Instagram
          </a>
          <a href="mailto:beenamukiri@gmail.com" className="contact-link">
            ✉️ Email Me
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          © {new Date().getFullYear()} Mukiri Kamala Beena. All rights reserved.
        </div>
        <div className="footer-socials">
          <a href="https://linkedin.com/in/beenamukiri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href="https://github.com/beenamukiri" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </a>
          <a href="https://instagram.com/beenamukiri" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
          </a>
        </div>
      </footer>

      {/* AI Chatbot */}
      <button
        className={`chatbot-fab ${chatOpen ? 'active' : ''}`}
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Toggle AI Chat"
      >
        {chatOpen ? '✕' : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1a2 2 0 0 1-2 2h-1v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1H5a2 2 0 0 1-2-2v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
            <circle cx="9" cy="13" r="1.25" fill="currentColor" stroke="none" />
            <circle cx="15" cy="13" r="1.25" fill="currentColor" stroke="none" />
            <path d="M10 17h4" />
          </svg>
        )}
      </button>

      {chatOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <div className="chatbot-name">Beena's AI Assistant</div>
                <div className="chatbot-status">● Online</div>
              </div>
            </div>
          </div>
          <div className="chatbot-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className={`chat-bubble${msg.isTyping ? ' typing' : ''}`} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask about Beena's skills, experience..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleChatKeyDown}
            />
            <button className="chatbot-send" onClick={handleChatSend}>→</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
