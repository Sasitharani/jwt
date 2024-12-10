import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Pass from './Pass';
import './index.css'; // Import Tailwind CSS
import User from './User';

Off. Bye. Show. Physical. Yeah. 7000. And everyone. And. I. Joe. I. Yeah. Oh. Nasty. Nasty. Nasty, nasty, nasty, nasty. I. Hello. I. Ah, damn Madam Organism. Insane image. I. I. I. 898. I. 785. I. Daddy. I know daddy. Mommy together, mommy, that body's way. To contact Siva. There we are. Amar. Number Friday and. Number. Well. Your cowboy. Alarm. Open. I. Hey. Wow. Sure. There. Daddy. With you? Oh. 123. Too many. I. Make the Senna Diana educate her list. Hello. I. Yeah. Hey. Open it all. Sorry. Oh. Right. Wow. Wow. Wow. Wow. Wow. Wow. Wow. Phone. Phone. Yay and the ball. const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pass" element={<Pass />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </Router>
    );
};

export default App;
