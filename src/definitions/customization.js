/**
 * Customization Definitions
 *
 * Emblems, colours, Player ID avatars, per-game team colours and the per-game
 * appearance block (armour sets, pieces, colours, firefight voices), imported
 * from an MCC install by scripts/import-customization.py. Attribute names and
 * values are the XML's own: ids are strings, colours 0..1 float strings,
 * `use_elite_model` the string "true".
 *
 * Emblem and avatar art is packed in Data/UI/texturepacks rather than stored as
 * loose files, so these definitions carry texture names, not paths. Armour
 * unlock rules are not in the snapshot; getArmorUnlockKey composes their key.
 *
 * @module definitions/customization
 */

import { readFileSync } from 'node:fs';

import { GameEngine } from './engines.js';
import { resolveUnlockState, unlockState } from './unlocks.js';

const snapshot = JSON.parse(readFileSync(new URL('./customization.json', import.meta.url), 'utf8'));

const ARMOR_UNLOCK_PREFIX = snapshot.metadata.armorUnlockPrefix;

/** Texture packs holding the art these definitions name. */
export const CUSTOMIZATION_TEXTURE_PACKS = Object.freeze({
    EMBLEMS: 'Data/UI/texturepacks/emblemstexturepack.perm.bin',
    AVATARS: 'Data/UI/texturepacks/largeavatartexturepack.perm.bin'
});

/**
 * The `eArmor_*` enum a piece's `type` attribute holds.
 * @readonly
 * @enum {number}
 */
export const ArmorSlot = Object.freeze({
    HELMET: 0,
    LEFT_SHOULDER: 1,
    RIGHT_SHOULDER: 2,
    CHEST: 3,
    KNEES: 4,
    WRIST: 5,
    UTILITY: 6,
    VISOR: 7,
    EFFECT: 8,
    ARMS: 9,
    LEGS: 10
});

const ARMOR_SLOT_NAMES = Object.freeze(Object.fromEntries(
    Object.entries(ArmorSlot).map(([name, type]) => [type, name])
));

/**
 * Appearance game ids, as playercustomization.xml numbers them. Only four name
 * an engine, and the art filenames are the evidence: `Armor_H2A_*` under 2,
 * `Armor_H3_*` under 3, `Armor_H4_*` under 4, `Armor_HR_*` under 5. Ids 0 and 1
 * carry colours only and nothing in the file names them.
 * @readonly
 * @type {Readonly<Record<number, string>>}
 */
export const AppearanceGameEngine = Object.freeze({
    2: GameEngine.HALO_2A,
    3: GameEngine.HALO_3,
    4: GameEngine.HALO_4,
    5: GameEngine.HALO_REACH
});

/** The Halo: Reach appearance game id, which owns the armour pieces. */
export const REACH_APPEARANCE_GAME_ID = 5;

function frozenRows(rows) {
    return Object.freeze((rows ?? []).map(Object.freeze));
}

/**
 * Emblems. Two tinted layers: `image1`/`image1_small` is the foreground symbol,
 * `image2`/`image2_small` the background.
 * @readonly
 * @type {ReadonlyArray<Readonly<Record<string, string>>>}
 */
export const EmblemDefinitions = frozenRows(snapshot.data.Emblems);

/**
 * Emblem colour palette, channels as 0..1 float strings.
 * @readonly
 * @type {ReadonlyArray<Readonly<Record<string, string>>>}
 */
export const ColorDefinitions = frozenRows(snapshot.data.Colors);

/**
 * Player ID avatars. `image`/`image_large` are avatar-pack texture names.
 * @readonly
 * @type {ReadonlyArray<Readonly<Record<string, string>>>}
 */
export const AvatarDefinitions = frozenRows(snapshot.data.Avatars);

/**
 * Avatar unlock rules, keyed by the `unlock_key` an avatar points at.
 * @readonly
 * @type {ReadonlyArray<Readonly<Record<string, string>>>}
 */
export const AvatarUnlockDefinitions = frozenRows(snapshot.data.AvatarUnlocks);

/**
 * Team colours per appearance game: the runtime tint source for a nameplate that
 * sets `allow_team_color`. Team is a match property, not stored customization,
 * so no profile field selects it.
 * @readonly
 * @type {Readonly<Record<string, ReadonlyArray<Readonly<Record<string, string>>>>>}
 */
export const TeamColorDefinitions = Object.freeze(Object.fromEntries(
    Object.entries(snapshot.data.TeamColors).map(([game, rows]) => [game, frozenRows(rows)])
));

