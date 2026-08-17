import ProjectCard from '../components/ProjectCard.jsx'

/* Prop drilling demo 2: Projects receives projects array,
   ProjectsGrid receives it and passes each project object to ProjectCard */

function ProjectsGrid({ projects }) {
  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          year={project.year}
          description={project.description}
          highlights={project.highlights}
          stack={project.stack}
          link={project.link}
          accent={project.accent}
          image={project.image}
        />
      ))}
    </div>
  )
}

function Projects({ projects }) {
  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">things I've built</span>
          <h2 className="section-title">Personal Projects</h2>
        </div>
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  )
}

export default Projects
