# @halocache/halo-mcc-data

A centralized data package for the **Halo: The Master Chief Collection (MCC)** API ecosystem.

This package provides a single source of truth for:
*   **Enums**: Verified Game Engines, Categories, Maps, and Server Regions.
*   **Constants**: API Endpoints (PlayFab, Xbox Live, Azure FD), Rate Limit configurations, and Title IDs.
*   **Mappings**: Helper functions to translate raw API IDs into friendly names.

## Installation

```bash
npm install @halocache/halo-mcc-data
```

## Usage

```javascript
import {
    ENDPOINTS,
    BUILD_ID,
    GameEngine,
    getGameEngineName,
    Maps,
    getMap,
    getMapByLegacyId
} from '@halocache/halo-mcc-data';

console.log(`Current MCC Build: ${BUILD_ID}`);
console.log(`Halo 3 Engine ID: ${GameEngine.HALO_3}`); // "Halo3"
console.log(`Endpoint: ${ENDPOINTS.MCC.SERVER_LIST}`);

// Access map data
const h3Maps = Maps[GameEngine.HALO_3].Multiplayer;
console.log(h3Maps['81'].name); // "Guardian"

// Lookup by Legacy ID (Auto-detects type)
const map = getMapByLegacyId(GameEngine.HALO_3, 81);

// Lookup by specific type (handles collisions)
const h1Map = getMap(GameEngine.HALO_1, 'Campaign', 0);
console.log(h1Map.name); // "The Pillar of Autumn"
```

### Game-category IDs

FileShare `DisplayProperties.GameCategory` and CGB `game_type` use one global
MCC category namespace. An ID never changes meaning by engine: for example,
Race is `7`, Grifball is `11`, and Assault is `16` for every title.

```javascript
import {
    GameCategory,
    getGameCategoryById,
    getGameCategoriesByEngine
} from '@halocache/halo-mcc-data';

console.log(GameCategory.RACE); // "GameCategory_Race"
console.log(getGameCategoryById(7).name); // "Race"

// Availability is a separate evidence-backed view; it does not remap IDs.
const reachCategories = getGameCategoriesByEngine('HaloReach');
```

Do not substitute the per-title IDs in `Data/BuiltInData/*.json`. Those IDs
describe each binary rules format and are not FileShare/CGB wire IDs.

## Data Verification

All data within this package has been verified against:
1.  **Built-In Game Data**: Extracted from MCC PC JSON files (`Halo3.json`, etc.).
2.  **API Inspection**: Verified against live responses from PlayFab and Xbox Live.

*Last Verified: 2026-09-14*

## License

MIT
