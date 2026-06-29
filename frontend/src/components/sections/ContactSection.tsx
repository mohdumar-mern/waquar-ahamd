"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "@/components/ui/Button";
import { api } from "@/utils/api";
import { apiConfig } from "@/config/api.config";
import { siteConfig } from "@/config/site.config";
import type { ContactPayload } from "@/types/api.types";

const BUDGETS = ["<$500","$500–$2K","$2K–$5K","$5K+","Let's Discuss"];
const BUDGET_VALUES = ["<500","500-2000","2000-5000","5000+","discuss"];

export default function ContactSection() {
  const [form, setForm] = useState<ContactPayload & { budget: string }>({
    name: "", email: "", subject: "", message: "", budget: "discuss",
  });
  const [loading,  setLoading ] = useState(false);
  const [success,  setSuccess ] = useState(false);
  const [error,    setError   ] = useState("");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await api(apiConfig.endpoints.contact, { method: "POST", body: JSON.stringify(form) } as RequestInit);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Please email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-black border-t border-white/5 py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[9px] tracking-[6px] text-racing-red mb-6">GET IN TOUCH</p>
          <h2 className="text-5xl lg:text-7xl font-black uppercase leading-tight mb-6">
            Let&apos;s Build<br />
            <span style={{ WebkitTextStroke: "1px #e8000d", color: "transparent" }}>Something</span><br />
            Epic
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl mx-auto">
            Available for freelance projects, studio collaborations, and long-term partnerships in automotive 3D animation.
          </p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 border border-racing-red/30 bg-racing-red/5"
          >
            <div className="text-5xl mb-6">🏎️</div>
            <p className="text-[10px] tracking-[6px] text-racing-red mb-3">MESSAGE RECEIVED</p>
            <p className="text-white/50 text-sm">Waquar will be in touch soon. Expect something epic.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {(["name","email"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-[8px] tracking-[4px] text-white/30 mb-2">{field.toUpperCase()} *</label>
                  <input
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-racing-red transition-colors"
                    placeholder={field === "name" ? "Your name" : "your@email.com"}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-[8px] tracking-[4px] text-white/30 mb-2">SUBJECT *</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-racing-red transition-colors"
                placeholder="Project subject"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-[8px] tracking-[4px] text-white/30 mb-2">BUDGET RANGE</label>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b, i) => (
                  <button
                    key={b}
                    onClick={() => setForm((f) => ({ ...f, budget: BUDGET_VALUES[i] }))}
                    className={`text-[8px] tracking-[2px] px-4 py-2 border transition-all duration-200 ${
                      form.budget === BUDGET_VALUES[i]
                        ? "border-racing-red text-white bg-racing-red/10"
                        : "border-white/10 text-white/40 hover:border-white/30"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[8px] tracking-[4px] text-white/30 mb-2">MESSAGE *</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-racing-red transition-colors resize-none"
                placeholder="Tell Waquar about your project..."
              />
            </div>

            {error && <p className="text-racing-red text-xs tracking-wider">{error}</p>}

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button size="lg" loading={loading} onClick={handleSubmit}>
                SEND MESSAGE
              </Button>
              <a href={`mailto:${siteConfig.email}`} className="text-[9px] tracking-[3px] text-white/30 hover:text-racing-red transition-colors">
                OR EMAIL DIRECTLY →
              </a>
            </div>
          </motion.div>
        )}

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mt-20 pt-10 border-t border-white/5"
        >
          {Object.entries(siteConfig.socials).map(([key, href]) => (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer"
               className="text-[8px] tracking-[4px] text-white/20 hover:text-racing-red transition-colors uppercase">
              {key}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
