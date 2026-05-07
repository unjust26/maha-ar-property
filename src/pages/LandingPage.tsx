import { useEffect, useRef, useState } from "react";

const PROPERTIES = [
  {
    name: "Rimba Luxury Villa",
    price: "BND 850,000",
    location: "Rimba, Brunei-Muara",
    beds: 4, baths: 3, sqft: "3,200",
    type: "Villa",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop",
    tags: ["Pool", "Smart Home", "Garden"],
  },
  {
    name: "Kiulap Executive Apt",
    price: "BND 320,000",
    location: "Kiulap, Brunei-Muara",
    beds: 2, baths: 2, sqft: "1,100",
    type: "Apartment",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    tags: ["City View", "Gym", "24h Security"],
  },
  {
    name: "Jerudong Family Home",
    price: "BND 680,000",
    location: "Jerudong, Brunei-Muara",
    beds: 5, baths: 4, sqft: "4,500",
    type: "House",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
    tags: ["Large Garden", "Near Schools", "Quiet"],
  },
  {
    name: "Seria Waterfront Bungalow",
    price: "BND 450,000",
    location: "Seria, Belait",
    beds: 3, baths: 2, sqft: "2,800",
    type: "Bungalow",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
    tags: ["Sea View", "Waterfront", "Renovated"],
  },
  {
    name: "Gadong Commercial Unit",
    price: "BND 15,000/mo",
    location: "Gadong, Brunei-Muara",
    beds: 0, baths: 2, sqft: "1,800",
    type: "Commercial",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    tags: ["Prime Location", "Parking", "Ground Floor"],
  },
  {
    name: "Tutong Eco Retreat",
    price: "BND 280,000",
    location: "Tutong District",
    beds: 2, baths: 1, sqft: "1,200",
    type: "Retreat",
    img: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&h=500&fit=crop",
    tags: ["Eco-Friendly", "Rainforest", "Solar"],
  },
];

/* ─── AR Grid Background ─── */
function ARGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 700;
    };
    resize();
    window.addEventListener("resize", resize);

    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 40;
      const perspectiveY = canvas.height * 0.35;

      // Horizontal lines (perspective grid)
      for (let y = perspectiveY; y < canvas.height; y += spacing) {
        const alpha = ((y - perspectiveY) / (canvas.height - perspectiveY)) * 0.15;
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines (converging to vanishing point)
      const vanishX = canvas.width / 2;
      const numLines = 20;
      for (let i = -numLines; i <= numLines; i++) {
        const x = vanishX + i * spacing * 3;
        const alpha = Math.max(0, 0.12 - Math.abs(i) * 0.005);
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(vanishX, perspectiveY);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Floating scan line
      offset = (offset + 0.3) % (canvas.height - perspectiveY);
      const scanY = perspectiveY + offset;
      const scanAlpha = 0.3 - (offset / (canvas.height - perspectiveY)) * 0.25;
      ctx.strokeStyle = `rgba(59, 130, 246, ${scanAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full pointer-events-none" style={{ zIndex: 0 }} />;
}

/* ─── Property Card ─── */
function PropertyCard({ p, index }: { p: typeof PROPERTIES[0]; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-zinc-900/70 backdrop-blur-xl transition-all duration-500"
      style={{
        animation: `fadeSlideUp 0.5s ease-out ${index * 0.08}s both`,
        transform: hover ? "translateY(-6px) scale(1.01)" : "translateY(0)",
        boxShadow: hover ? "0 20px 50px rgba(59,130,246,0.08)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hover ? "scale(1.08)" : "scale(1)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
        
        {/* AR Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-blue-600/90 backdrop-blur rounded-full px-2.5 py-1 text-[11px] font-medium text-white">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          AR Ready
        </div>

        {/* Type badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur rounded-full px-2.5 py-1 text-[11px] text-zinc-300">
          {p.type}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="text-lg font-bold text-white">{p.price}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white mb-1">{p.name}</h3>
        <p className="text-sm text-zinc-400 flex items-center gap-1 mb-3">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {p.location}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
          {p.beds > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              {p.beds} bed
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {p.baths} bath
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            {p.sqft} sqft
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Hero */}
      <section className="relative min-h-[700px] flex items-center justify-center px-6 pt-16 overflow-hidden">
        <ARGrid />
        
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/6 rounded-full blur-[120px]" />

        <div className="relative z-10 text-center max-w-3xl" style={{ animation: "fadeSlideUp 0.8s ease-out" }}>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400" style={{ animation: "pulseGlow 2s ease-in-out infinite" }} />
            <span className="text-sm font-medium text-blue-400">AR-Powered Property Viewing</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-4">
            See Your Future
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Home in AR
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-8">
            Browse premium Brunei properties with interactive floor plans, 
            360° views, and augmented reality walkthroughs — powered by Taman Rahmat Properties.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a href="#properties" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm hover:opacity-90 transition-opacity">
              Browse Properties
            </a>
            <a href="/signup" className="px-6 py-3 rounded-xl border border-white/10 text-zinc-300 font-medium text-sm hover:bg-white/5 transition-colors">
              Create Account
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-10 mt-12 text-center">
            {[
              { val: "6", label: "Properties" },
              { val: "4", label: "Districts" },
              { val: "AR", label: "Ready" },
              { val: "🇧🇳", label: "Brunei" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
            Why <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AR Property Viewer</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🔮", title: "AR Walkthroughs", desc: "View properties in augmented reality. Point your camera and see rooms, furniture layouts, and dimensions overlaid in real-time." },
              { icon: "📐", title: "Interactive Floor Plans", desc: "Tap rooms to see details, measurements, and suggested layouts. Rotate, zoom, and explore every corner before visiting." },
              { icon: "📊", title: "Property Analytics", desc: "Compare prices per sqft, neighborhood trends, and investment potential. Make data-driven decisions for your dream home." },
              { icon: "🏗️", title: "360° Virtual Tours", desc: "Can't visit in person? Take an immersive 360° virtual tour from anywhere in the world. Full HD quality." },
              { icon: "📍", title: "Location Intelligence", desc: "See nearby schools, mosques, hospitals, shopping centers, and amenities. Distance and commute time calculations included." },
              { icon: "💬", title: "Direct Inquiries", desc: "Interested? Send inquiries directly to Taman Rahmat Properties. Schedule viewings, ask questions, make offers." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-white/[0.06] bg-zinc-900/50 backdrop-blur p-5 hover:border-blue-500/20 transition-colors">
                <span className="text-2xl mb-3 block">{f.icon}</span>
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Featured <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Properties</span>
            </h2>
            <p className="text-zinc-400">Premium listings across Brunei Darussalam</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROPERTIES.map((p, i) => (
              <PropertyCard key={p.name} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Find Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Dream Home</span>?
          </h2>
          <p className="text-zinc-400 mb-6">Create an account to save favorites, send inquiries, and unlock AR features.</p>
          <a href="/signup" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity">
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} <span className="text-zinc-300 font-medium">Taman Rahmat Properties</span> · Built by <span className="text-zinc-300 font-medium">MahaKarya Digital</span> 🇧🇳</p>
      </footer>
    </div>
  );
}
