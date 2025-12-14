import { Box, Typography, Button, CircularProgress, TableContainer, Paper, Table, TableCell, TableRow, TableHead, TableBody, TablePagination, List, ListItem } from "@mui/material";
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
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fields = [
        { label: "Email", value: currentUser?.email },
        { label: "First Name", value: currentUser?.firstName },
        { label: "Middle Initial", value: currentUser?.middleInitial },
        { label: "Last Name", value: currentUser?.lastName },
        { label: "Suffix", value: currentUser?.suffix },
        { label: "Phone", value: currentUser?.phone },
        { label: "Location", value: currentUser?.location },
        { label: "Role", value: currentUser?.role },
        {
            label: "Created Date",
            value: currentUser?.createdDate ? new Date(currentUser?.createdDate).toLocaleString()
                : null,
        },
        {
            label: "Updated Date",
            value: currentUser?.updatedDate
                ? new Date(currentUser?.updatedDate).toLocaleString()
                : null,
        },
        {
            label: "Last Signed In",
            value: currentUser?.lastSignedIn
                ? new Date(currentUser?.lastSignedIn).toLocaleString()
                : null,
        },
    ];

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const pagedUsers = users.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get("/admin");
            setUsers(response.data);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (!decoded?.exp || decoded.exp * 1000 < Date.now()) {
            navigate("/login");
        }

    }, [decoded, navigate]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                setLoadingUser(true);
                const response = await api.get("/auth/me");
                setCurrentUser(response.data);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : String(error));
            } finally {
                setLoadingUser(false);
            }
        };
        if (decoded.role !== "ADMIN") {
            fetchCurrentUser();
        }
    }, [decoded.role]);

    useEffect(() => {
        const fetchUsers = async () => {
            await loadUsers();
        };
        if (decoded.role === "ADMIN") {
            fetchUsers();
        }
    }, [decoded.role, users.length]);

    return (
        <Box
            className="content" sx={{ flexDirection: "column" }}
        >

            <Button variant="contained" color="error" sx={{ position: { xs: "absolute", sm: "absolute", md: "fixed" }, top: { xs: 10, sm: 10, md: 40 }, left: { xs: 10, sm: 10, md: 40 } }} onClick={() => {
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
            {loading && (
                <Typography variant="body1" sx={{ color: "#fff", marginTop: 2 }}>
                    Loading users...
                    <CircularProgress size={28} />
                </Typography>
            )}
            {users.length > 0 && (

                <TableContainer component={Paper}
                    sx={{
                        marginTop: "2rem", minHeight: "33vh", maxHeight: "50vh", width: { xs: "100vw", sm: "100vw", md: "75vw", lg: "60vw" },
                        maxWidth: { xs: "100vw", sm: "100vw", md: "75vw" }, position: "relative"
                    }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Last Signed In</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {pagedUsers.map((user) => (
                                <TableRow key={user.pkId} hover>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.location ?? "—"}</TableCell>
                                    <TableCell>
                                        {user.lastSignedIn
                                            ? new Date(user.lastSignedIn).toLocaleDateString()
                                            : "Never"}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={users.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        sx={{
                            position: "sticky",
                            bottom: 0,
                            left: 0,
                            backgroundColor: "background.paper",
                            zIndex: 2
                        }}
                    />
                </TableContainer>
            )}
            {loadingUser && (
                <Typography variant="body1" sx={{ color: "#fff", marginTop: 2 }}>
                    Loading profile info...
                    <CircularProgress size={28} />
                </Typography>
            )}
            {decoded.role !== "ADMIN" && currentUser && (
                <>
                    <Typography variant="h5" sx={{ color: "#fff", marginTop: 4, marginBottom: 2 }}>
                        Your Profile Information:
                    </Typography>
                    <List dense>
                        {fields
                            .filter((f) => f.value)
                            .map((field) => (
                                <ListItem
                                    key={field.label}
                                    disableGutters
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "150px 1fr",
                                        columnGap: 2,
                                        borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
                                    }}
                                >
                                    <Typography fontWeight={600}>{field.label}</Typography>
                                    <Typography color="#FFF">{field.value}</Typography>
                                </ListItem>
                            ))}
                    </List>
                </>

            )}




        </Box>
    );
}
