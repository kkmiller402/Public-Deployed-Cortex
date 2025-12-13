import { Box, Typography, Button } from "@mui/material";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import '../App.css'
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useState, useEffect } from "react";
import tokenPic from "../assets/token.png"

interface MyToken extends JwtPayload {
    sub?: string;
    role?: string;
    iat?: number;
    exp?: number;
}

export interface User {
    pkId: number;
    email: string;
    encPass: string;
    firstName: string;
    middleInitial?: string | null;
    lastName: string;
    suffix?: string | null;
    phone?: string | null;
    location?: string | null;
    createdDate: string;
    updatedDate: string | null;
    lastSignedIn: string | null;
    role: string;
}

export default function Dashboard() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token") || "";
    const decoded = jwtDecode<MyToken>(token);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");

    const loadUsers = async () => {
        try {
            const response = await api.get("/admin");
            setUsers(response.data);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : String(error));
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            await loadUsers();
        };

        fetchUsers();
    }, [users.length]);

    return (
        <Box
            className="content" sx={{ flexDirection: "column" }}
        >

            <Button variant="contained" color="error" sx={{ position: "fixed", top: 40, left: 40 }} onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
            }}>
                Log Out
            </Button>
            {decoded.role === "ADMIN" && (
                <Typography variant="h3" sx={{ color: "#fff", fontWeight: "bold" }}>
                    {decoded.role.toLowerCase().charAt(0).toUpperCase() + decoded.role.toLowerCase().slice(1)} Dashboard
                </Typography>


            )}
            <img
                src={tokenPic}
                alt="Token"
                style={{ width: "20vmin", height: "20vmin", marginTop: 20, borderRadius: 100 }}
            />
            <Typography variant="h4" sx={{ color: "#fff", marginTop: 2 }}>
                You are successfully logged in. Here's your JWT Authenticated Token
            </Typography>
            <Box
                sx={{
                    marginTop: 4,
                    padding: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: 2,
                    wordBreak: "break-all",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ color: "#00FF00", fontFamily: "monospace" }}
                >
                    {token}
                </Typography>
            </Box>
            <Typography variant="h5" sx={{ color: "#fff", marginTop: 4 }}>
                Decoded Token Payload:
            </Typography>
            <Box
                sx={{
                    marginTop: 2,
                    padding: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ color: "#00FF00", fontFamily: "monospace" }}
                >
                    Email: {decoded.sub}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "#00FF00", fontFamily: "monospace" }}
                >
                    Role: {decoded.role}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "#00FF00", fontFamily: "monospace" }}
                >
                    Issued: {decoded.iat ? new Date(decoded.iat * 1000).toLocaleString() : "N/A"}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "#00FF00", fontFamily: "monospace" }}
                >
                    Expires {decoded.exp ? new Date(decoded.exp * 1000).toLocaleString() : "N/A"}
                </Typography>
            </Box>
            {error && (
                <Typography variant="body1" sx={{ color: "red", marginTop: 2 }}>
                    Error: {error}
                </Typography>
            )}
            {users.length > 0 && decoded.role === "ADMIN" && (
                <Box sx={{ marginTop: 4, width: "100%", maxWidth: 600 }}>
                    <Typography variant="h5" sx={{ color: "#fff", marginBottom: 2 }}>
                        Registered Users:
                    </Typography>
                    {users.map((user) => (
                        <Box
                            key={user.pkId}
                            sx={{
                                padding: 2,
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: 2,
                                marginBottom: 2,
                            }}
                        >
                            <Typography variant="body1" sx={{ color: "#fff" }}>
                                {user.firstName} {user.lastName} - {user.email} - Role: {user.role}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}


        </Box>
    );
}
