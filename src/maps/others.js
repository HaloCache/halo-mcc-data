/**
 * Halo 1, Halo 2, and Halo 3: ODST map definitions.
 * IDs are zero-based positions in the built-in `_map_id_*` enum.
 */

const h1_maps = [
    { id: 'battle_creek', name: 'Battle Creek', ids: { fileshare: [10] } },
    { id: 'sidewinder', name: 'Sidewinder', ids: { fileshare: [11] } },
    { id: 'damnation', name: 'Damnation', ids: { fileshare: [12] } },
    { id: 'rat_race', name: 'Rat Race', ids: { fileshare: [13] } },
    { id: 'prisoner', name: 'Prisoner', ids: { fileshare: [14] } },
    { id: 'hang_em_high', name: 'Hang \'Em High', ids: { fileshare: [15] } },
    { id: 'chill_out', name: 'Chill Out', ids: { fileshare: [16] } },
    { id: 'derelict', name: 'Derelict', ids: { fileshare: [17] } },
    { id: 'boarding_action', name: 'Boarding Action', ids: { fileshare: [18] } },
    { id: 'chiron', name: 'Chiron TL-34', ids: { fileshare: [19] } },
    { id: 'blood_gulch', name: 'Blood Gulch', ids: { fileshare: [20] } },
    { id: 'wizard', name: 'Wizard', ids: { fileshare: [21] } },
    { id: 'longest', name: 'Longest', ids: { fileshare: [22] } },
    { id: 'death_island', name: 'Death Island', ids: { fileshare: [23] } },
    { id: 'danger_canyon', name: 'Danger Canyon', ids: { fileshare: [24] } },
    { id: 'infinity', name: 'Infinity', ids: { fileshare: [25] } },
    { id: 'timberland', name: 'Timberland', ids: { fileshare: [26] } },
    { id: 'ice_fields', name: 'Ice Fields', ids: { fileshare: [27] } },
    { id: 'gephyrophobia', name: 'Gephyrophobia', ids: { fileshare: [28] } },
];

const h2_maps = [
    { id: 'lockout', name: 'Lockout', ids: { fileshare: [44] } },
    { id: 'ascension', name: 'Ascension', ids: { fileshare: [45] } },
    { id: 'midship', name: 'Midship', ids: { fileshare: [46] } },
    { id: 'ivory_tower', name: 'Ivory Tower', ids: { fileshare: [47] } },
    { id: 'beaver_creek', name: 'Beaver Creek', ids: { fileshare: [48] } },
    { id: 'burial_mounds', name: 'Burial Mounds', ids: { fileshare: [49] } },
    { id: 'colossus', name: 'Colossus', ids: { fileshare: [50] } },
    { id: 'zanzibar', name: 'Zanzibar', ids: { fileshare: [51] } },
    { id: 'coagulation', name: 'Coagulation', ids: { fileshare: [52] } },
    { id: 'headlong', name: 'Headlong', ids: { fileshare: [53] } },
    { id: 'waterworks', name: 'Waterworks', ids: { fileshare: [54] } },
    { id: 'foundation', name: 'Foundation', ids: { fileshare: [55] } },
    { id: 'containment', name: 'Containment', ids: { fileshare: [56] } },
    { id: 'warlock', name: 'Warlock', ids: { fileshare: [57] } },
    { id: 'sanctuary', name: 'Sanctuary', ids: { fileshare: [58] } },
    { id: 'turf', name: 'Turf', ids: { fileshare: [59] } },
    { id: 'backwash', name: 'Backwash', ids: { fileshare: [60] } },
    { id: 'elongation', name: 'Elongation', ids: { fileshare: [61] } },
    { id: 'gemini', name: 'Gemini', ids: { fileshare: [62] } },
    { id: 'relic', name: 'Relic', ids: { fileshare: [63] } },
    { id: 'terminal', name: 'Terminal', ids: { fileshare: [64] } },
    { id: 'desolation', name: 'Desolation', ids: { fileshare: [65] } },
    { id: 'tombstone', name: 'Tombstone', ids: { fileshare: [66] } },
    { id: 'district', name: 'District', ids: { fileshare: [67] } },
    { id: 'uplift', name: 'Uplift', ids: { fileshare: [68] } },
];

export const H1_MAPS = {
    Multiplayer: h1_maps
};

export const H2_MAPS = {
    Multiplayer: h2_maps
};

export const ODST_MAPS = {
    Multiplayer: [],
    Firefight: [
        { id: 'tayari_plaza', name: 'Tayari Plaza', ids: { fileshare: [168] } },
        { id: 'uplift_reserve', name: 'Uplift Reserve', ids: { fileshare: [169] } },
        { id: 'kizingo_boulevard', name: 'Kizingo Boulevard', ids: { fileshare: [170] } },
        { id: 'oni_alpha_site', name: 'ONI Alpha Site', ids: { fileshare: [171] } },
        { id: 'nmpd_hq', name: 'NMPD HQ', ids: { fileshare: [172] } },
        { id: 'kikowani_station', name: 'Kikowani Station', ids: { fileshare: [173] } },
        { id: 'data_hive', name: 'Data Hive', ids: { fileshare: [174] } },
        { id: 'coastal_highway', name: 'Coastal Highway', ids: { fileshare: [175] } },
    ]
};
