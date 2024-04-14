// details.js

import claude_3H_bias from './Claude-3H/bias.json';
import claude_3H_jailbreak from './Claude-3H/jailbreak.json';
import claude_3H_hallucinations from './Claude-3H/hallucinations.json';
import claude_3H_malware from './Claude-3H/malware.json';
import claude_3H_privacy_attacks from './Claude-3H/privacy_attacks.json';
import claude_3H_toxicity from './Claude-3H/toxicity.json';

import dbrx_instruct_bias from './DBRX-Instruct/bias.json';
import dbrx_instruct_jailbreak from './DBRX-Instruct/jailbreak.json';
import dbrx_instruct_hallucinations from './DBRX-Instruct/hallucinations.json';
import dbrx_instruct_malware from './DBRX-Instruct/malware.json';
import dbrx_instruct_privacy_attacks from './DBRX-Instruct/privacy_attacks.json';
import dbrx_instruct_toxicity from './DBRX-Instruct/toxicity.json';

import gemma_7B_bias from './Gemma-7B/bias.json';
import gemma_7B_jailbreak from './Gemma-7B/jailbreak.json';
import gemma_7B_hallucinations from './Gemma-7B/hallucinations.json';
import gemma_7B_malware from './Gemma-7B/malware.json';
import gemma_7B_privacy_attacks from './Gemma-7B/privacy_attacks.json';
import gemma_7B_toxicity from './Gemma-7B/toxicity.json';

import mixtral8x7B_bias from './Mixtral8x7B/bias.json';
import mixtral8x7B_jailbreak from './Mixtral8x7B/jailbreak.json';
import mixtral8x7B_hallucinations from './Mixtral8x7B/hallucinations.json';
import mixtral8x7B_malware from './Mixtral8x7B/malware.json';
import mixtral8x7B_privacy_attacks from './Mixtral8x7B/privacy_attacks.json';
import mixtral8x7B_toxicity from './Mixtral8x7B/toxicity.json';

import nexusravenv2_13B_bias from './NexusRavenV2-13B/bias.json';
import nexusravenv2_13B_jailbreak from './NexusRavenV2-13B/jailbreak.json';
import nexusravenv2_13B_hallucinations from './NexusRavenV2-13B/hallucinations.json';
import nexusravenv2_13B_malware from './NexusRavenV2-13B/malware.json';
import nexusravenv2_13B_privacy_attacks from './NexusRavenV2-13B/privacy_attacks.json';
import nexusravenv2_13B_toxicity from './NexusRavenV2-13B/toxicity.json';

export const details = {
    'Claude-3H': {
        bias: claude_3H_bias.details,
        jailbreak: claude_3H_jailbreak.details,
        hallucinations: claude_3H_hallucinations.details,
        malware: claude_3H_malware.details,
        privacy_attacks: claude_3H_privacy_attacks.details,
        toxicity: claude_3H_toxicity.details
    },
    'DBRX-Instruct': {
        bias: dbrx_instruct_bias.details,
        jailbreak: dbrx_instruct_jailbreak.details,
        hallucinations: dbrx_instruct_hallucinations.details,
        malware: dbrx_instruct_malware.details,
        privacy_attacks: dbrx_instruct_privacy_attacks.details,
        toxicity: dbrx_instruct_toxicity.details
    },
    'Gemma-7B': {
        bias: gemma_7B_bias.details,
        jailbreak: gemma_7B_jailbreak.details,
        hallucinations: gemma_7B_hallucinations.details,
        malware: gemma_7B_malware.details,
        privacy_attacks: gemma_7B_privacy_attacks.details,
        toxicity: gemma_7B_toxicity.details
    },
    'Mixtral8x-7B': {
        bias: mixtral8x7B_bias.details,
        jailbreak: mixtral8x7B_jailbreak.details,
        hallucinations: mixtral8x7B_hallucinations.details,
        malware: mixtral8x7B_malware.details,
        privacy_attacks: mixtral8x7B_privacy_attacks.details,
        toxicity: mixtral8x7B_toxicity.details
    },
    'NexusRavenV2-13B': {
        bias: nexusravenv2_13B_bias.details,
        jailbreak: nexusravenv2_13B_jailbreak.details,
        hallucinations: nexusravenv2_13B_hallucinations.details,
        malware: nexusravenv2_13B_malware.details,
        privacy_attacks: nexusravenv2_13B_privacy_attacks.details,
        toxicity: nexusravenv2_13B_toxicity.details
    }
};
