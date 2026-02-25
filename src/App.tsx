import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, CheckCircle, MessageCircle, X, Shield, AlertTriangle } from 'lucide-react';

// --- Components ---

const ScarcityCounter = () => {
  return (
    <div className="bg-red-900/20 border border-red-900/50 rounded-full px-4 py-1.5 flex items-center gap-2 mb-6 animate-pulse">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
      </span>
      <span className="text-red-200 text-xs font-medium tracking-wide uppercase">
        Apenas 7 convites restantes
      </span>
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-4 right-4 z-50 max-w-[300px] w-[calc(100%-32px)] md:w-auto"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-red-900/80 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                 <img src="https://picsum.photos/seed/model/100/100" alt="Model" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div>
              <p className="text-white text-sm font-bold">Sarah (Admin)</p>
              <p className="text-red-200 text-[10px]">Online agora</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 bg-zinc-950">
          <div className="bg-zinc-900 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm text-zinc-300 shadow-sm border border-zinc-800/50">
            Oi... acabei de postar um vídeo novo sem censura. Quer ver? 😈
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlurredImage = ({ delay = 0 }: { delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="relative aspect-[3/4] rounded-xl overflow-hidden border border-zinc-800 group"
  >
    <img 
      src={`https://picsum.photos/seed/${Math.random()}/400/600`} 
      alt="Exclusive Content" 
      className="w-full h-full object-cover blur-md scale-110 group-hover:scale-105 transition-transform duration-700 opacity-60"
    />
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-black/60 p-3 rounded-full border border-red-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.3)]">
        <Lock className="text-red-500 w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

const Quiz = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const questions = [
    {
      question: "Você é maior de 18 anos?",
      options: ["Sim, sou maior de 18", "Não, sou menor"]
    },
    {
      question: "Prefere conteúdos amadores ou profissionais?",
      options: ["Amadores (Reais)", "Profissionais (Studio)"]
    },
    {
      question: "Está preparado para ver o que o Instagram censura?",
      options: ["Sim, mostre tudo", "Talvez..."]
    }
  ];

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      setProgress(((step + 1) / questions.length) * 60); // Fake progress logic
    } else {
      // Start final processing animation
      setStep(questions.length);
      let p = 60;
      const interval = setInterval(() => {
        p += 1;
        setProgress(p);
        if (p >= 95) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
      }, 30);
    }
  };

  if (step === questions.length) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Analisando perfil...</h3>
        <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-zinc-400 text-center mt-2 font-mono text-sm">{progress}% concluído</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4 flex justify-between items-center px-2">
        <span className="text-xs text-zinc-500 uppercase tracking-widest">Passo {step + 1} de {questions.length}</span>
        <span className="text-xs text-red-500 font-bold">{Math.round(((step) / questions.length) * 100)}%</span>
      </div>
      
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl backdrop-blur-md shadow-xl"
      >
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
          {questions[step].question}
        </h3>
        <div className="space-y-3">
          {questions[step].options.map((option, idx) => (
            <button
              key={idx}
              onClick={handleAnswer}
              className="w-full p-4 text-left bg-zinc-950 border border-zinc-800 hover:border-red-500/50 hover:bg-red-950/10 rounded-xl text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-between group"
            >
              <span>{option}</span>
              <span className="w-4 h-4 rounded-full border border-zinc-700 group-hover:border-red-500 group-hover:bg-red-500/20 transition-colors"></span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-red-900/10 blur-[100px] rounded-full"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center min-h-screen">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-8 flex flex-col items-center"
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-4">
              Acesso Restrito • 18+
            </span>
            <ScarcityCounter />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none uppercase">
            O que acontece no <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Red Room</span>,<br />
            fica no <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Red Room</span>. 🤫
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Você foi convidado para o acesso VIP. O conteúdo que as redes sociais não permitem que você veja.
          </p>
        </motion.div>

        {/* Main Content Area */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left/Top: Quiz or CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <AnimatePresence mode="wait">
              {!accessGranted ? (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Quiz onComplete={() => setAccessGranted(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900/80 border border-red-900/30 p-8 rounded-2xl backdrop-blur-md text-center shadow-[0_0_50px_rgba(220,38,38,0.1)]"
                >
                  <div className="mb-6 flex justify-center">
                     <ScarcityCounter />
                  </div>
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Acesso Liberado!</h2>
                  <p className="text-zinc-400 mb-8">Seu convite expira em 2 minutos.</p>
                  
                  <a 
                    href="https://telegram.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-5 px-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] transition-all duration-300 animate-pulse uppercase tracking-wide transform hover:-translate-y-1"
                  >
                    Liberar meu acesso no Telegram 😈
                  </a>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <Shield size={12} />
                    <span>Acesso 100% gratuito e seguro</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right/Bottom: Visuals */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 opacity-80">
             <BlurredImage delay={0.1} />
             <BlurredImage delay={0.2} />
             <BlurredImage delay={0.3} />
             <BlurredImage delay={0.4} />
          </div>
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-auto pt-16 pb-6 text-center text-zinc-600 text-xs"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-zinc-500">
            <AlertTriangle size={14} />
            <span className="uppercase tracking-widest font-bold">Conteúdo +18</span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed opacity-60">
            Este site contém material adulto destinado apenas a maiores de 18 anos. 
            Ao entrar, você confirma que tem 18 anos ou mais e aceita nossos termos de uso e política de privacidade.
          </p>
          <div className="mt-4 space-x-4 opacity-40">
            <a href="#" className="hover:text-zinc-400">Termos</a>
            <a href="#" className="hover:text-zinc-400">Privacidade</a>
            <a href="#" className="hover:text-zinc-400">Contato</a>
          </div>
        </motion.footer>

      </main>

      <ChatWidget />
    </div>
  );
}
