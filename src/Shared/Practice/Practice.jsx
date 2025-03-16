import CRUDOperations from "./CRUDOperations";
import LoginToGoogle from "./LoginToGoogle";
import ModalPractice from "./ModalPractice";

export default function Practice() {
  return (
    <div>
      <ModalPractice />
      <LoginToGoogle />
      <CRUDOperations />
    </div>
  );
}
