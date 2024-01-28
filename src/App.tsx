import { useEffect, useState } from "react";
import "./App.css";
import { useHeadingsQuery } from "./services/headings/queries";
import {
  useActivateHeadingMutation,
  useDisableHeadingMutation,
} from "./services/headings/mutations";

function EditButton(props: { id: string }) {
  return <button onClick={() => {}}>editar {props.id}</button>;
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
        desactivar {props.id}
      </button>
      <ConfirmModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        onAccept={() => disableHeadingMutation.mutate(props.id)}
        isPending={disableHeadingMutation.isPending}
      />
    </>
  );
}

function ActivateButton(props: { id: string }) {
  const activateHeadingMutation = useActivateHeadingMutation();
  const [openModal, setOpenModal] = useState(false);

  if (activateHeadingMutation.isPending) return <div>Loading...</div>;

  if (activateHeadingMutation.error)
    return <div>{JSON.stringify(activateHeadingMutation.error)}</div>;

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        activar {props.id}
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

  useEffect(() => {
    console.log(response.data);
  }, [response.data, response.isSuccess]);

  if (response.isPending) return <div>Loading...</div>;

  if (response.isSuccess)
    return (
      <>
        <ul>
          {response.data.data.map((i) => {
            return (
              <li>
                <p>{i.name}</p>
                <DeleteButton id={i._id} />
                <EditButton id={i._id} />
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
