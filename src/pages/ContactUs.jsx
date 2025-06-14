import React, { useState } from "react";
import { Mail, Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const ContactUs = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((eObj) => ({ ...eObj, [e.target.name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required.";
    if (!form.email.trim()) err.email = "Email is required.";
    else if (!validateEmail(form.email)) err.email = "Please enter a valid email.";
    if (!form.message.trim()) err.message = "Message is required.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex flex-col">
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Let’s Connect
          </h1>
          <p className="text-lg text-blue-100">
            Have questions, suggestions, or want to collaborate? We’re just a message away.
          </p>
        </div>
      </section>

      
      <section className="flex-1 flex flex-col justify-center items-center gap-8 px-4 pb-20">
        
        <div className="flex flex-col items-center justify-center mb-4">
          <Users className="w-16 h-16 text-cyan-400 mb-2" />
          <span className="text-blue-100 font-semibold">
            Secure & Connected
          </span>
        </div>
        
        <div className="flex justify-center w-full">
          <div className="flex-1 max-w-lg w-full">
            <div className="bg-slate-800/80 rounded-2xl shadow-xl p-8 border border-blue-600/20">
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label className="block text-sm text-blue-200 mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className={`w-full px-4 py-2 rounded-lg bg-slate-900 border ${errors.name ? "border-red-500" : "border-blue-700"} focus:border-blue-400 outline-none text-white`}
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.name && <span className="text-red-400 text-xs">{errors.name}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-blue-200 mb-1" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className={`w-full px-4 py-2 rounded-lg bg-slate-900 border ${errors.email ? "border-red-500" : "border-blue-700"} focus:border-blue-400 outline-none text-white`}
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-blue-200 mb-1" htmlFor="subject">
                    Subject <span className="text-blue-400 text-xs">(optional)</span>
                  </label>
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-blue-700 focus:border-blue-400 outline-none text-white"
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm text-blue-200 mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className={`w-full px-4 py-2 rounded-lg bg-slate-900 border ${errors.message ? "border-red-500" : "border-blue-700"} focus:border-blue-400 outline-none text-white resize-vertical`}
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="text-red-400 text-xs">{errors.message}</span>}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 hover:from-blue-500 hover:to-cyan-400 transition-all font-semibold text-lg shadow-lg"
                >
                  Send Message
                </button>
                {submitted && (
                  <div className="mt-4 text-center text-green-400 font-medium">
                    Thank you! Your message has been sent.
                  </div>
                )}
              </form>
              
              <div className="mt-8 flex flex-col gap-4 text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>Email: <a href="mailto:gunjanagrawal582@gmail.com" className="underline hover:text-blue-400 transition-colors">gunjanagrawal582@gmail.com</a></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Project by: Gunjan Agrawal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;