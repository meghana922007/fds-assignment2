/* Skills component receives all skills data via props (level 1)
   and drills down individual skill groups to SkillGroup (level 2) */

function SkillGroup({ heading, tags }) {
  return (
    <div className="skill-group">
      <h4 className="skill-heading">{heading}</h4>
      <div className="skill-tags">
        {tags.map((tag) => (
          <span key={tag.name} className="skill-tag" style={{ '--tag-bg': tag.color }}>
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function Skills({ skillsData }) {
  return (
    <article className="about-card skills-card">
      <h3 className="card-title">Technical Skills</h3>
      {skillsData.map((group) => (
        <SkillGroup key={group.heading} heading={group.heading} tags={group.tags} />
      ))}
    </article>
  )
}

export default Skills
