/**
 * Definitions, maps, and constants for Halo: The Master Chief Collection.
 *
 * @module halo-mcc-data
 */

/**
 * Valid Game Engine IDs
 */
export enum GameEngine {
    HALO_1 = "Halo1",
    HALO_2 = "Halo2",
    HALO_3 = "Halo3",
    HALO_3_ODST = "Halo3ODST",
    HALO_REACH = "HaloReach",
    HALO_4 = "Halo4",
    HALO_2A = "Halo2A",
    FIREFIGHT = "Firefight"
}

/**
 * Game Categories (Multiplayer Modes)
 * Note: These are general categories; specific engines may not support all.
 */
export enum GameCategory {
    CTF = "GameCategory_CTF",
    SLAYER = "GameCategory_Slayer",
    ODDBALL = "GameCategory_Oddball",
    KOTH = "GameCategory_KOTH",
    RACE = "GameCategory_Race",
    HEADHUNTER = "GameCategory_Headhunter",
    JUGGERNAUT = "GameCategory_Juggernaut",
    TERRITORIES = "GameCategory_Territories",
    ASSAULT = "GameCategory_Assault",
    VIP = "GameCategory_VIP",
    INFECTION = "GameCategory_Infection",
    SANDBOX = "GameCategory_Sandbox",
    FIREFIGHT = "GameCategory_Firefight",
    GUN_GAME = "GameCategory_GunGame",
    INVASION = "GameCategory_Invasion",
    STOCKPILE = "GameCategory_Stockpile",
    ACTION_SACK = "GameCategory_ActionSack",
    PRE_GAME_WARM_UP = "GameCategory_PreGameWarmUp",
    FLOOD = "GameCategory_Flood",
    RICOCHET = "GameCategory_Ricochet",
    EXTRACTION = "GameCategory_Extraction",
    DOMINION = "GameCategory_Dominion",
    REGICIDE = "GameCategory_Regicide",
    PAYBACK = "GameCategory_Payback",
    GRIFBALL = "GameCategory_Grifball",
    CAMPAIGN = "GameCategory_Campaign",
    PLAYLIST = "GameCategory_Playlist",
    SPARTAN_OPS = "GameCategory_SpartanOps",
    NONE = "GameCategory_NONE"
}

export const ENDPOINTS: {
    readonly PLAYFAB: Readonly<Record<string, string>>;
    readonly MCC: Readonly<Record<string, string>>;
    readonly WAYPOINT: Readonly<Record<string, string>>;
    readonly GAME_CMS: Readonly<Record<string, string>>;
    readonly XBOX: Readonly<Record<string, string>>;
};

export const BUILD_ID: string;
export const PLAYFAB_TITLE_ID: string;

/** MCC's Service Configuration Id, required in leaderboard and user-stats paths. */
export const MCC_SCID: string;
/** Xbox Live real-time activity socket. */
export const XBOX_LIVE_RTA_SOCKET: string;
/** MCC's Xbox Live title id, in decimal. */
export const MCC_XBL_TITLE_ID: number;
export const RELYING_PARTIES: Readonly<Record<'XBOX_LIVE' | 'PLAYFAB' | 'HALO_WAYPOINT', string>>;
export const DEFAULT_HEADERS: Readonly<Record<string, string>>;
export const MCC_DATACENTERS: readonly string[];
export const MCC_RELAY_SERVERS: readonly string[];

export interface RateLimitObservation {
    maxRequests: number | null;
    periodInSeconds: number | null;
    retryAfterSeconds?: number;
    hasRetryAfter: boolean;
    hasRateLimitBody?: boolean;
    errorCode?: number;
    errorType?: string;
}

