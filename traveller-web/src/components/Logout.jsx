
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    navigate('/login');
    window.location.hash = '/login'

    return (<></>)

}