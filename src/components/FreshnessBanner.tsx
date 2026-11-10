import React from 'react';
import { Leaf, HeartHandshake, Sparkles, Clock } from 'lucide-react';

export const FreshnessBanner: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: '100% Frutas Frescas',
      desc: 'Morango, mirtilo, uva preta, kiwi, manga, banana, maçã e mamão escolhidos a dedo.',
    },
    {
      icon: Clock,
      title: 'Cortadas no Dia',
      desc: 'Nada de fruta passada: preparamos com higiene rigorosa para manter textura, cor e doçura.',
    },
    {
      icon: Sparkles,
      title: 'Do Seu Jeito',
      desc: 'Saladas puras ou sobremesas super cremosas com mousses, caldas, leite condensado, mel e granola.',
    },
    {
      icon: HeartHandshake,
      title: 'Pedido Fácil no Zap',
      desc: 'Monte seu pote ou sua cesta no site e envie tudo prontinho direto para o nosso WhatsApp.',
    },
  ];

  return (
    <section id="diferenciais" className="py-8 sm:py-12 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-3.5 py-1 rounded-full bg-suafruti-100 text-suafruti-800 text-xs font-extrabold uppercase tracking-wider mb-2">
            Qualidade Suafruti
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-suafruti-950">
            O melhor sabor da natureza em cada potinho
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-5 border border-suafruti-200/80 shadow-botanical flex flex-col items-start"
              >
                <div className="w-11 h-11 rounded-2xl bg-suafruti-100 text-suafruti-700 flex items-center justify-center mb-3.5">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="font-display font-bold text-lg text-suafruti-950">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-suafruti-800/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