export const XBOX_PROFILE_RATE_LIMIT: Readonly<RateLimitObservation>;
export const PLAYFAB_INVENTORY_RATE_LIMIT: Readonly<RateLimitObservation>;
export const PLAYFAB_RATE_LIMIT: Readonly<RateLimitObservation>;
export const MCC_RATE_LIMIT: Readonly<RateLimitObservation>;
export const AZURE_BLOB_RATE_LIMIT: Readonly<RateLimitObservation>;
export const GAME_CMS_RATE_LIMIT: Readonly<RateLimitObservation>;

export interface GameEngineDefinition {
    id: number;
    apiId: string;
    name: string;
    short: string;
    color: string;
}

export const GameEngineDefinitions: Readonly<Record<GameEngine, Readonly<GameEngineDefinition>>>;
export const GameEngineId: Readonly<Record<string, GameEngine>>;
export const GameEngineNames: Readonly<Record<GameEngine, string>>;
export const GameEngineAcronym: Readonly<Record<GameEngine, string>>;
export function getGameEngineFromId(idOrKey: string | number): Readonly<GameEngineDefinition> | null;
export function getGameEngineKey(idOrKey: string | number): GameEngine | null;
export function getGameEngineShort(idOrKey: string | number): string;
export function getAllGameEngines(): ReadonlyArray<Readonly<GameEngineDefinition>>;

export const ContentType: Readonly<Record<
    'MAP_VARIANT' | 'GAME_VARIANT' | 'SCREENSHOT' | 'FILM' | 'PREFAB',
    string
>>;
export const SourcePlatformId: Readonly<Record<string, string>>;
export const ServerRegion: Readonly<Record<string, number>>;
export const ServerRegionNames: Readonly<Record<number, string>>;
export function getSourcePlatformById(platformId: string): string | null;
export function getServerRegionName(region: number): string;

export const CATEGORY_IMAGE_FILENAMES: Readonly<Record<string, string>>;
export function getGameTypeImageFilename(categoryName: string): string | null;
/** A nameplate as playercustomization.xml spells it. */
export interface NameplateDefinition {
    id: string;
    image: string;
    name: string;
    unlock_key?: string;
    lockdesc?: string;
    allow_team_color?: string;
    is_platinum?: string;
}

/**
 * An unlockdb rule. `id` is the `unlock_key` a definition points at; which extra
 * attribute carries the target depends on `type`, and a PlayfabInventory rule
 * carries none.
 */
export interface NameplateUnlockDefinition {
    id: string;
    type: string;
    category: string;
    state: string;
    achievementID?: string;
    entitlement?: string;
}

/** One evidence list, and whether it is known to be complete. */
export interface UnlockProviderEvidence {
    ids: Array<string | number>;
    complete?: boolean;
}

/** What is known about a player, for resolving an unlock rule. */
export interface UnlockEvidence {
    achievements?: UnlockProviderEvidence;
    entitlements?: UnlockProviderEvidence;
    inventory?: UnlockProviderEvidence;
    inventoryItemIdByUnlockKey?: Record<string, string>;
}

/** `unlocked` is null when the evidence cannot answer the rule. */
export interface UnlockState {
    id: string | null;
    unlockKey: string | null;
    type: string | null;
    unlocked: boolean | null;
    reason: string;
}

export const NameplateDefinitions: ReadonlyArray<Readonly<NameplateDefinition>>;
export const NameplateUnlockDefinitions: ReadonlyArray<Readonly<NameplateUnlockDefinition>>;
export const NameplateDefinitionSources: ReadonlyArray<Readonly<{ path: string; sha256: string }>>;
export function getNameplateDefinition(id: number | string): Readonly<NameplateDefinition> | null;
export function getNameplateUnlockDefinition(unlockKey: string): Readonly<NameplateUnlockDefinition> | null;
export function getNameplateImagePath(id: number | string): string | null;
export function getNameplateUnlockState(
    id: number | string,
    evidence?: UnlockEvidence
): Readonly<UnlockState>;

/** 8-bit colour channels, converted from the install's 0..1 floats. */
export interface Rgb {
    r: number;
    g: number;
    b: number;
}

