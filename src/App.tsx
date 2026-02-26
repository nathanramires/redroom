import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, CheckCircle, MessageCircle, X, Shield, AlertTriangle, Server, Cloud, Users } from 'lucide-react';

// --- Components ---

const ScarcityBar = () => (
  <div className="w-full bg-red-950/20 border border-red-900/50 rounded-xl p-3 mb-6 flex items-center justify-center gap-2 animate-pulse">
    <Users className="w-4 h-4 text-red-500" />
    <span className="text-zinc-200 font-medium text-xs md:text-sm">
      Apenas <span className="text-red-500 font-bold">7</span> convites restantes para o grupo privado
    </span>
  </div>
);

const ServerOverloadPage = () => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Scanline effect overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06)_1px,transparent_1px),linear-gradient(rgba(255,0,0,0.06)_1px,transparent_1px)] bg-[length:100%_4px,20px_20px,20px_20px] z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-zinc-950 border border-red-600/30 p-6 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.15)] relative z-10"
      >
        {/* Header Alert */}
        <div className="flex items-start gap-4 mb-8 border-b border-red-900/30 pb-6">
          <AlertTriangle className="w-10 h-10 text-red-600 animate-pulse shrink-0" />
          <div>
            <h1 className="text-lg font-bold tracking-tight text-red-500 leading-tight mb-1">
              CONEXÃO INTERROMPIDA:<br />ALTA DEMANDA
            </h1>
            <p className="text-[10px] text-red-400/60 uppercase tracking-widest">Erro de Sistema 503</p>
          </div>
        </div>

        {/* Icons */}
        <div className="flex justify-center gap-12 mb-8 opacity-80">
          <div className="flex flex-col items-center gap-2">
            <Server className="w-8 h-8 text-zinc-500" />
            <span className="text-[10px] text-zinc-600 uppercase">Server</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Cloud className="w-8 h-8 text-red-500 animate-pulse" />
            <span className="text-[10px] text-red-500 uppercase">Cloud</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Lock className="w-8 h-8 text-zinc-500" />
            <span className="text-[10px] text-zinc-600 uppercase">Secure</span>
          </div>
        </div>

        {/* Diagnostic Text */}
        <div className="space-y-4 text-sm text-zinc-400 font-mono mb-8 border-l-2 border-red-900/50 pl-4">
          <p>
            <span className="text-red-500 font-bold">&gt; DIAGNÓSTICO:</span> Detectamos <span className="text-white font-bold">1.429 usuários</span> tentando acessar o servidor Red Room simultaneamente.
          </p>
          <p>
            Para evitar a queda total do sistema e manter a velocidade do Telegram VIP, o acesso gratuito foi pausado temporariamente.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-zinc-900/50 border border-red-500/10 p-5 rounded-lg mb-8">
          <p className="text-xs text-red-400 mb-3 uppercase tracking-widest font-bold">Solução Técnica:</p>
          <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
            Para liberar seu acesso imediato, estamos ativando chaves de API individuais. O custo de manutenção dessa infraestrutura é de <span className="line-through text-zinc-600">R$ 97,90</span>, mas para os usuários atuais, aplicamos um subsídio emergencial.
          </p>
          <p className="text-white text-sm font-medium border-t border-zinc-800 pt-3 mt-3">
             Pague apenas a taxa de manutenção vitalícia de <span className="text-red-500 font-bold">R$ 9,00</span> e receba seu link exclusivo no Telegram agora.
          </p>
        </div>

        {/* Urgency & CTA */}
        <div className="text-center">
           <div className="mb-6">
              <p className="text-[10px] text-red-500/70 uppercase tracking-widest mb-1">Reserva de Vaga</p>
              <div className={`text-4xl font-mono font-bold tabular-nums tracking-widest transition-colors duration-300 ${timeLeft < 60 ? 'text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-white'}`}>
                  {formatTime(timeLeft)}
              </div>
              <p className="text-[10px] text-zinc-600 mt-2">
                  Após o tempo acabar, sua vaga será passada para o próximo da fila.
              </p>
           </div>

           <a 
             href="https://go.pepperpay.com.br/hmfyr"
             target="_blank"
             rel="noopener noreferrer"
             onClick={(e) => {
               e.stopPropagation();
               e.nativeEvent.stopImmediatePropagation();
             }}
             className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-4 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] animate-pulse uppercase tracking-wide text-sm transition-all transform hover:scale-[1.02]"
           >
              PAGAR TAXA DE R$ 9,00 E ACESSAR AGORA 😈
           </a>
        </div>

      </motion.div>
    </div>
  );
};

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
          <div role="button" onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setIsOpen(false);
          }} className="text-white/70 hover:text-white cursor-pointer">
            <X size={16} />
          </div>
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

  const playSound = (type: 'click' | 'success') => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  };

  const handleAnswer = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    // Safe data extraction for potential tracking
    const answerText = e.currentTarget.innerText;
    // console.log("Answer selected:", answerText);

    playSound('click');
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
          playSound('success');
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
            <div
              key={idx}
              role="button"
              onClick={handleAnswer}
              className="w-full p-4 text-left bg-zinc-950 border border-zinc-800 hover:border-red-500 hover:bg-red-950/20 rounded-xl text-zinc-300 hover:text-white transition-all duration-300 flex items-center justify-between group hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:scale-[1.02] cursor-pointer"
            >
              <span>{option}</span>
              <span className="w-4 h-4 rounded-full border border-zinc-700 group-hover:border-red-500 group-hover:bg-red-500/20 transition-colors"></span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return <ServerOverloadPage />;
  }

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
            fica no <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Red Room</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Você foi convidado para o acesso VIP. O conteúdo que as redes sociais não permitem que você veja.
          </p>
        </motion.div>

        {/* Main Content Area */}
        <div className="w-full max-w-md mx-auto relative z-20">
          
          {/* Quiz or CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                  className="bg-zinc-900/80 border border-red-900/30 p-6 rounded-2xl backdrop-blur-md text-center shadow-[0_0_50px_rgba(220,38,38,0.1)]"
                >
                  {/* Status Header */}
                  <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center shadow-[0_0_10px_rgba(22,163,74,0.5)]">
                              <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </div>
                          <h2 className="text-lg md:text-xl font-bold text-red-500 tracking-tight">Acesso Liberado!</h2>
                      </div>
                      <p className="text-zinc-400 text-xs md:text-sm">Seu convite VIP está pronto abaixo</p>
                  </div>

                  {/* Scarcity */}
                  <ScarcityBar />
                  
                  <a 
                    href="https://t.me/xvazadosBrasil"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                    }}
                    className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-5 px-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] transition-all duration-300 animate-pulse uppercase tracking-wide transform hover:-translate-y-1 cursor-pointer"
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

      {/* <ChatWidget /> */}
    </div>
  );
}
