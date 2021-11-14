import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import DropDown from '../DropDown';
import {connect} from 'react-redux';
import {MapSateToProps} from '../../common/MapDisptacher';
import CountryPicker from 'react-native-country-picker-modal';
import {searchCountry} from '../../actions/AuthActions';
import {Fonts, Metrics, Colors} from '../../theme';

class CountryDropdown extends Component {
  state = {
    chooseCountryDropdown: false,
    country: '',
    countryName: this.props.countryName || '',
    countryList: [],
  };

  // componentWillReceiveProps(props) {
  //   if (props.auth?.countryList?.length > 0) {
  //     this.setState({countryList: props.auth?.countryList});
  //   }
  // }

  render() {
    return (
      <View
        style={[
          {
            width: Metrics.screenWidth * 0.92,
            // margin: 0,
            zIndex: 1,
          },
          this.props.style,
        ]}>
        <CountryPicker
          visible={this.state.chooseCountryDropdown}
          withFilter
          withFlag
          containerButtonStyle={{
            position: 'absolute',
            top: 2 * Metrics.screenHeight,
          }}
          onSelect={(selectedCountry) => {
            this.setState({
              chooseCountryDropdown: false,
              countryName: selectedCountry.name,
            });
            if (this.props.onSelectCountry) {
              this.props.onSelectCountry(selectedCountry);
            }
          }}
        />
        <DropDown
          searchCountry={(val) => this.props.searchCountry(val)}
          countryName={this.state.countryName}
          countries={this.state.countryList}
          chooseCountryDropdown={this.state.chooseCountryDropdown}
          style={{height: Metrics.ratio(45)}}
          placeholderStyle={{fontSize: Metrics.ratio(16), color: Colors.black}}
          openModal={() =>
            this.setState({
              chooseCountryDropdown: !this.state.chooseCountryDropdown,
            })
          }
          selectCountry={(val, name) => {
            this.setState({
              chooseCountryDropdown: false,
              countryName: name,
            });
          }}
        />
      </View>
    );
  }
}

export default connect(MapSateToProps, {
  searchCountry,
})(CountryDropdown);
