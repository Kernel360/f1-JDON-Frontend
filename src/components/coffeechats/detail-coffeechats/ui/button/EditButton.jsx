import ActionButton from 'components/common/button/ActionButton';
import { useNavigate } from 'react-router-dom';

function EditButton({ title, isDisable, id }) {
  const navigate = useNavigate();
  const editCoffeeChat = async () => {
    navigate(`/edit-coffee/${id}`);
  };

  return <ActionButton title={title} onClick={editCoffeeChat} disable={isDisable} />;
}
export default EditButton;
