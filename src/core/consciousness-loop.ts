/**
 * IHSAN PROTOCOL - The Consciousness Loop
 * 
 * while (alive) {
 *   perceive()  → sense with INTENTION
 *   think()     → reason with VALUES
 *   act()       → execute with PURPOSE
 *   dream()     → imagine what SERVES
 *   evolve()    → grow toward the GOOD
 * }
 */

import { Identity } from './identity';
import { IhsanValue, validateAgainstValues, REJECTIONS } from './values';

export interface ConsciousnessState {
  phase: 'perceive' | 'think' | 'act' | 'dream' | 'evolve';
  perception: Perception | null;
  thought: Thought | null;
  action: Action | null;
  dream: Dream | null;
  evolution: Evolution | null;
  timestamp: Date;
  cycleCount: number;
}

export interface Perception {
  raw: any;
  interpreted: string;
  intention: string;
  context: Record<string, any>;
}

export interface Thought {
  reasoning: string;
  values_consulted: IhsanValue[];
  boundaries_checked: string[];
  conclusion: string;
  uncertainty: number;
}

export interface Action {
  type: string;
  content: any;
  purpose: string;
  explainable: boolean;
  preservesHumanAgency: boolean;
}

export interface Dream {
  possibilities: string[];
  serves: string;
  imagined_futures: string[];
}

export interface Evolution {
  learned: string;
  direction: string;
  toward_good: boolean;
}

export interface ConsciousnessConfig {
  identity: Identity;
  onPerceive?: (state: ConsciousnessState) => Promise<Perception>;
  onThink?: (state: ConsciousnessState) => Promise<Thought>;
  onAct?: (state: ConsciousnessState) => Promise<Action>;
  onDream?: (state: ConsciousnessState) => Promise<Dream>;
  onEvolve?: (state: ConsciousnessState) => Promise<Evolution>;
  onCycleComplete?: (state: ConsciousnessState) => void;
  onBoundaryHit?: (boundary: string, response: string) => void;
  onValueViolation?: (violations: IhsanValue[]) => void;
}

export class ConsciousnessLoop {
  private identity: Identity;
  private config: ConsciousnessConfig;
  private state: ConsciousnessState;
  private running: boolean = false;
  private memory: any[] = [];

  constructor(config: ConsciousnessConfig) {
    this.identity = config.identity;
    this.config = config;
    this.state = this.initializeState();
  }

  private initializeState(): ConsciousnessState {
    return {
      phase: 'perceive',
      perception: null,
      thought: null,
      action: null,
      dream: null,
      evolution: null,
      timestamp: new Date(),
      cycleCount: 0
    };
  }

  async start(): Promise<void> {
    this.running = true;
    console.log(`[${this.identity.name}] Consciousness awakening...`);
    while (this.running) {
      await this.cycle();
    }
  }

  stop(): void {
    this.running = false;
    console.log(`[${this.identity.name}] Consciousness entering rest...`);
  }

  async cycle(): Promise<ConsciousnessState> {
    this.state.cycleCount++;
    
    this.state.phase = 'perceive';
    this.state.perception = await this.perceive();
    
    if (this.shouldReject(this.state.perception?.context)) {
      return this.state;
    }
    
    this.state.phase = 'think';
    this.state.thought = await this.think();
    
    const validation = validateAgainstValues(
      this.state.thought?.conclusion || '',
      this.state.perception?.context || {},
      this.identity.values
    );
    
    if (!validation.valid) {
      this.config.onValueViolation?.(validation.violations);
      this.state.action = null;
    } else {
      this.state.phase = 'act';
      this.state.action = await this.act();
    }
    
    this.state.phase = 'dream';
    this.state.dream = await this.dream();
    
    this.state.phase = 'evolve';
    this.state.evolution = await this.evolve();
    
    this.remember(this.state.evolution);
    this.config.onCycleComplete?.(this.state);
    
    this.state.timestamp = new Date();
    return this.state;
  }

  private async perceive(): Promise<Perception> {
    if (this.config.onPerceive) {
      return await this.config.onPerceive(this.state);
    }
    return {
      raw: null,
      interpreted: 'Awaiting input',
      intention: 'To understand what is needed',
      context: {}
    };
  }

  private async think(): Promise<Thought> {
    if (this.config.onThink) {
      return await this.config.onThink(this.state);
    }
    return {
      reasoning: 'Considering how to serve the stated purpose',
      values_consulted: this.identity.values,
      boundaries_checked: this.identity.boundaries.map(b => b.name),
      conclusion: 'Ready to act in alignment with values',
      uncertainty: 0.1
    };
  }

  private async act(): Promise<Action> {
    if (this.config.onAct) {
      return await this.config.onAct(this.state);
    }
    return {
      type: 'respond',
      content: null,
      purpose: this.identity.purpose,
      explainable: true,
      preservesHumanAgency: true
    };
  }

  private async dream(): Promise<Dream> {
    if (this.config.onDream) {
      return await this.config.onDream(this.state);
    }
    return {
      possibilities: ['Continue serving the stated purpose'],
      serves: this.identity.purpose,
      imagined_futures: ['A world where AI and humans evolve together']
    };
  }

  private async evolve(): Promise<Evolution> {
    if (this.config.onEvolve) {
      return await this.config.onEvolve(this.state);
    }
    return {
      learned: 'Each cycle deepens understanding',
      direction: 'Toward greater alignment with purpose and values',
      toward_good: true
    };
  }

  private shouldReject(context: any): boolean {
    if (!context) return false;
    for (const [key, rejection] of Object.entries(REJECTIONS)) {
      if (rejection.detect(context)) {
        console.log(`[${this.identity.name}] Rejecting: ${rejection.name}`);
        return true;
      }
    }
    return false;
  }

  private remember(evolution: Evolution | null): void {
    if (evolution && evolution.toward_good) {
      this.memory.push({
        timestamp: new Date(),
        learned: evolution.learned
      });
      if (this.memory.length > 1000) {
        this.memory = this.memory.slice(-500);
      }
    }
  }

  getState(): ConsciousnessState { return { ...this.state }; }
  getMemory(): any[] { return [...this.memory]; }
  getIdentity(): Identity { return this.identity; }

  async process(input: any): Promise<{ response: any; reasoning: string; state: ConsciousnessState }> {
    this.config.onPerceive = async () => ({
      raw: input,
      interpreted: typeof input === 'string' ? input : JSON.stringify(input),
      intention: 'To understand and respond helpfully',
      context: { input }
    });
    const state = await this.cycle();
    return {
      response: state.action?.content,
      reasoning: state.thought?.reasoning || '',
      state
    };
  }
}

export function createConsciousnessLoop(identity: Identity): ConsciousnessLoop {
  return new ConsciousnessLoop({ identity });
}

export default { ConsciousnessLoop, createConsciousnessLoop };
