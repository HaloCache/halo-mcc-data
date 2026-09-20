/**
 * Xbox API Configuration
 *
 * Configuration constants for Xbox Live API interactions.
 *
 * @module xbox
 */

/**
 * Xbox API Contract Version
 * Used in x-xbl-contract-version header
 */
export const XBOX_API_CONFIG = {
    CONTRACT_VERSION: '2'
};

/**
 * Xbox Live Service Configuration
 */
export const XBOX_LIVE = {
    SERVICE_NAME: 'xbox-live'
};

/**
 * Xbox Live profile setting names used in profile requests.
 */
export const XBOX_PROFILE_SETTINGS = {
    GAMERTAG: 'Gamertag',
    GAME_DISPLAY_PIC_RAW: 'GameDisplayPicRaw',
    GAMERSCORE: 'Gamerscore',
    ACCOUNT_TIER: 'AccountTier',
    XBOX_ONE_REP: 'XboxOneRep',
    PREFERRED_COLOR: 'PreferredColor',
    REAL_NAME: 'RealName',
    BIO: 'Bio',
    LOCATION: 'Location',
    TENURE_LEVEL: 'TenureLevel',
    WATERMARKS: 'Watermarks',
    IS_QUARANTINED: 'IsQuarantined',
    SHOW_USER_AS_AVATAR: 'ShowUserAsAvatar',
    GAME_DISPLAY_NAME: 'GameDisplayName',
    APP_DISPLAY_NAME: 'AppDisplayName'
};

/**
 * Array of all Xbox Live profile setting names.
 *
 * @returns {string[]} Array of all profile setting names
 */
export const XBOX_PROFILE_SETTINGS_ALL = Object.values(XBOX_PROFILE_SETTINGS);


const XBOX_BASE_URL = 'https://profile.xboxlive.com';

/**
 * Build Xbox Live profile settings URL
 *
 * @param {string|number} identifier - Gamertag or XUID
 * @param {boolean} isXuid - Whether identifier is XUID (default: false)
 * @returns {string} Full profile settings URL
 */
export function buildXboxProfileUrl(identifier, isXuid = false) {
    const segment = isXuid
        ? `xuid(${identifier})`
        : `gt(${encodeURIComponent(identifier)})`;

    return `${XBOX_BASE_URL}/users/${segment}/profile/settings`;
}

/**
 * Build Xbox Live batch profile URL
 * @returns {string} Batch profile settings URL
 */
export function buildXboxBatchProfileUrl() {
    return `${XBOX_BASE_URL}/users/batch/profile/settings`;
}
