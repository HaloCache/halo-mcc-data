/**
 * MCC global game-category catalog.
 *
 * `DisplayProperties.GameCategory` and CGB `game_type` use the global enum
 * embedded in MCC-Win64-Shipping.exe. The per-title BuiltInData category IDs
 * describe binary rule formats and are deliberately not represented here.
 *
 * @module definitions/categories
 */

import { GameEngine, GameEngineDefinitions, getGameEngineFromId } from './engines.js';

const ENGINE_ID = Object.freeze(Object.fromEntries(
    Object.entries(GameEngineDefinitions).map(([engine, definition]) => [engine, definition.id])
));

const CAREER_DB_ENGINES = Object.freeze({
    GameCategory_CTF: [GameEngine.HALO_1, GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH, GameEngine.HALO_4],
    GameCategory_Slayer: [GameEngine.HALO_1, GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH, GameEngine.HALO_4],
    GameCategory_Oddball: [GameEngine.HALO_1, GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH, GameEngine.HALO_4],
    GameCategory_KOTH: [GameEngine.HALO_1, GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH, GameEngine.HALO_4],
    GameCategory_Juggernaut: [GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH],
    GameCategory_Infection: [GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH],
    GameCategory_Flood: [GameEngine.HALO_4],
    GameCategory_Race: [GameEngine.HALO_1, GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH],
    GameCategory_Extraction: [GameEngine.HALO_4],
    GameCategory_Dominion: [GameEngine.HALO_4],
    GameCategory_Regicide: [GameEngine.HALO_4],
    GameCategory_Grifball: [GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH, GameEngine.HALO_4],
    GameCategory_Ricochet: [GameEngine.HALO_2A, GameEngine.HALO_4],
    GameCategory_Sandbox: [GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH, GameEngine.HALO_4],
    GameCategory_VIP: [GameEngine.HALO_2, GameEngine.HALO_3, GameEngine.HALO_3_ODST],
    GameCategory_Territories: [GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH],
    GameCategory_Assault: [GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_3_ODST, GameEngine.HALO_REACH],
    GameCategory_Firefight: [GameEngine.HALO_3_ODST, GameEngine.HALO_REACH],
    GameCategory_Stockpile: [GameEngine.HALO_REACH],
    GameCategory_Headhunter: [GameEngine.HALO_2, GameEngine.HALO_REACH],
    GameCategory_Invasion: [GameEngine.HALO_REACH],
    GameCategory_ActionSack: [GameEngine.HALO_REACH],
    GameCategory_PreGameWarmUp: [GameEngine.HALO_1, GameEngine.HALO_2, GameEngine.HALO_2A, GameEngine.HALO_3, GameEngine.HALO_REACH, GameEngine.HALO_4],
    GameCategory_GunGame: [GameEngine.HALO_3, GameEngine.HALO_3_ODST]
});

const STOCK_VARIANT_ENGINES = Object.freeze({
    GameCategory_GunGame: Object.freeze([GameEngine.HALO_2A, GameEngine.HALO_REACH, GameEngine.HALO_4])
});

const ADDITIONAL_CATEGORY_ENGINES = Object.freeze({
    GameCategory_Juggernaut: Object.freeze([GameEngine.HALO_4]),
    GameCategory_Grifball: Object.freeze([GameEngine.HALO_2A]),
    GameCategory_VIP: Object.freeze([GameEngine.HALO_REACH])
});

