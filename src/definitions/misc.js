/**
 * Miscellaneous Enums (Content Types, Regions, Platforms)
 * @module definitions/misc
 */

/**
 * Content types for FileShare items.
 * @readonly
 * @enum {string}
 */
export const ContentType = Object.freeze({
    MAP_VARIANT: 'MapVariant',
    GAME_VARIANT: 'GameVariant',
    SCREENSHOT: 'Screenshot',
    FILM: 'Film',
    PREFAB: 'Prefab'
});

/**
 * Source platform IDs (as returned by API).
 * @readonly
 * @type {Readonly<Record<string, string>>}
 */
export const SourcePlatformId = Object.freeze({
    '1': 'Xbox',
    '2': 'PC'
});

/**
 * Server regions for CGB (Custom Game Browser).
 * @readonly
 * @enum {number}
 */
export const ServerRegion = Object.freeze({
    EAST_US: 0,
    WEST_US: 1,
    NORTH_CENTRAL_US: 2,
    SOUTH_CENTRAL_US: 3,
    EAST_AUSTRALIA: 4,
    SOUTHEAST_ASIA: 5,
    NORTH_EUROPE: 6,
    WEST_EUROPE: 7,
    BRAZIL: 8,
    JAPAN_EAST: 9,
    JAPAN_WEST: 10
});

/**
 * Server region display names.
 * @readonly
 * @type {Readonly<Record<number, string>>}
 */
export const ServerRegionNames = Object.freeze({
    [ServerRegion.EAST_US]: 'East US',
    [ServerRegion.WEST_US]: 'West US',
    [ServerRegion.NORTH_CENTRAL_US]: 'North Central US',
    [ServerRegion.SOUTH_CENTRAL_US]: 'South Central US',
    [ServerRegion.EAST_AUSTRALIA]: 'East Australia',
    [ServerRegion.SOUTHEAST_ASIA]: 'Southeast Asia',
    [ServerRegion.NORTH_EUROPE]: 'North Europe',
    [ServerRegion.WEST_EUROPE]: 'West Europe',
    [ServerRegion.BRAZIL]: 'Brazil',
    [ServerRegion.JAPAN_EAST]: 'Japan East',
    [ServerRegion.JAPAN_WEST]: 'Japan West'
});

/**
 * Get the source platform name from API string ID.
 * @param {string} platformId - Platform ID string from API
 * @returns {string|null} Platform name (e.g., "Xbox") or null
 */
export function getSourcePlatformById(platformId) {
    return SourcePlatformId[platformId] || null;
}

/**
 * Get the display name for a server region.
 * @param {number} region - Region ID (from ServerRegion enum)
 * @returns {string} Display name or "Unknown"
 */
export function getServerRegionName(region) {
    return ServerRegionNames[region] || 'Unknown';
}
