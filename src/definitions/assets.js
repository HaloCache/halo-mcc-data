/**
 * Asset/Image Definitions
 *
 * Maps game categories and engines to their canonical asset filenames.
 */

export const CATEGORY_IMAGE_FILENAMES = {
    'Firefight': 'CG_FIREFIGHT',
    'Slayer': 'CG_SLAYER',
    'Capture the Flag': 'CG_CAPTURETHEFLAG',
    'CTF': 'CG_CAPTURETHEFLAG',
    'Oddball': 'CG_ODDBALL',
    'King of the Hill': 'CG_KINGOFTHEHILL',
    'KOTH': 'CG_KINGOFTHEHILL',
    'Juggernaut': 'CG_JUGGERNAUT',
    'Territories': 'CG_TERRITORIES',
    'Assault': 'CG_ASSAULT',
    'Infection': 'CG_INFECTION',
    'Race': 'CG_RACE',
    'VIP': 'CG_VIP',
    'Headhunter': 'CG_HEADHUNTER',
    'Stockpile': 'CG_STOCKPILE',
    'Invasion': 'CG_INVASION',
    'Flood': 'CG_FLOOD',
    'Extraction': 'CG_EXTRACTION',
    'Dominion': 'CG_DOMINION',
    'Regicide': 'CG_REGICIDE',
    'Ricochet': 'CG_RICOCHET',
    'Grifball': 'CG_GRIFBALL',
    'Action Sack': 'CG_INSANE',
    'ActionSack': 'CG_INSANE',
    'Minigames': 'CG_INSANE',
    'Pre-Game': 'CG_PREGAME',
    'PreGameWarmUp': 'CG_PREGAME',
    'Pre-Game Warm Up': 'CG_PREGAME',
    'Escalation Slayer': 'CG_ESCALATION',
    'GunGame': 'CG_ESCALATION',
    'Forge': 'CG_BASICEDITING',
    'Sandbox': 'CG_BASICEDITING',
    'Spartan Ops': 'CG_CAMPAIGN',
    'Campaign': 'CG_CAMPAIGN'
};

/**
 * Get gametype image filename for a category
 */
export function getGameTypeImageFilename(categoryName) {
    if (!categoryName) return null;
    return CATEGORY_IMAGE_FILENAMES[categoryName] || null;
}