const CATEGORY_SPECS = Object.freeze([
    [0, 'GameCategory_CTF', 'Capture the Flag', ['CTF', 'CaptureTheFlag']],
    [1, 'GameCategory_Slayer', 'Slayer'],
    [2, 'GameCategory_Oddball', 'Oddball'],
    [3, 'GameCategory_KOTH', 'King of the Hill', ['KOTH', 'King']],
    [4, 'GameCategory_Juggernaut', 'Juggernaut'],
    [5, 'GameCategory_Infection', 'Infection'],
    [6, 'GameCategory_Flood', 'Flood'],
    [7, 'GameCategory_Race', 'Race'],
    [8, 'GameCategory_Extraction', 'Extraction'],
    [9, 'GameCategory_Dominion', 'Dominion'],
    [10, 'GameCategory_Regicide', 'Regicide'],
    [11, 'GameCategory_Grifball', 'Grifball'],
    [12, 'GameCategory_Ricochet', 'Ricochet'],
    [13, 'GameCategory_Sandbox', 'Sandbox', ['Forge', 'Basic Editing']],
    [14, 'GameCategory_VIP', 'VIP'],
    [15, 'GameCategory_Territories', 'Territories'],
    [16, 'GameCategory_Assault', 'Assault'],
    [17, 'GameCategory_Payback', 'Payback'],
    [18, 'GameCategory_Campaign', 'Campaign'],
    [19, 'GameCategory_Playlist', 'Playlist'],
    [20, 'GameCategory_Firefight', 'Firefight'],
    [21, 'GameCategory_Stockpile', 'Stockpile'],
    [22, 'GameCategory_Headhunter', 'Headhunter'],
    [23, 'GameCategory_Invasion', 'Invasion'],
    [24, 'GameCategory_ActionSack', 'Action Sack', ['ActionSack', 'Minigames']],
    [25, 'GameCategory_SpartanOps', 'Spartan Ops', ['SpartanOps']],
    [26, 'GameCategory_PreGameWarmUp', 'Pre-Game Warm Up', ['Pre-Game', 'PreGameWarmUp']],
    [27, 'GameCategory_GunGame', 'Escalation Slayer', ['Gun Game', 'GunGame']],
    [28, 'GameCategory_NONE', 'None', ['NONE']]
]);

/** Stable symbolic protocol tokens for consumers that do not need metadata. */
export const GameCategory = Object.freeze({
    CTF: 'GameCategory_CTF',
    SLAYER: 'GameCategory_Slayer',
    ODDBALL: 'GameCategory_Oddball',
    KOTH: 'GameCategory_KOTH',
    JUGGERNAUT: 'GameCategory_Juggernaut',
    INFECTION: 'GameCategory_Infection',
    FLOOD: 'GameCategory_Flood',
    RACE: 'GameCategory_Race',
    EXTRACTION: 'GameCategory_Extraction',
    DOMINION: 'GameCategory_Dominion',
    REGICIDE: 'GameCategory_Regicide',
    GRIFBALL: 'GameCategory_Grifball',
    RICOCHET: 'GameCategory_Ricochet',
    SANDBOX: 'GameCategory_Sandbox',
    VIP: 'GameCategory_VIP',
    TERRITORIES: 'GameCategory_Territories',
    ASSAULT: 'GameCategory_Assault',
    PAYBACK: 'GameCategory_Payback',
    CAMPAIGN: 'GameCategory_Campaign',
    PLAYLIST: 'GameCategory_Playlist',
    FIREFIGHT: 'GameCategory_Firefight',
    STOCKPILE: 'GameCategory_Stockpile',
    HEADHUNTER: 'GameCategory_Headhunter',
    INVASION: 'GameCategory_Invasion',
    ACTION_SACK: 'GameCategory_ActionSack',
    SPARTAN_OPS: 'GameCategory_SpartanOps',
    PRE_GAME_WARM_UP: 'GameCategory_PreGameWarmUp',
    GUN_GAME: 'GameCategory_GunGame',
    NONE: 'GameCategory_NONE'
});

function availabilityFor(token) {
    const entries = {};
    for (const engine of CAREER_DB_ENGINES[token] || []) {
        entries[ENGINE_ID[engine]] = Object.freeze({ source: 'careerdb' });
    }
    for (const engine of STOCK_VARIANT_ENGINES[token] || []) {
        entries[ENGINE_ID[engine]] = Object.freeze({ source: 'installed-stock-variant' });
    }
    for (const engine of ADDITIONAL_CATEGORY_ENGINES[token] || []) {
        entries[ENGINE_ID[engine]] = Object.freeze({ source: 'production-fileshare-wire' });
    }
    return Object.freeze(entries);
}

