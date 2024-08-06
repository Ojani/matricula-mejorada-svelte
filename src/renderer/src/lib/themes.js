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
      ['--bg', '#052b09'],
      ['--bg-light', '#135c22'],
      ['--bg-dark', '#2d7b3a'],
      ['--txt', '#fff'],
      ['--txt-light', 'rgba(255, 255, 255, 0.5)']
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
      ['--bg', '#EEE'],
      ['--bg-light', '#d1e6ed'],
      ['--bg-dark', '#f0e8c9'],
      ['--txt', '#222'],
      ['--txt-light', 'rgba(0, 0, 0, 0.5)']
    ]
  },
  {
    name: 'Off White',
    styles: [
      ['--bg', '#ECEFF1'],
      ['--bg-light', '#CFD8DC'],
      ['--bg-dark', '#EFF2F4'],
      ['--txt', '#333'],
      ['--txt-light', 'rgba(0, 0, 0, 0.5)']
    ]
  },
  {
    name: 'Redshift',
    styles: [
      ['--bg', '#000'],
      ['--bg-light', '#6b0f01'],
      ['--bg-dark', '#400902'],
      ['--txt', '#fff'],
      ['--txt-light', 'rgba(255, 255, 255, 0.5)'],
    ]
  }
]

export function getParsedTheme(index) {
  return themes[index].styles.reduce(
    (accumultor, [property, value]) => accumultor + `${property}:${value};`,
    ''
  )
}
