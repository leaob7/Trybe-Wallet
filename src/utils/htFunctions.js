// import React from 'react';

// https://thispointer.com/javascript-remove-everything-after-a-certain-character/
export function toBefSubstring(string) {
  const str = string.split('/')[0];
  return str;
}

export function toAfterSubstring(string) {
  const str = string.split('/')[1];
  return str;
}
