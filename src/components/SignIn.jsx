// SignIn.jsx
import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';;

const defaultTheme = createTheme();

export default function SignIn({ onLoginSuccess }) {
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const loginDetails = {
            email: data.get('email'),
            password: data.get('password'),
        };

        try {
            const response = await fetch( process.env.REACT_APP_SERVER_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails),
            });

            if (response.ok) {
                await response.json();
                // 서버 응답 처리, 토큰 저장
                localStorage.setItem('token', response.token);
                // 로그인 성공 처리
                console.log("로그인 성공");
                onLoginSuccess();
            } else if (response.status===400) {
                const errorData = await response.json(); // 서버로부터 에러 메시지 받기
                setErrorMessage(errorData.message);
                console.error('이메일 or 비밀번호 입력 X');
            } else if (response.status===401) {
                const errorData = await response.text()
                setErrorMessage(errorData);
                console.error("이메일, 비밀번호 틀린경우 or 토큰값 유효X");
            } else if (response.status===403) {
                console.error("권한이 없음");
            } else {
                console.error("서버 에러");
            }
        } catch (error) {
            // 네트워크 에러 또는 요청 관련 에러 처리
            console.error('로그인 요청 중 에러 발생:', error);
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <LockOpenRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        LOGIN
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: 'black', // 여기서 'blue'는 원하는 색상으로 변경하세요.
                                '&:hover': {
                                    backgroundColor: 'darkgray', // 마우스 오버 시 색상, 원하는 색상으로 변경하세요.
                                },
                            }}
                        >
                            LOGIN
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
