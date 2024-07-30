import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    height: 90,
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    padding: 15,
    borderBottomColor: '#ededee',
  },
  itemImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    // marginTop:5
  },
  btn: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#1E71B7',
    width: 80,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 30
  },
});

export default style;