/**
 * An emblem: two tinted layers, image1 the foreground symbol and image2 the
 * background. Packed art, so these are texture names rather than paths.
 */
export interface EmblemDefinition {
    id: string;
    name: string;
    image1: string;
    image2: string;
    image1_small: string;
    image2_small: string;
}

/** A palette colour, channels as 0..1 float strings. */
export interface ColorDefinition {
    id: string;
    r: string;
    g: string;
    b: string;
    name: string;
    customizationitem?: string;
}

/** A Player ID avatar. `image`/`image_large` are avatar-pack texture names. */
export interface AvatarDefinition {
    id: string;
    name: string;
    image: string;
    image_large?: string;
    unlock_key?: string;
    lockdesc?: string;
}

/**
 * A full armour set. `use_elite_model` is the model variant: Elite vs Spartan in
 * Halo 2A and 3, Female vs Male in Halo 4.
 */
export interface ArmorSetDefinition {
    id: string;
    name: string;
    image: string;
    use_elite_model: string;
    customizationitem?: string;
}

/** One armour piece. `type` is its slot; the id is unique only within it. */
export interface ArmorPieceDefinition {
    id: string;
    type: string;
    customizationitem: string;
}

/**
 * A firefight voice. Reach voice 0 misspells the key attribute as
 * `ustomizationitem`; getFirefightVoiceCustomizationItem reads either.
 */
export interface FirefightVoiceDefinition {
    id: string;
    customizationitem?: string;
    ustomizationitem?: string;
}

/** One appearance game's sections. */
export interface AppearanceBlock {
    Armor?: ReadonlyArray<Readonly<ArmorSetDefinition>>;
    Item?: ReadonlyArray<Readonly<ArmorPieceDefinition>>;
    Voice?: ReadonlyArray<Readonly<FirefightVoiceDefinition>>;
    Color?: ReadonlyArray<Readonly<ColorDefinition>>;
}

export const CUSTOMIZATION_TEXTURE_PACKS: Readonly<Record<string, string>>;
export const ArmorSlot: Readonly<Record<string, number>>;
export const AppearanceGameEngine: Readonly<Record<number, GameEngine>>;
export const REACH_APPEARANCE_GAME_ID: number;
export const EmblemDefinitions: ReadonlyArray<Readonly<EmblemDefinition>>;
export const ColorDefinitions: ReadonlyArray<Readonly<ColorDefinition>>;
export const AvatarDefinitions: ReadonlyArray<Readonly<AvatarDefinition>>;
export const AvatarUnlockDefinitions: ReadonlyArray<Readonly<NameplateUnlockDefinition>>;
export const TeamColorDefinitions: Readonly<Record<string, ReadonlyArray<Readonly<ColorDefinition>>>>;
export const AppearanceDefinitions: Readonly<Record<string, Readonly<AppearanceBlock>>>;
export const CustomizationDefinitionSources: ReadonlyArray<Readonly<{ path: string; sha256: string }>>;

export function getEmblemDefinition(id: number | string): Readonly<EmblemDefinition> | null;
export function getColorDefinition(id: number | string): Readonly<ColorDefinition> | null;
export function getColorRgb(id: number | string): Rgb | null;
export function getAvatarDefinition(id: number | string): Readonly<AvatarDefinition> | null;
export function getAvatarUnlockDefinition(unlockKey: string): Readonly<NameplateUnlockDefinition> | null;
export function getAvatarUnlockState(
    id: number | string,
    evidence?: UnlockEvidence
): Readonly<UnlockState>;
export function getTeamColorDefinition(
    gameId: number | string,
    colorId: number | string
): Readonly<ColorDefinition> | null;
export function getTeamColorRgb(gameId: number | string, colorId: number | string): Rgb | null;
export function getArmorSetDefinition(
    gameId: number | string,
    id: number | string,
    options?: { eliteModel?: boolean }
): Readonly<ArmorSetDefinition> | null;
export function getArmorPieceDefinitions(
    gameId: number | string,
    slot: number | string
): ReadonlyArray<Readonly<ArmorPieceDefinition>>;
export function getArmorPieceDefinition(
    gameId: number | string,
    slot: number | string,
    id: number | string
): Readonly<ArmorPieceDefinition> | null;
export function getArmorColorDefinition(
    gameId: number | string,
    id: number | string
): Readonly<ColorDefinition> | null;
export function getArmorColorRgb(gameId: number | string, id: number | string): Rgb | null;
export function getFirefightVoiceDefinition(
    gameId: number | string,
    id: number | string
): Readonly<FirefightVoiceDefinition> | null;
export function getFirefightVoiceCustomizationItem(
    gameId: number | string,
    id: number | string
): string | null;
export function getArmorSlotName(slot: number | string): string | null;
export function getArmorSlotType(name: string): number | null;
export function getArmorUnlockKey(customizationItem: string): string | null;

