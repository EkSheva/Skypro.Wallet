import { ModalBlock, ModalConteiner, TitleModal } from "./ModalMobil.styled";

const ModalMobil = () => {

  return (
    <ModalConteiner>
      <ModalBlock>
        <TitleModal to="expenses">Мои расходы</TitleModal>
        <TitleModal to="newExpense">Новый расход</TitleModal>
        <TitleModal to="analysis">Анализ расходов</TitleModal>
      </ModalBlock>
    </ModalConteiner>
  );
};
export default ModalMobil;
