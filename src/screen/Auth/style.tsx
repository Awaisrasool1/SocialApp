import {Dimensions, StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.responsiveSize.size20,
  },
  heading: {
    fontSize: Theme.responsiveSize.size18,
    fontWeight: '700',
    color: Theme.colors.black,
    marginTop: -Theme.responsiveSize.size20,
    marginBottom: Theme.responsiveSize.size20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: Theme.responsiveSize.size300,
    marginTop: Theme.responsiveSize.size20,
    alignSelf: 'center',
  },
  rowGap: {
    marginTop: Theme.responsiveSize.size20,
    rowGap: Theme.responsiveSize.size25,
  },
  errorText: {
    marginTop: 2,
    marginLeft: 6,
    color: Theme.colors.red_notification,
    fontSize: Theme.responsiveSize.size12,
  },
  remember: {
    color: '#777777',
    fontSize: Theme.responsiveSize.size14,
    margin: Theme.responsiveSize.size5,
    alignSelf: 'center',
    marginTop: Theme.responsiveSize.size20,
  },
});

export default styles;
