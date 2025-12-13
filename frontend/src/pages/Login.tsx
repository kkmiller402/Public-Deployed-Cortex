import { useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { AxiosError } from 'axios';
import api from '../api/axiosInstance';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
    Link,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginProps {
    setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        console.log(data);

        try {
            const response = await api.post("/auth/login", data);
            const loginData = response.data;
            console.log("Registered user:", loginData);

            localStorage.setItem("token", loginData.token);
            setIsAuthenticated(true);
            navigate("/");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            const msg = err.response?.data?.message || err.message;
            setErrorMessage(msg);
        }
    };

    return (
        <Box
            className="content"
        >
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    width: "100%",
                    maxWidth: 400,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    background: "linear-gradient(to top, #000 15%, #444 100%)",
                    borderRadius: 5,
                    border: "2px solid #FFF",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", textAlign: "center", color: "#FFF" }}
                >
                    Login
                </Typography>

                {errorMessage && (
                    <Typography color="#FF0000" sx={{ textAlign: "center" }}>
                        {errorMessage}
                    </Typography>
                )}

                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        variant='standard'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            "& .MuiInputLabel-root": { color: "#FFF" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#FFF" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#FFF" },
                            "& .MuiInput-underline:hover:before": { borderBottomColor: "#FFF" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#FFF" },
                            "& .MuiInputBase-input": { color: "#FFF" }
                        }}
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        required
                        variant='standard'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        sx={{ color: "#FFF" }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        }}
                        sx={{
                            "& .MuiInputLabel-root": { color: "#FFF" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#FFF" },
                            "& .MuiInput-underline:before": { borderBottomColor: "#FFF" },
                            "& .MuiInput-underline:hover:before": { borderBottomColor: "#FFF" },
                            "& .MuiInput-underline:after": { borderBottomColor: "#FFF" },
                            "& .MuiInputBase-input": { color: "#FFF" }
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            background: "#FFF",
                            color: "#000",
                            fontWeight: "bold",
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            "&:hover": {
                                background: "#5550a3",
                                color: "#FFF",
                            },
                        }}
                    >
                        Login
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" sx={{ color: "#FFF" }}>
                    Don't have an account?{" "}
                    <Link component={RouterLink} to="/register" sx={{ color: "#cc8800ff", "&:hover": { textDecoration: "underline", color: "#5550a3" } }}>
                        Register
                    </Link>
                </Typography>
            </Paper>

        </Box>
    );
}

export default Login;