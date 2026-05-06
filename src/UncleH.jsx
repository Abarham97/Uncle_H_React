import { useState, useEffect, useRef } from "react";
import config from "./config";

// ─── DATA ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Evaluate", href: "#evaluate" },
  { label: "Contact",  href: "#contact" },
];

const STRIP_ITEMS = [
  "Leather Repair","Vinyl Restoration","Burn Repair","Color Matching",
  "Dashboard Repair","Steering Wheel Restore","Deep Cleaning","Scuff Removal",
];

const SERVICES = [
  { num:"01", icon:"🪡", title:"Leather Repair",           desc:"Cracks, tears, and holes in leather seats and surfaces restored to like-new condition." },
  { num:"02", icon:"🪡", title:"Vinyl Repair",             desc:"Full vinyl repair and restoration for seats, door panels, dashboards, and more." },
  { num:"03", icon:"🚬", title:"Burn Repair",              desc:"Cigarette burns, heat damage, and melt marks expertly repaired and blended." },
  { num:"04", icon:"🎨", title:"Color Restoration",        desc:"Faded or worn interiors revived with precision dyeing and custom color matching." },
  { num:"05", icon:"✂️", title:"Scuff & Scratch Removal",  desc:"Surface scuffs and scratches buffed and treated to restore a clean, smooth finish." },
  { num:"06", icon:"🚗", title:"Dashboard & Door Panels",  desc:"Cracked or warped dashboards and panels repaired and refinished professionally." },
  { num:"07", icon:"⭕", title:"Steering Wheel Restoration",desc:"Worn or peeling steering wheels brought back to life with exact material matching." },
  { num:"08", icon:"💺", title:"Seatbelt Stains",           desc:"Stubborn seatbelt stains cleaned and restored to a fresh, like-new appearance." },
  { num:"09", icon:"🫟", title:"Seat Stains",               desc:"Deep-set seat stains lifted and treated across leather, vinyl, and fabric surfaces." },
  { num:"10", icon:"🧵", title:"Stitching",                 desc:"Leather, vinyl, and cloth stitching repaired or replaced with precision thread matching." },
];

const EVAL_STEPS = [
  { num:"01", title:"Take a Photo",          desc:"Capture clear, close-up shots of the damaged or worn area — seats, dash, door panels, or any surface." },
  { num:"02", title:"Send It To Us",         desc:"Send your photos via email or WhatsApp. No need to bring the car in — we assess remotely." },
  { num:"03", title:"Get a Recommendation",  desc:"We'll review the damage, explain what can be done, and give you an honest expert opinion with no obligation." },
];

const CONTACT_ITEMS = [
  { icon:"📞", label:"Phone / WhatsApp", val:"(650) 732-5652" },
  { icon:"✉️", label:"Email",            val:"Support@unclehinterior.com" },
];

