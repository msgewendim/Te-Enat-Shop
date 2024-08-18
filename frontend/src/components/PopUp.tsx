import { ReactElement } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'

const PopupWindow = ({children} : {children : ReactElement}) => (
  <Popup
    trigger={<button className="button">Trigger</button>}
    modal
    nested
  >
    {
      <div className="text-sm">
        <button className="text-xl" onClick={close}>
          &times;
        </button>
        <div className="">
          {/* main content */}
          {children}
        </div>
        <div className="actions">
          {/* <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
          </Popup> */}
          {/* <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              // close();
            }}
          >
            close modal
          </button> */}
        </div>
      </div>
    }
  </Popup>
)

export default PopupWindow;