/**
 * API Configuration and Endpoints
 * @module constants/api
 */

/**
 * Halo MCC build ID used for CGB queries.
 * Must match the game version. Format: YYYY.MM.DD.BuildNumber.Patch-Release.
 *
 * @constant {string}
 */
export const BUILD_ID = "2025.08.16.178512.1-Release";

/**
 * PlayFab Title ID for Halo MCC
 * @constant {string}
 */
export const PLAYFAB_TITLE_ID = "EE38";

/**
 * MCC's Xbox Live Service Configuration Id (SCID), required in the leaderboards
 * and userstats URL paths. Validated live against leaderboards.xboxlive.com.
 * @constant {string}
 */
export const MCC_SCID = "77290100-225e-4768-9373-98164430a9f8";

/**
 * Xbox Live real-time activity socket. Not in ENDPOINTS, which is asserted to
 * carry absolute https urls.
 * @constant {string}
 */
export const XBOX_LIVE_RTA_SOCKET = 'wss://rta.xboxlive.com/connect';

/**
 * MCC Xbox Live title id (decimal).
 * @constant {number}
 */
export const MCC_XBL_TITLE_ID = 1144039928;

/**
 * API Endpoints
 * @constant {Object}
 */
export const ENDPOINTS = {
    PLAYFAB: {
        BASE: 'https://ee38.playfabapi.com',
        LOGIN_WITH_XBOX: 'https://ee38.playfabapi.com/Client/LoginWithXbox',
        GET_TIME: 'https://ee38.playfabapi.com/Client/GetTime',
        GET_USER_INVENTORY: 'https://ee38.playfabapi.com/Client/GetUserInventory',
        GET_CATALOG_ITEMS: 'https://ee38.playfabapi.com/Client/GetCatalogItems',
        GET_STORE_ITEMS: 'https://ee38.playfabapi.com/Client/GetStoreItems',
        GET_PLAYFAB_IDS: 'https://ee38.playfabapi.com/Client/GetPlayFabIDsFromXboxLiveIDs',
        GET_TITLE_PLAYERS: 'https://ee38.playfabapi.com/Profile/GetTitlePlayersFromMasterPlayerAccountIds',
        GET_PROFILES: 'https://ee38.playfabapi.com/Profile/GetProfiles',
        GET_OBJECTS: 'https://ee38.playfabapi.com/Object/GetObjects',
        EXECUTE_CLOUD_SCRIPT: 'https://ee38.playfabapi.com/Client/ExecuteCloudScript',
        REPORT_UGC_ITEM: 'https://ee38.playfabapi.com/UserGeneratedContent/ReportUgcItem'
    },

    MCC: {
        SERVER_LIST: 'https://mcc-production.azurefd.net/api/ServerListListMultiplayerServers',
        GET_UGC_ITEMS: 'https://mcc-production.azurefd.net/api/GetPlayFabUgcItems',
        GET_UGC_ITEM: 'https://mcc-production.azurefd.net/api/GetPlayFabUgcItem',
        PURCHASE_SEASONAL: 'https://mcc-production.azurefd.net/api/ProgressionPurchaseAndUnlockContainer',
        CUSTOMIZATION_WRITE: 'https://mcc-production.azurefd.net/api/CustomizationWritePlayFabEntityObject',
        PROGRESSION_CACHE_XP: 'https://mcc-production.azurefd.net/api/ProgressionCachePlayerXPToPlayFab',
        PROGRESSION_WRITE_ENTITY_OBJECTS: 'https://mcc-production.azurefd.net/api/ProgressionWritePlayFabEntityObjects',
        VALIDATE_STRING: 'https://mcc-production.azurefd.net/api/ValidateString',
        VALIDATE_CHAT_STRING: 'https://mcc-production.azurefd.net/api/ValidateChatString',
        PROFANITY_FILTER_STRING_LIST: 'https://mcc-production.azurefd.net/api/ProfanityFilterStringList',
        CHAT_STRING_PUBLIC_KEY: 'https://mcc-production.azurefd.net/api/ChatStringPublicKey',
        REPORT_PLAYER: 'https://mcc-production.azurefd.net/api/ReportPlayer',
        USER_REPORT_ABOUT_MALICIOUS_CONTENT: 'https://mcc-production.azurefd.net/api/UserReportAboutMaliciousContent'
    },

    XBOX_LIVE_SERVICES: {
        LEADERBOARDS: 'https://leaderboards.xboxlive.com',
        SOCIAL: 'https://social.xboxlive.com',
        PRESENCE: 'https://userpresence.xboxlive.com',
        USER_STATS: 'https://userstats.xboxlive.com',
        NOTIFY: 'https://notify.xboxlive.com',
        SESSION_DIRECTORY: 'https://sessiondirectory.xboxlive.com'
    },

    WAYPOINT: {
        SPARTAN_TOKEN: 'https://settings.svc.halowaypoint.com/spartan-token',
        CLEARANCE: 'https://settings.svc.halowaypoint.com/oban/flight-configurations/titles/hmcc/audiences/RETAIL/players',
        CHALLENGES: 'https://halostats.svc.halowaypoint.com/hmcc/players'
    },

    GAME_CMS: {
        BASE: 'https://gamecms-hacs.svc.halowaypoint.com/hmcc',
        MOTD: 'https://gamecms-hacs.svc.halowaypoint.com/hmcc/Community/file/meld/json/allpivots.json',
        VERSION: 'https://gamecms-hacs.svc.halowaypoint.com/hmcc/Community/file/meld/json/meldbase.json',
        SERVICE_SETTINGS: 'https://gamecms-hacs.svc.halowaypoint.com/hmcc/none/file/Config/halo-service-settings-v3.json'
    },

    XBOX: {
        PROFILE_SETTINGS: 'https://profile.xboxlive.com/users',
        PROFILE_BATCH: 'https://profile.xboxlive.com/users/batch/profile/settings'
    }
};

/**
 * XSTS Relying Parties
 * @constant {Object}
 */
export const RELYING_PARTIES = {
    XBOX_LIVE: 'http://xboxlive.com',
    PLAYFAB: 'rp://playfabapi.com/',
    HALO_WAYPOINT: 'https://prod.xsts.halowaypoint.com/'
};

/**
 * Default request headers
 * @constant {Object}
 */
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

/**
 * MCC datacenter identifiers.
 * @constant {string[]}
 */
export const MCC_DATACENTERS = [
    "west us", "east us", "east us 2", "central us", "north central us", "south central us",
    "west europe", "north europe",
    "australia east",
    "japan east", "east asia", "southeast asia",
    "brazil south"
];

/**
 * MCC relay server identifiers.
 * @constant {string[]}
 */
export const MCC_RELAY_SERVERS = [
    "turn:turn-mcc.trafficmanager.net:3478",
    "turn:turn-mcc01.trafficmanager.net:3478",
    "stun:COTURN.HW-USW-PROD.halowaypoint.com:3478",
    "stun:COTURN.HW-USW01-PROD.halowaypoint.com:3478"
];
