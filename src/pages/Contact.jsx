import ContactForm from '../components/ContactForm.jsx'

function Contact() {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">let's connect</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-lead">
              Whether it's a project idea, a hackathon team-up, or just a chat about tech — my inbox is always open.
            </p>

            <address className="contact-details">
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">✉</span>
                <div>
                  <span className="contact-label">Email</span>
                  <a href="mailto:meghanareddypinikeshi@gmail.com">meghanareddypinikeshi@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">@</span>
                <div>
                  <span className="contact-label">Institute</span>
                  <a href="mailto:pm24csb0a54@student.nitw.ac.in">pm24csb0a54@student.nitw.ac.in</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">☎</span>
                <div>
                  <span className="contact-label">Phone</span>
                  <a href="tel:+919182845947">+91-9182845947</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">⌂</span>
                <div>
                  <span className="contact-label">Location</span>
                  <span>NIT Warangal, Telangana, India</span>
                </div>
              </div>
            </address>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export default Contact
