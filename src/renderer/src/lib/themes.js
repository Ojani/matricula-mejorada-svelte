export const themes = [
  {
    name: 'Medianoche',
    styles: [
      ['--bg', '#17153B'],
      ['--bg-light', '#2E236C'],
      ['--bg-dark', '#433D8B'],
      ['--txt', '#fff'],
      ['--txt-light', 'rgba(255, 255, 255, 0.5)']
    ]
  },
  {
    name: 'Sangre Verde',
    styles: [
      ['--bg', '#5F6F65'],
      ['--bg-light', '#808D7C'],
      ['--bg-dark', '#9CA986'],
      ['--txt', '#222'],
      ['--txt-light', 'rgba(0, 0, 0, 0.5)']
    ]
  },
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
    name: 'Oeste',
    styles: [
      ['--bg', '#BBE9FF'],
      ['--bg-light', '#FFFED3'],
      ['--bg-dark', '#FFE9D0'],
      ['--txt', '#222'],
      ['--txt-light', 'rgba(0, 0, 0, 0.5)']
    ]
  },
  {
    name: 'Off White',
    styles: [
      ['--bg', '#fff'],
      ['--bg-light', '#F6F5F2'],
      ['--bg-dark', '#F0EBE3'],
      ['--txt', '#333'],
      ['--txt-light', 'rgba(0, 0, 0, 0.5)']
    ]
  },
  {
    name: 'Un Verano Sin Ti 💔',
    styles: [
      ['--bg', '#ffd319'],
      ['--bg-light', '#ff2975'],
      ['--bg-dark', '#d370ff'],
      ['--txt', '#000'],
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
