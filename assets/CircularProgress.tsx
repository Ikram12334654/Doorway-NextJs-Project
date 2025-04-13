import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { color } from "./style";

export function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  const theme = useTheme();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setProgress((prev) => {
        const delta = props.value - prev;
        if (Math.abs(delta) < 1) return props.value;
        return prev + delta * 0.1;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [props.value]);

  const dynamicColor = progress >= 80 ? color.redColor : color.themeColor;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        sx={{
          color: theme.palette.grey[300],
          position: "absolute",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{
          color: dynamicColor,
          transition: "stroke-dashoffset 0.3s ease-in-out",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontSize: "10px", color: "text.secondary" }}
        >
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
