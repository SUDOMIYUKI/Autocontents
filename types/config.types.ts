export interface UserConfig {
  tone: string
  target_audience?: {
    age_range?: string
    gender?: string
    interests?: string[]
  }
  main_themes?: string[]
  platforms?: Record<string, any>
  links?: Record<string, any>
}

export interface StyleGuide {
  style: {
    tone: {
      primary: string
      secondary?: string
      tertiary?: string
    }
    sentence_endings?: Record<string, string[]>
    structure?: {
      opening?: {
        type: string
        examples?: string[]
      }
    }
    signature_phrases?: string[]
    avoid?: string[]
    rhythm?: {
      sentence_length?: string
      paragraph_style?: string
    }
  }
}
