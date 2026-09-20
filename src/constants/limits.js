/**
 * Upstream rate-limit reference data.
 * These values do not configure or enforce request throttling.
 *
 * @module constants/limits
 */

/**
 * Xbox Profile API rate limit configuration.
 */
export const XBOX_PROFILE_RATE_LIMIT = {
    maxRequests: 10,
    periodInSeconds: 15,
    retryAfterSeconds: 14,
    hasRetryAfter: true,
    hasRateLimitBody: true
};

/**
 * PlayFab GetUserInventory API rate limit configuration.
 */
export const PLAYFAB_INVENTORY_RATE_LIMIT = {
    maxRequests: 100,
    periodInSeconds: null,
    retryAfterSeconds: 112,
    hasRetryAfter: true,
    hasRateLimitBody: true,
    errorCode: 1199,
    errorType: 'APIClientRequestRateLimitExceeded'
};

/**
 * PlayFab general API rate limit configuration (GetTime, GetPlayFabIDs).
 */
export const PLAYFAB_RATE_LIMIT = {
    maxRequests: null,
    periodInSeconds: null,
    hasRetryAfter: false,
    hasRateLimitBody: false
};

/**
 * MCC Production API rate limit configuration (ServerList, FileShare).
 */
export const MCC_RATE_LIMIT = {
    maxRequests: null,
    periodInSeconds: null,
    hasRetryAfter: false,
    hasRateLimitBody: false
};

/**
 * Azure Blob Storage rate limit configuration (file downloads).
 */
export const AZURE_BLOB_RATE_LIMIT = {
    maxRequests: null,
    periodInSeconds: null,
    hasRetryAfter: false
};

/**
 * Game CMS API rate limit configuration.
 */
export const GAME_CMS_RATE_LIMIT = {
    maxRequests: null,
    periodInSeconds: null,
    hasRetryAfter: false
};
