import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    height: 90,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    padding: 15,
    borderBottomColor: '#ededee',
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
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
    marginLeft: 5,
  },
  btn: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#1E71B7',
    width: 100,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  topBtn: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#1E71B7',
    width: 100,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 30,
    marginTop: 20,
  },
});

export default style;
