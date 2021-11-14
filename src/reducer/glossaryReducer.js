import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {DataHelper} from '../helpers';

const initialState = Immutable({
  favorites: [],
  search: [],
  isLoading: false,
  data: [],
  error: undefined,
});

export default function (state = initialState, action) {
  const {data} = action;

  switch (action.type) {
    case 'SET_REQUEST_GLOSSARY':
      return Immutable.merge(state, {
        isLoading: true,
        error: undefined,
      });

    case 'SET_SUCCESS_GLOSSARY':
      return Immutable.merge(state, {
        data: action.payload,
        isLoading: false,
      });

    case 'SET_FAILURE_GLOSSARY':
      return Immutable.merge(state, {
        error: data.data.error,
        isLoading: false,
        data: [],
      });
    case 'SET_SUCCESS_GLOSSARY_FAVS':
      return Immutable.merge(state, {
        favorites: action.data,
      });
    case 'SET_SUCCESS_SEARCH':
      return Immutable.merge(state, {
        search: action.payload,
      });

    case 'GLOSSARY_ADD_TO_FAVORITES_LOCAL':
      var {glossaryObject, userId} = action.data;
      var stateFavs = _.cloneDeep(state.favorites);

      if (stateFavs && stateFavs.length > 0) {
        const foundIndex = stateFavs.findIndex(
          (thisEl) => thisEl.glossaryid === glossaryObject.id,
        );

        if (foundIndex < 0) {
          stateFavs = [
            ...stateFavs,
            {
              id: glossaryObject.id,
              glossaryid: glossaryObject.id,
              childid: userId,
            },
          ];
        }
      } else {
        stateFavs = [
          {
            id: glossaryObject.id,
            glossaryid: glossaryObject.id,
            childid: userId,
          },
        ];
      }

      return Immutable.merge(state, {
        favorites: stateFavs,
      });

    case 'GLOSSARY_REMOVE_FROM_FAVORITES_LOCAL':
      var {glossaryObject} = action.data;
      var stateFavs = _.cloneDeep(state.favorites);

      if (stateFavs && stateFavs.length > 0) {
        const foundIndex = stateFavs.findIndex(
          (thisEl) => thisEl.glossaryid === glossaryObject.id,
        );

        if (foundIndex > -1) {
          stateFavs.splice(foundIndex, 1);
        }
      }

      return Immutable.merge(state, {
        favorites: stateFavs,
      });

    default:
      return state;
  }
}
