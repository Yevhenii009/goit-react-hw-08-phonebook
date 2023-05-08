import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { Button } from 'components/Button/Button';
import { useAuth } from 'hooks';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <div className={css.wrapper}>
      <p className={css.username}>{user.email}</p>
      <Button type="button" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
    </div>
  );
};