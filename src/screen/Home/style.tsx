import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  postImg: {
    width: '100%',
    height: 300,
  },
  senderimg: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
    marginBottom:10
  },
  snedreName:{
    fontSize:14,
    fontWeight:'600',
    color:'black'
  }
});

export default styles;
