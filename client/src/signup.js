import { TextField, Box, Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import image from "./images/signUp.png";
import imageReg from "./images/register_2.webp";
const axios = require('axios')

const Component = styled(Box)`
width:400px;
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6)
`
const Image = styled('img')({
    width: 300,
    margin: 'auto',
    display: "flex",
    padding: '50px 0 '
})

const Wrapper = styled(Box)`
padding:25px 35px;
display:flex;
flex:1;
flex-direction:column;
& > div, & > button, & > p{
    margin-top:20px
}
`

const LoginButton = styled(Button)`
text-transform:none;
backgroung:#FB641B;
color:#fff;
height:48px;
border-radius:2px;
`

const SignButton = styled(Button)`
text-transform:none;
backgroung:#FB641B;
color:#2874f0;
height:48px;
border-radius:2px;
box-shadow:1px 2px 4px 1px rgb(0 0 0/20%);
`

const Text = styled(Typography)`
color:#878787;
font-size:14px;
`


function Login() {

    const [account, toggleAccount] = useState('login');

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    //   Register-form - handler

    const [data, setData] = useState({
        email: "",
        password: "",
        checkpassword: ""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        }
        )
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:5001/users/register", data)
            alert(res.data.message)
        } catch (err) {
            alert(err.data.message)
        }
    }

    //   Login-form - handler
    const [dataLog, setDataLog] = useState({
        email: "",
        password: ""
    })

    const handleChangeLog = (e) => {
        setDataLog({
            ...dataLog,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit_log = async () => {
        try {
            const res = await axios.post("http://localhost:5001/users/login", dataLog);

            alert(res.data.message)
            localStorage.setItem('token', res.data.token)

        } catch (err) {
            alert(err.data.message)
        }
    }

    return (
        <>
            <Component>
                <Box>
                    {
                        account === 'login' ?
                            <>
                                <Image src={image} alt="login" />
                                <Wrapper component="form">
                                    <TextField variant="standard" label="Enter the Email" name="email" value={dataLog.email} onChange={handleChangeLog} />
                                    <TextField variant="standard" label="Enter the Password" name="password" value={dataLog.password} onChange={handleChangeLog} />
                                    <LoginButton variant="contained" onClick={handleSubmit_log} >Login</LoginButton>
                                    <Text style={{ textAlign: 'center' }} >OR</Text>
                                    <SignButton onClick={() => toggleSignup()} >Create an account</SignButton>
                                </Wrapper>
                            </>
                            :
                            <>
                                <Image src={imageReg} alt="register" />
                                <Wrapper component="form">
                                    <TextField variant="standard" label="Enter your email" name="email" type="email" value={data.email} onChange={handleChange} />
                                    <TextField variant="standard" label="Enter the Password" name="password" value={data.password} onChange={handleChange} />
                                    <TextField variant="standard" label="check Password" name="checkpassword" value={data.checkpassword} onChange={handleChange} />
                                    <SignButton onClick={handleSubmit}>Signup</SignButton>
                                    <Text style={{ textAlign: 'center' }} >OR</Text>
                                    <LoginButton variant="contained" onClick={() => toggleSignup()} >Already have an account</LoginButton>
                                </Wrapper>
                            </>
                    }
                </Box>
            </Component>
        </>
    );
}
export default Login;