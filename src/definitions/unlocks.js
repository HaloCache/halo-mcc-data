/**
 * Unlock rule evaluation, shared by every family that joins to
 * Data/UI/unlockdb.xml. Internal: definitions/index.js does not re-export it.
 *
 * @module definitions/unlocks
 */

/**
 * Which evidence list answers each rule type, and what it must contain. A
 * PlayFab inventory rule names no item id, so the caller supplies that mapping
 * or the answer stays unknown.
 */
export const UNLOCK_RULES = Object.freeze({
    eUnlockType_Achievement: Object.freeze({
        provider: 'achievements',
        target: rule => rule.achievementID
    }),
    eUnlockType_S3Entitlement: Object.freeze({
        provider: 'entitlements',
        target: rule => rule.entitlement
    }),
    eUnlockType_PlayfabInventory: Object.freeze({
        provider: 'inventory',
        target: (rule, itemIdByUnlockKey) => itemIdByUnlockKey?.[rule.id]
    })
});

/** The frozen state object every family returns. */
export function unlockState(id, unlockKey, type, unlocked, reason) {
    return Object.freeze({ id, unlockKey, type, unlocked, reason });
}

/**
 * Decide whether an item is unlocked from its rule and the supplied evidence.
 *
 * `unlocked` is null when the evidence cannot answer the rule, and false only
 * when a list marked `complete` lacks the target, so a caller can tell "not
 * earned" from "not asked".
 *
 * @param {string} id - The item id, as the XML spells it
 * @param {string|null} unlockKey - The item's `unlock_key`, or null when it has none
 * @param {Object|null} rule - The matching unlockdb rule, or null when unresolved
 * @param {Object} evidence - What is known about the player
 * @returns {Readonly<{id: string|null, unlockKey: string|null, type: string|null, unlocked: boolean|null, reason: string}>}
 */
export function resolveUnlockState(id, unlockKey, rule, evidence = {}) {
    if (!unlockKey) return unlockState(id, null, null, true, 'no-unlock-rule');
    if (!rule) return unlockState(id, unlockKey, null, null, 'unknown-unlock-rule');

    const resolver = UNLOCK_RULES[rule.type];
    if (!resolver) return unlockState(id, unlockKey, rule.type, null, 'unsupported-unlock-type');

    const target = resolver.target(rule, evidence.inventoryItemIdByUnlockKey);
    if (target === null || target === undefined) {
        return unlockState(id, unlockKey, rule.type, null, 'unidentified-unlock-target');
    }

    const provider = evidence[resolver.provider];
    if (!Array.isArray(provider?.ids)) {
        return unlockState(id, unlockKey, rule.type, null, 'no-provider');
    }
    if (provider.ids.some(owned => String(owned) === String(target))) {
        return unlockState(id, unlockKey, rule.type, true, 'listed');
    }
    if (provider.complete === true) {
        return unlockState(id, unlockKey, rule.type, false, 'absent-from-complete-provider');
    }
    return unlockState(id, unlockKey, rule.type, null, 'provider-incomplete');
}
