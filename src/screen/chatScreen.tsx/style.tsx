import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  sendMessgContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 8,
    maxWidth: '60%',
    borderRadius: 7,
    margin: 10,
  },
  recevierMessgContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 8,
    margin: 10,
    borderRadius: 7,
    maxWidth: '60%',
  },
  messgText: {
    fontSize: 14,
    fontWeight: '600',
  },
  messgTime: {
    textAlign: 'right',
    fontSize: 9,
    color: 'gray',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  messgSendBtn: {
    backgroundColor: '#1E71B7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 10,
  },
  messgSendText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  userNameText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '700',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default style;
