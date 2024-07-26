export const themes = [
  {
    name: 'Mar Caribe',
    styles: [
      ['--bg', '#0a1930'],
      ['--bg-light', '#172a46'],
      ['--bg-dark', '#091120'],
      ['--txt', '#fdfffc'],
      ['--txt-light', 'rgba(255, 255, 255, 0.5)']
    ]
  },
  {
    name: 'Sangre Verde',
    styles: [
      ['--bg', 'white'],
      ['--bg-light', '#c1f5ae'],
      ['--bg-dark', '#a3ed87'],
      ['--txt', '#333'],
      ['--txt-light', 'rgba(0, 0, 0, 0.5)']
    ]
  }
]

export function getParsedTheme(index) {
  return themes[index].styles.reduce(
    (accumultor, [property, value]) => accumultor + `${property}:${value};`,
    ''
  )
}
