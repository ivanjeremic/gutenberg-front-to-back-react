import React from "react";
import { __ } from "@wordpress/i18n";

export default function UserCard(props) {
  const {
    attributes,
    toggleModal = false,
    isModalOpen = false,
    count,
    setCount,
  } = props;

  return (
    <div className="c-mt-user-card js-mt-user-card">
      <figure className="c-mt-user-card__image">
        <img src={attributes ? attributes.userData.img : ""} alt="User" />
      </figure>
      <div className="c-mt-user-card__content-wrapper">
        <h4 className="c-mt-user-card__name">
          {attributes ? attributes.userData.firstName : ""}{" "}
          {attributes ? attributes.userData.lastName : ""}
        </h4>
        <button className="c-mt-user-card__cta" onClick={toggleModal}>
          {__("Read more about")}{" "}
          {attributes ? attributes.userData.firstName : ""}
        </button>
        <button
          className="c-mt-user-card__cta"
          onClick={() => setCount((prevState) => prevState + 1)}
        >
          {count}
        </button>
      </div>
      <div
        className={`c-mt-user-card__modal c-mt-modal${
          isModalOpen ? " c-mt-modal--open" : ""
        }`}
      >
        <div className="c-mt-modal__wrapper">
          <button className="c-mt-modal__close" onClick={toggleModal}>
            X
          </button>
          <figure className="c-mt-modal__image">
            <img src={attributes ? attributes.userData.img : ""} alt="User" />
          </figure>
          <h4 className="c-mt-modal__name">
            {attributes ? attributes.userData.firstName : ""}{" "}
            {attributes ? attributes.userData.lastName : ""}
          </h4>
          <p className="c-mt-modal__desc">
            {attributes ? attributes.userData.desc : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
