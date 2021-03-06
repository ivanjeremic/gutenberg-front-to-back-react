// External dependencies
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { Fragment, useState, useEffect } from "@wordpress/element";
import { PanelBody, SelectControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

// Internal dependencies
import UserCard from "./components/UserCard";
import Wrapper from "./components/Wrapper";

// Utility functions / helpers
import { getAllUsers, getUserById } from "./utils";

// Block attributes (custom props)
const attributes = {
  count: {
    type: "int",
    default: 12,
  },
  currentUser: {
    type: "int",
    default: 1,
  },
  userData: {
    type: "object",
    default: {},
  },
  allUserIds: {
    type: "array",
    default: [],
  },
};

// Edit function (responsible for wp-admin post edit screen)
const edit = (props) => {
  const { currentUser, userData, allUserIds, count } = props.attributes;
  const [currentUserId, setcurrentUserId] = useState(currentUser);

  // Fetch API and get current user's data
  const getCurrentUserData = (userId) => {
    getUserById(userId).then((user) => {
      const userName = user.name.split(" ");
      props.setAttributes({
        currentUser: userId,
        userData: {
          firstName: userName[0] ? userName[0] : "",
          lastName: userName[1] ? userName[1] : "",
          desc: user.description,
          img: user.avatar_urls ? user.avatar_urls[96] : "",
        },
      });
    });
  };

  // Execute on block first render
  useEffect(() => {
    getAllUsers().then((userList) => {
      const users = userList.map((user) => ({
        label: user.name,
        value: user.id,
      }));
      props.setAttributes({ allUserIds: users });
    });
  }, []);

  // Change user data attributes on user_id change
  useEffect(() => {
    getCurrentUserData(currentUserId);
  }, [currentUserId]);

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__("")}>
          <SelectControl
            label="User"
            value={currentUserId}
            options={allUserIds}
            onChange={(value) => {
              setcurrentUserId(value);
            }}
          />
        </PanelBody>
      </InspectorControls>
      <div className="mt-block-user-card-wrapper">
        <Wrapper attributes={props.attributes} />
      </div>
    </Fragment>
  );
};

// Save function (responsible for static HTML saved in database)
const save = (props) => {
  return (
    <div
      className="mt-block-user-card-wrapper"
      data-mt-attributes={JSON.stringify(props.attributes)}
    >
      <div className="mt-block-user-card">
        <UserCard attributes={props.attributes} />
      </div>
    </div>
  );
};

// Register block type function
registerBlockType("mt/gutenberg-user-card", {
  title: __("User card", "gutenberg-user-card"),
  icon: "universal-access-alt",
  category: "layout",
  attributes,
  edit,
  save,
});
