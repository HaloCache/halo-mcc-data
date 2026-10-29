/**
 * Nameplate Definitions
 *
 * Nameplates and their unlock rules, imported from an MCC install by
 * scripts/import-nameplates.py. Attribute names and values are the XML's own:
 * ids are strings, `allow_team_color` is the string "true".
 *
 * @module definitions/nameplates
 */

import { readFileSync } from 'node:fs';

import { resolveUnlockState, unlockState } from './unlocks.js';

const snapshot = JSON.parse(readFileSync(new URL('./nameplates.json', import.meta.url), 'utf8'));

/** Install-relative nameplate art directory. */
const IMAGE_DIRECTORY = 'Data/UI/NamePlates/Images';

/**
 * Nameplate definitions, in XML order.
 * @readonly
 * @type {ReadonlyArray<Readonly<Record<string, string>>>}
 */
export const NameplateDefinitions = Object.freeze(snapshot.data.Nameplates.map(Object.freeze));

/**
 * Unlock rules, keyed by the `unlock_key` a definition points at.
 * @readonly
 * @type {ReadonlyArray<Readonly<Record<string, string>>>}
 */
export const NameplateUnlockDefinitions = Object.freeze(snapshot.data.Unlocks.map(Object.freeze));

/**
 * Install files this snapshot was imported from, with their SHA-256.
 * @readonly
 * @type {ReadonlyArray<Readonly<{ path: string, sha256: string }>>}
 */
export const NameplateDefinitionSources = Object.freeze(snapshot.metadata.sources.map(Object.freeze));

const definitionsById = new Map(NameplateDefinitions.map(item => [String(item.id), item]));
const unlocksByKey = new Map(NameplateUnlockDefinitions.map(rule => [rule.id, rule]));

/**
 * Resolve a nameplate definition by id, in either numeric or string form.
 *
 * @param {number|string} id - Nameplate id
 * @returns {Readonly<Record<string, string>>|null} The definition, or null when unknown
 */
export function getNameplateDefinition(id) {
    if (id === null || id === undefined) return null;
    return definitionsById.get(String(id)) ?? null;
}

/**
 * Resolve an unlock rule by its `unlock_key`.
 *
 * @param {string} unlockKey - e.g. "eUnlockItemId_NAMEPLATE_HCE_BLUE"
 * @returns {Readonly<Record<string, string>>|null} The rule, or null when unknown
 */
export function getNameplateUnlockDefinition(unlockKey) {
    if (typeof unlockKey !== 'string') return null;
    return unlocksByKey.get(unlockKey) ?? null;
}

/**
 * Install-relative path of a nameplate's image.
 *
 * @param {number|string} id - Nameplate id
 * @returns {string|null} Path such as "Data/UI/NamePlates/Images/X.png", or null
 */
export function getNameplateImagePath(id) {
    const definition = getNameplateDefinition(id);
    return definition ? `${IMAGE_DIRECTORY}/${definition.image}.png` : null;
}

/**
 * Whether a player has a nameplate unlocked.
 *
 * `unlocked` is null when the supplied evidence cannot answer the rule, and
 * false only when a list marked `complete` lacks the target.
 *
 * @param {number|string} id - Nameplate id
 * @param {Object} [evidence] - What is known about the player
 * @param {{ids: Array<string|number>, complete?: boolean}} [evidence.achievements] - Earned achievement ids
 * @param {{ids: Array<string|number>, complete?: boolean}} [evidence.entitlements] - Owned entitlement ids
 * @param {{ids: Array<string|number>, complete?: boolean}} [evidence.inventory] - Owned PlayFab inventory item ids
 * @param {Record<string, string>} [evidence.inventoryItemIdByUnlockKey] - Unlock key to inventory item id
 * @returns {Readonly<{id: string|null, unlockKey: string|null, type: string|null, unlocked: boolean|null, reason: string}>}
 */
export function getNameplateUnlockState(id, evidence = {}) {
    const definition = getNameplateDefinition(id);
    if (!definition) return unlockState(null, null, null, null, 'unknown-nameplate');

    const unlockKey = definition.unlock_key ?? null;
    return resolveUnlockState(
        definition.id,
        unlockKey,
        unlockKey ? getNameplateUnlockDefinition(unlockKey) : null,
        evidence
    );
}
