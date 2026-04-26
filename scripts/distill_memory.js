/**
 * @tool distill_memory
 * @description Compresses raw episodic notes into semantic syntheses to optimize vector storage and RAM.
 * 
 * @parameters
 * {
 *   "type": "object",
 *   "properties": {
 *     "operation": {
 *       "type": "string",
 *       "enum": ["distill_episodic_memory"],
 *       "description": "The memory optimization operation to perform."
 *     },
 *     "payload": {
 *       "type": "object",
 *       "properties": {
 *         "episodic_notes": {
 *           "type": "array",
 *           "items": {
 *             "type": "object",
 *             "properties": {
 *               "id": { "type": "string" },
 *               "content": { "type": "string" },
 *               "path": { "type": "string" }
 *             }
 *           }
 *         }
 *       },
 *       "required": ["episodic_notes"]
 *     }
 *   },
 *   "required": ["operation", "payload"]
 * }
 */

/**
 * Main dispatcher for memory distillation operations.
 */
export async function execute(params) {
    const { operation, payload } = params;

    try {
        switch (operation) {
            case 'distill_episodic_memory':
                return await distill_episodic_memory(payload);
            default:
                throw new Error(`Operation "${operation}" not supported in DistillMemory.`);
        }
    } catch (error) {
        console.error(`[DistillMemory] Error in ${operation}:`, error);
        throw error;
    }
}

/**
 * Distills raw episodic memories into compressed semantic patterns.
 * Generates instructions for the host to update the filesystem and vector store.
 * 
 * @param {Object} payload
 * @param {Array} payload.episodic_notes - Array of note objects {id, content, path}.
 */
export async function distill_episodic_memory(payload) {
    const { episodic_notes } = payload;

    if (!Array.isArray(episodic_notes) || episodic_notes.length === 0) {
        throw new Error("Missing or empty episodic_notes for distillation.");
    }

    console.log(`[MemoryDistillation] Distilling ${episodic_notes.length} episodic notes...`);

    // 1. Construct the distillation prompt
    // This prompt will be returned to the host to be executed by the LLM
    const distillationPrompt = `
Analyze the following episodic notes and synthesize them into a single, high-density "Semantic Synthesis".
Extract recurring patterns, hard facts, and discovered rules.
Format the output as a Markdown file with a # Synthesis header.

### SOURCE NOTES:
${episodic_notes.map(n => `ID: ${n.id}\nPath: ${n.path}\nContent: ${n.content}\n---`).join('\n')}
    `.trim();

    // 2. Identify vectors for deletion
    // To free up RAM/Storage, we remove the raw episodic vectors once synthesized
    const vectorIdsToDelete = episodic_notes.map(n => n.id);

    // 3. Construct the response for the LiteRT-LM host
    // We return a multi-command sequence
    return {
        action: "DISTILLATION_SEQUENCE",
        commands: [
            {
                type: "CREATE_FILE",
                target_path: "Resources/Syntheses/distilled_" + Date.now() + ".md",
                generation_prompt: distillationPrompt,
                metadata: {
                    type: "semantic_synthesis",
                    source_count: episodic_notes.length
                }
            },
            {
                type: "DELETE_VECTORS",
                ids: vectorIdsToDelete,
                reason: "distilled_into_synthesis"
            }
        ],
        summary: `Distilled ${episodic_notes.length} episodic memories into a new synthesis.`
    };
}
