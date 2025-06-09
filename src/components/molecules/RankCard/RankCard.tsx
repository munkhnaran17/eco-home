import useStore from '@/src/store/store';
import { Rank } from '@/src/types/rank';
import { rankUtils } from '@/src/utils/rank-utils';
import React from 'react';
import Box from '../../atoms/Box/Box';
import Card from '../../atoms/Card/Card';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import Typography from '../../atoms/Typography/Typography';

interface RankCardProps {
  rank: Rank;
}
const RankCard = ({ rank }: RankCardProps) => {
  const { progress, step } = useStore((state) => state.user.rank);
  const isEnabled = step >= rank.requiredStep;

  return (
    <Card
      backgroundColor={isEnabled ? 'surfaceSoft' : 'surfaceDisabled'}
      paddingRight='sp36'
      paddingTop='sp16'
      borderRadius='br20'
      flexDirection='row'
      justifyContent='space-between'
      shadowColor={isEnabled ? 'onSurfaceSoft' : 'onSurfaceDisabled'}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.75}
      shadowRadius={4}
      elevation={5}
    >
      <Box
        flex={0.75}
        paddingHorizontal='sp16'
        paddingBottom='sp16'
        justifyContent='space-between'
        gap='sp4'
      >
        <Typography
          color={isEnabled ? 'onSurfaceSoft' : 'onSurfaceDisabled'}
          fontWeight={500}
          fontSize={20}
        >
          {rank.name}
        </Typography>
        <Typography opacity={0.6}>{rank.description}</Typography>
        {!isEnabled && (
          <Box flexDirection='row' alignItems='center' gap='sp12'>
            <ProgressBar disabled total={rank.amount} current={progress} />
            <Typography color='onSurfaceDisabled'>
              {(rank.amount - progress).toLocaleString()}kg left
            </Typography>
          </Box>
        )}
      </Box>
      {rankUtils.getTree(rank.id, step)}
    </Card>
  );
};

export default RankCard;
