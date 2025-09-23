import { ModalBlock, ModalConteiner, TitleModal } from "./ModalMobil.styled";

const ModalMobil = ({ setShowForm, setIsModalOpen }) => {
  return (
    <ModalConteiner>
      <ModalBlock>
        <TitleModal
          onClick={() => {
            setShowForm(false);
            setIsModalOpen(false);
          }}
          to="expenses"
        >
          Мои расходы
        </TitleModal>
        <TitleModal
          onClick={() => {
            setShowForm(true);
            setIsModalOpen(false);
          }}
          to="/expenses/new"
        >
          Новый расход
        </TitleModal>
        <TitleModal to="analysis">Анализ расходов</TitleModal>
      </ModalBlock>
    </ModalConteiner>
  );
};
export default ModalMobil;
