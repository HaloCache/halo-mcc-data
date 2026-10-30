/**
 * Leaderboard Definitions
 *
 * Board names are composed rather than stored, and the game is encoded in the
 * MapId range rather than a prefix:
 *
 *   LBBestMission{Score64|TimeMS}DifficultyId{d}MapId{m}Coop{c}
 *   LBBestPlaylist{Score64|TimeMS}PlaylistId{u}
 *
 * leaderboards.json records which of those names the service answers for.
 *
 * @module definitions/leaderboards
 */

import { readFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync(new URL('./leaderboards.json', import.meta.url), 'utf8'));

/**
 * Wire token for each metric a board can rank by.
 * @readonly
 * @enum {string}
 */
export const LEADERBOARD_METRICS = Object.freeze({
    scoring: 'Score64',
    timing: 'TimeMS'
});

/**
 * `x-xbl-contract-version` semantics, told apart by the error each returns.
 * @readonly
 */
export const LEADERBOARD_CONTRACT = Object.freeze({
    /** The board-name API; a bad name gives ValidLeaderboardNameNotFound. */
    LEADERBOARD_NAME: '3',
    /** The stat-based API; a bad stat gives ValidStatNameNotFound. */
    STAT: '4'
});

/**
 * The four board-name templates and the parameters each takes. Versions 1 and 2
 * also serve the board-name API; version 7 is UnsupportedContractVersion.
 * @readonly
 */
export const LEADERBOARD_CATEGORIES = Object.freeze([
    {
        kind: 'mission',
        metric: 'scoring',
        template: 'LBBestMissionScore64DifficultyId{difficultyId}MapId{mapId}Coop{coop}',
        params: Object.freeze(['difficultyId', 'mapId', 'coop']),
        wireNameStatus: 'confirmed'
    },
    {
        kind: 'mission',
        metric: 'timing',
        template: 'LBBestMissionTimeMSDifficultyId{difficultyId}MapId{mapId}Coop{coop}',
        params: Object.freeze(['difficultyId', 'mapId', 'coop']),
        wireNameStatus: 'confirmed'
    },
    {
        kind: 'playlist',
        metric: 'scoring',
        template: 'LBBestPlaylistScore64PlaylistId{playlistId}',
        params: Object.freeze(['playlistId']),
        wireNameStatus: 'confirmed'
    },
    {
        kind: 'playlist',
        metric: 'timing',
        template: 'LBBestPlaylistTimeMSPlaylistId{playlistId}',
        params: Object.freeze(['playlistId']),
        wireNameStatus: 'confirmed'
    }
].map(Object.freeze));

/** The board-name templates alone, in the same order as the categories. */
export const LEADERBOARD_BOARD_NAME_TEMPLATES = Object.freeze(
    LEADERBOARD_CATEGORIES.map(category => category.template)
);

/**
 * Compose a leaderboard board name.
 *
 * @param {Object} board
 * @param {'mission'|'playlist'} board.kind - Which template to compose
 * @param {'scoring'|'timing'|'Score64'|'TimeMS'} board.metric - Metric, friendly or wire form
 * @param {number} [board.difficultyId] - Mission only, 0 Easy to 3 Legendary
 * @param {number} [board.mapId] - Mission only, e.g. 179 for ONI Sword Base
 * @param {number} [board.coop] - Mission only, 0 solo or 1 coop
 * @param {number} [board.playlistId] - Playlist only
 * @returns {string} The board name to send as the leaderboard `name`
 */
export function buildLeaderboardName(board) {
    const metric = LEADERBOARD_METRICS[board.metric] || board.metric;
    if (metric !== 'Score64' && metric !== 'TimeMS') {
        throw new Error(`metric must be scoring|timing (Score64|TimeMS), got ${board.metric}`);
    }
    if (board.kind === 'mission') {
        if (board.difficultyId == null || board.mapId == null || board.coop == null) {
            throw new Error('mission leaderboard name requires { difficultyId, mapId, coop }');
        }
        return `LBBestMission${metric}DifficultyId${board.difficultyId}MapId${board.mapId}Coop${board.coop}`;
    }
    if (board.kind === 'playlist') {
        if (board.playlistId == null) throw new Error('playlist leaderboard name requires { playlistId }');
        return `LBBestPlaylist${metric}PlaylistId${board.playlistId}`;
    }
    throw new Error(`kind must be mission|playlist, got ${board.kind}`);
}

/**
 * Per-game mission map ids, the difficulty and coop values that answer, and the
 * confirmed playlist boards.
 * @readonly
 */
export const LeaderboardCatalog = Object.freeze(catalog);

/** Game keys the catalog carries campaign boards for. */
export const LeaderboardGames = Object.freeze(Object.keys(catalog.games));

/**
 * Confirmed playlist boards. Playlist ids are large matchmaking content ids
 * rather than a static table, so this covers the active playlists only; see
 * `LeaderboardCatalog.metadata.playlistIdSourceStatus`.
 * @readonly
 */
export const LeaderboardPlaylists = Object.freeze(catalog.playlists?.boards ?? []);

/** Functional campaign boards in the catalog. */
export const LEADERBOARD_BOARD_COUNT = catalog.metadata.totalFunctionalCampaignBoards;

/** Confirmed playlist boards in the catalog. */
export const LEADERBOARD_PLAYLIST_BOARD_COUNT = catalog.metadata.playlistBoards ?? 0;

/**
 * Every board the catalog can address, as specs carrying the composed `name`.
 *
 * @param {Object} [options]
 * @param {string} [options.game] - Restrict campaign boards to one game key
 * @param {'mission'|'playlist'} [options.kind] - Restrict to campaign or playlist boards
 * @returns {Array<Object>} One spec per board
 */
export function enumerateLeaderboards(options = {}) {
    const boards = [];

    if (!options.kind || options.kind === 'mission') {
        const games = options.game
            ? { [options.game]: catalog.games[options.game] }
            : catalog.games;
        for (const [game, entry] of Object.entries(games)) {
            if (!entry) continue;
            for (const mapId of entry.missionMapIds) {
                for (const difficultyId of entry.difficulties) {
                    for (const coop of entry.coops) {
                        for (const wire of entry.metrics) {
                            const metric = wire === 'Score64' ? 'scoring' : 'timing';
                            boards.push({
                                game,
                                kind: 'mission',
                                metric,
                                difficultyId,
                                mapId,
                                coop,
                                name: buildLeaderboardName({ kind: 'mission', metric, difficultyId, mapId, coop })
                            });
                        }
                    }
                }
            }
        }
    }

    // Cross-game playlists share one id space and cannot be attributed to a
    // single engine, so a game filter excludes playlist boards.
    if ((!options.kind || options.kind === 'playlist') && !options.game) {
        for (const board of catalog.playlists?.boards ?? []) {
            for (const wire of board.metrics) {
                const metric = wire === 'Score64' ? 'scoring' : 'timing';
                boards.push({
                    game: board.crossgame ? 'CrossGame' : null,
                    kind: 'playlist',
                    metric,
                    playlistId: board.playlistId,
                    label: board.label,
                    crossgame: board.crossgame,
                    name: buildLeaderboardName({ kind: 'playlist', metric, playlistId: board.playlistId })
                });
            }
        }
    }

    return boards;
}
