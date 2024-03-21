import NewBtn from 'components/common/button/NewBtn';
import { theme } from 'styles/themeMuiStyle';

function ActionButton({ title, isDisable, onClick }) {
  return (
    <NewBtn
      title={title}
      styles={{
        background: isDisable ? '#EBEBEB' : theme.palette.primary.main,
        color: 'white',
      }}
      onClick={onClick}
      disable={isDisable}
    />
  );
}
export default ActionButton;