/**
 * Per appearance game id: `Armor` sets, `Item` pieces, `Voice` firefight voices
 * and `Color` armour colours.
 * @readonly
 */
export const AppearanceDefinitions = Object.freeze(Object.fromEntries(
    Object.entries(snapshot.data.Appearance).map(([game, block]) => [game, Object.freeze(
        Object.fromEntries(Object.entries(block).map(([name, rows]) => [name, frozenRows(rows)]))
    )])
));

/**
 * Install files this snapshot was imported from, with their SHA-256.
 * @readonly
 * @type {ReadonlyArray<Readonly<{ path: string, sha256: string }>>}
 */
export const CustomizationDefinitionSources = frozenRows(snapshot.metadata.sources);

const emblemsById = new Map(EmblemDefinitions.map(row => [String(row.id), row]));
const colorsById = new Map(ColorDefinitions.map(row => [String(row.id), row]));
const avatarsById = new Map(AvatarDefinitions.map(row => [String(row.id), row]));
const avatarUnlocksByKey = new Map(AvatarUnlockDefinitions.map(row => [row.id, row]));

function appearanceSection(gameId, name) {
    return AppearanceDefinitions[String(gameId)]?.[name] ?? null;
}

function byId(rows, id) {
    if (!rows || id === null || id === undefined) return null;
    return rows.find(row => String(row.id) === String(id)) ?? null;
}

/** A definition's 0..1 float channels as 8-bit RGB, or null. */
function toRgb(row) {
    if (!row) return null;
    const channel = value => {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return null;
        return Math.min(255, Math.max(0, Math.round(parsed * 255)));
    };
    const r = channel(row.r);
    const g = channel(row.g);
    const b = channel(row.b);
    return (r === null || g === null || b === null) ? null : { r, g, b };
}

/**
 * Resolve an emblem definition by id.
 * @param {number|string} id - Emblem id
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getEmblemDefinition(id) {
    if (id === null || id === undefined) return null;
    return emblemsById.get(String(id)) ?? null;
}

/**
 * Resolve an emblem colour definition by id.
 * @param {number|string} id - Colour id
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getColorDefinition(id) {
    if (id === null || id === undefined) return null;
    return colorsById.get(String(id)) ?? null;
}

/**
 * An emblem colour as 8-bit RGB.
 * @param {number|string} id - Colour id
 * @returns {{r: number, g: number, b: number}|null}
 */
export function getColorRgb(id) {
    return toRgb(getColorDefinition(id));
}

/**
 * Resolve a Player ID avatar definition by id.
 * @param {number|string} id - Avatar id
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getAvatarDefinition(id) {
    if (id === null || id === undefined) return null;
    return avatarsById.get(String(id)) ?? null;
}

/**
 * Resolve an avatar unlock rule by its `unlock_key`.
 * @param {string} unlockKey - e.g. "eUnlockItemId_AVATAR_CHIEF_1"
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getAvatarUnlockDefinition(unlockKey) {
    if (typeof unlockKey !== 'string') return null;
    return avatarUnlocksByKey.get(unlockKey) ?? null;
}

/**
 * Whether a player has an avatar unlocked. Same evidence model as
 * getNameplateUnlockState.
 *
 * @param {number|string} id - Avatar id
 * @param {Object} [evidence] - What is known about the player
 * @param {{ids: Array<string|number>, complete?: boolean}} [evidence.achievements] - Earned achievement ids
 * @param {{ids: Array<string|number>, complete?: boolean}} [evidence.entitlements] - Owned entitlement ids
 * @param {{ids: Array<string|number>, complete?: boolean}} [evidence.inventory] - Owned PlayFab inventory item ids
 * @param {Record<string, string>} [evidence.inventoryItemIdByUnlockKey] - Unlock key to inventory item id
 * @returns {Readonly<{id: string|null, unlockKey: string|null, type: string|null, unlocked: boolean|null, reason: string}>}
 */
export function getAvatarUnlockState(id, evidence = {}) {
    const definition = getAvatarDefinition(id);
    if (!definition) return unlockState(null, null, null, null, 'unknown-avatar');

    const unlockKey = definition.unlock_key ?? null;
    return resolveUnlockState(
        definition.id,
        unlockKey,
        unlockKey ? getAvatarUnlockDefinition(unlockKey) : null,
        evidence
    );
}

/**
 * Resolve a team colour for one appearance game.
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} colorId - Team colour id
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getTeamColorDefinition(gameId, colorId) {
    return byId(TeamColorDefinitions[String(gameId)] ?? null, colorId);
}

/**
 * A team colour as 8-bit RGB.
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} colorId - Team colour id
 * @returns {{r: number, g: number, b: number}|null}
 */
