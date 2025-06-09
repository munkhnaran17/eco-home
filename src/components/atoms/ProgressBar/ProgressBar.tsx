import Box from '../Box/Box';

interface ProgressBarProps {
  total: number;
  current: number;
  decreasing?: boolean;
  disabled?: boolean;
}

const ProgressBar = ({
  total,
  current,
  decreasing = false,
  disabled = false,
}: ProgressBarProps) => {
  const progress = decreasing
    ? 100 - (current / total) * 100
    : (current / total) * 100;

  return (
    <Box
      flex={1}
      height={10}
      borderWidth={1}
      borderColor={disabled ? 'onSurfaceDisabled' : 'success'}
      borderRadius='full'
    >
      <Box
        flex={1}
        width={`${progress}%`}
        backgroundColor={disabled ? 'onSurfaceDisabled' : 'success'}
        borderRadius='full'
      />
    </Box>
  );
};

export default ProgressBar;
