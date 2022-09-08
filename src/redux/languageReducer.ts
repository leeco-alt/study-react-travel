interface LanguageState {
  langeuage: 'en' | 'zh'
  langeuageList: { name: string; code: string }[]
}

const defaultState: LanguageState = {
  langeuage: 'zh',
  langeuageList: [
    { name: '中文', code: 'zh' },
    { name: '英语', code: 'en' }
  ]
}

const languageReducer = (state = defaultState, action) => {
  return state
}

export default languageReducer
