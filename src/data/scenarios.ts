export interface Location {
  name: string
  image?: string
}

export interface District {
  name: string
  tags: string[]
  mapImage?: string
  locations: Location[]
}

export const districts: District[] = [
  {
    name: 'Monte Carlo',
    tags: ['Distrito Comercial', 'Capital do País', 'Ótima Reputação'],
    locations: [
      { name: 'Opera Gallery' },
      { name: 'Casino de Monte Carlo' },
    ],
  },
  {
    name: 'Larvotto',
    tags: ['Distrito Cultural Litorâneo'],
    locations: [
      { name: 'Órbita Blue' },
    ],
  },
  {
    name: 'Monaco-Ville',
    tags: ['Distrito Residencial', 'Condomínio Gama', 'Excelente Reputação'],
    locations: [
      { name: 'Catedral de São Nicolau' },
      { name: 'Museu Oceanográfico' },
    ],
  },
  {
    name: 'Fontvieille',
    tags: ['Distrito Comercial'],
    locations: [
      { name: 'Royal Holloway' },
      { name: 'Le Pré Catelan' },
    ],
  },
  {
    name: 'La Rousse',
    tags: ['Distrito Mais Afastado', 'Condomínio Alfa'],
    locations: [
      { name: 'Country Club MacDowell' },
      { name: 'Vinícola Potter' },
    ],
  },
  {
    name: 'Sainte-Dévote',
    tags: ['Distrito Boêmio', 'Vida Noturna'],
    locations: [
      { name: 'Pub Cerberus' },
      { name: 'Kukum' },
      { name: 'Bunny Club' },
    ],
  },
  {
    name: 'Jardin Exotique',
    tags: ['Distrito Natural', 'Vista Privilegiada da Cidade'],
    locations: [
      { name: 'Oogenlust' },
      { name: 'Jardin Animalier' },
    ],
  },
  {
    name: 'La Condamine',
    tags: ['Distrito Residencial e Portuário', 'Condomínio Beta'],
    locations: [
      { name: 'Home of Chocolate' },
    ],
  },
]
