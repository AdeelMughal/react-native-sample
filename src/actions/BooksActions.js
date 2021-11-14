import axios from 'axios';
var qs = require('qs');
import {DataHelper} from '../helpers';
import {
  kApiGetCategory,
  kApiGlossary,
  kApiGetVideoList,
  kApiBooksRead,
  kApiGlossaryByLetter,
  kApiGetAllBooks,
  kApiGetFeatured,
  kApiGetBooks,
  kApiBookPages,
  kApiQuizList,
  kApiShowQuiz,
  kApiAddScore,
  kApiSort,
  kApiQuickNavigation,
  kApiAddFavBooks,
  kApiGetFavBooks,
  kApiGetBookmarkBooks,
  kApiAddBookmarkBook,
  kApiDeleteBookmark,
  kApiGetHomeData,
  kApiGetBooksByCatId,
  kApiBookInside,
  kApiGetBooksByTopicId,
  kApiGetBookFilters,
  kApiGetBookRating,
  kApiPostBookRating,
  kApiAddBookStat,
  kApiAddBookReadCount,
  kApiChildBookStats,
  kApiUpdateChildBookStats,
  kApiRemoveFavBooks,
  kApiGetStat,
  kApiGetGoodDeeds,
} from '../config/WebService';
import utils from '../util';

export const getHomeData = () => (dispatch) => {
  fetch(DataHelper.getCompleteUrl(kApiGetHomeData))
    .then((res) => res.json())
    .then((res) => {
      dispatch({type: 'GET_HOME_DATA', payload: res.data});
      dispatch({type: 'GET_CATEGORIES', payload: res.data.categoryboximages});
    });
};

export const getCategories = () => (dispatch) => {
  fetch(DataHelper.getCompleteUrl(kApiGetCategory))
    .then((res) => res.json())
    .then((res) => {
      dispatch({type: 'GET_CATEGORIES', payload: res.data});
    });
};
export const getBooksByCatId = (categoryid) => (dispatch) => {
  fetch(
    `${DataHelper.getCompleteUrl(
      kApiGetBooksByCatId,
    )}?categoryId=${categoryid}`,
  )
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: 'GET_BOOKS_BY_CAT_ID',
        categoryId: categoryid,
        payload: res.data,
      });
    });
};
export const getBooksByTopicId = (topicid) => (dispatch) => {
  if (topicid) {
    fetch(
      `${DataHelper.getCompleteUrl(kApiGetBooksByTopicId)}?topicid=${topicid}`,
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch({type: 'GET_BOOKS_BY_TOPIC_ID', payload: res.data});
      });
  }
};

export const getAllVideos = () => (dispatch) => {
  fetch(DataHelper.getCompleteUrl(kApiGetVideoList))
    .then((res) => res.json())
    .then((res) => {
      dispatch({type: 'GET_VIDEOS', payload: res.data});
    });
};

export const getRewards = (id) => (dispatch) => {
  DataHelper.showLoader();
  axios
    .post(DataHelper.getCompleteUrl(kApiBooksRead), {childid: id})
    .then((res) => {
      if (res.data.status == 'success') {
        dispatch({type: 'SET_BOOKS_READ_DATA', data: res?.data?.data});
      }
      DataHelper.hideLoader();
    });
};

export const getAllBooks = () => (dispatch) => {
  fetch(DataHelper.getCompleteUrl(kApiGetAllBooks))
    .then((res) => res.json())
    .then((res) => {
      dispatch({type: 'GET_BOOKS', payload: res.data});
    });
};

export const getFeaturedImages = () => (dispatch) => {
  fetch(DataHelper.getCompleteUrl(kApiGetFeatured))
    .then((res) => res.json())
    .then((res) => {
      dispatch({type: 'FEATURES_IMAGES', payload: res.data});
    });
};

export const getBookById = (id) => (dispatch) => {
  axios.post(DataHelper.getCompleteUrl(kApiGetBooks), {id: id}).then((res) => {
    dispatch({type: 'GET_BOOKS', payload: res.data.data});
  });
};

export const getPagesById = (id) => (dispatch) => {
  axios.post(DataHelper.getCompleteUrl(kApiBookPages), {id: id}).then((res) => {
    dispatch({type: 'GET_BOOKS_PAGES', payload: res.data.data});
  });
};
export const getBookInsideById = (id) => (dispatch) => {
  axios
    .get(`${DataHelper.getCompleteUrl(kApiBookInside)}?bookid=${id}`)
    .then((res) => {
      dispatch({type: 'GET_BOOKS_INSIDE', payload: res.data.data});
    });
};

