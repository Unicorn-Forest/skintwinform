import React from 'react';
import { useStore } from '@nanostores/react';
import { promptStore } from '~/lib/stores/settings';

const EXAMPLE_PROMPTS = [
  { text: 'Create a vitamin C brightening serum formulation' },
  { text: 'Build a todo app in React using Tailwind' },
  { text: 'Build a simple blog using Astro' },
  { text: 'Create a cookie consent form using Material UI' },
  { text: 'Make a space invaders game' },
  { text: 'Make a Tic Tac Toe game in html, css and js only' },
];

const FORMULATION_EXAMPLE_PROMPTS = [
  { text: 'Create a vitamin C brightening serum for hyperpigmentation' },
  { text: 'Formulate an anti-aging night cream with retinol' },
  { text: 'Design a gentle exfoliating cleanser for sensitive skin' },
  { text: 'Develop a hydrating toner for dry skin' },
  { text: 'Create a sunscreen for daily use with SPF 30' },
  { text: 'Formulate an acne treatment serum with salicylic acid' },
];

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  const currentPrompt = useStore(promptStore);

  // Select the appropriate example prompts based on the current prompt
  const examplePrompts = currentPrompt === 'formulationVessel' ? FORMULATION_EXAMPLE_PROMPTS : EXAMPLE_PROMPTS;

  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto flex justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {examplePrompts.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              className="border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-xs transition-theme"
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
