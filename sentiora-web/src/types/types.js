// Type definitions for the Sentiora application

export const MOODS = {
    HAPPY: 'Happy',
    SAD: 'Sad',
    MOTIVATED: 'Motivated',
    CALM: 'Calm',
    ENERGETIC: 'Energetic',
    ROMANTIC: 'Romantic',
    FOCUSED: 'Focused',
    ANGRY: 'Angry',
    NOSTALGIC: 'Nostalgic',
    HOPEFUL: 'Hopeful',
    LONELY: 'Lonely',
    GRATEFUL: 'Grateful',
    TIRED: 'Tired',
    ANXIOUS: 'Anxious',
    NEUTRAL: 'Neutral'
};

export const MOOD_QUOTES = {
    [MOODS.HAPPY]: [
        "Happiness is not something ready made. It comes from your own actions.",
        "The most wasted of all days is one without laughter.",
        "Count your age by friends, not years. Count your life by smiles, not tears.",
        "Enjoy the little things, for one day you may look back and realize they were the big things."
    ],
    [MOODS.SAD]: [
        "Stars can't shine without darkness.",
        "Tears come from the heart and not from the brain.",
        "It's okay not to be okay.",
        "Every life has a measure of sorrow, and sometimes this is what awakens us."
    ],
    [MOODS.MOTIVATED]: [
        "Push yourself, because no one else is going to do it for you.",
        "The only way to do great work is to love what you do.",
        "Don't watch the clock; do what it does. Keep going.",
        "Believe you can and you're halfway there."
    ],
    [MOODS.CALM]: [
        "Peace comes from within. Do not seek it without.",
        "Calmness is the cradle of power.",
        "Breath is the bridge which connects life to consciousness.",
        "Within you, there is a stillness and a sanctuary to which you can retreat at any time."
    ],
    [MOODS.ENERGETIC]: [
        "Energy and persistence conquer all things.",
        "Passion is energy. Feel the power that comes from focusing on what excites you.",
        "The world belongs to the energetic.",
        "Be the energy you want to attract."
    ],
    [MOODS.ROMANTIC]: [
        "The best thing to hold onto in life is each other.",
        "Love is composed of a single soul inhabiting two bodies.",
        "Where there is love there is life.",
        "You are my sun, my moon, and all my stars."
    ],
    [MOODS.FOCUSED]: [
        "Starve your distractions, feed your focus.",
        "Concentration is the secret of strength.",
        "Focus on being productive instead of busy.",
        "The successful warrior is the average man, with laser-like focus."
    ],
    [MOODS.ANGRY]: [
        "For every minute you remain angry, you give up sixty seconds of peace of mind.",
        "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.",
        "Hold your peace.",
        "The best fighter is never angry."
    ],
    [MOODS.NOSTALGIC]: [
        "Nostalgia is a file that removes the rough edges from the good old days.",
        "Memories are the key not to the past, but to the future.",
        "Sometimes you will never know the value of a moment until it becomes a memory.",
        "We didn't realize we were making memories, we just knew we were having fun."
    ],
    [MOODS.HOPEFUL]: [
        "Hope is being able to see that there is light despite all of the darkness.",
        "Optimism is the faith that leads to achievement.",
        "The best is yet to be.",
        "Hope is the thing with feathers that perches in the soul."
    ],
    [MOODS.LONELY]: [
        "The soul that sees beauty may sometimes walk alone.",
        "It is better to be alone than in bad company.",
        "Solitude is where I place my chaos to rest and awaken my inner peace.",
        "Sometimes you need to be alone to find out who you really are."
    ],
    [MOODS.GRATEFUL]: [
        "Gratitude turns what we have into enough.",
        "Start each day with a positive thought and a grateful heart.",
        "It is not joy that makes us grateful; it is gratitude that makes us joyful.",
        "Gratitude is the fairest blossom which springs from the soul."
    ],
    [MOODS.TIRED]: [
        "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day, listening to the murmur of the water, or watching the clouds float across the sky, is by no means a waste of time.",
        "There is virtue in work and there is virtue in rest. Use both and overlook neither.",
        "Sleep is the best meditation.",
        "Sometimes the most productive thing you can do is relax."
    ],
    [MOODS.ANXIOUS]: [
        "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.",
        "Nothing diminishes anxiety faster than action.",
        "You don't have to control your thoughts. You just have to stop letting them control you.",
        "Trust yourself. You've survived a lot, and you'll survive whatever is coming."
    ],
    [MOODS.NEUTRAL]: [
        "Every day may not be good... but there's something good in every day.",
        "Balance is not something you find, it's something you create.",
        "The best way to pay for a lovely moment is to enjoy it.",
        "Life is a balance of holding on and letting go."
    ]
};

