import { useRef } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import { useAxios } from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileImage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  const fileUploadRef = useRef();

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
    const formData = new FormData();
    for (const file of fileUploadRef.current.files) {
      formData.append("avatar", file);
    }
    console.log(formData);
    const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
            state?.user?.id
        }/avatar`,
        formData
    );
    if (response.status === 200) {
        dispatch({
            type: actions.profile.IMAGE_UPDATED,
            data: response.data,
        });
    }
    } catch (err) {
      dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: err });
    }
  };

  return (
    <div className="relative mb-8 h-[180px] w-[180px] rounded-full lg:mb-11 lg:h-[218px] lg:w-[218px]">
  <img
    className="h-full w-full rounded-full object-cover bg-white"
    src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
    alt={state?.user?.firstName}
  />
  <form>
    <button
      className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
      onClick={handleImageUpload}
    >
      <img src={EditIcon} alt="Edit" />
    </button>
    <input id="file" type="file" ref={fileUploadRef} hidden />
  </form>
</div>

  );
}
