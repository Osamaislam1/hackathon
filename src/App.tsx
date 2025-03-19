import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaGem, FaCalendarAlt, FaUsers, FaAward, FaChevronRight, FaArrowRight,
  FaBrain, FaRocket, FaGift, FaBookOpen, FaTerminal, FaGlobe, FaUserFriends,
  FaLightbulb, FaStar, FaCheckCircle, FaClock, FaUpload, FaBars, FaTimes,
} from 'react-icons/fa';
import { BsHourglassSplit } from 'react-icons/bs';

/* ==============================
   Countdown Component
   ============================== */
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date('2025-03-30');
      const diff = target.getTime() - now.getTime();

      if (diff < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" }
  ];

  return (
    <div className="flex justify-center gap-6">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="relative">
          <div className="card min-w-[140px] glow-card backdrop-blur-lg bg-gray-900/40 p-8 text-center">
            <div className="text-5xl font-bold gradient-text mb-2">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400">
              {unit.label}
            </div>
          </div>
          {index < timeUnits.length - 1 && (
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-cyan-500 text-2xl font-bold">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ==============================
   FadeInSection Wrapper
   ============================== */
const FadeInSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

/* ==============================
   Reusable Cards
   ============================== */
const CategoryCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="card glow-card"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

/* ==============================
   Navbar (Improved)
   ============================== */
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Categories", href: "#categories" },
    { name: "Timeline", href: "#timeline" },
    { name: "Prizes", href: "#prizes" },
    { name: "Judges", href: "#judges" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" }
  ];

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple-700 via-cyan-600 to-blue-500 bg-opacity-90 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-white text-2xl font-extrabold">
          Hackathon.dev
        </div>
        <div className="md:hidden">
          <button onClick={handleToggle} aria-label="Toggle Menu" className="text-white">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <motion.li
              key={link.name}
              whileHover={{ scale: 1.05 }}
              className="text-white font-medium"
            >
              <a
                href={link.href}
                className="hover:underline transition"
                onClick={handleClose}
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-700 via-cyan-600 to-blue-500 border-t border-gray-800">
          <ul className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-white hover:underline transition"
                  onClick={handleClose}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

/* ==============================
   Hero Section (Creative Layout)
   ============================== */
const HeroSection = () => (
  <section
    className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black pt-16 overflow-hidden"
  >
    {/* Animated Background Blobs */}
    <motion.div
      className="absolute -top-20 -left-20 w-80 h-80 bg-purple-700 rounded-full opacity-30"
      animate={{ scale: [1, 1.3, 1], rotate: [0, 20, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-600 rounded-full opacity-30"
      animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="relative z-10 text-center px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
        Ignite Your Code
      </h1>
      <motion.h2 
        className="text-3xl md:text-5xl font-bold gradient-text mb-8"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        The World's Largest Hackathon
      </motion.h2>
      <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto">
        Join thousands of developers worldwide in this groundbreaking
        event where innovation meets opportunity. Build the next big 
        thing and compete for life-changing prizes. This virtual hackathon
        will take place on a date to be determined, with over $1 million
        in prizes across multiple categories.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.a 
          href="#register"
          className="bg-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-cyan-600 transition inline-flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Now <FaChevronRight className="ml-2" />
        </motion.a>
        <motion.a 
          href="#about"
          className="text-cyan-300 hover:text-cyan-100 flex items-center gap-2 px-8 py-4 rounded-full border border-cyan-500 hover:bg-cyan-500/20 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More <FaArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </div>
  </section>
);

/* ==============================
   Judges Slider (Draggable)
   ============================== */
const JudgesSlider = () => {
  const sliderRef = React.useRef(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (sliderRef.current) {
      setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
    }
  }, []);

  const judges = [
    { name: "levelsio", twitter: "@levelsio", image: "/public/assets/images/levelsio.jpg" },
    { name: "Logan Kilpatrick", twitter: "@OfficialLoganK", image: "/public/assets/images/loganK.jpg" },
    { name: "sarah guo // conviction", twitter: "@saranormous", image: "/public/assets/images/saranormous.jpg" },
    { name: "Theo - t3.gg", twitter: "@theo", image: "/public/assets/images/theo.jpg" },
    { name: "Evan You", twitter: "@youyuxi", image: "/public/assets/images/youyuxi.jpg" },
    { name: "KP", twitter: "@thisiskp_", image: "/public/assets/images/thisiskp_.jpg" },
  ];

  return (
    <div className="overflow-hidden cursor-grab">
      <motion.div 
         ref={sliderRef}
         drag="x"
         dragConstraints={{ right: 0, left: -width }}
         className="flex space-x-8 py-4"
      >
         {judges.map((judge, index) => (
           <motion.div key={index} className="min-w-[250px] card glow-card p-4 text-center">
             <img 
               src={judge.image} 
               alt={judge.name} 
               className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
             />
             <h3 className="text-xl font-bold mb-1">{judge.name}</h3>
             <p className="text-cyan-300">{judge.twitter}</p>
           </motion.div>
         ))}
      </motion.div>
    </div>
  );
};

/* ==============================
   Sponsors Slider (Draggable)
   ============================== */
const SponsorsSlider = () => {
  const sliderRef = React.useRef(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (sliderRef.current) {
      setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
    }
  }, []);

  const sponsors = [
    { id: 1, name: "Supabase", logo: "/public/assets/images/supabase.jpg" },
    { id: 2, name: "Netlify", logo: "/public/assets/images/Netlify.png" },
    { id: 3, name: "CloudflareDev", logo: "/public/assets/images/CloudflareDev.jpg" },
    { id: 4, name: "Sentry", logo: "/public/assets/images/getsentry.png" },
    { id: 5, name: "Loops", logo: "/public/assets/images/loops.jpg" },
    { id: 6, name: "AlgoFoundation", logo: "/public/assets/images/AlgoFoundation.jpg" },
  ];

  return (
    <div className="overflow-hidden cursor-grab">
      <motion.div 
         ref={sliderRef}
         drag="x"
         dragConstraints={{ right: 0, left: -width }}
         className="flex space-x-8 items-center py-4"
      >
         {sponsors.map((sponsor) => (
           <motion.div key={sponsor.id} className="min-w-[200px] card glow-card p-4 flex items-center justify-center">
             <img 
               src={sponsor.logo} 
               alt={sponsor.name} 
               className="max-h-20 object-contain"
             />
           </motion.div>
         ))}
      </motion.div>
    </div>
  );
};

/* ==============================
   Main App Component
   ============================== */
function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <HeroSection />

      {/* About Section */}
      <FadeInSection>
        <section id="about" className="py-20 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                About the Hackathon
              </h2>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Join thousands of developers worldwide in this groundbreaking
                event where innovation meets opportunity. Build the next big 
                thing and compete for life-changing prizes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="card glow-card">
                  <FaUsers className="w-8 h-8 text-cyan-400 mb-2" />
                  <h3 className="text-xl font-bold">5000+</h3>
                  <p className="text-gray-400">Participants</p>
                </div>
                <div className="card glow-card">
                  <FaGem className="w-8 h-8 text-purple-400 mb-2" />
                  <h3 className="text-xl font-bold">$1M+</h3>
                  <p className="text-gray-400">In Prizes</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                alt="Hackathon participants"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Categories Section */}
      <FadeInSection>
        <section id="categories" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Hackathon Categories
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <CategoryCard
                icon={FaGlobe}
                title="Web3 & Blockchain"
                description="Build the future of decentralized applications"
              />
              <CategoryCard
                icon={FaBrain}
                title="AI & Machine Learning"
                description="Create intelligent solutions using cutting-edge AI"
              />
              <CategoryCard
                icon={FaTerminal}
                title="Developer Tools"
                description="Craft the next generation of development tools"
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Timeline Section */}
      <FadeInSection>
        <section id="timeline" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Event Timeline
              </h2>
              <p className="text-xl text-gray-400">
                Mark your calendar for these important dates
              </p>
            </div>

            <div className="mb-16">
              <CountdownTimer />
            </div>

            <div className="relative">
              <div
                className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r 
                           from-cyan-500 via-purple-500 to-cyan-500 transform -translate-y-1/2"
              />
              <div className="grid md:grid-cols-4 gap-8 relative">
                {[
                  {
                    icon: FaCalendarAlt,
                    title: "Registration Opens",
                    date: "March 1",
                    description: "Early bird registration begins"
                  },
                  {
                    icon: FaRocket,
                    title: "Kickoff Event",
                    date: "March 15",
                    description: "Virtual opening ceremony"
                  },
                  {
                    icon: FaClock,
                    title: "Submission Deadline",
                    date: "March 30",
                    description: "Project submissions close"
                  },
                  {
                    icon: FaGem,
                    title: "Winners Announced",
                    date: "April 5",
                    description: "Live awards ceremony"
                  }
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    className="relative pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2
                                 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500
                                 shadow-[0_0_20px_rgba(0,255,255,0.5)] z-10"
                    />
                    <div className="card glow-card text-center h-full">
                      <event.icon className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-2xl font-bold gradient-text mb-2">{event.date}</p>
                      <p className="text-gray-400 text-sm">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Prizes Section */}
      <FadeInSection>
        <section id="prizes" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Prizes & Rewards
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { place: "1st Place", prize: "$500,000", icon: FaGem },
                { place: "2nd Place", prize: "$300,000", icon: FaAward },
                { place: "3rd Place", prize: "$200,000", icon: FaGift }
              ].map((prize, index) => (
                <motion.div
                  key={index}
                  className="card glow-card text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <prize.icon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-2xl font-bold mb-2">{prize.place}</h3>
                  <p className="text-3xl font-bold gradient-text">
                    {prize.prize}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Judges & Mentors Section with Slider */}
      <FadeInSection>
        <section id="judges" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Judges & Mentors
            </h2>
            <JudgesSlider />
          </div>
        </section>
      </FadeInSection>

      {/* Why Participate Section */}
      <FadeInSection>
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Why Participate?
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: FaBookOpen,
                  title: "Learn & Grow",
                  description: "Access cutting-edge workshops"
                },
                {
                  icon: FaUserFriends,
                  title: "Network",
                  description: "Connect with industry leaders"
                },
                {
                  icon: FaLightbulb,
                  title: "Innovate",
                  description: "Build groundbreaking solutions"
                },
                {
                  icon: FaStar,
                  title: "Win Big",
                  description: "Compete for amazing prizes"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="card glow-card text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* How to Participate Section */}
      <FadeInSection>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              How to Participate
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaCheckCircle,
                  title: "Register",
                  description: "Sign up and create your team"
                },
                {
                  icon: BsHourglassSplit,
                  title: "Build",
                  description: "48 hours to create your project"
                },
                {
                  icon: FaUpload,
                  title: "Submit",
                  description: "Present your solution to judges"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="card glow-card text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Sponsors Section with Slider */}
      <FadeInSection>
        <section id="sponsors" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Our Sponsors
            </h2>
            <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
              Special thanks to our generous sponsors who make this event possible.
            </p>
            <SponsorsSlider />
          </div>
        </section>
      </FadeInSection>

      {/* FAQ Section */}
      <FadeInSection>
        <section id="faq" className="py-20 container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Who can participate in the hackathon?",
                answer:
                  "Anyone with a passion for coding and innovation, including students, professionals, and entrepreneurs."
              },
              {
                question: "Is there a participation fee?",
                answer:
                  "No, it's free to register and participate in the hackathon."
              },
              {
                question: "Do I need a team?",
                answer:
                  "You can join solo or form a team with up to 4 members."
              },
              {
                question: "How do I submit my project?",
                answer:
                  "You will receive submission details via email after you register. Projects must be submitted by the deadline."
              }
            ].map((faqItem, index) => (
              <div key={index} className="card glow-card p-6">
                <h3 className="font-semibold text-lg mb-2 text-cyan-300">
                  {faqItem.question}
                </h3>
                <p className="text-gray-400">{faqItem.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* Contact Section */}
      <FadeInSection>
        <section id="contact" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Contact Us
            </h2>
            <div className="max-w-xl mx-auto">
              <form className="space-y-6 card glow-card p-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-300 mb-2 font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 mb-2 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-300 mb-2 font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full p-3 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-cyan-500 px-6 py-3 rounded text-white font-semibold hover:bg-cyan-600 transition w-full"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 mt-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Hackathon.dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