const SERVICE_OPTIONS = [
  "Leather Repair (Cracks / Tears)",
  "Vinyl Repair & Restoration",
  "Burn Repair",
  "Color Restoration & Dyeing",
  "Scuff & Scratch Removal",
  "Dashboard & Door Panel Repair",
  "Steering Wheel Restoration",
  "Deep Cleaning & Conditioning",
  "Plastic Trim Repair",
  "Custom Color Matching",
  "Multiple / Not Sure",
];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@400;600;700&display=swap');
  :root {
    --red: #cc1414; --red-bright: #e82020;
    --silver: #c0c0c0; --silver-light: #e8e8e8;
    --dark: #0a0a0a; --dark2: #111111; --dark3: #1a1a1a; --dark4: #222222;
    --text: #d0d0d0;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--dark); color: var(--text); font-family: 'Barlow', sans-serif; overflow-x: hidden; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, width:"100%", zIndex:100,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"18px 60px",
        background:"linear-gradient(180deg,rgba(0,0,0,0.95) 0%,transparent 100%)",
        backdropFilter:"blur(8px)",
        borderBottom:"1px solid rgba(204,20,20,0.2)",
      }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:4, color:"#fff" }}>
          UNCLE <span style={{ color:"var(--red)" }}>H</span>
        </div>

        {/* Desktop links */}
        <ul style={{ display:"flex", gap:36, listStyle:"none" }}>
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} style={l.label === "Book Now" ? navCtaStyle : navLinkStyle}
                 onMouseEnter={e => e.target.style.color = "var(--red)"}
                 onMouseLeave={e => e.target.style.color = l.label === "Book Now" ? "#fff" : "var(--silver)"}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" style={navCtaStyle}>Book Now</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button onClick={toggleMenu} aria-label="Open menu" style={{
          display:"none", flexDirection:"column", justifyContent:"center", gap:5,
          width:36, height:36, cursor:"pointer", background:"none", border:"none", padding:4,
          // shown via media query override below — we use a class trick
        }} className="nav-hamburger">
          <span style={{ display:"block", width:"100%", height:2, background:"var(--silver)", borderRadius:2,
            transition:"all 0.25s",
            transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display:"block", width:"100%", height:2, background:"var(--silver)", borderRadius:2,
            transition:"all 0.25s", opacity: open ? 0 : 1 }} />
          <span style={{ display:"block", width:"100%", height:2, background:"var(--silver)", borderRadius:2,
            transition:"all 0.25s",
            transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:"fixed", inset:0, zIndex:99,
          background:"rgba(10,10,10,0.97)",
          display:"flex", flexDirection:"column", alignItems:"center",
          justifyContent:"center", gap:40,
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={closeMenu} style={{
              fontFamily:"'Bebas Neue',sans-serif", fontSize:36,
              letterSpacing:4, color:"var(--silver)", textDecoration:"none",
            }}>{l.label}</a>
          ))}
          <a href="#contact" onClick={closeMenu} style={{
            fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:4,
            background:"var(--red)", color:"#fff", textDecoration:"none",
            padding:"14px 40px",
            clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
          }}>Book Now</a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          nav ul { display: none !important; }
          .nav-hamburger { display: flex !important; }
          nav { padding: 16px 24px !important; }
        }
      `}</style>
    </>
  );
}

const navLinkStyle = {
  fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:600,
  letterSpacing:3, textTransform:"uppercase", color:"var(--silver)",
  textDecoration:"none", transition:"color 0.2s",
};
const navCtaStyle = {
  ...navLinkStyle, color:"#fff",
  background:"var(--red)", padding:"10px 24px",
  clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
};

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden", padding:"120px 60px 80px",
    }}>
      {/* Backgrounds */}
      <div style={{
        position:"absolute", inset:0,
        background:`
          radial-gradient(ellipse 60% 80% at 70% 50%, rgba(204,20,20,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(204,20,20,0.04) 0%, transparent 60%),
          linear-gradient(135deg,#0a0a0a 0%,#111 50%,#0d0d0d 100%)`,
      }} />
      <div style={{
        position:"absolute", inset:0, opacity:0.04,
        backgroundImage:`
          linear-gradient(rgba(200,200,200,0.3) 1px,transparent 1px),
          linear-gradient(90deg,rgba(200,200,200,0.3) 1px,transparent 1px)`,
        backgroundSize:"60px 60px",
      }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:2, maxWidth:620 }}>
        <h1 style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:"clamp(64px,8vw,110px)", lineHeight:0.92,
          color:"#fff", letterSpacing:2, marginBottom:8,
          animation:"fadeUp 0.7s 0.2s ease both",
        }}>
          <span style={{ color:"var(--red)" }}>UNCLE</span><br />
          <span style={{ WebkitTextStroke:"1px var(--silver)", color:"transparent" }}>H</span> INTERIOR<br />
          Specialist
        </h1>
        <p style={{
          fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:400,
          letterSpacing:6, color:"var(--silver)", textTransform:"uppercase",
          marginBottom:28, marginTop:8,
          animation:"fadeUp 0.7s 0.3s ease both",
        }}>Flexible Service Options — Mobile or In-House</p>
     
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", animation:"fadeUp 0.7s 0.5s ease both" }}>
          <BtnPrimary href="#contact">Book Appointment</BtnPrimary>
          <BtnOutline href="#services">Our Services</BtnOutline>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        position:"absolute", right:60, bottom:80, zIndex:2,
        display:"flex", gap:48,
        animation:"fadeUp 0.8s 0.6s ease both",
      }} className="hero-stats">
        <div style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, color:"#fff", lineHeight:1, display:"block" }}>
            4<span style={{ color:"var(--red)" }}>R</span>
          </span>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:3, color:"#666", textTransform:"uppercase", marginTop:4, display:"block" }}>
            Repair · Restore<br />Refinish · Renew
          </span>
        </div>
       
      </div>

      {/* Divider */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:3,
        background:"linear-gradient(90deg,transparent 0%,var(--red) 30%,var(--silver) 60%,transparent 100%)",
      }} />

      <style>{`
        @media (max-width: 900px) {
          .hero-stats { position: static !important; margin-top: 40px; }
          #hero { padding: 100px 24px 60px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── STRIP ───────────────────────────────────────────────────────────────────
function Strip() {
  const doubled = [...STRIP_ITEMS, ...STRIP_ITEMS];
  return (
    <div style={{ background:"var(--red)", padding:"14px 60px", overflow:"hidden" }}>
      <div style={{ display:"flex", gap:48, alignItems:"center", animation:"marquee 18s linear infinite", whiteSpace:"nowrap" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:600,
            letterSpacing:4, textTransform:"uppercase", color:"#fff", opacity:0.9,
            display:"flex", alignItems:"center", gap:16,
          }}>
            {item}
            <span style={{ width:4, height:4, background:"rgba(255,255,255,0.5)", borderRadius:"50%", flexShrink:0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{
      padding:"120px 60px",
      display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center",
    }} className="about-grid">
      {/* Visual placeholder cards */}
      <div style={{ position:"relative", height:500 }} className="about-visual">
        <div style={{ ...aboutCard, top:0, left:0, zIndex:2 }}>
          <div style={cardIconStyle}>🛠️</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#fff", letterSpacing:2, marginBottom:12 }}>
            Craftsmanship First
          </div>
          <p style={{ fontSize:14, fontWeight:300, lineHeight:1.7, color:"#888" }}>
            Every repair is handled with precision techniques refined across decades of European practice.
          </p>
        </div>
        <div style={{
          ...aboutCard,
          bottom:0, right:-30, zIndex:1,
          background:"var(--dark4)", borderColor:"rgba(204,20,20,0.2)",
          padding:"28px 36px", width:300,
        }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:3, color:"var(--red)", textTransform:"uppercase", marginBottom:8 }}>
            Appointment Only
          </div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:"#fff", lineHeight:1 }}>
            Premium
          </div>
        </div>
      </div>

      {/* Text */}
      <div>
        <div style={sectionLabelStyle}>Our Story</div>
        <h2 style={h2Style}>A FAMILY<br /><span style={{ color:"var(--red)" }}>LEGACY</span></h2>
        <p style={bodyTextStyle}>
          At Uncle H Interior Specialist, our journey is rooted in <strong style={{ color:"var(--silver)", fontWeight:500 }}>decades of experience</strong> and a deep family passion for craftsmanship developed across Europe.
        </p>
        <p style={bodyTextStyle}>
          Expanding into the United States has long been a vision, and today — led by <strong style={{ color:"var(--silver)", fontWeight:500 }}>Amad</strong>, first generation of this expansion — that vision is a reality.
        </p>
        <ul style={{ listStyle:"none", marginTop:28, display:"flex", flexDirection:"column", gap:12 }}>
          {[
            "Mobile services or by appointment at our location",
            "By appointment only for focused, premium care",
            "Custom color matching on every repair",
            "All makes, models, and interior types",
          ].map((item, i) => (
            <li key={i} style={{
              display:"flex", alignItems:"center", gap:14,
              fontFamily:"'Barlow Condensed',sans-serif", fontSize:14,
              letterSpacing:1, color:"var(--silver)",
            }}>
              <span style={{ display:"block", width:20, height:2, background:"var(--red)", flexShrink:0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; padding: 80px 24px !important; }
          .about-visual { height: 340px !important; }
        }
      `}</style>
    </section>
  );
}

