import { useNavigate } from 'react-router-dom';
import { GetProfileService } from '../../services/profile/GetProfileService';

export function GetProfileHook({ username, setProfile }) {
  const get = GetProfileService({ username });
  const navigate = useNavigate();

  const request = () => {
    get().subscribe(({ profile }) => {
      setProfile(profile);
    }, () => navigate('/'))
  } 

  return request;
}