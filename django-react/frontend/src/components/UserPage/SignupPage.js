import React, { useState } from 'react';
import Axios from 'axios';
import { Input } from 'antd';
import styled from 'styled-components';

const SignupDiv = styled.div`
    padding: 3rem;
    form {
        width: 320px;
        display: inline-block;
        label {
            margin-bottom: 1rem;
        }
        input {
            margin-bottom: 1.5rem;
            &[type=submit] {
                background: black;
                color: white;
                margin-top: 1rem;
            }
        }
    }
`;

const SignupPage = () => {
    const [username, setUsername] = useState(''); // 사용자명 추가
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState(false);

    const onChangeUsername = (e) => {
        setUsername(e.target.value); // 사용자명 업데이트
    };

    const onChangePwd1 = (e) => {
        setPassword1(e.target.value);
    };

    const onChangePwd2 = (e) => {
        setPassword2(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: username, // 사용자명으로 변경
            password: password1, // 비밀번호로 변경
        };

        // 유효성 검사
        if (password1 !== password2) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
            return false;
        }

        Axios.post('/api/v1/mall/auth/register/', user)
            .then(res => {
                if (res.data.success) { // 성공 메시지에 맞게 수정
                    localStorage.clear();
                    // 사용하려면 App.js에서 /로 라우팅해야 한다
                    window.location.replace('/');
                } else {
                    setUsername('');
                    setPassword1('');
                    setPassword2('');
                    localStorage.clear();
                    setErrors(true);
                }
            })
            .catch(err => {
                console.clear();
                alert('아이디 혹은 비밀번호가 일치하지 않습니다');
            });
    };

    return (
        <SignupDiv>
            <h1>회원가입</h1>
            <br />
            {errors === true && <h2>Cannot signup with provided credentials</h2>}
            <form onSubmit={onSubmit}>
                <label htmlFor='username'>사용자명:</label>
                <Input
                    type='text'
                    value={username}
                    onChange={onChangeUsername}
                    required
                />
                <label htmlFor='password1'>비밀번호(소문자, 숫자, 특수문자 포함 8~16자):</label>
                <Input
                    type='password'
                    value={password1}
                    onChange={onChangePwd1}
                    minLength='8'
                    pattern='^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[a-z\d$@$!%*#?&]{8,16}$'
                    required
                />
                <br />
                <label htmlFor='password2'>비밀번호 확인(소문자, 숫자, 특수문자 포함 8~16자):</label>
                <Input
                    type='password'
                    value={password2}
                    onChange={onChangePwd2}
                    minLength='8'
                    pattern='^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[a-z\d$@$!%*#?&]{8,16}$'
                    required
                />
                <Input type='submit' size="large" value='가입하기' />
            </form>
        </SignupDiv>
    );
};

export default SignupPage;
