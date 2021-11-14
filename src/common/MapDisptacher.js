export const MapSateToProps = (state) => ({
  auth: state.auth,
  books: state.books,
  signup: state.signup,
  general: state.general,
  relatedBooks: state.relatedBooks,
  searchBooks: state.searchBooks,
  bookDetails: state.bookDetails,
  glossary: state.glossary,
});