function makeDefinition([categoryId, token, name, aliases = []]) {
    const availability = availabilityFor(token);
    return Object.freeze({
        name,
        displayName: name,
        categoryId,
        id: categoryId,
        token,
        category: token,
        aliases: Object.freeze([...aliases]),
        engines: Object.freeze(Object.keys(availability).map(Number).sort((left, right) => left - right)),
        availability
    });
}

/** All 29 global MCC categories, keyed by canonical display name. */
export const GameCategories = Object.freeze(Object.fromEntries(
    CATEGORY_SPECS.map(spec => {
        const definition = makeDefinition(spec);
        return [definition.name, definition];
    })
));

export const GameCategoriesById = Object.freeze(Object.fromEntries(
    Object.values(GameCategories).map(definition => [definition.categoryId, definition])
));

export const GameCategoriesByToken = Object.freeze(Object.fromEntries(
    Object.values(GameCategories).map(definition => [definition.token, definition])
));

function normalizedEngineId(engineIdOrKey) {
    return getGameEngineFromId(engineIdOrKey)?.id ?? null;
}

function normalizedName(value) {
    return String(value ?? '').trim().toLocaleLowerCase('en-US').replace(/[\s_-]+/gu, ' ');
}

function namesFor(definition) {
    return [
        definition.name,
        definition.token,
        definition.token.replace(/^GameCategory_/u, ''),
        ...definition.aliases
    ].map(normalizedName);
}

function parseGlobalCategoryId(value) {
    if (value === null || value === undefined || value === '' || typeof value === 'boolean') return null;
    const numericId = Number(value);
    return Number.isInteger(numericId) ? numericId : null;
}

/** Resolve a global wire/category ID. */
export function getGameCategoryById(categoryId) {
    const numericId = parseGlobalCategoryId(categoryId);
    return numericId === null ? null : GameCategoriesById[numericId] || null;
}

export function getGameCategoryName(categoryId) {
    const category = getGameCategoryById(categoryId);
    return category ? category.name : `Unknown Category #${categoryId}`;
}

/** Categories proven available for a title, ordered by global ID. */
export function getGameCategoriesByEngine(engineIdOrKey) {
    const engineId = normalizedEngineId(engineIdOrKey);
    if (engineId === null) return [];
    return Object.values(GameCategories).filter(category => category.engines.includes(engineId));
}

export function findGameCategoryByName(searchName, exactMatch = false) {
    const search = normalizedName(searchName);
    if (!search) return null;
    const categories = Object.values(GameCategories);
    const exact = categories.find(category => namesFor(category).includes(search));
    if (exact || exactMatch) return exact || null;
    return categories.find(category => namesFor(category).some(name => name.includes(search))) || null;
}

export function findGameCategoriesByName(searchName) {
    const search = normalizedName(searchName);
    if (!search) return [];
    return Object.values(GameCategories).filter(category =>
        namesFor(category).some(name => name.includes(search))
    );
}

/**
 * Return the one global wire ID for a category. An engine scope only checks
 * proven availability; it never translates to a binary-format internal ID.
 */
export function getCategoryIds(category, engineIdOrKey = null) {
    const definition = typeof category === 'object' && category !== null
        ? GameCategoriesById[Number(category.categoryId)]
        : findGameCategoryByName(category, true) || getGameCategoryById(category);
    if (!definition) return [];
    if (engineIdOrKey !== null && engineIdOrKey !== undefined
        && !isCategoryAvailableForEngine(definition.categoryId, engineIdOrKey)) return [];
    return [definition.categoryId];
}

export function isCategoryAvailableForEngine(categoryId, engineIdOrKey) {
    const category = getGameCategoryById(categoryId);
    const engineId = normalizedEngineId(engineIdOrKey);
    return Boolean(category && engineId !== null && category.engines.includes(engineId));
}
