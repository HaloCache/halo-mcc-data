/**
 * Per-engine views of the global MCC game-category catalog.
 *
 * IDs remain the global FileShare/CGB wire IDs. This module must never expose
 * BuiltInData's engine-internal binary category IDs.
 *
 * @module definitions/variants
 */

import { GameEngine, getGameEngineKey } from './engines.js';
import { GameCategoriesById, getGameCategoriesByEngine } from './categories.js';

const variants = Object.fromEntries(Object.values(GameEngine).map(engine => [engine, {}]));

for (const engine of Object.values(GameEngine)) {
    const table = variants[engine];
    for (const definition of getGameCategoriesByEngine(engine)) {
        if (table[definition.categoryId]) {
            throw new Error(`Duplicate global game category ${definition.categoryId} for ${engine}`);
        }
        table[definition.categoryId] = Object.freeze({
            id: definition.categoryId,
            categoryId: definition.categoryId,
            name: definition.name,
            category: definition.token,
            token: definition.token
        });
    }
    Object.freeze(table);
}

/** GameVariants[engine key][global category ID]. */
export const GameVariants = Object.freeze(variants);

export function getGameVariantById(engine, id) {
    const engineKey = getGameEngineKey(engine);
    if (id === null || id === undefined || id === '' || typeof id === 'boolean') return null;
    const numericId = Number(id);
    if (!engineKey || !Number.isInteger(numericId)) return null;
    return GameVariants[engineKey]?.[numericId] || null;
}

/** Engine-independent lookup for consumers that already hold a global wire ID. */
export function getGlobalGameVariantById(id) {
    if (id === null || id === undefined || id === '' || typeof id === 'boolean') return null;
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) return null;
    const definition = GameCategoriesById[numericId];
    if (!definition) return null;
    return Object.freeze({
        id: definition.categoryId,
        categoryId: definition.categoryId,
        name: definition.name,
        category: definition.token,
        token: definition.token
    });
}
