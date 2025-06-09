import { Box, Button, Typography } from '@/src/components';
import { router } from 'expo-router';

export default function Onboarding() {
  return (
    <Box flex={1} justifyContent='center' alignItems='center'>
      <Typography
        color='black'
        paddingHorizontal='sp40'
        textAlign='center'
        paddingBottom='sp24'
      >
        Хиймэл оюунд суурилсан ногоон шийдэлд тавтай морил
      </Typography>
      <Button variant='neon' width='30%' onPress={() => router.replace('/')}>
        <Typography color='success' fontWeight='500' fontSize={16}>
          Эхлэе
        </Typography>
      </Button>
    </Box>
  );
}