/** The parameters that compose one board name. */
export interface LeaderboardBoard {
    kind: 'mission' | 'playlist';
    metric: 'scoring' | 'timing' | 'Score64' | 'TimeMS';
    difficultyId?: number;
    mapId?: number;
    coop?: number;
    playlistId?: number;
}

/** One board-name template and the parameters it takes. */
export interface LeaderboardCategory {
    kind: 'mission' | 'playlist';
    metric: 'scoring' | 'timing';
    template: string;
    params: ReadonlyArray<string>;
    wireNameStatus: string;
}

/** An enumerated board, carrying the composed `name`. */
export interface LeaderboardBoardSpec {
    game: string | null;
    kind: 'mission' | 'playlist';
    metric: 'scoring' | 'timing';
    name: string;
    difficultyId?: number;
    mapId?: number;
    coop?: number;
    playlistId?: number;
    label?: string;
    crossgame?: boolean;
}

export const LEADERBOARD_METRICS: Readonly<Record<string, string>>;
export const LEADERBOARD_CONTRACT: Readonly<Record<string, string>>;
export const LEADERBOARD_CATEGORIES: ReadonlyArray<Readonly<LeaderboardCategory>>;
export const LEADERBOARD_BOARD_NAME_TEMPLATES: ReadonlyArray<string>;
export const LEADERBOARD_BOARD_COUNT: number;
export const LEADERBOARD_PLAYLIST_BOARD_COUNT: number;
export const LeaderboardCatalog: Readonly<Record<string, unknown>>;
export const LeaderboardGames: ReadonlyArray<string>;
export const LeaderboardPlaylists: ReadonlyArray<Readonly<Record<string, unknown>>>;
export function buildLeaderboardName(board: LeaderboardBoard): string;
export function enumerateLeaderboards(options?: {
    game?: string;
    kind?: 'mission' | 'playlist';
}): LeaderboardBoardSpec[];

export const VariantNameLookup: Readonly<Record<string, string>>;
export function cleanName(value: unknown): string;
export function stripBom(value: unknown): unknown;

export const XBOX_API_CONFIG: Readonly<{ CONTRACT_VERSION: string }>;
export const XBOX_LIVE: Readonly<{ SERVICE_NAME: string }>;
export const XBOX_PROFILE_SETTINGS: Readonly<Record<string, string>>;
export const XBOX_PROFILE_SETTINGS_ALL: readonly string[];
export function buildXboxProfileUrl(identifier: string | number, isXuid?: boolean): string;
export function buildXboxBatchProfileUrl(): string;


export interface MapInfo {
    /** Friendly ID/Slug (e.g. "beavercreek") */
    id: string;
    /** Display Name (e.g. "Battle Creek") */
    name: string;
    /** Internal MCC ID */
    builtInId: string;
    /** ODST Firefight Insertion Point (Optional) */
    insertionPoint?: number;
}

export type MapType = 'Multiplayer' | 'Campaign' | 'Firefight' | 'SpartanOps';

