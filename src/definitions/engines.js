/**
 * Game Engine Enums and Definitions
 * @module definitions/engines
 */

/**
 * Game Engine Enum
 * @readonly
 * @enum {string}
 */
export const GameEngine = Object.freeze({
    HALO_1: 'Halo1',
    HALO_2: 'Halo2',
    HALO_2A: 'Halo2A',
    HALO_3: 'Halo3',
    HALO_3_ODST: 'Halo3ODST',
    HALO_REACH: 'HaloReach',
    HALO_4: 'Halo4',
    FIREFIGHT: 'Firefight'
});

/**
 * Game Engine Definitions
 *
 * Centralizes all metadata for Halo engines:
 * - id: The canonical "UI ID" used in filters and badges (0-6)
 * - apiId: The string ID used in the MCC FileShare API
 * - name: Full display name
 * - short: Acronym (H1, H2, etc.) for badges
 * - color: System color name for badges (gold, blue, green, gray)
 */
export const GameEngineDefinitions = Object.freeze({
    [GameEngine.HALO_1]: {
        id: 0,
        apiId: '0',
        name: 'Halo: Combat Evolved',
        short: 'H1',
        color: 'gray'
    },
    [GameEngine.HALO_2]: {
        id: 1,
        apiId: '1',
        name: 'Halo 2',
        short: 'H2',
        color: 'blue'
    },
    [GameEngine.HALO_3]: {
        id: 2,
        apiId: '2',
        name: 'Halo 3',
        short: 'H3',
        color: 'gold'
    },
    [GameEngine.HALO_4]: {
        id: 3,
        apiId: '3',
        name: 'Halo 4',
        short: 'H4',
        color: 'blue'
    },
    [GameEngine.HALO_3_ODST]: {
        id: 5,
        apiId: '5',
        name: 'Halo 3: ODST',
        short: 'ODST',
        color: 'gray'
    },
    [GameEngine.HALO_2A]: {
        id: 4,
        apiId: '4',
        name: 'Halo 2: Anniversary',
        short: 'H2A',
        color: 'green'
    },
    [GameEngine.HALO_REACH]: {
        id: 6,
        apiId: '6',
        name: 'Halo: Reach',
        short: 'HR',
        color: 'gray'
    },
    [GameEngine.FIREFIGHT]: {
        id: 7,
        apiId: '7',
        name: 'Firefight',
        short: 'FF',
        color: 'red'
    }
});


export const GameEngineId = Object.freeze(
    Object.fromEntries(
        Object.entries(GameEngineDefinitions).map(([key, def]) => [def.apiId, key])
    )
);

export const GameEngineNames = Object.freeze(
    Object.fromEntries(
        Object.entries(GameEngineDefinitions).map(([key, def]) => [key, def.name])
    )
);

export const GameEngineAcronym = Object.freeze(
    Object.fromEntries(
        Object.entries(GameEngineDefinitions).map(([key, def]) => [key, def.short])
    )
);

/**
 * Get an engine definition from a numeric API ID, its string representation,
 * or a GameEngine key.
 *
 * @param {string|number} idOrKey - API ID (e.g. "2" or 2) or engine key (e.g. 'Halo3')
 * @returns {Object|null} Definition or null
 */
export function getGameEngineFromId(idOrKey) {
    if (idOrKey == null) return null;

    if (Object.prototype.hasOwnProperty.call(GameEngineDefinitions, idOrKey)) {
        return GameEngineDefinitions[idOrKey];
    }

    const key = GameEngineId[String(idOrKey)];
    return key ? GameEngineDefinitions[key] : null;
}

/**
 * Get display name from an API ID or engine key.
 * @param {string|number} idOrKey
 * @returns {string} Display name or 'Unknown'
 */
export function getGameEngineName(idOrKey) {
    const def = getGameEngineFromId(idOrKey);
    return def ? def.name : 'Unknown';
}

/**
 * Get short acronym from an API ID or engine key.
 * @param {string|number} idOrKey
 * @returns {string} Acronym or '??'
 */
export function getGameEngineShort(idOrKey) {
    const def = getGameEngineFromId(idOrKey);
    return def ? def.short : '??';
}

/**
 * Get GameEngine Enum Key from an API ID or engine key.
 * @param {string|number} idOrKey
 * @returns {string|null} Enum Key (e.g. 'Halo3') or null
 */
export function getGameEngineKey(idOrKey) {
    if (idOrKey == null) return null;
    if (Object.prototype.hasOwnProperty.call(GameEngineDefinitions, idOrKey)) return String(idOrKey);
    return GameEngineId[String(idOrKey)] || null;
}

/**
 * Get all game engines as an array in default order.
 * @returns {Object[]} Array of engine definitions
 */
export function getAllGameEngines() {
    return Object.values(GameEngineDefinitions);
}
