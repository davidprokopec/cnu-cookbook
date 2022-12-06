import Color from 'color';

export const createColor = (hex, time) => {
  const INPUT_START = 0;
  const INPUT_END = 300;
  const OUTPUT_START = 1;
  const OUTPUT_END = 0;

  const color = Color(hex);

  if (time > INPUT_END) {
    return color.lighten(0.3).hex();
  }

  const output =
    OUTPUT_START +
    ((OUTPUT_END - OUTPUT_START) / (INPUT_END - INPUT_START)) *
      (time - INPUT_START);

  return color.lighten(output).hex();
};
