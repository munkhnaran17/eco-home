import {
  Box,
  Button,
  Card,
  ChatMessage,
  TextInput,
  Typography,
} from '@/src/components';
import useChat from '@/src/hooks/useChat';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const suggestions = [
  {
    title: 'Гэрээ дулаалах',
    description: 'Танайх хаагуураа дулаан алдаж байгааг мэдмээр байна уу?',
    question: 'Манайх дулаанаа хаагуур алдаж байна вэ?',
  },
  {
    title: 'Зөвлөгөө гаргуулах',
    description: 'Хэрхэн energy efficient амьдрах зөвлөгөө авах уу?',
    question: 'Хэрхэн energy efficient амьдрах вэ?',
  },
];

const Chat = () => {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();
  const marginBottom = useSharedValue(0);
  const marginHorizontal = useSharedValue(16);
  const borderBottomRadius = useSharedValue(24);
  const isFocused = useIsFocused();
  const { send, chat, isLoading } = useChat();
  const inputRef = useRef<RNTextInput>(null);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text && !isLoading) {
      console.log('text: ', text);
      Keyboard.dismiss();
      send(text);
      setText('');
    }
  };

  const scale = useSharedValue(1);
  const [showSendButton, setShowSendButton] = useState<boolean>(false);

  const animatedLoaderStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    marginBottom: marginBottom.value,
  }));

  const animatedInputStyle = useAnimatedStyle(() => ({
    marginHorizontal: marginHorizontal.value,
    borderBottomLeftRadius: borderBottomRadius.value,
    borderBottomRightRadius: borderBottomRadius.value,
  }));

  const sendButtonOpacity = useSharedValue(1);

  const animatedSendButtonStyle = useAnimatedStyle(() => ({
    opacity: sendButtonOpacity.value,
  }));

  useEffect(() => {
    if (text) {
      setShowSendButton(true);
      sendButtonOpacity.value = withTiming(1, { duration: 150 });
    } else {
      sendButtonOpacity.value = withTiming(0, { duration: 150 }, (finished) => {
        if (finished) {
          runOnJS(setShowSendButton)(false);
        }
      });
    }
  }, [text]);

  useEffect(() => {
    const toggleExpand = () => {
      scale.value = withRepeat(
        withTiming(1.5, {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    };

    toggleExpand();
  }, []);

  useEffect(() => {
    marginBottom.value = withTiming(isFocused ? 40 : 0, {
      duration: 300,
    });

    if (!isFocused) {
      Keyboard.dismiss();
    }
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          flex: 1,
          justifyContent: 'space-between',
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          data={chat}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 28,
            paddingHorizontal: chat.length > 0 ? 16 : 0,
          }}
          ListEmptyComponent={() => (
            <Box flex={1} alignItems='center' justifyContent='space-between'>
              <Box
                height='50%'
                gap='sp4'
                alignItems='center'
                paddingHorizontal='sp24'
                justifyContent='flex-end'
              >
                <Box
                  backgroundColor='onSurfaceSoft'
                  borderRadius='full'
                  width={56}
                  height={56}
                  alignItems='center'
                  justifyContent='center'
                  marginBottom='sp16'
                >
                  <Ionicons size={28} name='leaf' color='white' />
                </Box>
                <Typography fontSize={24} fontWeight={500} textAlign='center'>
                  GoLeaf
                </Typography>
                <Typography textAlign='center'>
                  Өөрсдийн ирээдүйд хөрөнгө оруулж буй түүчээлэгч иргэн танд
                  баярлалаа.
                </Typography>
              </Box>
              <FlatList
                style={{
                  position: 'absolute',
                  bottom: 0,
                  paddingLeft: 16,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={suggestions}
                renderItem={({ item, index }) => (
                  <Button
                    width={200}
                    alignItems='flex-start'
                    justifyContent='flex-start'
                    gap='sp8'
                    marginRight='sp16'
                    backgroundColor={
                      index % 2 === 0 ? 'yellowSoft' : 'blueSoft'
                    }
                    padding='sp12'
                    borderRadius='br16'
                    onPress={() => send(item.question)}
                  >
                    <Typography fontWeight={500} fontSize={16}>
                      {item.title}
                    </Typography>
                    <Typography fontSize={13}>{item.description}</Typography>
                  </Button>
                )}
              />
            </Box>
          )}
          ItemSeparatorComponent={() => <Box paddingVertical='sp8' />}
          renderItem={({ item }) => <ChatMessage chat={item} />}
          ListFooterComponent={() =>
            isLoading && (
              <Animated.View
                style={[
                  animatedLoaderStyle,
                  {
                    marginTop: 12,
                    borderWidth: 1,
                    width: 10,
                    height: 10,
                    backgroundColor: 'black',
                    borderRadius: 100,
                  },
                ]}
              />
            )
          }
        />
        <Card variant='shadow'>
          <Animated.View
            style={[
              animatedInputStyle,
              {
                borderRadius: 24,
                overflow: 'hidden',
              },
            ]}
          >
            <TextInput
              value={text}
              ref={inputRef}
              returnKeyType='done'
              onFocus={() => {
                marginHorizontal.value = withTiming(0, { duration: 250 });
                borderBottomRadius.value = withTiming(0, { duration: 250 });
              }}
              onBlur={() => {
                marginHorizontal.value = withTiming(16, { duration: 250 });
                borderBottomRadius.value = withTiming(24, { duration: 250 });
              }}
              onChangeText={setText}
              onSubmitEditing={handleSubmit}
              placeholder='Танд яаж туслах вэ?'
              containerProps={{
                borderRadius: 'br0',
                suffix: (
                  <Box flexDirection='row' gap='sp4'>
                    {showSendButton && (
                      <Animated.View style={animatedSendButtonStyle}>
                        <Button
                          disabled={isLoading || !text}
                          backgroundColor='successSoft'
                          borderRadius='full'
                          width={40}
                          height={40}
                          onPress={handleSubmit}
                        >
                          <Ionicons
                            name='send'
                            size={20}
                            color={colors.primary}
                          />
                        </Button>
                      </Animated.View>
                    )}
                    <Button
                      backgroundColor='successSoft'
                      borderRadius='full'
                      width={40}
                      height={40}
                    >
                      <Ionicons name='image' size={20} color={colors.primary} />
                    </Button>
                  </Box>
                ),
              }}
            />
          </Animated.View>
        </Card>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default Chat;