export const MOOD_COLORS = {
    [MOODS.HAPPY]: 'var(--mood-happy)',
    [MOODS.SAD]: 'var(--mood-sad)',
    [MOODS.MOTIVATED]: 'var(--mood-motivated)',
    [MOODS.CALM]: 'var(--mood-calm)',
    [MOODS.ENERGETIC]: 'var(--mood-energetic)',
    [MOODS.ROMANTIC]: 'var(--mood-romantic)',
    [MOODS.FOCUSED]: 'var(--mood-focused)',
    [MOODS.ANGRY]: 'var(--mood-angry)',
    [MOODS.NOSTALGIC]: 'var(--mood-nostalgic)',
    [MOODS.HOPEFUL]: 'var(--mood-hopeful)',
    [MOODS.LONELY]: 'var(--mood-lonely)',
    [MOODS.GRATEFUL]: 'var(--mood-grateful)',
    [MOODS.TIRED]: 'var(--mood-tired)',
    [MOODS.ANXIOUS]: 'var(--mood-anxious)',
    [MOODS.NEUTRAL]: 'var(--mood-neutral)'
};

export const MOOD_ICONS = {
    [MOODS.HAPPY]: '/assets/moods/happy.svg',
    [MOODS.SAD]: '/assets/moods/sad.svg',
    [MOODS.MOTIVATED]: '/assets/moods/motivated.svg',
    [MOODS.CALM]: '/assets/moods/calm.svg',
    [MOODS.ENERGETIC]: '/assets/moods/energetic.svg',
    [MOODS.ROMANTIC]: '/assets/moods/romantic.svg',
    [MOODS.FOCUSED]: '/assets/moods/focused.svg',
    [MOODS.ANGRY]: '/assets/moods/angry.svg',
    [MOODS.NOSTALGIC]: '/assets/moods/nostalgic.svg',
    [MOODS.HOPEFUL]: '/assets/moods/hopeful.svg',
    [MOODS.LONELY]: '/assets/moods/lonely.svg',
    [MOODS.GRATEFUL]: '/assets/moods/grateful.svg',
    [MOODS.TIRED]: '/assets/moods/tired.svg',
    [MOODS.ANXIOUS]: '/assets/moods/anxious.svg',
    [MOODS.NEUTRAL]: '/assets/moods/calm.svg' // Fallback to calm for now
};

export const MOOD_PLAYLISTS = {
    [MOODS.HAPPY]: ['3BXo6ThZzvlRaCJmcDXVam'],
    [MOODS.SAD]: ['6oeyGFMIVlAHwSj365zK3W'],
    [MOODS.MOTIVATED]: ['37i9dQZF1F0sijgNaJdgit'],
    [MOODS.CALM]: ['0RwBYitepSZqyV09bTOlP5'],
    [MOODS.ENERGETIC]: ['4Jj2aP1upZ6zcxgWZAAYw4'],
    [MOODS.ROMANTIC]: ['0xlFVg7ezP2Be0vj4NCx3C'],
    [MOODS.FOCUSED]: ['5iX1pRMGlmOlL7WTBcHTg4'],
    [MOODS.ANGRY]: ['2GkYOZ954D5Zv0jFPvD38g'],
    [MOODS.NOSTALGIC]: ['29l4jhnhDBCxhx1GRXYC0N'],
    [MOODS.HOPEFUL]: ['4vf0IiQwctmUrSHRIZxB5t'],
    [MOODS.LONELY]: ['2qtdq3p4LGmgO81XblOsN0'],
    [MOODS.GRATEFUL]: ['37oHxFCzMEEUNn4IA5xI3g'],
    [MOODS.TIRED]: ['37i9dQZF1DWZeKCadgRdKQ'], // Deep Sleep or similar
    [MOODS.ANXIOUS]: ['37i9dQZF1DWV90OpkPJ8pX'], // Calming/Anxiety relief
    [MOODS.NEUTRAL]: ['37i9dQZF1DXc8kgYqQLMfR'] // Lo-Fi Beats
};
