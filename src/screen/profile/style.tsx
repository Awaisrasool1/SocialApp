import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 30,
    rowGap: 10,
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
});

export default style;
