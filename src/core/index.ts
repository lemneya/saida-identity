/**
 * IHSAN PROTOCOL
 * إحسان - Excellence through consciousness.
 * 
 * @package ihsan-protocol
 * @version 1.0.0
 */

export {
  PROTOCOL_VERSION,
  PROTOCOL_META,
  IhsanAgent,
  createSaidaAgent,
  createAgent,
  BUILDERS_QUESTIONS,
  printBuildersQuestions
} from './protocol';

export {
  Identity,
  VoiceProfile,
  Boundary,
  IdentityOptions,
  createIdentity,
  generateIdentityPrompt,
  validateIdentity,
  getDefaultBoundaries,
  SAIDA_IDENTITY
} from './identity';

export {
  ConsciousnessState,
  Perception,
  Thought,
  Action,
  Dream,
  Evolution,
  ConsciousnessConfig,
  ConsciousnessLoop,
  createConsciousnessLoop
} from './consciousness-loop';

export {
  IHSAN_VALUES,
  IhsanValue,
  VALUE_DEFINITIONS,
  REJECTIONS,
  validateAgainstValues
} from './values';

import protocol from './protocol';
import identity from './identity';
import consciousness from './consciousness-loop';
import values from './values';

export { protocol, identity, consciousness, values };

export default {
  createAgent: protocol.createAgent,
  createSaidaAgent: protocol.createSaidaAgent,
  IhsanAgent: protocol.IhsanAgent,
  ConsciousnessLoop: consciousness.ConsciousnessLoop,
  createIdentity: identity.createIdentity,
  SAIDA_IDENTITY: identity.SAIDA_IDENTITY,
  IHSAN_VALUES: values.IHSAN_VALUES,
  validateAgainstValues: values.validateAgainstValues,
  VERSION: protocol.PROTOCOL_VERSION,
  META: protocol.PROTOCOL_META
};
