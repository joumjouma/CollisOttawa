// define primary tint colors for light/dark modes
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// severity palette for the collision logic
// distinct colors to make the map readable
export const SeverityColors = {
  Fatal: '#8B0000',   // Dark Red - critical events (Fatalities)
  Major: '#FF4500',   // Orange Red - high priority injuries
  Minor: '#FFD700',   // Gold/Yellow - visible but less alarming
  Minimal: '#4682B4', // Steel Blue - low impact
  None: '#808080',    // Grey - property damage only (no injuries)
  Default: '#cc3333', // fallback color
};

// export full theme config
export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