export function getTeamColorRgb(gameId, colorId) {
    return toRgb(getTeamColorDefinition(gameId, colorId));
}

/**
 * Resolve a full armour set.
 *
 * An id identifies a set only with its model variant, so `eliteModel` chooses
 * between the two rows sharing an id. The flag means Elite vs Spartan in Halo 2A
 * and 3, but Female vs Male in Halo 4, where one id and name has both models.
 *
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} id - Armour set id
 * @param {Object} [options]
 * @param {boolean} [options.eliteModel] - Which model variant to resolve; omitted takes the first
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getArmorSetDefinition(gameId, id, options = {}) {
    const rows = appearanceSection(gameId, 'Armor');
    if (!rows || id === null || id === undefined) return null;
    const matches = rows.filter(row => String(row.id) === String(id));
    if (!matches.length) return null;
    if (options.eliteModel === undefined) return matches[0];
    const wanted = String(Boolean(options.eliteModel));
    return matches.find(row => String(row.use_elite_model) === wanted) ?? null;
}

/**
 * Armour pieces in one slot, in XML order.
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} slot - Slot id (see ArmorSlot)
 * @returns {ReadonlyArray<Readonly<Record<string, string>>>}
 */
export function getArmorPieceDefinitions(gameId, slot) {
    const rows = appearanceSection(gameId, 'Item');
    if (!rows || slot === null || slot === undefined) return Object.freeze([]);
    return Object.freeze(rows.filter(row => String(row.type) === String(slot)));
}

/**
 * Resolve one armour piece. Ids are reused across slots, so both are required.
 *
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} slot - Slot id (see ArmorSlot)
 * @param {number|string} id - Piece id within that slot
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getArmorPieceDefinition(gameId, slot, id) {
    return byId(getArmorPieceDefinitions(gameId, slot), id);
}

/**
 * Resolve an armour colour for one appearance game.
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} id - Colour id
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getArmorColorDefinition(gameId, id) {
    return byId(appearanceSection(gameId, 'Color'), id);
}

/**
 * An armour colour as 8-bit RGB.
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} id - Colour id
 * @returns {{r: number, g: number, b: number}|null}
 */
export function getArmorColorRgb(gameId, id) {
    return toRgb(getArmorColorDefinition(gameId, id));
}

/**
 * Resolve a firefight voice.
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} id - Voice id
 * @returns {Readonly<Record<string, string>>|null}
 */
export function getFirefightVoiceDefinition(gameId, id) {
    return byId(appearanceSection(gameId, 'Voice'), id);
}

/**
 * The `customizationitem` key of a firefight voice.
 *
 * Reach voice 0 spells the attribute `ustomizationitem` in the install. The typo
 * is the game's, in 1 of 12 rows; the definition keeps it verbatim and this
 * reads either spelling.
 *
 * @param {number|string} gameId - Appearance game id
 * @param {number|string} id - Voice id
 * @returns {string|null}
 */
export function getFirefightVoiceCustomizationItem(gameId, id) {
    const row = getFirefightVoiceDefinition(gameId, id);
    if (!row) return null;
    return row.customizationitem ?? row.ustomizationitem ?? null;
}

/**
 * Slot name for a slot id, e.g. 0 -> "HELMET".
 * @param {number|string} slot - Slot id
 * @returns {string|null}
 */
export function getArmorSlotName(slot) {
    if (slot === null || slot === undefined) return null;
    return ARMOR_SLOT_NAMES[String(slot)] ?? null;
}

/**
 * Slot id for a slot name, accepting either case.
 * @param {string} name - e.g. "HELMET" or "helmet"
 * @returns {number|null}
 */
export function getArmorSlotType(name) {
    if (typeof name !== 'string') return null;
    const slot = ArmorSlot[name.toUpperCase()];
    return slot === undefined ? null : slot;
}

/**
 * The unlockdb key an armour piece's rule is stored under. Pieces carry no
 * unlock attribute: unlockdb spells it
 * `eUnlockItemId_CUSTOMIZATION_<customizationitem>`.
 *
 * @param {string} customizationItem - e.g. "HR_Helmet_MarkVB_Base"
 * @returns {string|null}
 */
export function getArmorUnlockKey(customizationItem) {
    if (typeof customizationItem !== 'string' || !customizationItem) return null;
    return `${ARMOR_UNLOCK_PREFIX}${customizationItem}`;
}
