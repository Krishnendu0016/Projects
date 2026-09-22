import React, { useState } from "react";
import Button from "./Button";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submittedData, setSubmittedData] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedData(formData);
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-heading">
        <p className="eyebrow">Controlled form</p>
        <h2>Let&apos;s connect</h2>
        <p>Each field is controlled by React state and reflected below after submission.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required />

        <Button text="Submit" variant="primary" type="submit" />
      </form>

      {submittedData && (
        <aside className="submitted-data" aria-live="polite">
          <div className="submitted-heading">
            <p className="eyebrow">State update</p>
            <h3>Submitted data</h3>
          </div>
          <dl>
            <div><dt>Name</dt><dd>{submittedData.name}</dd></div>
            <div><dt>Email</dt><dd>{submittedData.email}</dd></div>
            <div><dt>Message</dt><dd>{submittedData.message}</dd></div>
          </dl>
        </aside>
      )}
    </section>
  );
}

export default Form;
