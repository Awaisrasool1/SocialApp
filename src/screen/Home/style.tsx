import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal:10
  },
  itemContainer: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal:10,
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    // marginTop:5
  },
  itemMessage:{
    fontSize: 14,
    fontWeight: '600',
    color: '#BFBFBF',
  }
});

export default styles;
