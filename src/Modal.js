import { createPortal } from "react-dom";
import { useEffect } from "react/cjs/react.development";

export default function Modal(props) {

    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            props.setModalShow(false)
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])

    if(props.show) {
    return createPortal(
        <div className="modalwrapper" onClick={()=>props.setModalShow(false)}>
        <div className="modalmain" onClick={(e)=> {
            e.stopPropagation();
        }}>
            <p>Are you sure you want to remove "<strong>{props.name}</strong>" from your friend list?</p>
            <div className="modalbtns">
            <button className="yes" onClick={()=> {
                props.delete(props.name, props.friendList);
                props.setModalShow(false);
            }}>Yes</button>
            <button className="no" onClick={()=> {
                props.setModalShow(false);
            }}>No</button>
            </div>
            </div>
        </div>,
        document.getElementById('modal-root')
      );
    }
    return false;
}