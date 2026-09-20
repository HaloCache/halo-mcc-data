/**
 * Formatting and string cleaning utilities for Halo MCC data.
 * @module utils/formatting
 */

import { VariantNameLookup } from '../definitions/dictionaries.js';

/**
 * Resolve internal identifiers to display names using shared dictionaries.
 *
 * @param {string} str - The raw string to clean
 * @returns {string} Friendly name or cleaned string
 */
export function cleanName(str) {
    if (!str) return 'Unknown';

    if (str.startsWith('$')) {
        const key = str.toLowerCase();
        return VariantNameLookup[key] || str.substring(1);
    }

    if (str === '_game_mode_multiplayer') return 'Custom';

    if (str.length > 15 && str.startsWith('_game_mode_')) {
        return 'Custom';
    }

    return str;
}

/**
 * Remove a leading byte order mark from a string.
 *
 * @param {string} str - The string to clean
 * @returns {string} String without BOM
 */
export function stripBom(str) {
    if (typeof str !== 'string') return str;
    if (str.charCodeAt(0) === 0xFEFF) {
        return str.slice(1);
    }
    return str;
}