export const selectedBook = (payload) => (dispatch) => {
  dispatch({type: 'SELECTED_BOOK', payload});
};

export const getQuizList = () => (dispatch) => {
  axios.get(DataHelper.getCompleteUrl(kApiQuizList)).then((payload) => {
    dispatch({
      type: 'GET_QUIZ_LIST',
      payload: payload.data.data,
    });
  });
};
export const getQuiz = (data) => (dispatch) => {
  axios.post(DataHelper.getCompleteUrl(kApiShowQuiz), data).then((payload) => {
    dispatch({
      type: 'GET_QUIZ',
      payload: payload.data.data,
    });
  });
};

export const addScore = (quizrScore, pass) => (dispatch) => {
  axios
    .post(DataHelper.getCompleteUrl(kApiAddScore), quizrScore)
    .then((res) => {
      pass(res);
      // dispatch({
      //   type: "GET_QUIZ",
      //   payload: payload.data.data,
      // });
    })
    .catch((err) => {});
};
export const getFavoriteBooks = (data) => (dispatch) => {
  axios
    .get(DataHelper.getCompleteUrl(kApiGetFavBooks), {
      params: data,
    })
    .then((res) => {
      dispatch({
        type: 'GET_FAVOURITE_BOOKS',
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addFavoriteBook = (data) => (dispatch) => {
  axios
    .post(DataHelper.getCompleteUrl(kApiAddFavBooks), {
      childid: data.childid,
      bookid: data.bookid,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeFavoriteBook = (data) => (dispatch) => {
  axios
    .post(DataHelper.getCompleteUrl(kApiRemoveFavBooks), {
      childid: data.childid,
      bookid: data.bookid,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBookmarkBooks = (data) => (dispatch) => {
  axios
    .get(DataHelper.getCompleteUrl(kApiGetBookmarkBooks), {
      params: data,
    })
    .then((res) => {
      dispatch({
        type: 'GET_BOOKMARK_BOOKS',
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addBookmarkBook = (data) => (dispatch) => {
  const {pageid, childid, bookid} = data;

  axios
    .post(DataHelper.getCompleteUrl(kApiAddBookmarkBook), {
      pageid,
      childid,
      bookid,
    })
    .then((res) => {
      utils.showToast('Bookmark added');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteBookmark = (id) => (dispatch) => {
  axios
    .post(DataHelper.getCompleteUrl(kApiDeleteBookmark), {
      id,
    })
    .then((res) => {
      utils.showToast('Bookmark Removed');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFilteredBooks = (data) => (dispatch) => {
  axios
    .get(
      `${DataHelper.getCompleteUrl(kApiGetBookFilters)}?isLowerAgeRange=${
        data.isLowerAgeRange
      }&isUpperAgeRange=${data.isUpperAgeRange}&isnewaddition=${
        data.isnewaddition
      }&ispopularbooks=${data.ispopularbooks}&israted=${
        data.israted
      }&isfeatured=${data.isfeatured}&categoryid=${data.categoryId}`,
    )
    .then((res) => {
      dispatch({type: 'GET_FILTERED_BOOKS', payload: res.data.data});
    })
    .catch((err) => {
      console.log(err);
    });
};

export const applyFilters = (key, type, categoryid, books, closeModal) => {
  return (dispatch) => {
    axios
      .post(
        DataHelper.getCompleteUrl(kApiSort),
        qs.stringify({
          categoryid: categoryid,
          type: type,
          key: key,
        }),
      )
      .then((res) => {
        if (res.data.status === 'success') {
          let data = [];
          res.data.data.map((item) => {
            data.push({
              id: item.bookid,
              title: item.applyFiltersname,
              image: item.image,
            });
          });

          books[0].categoryinfo.bookinfo = data;
          closeModal();
          dispatch({
            type: 'GET_BOOKS',
            payload: books,
          });
        }
      });
  };
};

export const quickNabvigation = () => {
  return (dispatch) => {
    axios.get(DataHelper.getCompleteUrl(kApiQuickNavigation)).then((res) => {
      if (res.data.status === 'success') {
        dispatch({
          type: 'QUICK_NAVIGATION',
          payload: res.data.data,
        });
      }
    });
  };
};

export const selectedQuestion = (question) => (dispatch) => {
  dispatch({type: 'SELECTED_QUESTION', payload: question});
};

export const getBookRating = (data) => {
  return (dispatch) => {
    DataHelper.showLoader();

    axios
      .get(DataHelper.getCompleteUrl(kApiGetBookRating), {
        params: data,
      })
      .then((res) => {
        DataHelper.hideLoader();

        if (res.data.status === 'success') {
          // dispatch({
          //   type: 'QUICK_NAVIGATION',
          //   payload: res.data.data,
          // });
        }
      })
      .catch((err) => {
        DataHelper.hideLoader();

        console.log(err);
      });
  };
};

export const postBookRating = (data) => {
  return (dispatch) => {
    DataHelper.showLoader();

    axios
      .post(DataHelper.getCompleteUrl(kApiPostBookRating), data)
      .then((res) => {
        DataHelper.hideLoader();
        // if (res.data.status == 'success') {
        //   dispatch({type: 'REWARDS', payload: res.data.data});
        // }
      })
      .catch((err) => {
        DataHelper.hideLoader();

        console.log(err);
      });
  };
};

export const getStats = (childid) => (dispatch) => {
  DataHelper.showLoader();

  axios
    .get(DataHelper.getCompleteUrl(kApiGetStat), {
      params: {childid},
    })
    .then((res) => {
      DataHelper.hideLoader();

      if (res.data.status === 'success') {
        dispatch({type: 'SET_REWARDS_DATA', data: res.data.data});
      }
    })
    .catch((err) => {
      DataHelper.hideLoader();

      console.log(err);
    });
};

export const getGoodDeeds = (childid) => (dispatch) => {
  DataHelper.showLoader();

  axios
    .get(DataHelper.getCompleteUrl(kApiGetGoodDeeds), {
      params: {childid},
    })
    .then((res) => {
      DataHelper.hideLoader();

      if (res.data.status === 'success') {
        // dispatch({type: 'SET_REWARDS_DATA', data: res.data.data});
      }
    })
    .catch((err) => {
      DataHelper.hideLoader();

      console.log(err);
    });
};

export const addBookStat = (data) => {
  return (dispatch) => {
    let query = new URLSearchParams(data).toString();
    axios
      .post(`${DataHelper.getCompleteUrl(kApiAddBookStat)}?${query}`)
      .then((res) => {
        console.log(res, 'res in addbookstat');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateBookReadCount = (data) => {
  return (dispatch) => {
    let query = new URLSearchParams(data).toString();
    axios
      .post(`${DataHelper.getCompleteUrl(kApiAddBookReadCount)}?${query}`)
      .then((res) => {
        console.log(res, 'res in updateBookReadCount');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getChildBookStats = () => {
  return (dispatch) => {
    if (DataHelper.isChildLoggedIn()) {
      let childid = DataHelper.getUserObject()?.id;
      axios
        .post(
          `${DataHelper.getCompleteUrl(kApiChildBookStats)}?childid=${childid}`,
        )
        .then((res) => {
          console.log(res, 'response in getChildBookStats');
          if (res.data.status === 'success') {
            dispatch({type: 'CHILD_BOOK_STATS', payload: res.data.data});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export const updateChildBookReadStatus = (data) => {
  return (dispatch) => {
    if (DataHelper.isChildLoggedIn()) {
      let childid = DataHelper.getUserObject()?.id;
      data.childid = childid;
      let query = new URLSearchParams(data).toString();
      axios
        .post(`${DataHelper.getCompleteUrl(kApiUpdateChildBookStats)}?${query}`)
        .then((res) => {
          if (res.data.status === 'success') {
            console.log(res, 'response in updateChildBookReadStatus');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export const bookAddToFavsLocal = (bookObject) => (dispatch) => {
  dispatch({type: 'ADD_TO_FAVORITES_LOCAL', data: {bookObject}});
};

export const bookRemoveFromFavsLocal = (bookObject) => (dispatch) => {
  dispatch({type: 'REMOVE_FROM_FAVORITES_LOCAL', data: {bookObject}});
};

export const removeBookmarkLocal = (bookmarkObject) => (dispatch) => {
  dispatch({type: 'REMOVE_BOOKMARK_LOCAL', data: {bookmarkObject}});
};
