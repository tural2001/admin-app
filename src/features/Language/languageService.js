// actions/languageActions.js

export const setLanguage = (language) => ({
  type: 'SET_LANGUAGE',
  language,
});

// reducers/languageReducer.js

const initialState = {
  language: 'az', // Default language is Azerbaijani (az).
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      if (action.language === 'az' || action.language === 'en') {
        return {
          ...state,
          language: action.language,
        };
      } else {
        // If an invalid language is provided, you can choose to keep the state unchanged or set a default.
        // Here, I'm setting it to the default language 'az'.
        return {
          ...state,
          language: 'az',
        };
      }
    default:
      return state;
  }
};
