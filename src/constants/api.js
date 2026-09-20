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
        GET_PROFILES: 'https://ee38.playfabapi.com/Profile/GetProfiles'
    },

    MCC: {
        SERVER_LIST: 'https://mcc-production.azurefd.net/api/ServerListListMultiplayerServers',
        GET_UGC_ITEMS: 'https://mcc-production.azurefd.net/api/GetPlayFabUgcItems',
        GET_UGC_ITEM: 'https://mcc-production.azurefd.net/api/GetPlayFabUgcItem',
        PURCHASE_SEASONAL: 'https://mcc-production.azurefd.net/api/ProgressionPurchaseAndUnlockContainer',
        CUSTOMIZATION_WRITE: 'https://mcc-production.azurefd.net/api/CustomizationWritePlayFabEntityObject'
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
