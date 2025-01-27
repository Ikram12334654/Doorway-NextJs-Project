import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { color } from './style';

export function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  const theme = useTheme(); // Access theme colors

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {/* Background gray ring */}
      <CircularProgress
        variant="determinate"
        value={100}
        sx={{
          color: theme.palette.grey[300], // Set gray color for the background ring
          position: 'absolute', // Position it behind the main ring
        }}
      />
      {/* Foreground progress ring */}
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          color: color.themeColor, // Foreground ring color
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontSize: '10px', color: 'text.secondary' }} // Set font size to 10px
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
