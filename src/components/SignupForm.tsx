import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const matches = useMediaQuery("(min-width:768px)");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    setIsLoading(false);
    if (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSignup}
      sx={{
        maxWidth: "560px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: 4,
        paddingY: 10,
        paddingX: matches ? 20 : 5,
        boxShadow: 6,
        fontSize: 24,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: 1,
          columnGap: 12,
          flexDirection: matches ? "row" : "column",
        }}
      >
        <label htmlFor="email">Email</label>
        <TextField
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          size="small"
          disabled={isLoading}
          type="email"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: 1,
          columnGap: 12,
          flexDirection: matches ? "row" : "column",
        }}
      >
        <label htmlFor="name">User name</label>
        <TextField
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          size="small"
          disabled={isLoading}
          type="text"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: 1,
          columnGap: 12,
          flexDirection: matches ? "row" : "column",
        }}
      >
        <label htmlFor="pass">Password</label>
        <TextField
          id="pass"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          size="small"
          disabled={isLoading}
          type="password"
        />
      </Box>

      <Button variant="contained" type="submit" disabled={isLoading}>
        SignUp
      </Button>
      <Typography sx={{ alignSelf: "center", textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/sign-in" style={{ textWrap: "nowrap" }}>
          sign in
        </Link>
      </Typography>
    </Paper>
  );
};

export default SignupForm;
