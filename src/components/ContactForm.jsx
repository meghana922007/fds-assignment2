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
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

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
    if (serverError) setServerError('')
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, message: true, subject: true })
    setServerError('')

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Server rejected submission.')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTouched({})
      setErrors({})
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error('Contact submit error:', err)
      setServerError(err.message || 'Unable to reach backend server.')
    } finally {
      setSubmitting(false)
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
          ✅ Message sent successfully! Thank you for reaching out.
        </div>
      )}

      {serverError && (
        <div
          style={{
            background: '#fed7d7',
            color: '#9b2c2c',
            padding: 'var(--space-sm)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-md)',
            fontWeight: 600,
          }}
        >
          ❌ {serverError}
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
          disabled={submitting}
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
          disabled={submitting}
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
          disabled={submitting}
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
          disabled={submitting}
        ></textarea>
        {touched.message && errors.message && (
          <span className="error-message">{errors.message}</span>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-full" disabled={!isValid || submitting}>
        {submitting ? 'Sending Message...' : 'Send Message'}
        <span className="btn-arrow" aria-hidden="true">→</span>
      </button>
    </form>
  )
}

export default ContactForm
