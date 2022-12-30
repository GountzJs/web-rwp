import { useNavigate } from 'react-router-dom';
import { GetProfileService } from '@/app/services';

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