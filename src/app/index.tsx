import { View } from 'react-native';
import Box from '../components/Box/Box';
import Typography from '../components/Typography/Typography';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography>Hello</Typography>
      </Box>
    </View>
  );
}
