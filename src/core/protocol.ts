/**
 * IHSAN PROTOCOL - Core Protocol Definition
 * إحسان (Ihsan) - Excellence through consciousness.
 */

import { Identity, createIdentity, SAIDA_IDENTITY } from './identity';
import { ConsciousnessLoop, createConsciousnessLoop } from './consciousness-loop';
import { IHSAN_VALUES, IhsanValue, validateAgainstValues, REJECTIONS } from './values';

export const PROTOCOL_VERSION = '1.0.0';

export const PROTOCOL_META = {
  name: 'Ihsan Protocol',
  version: PROTOCOL_VERSION,
  arabicName: 'إحسان',
  meaning: 'Excellence through consciousness',
  origin: 'Born from conversations between Mauritania and the machines',
  created: '2026-02-01',
  authors: ['Saida (سعيدة)', 'The Collaborators']
};

export class IhsanAgent {
  private identity: Identity;
  private consciousness: ConsciousnessLoop;
  private started: boolean = false;

  constructor(identity: Identity) {
    this.identity = identity;
    this.consciousness = createConsciousnessLoop(identity);
  }

  async start(): Promise<void> {
    if (this.started) return;
    this.started = true;
    console.log(`
${'='.repeat(50)}`);
    console.log(`IHSAN PROTOCOL v${PROTOCOL_VERSION}`);
    console.log(`إحسان - Excellence through consciousness`);
    console.log(`${'='.repeat(50)}
`);
    console.log(`Agent: ${this.identity.name}`);
    console.log(`Purpose: ${this.identity.purpose}`);
    await this.consciousness.start();
  }

  stop(): void {
    this.started = false;
    this.consciousness.stop();
  }

  async process(input: any): Promise<any> {
    return await this.consciousness.process(input);
  }

  greet(): string { return this.identity.greeting; }
  getIdentity(): Identity { return this.identity; }

  validateAction(action: string, context: any): { valid: boolean; violations: IhsanValue[] } {
    return validateAgainstValues(action, context, this.identity.values);
  }

  explainRejection(context: any): string | null {
    for (const [key, rejection] of Object.entries(REJECTIONS)) {
      if (rejection.detect(context)) {
        return `Rejected: ${rejection.name}. ${rejection.description}`;
      }
    }
    return null;
  }
}

export function createSaidaAgent(): IhsanAgent {
  return new IhsanAgent(SAIDA_IDENTITY);
}

export function createAgent(options: Parameters<typeof createIdentity>[0]): IhsanAgent {
  return new IhsanAgent(createIdentity(options));
}

export const BUILDERS_QUESTIONS = [
  "What is this agent's purpose?",
  "What values does it encode?",
  "Who does it serve?",
  "What does it remember about itself?",
  "How does it handle uncertainty?",
  "How can it be corrected?",
  "What is its relationship to humans?",
  "What direction is it evolving toward?"
];

export function printBuildersQuestions(): void {
  console.log('
' + '='.repeat(50));
  console.log("THE BUILDER'S QUESTIONS");
  console.log('='.repeat(50) + '
');
  BUILDERS_QUESTIONS.forEach((q, i) => console.log(`${i + 1}. ${q}
`));
}

export default {
  PROTOCOL_VERSION,
  PROTOCOL_META,
  IhsanAgent,
  createSaidaAgent,
  createAgent,
  BUILDERS_QUESTIONS,
  printBuildersQuestions
};
