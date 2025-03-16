import CRUDOperations from "./CRUDOperations";
import ModalPractice from "./ModalPractice";
import YoutubeUploader from "./YoutubeUploader";

export default function Practice() {
  return (
    <div>
      <ModalPractice />
      <YoutubeUploader />
      <CRUDOperations />
    </div>
  );
}
