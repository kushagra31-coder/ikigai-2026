'use client';

import { Container } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Button } from '@/components/primitives/button';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, ShieldAlert, Zap, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const { contact } = PUBLIC_CONTENT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground mt-20 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative py-24 md:py-32 border-b border-white/5">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl relative z-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-primary mb-8">
              <Zap className="w-4 h-4" />
              <span>Support & Inquiries</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
              Contact<br/>Operations
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Direct line to the IKIGAI management team. Our dedicated support grid guarantees a response within 24 hours.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-24 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
        >
          
          {/* Contact Information Side */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-semibold tracking-tighter mb-8 text-white flex items-center gap-3">
                <MapPin className="w-8 h-8 text-primary" />
                Direct Channels
              </h2>
              
              <div className="flex flex-col gap-6">
                
                {/* Email Card */}
                <a href={`mailto:${contact.email}`} className="group block relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-black/50 text-primary border border-white/5 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Email Routing</div>
                      <div className="text-lg font-medium text-white group-hover:text-primary transition-colors">{contact.email}</div>
                    </div>
                  </div>
                </a>

                {/* Phone Card */}
                <a href={`tel:${contact.phone}`} className="group block relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-black/50 text-primary border border-white/5 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Emergency Phone</div>
                      <div className="text-lg font-medium text-white group-hover:text-primary transition-colors">{contact.phone}</div>
                    </div>
                  </div>
                </a>

              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-primary" />
                <div className="text-xs font-mono uppercase tracking-widest text-primary">Response Protocol</div>
              </div>
              <ul className="text-sm text-muted-foreground flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                  <span><strong className="text-white">General Inquiries:</strong> 24h SLA response time</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Technical Support:</strong> 12h SLA response time</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Emergency Reports:</strong> Immediate priority routing</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="p-8 md:p-12 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl relative">
              
              <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                <MessageSquare className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-semibold tracking-tighter text-white">Submit Ticket</h2>
              </div>

              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-2 group">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary focus:bg-primary/5 transition-all placeholder:text-white/20" 
                        placeholder="John Doe" 
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2 group">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary focus:bg-primary/5 transition-all placeholder:text-white/20" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col gap-2 group">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Subject</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary focus:bg-primary/5 transition-all placeholder:text-white/20" 
                    placeholder="Regarding submission error..." 
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2 group mb-4">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Message</label>
                  <textarea 
                    rows={5} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary focus:bg-primary/5 transition-all resize-none placeholder:text-white/20" 
                    placeholder="Please describe the issue in detail..." 
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2 uppercase">
                    Transmit Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>

        </motion.div>
      </Container>
    </div>
  );
}
