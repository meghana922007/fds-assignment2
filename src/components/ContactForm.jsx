import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (data) => {
    const errs = {}
    if (!data.name.trim()) errs.name = 'Name is required'
    if (!data.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errs.email = 'Please enter a valid email'
    }
    if (!data.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...formData, [name]: value }
    setFormData(next)
    setErrors(validate(next))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, message: true, subject: true })

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTouched({})
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  const isValid =
    formData.name.trim() &&
    formData.email.trim() &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    formData.message.trim()

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {submitted && (
        <div
          style={{
            background: 'var(--sage)',
            color: 'var(--charcoal)',
            padding: 'var(--space-sm)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-md)',
            fontWeight: 600,
          }}
        >
          ✅ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name" className="form-label">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-input ${touched.name && errors.name ? 'error' : ''}`}
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="form-label">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="form-input"
          placeholder="Project Collaboration"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          id="message"
          name="message"
          className={`form-input form-textarea ${touched.message && errors.message ? 'error' : ''}`}
          rows="5"
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-required="true"
        ></textarea>
        {touched.message && errors.message && (
          <span className="error-message">{errors.message}</span>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-full" disabled={!isValid}>
        Send Message
        <span className="btn-arrow" aria-hidden="true">→</span>
      </button>
    </form>
  )
}

export default ContactForm
