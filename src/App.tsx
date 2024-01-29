import { useState } from "react";
import "./App.css";
import { useHeadingsQuery } from "./services/headings/queries";
import {
  useActivateHeadingMutation,
  useDisableHeadingMutation,
  useUpdateHeadingMutation,
} from "./services/headings/mutations";
import { Heading } from "./services/headings/types";

function EditFormModal(props: {
  open: boolean;
  id: string;
  closeModal: () => void;
  heading: Heading;
}) {
  // const dispatch = useDispatch();
  const updateHeadingMutation = useUpdateHeadingMutation();

  // useEffect(() => {
  //   if (updateHeadingMutation.isSuccess) {
  //     dispatch(openToast({ message: "heading updated successfully" }));
  //     props.closeModal();
  //   }

  //   if (updateHeadingMutation.isError) {
  //     dispatch(openToast({ message: "heading update failed", error: true }));
  //     props.closeModal();
  //   }
  // }, [
  //   dispatch,
  //   props,
  //   updateHeadingMutation.isError,
  //   updateHeadingMutation.isPending,
  //   updateHeadingMutation.isSuccess,
  // ]);

  if (updateHeadingMutation.error) return <div>Error!</div>;

  if (props.open)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000000dd",
          justifyContent: "center",
          paddingTop: "200px",
        }}
      >
        {updateHeadingMutation.isPending ? (
          <div>...Loading</div>
        ) : (
          <form>
            <pre>{JSON.stringify(props.heading, null, 2)}</pre>
            <div>Hello {props.id}</div>

            <button
              onClick={(e) => {
                e.preventDefault();
                updateHeadingMutation.mutate({
                  id: props.id,
                  data: {
                    currency: props.heading.currency,
                    name: props.heading.name + "b",
                    description: props.heading.description + "c",
                  },
                });
              }}
            >
              editar
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                props.closeModal();
              }}
            >
              cancelar
            </button>
          </form>
        )}
      </div>
    );
}

function EditButton(props: { id: string; heading: Heading }) {
  const udpateHeadingMutation = useUpdateHeadingMutation();

  const [openModal, setOpenModal] = useState(false);

  if (udpateHeadingMutation.error)
    return <div>{JSON.stringify(udpateHeadingMutation.error)}</div>;

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Editar
      </button>
      <EditFormModal
        heading={props.heading}
        open={openModal}
        id={props.id}
        closeModal={() => setOpenModal(false)}
      />
    </>
  );
}

function DeleteButton(props: { id: string }) {
  return <button onClick={() => {}}>borrar {props.id}</button>;
}

function DeActivateButton(props: { id: string }) {
  const disableHeadingMutation = useDisableHeadingMutation();
  const [openModal, setOpenModal] = useState(false);

  if (disableHeadingMutation.error)
    return <div>{JSON.stringify(disableHeadingMutation.error)}</div>;

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        desactivar
      </button>
      <ConfirmModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        onAccept={() =>
          disableHeadingMutation.mutate(props.id, {
            // onSettled: () => {
            //   setOpenModal(false);
            //   console.log("settled");
            // },
            // onSuccess: () => {
            //   console.log("success");
            // },
          })
        }
        isPending={disableHeadingMutation.isPending}
      />
    </>
  );
}

function ActivateButton(props: { id: string }) {
  const activateHeadingMutation = useActivateHeadingMutation();
  const [openModal, setOpenModal] = useState(false);

  if (activateHeadingMutation.error)
    return <div>{JSON.stringify(activateHeadingMutation.error)}</div>;

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        activar
      </button>
      <ConfirmModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        onAccept={() => activateHeadingMutation.mutate(props.id)}
        isPending={activateHeadingMutation.isPending}
      />
    </>
  );
}

function ConfirmModal(props: {
  open: boolean;
  closeModal: () => void;
  onAccept: () => void;
  isPending: boolean;
}) {
  if (props.open)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000000dd",
          justifyContent: "center",
          paddingTop: "200px",
        }}
      >
        <div style={{}}>
          {props.isPending ? <div>Loading..</div> : <div>texto</div>}
          <div>
            <button onClick={() => props.closeModal()}>cancelar</button>
            <button
              onClick={() => {
                props.onAccept();
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    );
}

function App() {
  const response = useHeadingsQuery();

  console.log("re-render");

  if (response.isFetching) return <div>Loading...</div>;

  if (response.isSuccess)
    return (
      <>
        <ul>
          {response.data.data.map((i) => {
            return (
              <li>
                <p>{i.name}</p>
                <DeleteButton id={i._id} />
                <EditButton id={i._id} heading={i} />
                {i.isActive ? (
                  <DeActivateButton id={i._id} />
                ) : (
                  <ActivateButton id={i._id} />
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
}

export default App;
