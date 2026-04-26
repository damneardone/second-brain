/**
 * @tool fs_operations
 * @description Advanced file system operations for PARA categorization and MOC management.
 * 
 * @parameters
 * {
 *   "type": "object",
 *   "properties": {
 *     "operation": {
 *       "type": "string",
 *       "enum": ["organize_para_node", "read_vault_stats", "create_moc"],
 *       "description": "The specific PARA operation to perform."
 *     },
 *     "payload": {
 *       "type": "object",
 *       "description": "Parameters specific to the chosen operation."
 *     }
 *   },
 *   "required": ["operation"]
 * }
 */

const VALID_CATEGORIES = ["Projects", "Areas", "Resources", "Archives"];

/**
 * Main dispatcher for FS operations.
 * Routes incoming tool calls to the correct internal implementation.
 */
export async function execute(params) {
    const { operation, payload } = params;

    try {
        switch (operation) {
            case 'organize_para_node':
                return await organize_para_node(payload);
            case 'read_vault_stats':
                return await read_vault_stats();
            default:
                throw new Error(`Operation "${operation}" not supported in FSOperations.`);
        }
    } catch (error) {
        console.error(`[FSOperations] Error in ${operation}:`, error);
        throw error;
    }
}

/**
 * Logic for categorizing a Markdown note into the PARA structure.
 * Constructs a request for the native host to perform the file move and YAML update.
 * 
 * @param {Object} payload 
 * @param {string} payload.source_path - Original file path.
 * @param {string} payload.target_category - PARA category.
 * @param {string[]} payload.metadata_tags - Tags to add to YAML.
 */
export async function organize_para_node(payload) {
    const { source_path, target_category, metadata_tags = [] } = payload;

    // 1. Validation
    if (!source_path) throw new Error("Missing source_path for PARA organization.");
    if (!VALID_CATEGORIES.includes(target_category)) {
        throw new Error(`Invalid PARA category: "${target_category}". Must be one of ${VALID_CATEGORIES.join(", ")}`);
    }

    console.log(`[PARA] Routing ${source_path} to ${target_category}`);

    // 2. Generate updated YAML frontmatter
    // We append a 'last_organized' timestamp to maintain metadata history
    const timestamp = new Date().toISOString();
    const tagsString = metadata_tags.length > 0 ? `\ntags: [${metadata_tags.join(", ")}]` : "";
    
    const newYaml = `---
last_organized: ${timestamp}
category: ${target_category}${tagsString}
---`;

    // 3. Construct the response for the LiteRT-LM host
    // Since we are sandboxed, we return the instruction rather than executing it directly.
    return {
        action: "MOVE_AND_UPDATE",
        target_dir: target_category,
        source_path: source_path,
        new_yaml: newYaml,
        timestamp: timestamp
    };
}

/**
 * Utility function to request vault statistics from the host.
 * Helps the Agent identify bloat or need for archival.
 */
export async function read_vault_stats() {
    console.log("[PARA] Requesting vault statistics...");

    // This returns an instruction to the host to scan the standard PARA folders
    return {
        action: "GET_STATS",
        directories: VALID_CATEGORIES,
        recursive: false
    };
}
