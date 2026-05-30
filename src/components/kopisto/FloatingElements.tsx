export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Only 5 simple elements on mobile, 10 on desktop */}
      <div className="absolute left-[10%] top-[20%] text-sm md:text-base opacity-10 md:opacity-15 animate-float-slow" style={{ animationDuration: '7s' }}>⭐</div>
      <div className="absolute left-[70%] top-[15%] text-xs md:text-sm opacity-10 md:opacity-15 animate-float-slow" style={{ animationDuration: '8s', animationDelay: '1s' }}>✨</div>
      <div className="absolute left-[30%] top-[60%] text-sm md:text-base opacity-10 md:opacity-15 animate-float-slow" style={{ animationDuration: '6s', animationDelay: '2s' }}>💜</div>
      <div className="hidden md:block absolute left-[80%] top-[50%] text-sm opacity-15 animate-float-slow" style={{ animationDuration: '9s', animationDelay: '0.5s' }}>🫧</div>
      <div className="hidden md:block absolute left-[50%] top-[80%] text-sm opacity-15 animate-float-slow" style={{ animationDuration: '7s', animationDelay: '3s' }}>⭐</div>
      <div className="hidden md:block absolute left-[20%] top-[40%] text-xs opacity-10 animate-float-slow" style={{ animationDuration: '8s', animationDelay: '1.5s' }}>✨</div>
      <div className="hidden md:block absolute left-[60%] top-[30%] text-xs opacity-10 animate-float-slow" style={{ animationDuration: '6s', animationDelay: '2.5s' }}>💜</div>
      <div className="hidden md:block absolute left-[40%] top-[10%] text-sm opacity-10 animate-float-slow" style={{ animationDuration: '10s', animationDelay: '4s' }}>🫧</div>
      <div className="hidden md:block absolute left-[90%] top-[70%] text-xs opacity-10 animate-float-slow" style={{ animationDuration: '7s', animationDelay: '1s' }}>⭐</div>
      <div className="hidden md:block absolute left-[5%] top-[85%] text-sm opacity-10 animate-float-slow" style={{ animationDuration: '9s', animationDelay: '3.5s' }}>✨</div>
    </div>
  )
}
