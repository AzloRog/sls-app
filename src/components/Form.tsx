import { useState } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";

interface Props {
  onSubmit: Function;
}
const Form = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(email, password);
    setIsLoading(false);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "560px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: 4,
        paddingY: 10,
        paddingX: 20,
        boxShadow: 6,
        fontSize: 24,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <label htmlFor="email">Email</label>
        <TextField
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          size="small"
          disabled={isLoading}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor="pass">Password</label>
        <TextField
          id="pass"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          size="small"
          disabled={isLoading}
        />
      </Box>
      <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
        SignIn
      </Button>
    </Paper>
  );
};

export default Form;
