import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import openmojiData from 'openmoji/data/openmoji.json' assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory
const targetDir = path.join(__dirname, '../public/assets/openmoji');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Source directory (adjust based on openmoji package structure)
const sourceDir = path.join(__dirname, '../node_modules/openmoji/color/svg');

// Map of desired filename -> emoji annotation (or approximation) or direct hex if known
// We will search openmojiData for these
const iconsToCopy = {
    // Ambience
    'rain': 'cloud with rain',
    'forest': 'evergreen tree',
    'fire': 'fire',
    'waves': 'water wave',
    'headphones': 'headphone',
    'close': 'cross mark',

    // Feed
    'heart': 'red heart',
    'chat': 'speech balloon',
    'link': 'link',
    'edit': 'pencil',
    'note': 'memo',

    // Navigation & Profile
    'home': 'house',
    'vent': 'microphone',
    'wallpapers': 'framed picture',
    'community': 'globe showing Europe-Africa', // or just globe
    'user': 'bust in silhouette',
    'calendar': 'calendar',
    'chart': 'bar chart',
    'match': 'handshake',
    'cloud': 'cloud',

    // Music & Mood
    'music': 'musical note',
    'play': 'play button',
    'thought': 'thought balloon',

    // Moods (Onboarding)
    'mood-happy': 'smiling face with smiling eyes',
    'mood-sad': 'disappointed face',
    'mood-angry': 'face with steam from nose',
    'mood-neutral': 'neutral face',
    'mood-overwhelmed': 'loudly crying face',
    'mood-excited': 'star-struck',

    // Actions
    'breathe': 'wind face',
    'hydrate': 'droplet',
    'walk': 'person walking',
    'gratitude': 'sparkles'
};

// Helper to find hex by annotation
function findHex(annotation) {
    const item = openmojiData.find(i => i.annotation.toLowerCase() === annotation.toLowerCase());
    return item ? item.hexcode : null;
}

// Manual overrides if annotation search is tricky
const manualHex = {
    'close': '2716',
    'play': '25B6',
    'gratitude': '2728', // sparkles
    'breathe': '1F32C', // wind blowing face
};

console.log('Copying OpenMoji icons...');

for (const [name, query] of Object.entries(iconsToCopy)) {
    let hex = manualHex[name] || findHex(query);

    if (!hex) {
        // Try fuzzy search or fallback
        console.warn(`Could not find exact match for: ${query} (${name})`);
        continue;
    }

    const sourceFile = path.join(sourceDir, `${hex}.svg`);
    const targetFile = path.join(targetDir, `${name}.svg`);

    if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`✅ Copied ${name}.svg (${hex})`);
    } else {
        console.error(`❌ Source file missing: ${hex}.svg for ${name}`);
    }
}

console.log('Done!');
