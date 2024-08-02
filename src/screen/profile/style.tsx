import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('screen');

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgContainer: {
    marginTop: 20,
    rowGap: 5,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 45,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  postsText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
  postNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
  aboutText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    marginLeft: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  postImg: {
    width: width / 3,
    height: 160,
  },
});

export default style;
