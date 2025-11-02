import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import { useLogger } from '~/server/utils/logger'

export interface WeightClass {
  name: string
  url: string
  champion?: string
}

export const fetchWeightClasses = async (): Promise<WeightClass[]> => {
  const logger = useLogger()
  try {
    // URL des classements par catégorie de poids sur ufc.com
    const url = 'https://www.ufc.com/rankings'
    
    // Récupérer le contenu de la page avec l'en-tête pour la langue anglaise
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    const html = await response.text()
    
    // Parser le HTML avec cheerio
    const $ = cheerio.load(html)
    
    // Extraire les catégories de poids
    const weightClasses: WeightClass[] = []
    
    // Créer un mapping des noms français vers les noms anglais
    const frenchToEnglish: { [key: string]: string } = {
      'Poids mouche': 'Flyweight',
      'Poids coq': 'Bantamweight',
      'Poids plume': 'Featherweight',
      'Poids légers': 'Lightweight',
      'Poids mi-moyens': 'Welterweight',
      'Poids moyens': 'Middleweight',
      'Poids mi-lourds': 'Light Heavyweight',
      'Heavyweight': 'Heavyweight',
      'Poids paille féminins': 'Women\'s Strawweight',
      'Poids mouche féminins': 'Women\'s Flyweight',
      'Poids coq féminins': 'Women\'s Bantamweight',
      "Men's Pound-for-Pound Top Rank": "Men's Pound-for-Pound Top Rank",
      'Féminin - Livre pour livre Top Rank': 'Women\'s Pound-for-Pound Top Rank'
    }

    // Les catégories de poids sont dans des éléments avec la classe 'view-grouping-header'
    $('.view-grouping').each((index, element) => {
      const frenchName = $(element).find('.view-grouping-header').text().trim()
      const name = frenchToEnglish[frenchName] || frenchName
      
      // Chercher le champion s'il existe
      const championElement = $(element).find('.rankings--athlete--champion h5 a')
      const champion = championElement.text().trim()
      
      if (name) {
        weightClasses.push({
          name,
          url: `https://www.ufc.com/rankings#${encodeURIComponent(name)}`,
          champion: champion || undefined
        })
      }
    })
    
    return weightClasses
  } catch (error) {
    logger.error('Error fetching weight classes:', error)
    throw new Error('Failed to fetch weight classes from ufc.com')
  }
}
