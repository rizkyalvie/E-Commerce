import React from "react";
import "../../Css/complain.css"
import blankPfp from '../../Images/blank-profile.png'

export default function Contact({ dataContact, clickContact, contact }) {
(dataContact)
  return (
    <div className="mt-5">
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
            <div
              key={item.id}
              className={`contact mt-3 p-2 ${
                contact?.id === item?.id && "contact-active"
              }`}
              onClick={() => {
                clickContact(item);
              }}
            >
              <img
                src={item.profile.image || blankPfp}
                className="rounded-circle me-2 img-contact"
                alt="user avatar"
              />
              <div className="ps-1 text-contact d-flex flex-column justify-content-around">
                <p className="mb-0 text-contact-chat">{item.name}</p>
                <p className="text-contact-chat mt-1 mb-0">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}