# @halocache/halo-mcc-data

Centralized data, enums, endpoints, and rate-limit constants

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

### Install snapshots: nameplates, customization, leaderboards

Nameplates, emblems, colours, Player ID avatars, team colours and the per-game
appearance block (armour sets, pieces, colours, firefight voices) are imported
from an MCC install. Attribute names and values stay as the XML spells them: ids
are strings, `allow_team_color` is the string "true", colour channels are 0..1
float strings. The `...Rgb` accessors convert to 8-bit.

```javascript
import {
    getNameplateDefinition, getNameplateImagePath, getNameplateUnlockState,
    getEmblemDefinition, getColorRgb, getAvatarDefinition,
    getArmorPieceDefinition, getTeamColorRgb, ArmorSlot
} from '@halocache/halo-mcc-data';

getNameplateDefinition(2).name;                    // "$NAMEPLATE_HCE_BLUE"
getNameplateImagePath(535);                        // "Data/UI/NamePlates/Images/...png"
getColorRgb(2);                                    // { r, g, b } 0..255
getArmorPieceDefinition(5, ArmorSlot.HELMET, 1);   // ids are reused across slots
getTeamColorRgb(5, 0);                             // runtime nameplate tint source
```

`getNameplateUnlockState` and `getAvatarUnlockState` are three-valued:
`unlocked` is `null` when the evidence cannot answer the rule, `false` only when
a list marked `complete` lacks the target, and `reason` names the case.

```javascript
getNameplateUnlockState(id);                                               // null, 'no-provider'
getNameplateUnlockState(id, { achievements: { ids: [] } });                // null, 'provider-incomplete'
getNameplateUnlockState(id, { achievements: { ids: [], complete: true } }); // false
getNameplateUnlockState(id, { achievements: { ids: ['265'] } });           // true, 'listed'
```

PlayFab inventory rules name no item id, so they stay `null` without an
`inventoryItemIdByUnlockKey` mapping. Armour pieces carry no unlock attribute;
`getArmorUnlockKey(customizationItem)` composes the key to look one up by.

Leaderboard board names are composed, not stored: `buildLeaderboardName(board)`
builds one and `enumerateLeaderboards()` walks the catalog (1008 campaign + 28
confirmed playlist boards).

Each snapshot records its source files with a SHA-256
(`NameplateDefinitionSources`, `CustomizationDefinitionSources`). Regenerate:

```bash
python scripts/import-nameplates.py    "<MCC install root>"
python scripts/import-customization.py "<MCC install root>"
```

No art is stored here; composing these ids into images is
[`@halocache/halo-mcc-customization`](../halo-mcc-customization).

## License

MIT
