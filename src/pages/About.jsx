import Skills from '../components/Skills.jsx'

/* Prop drilling demo: About receives skillsData and passes to Skills,
   which passes individual groups down to SkillGroup (2 levels deep) */

const skillsData = [
  {
    heading: 'Languages',
    tags: [
      { name: 'C++', color: 'var(--coral)' },
      { name: 'Java', color: 'var(--peach)' },
      { name: 'Python', color: 'var(--sage)' },
      { name: 'JavaScript', color: 'var(--sky)' },
      { name: 'SQL', color: 'var(--lavender)' },
      { name: 'R', color: 'var(--blush)' },
      { name: 'HTML5', color: 'var(--mint)' },
      { name: 'CSS3', color: 'var(--sand)' },
    ],
  },
  {
    heading: 'Frameworks & Libraries',
    tags: [
      { name: 'React.js', color: 'var(--coral)' },
      { name: 'Node.js', color: 'var(--sage)' },
      { name: 'FastAPI', color: 'var(--peach)' },
      { name: 'Express.js', color: 'var(--sky)' },
      { name: 'Tailwind CSS', color: 'var(--lavender)' },
      { name: 'NextAuth', color: 'var(--blush)' },
    ],
  },
  {
    heading: 'Databases & Tools',
    tags: [
      { name: 'MongoDB', color: 'var(--coral)' },
      { name: 'MySQL', color: 'var(--sage)' },
      { name: 'Git', color: 'var(--peach)' },
      { name: 'Docker', color: 'var(--sky)' },
      { name: 'Docker Compose', color: 'var(--lavender)' },
    ],
  },
]

const educationData = [
  {
    school: 'National Institute of Technology, Warangal',
    degree: 'B.Tech in Computer Science and Engineering',
    start: '2024',
    end: '2028',
    badge: 'CGPA: 9.49',
    accent: 'var(--coral)',
  },
  {
    school: 'SR EDU Centre',
    degree: 'Intermediate (Class XII) – CBSE',
    start: '2024',
    end: null,
    badge: '96.4%',
    accent: 'var(--sage)',
  },
  {
    school: 'National High School',
    degree: 'Secondary School (Class X)',
    start: '2022',
    end: null,
    badge: 'CGPA: 9.8',
    accent: 'var(--lavender)',
  },
]

const timelineData = [
  {
    title: 'Member, EdTech & Design Teams',
    org: 'CSES Society – NIT Warangal',
    time: '2025 – Present',
    color: 'var(--coral)',
  },
  {
    title: 'Executive Member',
    org: 'Painting and Animation Club – NIT Warangal',
    time: '2024 – Present',
    color: 'var(--sage)',
  },
  {
    title: 'Open Source Contributor',
    org: 'Merged contribution to Skillware project — Mermaid architecture diagrams',
    time: '2026',
    color: 'var(--lavender)',
  },
  {
    title: 'LeetCode Milestone',
    org: 'Solved 270+ DSA problems',
    time: '2026',
    color: 'var(--peach)',
  },
  {
    title: 'Internshala Campus Ambassador',
    org: 'Campus outreach initiatives',
    time: '2026',
    color: 'var(--sky)',
  },
]

const softSkills = [
  { name: 'Public Speaking', color: 'var(--coral)' },
  { name: 'Workshop Coordination', color: 'var(--sage)' },
  { name: 'Leadership', color: 'var(--lavender)' },
  { name: 'Poster Designing', color: 'var(--peach)' },
  { name: 'Team Collaboration', color: 'var(--sky)' },
]

function About() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">a little about me</span>
          <h2 className="section-title">Education & Story</h2>
        </div>

        <div className="about-grid">
          {/* Education */}
          <article className="about-card edu-card">
            <h3 className="card-title">Education</h3>
            <ul className="edu-list">
              {educationData.map((edu) => (
                <li key={edu.school} className="edu-item">
                  <div className="edu-accent" style={{ '--accent-color': edu.accent }}></div>
                  <div className="edu-content">
                    <h4>{edu.school}</h4>
                    <p>{edu.degree}</p>
                    <time dateTime={edu.start}>{edu.start}</time>
                    {edu.end && <> – <time dateTime={edu.end}>{edu.end}</time></>}
                    <span className="edu-badge">{edu.badge}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Skills — prop drilling demo */}
          <Skills skillsData={skillsData} />

          {/* Positions & Achievements */}
          <article className="about-card pos-card">
            <h3 className="card-title">Positions & Achievements</h3>
            <div className="timeline">
              {timelineData.map((item) => (
                <div key={item.title} className="timeline-item">
                  <div className="timeline-dot" style={{ '--dot-color': item.color }}></div>
                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.org}</p>
                    <time>{item.time}</time>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Soft Skills */}
          <article className="about-card soft-card">
            <h3 className="card-title">Soft Skills</h3>
            <ul className="soft-list">
              {softSkills.map((skill) => (
                <li key={skill.name}>
                  <span className="soft-icon" style={{ '--icon-bg': skill.color }}>★</span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default About
