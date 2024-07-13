import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.responsiveSize.size20,
  },
  image: {
    width: '100%',
    height: Theme.responsiveSize.size300,
    marginTop: Theme.responsiveSize.size20,
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
    marginTop: Theme.responsiveSize.size10,
  },
});

export default styles;