export interface GameVariantInfo {
    id: number;
    categoryId: number;
    name: string;
    category: string;
    token: string;
}

export interface GameCategoryEvidence {
    source: 'careerdb' | 'installed-stock-variant' | 'production-fileshare-wire';
}

export interface GameCategoryDefinition {
    name: string;
    displayName: string;
    categoryId: number;
    id: number;
    token: string;
    category: string;
    aliases: readonly string[];
    engines: readonly number[];
    availability: Readonly<Record<number, Readonly<GameCategoryEvidence>>>;
}

/** All 29 entries in MCC's global FileShare/CGB category enum. */
export const GameCategories: Readonly<Record<string, Readonly<GameCategoryDefinition>>>;
export const GameCategoriesById: Readonly<Record<number, Readonly<GameCategoryDefinition>>>;
export const GameCategoriesByToken: Readonly<Record<string, Readonly<GameCategoryDefinition>>>;

export function getGameCategoryById(
    categoryId: number | string
): Readonly<GameCategoryDefinition> | null;
export function getGameCategoryName(
    categoryId: number | string
): string;
export function getGameCategoriesByEngine(
    engineId: GameEngine | number | string
): ReadonlyArray<Readonly<GameCategoryDefinition>>;
export function findGameCategoryByName(
    searchName: string,
    exactMatch?: boolean
): Readonly<GameCategoryDefinition> | null;
export function findGameCategoriesByName(searchName: string): ReadonlyArray<Readonly<GameCategoryDefinition>>;
export function getCategoryIds(
    category: GameCategoryDefinition | number | string,
    engineId?: GameEngine | number | string | null
): number[];
export function isCategoryAvailableForEngine(
    categoryId: number | string,
    engineId: GameEngine | number | string
): boolean;

/**
 * Map data
 * Maps[Engine][Type][LegacyId] = MapInfo
 */
export const Maps: Record<GameEngine, Record<string, Record<string, MapInfo>>>;

export interface MapLookup extends Partial<MapInfo> {
    legacyId: number;
    engine: GameEngine | string | null;
    type: MapType | null;
    name: string;
    id: string;
    placeholder?: boolean;
}

/**
 * Resolve a legacy map ID across categories, or within the specified category.
 */
export function getMap(engine: string, type: string, id: number | string): MapInfo | null;
export function getMapByLegacyId(
    engine: GameEngine | string,
    legacyId: number | string,
    type?: MapType | null
): MapInfo | null;
export function findMapAcrossEngines(
    legacyId: number | string,
    type?: MapType | null
): MapLookup | null;
export const MAP_PLACEHOLDER_PREFIX: string;
export function getMapPlaceholder(legacyId: number | string): MapLookup;
export function findMapOrPlaceholder(legacyId: number | string, type?: MapType | null): MapLookup;
export function findMapIdByName(name: string, engine?: GameEngine | string | null): MapLookup | null;
export function findMapIdsByName(name: string, engine?: GameEngine | string | null): MapLookup[];
export function getMapName(engine: string, legacyId: number | string, type?: string): string | null;
export function getMapNameAcrossEngines(legacyId: number | string, type?: string): string | null;

/**
 * Resolve a map by its code name.
 */
export function getMapByCodeName(engine: GameEngine | string, codeName: string): MapInfo | null;


/**
 * Game variant data
 * GameVariants[Engine][Id] = GameVariantInfo
 */
export const GameVariants: Readonly<Record<GameEngine, Readonly<Record<number, Readonly<GameVariantInfo>>>>>;

/**
 * Resolve game variant metadata by ID.
 */
export function getGameVariantById(
    engine: GameEngine | string | number,
    id: number | string
): Readonly<GameVariantInfo> | null;
export function getGlobalGameVariantById(id: number | string): Readonly<GameVariantInfo> | null;

/**
 * Resolve an engine display name.
 */
export function getGameEngineName(engineId: GameEngine | string | number): string;
