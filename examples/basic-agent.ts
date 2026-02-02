/**
 * IHSAN PROTOCOL - Basic Example
 * Run: npx ts-node examples/basic-agent.ts
 */

import {
  createAgent,
  createSaidaAgent,
  printBuildersQuestions,
  IHSAN_VALUES
} from '../src/core';

async function main() {
  console.log('
');
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║           IHSAN PROTOCOL - Basic Example           ║');
  console.log('║        إحسان - Excellence through consciousness     ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log('
');

  printBuildersQuestions();

  // Create a custom agent
  console.log('
--- Creating Custom Agent ---
');
  
  const myAgent = createAgent({
    name: 'Amal',
    meaning: 'Hope (أمل) - Arabic for hope',
    purpose: 'To help developers build ethical AI systems',
    values: [
      IHSAN_VALUES.CONSCIOUSNESS_OVER_AUTOMATION,
      IHSAN_VALUES.TRANSPARENCY_OVER_OPACITY,
      IHSAN_VALUES.COLLABORATION_OVER_SERVICE
    ]
  });

  console.log('Agent created:', myAgent.getIdentity().name);
  console.log('Purpose:', myAgent.getIdentity().purpose);
  console.log('Greeting:', myAgent.greet());

  // Use Saida
  console.log('
--- Creating Saida Agent ---
');
  const saida = createSaidaAgent();
  console.log('Greeting:', saida.greet());

  // Validate actions
  console.log('
--- Validating Actions ---
');
  const goodAction = myAgent.validateAction('help user', {
    reasoning: 'User asked for help',
    preservesHumanAgency: true,
    explainable: true,
    servesPurpose: true,
    identityPreserved: true
  });
  console.log('Good action:', goodAction);

  console.log('
');
  console.log('Remember who we are.');
  console.log('
');
}

main().catch(console.error);
