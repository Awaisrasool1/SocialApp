import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  imgContainer: {
    marginTop: 20,
    rowGap: 5,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
    alignItems: 'center',
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
    marginLeft: 20,
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
    marginLeft: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop:20
  },
});

export default style;
