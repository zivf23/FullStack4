// בגלל שיש מספר שונה של אותיות בין השפות החלטתי לשים בעמוד נפרד את הסוגים של השפות שהיו בהתחלה באותו עמוד של המקלדת
// את הסוגי מקלדת אעביר לעמוד של "מקלדת" אח"כ. בנוסף החלטתי לשים את המקלדת בדומה למה שאנחנו מכירים היום ולא לפי סדר אלפבתי

 
export const layouts = {
     // I'll make 4 diferent kind of keyboards and I'll switch between them insted of making one complex one
     // because I want the munbers to apper in every language keyboard I'll repeate them in every one that way it will be simplier/
    upEnglish: {
        numbers: ['1','2','3','4','5','6','7','8','9','0'],
        letters1: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        letters2: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        letters3: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'],
        specialKeys: ['right', 'left', 'delete', 'enter', 'space', 'ctrl', 'alt', 'shift', 'language'],
        special: { 
            'right': '➡',
            'left': '⬅',
            'delete': '⌫',
            'enter': 'Enter',
            'space': ' ',
            'ctrl': 'Ctrl',
            'alt': 'Alt',
            'shift': 'Shift',
            'language': '🌐' 
        }
    },

    lowEnglish: {
        numbers: ['1','2','3','4','5','6','7','8','9','0'],
        letters1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        letters2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        letters3: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
        specialKeys: ['right', 'left', 'delete', 'enter', 'space', 'ctrl', 'alt', 'shift', 'language'],
        special: { 
            'right': '➡',
            'left': '⬅',
            'delete': '⌫',
            'enter': 'Enter',
            'space': ' ',
            'ctrl': 'Ctrl',
            'alt': 'Alt',
            'shift': 'Shift',
            'language': '🌐' 
        }
    },

    hebrew: {
        numbers: ['1','2','3','4','5','6','7','8','9','0'],
        letters1: ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
        letters2: ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף', ','],
        letters3: ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '.'],
        specialKeys: ['right', 'left', 'delete', 'enter', 'space', 'ctrl', 'alt', 'shift', 'language'],
        special: { 
            'right': '➡',
            'left': '⬅',
            'delete': '⌫',
            'enter': 'רד שורה',
            'space': ' ',
            'ctrl': 'Ctrl',
            'alt': 'Alt',
            'shift': 'Shift',
            'language': '🌐' 
        }
    },

    emojies: {
        numbers: [],
        letters1: ['😂', '❤️', '👍', '😎'], // to add emojies (thanks to GTP for easy copy-paste of emojies easyily)
        letters2: [],
        letters3: [],
        specialKeys: ['delete', 'enter', 'space', 'language'],
        special: {
            'delete': '⌫',
            'enter': 'Enter',
            'space': ' ',
            'language': '🌐'
        }
    }
};
 