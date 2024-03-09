const MainModal = ({ id, image, alt, text, handleClose, content }) => {
  return (
    <>
      <button
        className="bg-transparent outline-none focus:outline-none rounded-3xl hover:bg-gray-500 hover:bg-opacity-10 transition-all duration-300 hover:-translate-y-1"
        onClick={() => document.getElementById(id).showModal()}
      >
        <figure className="px-4">
          <div>
            <h2 className="text-xl hover:underline">{text}</h2>
          </div>
          <img
            loading="lazy"
            src={image}
            className="pt-0 bg-base-300 rounded-lg scale-50 invert"
            alt={alt}
          />
        </figure>
      </button>

      <dialog id={id} className="modal min-w-80 border border-gray-200 rounded-2xl">
        <div className="modal-box mt-5">
          <form method="dialog">
            <h2>{text}</h2>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* display component */}
          <div className="mt-5">{content}</div>
        </div>
      </dialog>
    </>
  );
};

export { MainModal };