const aboutCard = {
  position:"absolute", background:"var(--dark3)",
  border:"1px solid rgba(255,255,255,0.06)",
  padding:40, width:380,
};
const cardIconStyle = {
  width:48, height:48, marginBottom:20,
  background:"rgba(204,20,20,0.1)", border:"1px solid rgba(204,20,20,0.3)",
  display:"flex", alignItems:"center", justifyContent:"center", fontSize:22,
};

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function ServiceCard({ num, icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--dark4)" : "var(--dark3)",
        padding:"40px 32px", position:"relative", overflow:"hidden",
        cursor:"default", transition:"transform 0.3s, background 0.3s",
        border:"1px solid rgba(255,255,255,0.04)",
        transform: hovered ? "translateY(-6px)" : "none",
      }}
    >
      {/* Bottom accent line */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:3,
        background:"var(--red)",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin:"left", transition:"transform 0.3s",
      }} />
      <span style={{
        fontFamily:"'Bebas Neue',sans-serif", fontSize:64,
        color:"rgba(255,255,255,0.04)", position:"absolute", top:10, right:16, lineHeight:1,
      }}>{num}</span>
      <span style={{ fontSize:32, marginBottom:20, display:"block" }}>{icon}</span>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:2, color:"#fff", marginBottom:12 }}>
        {title}
      </div>
      <p style={{ fontSize:13, fontWeight:300, lineHeight:1.7, color:"#777" }}>{desc}</p>
    </div>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding:"120px 60px", background:"var(--dark2)" }} className="services-section">
      <div style={{ textAlign:"center", marginBottom:72 }}>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:600, letterSpacing:5, color:"var(--red)", textTransform:"uppercase", marginBottom:16, display:"block" }}>
          What We Do
        </span>
        <h2 style={h2Style}>OUR <span style={{ color:"var(--red)" }}>SERVICES</span></h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }} className="services-grid">
        {SERVICES.map(s => <ServiceCard key={s.num} {...s} />)}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .services-section { padding: 80px 24px !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── EVALUATE ────────────────────────────────────────────────────────────────
function Evaluate() {
  return (
    <section id="evaluate" style={{ padding:"120px 60px" }} className="evaluate-section">
      <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
        <div style={{
          width:72, height:72, margin:"0 auto 32px",
          background:"rgba(204,20,20,0.1)", border:"1px solid rgba(204,20,20,0.3)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:30,
        }}>📸</div>
        <h2 style={h2Style}>SHARE YOUR <span style={{ color:"var(--red)" }}>PHOTOS</span></h2>
        <p style={{ fontSize:15, fontWeight:300, lineHeight:1.9, color:"#888", maxWidth:580, margin:"0 auto 40px" }}>
          Share photos of the areas you'd like restored or repaired, and we'll evaluate the condition and provide expert recommendations — before you commit to anything.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginBottom:48, textAlign:"left" }} className="eval-grid">
          {EVAL_STEPS.map(s => (
            <div key={s.num} style={{
              background:"var(--dark3)", border:"1px solid rgba(255,255,255,0.05)",
              padding:"28px 24px", borderTop:"2px solid var(--red)",
            }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:"rgba(204,20,20,0.3)", lineHeight:1, marginBottom:12 }}>{s.num}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:"#fff", marginBottom:8 }}>{s.title}</div>
              <p style={{ fontSize:12, fontWeight:300, color:"#777", lineHeight:1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ display:"inline-flex", alignItems:"center", gap:12, fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#888" }}>
          Ready?&nbsp;<span style={{ color:"var(--silver)" }}>→ Scroll down to contact us</span>
        </p>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .evaluate-section { padding: 80px 24px !important; }
          .eval-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── CTA BANNER ──────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section id="cta" style={{
      margin:"0 60px 120px",
      background:"var(--dark3)", border:"1px solid rgba(204,20,20,0.2)",
      padding:80, display:"flex", justifyContent:"space-between",
      alignItems:"center", gap:40, position:"relative", overflow:"hidden",
    }} className="cta-section">
      <div style={{
        position:"absolute", left:-100, top:-100, width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(204,20,20,0.08) 0%,transparent 70%)",
      }} />
      <div style={{ position:"relative" }}>
        <h2 style={{ ...h2Style, marginBottom:12, fontSize:52 }}>
          READY TO <span style={{ color:"var(--red)" }}>RESTORE</span>?
        </h2>
      </div>
      <div style={{ display:"flex", gap:16, alignItems:"center", flexShrink:0 }}>
        <a href="tel:6507325652" style={{
          fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:2,
          color:"#fff", textDecoration:"none",
        }}>(650) 732-5652</a>
        <BtnPrimary href="#contact">Book Now</BtnPrimary>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .cta-section { margin: 0 24px 80px !important; padding: 48px 32px !important; flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    firstName:"", lastName:"", phone:"", email:"", service:"", date:"",message:"",
  });
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.firstName || !form.phone || !form.email || !form.service) return;
    setStatus("sending");
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    photos.forEach(f => data.append("photos", f));
    try {
      const res = await fetch(`${config.apiUrl}/api/contact`, {
        method:"POST", body:data, headers:{ Accept:"application/json" },
      });
      if (res.ok) {
        setStatus("success");
        setForm({ firstName:"", lastName:"", phone:"", email:"", service:"",date:"", message:"" });
        setPhotos([]);
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" style={{
      padding:"120px 60px", background:"var(--dark2)",
      display:"grid", gridTemplateColumns:"1fr 1fr", gap:80,
    }} className="contact-grid">
      {/* Info */}
      <div>
        <div style={sectionLabelStyle}>Get In Touch</div>
        <h2 style={h2Style}>BOOK YOUR<br /><span style={{ color:"var(--red)" }}>SERVICE</span></h2>
        <p style={{ ...bodyTextStyle, marginBottom:40 }}>
          Complete the form or contact us directly, and we'll be in touch to discuss the next steps.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          {CONTACT_ITEMS.map(ci => (
            <div key={ci.label} style={{ display:"flex", alignItems:"flex-start", gap:20 }}>
              <div style={{
                width:44, height:44, flexShrink:0,
                background:"rgba(204,20,20,0.1)", border:"1px solid rgba(204,20,20,0.3)",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
              }}>{ci.icon}</div>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:3, color:"var(--red)", textTransform:"uppercase", marginBottom:4 }}>{ci.label}</div>
                <div style={{ fontSize:15, color:"var(--silver)" }}>{ci.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }} className="form-row">
          <FormField label="First Name" name="firstName" placeholder="John"   value={form.firstName} onChange={handleChange} />
          <FormField label="Last Name"  name="lastName"  placeholder="Smith"  value={form.lastName}  onChange={handleChange} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }} className="form-row">
          <FormField label="Phone" name="phone" type="tel"   placeholder="(555) 000-0000"  value={form.phone} onChange={handleChange} />
          <FormField label="Email" name="email" type="email" placeholder="you@email.com"   value={form.email} onChange={handleChange} />
        </div>
        {/* Service select */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <label style={fieldLabelStyle}>Service Needed</label>
          <select name="service" value={form.service} onChange={handleChange} required style={inputStyle}>
            <option value="">Select a service...</option>
            {SERVICE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        {/* Appointment Date */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <label style={fieldLabelStyle}>Preferred Appointment Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            style={{
              ...inputStyle,
              colorScheme:"dark",
              cursor:"pointer",
            }}
          />
        </div>
        {/* Message */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <label style={fieldLabelStyle}>Vehicle & Damage Description</label>
          <textarea name="message" value={form.message} onChange={handleChange}
            placeholder="e.g. 2019 BMW X5 — driver seat has a tear on the left side and some fading..."
            style={{ ...inputStyle, resize:"vertical", minHeight:120 }} />
        </div>
        {/* Photos */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <label style={fieldLabelStyle}>Photos <span style={{ color:"#555", letterSpacing:1 }}>(Optional)</span></label>
          <input type="file" accept="image/*" multiple
            onChange={e => setPhotos(Array.from(e.target.files))}
            style={{ ...inputStyle, cursor:"pointer", color:"#666" }} />
          <span style={{ fontSize:11, color:"#555" }}>Up to 5 photos · JPG, PNG, WebP · max 5 MB each</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          style={{
            fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700,
            letterSpacing:3, textTransform:"uppercase",
            background: status === "sending" ? "rgba(204,20,20,0.6)" : "var(--red)",
            color:"#fff", border:"none", padding:"18px 48px", cursor: status === "sending" ? "not-allowed" : "pointer",
            clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
            alignSelf:"flex-start", transition:"background 0.2s",
          }}
        >
          {status === "sending" ? "Sending..." : status === "success" ? "Sent ✓" : "Send Request →"}
        </button>

        {status === "success" && (
          <div style={{
            background:"rgba(204,20,20,0.08)", border:"1px solid rgba(204,20,20,0.3)",
            padding:"24px 28px",
            fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, letterSpacing:1,
            color:"var(--silver)",
          }}>
            <strong style={{ color:"var(--red)" }}>Request received!</strong> We'll be in touch within 24 hours to confirm your appointment.
          </div>
        )}
        {status === "error" && (
          <div style={{
            background:"rgba(204,20,20,0.08)", border:"1px solid rgba(204,20,20,0.3)",
            padding:"24px 28px",
            fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, letterSpacing:1,
            color:"var(--silver)",
          }}>
            Something went wrong. Please try again or call us directly.
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; padding: 80px 24px !important; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FormField({ label, name, type="text", placeholder, value, onChange }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      <label style={fieldLabelStyle}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required style={inputStyle} />
    </div>
  );
}

const fieldLabelStyle = {
  fontFamily:"'Barlow Condensed',sans-serif", fontSize:11,
  letterSpacing:3, color:"var(--red)", textTransform:"uppercase",
};
const inputStyle = {
  background:"var(--dark3)", border:"1px solid rgba(255,255,255,0.08)",
  color:"#fff", padding:"14px 18px",
  fontFamily:"'Barlow',sans-serif", fontSize:14,
  outline:"none", transition:"border-color 0.2s", width:"100%",
  appearance:"none",
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding:"48px 60px",
      borderTop:"1px solid rgba(255,255,255,0.06)",
      display:"flex", justifyContent:"space-between", alignItems:"center",
      gap:24, flexWrap:"wrap",
    }} className="footer-inner">
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:4, color:"#fff" }}>
        UNCLE <span style={{ color:"var(--red)" }}>H</span> INTERIOR SPECIALIST
      </div>
      <div style={{ fontSize:12, color:"#555", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:2 }}>
        © 2026 Uncle H Interior Specialist · Leather & Vinyl Specialist · Mobile Service by Appointment
      </div>
      <div style={{ display:"flex", gap:16 }}>
        {["📘","▶️"].map((icon, i) => (
          <a key={i} href="#" style={{
            width:38, height:38, border:"1px solid rgba(255,255,255,0.1)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:16, textDecoration:"none", color:"#666", transition:"all 0.2s",
          }}>{icon}</a>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .footer-inner { padding: 32px 24px !important; flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
    </footer>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function BtnPrimary({ href, children }) {
  return (
    <a href={href} style={{
      fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700,
      letterSpacing:3, textTransform:"uppercase", textDecoration:"none",
      background:"var(--red)", color:"#fff", padding:"16px 36px",
      clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
      transition:"all 0.2s", display:"inline-block",
    }}>{children}</a>
  );
}

function BtnOutline({ href, children }) {
  return (
    <a href={href} style={{
      fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700,
      letterSpacing:3, textTransform:"uppercase", textDecoration:"none",
      border:"1px solid rgba(192,192,192,0.4)", color:"var(--silver)", padding:"16px 36px",
      clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
      transition:"all 0.2s", display:"inline-block",
    }}>{children}</a>
  );
}

const sectionLabelStyle = {
  fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:600,
  letterSpacing:5, color:"var(--red)", textTransform:"uppercase", marginBottom:20,
  display:"flex", alignItems:"center", gap:12,
};
const h2Style = {
  fontFamily:"'Bebas Neue',sans-serif",
  fontSize:"clamp(40px,5vw,64px)", lineHeight:1,
  color:"#fff", letterSpacing:2, marginBottom:24,
};
const bodyTextStyle = {
  fontSize:15, fontWeight:300, lineHeight:1.8, color:"#888", marginBottom:20,
};

// ─── CHAT WIDGET ─────────────────────────────────────────────────────────────

function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [questions, setQuestions] = useState([]);
  const [history, setHistory]   = useState([]); // stack of { questions, label }
  const [answer, setAnswer]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(false);
  const bodyRef = useRef(null);

  const fetchQuestions = async (parentId) => {
    setLoading(true);
    setError(false);
    setAnswer(null);
    try {
      const res  = await fetch(`${config.apiUrl}/api/questions?parentId=${parentId}`);
      const data = await res.json();
      setQuestions([...data].sort((a, b) => a.sortOrder - b.sortOrder));
    } catch {
      setError(true);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Load root questions the first time the widget opens
  useEffect(() => {
    if (open && questions.length === 0 && history.length === 0 && !answer) {
      fetchQuestions(0);
    }
  }, [open]);

  // Scroll chat body to bottom whenever content changes
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [questions, answer, loading]);

  const handleSelect = async (q) => {
    if (q.answer !== null) {
      setHistory(h => [...h, { questions, label: q.question }]);
      setQuestions([]);
      setAnswer(q.answer);
    } else {
      setHistory(h => [...h, { questions, label: q.question }]);
      await fetchQuestions(q.id);
    }
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setAnswer(null);
    setQuestions(prev.questions);
  };

  const handleReset = () => {
    setHistory([]);
    setAnswer(null);
    fetchQuestions(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const breadcrumb = history.map(h => h.label);

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open chat"
          style={{
            position:"fixed", bottom:32, right:32, zIndex:1000,
            width:60, height:60,
            background:"var(--red)", border:"none", cursor:"pointer",
            clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:26,
            boxShadow:"0 4px 24px rgba(204,20,20,0.45)",
            transition:"transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >💬</button>
      )}

      {/* Chat panel */}
      {open && (
        <div style={{
          position:"fixed", bottom:32, right:32, zIndex:1000,
          width:360, maxHeight:520,
          background:"var(--dark2)", border:"1px solid rgba(204,20,20,0.3)",
          display:"flex", flexDirection:"column",
          boxShadow:"0 8px 40px rgba(0,0,0,0.7)",
          animation:"fadeUp 0.25s ease both",
        }}>
          {/* Header */}
          <div style={{
            background:"var(--red)", padding:"16px 20px",
            display:"flex", justifyContent:"space-between", alignItems:"center",
            flexShrink:0,
          }}>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:3, color:"#fff" }}>
                UNCLE H SUPPORT
              </div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:2 }}>
                Select a question below
              </div>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close chat"
              style={{ background:"none", border:"none", color:"#fff", cursor:"pointer", fontSize:20, lineHeight:1, padding:4 }}
            >✕</button>
          </div>

          {/* Body */}
          <div ref={bodyRef} style={{ flex:1, overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:10 }}>

            {/* Welcome message — only at root with no history */}
            {history.length === 0 && !answer && !loading && !error && (
              <div style={{
                background:"var(--dark3)", border:"1px solid rgba(255,255,255,0.06)",
                padding:"14px 16px", fontSize:13, color:"#999",
                fontFamily:"'Barlow',sans-serif", lineHeight:1.6,
              }}>
                👋 Hi! How can we help you today?
              </div>
            )}

            {/* Breadcrumb trail */}
            {breadcrumb.length > 0 && (
              <div style={{
                fontSize:11, color:"#555",
                fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:1,
              }}>
                {breadcrumb.map((label, i) => (
                  <span key={i}>
                    {i > 0 && <span style={{ color:"var(--red)", margin:"0 6px" }}>›</span>}
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Answer (leaf node) */}
            {answer && (
              <div style={{
                background:"var(--dark3)", borderLeft:"3px solid var(--red)",
                border:"1px solid rgba(204,20,20,0.2)",
                padding:"14px 16px", fontSize:13, color:"var(--silver)",
                fontFamily:"'Barlow',sans-serif", lineHeight:1.75,
              }}>
                {answer}
              </div>
            )}

            {/* Loading spinner */}
            {loading && (
              <div style={{ textAlign:"center", padding:"24px 0", color:"#555", fontSize:12, fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:2 }}>
                <span style={{ display:"inline-block", animation:"spin 0.8s linear infinite", marginRight:8 }}>◌</span>
                LOADING...
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                background:"rgba(204,20,20,0.08)", border:"1px solid rgba(204,20,20,0.3)",
                padding:"14px 16px", fontSize:13, color:"#cc4444",
                fontFamily:"'Barlow',sans-serif", lineHeight:1.6,
              }}>
                Failed to load. Please try again.
              </div>
            )}

            {/* Question buttons */}
            {!loading && questions.map(q => (
              <button
                key={q.id}
                onClick={() => handleSelect(q)}
                style={{
                  background:"var(--dark3)", border:"1px solid rgba(255,255,255,0.06)",
                  color:"var(--silver)", padding:"12px 14px",
                  fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, letterSpacing:1,
                  cursor:"pointer", textAlign:"left",
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  gap:8, transition:"border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(204,20,20,0.5)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "var(--silver)";
                }}
              >
                <span>{q.question}</span>
                <span style={{ color:"var(--red)", flexShrink:0 }}>
                  {q.answer === null ? "›" : "→"}
                </span>
              </button>
            ))}
          </div>

          {/* Footer nav — shown whenever user has navigated away from root */}
          {history.length > 0 && (
            <div style={{
              padding:"12px 16px", borderTop:"1px solid rgba(255,255,255,0.06)",
              display:"flex", gap:10, flexShrink:0,
            }}>
              <button
                onClick={handleBack}
                style={{
                  flex:1, background:"none",
                  border:"1px solid rgba(255,255,255,0.1)",
                  color:"var(--silver)", padding:"10px",
                  cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif",
                  fontSize:12, letterSpacing:2, textTransform:"uppercase",
                  transition:"border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
              >← Back</button>
              <button
                onClick={handleReset}
                style={{
                  flex:1, background:"none",
                  border:"1px solid rgba(204,20,20,0.3)",
                  color:"var(--red)", padding:"10px",
                  cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif",
                  fontSize:12, letterSpacing:2, textTransform:"uppercase",
                  transition:"border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(204,20,20,0.7)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(204,20,20,0.3)"}
              >Start Over</button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .chat-panel { right: 0 !important; bottom: 0 !important; width: 100% !important; max-height: 70vh !important; }
        }
      `}</style>
    </>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{FONTS}</style>
      <Nav />
      <Hero />
      <Strip />
      <About />
      <Services />
      <Evaluate />
      <CTABanner />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  );
}
