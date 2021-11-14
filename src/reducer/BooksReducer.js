import Immutable from 'seamless-immutable';
import _ from 'lodash';

const initialState = Immutable({
  home: [],
  categories: [],
  books: [],
  booksByTopics: [],
  favourites: [],
  bookmarks: [],
  pages: {},
  selectedBook: {},
  quizList: [],
  quiz: {},
  featureImages: [],
  selectedQuestion: {},
  qckNav: [],
  rewards: {},
  childBookStats: [],
});

export default function (state = initialState, action) {
  const {payload} = action;

  switch (action.type) {
    case 'CHILD_BOOK_STATS':
      return Immutable.merge(state, {
        childBookStats: payload,
      });
    case 'REWARDS':
      return Immutable.merge(state, {
        rewards: payload,
      });
    case 'SELECTED_QUESTION':
      return Immutable.merge(state, {
        selectedQuestion: payload,
      });

    case 'FEATURES_IMAGES':
      return Immutable.merge(state, {
        featureImages: payload,
      });
    case 'GET_QUIZ_LIST':
      return Immutable.merge(state, {
        quizList: payload,
      });
    case 'GET_QUIZ':
      return Immutable.merge(state, {
        quiz: payload,
      });

    case 'SELECTED_BOOK':
      return Immutable.merge(state, {
        selectedBook: payload,
      });
    case 'GET_BOOKS':
      return Immutable.merge(state, {
        books: action.payload,
      });
    case 'GET_HOME_DATA':
      return Immutable.merge(state, {
        home: action.payload,
      });
    case 'GET_CATEGORIES':
      var stateCopy = _.cloneDeep(state);
      var stateCategories = stateCopy.categories;

      if (stateCategories && stateCategories.length > 0) {
        const categoriesToIterate = action.payload;

        for (let i = 0; i < categoriesToIterate.length; i++) {
          const filterCategory = stateCategories.findIndex(
            (thisEl) =>
              thisEl.categoryinfo.id === categoriesToIterate[i].categoryinfo.id,
          );

          if (filterCategory == -1) {
            stateCategories = [...stateCategories, categoriesToIterate[i]];
          }
        }
      } else {
        stateCategories = action.payload;
      }

      return Immutable.merge(state, {
        categories: stateCategories,
      });
    case 'GET_BOOKS_BY_CAT_ID':
      var stateCopy = _.cloneDeep(state);
      var stateCategories = stateCopy.categories;
      const booksList = action.payload.bookinfo;

      if (booksList && booksList.length > 0) {
        if (stateCategories && stateCategories.length > 0) {
          const filteredCategoryIndex = stateCategories.findIndex(
            (thisEl) => thisEl.categoryinfo.id === action.categoryId,
          );

          if (filteredCategoryIndex > -1) {
            stateCategories[filteredCategoryIndex].categoryBooks =
              action.payload;
          }
        }
      }

      return Immutable.merge(state, {
        books: action.payload,
        categories: stateCategories,
      });
    case 'GET_BOOKS_BY_TOPIC_ID':
      return Immutable.merge(state, {
        booksByTopics: action.payload,
      });
    case 'GET_FILTERED_BOOKS':
      return {
        ...state,
        books: {
          ...state.books,
          bookinfo: action.payload,
        },
      };
    case 'GET_BOOKS_PAGES':
      return Immutable.merge(state, {
        pages: action.payload,
      });
    case 'GET_BOOKS_INSIDE':
      return Immutable.merge(state, {
        pages: action.payload,
      });
    case 'QUICK_NAVIGATION':
      return Immutable.merge(state, {
        qckNav: payload,
      });

    case 'GET_FAVOURITE_BOOKS':
      return Immutable.merge(state, {
        favourites: payload,
      });
    case 'GET_BOOKMARK_BOOKS':
      return Immutable.merge(state, {
        bookmarks: payload,
      });
    case 'GET_VIDEOS':
      return Immutable.merge(state, {
        videos: payload,
      });

    case 'ADD_TO_FAVORITES_LOCAL':
      var {bookObject} = action.data;
      var stateFavs = _.cloneDeep(state.favourites);

      if (stateFavs && stateFavs.length > 0) {
        const foundIndex = stateFavs.findIndex(
          (thisEl) => thisEl.id === bookObject.id,
        );

        if (foundIndex < 0) {
          stateFavs = [...stateFavs, bookObject];
        }
      } else {
        stateFavs = [bookObject];
      }

      return Immutable.merge(state, {
        favourites: stateFavs,
      });

    case 'REMOVE_FROM_FAVORITES_LOCAL':
      var {bookObject} = action.data;
      var stateFavs = _.cloneDeep(state.favourites);

      if (stateFavs && stateFavs.length > 0) {
        const foundIndex = stateFavs.findIndex(
          (thisEl) => thisEl.id === bookObject.id,
        );

        if (foundIndex > -1) {
          stateFavs.splice(foundIndex, 1);
        }
      }

      return Immutable.merge(state, {
        favourites: stateFavs,
      });

    case 'REMOVE_BOOKMARK_LOCAL':
      var {bookmarkObject} = action.data;
      var stateBookmarks = _.cloneDeep(state.bookmarks);

      if (stateBookmarks && stateBookmarks.length > 0) {
        const foundIndex = stateBookmarks.findIndex(
          (thisEl) => thisEl.id === bookmarkObject.id,
        );

        if (foundIndex > -1) {
          stateBookmarks.splice(foundIndex, 1);
        }
      }

      return Immutable.merge(state, {
        bookmarks: stateBookmarks,
      });

    case 'SET_REWARDS_DATA':
      var stateRewards = _.cloneDeep(state.rewards);

      const rewardsarray = action.data;

      const readTimeSum = rewardsarray.reduce((a, b) => {
        return a + b['readtime'];
      }, 0);

      const pageFlipSum = rewardsarray.reduce((a, b) => {
        return a + b['pagesflippedcount'];
      }, 0);

      return Immutable.merge(state, {
        rewards: {
          ...stateRewards,
          readtime: readTimeSum,
          pagesflipped: pageFlipSum,
        },
      });

    case 'SET_BOOKS_READ_DATA':
      var stateRewards = _.cloneDeep(state.rewards);

      const {
        bookreadcount,
        gooddeeds,
        quizzestaken,
        totalscore,
        totalrightanswers,
        totalwronganswers,
      } = action.data;

      return Immutable.merge(state, {
        rewards: {
          ...stateRewards,
          bookreadcount,
          gooddeeds,
          quizzestaken,
          totalscore,
          totalrightanswers,
          totalwronganswers,
        },
      });

    default:
      return state;
  }
}
