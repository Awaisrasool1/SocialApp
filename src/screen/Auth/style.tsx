import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    marginTop: -20,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
    alignSelf: 'center',
  },
  rowGap: {
    marginTop: 20,
    rowGap: 25,
  },
  errorText: {
    marginTop: 2,
    marginLeft: 6,
    color: '#F72020',
    fontSize: 12,
  },
  remember: {
    color: '#777777',
    fontSize: 14,
    margin: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  defultImg: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 85,
  },
  lebel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
