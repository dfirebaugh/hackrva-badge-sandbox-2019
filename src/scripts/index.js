import '../styles/index.scss';
import animateBox from './animateBox';
import convert from './convert';
import constants from './constants';
import * as monaco from 'monaco-editor';
import logger from './logger';

const { asciiToBin } = convert;
const { sendBtn, STARTBITS, ENDBITS, _32TIMINGBITS } = constants;

const editor = monaco.editor.create(document.getElementById('container'), {
  value: ` #include <stdio.h>
  #include <stdbool.h>
  #include <string.h>
  #include <ctype.h>
  
  bool is_isogram(char phrase[])
  {
    if (phrase == NULL)
    {
      return false;
    }
  
    unsigned int i;
    int letters_seen[26];
    for (i = 0; i < strlen(phrase); i++)
    {
      char letter = toupper(phrase[i]);
      if (isalpha(letter))
      {
        if (letter == letters_seen[letter - 97])
        {
          return false;
        }
        else
        {
          letters_seen[letter - 97] = letter;
        }
      }
    }
  
    return true;
  }`,
  language: 'cpp',
  theme: "vs-dark",
});

sendBtn.addEventListener('click', () => {
  logger("value: ", editor.getValue());
  animateBox(_32TIMINGBITS, "transmitting 32 timing bits")
    .then(() => {
      animateBox(STARTBITS, "transmitting start bits")
        .then(() => {
          animateBox(asciiToBin(editor.getValue()), "transmitting main payload")
            .then(() => {
              animateBox(ENDBITS, "transmitting end bits");
            });
        });
    });
}
);
