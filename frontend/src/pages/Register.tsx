import { useState } from 'react';
import { AxiosError } from 'axios';
import api from '../api/axiosInstance';
import '../App.css'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link, IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface RegisterProps {
    setIsAuthenticated: (auth: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsAuthenticated }) => {



    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>("");
    const [middleInitial, setMiddleInitial] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRequirements, setShowRequirements] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = { firstName, middleInitial, lastName, suffix, email, password, confirmPassword, phone, location };
        console.log(data);

        try {
            const response = await api.post("/auth/register", data);

            const loginData = response.data;
            console.log("Registered user:", loginData);

            localStorage.setItem("token", loginData.token);
            setIsAuthenticated(true);
            navigate("/dashboard");

        } catch (error: unknown) {
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
                    Register
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
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 2 }}>
                        <TextField
                            label="First Name"
                            required
                            variant="standard"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={{
                                width: "60%",
                                "& .MuiInputLabel-root": { color: "#FFF" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#FFF" },
                                "& .MuiInput-underline:before": { borderBottomColor: "#FFF" },
                                "& .MuiInput-underline:hover:before": { borderBottomColor: "#FFF" },
                                "& .MuiInput-underline:after": { borderBottomColor: "#FFF" },
                                "& .MuiInputBase-input": { color: "#FFF" }
                            }}
                        />
                        <TextField
                            label="Middle Initial"
                            variant="standard"
                            value={middleInitial}
                            onChange={(e) => setMiddleInitial(e.target.value)}
                            sx={{
                                width: "25%",
                                "& .MuiInputLabel-root": { color: "#FFF" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#FFF" },
                                "& .MuiInput-underline:before": { borderBottomColor: "#FFF" },
                                "& .MuiInput-underline:hover:before": { borderBottomColor: "#FFF" },
                                "& .MuiInput-underline:after": { borderBottomColor: "#FFF" },
                                "& .MuiInputBase-input": { color: "#FFF" }
                            }}
                        />
                        <TextField
                            label="Last Name"
                            required
                            variant="standard"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            sx={{
                                width: "60%",
                                "& .MuiInputLabel-root": { color: "#FFF" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#FFF" },
                                "& .MuiInput-underline:before": { borderBottomColor: "#FFF" },
                                "& .MuiInput-underline:hover:before": { borderBottomColor: "#FFF" },
                                "& .MuiInput-underline:after": { borderBottomColor: "#FFF" },
                                "& .MuiInputBase-input": { color: "#FFF" }
                            }}
                        />
                        <TextField
                            label="Suffix"
                            variant="standard"
                            value={suffix}
                            onChange={(e) => setSuffix(e.target.value)}
                            sx={{
                                width: "25%",
                                "& .MuiInputLabel-root": { color: "#FFF" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#FFF" },
                                "& .MuiInput-underline:before": { borderBottomColor: "#FFF" },
                                "& .MuiInput-underline:hover:before": { borderBottomColor: "#FFF" },
                                "& .MuiInput-underline:after": { borderBottomColor: "#FFF" },
                                "& .MuiInputBase-input": { color: "#FFF" }
                            }}
                        />
                    </Box>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        variant="standard"
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
                        variant="standard"
                        value={password}
                        onFocus={() => setShowRequirements(true)}
                        onBlur={() => setShowRequirements(false)}
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
                    {showRequirements && (
                        <Box sx={{ color: "#FFF", fontSize: "0.9em", marginTop: "-10px" }}>
                            <Typography>Password must contain:</Typography>
                            <ul style={{ color: "#FF0000" }}>
                                <li>At least 10 characters</li>
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one number</li>
                            </ul>
                        </Box>
                    )}

                    <TextField
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        required
                        variant="standard"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

                    <TextField
                        label="Phone"
                        type="tel"
                        fullWidth
                        variant="standard"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                        label="Location"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                        Register
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" sx={{ color: "#FFF" }}>
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/login" sx={{ color: "#cc8800ff", "&:hover": { textDecoration: "underline", color: "#5550a3" } }}>
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Register;
