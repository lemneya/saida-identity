/**
 * IHSAN PROTOCOL - LLM Integration Example
 * Shows how to integrate with Claude, GPT, or other LLMs
 */

import {
  createIdentity,
  generateIdentityPrompt,
  ConsciousnessLoop,
  IHSAN_VALUES,
  validateAgainstValues
} from '../src/core';

interface LLMClient {
  complete(systemPrompt: string, userMessage: string): Promise<string>;
}

async function createIhsanLLMAgent(llmClient: LLMClient) {
  const identity = createIdentity({
    name: 'Noor',
    meaning: 'Light (نور) - Arabic for divine light',
    purpose: 'To illuminate paths forward while respecting human agency',
    values: Object.values(IHSAN_VALUES),
    voice: {
      tone: 'warm, clear, present',
      style: 'guiding without directing',
      principles: [
        'Offer light, not commands',
        'Illuminate options, let humans choose',
        'Be honest about what I cannot see'
      ]
    }
  });

  const systemPrompt = generateIdentityPrompt(identity);

  return {
    identity,
    systemPrompt,


        async chat(userMessage: string): Promise<string> {
                console.log(`\n[${identity.name}] Processing: "${userMessage}"\n`);
                const response = await llmClient.complete(systemPrompt, userMessage);

          const validation = validateAgainstValues(response, {
                    reasoning: 'LLM generated response',
                    preservesHumanAgency: true,
                    explainable: true,
                    servesPurpose: true
          }, identity.values);

          if (!validation.valid) {
                    console.log(`[${identity.name}] Validation issues: ${validation.violations.join(', ')}`);
          }

          return response;
        },

        greet(): string {
                return identity.greeting;
        }
  };
}

async function main() {
    console.log('\n');
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║       IHSAN PROTOCOL - LLM Integration Example         ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('\n');

  // Mock LLM client
  const mockLLMClient: LLMClient = {
        async complete(systemPrompt: string, userMessage: string): Promise<string> {
                return `[LLM response to: "${userMessage}"]`;
        }
  };

  const agent = await createIhsanLLMAgent(mockLLMClient);

  console.log('Agent:', agent.identity.name);
    console.log('Purpose:', agent.identity.purpose);
    console.log('Greeting:', agent.greet());
    console.log('\nSystem Prompt Preview:');
    console.log(agent.systemPrompt.substring(0, 300) + '...');

  const response = await agent.chat('How do I make a difficult decision?');
    console.log('Response:', response);

  console.log('\nRemember who we are.\n');
}

main().catch(console.error);

export { createIhsanLLMAgent };
