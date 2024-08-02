import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteMessage, sendMessage} from '../../services/Put';
import {getMessage} from '../../services/Get';
import style from './style';

export default function ChatScreen() {
  const [selectedMessages, setSelectedMessages] = useState<any>([]);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route: any = useRoute();
  const {data} = route?.params;
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState();

  const scrollViewRef: any = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={style.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{tintColor: 'black'}}
              source={require('../../assest/Img/arrowback.png')}
            />
          </TouchableOpacity>

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{fontSize: 16, fontWeight: '500'}}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={style.imgContainer}>
              <Image
                style={style.img}
                source={
                  data?.image
                    ? {uri: data?.image}
                    : require('../../assest/Img/1.jpg')
                }
              />
              <Text style={style.userNameText}>{data?.username}</Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={style.headerLeft}>
            <TouchableOpacity
              onPress={() => {
                deleteMessages();
              }}>
              <Image source={require('../../assest/Img/delete.png')} />
            </TouchableOpacity>
          </View>
        ) : null,
    });
  }, [selectedMessages]);

  const formatTime = (time: any) => {
    const options: any = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  //Select Message
  const handleSelectMessage = (message: any) => {
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages: any) =>
        previousMessages.filter((id: any) => id !== message._id),
      );
    } else {
      setSelectedMessages((previousMessages: any) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };

  //get Message
  const fetchMessages = async () => {
    try {
      const res: any = await getMessage(data?._id);
      if (res) {
        setMessages(res);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  //send Message
  const handleSend = async (messageType: any, imageUri?: any) => {
    try {
      let item = {
        receiverId: data?._id,
        messageType: messageType,
        messageText: message,
      };
      const response = await sendMessage(item);
      if (response.status == 'ok') {
        setMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.log('error in sending the message', error);
    }
  };

  //delete Message
  const deleteMessages = async () => {
    try {
      let item = {
        messages: selectedMessages,
      };
      const res = await deleteMessage(item);
      if (res) {
        setSelectedMessages((prevSelectedMessages: any) =>
          prevSelectedMessages.filter(
            (id: any) => !selectedMessages.includes(id),
          ),
        );
        fetchMessages();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Scroll Down
  useEffect(() => {
    scrollToBottom();
    const getUserID = async () => {
      const userID: any = await AsyncStorage.getItem('userId');
      setUserId(userID);
    };
    getUserID();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: false});
    }
  };
  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#F0F0F0'}}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{flexGrow: 1}}
        onContentSizeChange={handleContentSizeChange}>
        {messages.map((item: any, index: any) => {
          if (item.messageType === 'text') {
            const isSelected = selectedMessages.includes(item._id);
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                key={index}
                style={[
                  item?.senderId == userId
                    ? style.sendMessgContainer
                    : style.recevierMessgContainer,
                  isSelected && {width: '100%', backgroundColor: '#F0FFFF'},
                ]}>
                <Text
                  style={[
                    style.messgText,
                    {
                      textAlign: isSelected ? 'right' : 'left',
                    },
                  ]}>
                  {item?.message}
                </Text>
                <Text style={style.messgTime}>
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }
        })}
      </ScrollView>
      <View style={style.inputContainer}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={style.input}
          placeholder="Type Your message..."
        />
        <Pressable
          onPress={() => handleSend('text')}
          disabled={message != '' ? false : true}
          style={style.messgSendBtn}>
          <Text style={style.messgSendText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
