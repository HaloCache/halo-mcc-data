/**
 * Maps Aggregator and Lookup Logic
 * @module maps
 */

import { GameEngine } from '../definitions/engines.js';

import { H1_MAPS, H2_MAPS, ODST_MAPS } from './others.js';
import { H2A_MAPS } from './halo2.js';
import { H3_MAPS } from './halo3.js';
import { H4_MAPS } from './halo4.js';
import { REACH_MAPS } from './haloreach.js';


const MAP_DATA = {
    [GameEngine.HALO_1]: H1_MAPS,
    [GameEngine.HALO_2]: H2_MAPS,
    [GameEngine.HALO_2A]: H2A_MAPS,
    [GameEngine.HALO_3]: H3_MAPS,
    [GameEngine.HALO_3_ODST]: ODST_MAPS,
    [GameEngine.HALO_REACH]: REACH_MAPS,
    [GameEngine.HALO_4]: H4_MAPS
};

/**
 * Processed Map Data
 * Indexed by Engine -> Category -> FileShareID
 */
export const Maps = {};
Object.keys(MAP_DATA).forEach(engine => {
    Maps[engine] = {};
    const engineData = MAP_DATA[engine];
    Object.keys(engineData).forEach(cat => {
        engineData[cat].forEach(map => {
            const engineSlug = engine.toLowerCase().replace(/[^a-z0-9]/g, '');
            const mapIdSlug = map.id.toLowerCase().replace(/-/g, '_');
            const builtInId = map.builtInId ?? `_map_id_${engineSlug}_${mapIdSlug}`;

            (map.ids.fileshare || []).forEach(vid => {
                if (!Maps[engine][cat]) Maps[engine][cat] = {};
                Maps[engine][cat][vid] = {
                    id: map.id,
                    name: map.name,
                    builtInId: builtInId,
                    type: cat === 'Multiplayer' ? 'Map' : cat
                };
            });
        });
    });
    Object.freeze(Maps[engine]);
});

/**
 * Get map data by legacy ID (FileShare/BungieNet ID).
 * @param {string} engine - Engine from GameEngine enum
 * @param {number|string} legacyId - Map legacy ID
 * @param {string} [type] - Optional type filter (Multiplayer, etc.)
 * @returns {Object|null} Map data or null
 */
export function getMapByLegacyId(engine, legacyId, type = null) {
    const engineMaps = Maps[engine];
    if (!engineMaps) return null;
    if (type) return engineMaps[type]?.[legacyId] || null;

    if (engineMaps.Multiplayer?.[legacyId]) return engineMaps.Multiplayer[legacyId];
    if (engineMaps.Campaign?.[legacyId]) return engineMaps.Campaign[legacyId];
    if (engineMaps.Firefight?.[legacyId]) return engineMaps.Firefight[legacyId];
    if (engineMaps.SpartanOps?.[legacyId]) return engineMaps.SpartanOps[legacyId];
    return null;
}

export function getMapByCodeName(engine, codeName) {
    const engineMaps = Maps[engine];
    if (!engineMaps) return null;
    for (const type of Object.values(engineMaps)) {
        const found = Object.values(type).find(m => m.id === codeName);
        if (found) return found;
    }
    return null;
}

export function findMapAcrossEngines(legacyId, type = null) {
    const engines = Object.values(GameEngine);
    for (const engine of engines) {
        const map = getMapByLegacyId(engine, legacyId, type);
        if (map) return { ...map, engine, legacyId: Number(legacyId) };
    }
    return null;
}

/**
 * Display-name prefix for unresolved map IDs.
 */
export const MAP_PLACEHOLDER_PREFIX = 'PLACEHOLDER #';

/**
 * Build a displayable placeholder for an unresolved map ID.
 * The engine remains null and `placeholder` is true.
 *
 * @param {number|string} legacyId - The unresolved map id
 * @returns {{id: string, name: string, engine: null, placeholder: true, legacyId: number, builtInId: null, type: 'Map'}}
 */
export function getMapPlaceholder(legacyId) {
    const numeric = Number(legacyId);
    return {
        id: `placeholder_${numeric}`,
        name: `${MAP_PLACEHOLDER_PREFIX}${numeric}`,
        engine: null,
        placeholder: true,
        legacyId: numeric,
        builtInId: null,
        type: 'Map',
    };
}

/**
 * Resolve a map ID or return a placeholder.
 * Check `placeholder` to distinguish unresolved IDs from catalog entries.
 *
 * @param {number|string} legacyId
 * @param {string} [type]
 * @returns {Object} A real map record, or a placeholder
 */
export function findMapOrPlaceholder(legacyId, type = null) {
    return findMapAcrossEngines(legacyId, type) ?? getMapPlaceholder(legacyId);
}

export function getMap(engine, type, id) {
    return getMapByLegacyId(engine, id, type);
}

export function getMapName(engine, legacyId, type = null) {
    const map = getMapByLegacyId(engine, legacyId, type);
    return map?.name || null;
}

export function getMapNameAcrossEngines(legacyId, type = null) {
    const mapData = findMapAcrossEngines(legacyId, type);
    return mapData?.name || null;
}

export function findMapIdByName(name, engine = null) {
    const results = findMapIdsByName(name, engine);
    return results.length > 0 ? results[0] : null;
}

/**
 * Find all IDs matching a map name, including duplicate names across engines.
 */
export function findMapIdsByName(name, engine = null) {
    if (!name) return [];

    const fallbackMatch = name.match(/^NOT_DEFINED \(#(\d+)\)$/);
    if (fallbackMatch) {
        return [{
            legacyId: Number(fallbackMatch[1]),
            engine: engine ?? null,
            type: null,
            name,
            id: `unknown_${fallbackMatch[1]}`
        }];
    }

    const lowerName = name.toLowerCase();
    const results = [];

    const searchEngines = engine
        ? [engine]
        : Object.values(GameEngine);

    for (const eng of searchEngines) {
        const engineMaps = Maps[eng];
        if (!engineMaps) continue;

        for (const type of ['Multiplayer', 'Campaign', 'Firefight', 'SpartanOps']) {
            const typeMap = engineMaps[type];
            if (!typeMap) continue;

            for (const [id, mapData] of Object.entries(typeMap)) {
                if (mapData.name.toLowerCase() === lowerName) {
                    results.push({
                        legacyId: Number(id),
                        engine: eng,
                        type,
                        ...mapData
                    });
                }
            }
        }
    }
    return results;
}
