// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';

import {areEqual} from '../../util/commonUtils';
import {Metrics, Colors, Fonts} from '../../theme';
import {BookList} from '../';
import {Text} from '../../components';

export default SearchView = React.memo((props) => {
  const {data, onNavigate} = props;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {data && data.length > 0 && (
        <BookList showCategory data={data} onPress={onNavigate} />
      )}
      {(!data || data.length === 0) && <Text style={{}}>No Result Found</Text>}
    </View>
  );
}, areEqual);

SearchView.propTypes = {
  data: PropTypes.array,
  onNavigate: PropTypes.func,
};

SearchView.defaultProps = {data: [], onNavigate: () => {}};
